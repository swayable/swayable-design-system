
<template>
  <component
    :is='smartElement'
    :class='`button leading-4 focus:outline-none focus:shadow-outline ${classes}`'
    :disabled='disabled'
    v-bind='navigation'
    v-on='$listeners'
  >
    <slot />
  </component>
</template>

<script>
import Label from './Label'

/**
 * Buttons are generally used for interface actions.
 * Event handlers can be attached like any other button.
 *
 * Including `props.to` will cause the element to become a `<router-link>`
 *
 * Including `props.href` will cause the element to become an `<a>`
 */
export default {
  name: 'Button',
  status: 'ready',
  props: {
    /**
     * The html element used for the Button.
     */
    element: {
      type: String,
      validator: value => {
        return value.match(/(button|a|input|router-link)/)
      },
    },
    /**
     * Element will be &lt;router-link&gt;
     */
    to: {
      type: Object,
    },
    /**
     * Element with be &lt;a&gt;
     */
    href: {
      type: String,
    },
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
     * Strips styles
     */
    custom: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    smartElement() {
      if (this.element) return this.element
      if (this.to) return 'router-link'
      if (this.href) return 'a'
      return 'button'
    },
    navigation() {
      if (this.smartElement === 'router-link') return { to: (this.to || this.href) }
      if (this.smartElement === 'a') return { href: this.href }
      return {}
    },
    classes() {
      let color
      if (this.disabled) color = 'grey-dark'
      else if (this.destructive) color = 'red'
      else color = 'blue'

      const base = this.custom ? '' : `border rounded text-white bg-${color} border-${color}`
      const size = this.small ? 'text-xs p-1' : 'text-sm p-2'
      const disabled = this.disabled ? 'disabled cursor-not-allowed' : ''
      const destructive  = this.destructive ? 'destructive' : 'normal'
      return `${base} ${size} ${disabled} ${destructive}`
    },
  },
}
</script>

<style lang="scss">
.button:not([disabled]) {
  &:not(.alt) {
    &:hover { filter: brightness(110%) }
    &:active { filter: brightness(150%) }
  }
}

</style>

<docs>
  ```jsx
  <div class='flex justify-between items-center flex-wrap'>
    <Button>Normal</Button>
    <Button custom>Custom</Button>
    <Button destructive>Destructive</Button>
    <Button disabled>Disabled</Button>
  </div>
  <div class='mt-4 flex justify-between items-center flex-wrap'>
    <Button small>Small Primary</Button>
    <Button small custom>Custom</Button>
    <Button small destructive>Small Destructive</Button>
    <Button small disabled>Small Disabled</Button>
  </div>
  ```
</docs>
