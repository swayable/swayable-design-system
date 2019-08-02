<template>
  <component
    :is='level'
    class='heading'
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
}
</script>

<docs>
  ```jsx
  <div>
    <Heading>The quick brown fox</Heading>
    <Heading level="h2">The quick brown fox</Heading>
    <Heading level="h3">The quick brown fox</Heading>
    <Heading level="h4">The quick brown fox</Heading>
  </div>
  ```
</docs>
