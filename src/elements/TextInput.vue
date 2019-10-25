<template>
  <input
    :disabled='disabled'
    :type='type'
    :value='value'
    class='text-input p-2 rounded-lg border shadow-inner'
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
  name: 'TextInput',
  status: 'ready',
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
        ? 'cursor-not-allowed text-grey-dark bg-grey-lighter disabled'
        : 'focus:shadow-outline focus:border-blue'
    },
  },
}
</script>

<style lang="scss">
:root {
  --input-bg-color: theme('colors.white');
  --input-border-color: theme('colors.grey-light');
  --disabled-input-bg-color: theme('colors.grey-lightest');
  --hovered-input-border-color: theme('colors.grey');
}

[data-theme='dark'] {
  --input-bg-color: theme('colors.black');
  --input-border-color: theme('colors.grey-darker');
  --disabled-input-bg-color: theme('colors.grey-darker');
}
.text-input {
  background-color: var(--input-bg-color);
  border-color: var(--input-border-color);
  &:hover:not(.disabled) {
    border-color: var(--hovered-input-border-color);
  }
  &.disabled {
    background-color: var(--disabled-input-bg-color) !important;
  }
}
</style>

<docs>
  ```jsx
    <TextInput placeholder="Default Input" />
    <TextInput placeholder="Disabled Input" disabled />
  ```
</docs>
