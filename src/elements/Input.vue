<template>
  <component 
    :is='wrapper' 
    :class='["input", { "input-expand": width === "expand" }]'
  >
    <label 
      v-if='label' 
      :for='id'
    >
      {{ label }}
    </label>
    <input
      :id='id'
      :disabled='disabled'
      :type='type'
      :value='value'
      :class='state'
      :placeholder='placeholder'
      @input='onInput($event.target.value)'
      @focus='onFocus($event.target.value)'
    >
  </component>
</template>

<script>
/**
 * Form Inputs are used to allow users to provide text input when the expected
 * input is short. Form Input has a range of options and supports several text
 * formats including numbers. For longer input, use the form `Textarea` element.
 */
export default {
  name: 'Input',
  status: 'prototype',
  release: '0.1.0',
  props: {
    /**
     * The type of the form input field.
     * `text, number, email`
     */
    type: {
      type: String,
      default: 'text',
      validator: value => {
        return value.match(/(text|number|email)/)
      },
    },
    /**
     * Text value of the form input field.
     */
    value: {
      type: String,
      default: null,
    },
    /**
     * The placeholder value for the form input field.
     */
    placeholder: {
      type: String,
      default: null,
    },
    /**
     * The label of the form input field.
     */
    label: {
      type: String,
      default: null,
    },
    /**
     * The html element name used for the wrapper.
     * `div, section`
     */
    wrapper: {
      type: String,
      default: 'div',
      validator: value => {
        return value.match(/(div|section)/)
      },
    },
    /**
     * Unique identifier of the form input field.
     */
    id: {
      type: String,
      default: null,
    },
    /**
     * The width of the form input field.
     * `auto, expand`
     */
    width: {
      type: String,
      default: 'expand',
      validator: value => {
        return value.match(/(auto|expand)/)
      },
    },
    /**
     * Whether the form input field is disabled or not.
     * `true, false`
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Manually trigger various states of the input.
     * `hover, active, focus`
     */
    state: {
      type: String,
      default: null,
      validator: value => {
        return value.match(/(hover|active|focus)/)
      },
    },
  },
  methods: {
    onInput(value) {
      this.$emit('change', value)
    },
    onFocus(value) {
      this.$emit('focus', value)
    },
  },
}
</script>

<docs>
  ```jsx
  <div>
    <Input label="Default input" placeholder="Write your text" id="input-1" />
    <Input label=":hover" state="hover" placeholder="Write your text" id="input-2" />
    <Input label=":focus" state="focus" placeholder="Write your text" id="input-3" />
    <Input label="[disabled]" disabled value="Write your text" id="input-4" />
  </div>
  ```
</docs>
