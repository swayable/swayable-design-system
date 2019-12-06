<template>
  <component
    :is='smartElement'
    v-bind='navigation'
    :class='{
      active,
      spaced: !flush,
    }'
    :title='title'
    class='nav-item relative whitespace-no-wrap flex font-semibold items-stretch max-w-full'
    v-on='$listeners'
  >
    <span class='flex flex-grow max-w-full relative items-center'>
      <span
        class='flex-grow max-w-full items-center flex-col'
        :class='{ interactive }'
      >
        <slot>{{ name }}</slot>
      </span>
    </span>
  </component>
</template>

<script>
/**
 * The links used in NavBar.
 */
export default {
  name: 'NavItem',
  status: 'ready',
  props: {
    /**
     * The html element
     */
    element: {
      type: String,
    },
    /**
     * Router link
     */
    to: {
      type: Object,
    },
    /**
     * Web link
     */
    href: {
      type: String,
    },
    /**
     * Indicates whether this is the current link
     */
    active: {
      type: Boolean,
      default: false,
    },
    /**
     * Displayed text (overriden by default slot)
     */
    name: {
      type: String,
    },
    /**
     * Description of link (usually displayed on hover)
     */
    title: {
      type: String,
    },
    /**
     * Removes horizontal spacing around NavItem
     */
    flush: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    interactive() {
      const noninteractive = [undefined, null].includes(this.to)
        && [undefined, null].includes(this.href)
      return !noninteractive
    },
    smartElement() {
      if (this.element) return this.element
      if (this.to) return 'router-link'
      if (this.href) return 'a'
      return 'span'
    },
    navigation() {
      if (this.smartElement === 'router-link') return { to: (this.to || this.href) }
      if (this.smartElement === 'a') return { href: this.href }
      return {}
    },
  },
}
</script>

<docs>
  ```jsx
  <div>
    <NavBar>
      <NavItem name='Item 1' :active='true' />
      <NavItem name='Item 2' title='The only item with a title' />
      <NavItem element='button'>Item 3</NavItem>
    </NavBar>
  </div>
  ```
</docs>
