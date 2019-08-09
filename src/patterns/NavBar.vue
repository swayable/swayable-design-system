<template>
  <component
    :is='type'
    :class='`flex items-center justify-between pl-1 md:pl-3 shadow z-20 nav-bar ${colorClass}`'
  >
    <div
      v-if='showHeading'
      class='flex items-center flex-shrink-0 p-3 md:mr-4'
    >
      <slot name='heading'>
        <a :href='headerLink'>
          <h1
            v-if='heading'
            class='font-heading font-medium text-xl'
          >
            {{ heading }}
          </h1>
          <div
            v-else
            class='h-10 py-1 bg-contain bg-center bg-no-repeat swayable-logo'
          />
        </a>
      </slot>
    </div>
    <div class='flex flex-grow items-stretch w-auto min-h-16'>
      <div class='flex-grow md:hidden' />
      <div class='flex md:flex-grow'>
        <slot name='left' />
      </div>
      <div class='flex'>
        <slot />
      </div>
    </div>
  </component>
</template>

<script>
/**
 * Used as main page navigation in templates.
 *
 * ## Slots
 * * `heading`: replaces logo
 * * `left`: for left aligned nav items
 * * default: for right aligned nav items
 */
export default {
  name: 'NavBar',
  status: 'under-review',
  release: '0.1.0',
  props: {
    /**
     * href of heading (unavailable if using heading slot)
     */
    headerLink: {
      type: String,
      required: false,
      default: '/',
    },
    /**
     * The html element used for the nav bar.
     */
    type: {
      type: String,
      default: 'nav',
    },
    /**
     * The heading (unavailable if using heading slot, defaults to Swayable logo if not provided)
     */
    heading: {
      type: String,
      required: false,
      default: null,
    },
    /**
     * Used to remove heading/logo
     */
    noheading: {
      type: Boolean,
      default: false,
    },
    /**
     * Changes the style to a light background
     */
    light: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    showHeading() {
      return this.noheading === false
    },
    colorClass() {
      return this.light !== false
        ? 'nav-light'
        : ''
    },
  },
}
</script>


<style lang="scss">
.nav-bar {
  $small-logo-url: url(https://images.swayable.com/logos/motif.svg);
  $color-dark-logo-url: url(https://images.swayable.com/logos/dark.svg);
  $color-light-logo-url: url(https://images.swayable.com/logos/light.svg);
  
  background-color: $color-dark;
  color: $color-light;

  &.nav-light {
    background-color: $color-light;
    color: $color-dark;
  }

  .swayable-logo {
    width: 40px;
    background-image: $small-logo-url;
  }

  @media (min-width: 640px) {
    .swayable-logo {
      width: 250px;
      background-image: $color-dark-logo-url;
    }
    &.nav-light {
      .swayable-logo { background-image: $color-light-logo-url; }
    }
  }
}
</style>

<docs>
  ```jsx
  <NavBar headerLink='/#/Patterns/NavBar'>
    <template #left>
      <NavItem name='Dashboard' active='true' />
    </template>
    <template>
      <NavItem name='Sign in' />
    </template>
  </NavBar>
  <NavBar headerLink='/#/Patterns/NavBar' light>
    <template #left>
      <NavItem name='Dashboard' active='true' />
    </template>
    <template>
      <NavItem name='Sign in' />
    </template>
  </NavBar>
  ```
</docs>
