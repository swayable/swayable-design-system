<template>
  <component
    :is='element'
    :class='classes'
    :disabled='disabled'
    v-on='$listeners'
  >
    <slot />
  </component>
</template>

<script>
/**
 * Buttons are generally used for interface actions. Suitable for all-purpose use.
 * Defaults to appearance that has white background with grey border.
 * Primary style should be used only once per view for main call-to-action.
 */
export default {
  name: 'Button',
  status: 'ready',
  props: {
    /**
     * The html element used for the button.
     * `button, a, input`
     */
    element: {
      type: String,
      default: 'button',
      validator: value => {
        return value.match(/(button|a|input)/)
      },
    },
    /**
     * The size of the button. Defaults to medium.
     * `small, medium, large`
     */
    size: {
      type: String,
      default: 'medium',
      validator: value => {
        return value.match(/(small|medium|large)/)
      },
    },
    /**
     * Style variation to give additional meaning.
     */
    primary: {
      type: Boolean,
      default: false,
    },
    /**
     * Whether the form input field is disabled or not.
     * `true, false`
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    classes() {
      const variation = () => {
        if (this.primary) return 'text-white bg-blue-dark'
        if (this.disabled) return 'text-grey-darker bg-grey-light cursor-not-allowed disabled'
        return 'text-black bg-white border border-grey'
      }
      const size = {
        small: '',
        medium: '',
        large: '',
      }[this.size]
      const classes = ['button', 'rounded', 'py-2 px-3', 'text-sm', 'font-medium', 'leading-snug']
      classes.push(variation())
      classes.push(size)
      return classes
    },
  },
}
</script>

<docs>
  ```jsx
  <Button primary>Primary</Button>
  <Button>Normal</Button>
  <Button disabled>Disabled</Button>
  ```
</docs>
