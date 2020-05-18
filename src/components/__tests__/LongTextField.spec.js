import { shallowMount, mount } from '@vue/test-utils'
import LongTextField from '../fields/LongTextField.vue'

const exampleProps = {
  id: 1,
  name: 'example',
  required: true,
  placeholder: 'enter text here',
  prompt: 'How much do you love this input?',
}

describe('match the snapshot', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(LongTextField, { propsData: exampleProps })
    expect(wrapper.html()).toMatchSnapshot()
    wrapper.destroy()
  })
})


describe('help text passed in', () => {
  it('renders helpText only when provided', () => {
    const helpText = 'Help!'
    let wrapper = mount(LongTextField, { propsData: exampleProps })
    
    expect(wrapper.text()).not.toContain(helpText)

    wrapper = mount(LongTextField, { propsData: { helpText, ...exampleProps }})
    expect(wrapper.text()).toContain(helpText)
  })
})

