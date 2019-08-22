<template>
  <component
    :is='type'
    :class='`min-h-16 flex items-stretch justify-between shadow z-20 nav-bar ${altClass}`'
  >
    <slot />
  </component>
</template>

<script>
/**
 * Used as main page navigation in templates. Three style variants are default, alt, and alt within dark theme.
 */
export default {
  name: 'NavBar',
  status: 'ready',
  release: '0.3.0',
  props: {
    /**
     * The html element used for the nav bar.
     */
    type: {
      type: String,
      default: 'nav',
    },
    /**
     * Changes to light background and dark text
     */
    alt: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    altClass() {
      return this.alt !== false
        ? 'nav-alt'
        : ''
    },
  },
}
</script>

<style lang="scss">
// Variables

:root {
  --logo-small: url(https://images.swayable.com/logos/motif.svg);
  --logo-dark: url(https://images.swayable.com/logos/dark.svg);
  --logo-light: url(https://images.swayable.com/logos/light.svg);
  --logo-url: var(--logo-small);
  --logo-width: 40px;
  --nav-bg: theme('colors.dark');
  --nav-color: theme('colors.grey');
  --nav-color-active: theme('colors.white');
  --nav-active-filter: var(--filter-bright);
}

[data-theme='dark'] {
  .nav-bar.nav-alt {
    --nav-color: theme('colors.grey');
    --nav-bg: theme('colors.darker');
    --nav-active-filter: var(--filter-bright);
    --nav-color-active: theme('colors.white');
    @media (min-width: 640px) {
      --logo-url: var(--logo-dark)
    }
  }
}
.nav-bar {
  @media (min-width: 640px) {
    --logo-url: var(--logo-dark);
    --logo-width: 240px;
  }

  &.nav-alt{
    --nav-bg: theme('colors.light');
    --nav-color: theme('colors.gray.700');
    --nav-color-active: theme('colors.dark');
    --nav-active-filter: var(--filter-dim);
    @media (min-width: 640px) {
      --logo-url: var(--logo-light)
    }
  }

  // Styles
  background-color: var(--nav-bg);
  .nav-drop-dropdown { background-color: var(--nav-bg); }

  // Space for scrollbar
  > .nav-drop:last-child > .nav-item,
  > .nav-group:last-child > .nav-drop:last-child > .nav-item {
    padding-right: theme('spacing.4') !important;
  }
  > .nav-item:last-child,
  > .nav-group:last-child > .nav-item:last-child {
    padding-right: theme('spacing.5') !important;
  }

  .nav-item {
    color: var(--nav-color);
    &:hover, &:active, &:focus {
      .interactive {
        filter: var(--nav-active-filter);
      }
    }
    &.active, &.router-link-active {
      > * {
        color: var(--nav-color-active);
      }
      > *:after {
        // Add active indicator
        content: ' ';
        position: absolute;
        height: 0.25rem;
        background-color: theme('colors.grey');
        bottom: 0;
        left: 0;
        right:0;
      }
    }
  }
  .nav-drop-dropdown .nav-item, .nav-logo {
    // Remove active indicator
    &.active, &.router-link-active {
      > *:after {
        height: 0;
      }
    }
  }
}
</style>

<docs>
  ```jsx
  <NavBar>
    <NavLogo />
    <NavGroup class='flex-grow'>
      <NavItem name='Default Nav' :active='true' />
      <NavItem name='About' />
    </NavGroup>
    <NavGroup>
      <NavItem name='Sign in' />
    </NavGroup>
  </NavBar>
  <NavBar alt>
    <NavLogo />
    <NavGroup class='flex-grow'>
      <NavItem name='Default Nav' :active='true' />
      <NavItem name='About' />
    </NavGroup>
    <NavGroup>
      <NavItem name='Sign in' />
    </NavGroup>
  </NavBar>
  <div data-theme='dark'>
    <NavBar alt>
      <NavLogo />
      <NavGroup class='flex-grow'>
        <NavItem name='Default Nav' :active='true' />
        <NavItem name='About' />
      </NavGroup>
      <NavGroup>
        <NavItem name='Sign in' />
      </NavGroup>
    </NavBar>
  </div>
  ```
</docs>
