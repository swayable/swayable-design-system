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
  border-spacing: 0;
  border-collapse: separate;
   .table-cell {
    @apply text-md border-b border-r;
    &.merge-t { @apply border-t-0 }
    &.merge-r { @apply border-r-0 }
    &.merge-b { @apply border-b-0 }
    &.merge-l { @apply border-l-0 }
  }

  .table-cell:first-child {
    @apply border-r
  }

  .table-cell + .table-cell {
    @apply border-r;
  }

  .table-row.body:first-child,
  .table-row.head + .table-row.body {
    .table-cell {
      @apply border-t;
    }
  }

  &:not(.merge-r) {
    tr.body:first-child,
    tr.head + tr.body {
      .table-cell:last-child {
        @apply rounded-tr
      }
    }
    tr.body.last, tr.body:last-child {
      .table-cell:last-child {
        @apply rounded-br
      }
    }
  }
  &:not(.merge-l) {
    .table-cell:first-child { @apply border-l }
    tr.body:first-child,
    tr.head + tr.body {
      .table-cell:first-child {
        @apply rounded-tl
      }
    }
    tr.body.last, tr.body:last-child {
      .table-cell:first-child {
        @apply rounded-bl
      }
    }
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
      <TableRow head>
        <HeadCell>
          Multiple Breakdown
        </HeadCell>
        <HeadCell>
          Segment
        </HeadCell>
        <HeadCell>
          Brand Lift
        </HeadCell>
      </TableRow>
    </template>
    <TableRow>
      <TableCell class='merge-b'>
        Alex Morgan
      </TableCell>
      <TableCell>
        Female
      </TableCell>
      <TableCell>
        Cell 1
      </TableCell>
      <TableCell>
        Cell 1
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell />
      <TableCell>
        Male
      </TableCell>
      <TableCell>
        Cell 2
      </TableCell>
      <TableCell>
        Cell 2
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell class='merge-b'>
        Colin Kaepernick
      </TableCell>
      <TableCell>
        Female
      </TableCell>
      <TableCell>
        Cell 1
      </TableCell>
      <TableCell>
        Cell 1
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell />
      <TableCell>
        Male
      </TableCell>
      <TableCell>
        Cell 2
      </TableCell>
      <TableCell>
        Cell 2
      </TableCell>
    </TableRow>
  </Table>
</div>
```
</docs>