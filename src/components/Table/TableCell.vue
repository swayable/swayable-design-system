<template>
  <component
    :is='element'
    class='cell text-left'
    :class='{
      "p-2": !flush,
      "w-px": !grow,
      "whitespace-no-wrap": !wrap,
    }'
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'TableCell',
  props: {
    /**
     * Changes element from td to th
     * `true, false`
     */
    head: {
      type: Boolean,
      default: false,
    },
    /**
     * Cell width takes up empty space, otherwise is minimum width for content.
     * `true, false`
     */
    grow: {
      type: Boolean,
      default: false,
    },
    /**
     * Cell content does not wrap unless this is true
     * `true, false`
     */
    wrap: {
      type: Boolean,
      default: false,
    },
    /**
     * Removes padding inside cell
     */
    flush: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    element() {
      return this.head ? 'th' : 'td'
    },
  },
}
</script>

