<template>
  <!-- eslint-disable vue/no-v-html -->
  <nav
    v-on-clickaway='closeMenu'
    class='nav-bar'
  >
    <div class='max-w-full mx-auto px-3 md:px-5'>
      <div class='flex h-12'>
        <div class='flex'>
          <div class='-ml-2 mr-2 flex items-center md:hidden'>
            <button
              class='openMenu inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition duration-150 ease-in-out'
              @click='menuOpen = !menuOpen'
            >
              <Icon
                class='text-light-3'
                :name='menuOpen ? "cross" : "burger"'
              />
            </button>
          </div>
          <router-link
            class='flex-shrink-0 flex items-center'
            :to='{ name: "tests" }'
          >
            <Icon name='swayable' />
            <div class='hidden md:block bg-logo' />
          </router-link>
        </div>
        <div class='flex flex-grow items-center ml-4'>
          <div class='flex flex-grow'>
            <slot />
          </div>
          <div class='flex flex-shrink-0'>
            <slot name='links'>
              <NavItem
                v-for='(link, title) in links'
                :key='title'
                v-bind='link'
              >
                {{ title }}
              </NavItem>
            </slot>
          </div>
        </div>
        <div class='hidden md:flex ml-4 flex-shrink-0 items-center'>
          <div class='ml-3 relative'>
            <div>
              <button
                class='openMenu flex p-1 rounded-full focus:outline-none transition duration-150 ease-in-out'
                :class='{ active: menuOpen }'
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
                class='origin-top-right absolute bg-card right-0 mt-3 w-64 rounded shadow-lg z-50'
              >
                <div class='py-2 rounded shadow-xs'>
                  <div
                    v-if='authenticated'
                    class='border-b border-default'
                  >
                    <component
                      :is='canChangeOrg ? "button" : "div"'
                      class='block px-8 py-5 text-left w-full'
                      :class='canChangeOrg ? "menu-link" : "text-tertiary"'
                      @click='canChangeOrg && $emit("changeOrg")'
                    >
                      <div class='leading-5'>
                        {{ organization }}
                      </div>
                      <div class='text-sm leading-4'>
                        {{ user }}
                      </div>
                    </component>
                  </div>
                  <router-link
                    class='menu-link'
                    :to='{ name: "tests" }'
                  >
                    Tests
                  </router-link>
                  <router-link
                    class='menu-link'
                    :to='{ name: "library" }'
                  >
                    Content
                  </router-link>
                  <div class='border-default border-t border-b'>
                    <button
                      class='menu-link w-full text-left'
                      @click='$emit("changeTheme")'
                    >
                      <div class='flex items-center change-dark-mode'>
                        <span class='flex-grow'>Dark Mode</span>
                        <Icon name='moon' />
                      </div>
                      <div class='flex items-center change-light-mode'>
                        <span class='flex-grow'>Light Mode</span>
                        <Icon name='sun' />
                      </div>
                    </button>
                  </div>
                  <router-link
                    :to='{ name: "sign-out" }'
                    class='sign-out'
                  >
                    Sign out
                  </router-link>
                </div>
              </div>
            </transition>
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
            class='px-2 pt-2 pb-3 md:px-3 border-t border-dark-4'
          >
            <NavItem
              v-for='(link, title) in links'
              :key='title'
              v-bind='link'
            >
              {{ title }}
            </NavItem>
          </div>
          <div
            v-if='authenticated'
            class='border-t border-dark-4'
          >
            <component
              :is='canChangeOrg ? "NavItem" : "div"'
              :element='"button"'
              class='flex items-center px-5 py-4 w-full rounded-none'
              :class='canChangeOrg ? "" : "text-light-2"'
              @click='canChangeOrg && $emit("changeOrg")'
            >
              <div class='flex-shrink-0'>
                <Icon
                  name='user'
                  size='lg'
                />
              </div>
              <div class='ml-3 text-left text-lg'>
                <div class='leading-5'>
                  {{ organization }}
                </div>
                <div class='text-sm leading-4'>
                  {{ user }}
                </div>
              </div>
            </component>
          </div>
          <div class='px-2 md:px-3'>
            <NavItem :to='{ name: "tests" }'>
              Tests
            </NavItem>
            <NavItem :to='{ name: "library" }'>
              Content
            </NavItem>
          </div>
          <div class='border-dark-4 border-t border-b px-2 md:px-3'>
            <NavItem @click='$emit("changeTheme")'>
              <div class='flex items-center change-dark-mode'>
                <span class='flex-grow'>Dark Mode</span>
                <Icon name='moon' />
              </div>
              <div class='flex items-center change-light-mode'>
                <span class='flex-grow'>Light Mode</span>
                <Icon name='sun' />
              </div>
            </NavItem>
          </div>
          <div class='px-2 md:px-3'>
            <NavItem
              :to='{ name: "sign-out" }'
              class='sign-out'
            >
              Sign out
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
    user: { type: String, required: false },
    organization: { type: String, required: false },
    canChangeOrg: { type: Boolean, required: false },
    links: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      menuOpen: false,
    }
  },
  computed: {
    authenticated() {
      return !!this.user && !!this.organization
    },
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
  @apply bg-dark-2;
  .bg-logo {
    @apply bg-right bg-no-repeat h-full;
    background-image: url('//images.swayable.com/logos/dark.svg?v=1');
    width: 115px;
  }
  .openMenu {
    @apply text-light-4;
    &:hover, &:focus { @apply text-blue-5 bg-dark-3; }
    &.active { @apply text-blue-5 }
  }
  .menu-link, .sign-out {
    @apply block px-8 py-4 leading-6 text-lg transition duration-150 ease-in-out;
  }
  .menu-link {
    &:hover, &:focus { @apply bg-blue-1 text-white }
    &:active { @apply bg-blue-2 }
  }
  .sign-out {
    @apply text-red-1;
    @media (min-width: theme('screens.md')) {
      &:active { @apply bg-red-2 }
      &:hover, &:focus { @apply bg-red-1 text-white }
    }
  }
}

:not(.theme-dark-mode) {
  .change-light-mode {
    display: none !important;
  }
}

.theme-dark-mode {
  .change-light-mode {
    display: flex !important;
  }
  .change-dark-mode {
    display: none !important;
  }
  .nav-bar {
    .openMenu {
      @apply text-light-5;
      &:hover, &:focus { @apply text-blue-3 }
      &.active { @apply text-blue-5 bg-dark-3 }
    }
    .menu-link {
      &:active { @apply bg-blue-4; }
      &:hover, &:focus { @apply bg-blue-3 text-white }
    }
    .sign-out {
      @apply text-red-3;
      @media (min-width: theme('screens.md')) {
        &:hover, &:focus { @apply bg-red-3 text-white }
        &:active { @apply bg-red-4 }
      }
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
  const options = ['Survey 1', 'Survey 2', 'Survey 3']
  <div class='mb-5'>
    <NavBar :links='links' user='josh@swayable.com' organization='Swayable' :canChangeOrg='true'>
      <div class='theme-dark-mode bg-transparent'>
        <AutoComplete small :title='options[0]' :options='options' />
      </div>
    </NavBar>
  </div>
  <div class='mb-24 theme-dark-mode'>
    <NavBar :links='links' user='josh@swayable.com' organization='Swayable' :canChangeOrg='true'>
      <AutoComplete small :title='options[0]' :options='options' />
    </NavBar>
  </div>
  ```
</docs>
