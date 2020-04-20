<template>
  <!-- eslint-disable vue/multiline-html-element-content-newline -->
  <textarea
    v-if='type === "textarea"'
    :disabled='disabled'
    :type='type'
    class='text-input text-sm p-2 rounded border border-grey leading-tight'
    :class='variantClasses'
    :placeholder='placeholder'
    v-on='eventBindings'
  >{{ value }}</textarea>
  <input
    v-else
    :disabled='disabled'
    :type='type'
    :value='value'
    class='text-input text-sm p-2 rounded border border-grey leading-tight'
    :class='variantClasses'
    :placeholder='placeholder'
    v-on='eventBindings'
  >
</template>

<script>
/**
 * Provides various types of short text input, and also textarea for longer input.
 */
export default {
  name: 'TextInput',
  status: 'ready',
  props: {
    /**
     * The type of the form input field.
     * `text, number, email, password, search, textarea`
     */
    type: {
      type: String,
      default: 'text',
      validator: value => {
        return value.match(/(text|number|email|password|search|textarea)/)
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
        ? 'bg-light-4 text-dark-5 cursor-not-allowed disabled'
        : 'bg-white text-blue-dark focus:shadow-outline focus:border-blue'
    },
  },
}
</script>

<docs>
  ```jsx
  <div class='flex'>
    <TextInput class='flex-grow m-1' placeholder="Placeholder" />
    <TextInput class='flex-grow m-1' value="Text Input" />
    <TextInput class='flex-grow m-1' value="Disabled" disabled />
  </div>
  <div class='flex'>
    <TextInput class='flex-grow m-1' type="textarea" placeholder="Placeholder" />
    <TextInput class='flex-grow m-1' type="textarea" value="Text Area" />
    <TextInput class='flex-grow m-1' value="Disabled" type="textarea" disabled />
  </div>
  ```
</docs>
