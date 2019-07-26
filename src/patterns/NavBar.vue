<template>
  <component
    :is='type'
    class='flex items-center justify-between flex-wrap bg-blue-900 pl-3 text-gray-500'
  >
    <div class='flex items-center flex-shrink-0 mr-4 p-3'>
      <slot>
        <span
         v-if='heading'
         v-html='heading'
         class='font-heading font-medium text-xl text-white'
        />
      </slot>
    </div>
    <div class='block lg:hidden'>
      <button
        @click='open = !open'
        class='flex items-center px-3 py-2 rounded text-teal-200 border-teal-400 hover:text-white'
      >
        <Icon name='menu' />
      </button>
    </div>
    <div
      class='lg:flex flex-grow w-full lg:items-stretch lg:w-auto min-h-16'
      :class='{
        flex: open,
        hidden: !open,
      }'
    >
      <div class='flex flex-grow'>
        <slot name='left' />
      </div>
      <div class='flex'>
        <slot name='right'>
          <NavItem v-for='item in navItems' :key='item.name' v-bind='item' />
        </slot>
      </div>
    </div>
  </component>
</template>

<script>
/**
 * Used as main page navigation in templates.
 */
export default {
  name: 'NavBar',
  status: 'ready',
  release: '1.0.0',
  model: {
    prop: 'active',
  },
  props: {
    /**
     * The html element used for the nav bar.
     */
    type: {
      type: String,
      default: 'nav',
    },
    /**
     * The heading (overriden by default slot)
     */
    heading: {
      type: String,
    },
    /**
     * Navigation items (cannot be used with slots)
     * `[{ name:String, href:String, active:Boolean, title:String }]`
     */
    navItems: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return { open: false }
  },
}
</script>

<docs>
  ```jsx
  <NavBar>
    <template #left>
      <NavItem name='Dashboard' />
    </template>
    <template #right>
      <NavItem name='Sign in' />
    </template>
  </NavBar>
  ```
</docs>
