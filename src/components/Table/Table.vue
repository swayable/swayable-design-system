<template>
  <table class='table-table'>
    <thead>
      <slot name='head' />
    </thead>
    <tbody>
      <slot />
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'Table',
}
</script>

<style lang="scss">
.table-table {
  border-collapse: separate;
  border-spacing: 0;
  
  th {
    @apply text-grey-darker;
    @apply text-sm;
  }

  td {
    @apply border-grey;
    @apply border-t;
    @apply border-l;
    @apply bg-white;
  }
  tr {
    td:last-child { @apply border-r }
    &:first-child {
      td:first-child { @apply rounded-tl }
      td:last-child { @apply rounded-tr }
    }
    &:last-child {
      td { @apply border-b; }

      td:first-child { @apply rounded-bl }
      td:last-child { @apply rounded-br }
    }
  }

  td {
    &.merge-t { border-top-color: $color-white !important }
    &.merge-r { border-right-color: $color-white !important }
    &.merge-b { border-bottom-color: $color-white !important }
    &.merge-l { border-left-color: $color-white !important }
  }
}
</style>

<docs>
```jsx
<Table>
  <template slot='head'>
    <TableRow>
      <TableCell head>
        <h5 class='text-blue-dark'>
          Multiple Breakdown
        </h5>
      </TableCell>
      <TableCell head>
        Segment
      </TableCell>
      <TableCell head grow>
        Brand Lift
      </TableCell>
    </TableRow>
  </template>
  <TableRow>
    <TableCell>
      <span class='bg-grey-dark px-5 py-1 mr-3 rounded' />
      <span class='font-mono'>Alex Morgan</span>
    </TableCell>
    <TableCell>
      <span class='font-mono'>Female</span>
    </TableCell>
    <TableCell grow>
      <p>Cell 1</p>
    </TableCell>
    <TableCell grow>
      <p>Cell 1</p>
    </TableCell>
  </TableRow>
  <TableRow>
    <TableCell class='merge-t' />
    <TableCell>
      <span class='font-mono'>Male</span>
    </TableCell>
    <TableCell grow>
      <p>Cell 2</p>
    </TableCell>
    <TableCell grow>
      <p>Cell 2</p>
    </TableCell>
  </TableRow>
  <TableRow>
    <TableCell>
      <span class='bg-grey-dark px-5 py-1 mr-3 rounded' />
      <span class='font-mono'>Colin Kaepernick</span>
    </TableCell>
    <TableCell>
      <span class='font-mono'>Female</span>
    </TableCell>
    <TableCell grow>
      <p>Cell 1</p>
    </TableCell>
    <TableCell grow>
      <p>Cell 1</p>
    </TableCell>
  </TableRow>
   <TableRow>
    <TableCell class='merge-t' />
    <TableCell>
      <span class='font-mono'>Male</span>
    </TableCell>
    <TableCell grow>
      <p>Cell 2</p>
    </TableCell>
    <TableCell grow>
      <p>Cell 2</p>
    </TableCell>
  </TableRow>
</Table>
```
</docs>