import { shallowMount } from '@vue/test-utils'
import { LongTextInput } from '../fields/LongTextInput.vue'

const props = {
  id: 1,
  name: 'example',
  required: 'true',
  placeholder: 'enter text here',
  prompt: 'How much do you love this input?',
}

describe('LongTextInput.vue', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(LongTextInput, { propsData: props })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
