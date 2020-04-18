<template>
  <!-- eslint-disable vue/no-v-html -->
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
                v-show='!menuOpen'
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
                v-show='menuOpen'
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
          <div class='w-6 md:w-auto flex-shrink-0 flex overflow-hidden'>
            <a
              href='/'
              class='flex items-center'
              v-html='logo'
            />
          </div>
          <div class='hidden md:flex ml-6 items-center'>
            <slot v-if='alignRight' />
            <template v-else>
              <NavItem
                v-for='(link, title) in links'
                :key='title'
                v-bind='link'
              >
                {{ title }}
              </NavItem>
            </template>
          </div>
        </div>
        <div class='flex items-center'>
          <div
            class='flex-shrink-0'
            :class='alignRight ? "flex md:hidden": "flex"'
          >
            <slot />
          </div>
          <div
            v-if='alignRight'
            class='hidden md:flex flex-shrink-0'
          >
            <NavItem
              v-for='(link, title) in links'
              :key='title'
              v-bind='link'
            >
              {{ title }}
            </NavItem>
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
                        {{ organization }}
                      </div>
                      <div class='text-sm text-grey-darker leading-4'>
                        {{ user }}
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
            v-if='Object.keys(links).length'
            class='px-2 pt-2 pb-3 sm:px-3 border-t border-gray-700'
          >
            <NavItem
              v-for='(link, title) in links'
              :key='title'
              v-bind='link'
            >
              {{ title }}
            </NavItem>
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
                {{ organization }}
              </div>
              <div class='text-sm text-grey-darker leading-4'>
                {{ user }}
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
import logo from '@/assets/logo.svg'

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
    user: { type: String, default: 'jane@doe.com'},
    organization: { type: String, default:'Doe inc'},
    links: { type: Object, default: () => ({}) },
    alignRight: { type: Boolean, default: false  },
  },
  data() {
    return {
      logo,
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

<docs>
  ```jsx
  const links = {
    Setup: { to: { name: 'Demo' }, active: true },
    Responses: { to: { name: 'Demo' } },
    Results: { to: { name: 'Demo' } },
  }
  <div class='mb-64'>
    <NavBar :links='links'>
      <Button>
        Request New
      </Button>
    </NavBar>
  </div>
  ```
</docs>
