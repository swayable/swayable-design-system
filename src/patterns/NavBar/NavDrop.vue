<template>
  <component
    :is='type'
    class='relative nav-drop'
  >
    <NavItem
      type='button'
      aria-label='Expand Menu'
      :class='`pr-1 sm:pr-2 md:pr-3 lg:pr-4 h-full`'
      @click='toggleOpen'
      v-on='$listeners'
    >
      <span class='flex items-center'>
        <slot>{{ name }}</slot>
        <span class='ml-1 flex'>
          <Icon
            name='chevron-down'
            size='small'
          />
        </span>
      </span>
    </NavItem>
    <div
      v-show='open'
      ref='navMenuDropdown'
      :class='`w-screen sm:w-auto min-w-full absolute flex-col z-30 shadow ${align}-0 nav-drop-dropdown`'
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
  status: 'ready',
  release: '0.3.0',
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
    /**
     * Dropdown originates from the right or left
     */
    align: {
      type: String,
      default: 'right',
      validator: value => ['right', 'left'].includes(value),
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

<docs>
  ```jsx
  <NavBar>
    <NavGroup class='flex-grow'>
      <NavLogo />
    </NavGroup>
    <NavGroup>
      <NavDrop name="Menu" :navItems='[
          { name: "Item 1" },
          { name: "Item 2", active: true },
          { name: "Item 3" },
        ]'
      />
      <NavDrop>
        Account
        <template #dropdown>
          <NavItem name="Profile" />
          <NavItem name="Settings" />
          <hr class="border-t m-0" />
          <NavItem name="Logout" />
        </template>
      </NavDrop>
    </NavGroup>
  </NavBar>
  ```
</docs>
