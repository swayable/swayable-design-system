<template>
  <!-- eslint-disable vue/no-v-html -->
  <nav
    v-on-clickaway='closeMenu'
    class='nav-bar'
  >
    <div class='max-w-full mx-auto px-3 md:px-5'>
      <div class='flex justify-between h-12'>
        <div class='flex'>
          <div class='-ml-2 mr-2 flex items-center md:hidden'>
            <button
              class='inline-flex items-center justify-center p-2 rounded-md hover:bg-blue focus:outline-none focus:bg-blue transition duration-150 ease-in-out'
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
              class=' bg-logo'
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
                  class='flex p-1 rounded-full focus:outline-none transition duration-150 ease-in-out'
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
                  class='origin-top-right absolute right-0 mt-3 w-64 rounded shadow-lg z-50'
                >
                  <div class='pb-2 rounded bg-inherit shadow-xs'>
                    <div class='block px-8 py-6 mb-2'>
                      <div class='text-blue-dark leading-5'>
                        {{ organization }}
                      </div>
                      <div class='text-sm leading-4'>
                        {{ user }}
                      </div>
                    </div>
                    <router-link
                      v-for='(displayName, name) in menuLinks'
                      :key='name'
                      :to='{ name }'
                      class='block px-8 py-4 leading-6 text-lg transition duration-150 ease-in-out'
                      :class='{ "logout": displayName === "Log Out" }'
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
        class='md:hidden absolute bg-inherit w-full z-50'
      >
        <div class='pb-3'>
          <div
            v-if='Object.keys(links).length'
            class='px-2 pt-2 pb-3 md:px-3 border-t'
          >
            <NavItem
              v-for='(link, title) in links'
              :key='title'
              v-bind='link'
            >
              {{ title }}
            </NavItem>
          </div>
          <div class='flex items-center px-5 py-4 border-t'>
            <div class='text-light-4 flex-shrink-0'>
              <Icon
                name='user'
                size='lg'
              />
            </div>
            <div class='ml-3'>
              <div class='text-light-4 leading-5'>
                {{ organization }}
              </div>
              <div class='text-sm text-dark-5 leading-4'>
                {{ user }}
              </div>
            </div>
          </div>
          <div class='px-2 md:px-3'>
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
.nav-bar {
  @apply bg-light-6;
  .bg-logo {
    @apply w-36 bg-left bg-no-repeat;
    background-image: url('//images.swayable.com/logos/light.svg?v=1');
    background-size: 9rem;
  }
}
.theme-dark-mode {
  .nav-bar {
    @apply bg-dark-2;
    .bg-logo {
      background-image: url('//images.swayable.com/logos/dark.svg?v=1')
    }
  }
}
</style>

<docs>
  ```jsx
  const links = {
    Setup: { href: '/#/Component%20Library/NavBar', active: true },
    Insights: { href: '/#/Component%20Library/NavBar' },
    Data: { href: '/#/Component%20Library/NavBar' },
  }
  <div class='mb-5'>
    <NavBar :links='links'>
      <Button>
        Request New
      </Button>
    </NavBar>
  </div>
  <div class='mb-24 theme-dark-mode'>
    <NavBar :links='links'>
      <Button>
        Request New
      </Button>
    </NavBar>
  </div>
  ```
</docs>
