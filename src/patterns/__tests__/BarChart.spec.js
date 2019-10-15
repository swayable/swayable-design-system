import { shallowMount } from '@vue/test-utils'
import BarChart from '../BarChart'

describe('BarChart.vue', () => {
  const negativeProps = {
    baselineLabel: '◀ 18.5%',
    deltaLabel: '-14.1%',
    baseline: 1.85,
    delta: -1.41,
    error: 1.2,
    max: 7,
    min: -2,
    scale: 10,
  }

  const positiveProps = {
    baselineLabel: '38.5% ▶',
    deltaLabel: '+44.2%',
    baseline: 3.85,
    delta: 4.42,
    error: 0.9,
    max: 7,
    min: -2,
    scale: 10,
  }

  const insignificantProps = {
    insignificant: true,
    baselineLabel: '◀ 54.5%',
    deltaLabel: '-2.4%',
    baseline: 5.45,
    delta: -0.24,
    error: 0.61,
    max: 7,
    min: -2,
    scale: 10,
  }

  describe('insignificant', () => {
    it('matches the snapshot', () => {
      const wrapper = shallowMount(BarChart, { propsData: insignificantProps })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('positive delta', () => {
    it('matches the snapshot', () => {
      const wrapper = shallowMount(BarChart, { propsData: positiveProps })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('positive baseline', () => {
    it('matches the snapshot', () => {
      const propsData = {
        ...positiveProps,
        mode: 'baseline',
      }
      const wrapper = shallowMount(BarChart, { propsData })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('negative delta', () => {
    it('matches the snapshot', () => {
      const wrapper = shallowMount(BarChart, { propsData: negativeProps })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('negative baseline', () => {
    it('matches the snapshot', () => {
      const propsData = {
        ...negativeProps,
        mode: 'baseline',
      }
      const wrapper = shallowMount(BarChart, { propsData })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
