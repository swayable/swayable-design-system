<template>
  <div class='bg-grey inline-block rounded-md'>
    <div class='flex p-0.5 toggle'>
      <slot>
        <template v-for='option in options'>
          <Button
            :key='option'
            class='py-1.5 px-2'
            :class='classesForOption(option)'
            :custom='option !== selected'
            :disabled='disabled'
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
    /**
     * Disables interaction
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    classesForOption(option) {
      if (option === this.selected) return ''
      
      const classes = ['border-transparent']
      if (this.disabled) classes.push('text-dark-5')
      return classes
    },
  },
}
</script>

<docs>
  ```jsx

  const options = [
    "Option1",
    "Option2",
    "Option3",
  ]
  let selected1 = options[0]
  let selected2 = null
  let selected3 = options[0]
    
  <Toggle
    :options='options'
    :selected='selected1'
    @select='option => selected1 = option'
  />

   <Toggle
    :options='options'
    :selected='selected2'
    @select='option => selected2 = option'
  />

  <Toggle
    class='mt-2'
    disabled
    :options='options'
    :selected='selected3'
    @select='option => selected3 = option'
  />
  ```
</docs>
