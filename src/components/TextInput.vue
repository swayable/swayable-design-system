<template>
  <!-- eslint-disable vue/multiline-html-element-content-newline -->
  <textarea
    v-if='type === "textarea"'
    :disabled='disabled'
    :type='type'
    class='text-input rounded-md leading-tight border border-default'
    :class='variantClasses'
    :placeholder='placeholder'
    v-on='eventBindings'
  >{{ value }}</textarea>
  <input
    v-else
    :disabled='disabled'
    :type='type'
    :value='value'
    class='text-input rounded-md border border-default'
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
    /**
     * Is smaller
     */
    small: {
      type: Boolean,
      default: false,
    },
    /**
     * In error state
     */
    error: {
      type: Boolean,
      default: false,
    },
    /**
     * Highlighted border
     */
    active: { type: Boolean, default: false },
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
      let border = 'border-default'
      if (this.active) border = 'border-blue-1'
      if (this.error) border = 'border-red-1'

      const able = this.disabled
        ? 'cursor-not-allowed disabled'
        : 'bg-card focus:shadow-outline'
      const size = this.small
        ? 'px-2 leading-6 text-md'
        : 'px-2 leading-7 text-lg'
      const py = (this.type === 'textarea') ? 'py-2' : 'py-px'
      return `${able} ${size} ${py} ${border}`
    },
  },
}
</script>

<style lang="scss">
  .text-input {
    @apply text-dark-4 bg-light-6;
    &[disabled] {
      @apply text-light-2 bg-light-4;
    }
  }
  .theme-dark-mode {
    .text-input {
      @apply text-light-4 bg-dark-2;
      &[disabled] {
        @apply text-dark-3 bg-dark-0 border-dark-3;
      }
    }
  }
</style>

<docs>
  ```jsx
  <div class='p-2'>
    <h3 class='typography-4 w-full uppercase text-light-1'>Light Mode</h3>
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
  </div>

  <div class='mt-5 theme-dark-mode p-2'>
    <h3 class='typography-4 uppercase text-dark-5'>DARK MODE</h3>
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
  </div>
  ```
</docs>
