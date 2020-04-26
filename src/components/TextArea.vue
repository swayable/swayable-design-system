<template>
  <!-- eslint-disable vue/multiline-html-element-content-newline -->
  <textarea
    :disabled='disabled'
    :type='type'
    class='text-input border rounded-md min-h-8'
    :class='textAreaClasses'
    :placeholder='placeholder'
    v-on='eventBindings'
  >{{ value }}</textarea>
</template>

<script>
import TextInput from './TextInput'

/**
 * Input textarea for longer text
 */
export default {
  name: 'TextArea',
  extends: TextInput,
  computed: {
    textAreaClasses() {
      return `${this.wrapperClasses} ${this.inputClasses}`
    },
  },
}
</script>

<docs>
  ```jsx
  <div class='p-2'>
    <h3 class='typography-4 w-full uppercase text-light-1'>Light Mode</h3>
    <div class='flex'>
      <TextArea class='flex-grow m-1' placeholder="Placeholder" />
      <TextArea class='flex-grow m-1' value='Text Area' />
      <TextArea class='flex-grow m-1' value="Disabled" disabled />
    </div>
  </div>

  <div class='mt-5 theme-dark-mode p-2'>
    <h3 class='typography-4 uppercase text-dark-5'>DARK MODE</h3>
    <div class='flex'>
      <TextArea class='flex-grow m-1' placeholder="Placeholder" />
      <TextArea class='flex-grow m-1' value="Text Area" />
      <TextArea class='flex-grow m-1' value="Disabled" disabled />
    </div>
  </div>
  ```
</docs>
