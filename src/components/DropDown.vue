<template>
  <div
    v-on-clickaway='close'
    class='inline-block'
    :class='align && `relative`'
  >
    <span
      class='relative'
      :class='open && "z-50"'
    >
      <slot />
    </span>
    <div
      class='w-full min-w-full md:w-auto md:max-w-screen flex-col z-50'
      :class='align ? `absolute ${align}-0` : "relative"'
    >
      <transition
        enter-active-class='transition ease-out duration-100'
        leave-active-class='transition ease-in duration-75'
        enter-class='transform opacity-0 scale-95'
        enter-to-class='transform opacity-100 scale-100'
        leave-class='transform opacity-100 scale-100'
        leave-to-class='transform opacity-0 scale-95'
      >
        <slot
          v-if='open'
          name='dropdown'
        />
      </transition>
    </div>
  </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway'

/**
 * DropDown provides a pattern for building dropdowns, such as menus, autocompletes, etc.
 */
export default {
  name: 'DropDown',
  directives: { onClickaway },
  status: 'ready',
  props: {
    /**
     * Controls whether the dropdown is open or closed
     */
    open: { type: Boolean, default: false, required: true },
    /**
     * Dropdown originates from the right or left
     */
    align: {
      type: String,
      validator: value => ['right', 'left'].includes(value),
    },
  },
  methods: {
    close() { this.$emit('close') },
  },
}
</script>

<docs>
  ```jsx
  let topLeftOpen = false
  let topRightOpen = false
  let bottomLeftOpen = false

  <div class='flex justify-between'>
    <DropDown :open='topLeftOpen' @close='topLeftOpen = false' align='left'>
      <Button alt @click='topLeftOpen = !topLeftOpen'>Left Dropdown</Button>
      <template #dropdown>
        <p class='border bg-light-5 py-2 px-4 whitespace-no-wrap mt-1'>
          You can interact with this content without triggering the close event
        </p>
      </template>
    </DropDown>

    <DropDown :open='topRightOpen' @close='topRightOpen = false' align='right'>
      <Button alt @click='topRightOpen = !topRightOpen'>Right Dropdown</Button>
      <template #dropdown>
        <p class='border bg-light-5 py-2 px-4 whitespace-no-wrap mt-1'>
          You can interact with this content without triggering the close event
        </p>
      </template>
    </DropDown>
  </div>
  <div class='flex justify-between'>
  <DropDown :open='bottomLeftOpen' @close='bottomLeftOpen = false' class='mt-2'>
      <Button alt @click='bottomLeftOpen = !bottomLeftOpen'>Collapsable content</Button>
      <template #dropdown>
        <p class='py-2'>
          Notice that without an `align` prop, the expanded content is not absolutely positioned and displaces content in the normal page flow.
        </p>
      </template>
    </DropDown>
  </div>
  ```
</docs>
