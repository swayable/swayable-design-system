import Vue from 'vue'
import Color from 'docs/components/tokens/Color.vue'

const Constructor = Vue.extend(Color)
const vm = new Constructor().$mount()

describe('Color.vue', () => {
  it('should render correct contents', () => {
    expect(vm.$el.querySelector('.color')).toBeDefined()
  })

  it('should render multiple colors', () => {
    expect(vm.$el.querySelectorAll('.color').length).toBeGreaterThan(2)
  })

  it('should create code elements for copy pasting', () => {
    expect(vm.$el.querySelector('.color span')).toBeDefined()
  })

  it('should create swatches and apply inline styles', () => {
    expect(vm.$el.querySelector('.color .swatch')).toBeDefined()
  })
})
