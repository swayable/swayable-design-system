<template>
  <component
    :is='smartElement'
    v-bind='navigation'
    :class='active && "active"'
    :title='title'
    class='nav-item px-2 sm:px-3 md:px-4 lg:px-5 relative whitespace-no-wrap flex font-medium items-stretch max-w-full text-sm min-h-12'
    v-on='$listeners'
  >
    <span class='flex flex-grow max-w-full relative items-center'>
      <span :class='`flex-grow max-w-full items-center flex-col ${interactionClass}`'>
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
     * Removes hover/active/focus filter.
     */
    noninteractive: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    interactionClass() {
      return this.noninteractive === false
        ? 'interactive'
        : ''
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
      <NavItem name='Item 2' title='The only item with a title' noninteractive />
      <NavItem>Item 3</NavItem>
    </NavBar>
  </div>
  ```
</docs>
