<template>
  <component
    :is='element'
    class='cell text-left h-14'
    :class='{
      "p-2": !flush,
      "px-15": chart,
      "whitespace-no-wrap": !wrap,
      "align-bottom": head,
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
     * Optimizes cell to display a BarChart
     * `true, false`
     */
    chart: {
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

