<template>
  <component
    :is='type'
    :href='href'
    :type='submit'
    :class='["button", size, state, variation]'
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
  status: 'planned',
  props: {
    /**
     * The html element used for the button.
     * `button, a`
     */
    type: {
      type: String,
      default: 'button',
      validator: value => {
        return value.match(/(button|a)/)
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
     * When setting the button’s type to a link, use this option to give a href.
     */
    href: {
      type: String,
      default: null,
    },
    /**
     * Set the button’s type to “submit”.
     */
    submit: {
      type: String,
      default: null,
      validator: value => {
        return value.match(/(null|submit)/)
      },
    },
    /**
     * Manually trigger various states of the button.
     * `hover, active, focus`
     */
    state: {
      type: String,
      default: null,
      validator: value => {
        return value.match(/(hover|active|focus)/)
      },
    },
    /**
     * Style variation to give additional meaning.
     * `primary, secondary`
     */
    variation: {
      type: String,
      default: null,
      validator: value => {
        return value.match(/(primary|secondary)/)
      },
    },
  },
}
</script>

<docs>
  ```jsx
  <div>
    <Button variation="primary" size="large">Primary Button</Button>
    <Button variation="primary" size="medium">Medium</Button>
    <Button variation="primary" size="small">Small</Button>
    <br />
    <Button>Default Button</Button>
    <Button state="hover">:hover</Button>
    <Button state="active">:active</Button>
    <Button state="focus">:focus</Button>
  </div>
  ```
</docs>
