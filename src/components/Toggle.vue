<template>
  <div class='bg-grey inline-block rounded-md'>
    <div class='flex p-1'>
      <template v-for='option in options'>
        <Button
          :key='option'
          class='p-1.5'
          :class='option === selected ? "" : "bg-none border-transparent"'
        >
          {{ option }}
        </Button>
      </template>
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
     * Two way binding for selected option
     */
    selected: { type: String },
    /**
     * Style variation to warn users
     */
    destructive: {
      type: Boolean,
      default: false,
    },
    /**
     * Disables interaction (overrides destructive).
     */
    disabled: {
      type: Boolean,
      default: false,
    },
    /**
     * Smaller button
     */
    small: {
      type: Boolean,
      default: false,
    },
    /**
     * Alternative styles
     */
    alt: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return { open: false }
  },
}
</script>

<docs>
  ```jsx

  const options = [
    "Option 1",
    "Option 2",
    "Option 3",
  ]
  let selected1 = options[0]
  let selected2 = options[0]
  let selected3 = options[0]
  let selected4 = options[0]
    
  <Toggle
    :options='options'
    :selected.sync='selected1'
  />

  <Toggle
    class='mt-2'
    alt
    :options='options'
    :selected.sync='selected2'
  />

  <Toggle
    class='mt-2'
    destructive
    :options='options'
    :selected.sync='selected3'
  />

  <Toggle
    class='mt-2'
    disabled
    :options='options'
    :selected.sync='selected4'
  />
  ```
</docs>
