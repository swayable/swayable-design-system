<template>
  <nav
    v-on-clickaway='closeMenu'
    class='bg-blue-dark'
  >
    <div class='max-w-full mx-auto px-4 sm:px-6'>
      <div class='flex justify-between h-13'>
        <div class='flex'>
          <div class='-ml-2 mr-2 flex items-center md:hidden'>
            <button
              class='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out'
              @click='menuOpen = !menuOpen'
            >
              <svg
                :class='{ hidden: menuOpen, block: !menuOpen }'
                class='h-6 w-6'
                stroke='currentColor'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              </svg>
              <svg
                :class='{ hidden: !menuOpen, block: menuOpen }'
                class='h-6 w-6'
                stroke='currentColor'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
          </div>
          <a
            href='/'
            class='flex-shrink-0 flex items-center'
          >
            <img
              class='block md:hidden h-5 w-auto'
              src='//images.swayable.com/logos/motif.svg'
              alt=''
            >
            <img
              class='hidden md:block h-5 w-auto'
              src='//images.swayable.com/logos/dark.svg'
              alt=''
            >
          </a>
          <div class='hidden md:block ml-5 w-px h-6 self-center bg-gradient' />
          <div class='hidden md:ml-6 md:flex md:items-center'>
            <slot />
          </div>
        </div>
        <div class='flex items-center'>
          <div class='flex-shrink-0'>
            <slot name='right' />
          </div>
          <div class='hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center'>
            <div class='ml-3 relative'>
              <div>
                <button
                  class='flex p-1 rounded-full text-grey-lighter focus:text-white focus:outline-none focus:bg-black transition duration-150 ease-in-out'
                  @click='menuOpen = !menuOpen'
                >
                  <Icon
                    name='user'
                    size='md'
                  />
                </button>
              </div>
              <transition
                enter-active-class='transition ease-out duration-200'
                leave-active-class='transition ease-in duration-75'
                enter-class='transform opacity-0 scale-95'
                enter-to-class='transform opacity-100 scale-100'
                leave-class='transform opacity-100 scale-100'
                leave-to-class='transform opacity-0 scale-95'
              >
                <div
                  v-show='menuOpen'
                  class='origin-top-right absolute right-0 mt-3 w-64 rounded shadow-lg'
                >
                  <div class='pb-2 rounded bg-white shadow-xs'>
                    <div class='block px-8 py-6 mb-2'>
                      <div class='text-blue-dark leading-5'>
                        {{ organizationName }}
                      </div>
                      <div class='text-sm text-grey-darker leading-4'>
                        {{ emailAddress }}
                      </div>
                    </div>
                    <router-link
                      v-for='(displayName, name) in menuLinks'
                      :key='name'
                      :to='{ name }'
                      class='block px-8 py-4 leading-6 text-lg focus:outline-none hover:text-white focus:text-white transition duration-150 ease-in-out'
                      :class='displayName === "Log Out" ? "hover:bg-red focus:bg-red text-red" : "hover:bg-blue focus:bg-blue text-blue-dark"'
                    >
                      {{ displayName }}
                    </router-link>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition
      enter-active-class='transition ease-out duration-200'
      leave-active-class='transition ease-in duration-75'
      enter-class='transform opacity-0 scale-95'
      enter-to-class='transform opacity-100 scale-100'
      leave-class='transform opacity-100 scale-100'
      leave-to-class='transform opacity-0 scale-95'
    >
      <div
        v-show='menuOpen'
        class='md:hidden'
      >
        <div class='pb-3'>
          <div
            v-if='this.$slots.default'
            class='px-2 pt-2 pb-3 sm:px-3 border-t border-gray-700'
          >
            <slot />
          </div>
          <div class='flex items-center px-5 py-4 border-t border-gray-700'>
            <div class='text-grey-light flex-shrink-0'>
              <Icon
                name='user'
                size='lg'
              />
            </div>
            <div class='ml-3'>
              <div class='text-grey-light leading-5'>
                {{ organizationName }}
              </div>
              <div class='text-sm text-grey-darker leading-4'>
                {{ emailAddress }}
              </div>
            </div>
          </div>
          <div class='px-2 sm:px-3'>
            <NavItem
              v-for='(displayName, name) in menuLinks'
              :key='name'
              :to='{ name }'
              :class='displayName === "Log Out" && "text-red"'
            >
              {{ displayName }}
            </NavItem>
          </div>
        </div>
      </div>
    </transition>
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
  name: 'NavBar',
  directives: { onClickaway },
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
