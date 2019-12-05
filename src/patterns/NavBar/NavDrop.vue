<template>
  <DropDown
    class='nav-drop sm:relative'
    :open='open'
    @close='open = false'
  >
    <NavItem
      element='button'
      aria-label='Expand Menu'
      class='pr-1 sm:pr-2 md:pr-3 lg:pr-4 h-full'
      :class='open && "z-20"'
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
        :class='`w-screen sm:w-auto min-w-full absolute flex-col z-30 ${align}-0 nav-drop-dropdown`'
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
  },
  data() {
    return {
      open: false,
    }
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
