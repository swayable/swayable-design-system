<template>
  <nav class='flex max-w-full mx-auto px-4 sm:px-6 py-2'>
    <div class='flex flex-grow'>
      <slot />
    </div>
    <div class='flex'>
      <slot name='right' />
    </div>
  </nav>
</template>

<script>
import tokens from '@/utils/tokens'

const START_RGB = tokens.getColorRGB('pink')
const END_RGB = tokens.getColorRGB('azure')

import { directive as onClickaway } from 'vue-clickaway'

/**
 * Used as main page navigation in templates.
 * */
export default {
  name: 'ToolBar',
  props: {
    emailAddress: { type: String, default: 'jane@doe.com'},
    organizationName: { type: String, default:'Doe inc'},
  },
  data() {
    return {
      menuOpen: false,
      menuLinks: {
        tests: 'Tests',
        library: 'Library',
        preferences: 'Preferences',
        'sign-out': 'Log Out',
      },
    }
  },
  methods: {
    closeMenu() {
      this.menuOpen = false
    },
  },
}
</script>

<style lang="scss">
  .bg-gradient {
    background-image: linear-gradient(to bottom, $color-pink, $color-azure);
  }
</style>

<docs>
  ```jsx
  <div class='mb-64'>
    <NavBar>
      <NavItem active>
        Setup
      </NavItem>
      <NavItem>
        Responses
      </NavItem>
      <NavItem>
        Results
      </NavItem>
      <template slot='right'>
        <Button primary>
          Request New
        </Button>
      </template>
    </NavBar>
  </div>
  ```
</docs>
