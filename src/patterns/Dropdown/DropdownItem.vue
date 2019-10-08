<template>
  <div
    class='p-2 hover:bg-grey-100'
    @click='onClick'
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'DropdownItem',
  status: 'prototype',
  release: '0.5.0',
  props: {
    value: {
      type: [Boolean, String, Number, Array, Object],
    },
  },
  methods: {
    onClick(value) {
      this.$parent.selectItem(this.value)
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
