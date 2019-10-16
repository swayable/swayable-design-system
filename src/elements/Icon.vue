<template>
  <!-- eslint-disable vue/no-v-html -->
  <component
    :is='type'
    :aria-label='ariaLabel'
    :class='`self-center flex justify-center items-center icon ${size}`'
    v-html='svg'
  />
</template>

<script>
const req = require.context('@/assets/icons/', true, /^\.\/.*\.svg$/)

/**
 * Icons are used to visually communicate core parts of the product and
 * available actions. They can act as wayfinding tools to help users more
 * easily understand where they are in the product. They come in three sizes,
 * and respond to text color utility classes.
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
    const sizeNum = {
      small: '14',
      medium: '24',
      large: '48',
    }[this.size]
    return {
      svg: req('./' + this.name + '.svg').replace(/^<svg /, `<svg viewBox="0 0 24 24" height="${sizeNum}" width="${sizeNum}" height="${sizeNum}" class="fill-current ${this.fill} inline-block`),
    }
  },
}
</script>

<docs>
  ```jsx
  <div class="my-5 flex justify-around flex-wrap flex-grow">
    <div class="flex items-center">
      <span class="px-3">Chevron</span>
      <Icon name="chevron" size="small" class="rotate-1/4" />
    </div>
    <div class="flex items-center">
      <span class="px-3">Menu</span>
      <Icon name="menu" />
    </div>
    <div class="flex items-center">
      <span class="px-3">Respondents</span>
      <Icon name="respondents" size="large" />
    </div>
    <div class="flex items-center">
      <span class="px-3">Tests</span>
      <Icon name="tests" />
    </div>
    <div class="flex items-center">
      <span class="px-3">Library</span>
      <Icon name="library" class="text-blue" />
    </div>
  </div>
  ```
</docs>
