<template>
  <div class='toggle inline-block rounded-md'>
    <div class='flex'>
      <slot>
        <template v-for='option in options'>
          <Button
            :key='option'
            class='py-1.5 px-2'
            :custom='option !== selected'
            @click='$emit("select", option)'
          >
            {{ option }}
          </Button>
        </template>
      </slot>
    </div>
  </div>
</template>

<script>
/**
 * Toggle provides a button group that acts like a select.
 */
export default {
  name: 'Toggle',
  props: {
    /**
     * Array of strings displayed in the dropdown
     */
    options: { type: Array, required: true },
    /**
     * Highlights selected option
     */
    selected: { type: String },
  },
}
</script>

<style lang="scss">
.toggle {
  @apply bg-light-3;
  .button {
    &:not(:first-child) {
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    }
    &:not(:last-child) {
      border-top-right-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }
  }
}
.theme-dark-mode {
  .toggle {
    @apply bg-dark-2;
  }
}
</style>

<docs>
  ```jsx

  const options = [
    "Option1",
    "Option2",
    "Option3",
  ]
  let selected1 = options[0]
  let selected2 = options[0]
  
  <div class='p-5 inline-block'>
    <h3 class='typography-4 w-full uppercase text-light-1 mb-1'>Light Mode</h3>
    <Toggle
      :options='options'
      :selected='selected1'
      @select='option => selected1 = option'
    />
  </div>

  <div class='theme-dark-mode p-5 inline-block'>
    <h3 class='typography-4 w-full uppercase text-light-1 mb-1'>Dark Mode</h3>

    <Toggle
      :options='options'
      :selected='selected2'
      @select='option => selected2 = option'
    />
  </div>
  ```
</docs>
