<template>
  <DropDown
    class='nav-drop sm:relative'
    :open='open'
    @close='open = false'
  >
    <NavItem
      element='button'
      aria-label='Expand Menu'
      class='nav-drop-trigger h-full'
      :flush='flush'
      @click='open = !open'
    >
      <span class='flex items-center'>
        <slot>{{ name }}</slot>
        <span class='ml-2 flex'>
          <Icon
            name='chevron'
            size='xs'
          />
        </span>
      </span>
    </NavItem>

    <template #dropdown>
      <div
        :class='dropdownClass'
        class='nav-drop-dropdown w-screen sm:w-auto min-w-full absolute flex-col border-b border-t border-grey-dark sm:border-t-0'
      >
        <slot name='dropdown'>
          <NavItem
            v-for='item in navItems'
            :key='item.name'
            v-bind='item'
          />
        </slot>
      </div>
    </template>
  </DropDown>
</template>

<script>
/**
 * A specialized NavItem which opens a dropdown.
 */
export default {
  name: 'NavDrop',
  status: 'ready',
  props: {
    /**
     * The html element used for component
     */
    element: {
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
    /**
     * Removes horizontal spacing around NavDrop trigger
     */
    flush: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      open: false,
    }
  },
  computed: {
    dropdownClass() {
      return this.align === 'right'
        ? 'right-0 sm:border-l'
        : 'left-0 sm:border-r'
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
          <NavItem>Profile<NavItem/>
          <NavItem>Settings<NavItem/>
          <hr class="border-t m-0" />
          <NavItem>Logout<NavItem/>
        </template>
      </NavDrop>
    </NavGroup>
  </NavBar>
  ```
</docs>
