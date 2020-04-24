<template>
  <td
    class='table-cell bg-card text-left h-12 border-default'
    :class='{
      "bg-card": !head,
      "px-4": !flush && !chart,
      "px-15": chart,
      "whitespace-no-wrap": !wrap,
    }'
  >
    <slot />
  </td>
</template>

<script>
export default {
  name: 'TableCell',
  props: {
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
}
</script>

