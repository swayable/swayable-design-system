<template>
  <component
    :is='type'
    class='word-chart leading-none'
  >
    <a
      v-for='word in chartWords'
      :key='word.text'
      :class='wordClasses(word)'
      :style='`color: ${word.color}; font-size: ${word.fontSize}${fontSizeUnits}`'
      :title='`${word.text} (${word.frequency})`'
      @click='onClickWord(word)'
    >
      {{ word.text }}
    </a>
    <p
      v-if='showDroppedWordCount'
      class='m-4 text-right text-sm text-gray-600'
    >
      {{ droppedWords.length }} trivial and low-frequency words not shown
    </p>
  </component>
</template>

<script>
import _partition from 'lodash/partition'
import _orderBy from 'lodash/orderBy'

import tokens from '../../utils/tokens'

const COLORS = tokens.primaryColors
  .concat(tokens.secondaryColors)
  .map(c => c.value)

const WHITESPACE = /\s+/
const NOT_ALPHANUMERIC = /[^\w ]|_/g

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
    ignoreWords: {
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
      default: 3.5,
    },
    /**
     * The unit of maximumFontSize
     */
    fontSizeUnits: {
      type: String,
      default: 'rem',
    },
    /**
     * The minimum frequency a word must have to be displayed
     */
    minWordFrequency: {
      type: Number,
      default: 2,
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
    /**
     * Words appear clickable. Disabling will remove cursor pointer, hover state, and prevent event `@selectWord` from emitting
     */
    wordsAreInteractive: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    frequencies() {
      const toCanonical = word => word.toLowerCase().replace(NOT_ALPHANUMERIC, '')
      const words = this.text.split(WHITESPACE)

      return words.reduce((acc, w) => {
        const word = toCanonical(w)
        if (word.length === 0) return acc
        const frequency = (acc.get(word) || 0) + 1
        acc.set(word, frequency)
        return acc
      }, new Map())
    },
    partitionedWords() {
      const ignoreWordsSet = new Set(this.ignoreWords)
      const uniqueWords = Array.from(this.frequencies.keys())

      const tooShort = word => word.length < this.minWordLength
      const tooInfrequent = word => this.frequencies.get(word) < this.minWordFrequency
      const ignored = word => ignoreWordsSet.has(word)

      const [notCandidates, candidates] = _partition(
        uniqueWords,
        word => tooShort(word) || tooInfrequent(word) || ignored(word),
      )

      const orderedCandidates = _orderBy(candidates, word => this.frequencies.get(word), 'desc' )
      const displayed = orderedCandidates.slice(0, this.maxWordsShown)
      const dropped = notCandidates.concat(orderedCandidates.splice(this.maxWordsShown))

      return { displayed, dropped }
    },
    displayedWords() {
      return this.partitionedWords.displayed
    },
    droppedWords() {
      return this.partitionedWords.dropped
    },
    highestFrequency() {
      return this.frequencies.get(this.displayedWords[0])
    },
    chartWords() {
      return this.displayedWords.map((word, i) => {
        const frequency = this.frequencies.get(word)
        return {
          text: word,
          frequency,
          color:  COLORS[(i + COLORS.length) % COLORS.length],
          fontSize: (frequency/this.highestFrequency) * this.maximumFontSize,
        }
      })
    },
  },
  methods: {
    onClickWord(word) {
      if (this.wordsAreInteractive) {
        this.$emit('selectWord', { word: word.text, frequency: word.frequency })
      }
    },
    wordClasses(word) {
      const interactivity = this.wordsAreInteractive ? 'interactive' : ''
      return `inline-block mx-1 word-chart-word ${interactivity}`
    },
  },
}
</script>

<style lang="scss">
.word-chart-word { cursor: default }
.word-chart-word.interactive {
  cursor: pointer;
  &:hover { filter: brightness(120%) }
}
</style>


<docs>
  ```jsx
    import example from './exampleText.js'

    <WordChart
      :text='example.text'
      :ignoreWords='["and", "the", "of", "to", "you", "in", "that", "we", "it", "is"]'
      :showDroppedWordCount='true'
    />
  ```
</docs>
