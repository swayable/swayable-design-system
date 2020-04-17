<template>
  <component
    :is='smartElement'
    v-bind='navigation'
    :class='classes'
    v-on='$listeners'
  >
    <slot />
  </component>
</template>

<script>
/**
 * Displays options in the navbar
 */
export default {
  name: 'NavItem',
  props: {
    /**
     * element/component - accepted values are `button`, `a`, and `router-link`
     */
    element: {
      type: String,
      validator: value => {
        return value.match(/(button|a|router-link)/)
      },
    },
    /**
     * The component will be `<router-link />`
     */
    to: {
      type: Object,
    },
    /**
     * The component will be `<a />`
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
  <div>
    <NavBar>
      <NavItem href='/#/Component%20Library/NavItem' :active='true'>Anchor</NavItem>
      <NavItem :to='{ name: "Index" }'>Router Link</NavItem>
      <NavItem element='button'>Button</NavItem>
    </NavBar>
  </div>
  ```
</docs>
