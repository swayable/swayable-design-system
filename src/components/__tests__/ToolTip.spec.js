import { shallowMount } from '@vue/test-utils'
import ToolTip from '../ToolTip'

describe('ToolTip.vue', () => {
  describe('position top', () => {
    it('matches the snapshot', () => {
      const wrapper = shallowMount(ToolTip, { propsData: { position: 'top' } })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('position right', () => {
    it('matches the snapshot', () => {
      const wrapper = shallowMount(ToolTip, { propsData: { position: 'right' } })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('position bottom', () => {
    it('matches the snapshot', () => {
      const wrapper = shallowMount(ToolTip, { propsData: { position: 'bottom' } })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('position left', () => {
    it('matches the snapshot', () => {
      const wrapper = shallowMount(ToolTip, { propsData: { position: 'left' } })
      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
