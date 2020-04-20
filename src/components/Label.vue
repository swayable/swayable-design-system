<template>
  <component
    :is='element'
    class='tag rounded-full inline-block min-w-5 text-center'
    :class='classes'
  >
    <slot />
  </component>
</template>

<script>
/**
 * Display additional information
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

<style lang="scss">
.tag { @apply bg-light-2 }
.theme-dark-mode {
  .tag { @apply bg-dark-5 }
}
</style>

<docs>
  ```jsx
  <Label small>Small</Label>
  <Label>Normal</Label>
  <Label small class='bg-orange border-orange-dark text-white font-mono font-semibold'>98,234</Label>
  <div class='theme-dark-mode mt-1 p-2 pt-1 inline-block'>
    <Label small>Dark Mode</Label>
  <div>
  <div>
  ```
</docs>
