<template>
  <component
    :is='type'
    ref='navItem'
    :href='href'
    :class='{
      "pb-3 lg:pb-2 active": isActive,
    }'
    :title='title'
    class='h-full whitespace-no-wrap flex p-4 lg:py-3 ml-1 cursor-pointer font-medium items-center nav-item'
    v-on='$listeners'
  >
    <slot>
      <span>{{ name }}</span>
    </slot>
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
     * The destination address
     */
    href: {
      type: String,
    },
    /**
     * Indicates whether this is the current link
     */
    active: {
      type: String,
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
    isActive() {
      return this.active === 'true'
    },
  },
}
</script>

<style lang="scss">
.nav-item {
  color: $gray-400;
  &:hover, &:active, &:focus {
    color: $gray-200;
  }
  &.active {
    border-bottom-width: 4px;
    border-style: solid;
    border-color: $gray-400;
  }
}
.theme-dark {
  .nav-item {
    color: $gray-700;
    &:hover, &:active, &:focus {
      color: $dark;
    }
    &.active {
      border-color: $gray-600;
    }
  }
}
</style>

<docs>
  ```jsx
  <div>
    <NavBar>
      <template #right>
        <NavItem href="/#/" name="Item 1" active='true' />
        <NavItem href="/#/" name="Item 2" title="The only item with a title" />
        <NavItem href="/#/">Item 3</NavItem>
      </template>
    </NavBar>
  </div>
  ```
</docs>
