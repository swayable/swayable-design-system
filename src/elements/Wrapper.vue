<template>
  <component
    :is='type'
    class='wrapper'
  >
    <slot />
  </component>
</template>

<script>
/**
 * Used to build the outer wrapper of a page, including the page title and
 * associated actions. Wrapper doesn’t provide customizable options.
 */
export default {
  name: 'Wrapper',
  status: 'prototype',
  release: '0.1.0',
  props: {
    /**
     * The html element name used for the wrapper.
     */
    type: {
      type: String,
      default: 'div',
    },
  },
}
</script>

<docs>
  ```jsx
  <Wrapper>Wrapper can be used to wrap any components together.</Wrapper>
  ```
</docs>
