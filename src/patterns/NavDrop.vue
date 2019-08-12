<template>
  <component
    :is='type'
    class='relative'
  >
    <NavItem
      type='button'
      aria-label='Expand Menu'
      @click='toggleOpen'
      v-on='$listeners'
    >
      <slot>{{ name }}</slot>
    </NavItem>
    <div
      v-show='open'
      ref='navMenuDropdown'
      class='w-screen md:w-auto min-w-full absolute right-0 flex-col nav-drop z-30'
    >
      <slot name='dropdown'>
        <NavItem
          v-for='item in navItems'
          :key='item.name'
          v-bind='item'
        />
      </slot>
    </div>
  </component>
</template>

<script>
/**
 * A specialized NavItem which opens a dropdown.
 */
export default {
  name: 'NavDrop',
  status: 'under-review',
  release: '0.1.0',
  props: {
    /**
     * The html element used for component
     */
    type: {
      type: String,
      default: 'div',
    },
    /**
     * Displayed text (overriden by default slot)
     */
    name: {
      type: String,
      required: false,
    },
    /**
     * Items to be displayed in the dropdown (overriden by slot #dropdown)
     * `[{ name:String, href:String, active:Boolean, title:String }]`
     */
    navItems: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      open: false,
      elementsList: [],
    }
  },
  mounted() {
    this.populateElementsList()
    window.addEventListener('click', this.windowClick)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.windowClick)
  },
  methods: {
    populateElementsList() {
      const flatten = arr => arr.reduce((a, b) => a.concat(b), [])
      const getChildElements = el =>
        flatten(
          Array.from(el.children)
            .map(getChildElements)
            .concat(el)
        )
      this.elementsList = getChildElements(this.$el)
    },
    windowClick({ target }) {
      if (!this.elementsList.includes(target)) this.open = false
    },
    toggleOpen() {
      this.open = !this.open
    },
  },
}
</script>

<style lang="scss">
.nav-drop {
  background-color: $dark;
  .nav-item.active { border-bottom: 0; }
}
.theme-dark {
  .nav-drop {
    background-color: $light;
  }
}
</style>

<docs>
  ```jsx
  <NavBar>
    <NavItem href='/' name="Link" />
    <NavDrop name="Menu" :navItems='[
        { name: "Item 1" },
        { name: "Item 2", active: "true" },
        { name: "Item 3" },
      ]'
    />
    <NavDrop>
      Account &nbsp;
      <Icon name="chevron-down" size="small" />
      <template #dropdown>
        <NavItem name="Profile" />
        <NavItem name="Settings" />
        <hr class="border-t m-0" />
        <NavItem name="Logout" />
      </template>
    </NavDrop>
  </NavBar>
  ```
</docs>
