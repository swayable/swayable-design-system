<template>
  <component
    :is='element'
    class='rounded-full inline-block min-w-5 text-center border'
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
     * Smaller label
     */
    small: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      return this.small
        ? 'py-px px-1 text-xs'
        : 'py-0.5 px-2 text-sm'
    },
  },
}
</script>

<docs>
  ```jsx
  <Label small>Small</Label>
  <Label>Normal</Label>

  <Label small class='bg-orange border-orange-dark text-white font-mono font-semibold'>98,234</Label>
  <Label class='bg-red text-white border-red-dark'>Tag</Label>
  ```
</docs>
