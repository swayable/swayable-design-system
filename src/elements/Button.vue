<template>
  <component
    :is='element'
    :class='`button inline-block ${classes}`'
    :disabled='disabled'
    v-on='$listeners'
  >
    <slot />
  </component>
</template>

<script>
import Label from './Label'

/**
 * Buttons are generally used for interface actions. Suitable for all-purpose use.
 * Defaults to appearance that has white background with grey border.
 * Primary style should be used only once per view for main call-to-action.
 */
export default {
  name: 'Button',
  extends: Label,
  status: 'ready',
  props: {
    /**
     * The html element used for the Button.
     */
    element: {
      type: String,
      default: 'button',
      validator: value => {
        return value.match(/(button|a|input)/)
      },
    },
    /**
     * Style variation for nesting in menus
     */
    menu: {
      type: Boolean,
      default: false,
    },
    /**
     * Disables interaction
     * `true, false`
     */
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    classesForVariant() {
      const base = 'border rounded'
      if (this.custom) return base
      if (this.menu && this.disabled) return 'bg-transparent text-grey-dark rounded disabled'
      if (this.menu) return 'bg-transparent text-blue-dark hover:bg-grey-lighter'
      if (this.disabled) return `${base} text-grey-darker border-grey-light bg-grey-light cursor-not-allowed disabled`
      if (this.primary) return `${base} text-white bg-blue-dark border-blue-dark`
      return `${base} text-black bg-white border-grey`
    },
  },
}
</script>

<style>
.button:focus {
  position: relative;
  z-index: 1;
}
</style>

<docs>
  ```jsx
  <div class='flex justify-between items-center flex-wrap'>
    <Button>Normal</Button>
    <Button disabled>Disabled</Button>
    <Button primary>Primary</Button>
    <Button menu>Menu</Button>
    <Button menu disabled>Disabled Menu</Button>
    <Button custom class='bg-pink border-pink text-white'>Custom</Button>
    <Button size='xs'>x-small</Button>
    <Button size='sm'>small</Button>
    <Button size='md'>medium</Button>
    <Button size='lg'>large</Button>
  </div>
  ```
</docs>
