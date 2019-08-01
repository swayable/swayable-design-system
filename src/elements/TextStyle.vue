<template>
  <component 
    :is='type' 
    :class='["text-style", variation]'
  >
    <slot />
  </component>
</template>

<script>
/**
 * Text style enhances text with additional visual meaning. For example, using
 * disabled text to de-emphasize it from its surrounding text. Don’t use text
 * styles only for aesthetic effect.
 */
export default {
  name: 'TextStyle',
  status: 'prototype',
  release: '0.1.0',
  props: {
    /**
     * The html element used for the text style.
     * `span, em, i, strong`
     */
    type: {
      type: String,
      default: 'span',
      validator: value => {
        return value.match(/(span|em|i|strong)/)
      },
    },
    /**
     * Style variation to give additional meaning.
     * `default, disabled, strong, positive, negative`
     */
    variation: {
      type: String,
      default: 'default',
      validator: value => {
        return value.match(/(default|disabled|strong|positive|negative)/)
      },
    },
  },
}
</script>

<docs>
  ```jsx
  <div>
    <TextStyle variation="default">Design isn’t just about the look and feel.</TextStyle>
    <br />
    <TextStyle variation="disabled">Design isn’t just about</TextStyle>
    <br />
    <TextStyle variation="strong">Design isn’t</TextStyle>
  </div>
  ```
</docs>
