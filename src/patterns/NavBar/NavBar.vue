<template>
  <component
    :is='element'
    :class='`flex items-stretch justify-between nav-bar ${variant}`'
  >
    <slot />
  </component>
</template>

<script>
/**
 * Used as main page navigation in templates. Three style variants are primary, default, and dark mode default.
 */
export default {
  name: 'NavBar',
  status: 'ready',
  props: {
    /**
     * The html element used for the nav bar.
     */
    element: {
      type: String,
      default: 'nav',
    },
    /**
     * Dark background
     */
    primary: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    variant() {
      return this.primary
        ? ''
        : 'nav-light'
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
  --logo-width: 33px;
  --nav-bg: theme('colors.blue-dark');
  --nav-color: theme('colors.grey-darker');
  --nav-color-active: theme('colors.grey');
  --nav-active-filter: var(--filter-bright);
  --nav-heading-color: theme('colors.white');
  --nav-border-color: theme('colors.blue-dark');
}

[data-theme='dark'] {
  .nav-bar.nav-light {
    --nav-color: theme('colors.grey');
    --nav-bg: theme('colors.black');
    --nav-active-filter: var(--filter-bright);
    --nav-color-active: theme('colors.white');
    --nav-border-color: theme('colors.grey-darker');

    @screen md {
      --logo-url: var(--logo-dark)
    }
  }
}
.nav-bar {
  height: 50px;

  .spaced {
    @apply px-2;
    @screen sm {
      @apply px-3;
    }
  }

  @screen md {
    --logo-url: var(--logo-dark);
    --logo-width: 120px;
  }

  &.nav-light{
    @apply border-b;
    --nav-bg: theme('colors.white');
    --nav-color: color-mod(theme('colors.blue-dark') alpha(60%));
    --nav-color-active: theme('colors.blue-dark');
    --nav-active-filter: var(--filter-dim);
    --nav-heading-color: theme('colors.blue-dark');
    --nav-border-color: theme('colors.grey');

    @screen md {
      --logo-url: var(--logo-light);
    }
  }

  // Styles
  background-color: var(--nav-bg);
  border-color: var(--nav-border-color);

  .nav-drop-dropdown { background-color: var(--nav-bg); }
  .heading { color: var(--nav-heading-color) }


  // - Override the padding of far left and right nav-items
  // - rather than padding the navbar in order to have flush navdrops
  // Right
                          > .nav-item:last-child,
  > .nav-group:last-child > .nav-item:last-child,
                          > .nav-drop:last-child .nav-item,
  > .nav-group:last-child > .nav-drop:last-child .nav-item {
    @apply pr-5;
  }

  // Left
                          > .nav-item:first-child,
  > .nav-group:first-child > .nav-item:first-child,
                          > .nav-drop:first-child .nav-item,
  > .nav-group:first-child > .nav-drop:first-child .nav-item {
     @screen sm {
      @apply pl-3;
    }
    @screen md {
      @apply pl-5;
    }
  }

  a.nav-item, button.nav-item {
    &:hover, &:active, &:focus {
      filter: var(--nav-active-filter);
    }
  }

  .nav-item {
    @apply text-sm;
    color: var(--nav-color);
    
    &.active, &.router-link-active {
      > * {
        color: var(--nav-color-active);
      }
      > *:after {
        // Add active indicator
        content: ' ';
        position: absolute;
        height: 0.25rem;
        background-color: var(--nav-color-active);
        bottom: 0;
        left: 0;
        right:0;
      }
    }
  }
  .nav-drop-dropdown .nav-item {
    @apply min-h-12;
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
  <NavBar primary>
    <NavLogo />
    <NavGroup class='flex-grow'>
      <NavItem :active='true'>Default Nav</NavItem>
      <NavItem>About</NavItem>
    </NavGroup>
    <NavGroup>
      <NavItem>Sign in</NavItem>
    </NavGroup>
  </NavBar>
  <NavBar>
    <NavLogo />
    <NavGroup class='flex-grow'>
      <NavItem :active='true'>Default Nav</NavItem>
      <NavItem>About</NavItem>
    </NavGroup>
    <NavGroup>
      <NavItem>Sign in</NavItem>
    </NavGroup>
  </NavBar>
  <div data-theme='dark'>
    <NavBar>
      <NavLogo />
      <NavGroup class='flex-grow'>
        <NavItem :active='true'>Default Nav</NavItem>
        <NavItem>About</NavItem>
      </NavGroup>
      <NavGroup>
        <NavItem>Sign in</NavItem>
      </NavGroup>
    </NavBar>
  </div>
  ```
</docs>
