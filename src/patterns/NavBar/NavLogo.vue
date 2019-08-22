<template>
  <NavItem
    v-bind='props'
    class='bg-contain bg-center bg-no-repeat nav-logo p-0 mx-2 sm:mx-3 md:mx-4 lg:mx-5'
    noninteractive
  />
</template>

<script>
/**
 * Swayable logo to display in navbar.
 */
export default {
  name: 'NavLogo',
  status: 'ready',
  release: '0.3.0',
  props: {
    /**
     * The html element
     */
    type: {
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
  background-image: var(--logo-url);
}
</style>