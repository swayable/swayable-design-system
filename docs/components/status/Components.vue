<template>
  <div class='components'>
    <p>
      Themes are still in the review stage, but you can change to
      <button
        class='link'
        @click='toggleTheme'
      >
        <span v-if='darkTheme'>light theme</span>
        <span v-else>dark theme</span>
      </button>
      now.
    </p>
    <div
      v-for='(components, group) in componentGroups'
      :key='group'
      class='mt-5'
    >
      <h3
        v-if='show === "all"'
        class='group capitalize text-xl'
      >
        {{ group }}
      </h3>
      <div class='mt-3'>
        <div
          v-for='(component, index) in components'
          :key='component.name'
          class='component flex w-full p-2'
          :class='index % 2 === 0 ? "even" : "odd"'
        >
          <span class='flex-grow'>
            <a
              :href='component.href'
            >
              {{ component.name }}
            </a>
          </span>
          <span class='component-status capitalize text-sm'>{{ component.status }}</span>
          <span class='ml-2'>
            {{ statusIcons[component.status] }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// If you want to use your own tokens here, change the following line to:
// import designTokens from "@/assets/tokens/tokens.raw.json"
// import designTokens from '../../docs.tokens.json'
import _orderBy from 'lodash/orderBy'
import _pick from 'lodash/pick'

export default {
  name: 'Components',
  props: {
    show: {
      type: String,
      default: 'all',
      validator: value => {
        return value.match(/(all|patterns|templates|elements)/)
      },
    },
  },
  data() {
    const darkTheme = document
      .querySelector('html')
      .getAttribute('data-theme') === 'dark'
    const statusIcons = {
      ready: '✅',
      review: '👀',
      planned: '✏️',
      deprecated: '❌',
    }

    return { darkTheme, statusIcons }
  },
  computed: {
    elements() {
      const context = require.context('@/elements/', true, /\.vue$/)
      return this.getComponents(context, 'Elements')
    },
    patterns() {
      const context = require.context('@/patterns/', true, /\.vue$/)
      return this.getComponents(context, 'Patterns')
    },
    templates() {
      const context = require.context('@/templates/', true, /\.vue$/)
      return this.getComponents(context, 'Templates')
    },
    componentGroups() {
      const groups = this.show === 'all'
        ? ['elements', 'patterns', 'templates']
        : [this.show]
      return _pick(this, groups)
    },
  },
  mounted() {
    const toggleTheme = window.location.href.includes('theme=toggle')
    if (toggleTheme) this.toggleTheme()
  },
  methods: {
    getComponents(context, groupPath) {
      const components = context.keys().map(key => {
        const component = context(key).default
        component.href =  `/#/${groupPath}/${component.name}`
        return component
      })
      return _orderBy(components, 'name', 'asc')
    },
    toggleTheme() {
      this.darkTheme = !this.darkTheme
      const page = document.querySelector('html')
      if (this.darkTheme) {
        page.setAttribute('data-theme', 'dark')
      } else {
        page.removeAttribute('data-theme')
      }
    },
  },
}
</script>

<style lang="scss">
  .components {
    .component-status { @apply text-grey-darker }
    .group { @apply text-blue-dark }
    .component {
      &.odd { @apply bg-grey-lighter }
      &.even { @apply bg-grey-light }
    }
  }
  [data-theme='dark'] {
    .components {
      .component-status { @apply text-blue-dark }
      .group { @apply text-grey-lighter }
      .component {
        &.odd { @apply bg-grey-dark }
        &.even { @apply bg-grey-darker }
      }
    }
  }
</style>

<docs>
  ```jsx
  <components />
  ```
</docs>
