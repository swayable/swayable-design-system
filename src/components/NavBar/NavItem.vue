<template>
  <component
    :is='smartElement'
    v-bind='navigation'
    :title='title'
    :class='classes'
    v-on='$listeners'
  >
    <slot />
  </component>
</template>

<script>
/**
 * Used in NavBar main slot
 */
export default {
  name: 'NavItem',
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
    classes() {
      const commonClasses = ['px-5 sm:px-4', 'py-3 sm:py-2', 'rounded', 'text-sm', 'font-medium', 'sm:leading-5', 'focus:outline-none', 'focus:text-white', 'focus:bg-gray-700', 'transition', 'duration-150', 'ease-in-out', 'block', 'sm:inline-block']
      
      const activeClasses = ['text-white', 'bg-gray-900']
      const inactiveClasses = ['sm:ml-2', 'text-grey-light', 'hover:text-white', 'hover:bg-gray-700']

      return this.active
        ? [...commonClasses, ...activeClasses]
        : [...commonClasses, ...inactiveClasses]
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
