// Parts of this component are derived from the Buefy project, whose license is
// included below:
//
// MIT License
//
// Copyright (c) 2017-2019 Rafael Beraldo
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

<template>
  <div class='inline-block'>
    <div @click='toggle'>
      <slot name='trigger' />
    </div>

    <div
      v-show='isActive'
      class='relative'
    >
      <div class='absolute top-0 left-0 z-10 w-full'>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  status: 'prototype',
  release: '0.5.0',
  data() {
    return {
      isActive: false,
    }
  },
  created() {
    document.addEventListener('click', this.onBlurClick)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.onBlurClick)
  },
  methods: {
    onBlurClick(evt) {
      this.isActive = false
    },
    toggle() {
      // if not active, toggle after clickOutside event
      // this fixes toggling programmatic
      this.$nextTick(() => {
        const value = !this.isActive
        this.isActive = value
        // Vue 2.6.x ???
        setTimeout(() => (this.isActive = value))
      })
    },
    selectItem(value) {
      this.$emit('change', value)
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

