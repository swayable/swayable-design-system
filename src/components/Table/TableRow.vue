<template>
  <tr class='table-row bg-inherit w-full'>
    <slot />
  </tr>
</template>

<script>
export default {
  name: 'TableRow',
}
</script>

<style lang='scss'>
  tbody {
    .table-row td {
      @apply bg-light-6;
    }
  }
  .theme-dark-mode {
    tbody {
      .table-row td {
        @apply bg-dark-4;
      }
    }
  }
</style>
