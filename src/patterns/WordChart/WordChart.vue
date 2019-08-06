<template>
  <component
    :is='type'
    class='word-chart leading-none'
  >
    <a
      v-for='word in words'
      :key='word.text'
      class='inline-block mx-1'
      :style='`color: ${word.color}; font-size: ${word.fontSize}`'
      :title='`${word.text} (${word.count})`'
      @click='$emit("selectWord", { word: word.text, count: word.count })'
    >
      {{ word.text }}
    </a>
  </component>
</template>

<script>
import _filter from 'lodash/filter'
import _orderBy from 'lodash/orderBy'

import tokens from '../../utils/tokens'

import IGNORED_WORDS_ENGLISH from './ignoredWords/en'
import IGNORED_WORDS_SPANISH from './ignoredWords/es'
import IGNORED_WORDS_PORTUGUESE from './ignoredWords/pt'

const WHITESPACE = /\s+/
const NOT_ALPHANUMERIC_UNDERSCORE_DASH = /[^\w\-]/gi

/**
 * Draws a chart indicating incidence of words
 *
 * **Events**
 *
 * `@selectWord`
 * emits object `{ word:String, count:Number }`
 */
export default {
  name: 'WordChart',
  status: 'prototype',
  release: '0.1.0',
  model: {
    prop: 'active',
  },
  props: {
    /**
     * The body of text word incidence will be measured in
     */
    text: {
      type: String,
      required: true,
    },
    /**
     * Removes non-meaningful words for language. Currently supports `en`, `es`, and `pt`
     */
    language: {
      type: String,
      default: 'en',
    },
    /**
     * The html element used for the word chart container
     */
    type: {
      type: String,
      default: 'div',
    },
    /**
     * The font-size of the largest word in the chart, all other words will be sized proportionally by their incidence
     */
    maximumFontSize: {
      type: Number,
      default: 5,
    },
    /**
     * The unit of maximumFontSize
     */
    maximumFontSizeUnits: {
      type: String,
      default: 'rem',
    },
    /**
     * The minimum incidence a word must have to be displayed
     */
    minWordCount: {
      type: Number,
      default: 5,
    },
    /**
     * The minimum number of characters a word must be to be displayed
     */
    minWordLength: {
      type: Number,
      default: 2,
    },
    /**
     * The maximum number of words in the chart
     */
    maxWordsShown: {
      type: Number,
      default: 50,
    },
  },
  data() {
    return {
      colors: tokens.primaryColors.concat(tokens.secondaryColors).map(c => c.value),
    }
  },
  computed: {
    ignoredWords() {
      return {
        en: IGNORED_WORDS_ENGLISH,
        es: IGNORED_WORDS_SPANISH,
        pt: IGNORED_WORDS_PORTUGUESE,
      }[this.language]
    },
    words() {
      // returned data structure
      // [
      //   {
      //     text: 'amazing',
      //     color: 'rgb(120, 200, 100)',
      //     remSize: 3,
      //   },
      // ]
      const words = this.text.split(WHITESPACE)
      let maxCount = 0

      const treatWord = word => word.toLowerCase().replace(NOT_ALPHANUMERIC_UNDERSCORE_DASH, '')

      const countReducer = (acc, w) => {
        const word = treatWord(w)
        
        const skipWord = word.length < this.minWordLength || this.ignoredWords.includes(word)
        if (skipWord) return acc

        const count = (acc[word] || 0) + 1
        if (count > maxCount) maxCount = count

        return { ...acc, [word]: count }
      }

      const counts = words.reduce(countReducer, {})
      const limitedOrderedWords = _orderBy(
        Object.keys(counts),
        word => counts[word],
        'desc',
      ).slice(0, this.maxWordsShown)

      const colorForIndex = i => this.colors[(i + this.colors.length) % this.colors.length]
      const weightForCount = count => (count/maxCount) * this.maximumFontSize
      const buildWord = (word, i) => ({
        text: word,
        color: colorForIndex(i),
        fontSize: `${weightForCount(counts[word])}${this.maximumFontSizeUnits}`,
        count: counts[word],
      })

      const wordReducer = (acc, word, i) => {
        const count = counts[word]
        if (count < this.minWordCount) return acc
        return acc.concat(buildWord(word, i))
      }

      return limitedOrderedWords.reduce(wordReducer, [])
    },
  },
}
</script>

<docs>
  ```jsx
    import example from './exampleText.js'

    <WordChart :text='example.text' />
  ```
</docs>
