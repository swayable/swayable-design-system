<template>
  <input
    :id='id'
    :disabled='disabled'
    :type='type'
    :value='value'
    :class='["p-2", "rounded", style]'
    :placeholder='placeholder'
    @input='onInput($event.target.value)'
    @focus='onFocus($event.target.value)'
    @click='onClick($event.target.value)'
  >
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
     * Unique identifier of the form input field.
     */
    id: {
      type: String,
      default: null,
    },
    /**
     * Whether the form input field is disabled or not.
     * `true, false`
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    style() {
      if (this.disabled) return ['cursor-not-allowed', 'text-grey']

      return [
        'shadow-inner',
        'focus:shadow-outline',
        'border',
        'border-grey-0',
        'hover:border-grey',
        'focus:border-blue',
      ]
    },
  },
  methods: {
    onInput(value) {
      this.$emit('change', value)
    },
    onFocus(value) {
      this.$emit('focus', value)
    },
    onClick(value) {
      this.$emit('click', value)
    },
  },
}
</script>

<docs>
  ```jsx
  <div>
    <Input placeholder="Default Input" id="input-1" />
    <Input disabled value="Disabled" id="input-4" />
  </div>
  ```
</docs>
