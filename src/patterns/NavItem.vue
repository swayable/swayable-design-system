<template>
  <component
    ref='navItem'
    :is='type'
    :href='href'
    :class='{
      "pb-3 lg:pb-2 border-b-4 active": active,
    }'
    :title='title'
    class='h-full whitespace-no-wrap flex p-4 lg:py-3 ml-1 border-gray-100 hover:text-white cursor-pointer font-medium items-center'
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
  status: 'ready',
  release: '1.0.0',
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
}
</script>

<docs>
  ```jsx
  <div>
    <NavBar>
      <template #right>
        <NavItem href="/#/" name="Item 1" :active='true' />
        <NavItem href="/#/" name="Item 2" title="The only item with a title" />
        <NavItem href="/#/">Item 3</NavItem>
      </template>
    </NavBar>
  </div>
  ```
</docs>
