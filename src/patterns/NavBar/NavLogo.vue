<template>
  <NavItem v-bind='props'>
    <div class='nav-logo bg-contain bg-center bg-no-repeat self-center' />
  </NavItem>
</template>

<script>
/**
 * Swayable logo to display in navbar.
 */
export default {
  name: 'NavLogo',
  status: 'ready',
  props: {
    /**
     * The html element
     */
    element: {
      type: String,
      default: 'div',
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
  },
  computed: {
    props() {
      const { type, to, href } = this
      return {
        ...(type && { type }),
        ...(to && { to }),
        ...(href && { href }),
      }
    },
  },
}
</script>

<style lang="scss">
.nav-logo {
  width: var(--logo-width);
  height: 20px !important;
  background-image: var(--logo-url);
}
</style>