<template>
  <component
    :is='element'
    :class='`button-group flex ${orientation}`'
  >
    <slot />
  </component>
</template>

<script>
/**
 * Button Groups arrange are used to make buttons seem related to one another.
 * Common scenarios are menus and toggles
 */
export default {
  name: 'ButtonGroup',
  status: 'ready',
  props: {
    /**
     * The html element used for the button.
     * `button, a, input`
     */
    element: {
      type: String,
      default: 'div',
    },
    /**
     * Stacks buttons vertically instead of horizontally.
     * `true, false`
     */
    vertical: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    orientation() {
      return this.vertical
        ? 'vertical'
        : 'horizontal'
    },
  },
}
</script>

<docs>
  ```jsx
  <ButtonGroup>
    <Button>One</Button>
    <Button>Two</Button>
    <Button>Three</Button>
  </ButtonGroup>
  <div class='mt-2 inline-block'>
    <ButtonGroup vertical>
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  </div>
  ```
</docs>
