<template>
  <tr
    class='table-row w-full colors-transition'
    :class='{ head, body: !head, last }'
  >
    <slot />
  </tr>
</template>

<script>
export default {
  name: 'TableRow',
  props: {
    /**
     *  Applies styles to look like column headers
     * `true, false`
     */
    head: {
      type: Boolean,
      default: false,
    },
    /**
     *  Rounds the bottom edges
     */
    last: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
