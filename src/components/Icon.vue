<template>
  <!-- eslint-disable vue/no-v-html -->
  <svg
    :height='sizeNum'
    :width='sizeNum'
    :aria-label='ariaLabel'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    class='icon self-center inline-block fill-current'
    :class='fill'
    v-html='svg'
  />
</template>

<script>
const req = require.context('@/assets/icons/', true, /^\.\/.*\.svg$/)

/**
 * Icons represent actions and concepts through out the product. They come in three sizes and response to utility classes such as `text-<color>` and `rotate-<fraction>`.
 */
export default {
  name: 'Icon',
  status: 'ready',
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
    element: {
      type: String,
      default: 'span',
    },
    /**
     * The size of the icon
     * `xs, sm, md, lg`
     */
    size: {
      type: String,
      default: 'sm',
      validator: value => {
        return value.match(/(xs|sm|md|lg)/)
      },
    },
  },
  data() {
    return {
      svg: req('./' + this.name + '.svg'),
    }
  },
  computed: {
    sizeNum() {
      return {
        xs: '12',
        sm: '16',
        md: '24',
        lg: '48',
      }[this.size]
    },
  },
}
</script>

<docs>
  ```jsx
  const icons = [ 'tests', 'metric', 'segment', 'content', 'library', 'respondents', 'active', 'complete', 'bar-distribute', 'bar-equal', 'bar-float', 'check', 'chevron', 'cross', 'download', 'ellipsis', 'ellipsis-active', 'menu', 'tag', 'user']
 
  <div class='flex flex-wrap'>
    <div class='m-2'  v-for='icon in icons'>
      <ToolTip>
        <template #tip>
          <span class='text-sm'>{{ icon }}</span>
        </template>
        <Icon :name='icon' size='md' class='text-blue' />
      </ToolTip>
    </div>
  </div>
  ```
</docs>
