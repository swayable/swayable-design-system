<template>
  <component
    :is='smartElement'
    v-bind='navigation'
    :title='title'
    :class='{ active, spaced: !flush }'
    class='nav-item flex items-stretch max-w-full relative whitespace-no-wrap font-semibold'
    v-on='$listeners'
  >
    <span class='flex flex-grow max-w-full relative items-center'>
      <span class='flex-grow max-w-full items-center flex-col'>
        <slot />
      </span>
    </span>
  </component>
</template>

<script>
/**
 * Item used in NavBar; link, button, or wrapper of more complex component.
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
      validator: value => {
        return value.match(/(button|a|input)/)
      },
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
  let clicks = 0
  <div>
    <NavBar primary>
      <NavItem href='#' :active='true'>Active Link</NavItem>
      <NavItem href='#' title='Another one!'>Other Link</NavItem>
      <NavItem @click='clicks += 1' element='button'>Button {{ clicks }}</NavItem>
      <NavItem><Button>Wrap a button</Button></NavItem>
    </NavBar>
  </div>
  ```
</docs>
