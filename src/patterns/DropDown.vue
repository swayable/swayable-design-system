<template>
  <div
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
      class='w-auto min-w-full flex-col z-50'
      :class='align ? `absolute ${align}-0` : "relative"'
    >
      <slot
        v-if='open'
        name='dropdown'
      />
    </div>
    <button
      v-if='open'
      :aria-label='closeAriaLabel'
      class='fixed w-screen h-screen top-0 left-0 opacity-0 z-40 cursor-default'
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
  let topLeftOpen = false
  let topRightOpen = false
  let bottomLeftOpen = false

  <div class='flex justify-between'>
    <DropDown :open='topLeftOpen' @close='topLeftOpen = false' align='left'>
      <Button primary @click='topLeftOpen = !topLeftOpen'>Left Dropdown</Button>
      <template #dropdown>
        <p class='border bg-grey-lighter py-2 px-4 whitespace-no-wrap mt-1'>
          You can interact with this content without triggering the close event
        </p>
      </template>
    </DropDown>

    <DropDown :open='topRightOpen' @close='topRightOpen = false' align='right'>
      <Button primary @click='topRightOpen = !topRightOpen'>Right Dropdown</Button>
      <template #dropdown>
        <p class='border bg-grey-lighter py-2 px-4 whitespace-no-wrap mt-1'>
          You can interact with this content without triggering the close event
        </p>
      </template>
    </DropDown>
  </div>
  <div class='flex justify-between'>
  <DropDown :open='bottomLeftOpen' @close='bottomLeftOpen = false' class='mt-2'>
      <Button @click='bottomLeftOpen = !bottomLeftOpen'>Collapsable content</Button>
      <template #dropdown>
        <p class='py-2'>
          Notice that without an `align` prop, the expanded content is not absolutely positioned and displaces content in the normal page flow.
        </p>
      </template>
    </DropDown>
  </div>
  ```
</docs>
