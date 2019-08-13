<template>
  <component
    :is='type'
    :class='`flex flex-wrap items-center justify-between shadow z-20 nav-bar ${colorClass}`'
  >
    <div
      v-if='showHeading'
      class='flex items-center flex-shrink-0 md:ml-1 p-3 md:mr-4'
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
      <div class='flex flex-grow nav-bar-left'>
        <slot name='left' />
      </div>
      <div class='flex nav-bar-right'>
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
     * Changes the style to a alt background
     */
    alt: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    showHeading() {
      return this.noheading === false
    },
    colorClass() {
      return this.alt !== false
        ? 'nav-alt'
        : ''
    },
  },
}
</script>

<docs>
  ```jsx
  <NavBar headerLink='/#/Patterns/NavBar'>
    <template #left>
      <NavItem name='Default Nav' :active='true' />
      <NavItem name='About' />
    </template>
    <template>
      <NavItem name='Sign in' />
    </template>
  </NavBar>
  <NavBar headerLink='/#/Patterns/NavBar' alt>
    <template #left>
      <NavItem name='Alt Nav' :active='true' />
      <NavItem name='About' />
    </template>
    <template>
      <NavItem name='Sign in' />
    </template>
  </NavBar>
  <div data-theme='dark'>
    <NavBar headerLink='/#/Patterns/NavBar' alt>
      <template #left>
        <NavItem name='Alt Nav Dark Theme' :active='true' />
        <NavItem name='About' />
      </template>
      <template>
        <NavItem name='Sign in' />
      </template>
    </NavBar>
  </div>
  ```
</docs>
