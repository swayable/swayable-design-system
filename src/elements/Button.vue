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
     * Style variation for nesting in menus
     */
    menu: {
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
        if (this.menu && this.disabled) return 'bg-transparent text-grey-dark'
        if (this.menu) return 'bg-transparent text-blue-dark hover:bg-grey-lighter'
        if (this.disabled) return 'text-grey-darker border border-grey-light bg-grey-light cursor-not-allowed disabled'
        if (this.primary) return 'text-white bg-blue-dark border border-blue-dark'
        return 'text-black bg-white border border-grey'
      }
      const size = {
        small: '',
        medium: '',
        large: '',
      }[this.size]
      const classes = ['button', 'py-2 px-3', 'text-sm', 'leading-snug']
      if (!this.menu) classes.push('rounded')
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
  <Button menu>Menu</Button>
  ```
</docs>
