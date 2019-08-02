<template>
  <component 
    :is='type' 
    :aria-label='ariaLabel' 
    :class='`h-6 w-6 self-center flex justify-center items-center icon ${size}`'
    v-html='svg'
  />
</template>

<script>
const req = require.context('@/assets/icons/', true, /^\.\/.*\.svg$/)

/**
 * Icons are used to visually communicate core parts of the product and
 * available actions. They can act as wayfinding tools to help users more
 * easily understand where they are in the product.
 */
export default {
  name: 'Icon',
  status: 'prototype',
  release: '0.1.0',
  props: {
    /**
     * The name of the icon to display.
     */
    name: {
      type: String,
      required: true,
      default: 'settings',
    },
    /**
     * The fill color of the SVG icon.
     */
    fill: {
      type: String,
      default: 'currentColor',
    },
    /**
     * Descriptive text to be read to screenreaders.
     */
    ariaLabel: {
      type: String,
      default: 'icon',
    },
    /**
     * The html element name used for the icon.
     */
    type: {
      type: String,
      default: 'span',
    },
    /**
     * The size of the icon. Defaults to medium.
     * `small, medium, large`
     */
    size: {
      type: String,
      default: 'medium',
      validator: value => {
        return value.match(/(small|medium|large)/)
      },
    },
  },
  data() {
    return {
      svg: req('./' + this.name + '.svg').replace(/^<svg /, `<svg class="fill-current ${this.fill}" `),
    }
  },
}
</script>

<style lang="scss">
// This is here just to provide defaults if the original tokens are removed.
// Can be removed once you’re ready to start defining your own sizes.

// We don’t want to use scoped since these styles need to cascade down to SVGs.
// We also want to be able to style .icon inside buttons etc.
.icon {
  @include reset;
  &.large svg {
    width: 48px;
    height: 48px;
  }
  &.medium svg {
    width: 24px;
    height: 24px;
  }
  &.small svg {
    width: 16px;
    height: 16px;
  }
}
</style>

<docs>
  ```jsx
  <div>
    <Icon name="ready" aria-label="Component is ready" fill="#7cb518" />
    <Icon name="review" fill="rgb(255,186,10)" />
    <Icon name="deprecated" fill="rgb(235,59,36)" />
    <Icon name="prototype" fill="rgb(37,138,239)" />
  </div>
  ```
</docs>
