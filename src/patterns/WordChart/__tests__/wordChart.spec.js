import _reduce from 'lodash/reduce'
import _times from 'lodash/times'
import { shallowMount } from '@vue/test-utils'

import WordChart from '../WordChart'

const buildText = (wordsCounts) => _reduce(wordsCounts, (acc, count, word) => {
  const add = _times(count, () => word).join(' ')
  return `${acc} ${add}`
}, '')

describe('WordChart.vue', () => {
  const mountWordChart = (propsData = {}) =>
    shallowMount(WordChart, { propsData })

  it('styles words with different colors', () => {
    const text = buildText({ hello: 20, goodbye: 10 })
    const wrapper = mountWordChart({ text })
    const wordChartWords = wrapper.find('.word-chart').findAll('a')
    const hello = wordChartWords.at(0)
    const goodbye = wordChartWords.at(1)

    expect(hello.element.style['color']).not.toEqual(goodbye.element.style['color'])
  })

  it('styles fontsize proportioned by their incidence and maximumFontSize', () => {
    const text = buildText({ hello: 20, goodbye: 10 })
    const wrapper = mountWordChart({ text, maximumFontSize: 2 })
    const wordChartWords = wrapper.find('.word-chart').findAll('a')
    const hello = wordChartWords.at(0)
    const goodbye = wordChartWords.at(1)
    
    expect(hello.element.style['font-size']).toBe('2rem')
    expect(goodbye.element.style['font-size']).toBe('1rem')
  })

  it('emits the word and count when a word is clicked', () => {
    const text = buildText({ hello: 20, goodbye: 10 })
    const wrapper = mountWordChart({ text, maximumFontSize: 2 })
    const wordChartWords = wrapper.find('.word-chart').find('a').trigger('click')

    expect(wrapper.emitted('selectWord')).toEqual([[{ frequency: 20,  word: 'hello' }]])
  })

  it('displays the most frequent words limited by maxWordsShown', () => {
    const text = buildText({ hello: 20, goodbye: 10, howdy: 15, aloha: 18, sayonara: 30 })
    const wrapper = mountWordChart({ text, maxWordsShown: 4 })
    const wordChartText = wrapper.find('.word-chart').text()

    expect(wordChartText.includes('hello')).toBe(true)
    expect(wordChartText.includes('goodbye')).toBe(false)
    expect(wordChartText.includes('howdy')).toBe(true)
    expect(wordChartText.includes('aloha')).toBe(true)
    expect(wordChartText.includes('sayonara')).toBe(true)
  })

  it('display words with character counts greater or equal to minWordLength', () => {
    const text = buildText({ hi: 20, bye: 30, hello: 10 })
    const wrapper = mountWordChart({ text, minWordLength: 3 })
    const wordChartText = wrapper.find('.word-chart').text()

    expect(wordChartText.includes('hi')).toBe(false)
    expect(wordChartText.includes('bye')).toBe(true)
    expect(wordChartText.includes('hello')).toBe(true)
  })

  it('display words with a frequency greater or equal to minWordFrequency', () => {
    const text = buildText({ hello: 20, goodbye: 2, howdy: 3 })
    const wrapper = mountWordChart({ text, minWordFrequency: 3 })
    const wordChartText = wrapper.find('.word-chart').text()

    expect(wordChartText.includes('hello')).toBe(true)
    expect(wordChartText.includes('howdy')).toBe(true)
    expect(wordChartText.includes('goodbye')).toBe(false)
  })

  it('does not display words in the ignored words list', () => {
    const text = buildText({ hello: 20, goodbye: 10 })
    const wrapper = mountWordChart({ text, ignoreWords: ['goodbye'] })
    const wordChartText = wrapper.find('.word-chart').text()

    expect(wordChartText.includes('hello')).toBe(true)
    expect(wordChartText.includes('goodbye')).toBe(false)
  })

  it('accurately displays number of dropped words', () => {
    const text = buildText({ hello: 20, goodbye: 1, hi: 5, bye: 20 })
    const wrapper = mountWordChart({
      text,
      ignoreWords: ['bye'],
      minWordFrequency: 2,
      minWordLength: 3,
      showDroppedWordCount: true,
    })
    const wordChartText = wrapper.find('.word-chart').text()
    expect(wordChartText.includes('3 trivial and low-frequency words not shown')).toBe(true)
  })
})