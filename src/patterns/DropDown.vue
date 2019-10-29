<template>
  <div
    class='inline-block'
    :class='align && `relative`'
  >
    <span
      class='relative'
      :class='open && "z-20"'
    >
      <slot />
    </span>
    <div
      class='w-auto min-w-full flex-col z-20'
      :class='align && `absolute ${align}-0`'
    >
      <slot
        v-if='open'
        name='dropdown'
      />
    </div>
    <button
      v-if='open'
      :aria-label='closeAriaLabel'
      class='fixed w-screen h-screen top-0 left-0 opacity-0 z-10 cursor-default'
      @click='$emit("close")'
    />
  </div>
</template>

<script>
/**
 * DropDown provides a pattern for building dropdowns, such as menus, autocompletes, etc.
 *
 * Importantly, it does not manage it's own state, but it does emit 'close' when the cursor clicks
 * outside the dropdown content.
 */
export default {
  name: 'DropDown',
  status: 'ready',
  props: {
    /**
     * Controls whether the dropdown is open or closed
     */
    open: { type: Boolean, default: false, required: true },
    /**
     * Accessibility label for button to emit close event
     */
    closeAriaLabel: { type: String, default: 'Close Dropdown' },
    /**
     * Dropdown originates from the right or left
     */
    align: {
      type: String,
      validator: value => ['right', 'left'].includes(value),
    },
  },
}
</script>

<docs>
  ```jsx
  const leftOpen = false
  const rightOpen = false
  const open = false

  <div class='flex justify-between'>
    <DropDown :open='leftOpen' @close='leftOpen = false' align='left'>
      <Button primary @click='leftOpen = !leftOpen'>Left Dropdown</Button>
      <template #dropdown>
        <p class='border bg-grey-lighter py-2 px-4 whitespace-no-wrap mt-1'>
          You can interact with this content without triggering the close event
        </p>
      </template>
    </DropDown>

    <DropDown :open='rightOpen' @close='rightOpen = false' align='right'>
      <Button primary @click='rightOpen = !rightOpen'>Right Dropdown</Button>
      <template #dropdown>
        <p class='border bg-grey-lighter py-2 px-4 whitespace-no-wrap mt-1'>
          You can interact with this content without triggering the close event
        </p>
      </template>
    </DropDown>
  </div>
  <DropDown :open='open' @close='open = false' class='mt-2'>
      <Button @click='open = !open'>Collapsable content</Button>
      <template #dropdown>
        <p class='py-2'>
          Notice that without an `align` prop, the expanded content is not absolutely positioned and displaces content in the normal page flow.
        </p>
      </template>
    </DropDown>
  ```
</docs>
