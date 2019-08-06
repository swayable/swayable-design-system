import _reduce from './node_modules/lodash/reduce'
import _times from './node_modules/lodash/times'
import { shallowMount } from './node_modules/@vue/test-utils'

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

    expect(wrapper.emitted('selectWord')).toEqual([[{ count: 20,  word: 'hello' }]])
  })

  xit('displays no more words than maxWordsShown', () => {})
  xit('does not display words with less characters than minWordLength', () => {})
  xit('does not display words with less incidence than minWordCount', () => {})
  xit('does not display words in the provided language\'s ignored words list', () => {})
})
