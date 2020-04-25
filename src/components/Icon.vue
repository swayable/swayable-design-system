<template>
  <!-- eslint-disable vue/no-v-html -->
  <svg
    :height='sizeNum'
    :width='sizeNum'
    :aria-label='ariaLabel'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    class='icon self-center inline-block'
    :class='colorType'
    fill='none'
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
      default: 'md',
      validator: value => {
        return value.match(/(sm|md|lg|xl)/)
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
        sm: '16',
        md: '24',
        lg: '32',
        xl: '48',
      }[this.size]
    },
    colorType() {
      return this.svg.includes('stroke')
        ? 'stroke-current'
        : 'fill-current'
    },
  },
}
</script>

<docs>
  ```jsx
  const objects= [
    'swayable',
    'tests',
    'segment',
    'respondents',
    'content',
    'document',
    'user'
  ]
  const status = [
    'alert',
    'active',
    'draft',
    'loading',
    'checked-circle',
    'fork',
  ]
  const actions = [
    'add',
    'remove',
    'close',
    'edit',
    'cross',
    'play',
    'search',
    'trash',
    'list-first',
    'list-last',
    'drag',
    'arrow',
    'caret',
    'chevron',
    'download',
    'bar-distribute',
    'bar-equal',
    'bar-float',
    'unchecked',
    'check',
    'checked',
    'radio-off',
    'radio-on',
    'ellipsis',
    'burger',
    'grid',
    'settings',
    'sun',
    'moon',
    'logout',
    'media',
  ]

  const icons = { objects, status, actions }
 
  <div class='flex flex-col px-2'>
    <div
      v-for='(icons, group) in icons'
      :key='group'
    >
      <h3 class='typography-3 text-tertiary capitalize'>{{ group }}</h3>
      <div class='flex flex-wrap mt-3 mb-7 text-secondary'>
        <ToolTip
          v-for='icon in icons'
          :key='icon'
        >
          <template #tip>{{ icon }}</template>
          <Icon size='lg' class='m-2' :name='icon' />
        </ToolTip>
      </div>
    </div>
  </div>
  ```
</docs>
