<template>
  <component
    :is='type'
    :class='`flex items-center justify-between flex-wrap pl-3 shadow nav-bar`'
  >
    <div class='flex items-center flex-shrink-0 mr-4 p-3'>
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
    <div class='block md:hidden'>
      <button
        class='flex items-center px-3 py-2 rounded hover:text-white'
        @click='open = !open'
      >
        <Icon name='menu' />
      </button>
    </div>
    <div
      :class='{
        flex: open,
        hidden: !open,
      }'
      class='md:flex flex-grow w-full md:items-stretch md:w-auto min-h-16'
    >
      <div class='flex flex-grow'>
        <slot name='left' />
      </div>
      <div class='flex'>
        <slot />
      </div>
    </div>
  </component>
</template>

<style lang="scss">
.swayable-logo {
  min-width: 250px;
}

.nav-bar {
  background-color: $dark;
  color: $light;
  .swayable-logo {
    background-image: url(https://images.swayable.com/logos/dark.svg?v=1)
  }
}

.theme-dark {
  .nav-bar {
    background-color: $light;
    color: $dark;
    .swayable-logo {
      background-image: url(https://images.swayable.com/logos/light.svg?v=1)
    }
  }
}
</style>

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
  model: {
    prop: 'active',
  },
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
  },
  data() {
    return { open: false }
  },
}
</script>

<docs>
  ```jsx
  <section>
    <NavBar headerLink='/#/Patterns/NavBar'>
      <template #left>
        <NavItem name='Dashboard' active='true' />
      </template>
      <template>
        <NavItem name='Sign in' />
      </template>
    </NavBar>
  </section>
  <section class='theme-dark'>
    <NavBar headerLink='/#/Patterns/NavBar'>
      <template #left>
        <NavItem name='Dashboard' active='true' />
      </template>
      <template>
        <NavItem name='Sign in' />
      </template>
    </NavBar>
  </section>
  ```
</docs>
