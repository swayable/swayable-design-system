<template>
  <component
    :is='type'
    :class='["font-heading", "font-medium", textClass]'
  >
    <slot />
  </component>
</template>

<script>
/**
 * Headings are used as titles of each major section of a page.
 */
export default {
  name: 'Heading',
  status: 'prototype',
  release: '0.1.0',
  props: {
    /**
     * The heading type used for the heading.
     * `h1, h2, h3, h4, h5, h6`
     */
    type: {
      type: String,
      default: 'h1',
      validator: value => {
        return value.match(/(h1|h2|h3|h4|h5|h6)/)
      },
    },
  },

  computed: {
    textClass() {
      switch (this.type) {
      case 'h1': return 'text-4xl'
      case 'h2': return 'text-3xl'
      case 'h3': return 'text-2xl'
      case 'h4': return 'text-xl'
      case 'h5': return 'text-lg'
      default: return ''
      }
    },
  },
}
</script>

<docs>
  ```jsx
  <div>
    <Heading type="h1">h1. The Quick Brown Fox</Heading>
    <Heading type="h2">h2. The Quick Brown Fox</Heading>
    <Heading type="h3">h3. The Quick Brown Fox</Heading>
    <Heading type="h4">h4. The Quick Brown Fox</Heading>
    <Heading type="h5">h5. The Quick Brown Fox</Heading>
    <Heading type="h6">h6. The Quick Brown Fox</Heading>
  </div>
  ```
</docs>
