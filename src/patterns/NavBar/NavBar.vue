<template>
  <nav
    v-on-clickaway='closeMenu'
    class='bg-blue-dark'
  >
    <div class='max-w-full mx-auto px-4 sm:px-6 lg:px-8'>
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
              class='block lg:hidden h-5 w-auto'
              src='//images.swayable.com/logos/motif.svg'
              alt=''
            >
            <img
              class='hidden lg:block h-5 w-auto'
              src='//images.swayable.com/logos/dark.svg'
              alt=''
            >
          </a>
          <div class='hidden sm:block ml-5 w-px h-6 self-center bg-gradient' />
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
                  class='flex text-sm border-2 border-transparent rounded-full text-grey-lighter focus:text-white focus:outline-none focus:border-grey-dark transition duration-150 ease-in-out'
                  @click='menuOpen = !menuOpen'
                >
                  <Icon
                    name='user'
                    size='md'
                  />
                </button>
              </div>
              <div
                v-show='menuOpen'
                x-transition:enter='transition ease-out duration-200'
                x-transition:enter-start='transform opacity-0 scale-95'
                x-transition:enter-end='transform opacity-100 scale-100'
                x-transition:leave='transition ease-in duration-75'
                x-transition:leave-start='transform opacity-100 scale-100'
                x-transition:leave-end='transform opacity-0 scale-95'
                class='origin-top-right absolute right-0 mt-4 w-48 rounded shadow-lg'
              >
                <div class='py-1 rounded bg-white shadow-xs'>
                  <router-link
                    :to='{ profile}'
                    class='block px-6 py-3 text-sm leading-5 text-gray-700 focus:outline-none hover:text-white focus:text-white hover:bg-blue focus:bg-blue transition duration-150 ease-in-out'
                  >
                    {{ organizationName }}
                    <div class='text-xs'>
                      {{ emailAddress }}
                    </div>
                  </router-link>
                  <router-link
                    v-for='(displayName, name) in menuLinks'
                    :key='name'
                    :to='{ name }'
                    class='block px-6 py-3 text-sm leading-5 text-gray-700 focus:outline-none hover:text-white focus:text-white transition duration-150 ease-in-out'
                    :class='displayName === "Log Out" ? "hover:bg-red focus:bg-red" : "hover:bg-blue focus:bg-blue"'
                  >
                    {{ displayName }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      :class='{ block: menuOpen, hidden: !menuOpen}'
      class='md:hidden'
    >
      <div class='px-2 pt-2 pb-3 sm:px-3'>
        <slot />
      </div>
      <div class='pt-4 pb-3 border-t border-gray-700'>
        <div class='flex items-center px-5 sm:px-6'>
          <div class='flex-shrink-0'>
            <img
              class='h-10 w-10 rounded-full'
              src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
              alt=''
            >
          </div>
          <div class='ml-3'>
            <div class='text-base font-medium leading-6 text-white'>
              Tom Cook
            </div>
            <div class='text-sm font-medium leading-5 text-gray-400'>
              tom@example.com
            </div>
          </div>
        </div>
        <div class='mt-3 px-2 sm:px-3'>
          <a
            href='#'
            class='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out'
          >
            Media
          </a>
          <a
            href='#'
            class='block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out'
          >
            Tests
          </a>
          <a
            href='#'
            class='mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out'
          >
            Settings
          </a>
          <a
            href='#'
            class='mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out'
          >
            Sign out
          </a>
        </div>
      </div>
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
