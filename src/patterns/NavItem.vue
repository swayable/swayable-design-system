<template>
  <component
    :is='smartType'
    v-bind='navigation'
    :class='active && "active"'
    :title='title'
    class='relative h-full whitespace-no-wrap flex ml-1 font-medium items-center nav-item text-grey'
    v-on='$listeners'
  >
    <span class='p-3 flex flex-grow interactive'>
      <slot>{{ name }}</slot>
    </span>
  </component>
</template>

<script>
/**
 * The links used in NavBar.
 */
export default {
  name: 'NavItem',
  status: 'under-review',
  release: '0.1.0',
  props: {
    /**
     * The html element name used for the nav item
     */
    type: {
      type: String,
      default: 'a',
    },
    /**
     * If provided, type will default to `router-link`
     */
    to: {
      type: Object,
      default: null,
    },
    /**
     * The destination address
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
  },
  computed: {
    smartType() {
      if (this.type === 'a' && this.to !== null) return 'router-link'
      return this.type
    },
    navigation() {
      if (this.smartType === 'router-link') return { to: (this.to || this.href) }
      if (this.href) return { href: this.href }
      return {}
    },
  },
}
</script>

<style lang="scss">
.nav-item {
  &.active, &.router-link-active {
    border-bottom: 0.25rem solid $color-grey;
    .interactive {
      padding-bottom: 0.5rem !important;
    }
  }
}
.nav-alt .nav-item {
  color: $color-gray-700 !important;
  @include dim-interaction;
}
.theme-dark .nav-alt .nav-item {
  color: $color-grey !important;
  @include bright-interaction;
}
</style>

<docs>
  ```jsx
  <div>
    <NavBar>
      <NavItem href='/#/' name='Item 1' :active='true' />
      <NavItem href='/#/' name='Item 2' title='The only item with a title' />
      <NavItem href='/#/'>Item 3</NavItem>
    </NavBar>
  </div>
  ```
</docs>
