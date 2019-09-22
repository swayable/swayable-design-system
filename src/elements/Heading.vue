<template>
  <component
    :is='level'
    :class='["font-heading", "font-medium", textClass]'
  >
    <slot />
  </component>
</template>

<script>
/**
 * Headings are used as the titles of each major section of a page in the
 * interface. For example, templates generally use headings as their title.
 * Heading element provides an option to change the level of the heading.
 */
export default {
  name: 'Heading',
  status: 'prototype',
  release: '0.1.0',
  props: {
    /**
     * The heading level used for the heading.
     * `h1, h2, h3, h4, h5, h6`
     */
    level: {
      type: String,
      default: 'h1',
      validator: value => {
        return value.match(/(h1|h2|h3|h4|h5|h6)/)
      },
    },
  },

  computed: {
    textClass() {
      switch (this.level) {
      case 'h1': return 'text-4xl'
      case 'h2': return 'text-3xl'
      case 'h3': return 'text-2xl'
      case 'h4': return 'text-xl'
      case 'h5': return 'text-lg'
      default:   return 'text-md'
      }
    },
  },
}
</script>

<docs>
  ```jsx
  <div>
    <Heading level="h1">h1. The Quick Brown Fox</Heading>
    <Heading level="h2">h2. The Quick Brown Fox</Heading>
    <Heading level="h3">h3. The Quick Brown Fox</Heading>
    <Heading level="h4">h4. The Quick Brown Fox</Heading>
    <Heading level="h5">h5. The Quick Brown Fox</Heading>
    <Heading level="h6">h6. The Quick Brown Fox</Heading>
  </div>
  ```
</docs>
