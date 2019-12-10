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
      <NavItem :active='true'>Home</NavItem>
      <NavItem>About</NavItem>
    </NavGroup>
    <NavGroup>
      <NavItem>Sign in</NavItem>
    </NavGroup>
  </NavBar>
  ```
</docs>
