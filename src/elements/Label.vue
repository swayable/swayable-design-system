<template>
  <component
    :is='element'
    :class='classes'
  >
    <slot />
  </component>
</template>

<script>
/**
 * Labels are generally used for contextual information
 */
export default {
  name: 'Label',
  status: 'ready',
  props: {
    /**
     * The html element used for the label.
     */
    element: {
      type: String,
      default: 'span',
    },
    /**
     * The size of the label. Defaults to medium.
     * `small, medium, large`
     */
    size: {
      type: String,
      default: 'medium',
      validator: value => {
        return value.match(/(small|medium|large)/)
      },
    },
    /**
     * Style variation to give additional meaning.
     */
    primary: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      const variation = () => {
        if (this.primary) return 'text-white bg-blue-dark border border-blue-dark'
        return 'text-blue-dark border bg-grey-light border-grey-light'
      }
      const size = {
        small: '',
        medium: '',
        large: '',
      }[this.size]
      const classes = ['label', 'py-2 px-3', 'text-sm', 'leading-snug', 'rounded', 'inline-block']
      classes.push(variation())
      classes.push(size)
      return classes
    },
  },
}
</script>

<docs>
  ```jsx
  <Label primary>Primary</Label>
  <Label>Normal</Label>
  ```
</docs>
