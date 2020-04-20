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
.theme-dark-mode {
  .table-table {
    td {
      @apply border-dark-4;
    }
  }
}
.table-table {
  border-collapse: separate;
  border-spacing: 0;
  
  th {
    @apply text-sm;
  }

  td {
    @apply border-light-3;
    @apply border-t;
    @apply border-l;
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

  &.merge-r {
    td { border-right-color: transparent !important }
    tr:first-child {
      td:last-child { @apply rounded-none }
    }
    tr:last-child {
      td:last-child { @apply rounded-none }
    }
  }
  &.merge-l {
    td { border-left-color: transparent !important }
    tr:first-child {
      td:first-child { @apply rounded-none }
    }
    tr:last-child {
      td:first-child { @apply rounded-none }
    }
  }

  td {
    &.merge-t { border-top-color: transparent !important }
    &.merge-r { border-right-color: transparent !important }
    &.merge-b { border-bottom-color: transparent !important }
    &.merge-l { border-left-color: transparent !important }
  }
}
</style>

<docs>
```jsx
const theme = "Light Mode"
<Toggle
  :options='["Light Mode", "Dark Mode"]'
  :selected='theme'
  @select='s => theme = s'
/>
<div :class='{ "theme-dark-mode": theme === "Dark Mode"}' class='mt-5 p-7 pt-0'>
  <Table>
    <template slot='head'>
      <TableRow>
        <TableCell head>
          Multiple Breakdown
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
        <span class='px-5 py-1 mr-3 rounded' />
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
        <span class='px-5 py-1 mr-3 rounded' />
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
</div>
```
</docs>