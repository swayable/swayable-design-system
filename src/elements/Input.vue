<template>
  <input
    :disabled='disabled'
    :type='type'
    :value='value'
    class='p-2 rounded-lg border border-grey-200 shadow-inner focus:shadow-outline hover:border-grey focus:border-blue'
    :class='variantClasses'
    :placeholder='placeholder'
    v-on='eventBindings'
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
     * `text, number, email, password, search`
     */
    type: {
      type: String,
      default: 'text',
      validator: value => {
        return value.match(/(text|number|email|password|search)/)
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
     * Whether the form input field is disabled or not.
     * `true, false`
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    eventBindings() {
      // $listeners emits all events to parent component
      // input event is a hack to make v-model work
      // see https://github.com/vuejs/vue/issues/7042#issuecomment-344948474
      return {
        ...this.$listeners,
        input: e => this.$emit('input', e.target.value),
      }
    },
    variantClasses() {
      return this.disabled
        ? 'cursor-not-allowed text-grey-600 bg-grey-100'
        : 'bg-white'
    },
  },
}
</script>

<docs>
  ```jsx
    <Input placeholder="Default Input" />
    <Input placeholder="Disabled Input" disabled />
  ```
</docs>
