<template>
  <div class='components'>
    <div
      v-for='(componentGroup, groupName) in componentGroups'
      :key='groupName'
      class='mt-5'
    >
      <h3
        v-if='show === "all"'
        class='group capitalize text-xl'
      >
        {{ groupName }}
      </h3>
      <div class='mt-3'>
        <div
          v-for='(component, index) in componentGroup'
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
        return value.match(/(all|components|templates)/)
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
    components() {
      const context = require.context('@/components/', true, /\.vue$/)
      return this.getComponents(context, 'Components')
    },
    templates() {
      const context = require.context('@/templates/', true, /\.vue$/)
      return this.getComponents(context, 'Templates')
    },
    componentGroups() {
      const groups = this.show === 'all'
        ? ['components', 'templates']
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
        component.href =  `/#/${groupName}${component.name}`
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

<docs>
  ```jsx
  <components />
  ```
</docs>
