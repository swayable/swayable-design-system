<template>
  <component 
    :is='wrapper' 
    :class='["textarea", { "textarea-expand": width === "expand" }]'
  >
    <label 
      v-if='label' 
      :for='id'
    >
      {{ label }}
    </label>
    <textarea
      :id='id'
      v-model='value'
      :disabled='disabled'
      :class='state'
      :placeholder='placeholder'
      @input='onInput($event.target.value)'
      @focus='onFocus($event.target.value)'
    />
  </component>
</template>

<script>
/**
 * Textareas are used to allow users to provide text input when the expected
 * input is long. Textarea has a range of options. For shorter input,
 * use the `Input` element.
 */
export default {
  name: 'Textarea',
  status: 'prototype',
  release: '0.1.0',
  props: {
    /**
     * Text value of the form textarea.
     */
    value: {
      type: String,
      default: null,
    },
    /**
     * The placeholder value for the form textarea.
     */
    placeholder: {
      type: String,
      default: null,
    },
    /**
     * The label of the form textarea.
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
     * Unique identifier of the form textarea.
     */
    id: {
      type: String,
      default: null,
    },
    /**
     * The width of the form textarea.
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
     * Whether the form textarea is disabled or not.
     * `true, false`
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Manually trigger various states of the textarea.
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
    <Textarea label="Default textarea" placeholder="Write your text" id="textarea-1" />
    <Textarea label=":focus" state="focus" placeholder="Write your text" id="textarea-2" />
    <Textarea label="[disabled]" disabled value="Write your text" id="textarea-3" />
  </div>
  ```
</docs>
