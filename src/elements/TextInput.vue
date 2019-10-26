<template>
  <input
    :disabled='disabled'
    :type='type'
    :value='value'
    class='text-input text-sm p-2 rounded border border-grey font-medium leading-tight'
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
        ? 'bg-grey-light text-grey-darker cursor-not-allowed disabled'
        : 'bg-white text-blue-dark focus:shadow-outline focus:border-blue'
    },
  },
}
</script>

<style lang="scss">
.text-input {
  ::placeholder {
    @apply text-grey;
  }
  &:hover:not(.disabled) {
  }
  &.disabled {
    @apply bg-grey;
  }
}
[data-theme='dark'] {
 
}
</style>

<docs>
  ```jsx
    <TextInput placeholder="Placeholder" />
    <TextInput value="Text Input" />
    <TextInput value="Disabled" disabled />
  ```
</docs>
