<template>
  <component
    :is='type'
    class='word-chart leading-none'
  >
    <a
      v-for='word in chartWords'
      :key='word.text'
      class='inline-block mx-1'
      :style='`color: ${word.color}; font-size: ${word.fontSize}`'
      :title='`${word.text} (${word.count})`'
      @click='$emit("selectWord", { word: word.text, count: word.count })'
    >
      {{ word.text }}
    </a>
    <p
      v-if='showDroppedWordCount'
      class='m-4 text-right text-sm text-gray-600'
    >
      {{ droppedWordCount }}  trivial and low-frequency words not shown
    </p>
  </component>
</template>

<script>
import _uniq from 'lodash/uniq'
import _filter from 'lodash/filter'
import _orderBy from 'lodash/orderBy'

import tokens from '../../utils/tokens'

const COLORS = tokens.primaryColors
  .concat(tokens.secondaryColors)
  .map(c => c.value)

const WHITESPACE = /\s+/
const NOT_ALPHANUMERIC_UNDERSCORE_DASH = /[^\w\-]/gi

/**
 * Draws a chart indicating incidence of words
 *
 * **Events**
 *
 * `@selectWord`
 * emits object `{ word:String, frequency:Number }`
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
     * Chart will not display these words
     */
    ignoredWords: {
      type: Array,
      default: () => [],
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
     * The minimum frequency a word must have to be displayed
     */
    minWordFrequency: {
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
    /**
     * Display the number of unique words in props.text not displayed in chart
     */
    showDroppedWordCount: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      droppedWordCount: 0,
      chartWords: [],
    }
  },
  watch: {
    text: 'buildChartWords',
  },
  mounted() {
    this.buildChartWords()
  },
  methods: {
    buildChartWords() {
      let highestFrequency = 0
      this.droppedWordCount = 0
      const ignoredWordsSet = new Set(this.ignoredWords)
      

      const toCanonical = word => word.toLowerCase().replace(NOT_ALPHANUMERIC_UNDERSCORE_DASH, '')
      const frequencyReducer = (acc, w) => {
        const word = toCanonical(w)
        
        if (word.length < this.minWordLength || ignoredWordsSet.has(word)) {
          this.droppedWordCount++
          return acc
        }

        const frequency = (acc[word] || 0) + 1
        if (frequency > highestFrequency) highestFrequency = frequency
        acc[word] = frequency
        return acc
      }
      const wordFrequencies = this.text
        .split(WHITESPACE)
        .reduce(frequencyReducer, {})

      const words = Object.keys(wordFrequencies)
      const displayedWords = _orderBy(
        words,
        word => wordFrequencies[word],
        'desc',
      ).slice(0, this.maxWordsShown)

      const lowFrequencyWords = words.slice(this.maxWordsShown, words.length)
      this.droppedWordCount += lowFrequencyWords.length

      const colorForIndex = i => COLORS[(i + COLORS.length) % COLORS.length]
      const weightForFrequency = frequency => (frequency/highestFrequency) * this.maximumFontSize
      const buildWord = (word, i) => ({
        text: word,
        color: colorForIndex(i),
        fontSize: `${weightForFrequency(wordFrequencies[word])}${this.maximumFontSizeUnits}`,
        count: wordFrequencies[word],
      })
      const wordReducer = (acc, word, i) => {
        if (wordFrequencies[word] < this.minWordFrequency) return acc
        acc.push(buildWord(word, i))
        return acc
      }
      this.chartWords = displayedWords.reduce(wordReducer, [])
    },
  },
}
</script>

<docs>
  ```jsx
    import example from './exampleText.js'

    <WordChart
      :text='example.text'
      :ignoredWords='["and", "the", "of", "to", "you", "in", "that", "we", "it", "is"]'
      :showDroppedWordCount='true'
    />
  ```
</docs>
