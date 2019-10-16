<template>
  <component
    :is='element'
    class='flex h-full nav-group'
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
  props: {
    /**
     * The html element used
     */
    element: {
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
