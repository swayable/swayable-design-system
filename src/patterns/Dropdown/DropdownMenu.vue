<template>
  <div
    class='bg-white overflow-y-auto rounded shadow pt-1 mt-px border-grey-200 border'
    :style='style'
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'DropdownMenu',
  status: 'prototype',
  release: '0.5.0',
  props: {
    /**
     * The maximum allowable height of this dropdown menu, in pixels
     */
    maxHeight: {
      type: Number,
      default: 200,
    },
  },
  computed: {
    style() {
      return {
        'max-height': `${this.maxHeight}px`,
      }
    },
  },
  methods: {
    selectItem(value) {
      this.$parent.selectItem(value)
    },
  },
}
</script>

<docs>
  ```jsx
  <div>
    <Dropdown>
      <Input slot='trigger' placeholder='Search' />

      <DropdownMenu :max-height='120'>
        <DropdownItem value='option_1'>
          <p>Option A</p>
        </DropdownItem>
        <DropdownItem value='option_2'>
          <p>Option B</p>
        </DropdownItem>
        <DropdownItem value='option_3'>
          <p>Option C</p>
        </DropdownItem>
        <DropdownItem value='option_4'>
          <p>Option D</p>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
  ```
</docs>
