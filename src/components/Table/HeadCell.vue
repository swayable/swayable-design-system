<template>
  <th
    class='head-cell font-medium text-sm align-bottom px-4 py-2 text-tertiary text-left h-12 border-default'
    :class='{ "whitespace-no-wrap": !wrap }'
  >
    <slot />
  </th>
</template>

<script>
export default {
  name: 'HeadCell',
  props: {
    /**
     * Cell content does not wrap unless this is true
     * `true, false`
     */
    wrap: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
