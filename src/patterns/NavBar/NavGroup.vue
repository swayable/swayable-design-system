<template>
  <component
    :is='type'
    class='flex min-h-16 nav-group'
  >
    <slot />
  </component>
</template>

<script>
/**
 * Used as main page navigation in templates.
 */
export default {
  name: 'NavGroup',
  status: 'ready',
  release: '0.3.0',
  props: {
    /**
     * The html element used
     */
    type: {
      type: String,
      default: 'div',
    },
  },
}
</script>

<docs>
  ```jsx
  <NavBar>
    <NavGroup class='flex-grow'>
      <NavItem name='Home' :active='true' />
      <NavItem name='About' />
    </NavGroup>
    <NavGroup>
      <NavItem name='Sign in' />
    </NavGroup>
  </NavBar>
  ```
</docs>
