<template>
  <Index>
    <template slot='header'>
      <NavBar
        :links='links'
        align-right
      >
        <SelectSingle
          :options='testOptions'
          :selected='testOptions[0]'
        />
      </NavBar>
      <ToolBar>
        <SelectMultiple
          :options='[
            { value: 1, text: "Mobilization", selected: true },
            { value: 2, text: "Support", selected: false },
          ]'
        >
          <Icon
            name='metric'
            size='xs'
          />
          Metrics
        </SelectMultiple>
        <SelectMultiple
          class='ml-1'
          :options='[
            { value: 1, text: "Age", selected: true },
            { value: 2, text: "Gender", selected: true },
            { value: 3, text: "Urbanicity", selected: true },
          ]'
        >
          <Icon
            name='segment'
            size='xs'
          />
          Segments
        </SelectMultiple>
      
        <template slot='right'>
          <Toggle
            :options='toggleOptions'
            :selected='selectedToggle'
            @select='o => selectedToggle = o'
          />
        </template>
      </ToolBar>
    </template>
    <Table class='min-w-screen-sm w-full'>
      <template slot='head'>
        <TableRow>
          <TableCell head>
            <h5 class='text-blue-dark'>
              Single
            </h5>
          </TableCell>
          <TableCell head>
            Segment
          </TableCell>
          <TableCell
            head
            grow
          >
            Brand Lift
          </TableCell>
        </TableRow>
      </template>
      <TableRow>
        <TableCell class='border-b rounded-bl'>
          <span class='bg-grey-dark px-5 py-1 mr-3 rounded' />
          <span class='font-mono'>Alex Morgan</span>
        </TableCell>
        <TableCell class='border-b'>
          <span class='font-mono'>Female</span>
        </TableCell>
        <TableCell
          grow
          class='border-b'
        >
          <div class='bg-inherit px-5'>
            <BarChart v-bind='stats[0]' />
          </div>
        </TableCell>
        <TableCell
          grow
          class='border-b rounded-br'
        >
          <div class='bg-inherit px-5'>
            <BarChart v-bind='stats[1]' />
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell head>
          <h5 class='text-blue-dark mt-5'>
            Breakdown
          </h5>
        </TableCell>
        <TableCell head />
        <TableCell
          head
          grow
        />
      </TableRow>
      <TableRow>
        <TableCell>
          <span class='bg-grey-dark px-5 py-1 mr-3 rounded' />
          <span class='font-mono'>Alex Morgan</span>
        </TableCell>
        <TableCell>
          <span class='font-mono'>Female</span>
        </TableCell>
        <TableCell grow>
          <div class='bg-inherit px-5'>
            <BarChart v-bind='stats[0]' />
          </div>
        </TableCell>
        <TableCell grow>
          <div class='bg-inherit px-5'>
            <BarChart v-bind='stats[1]' />
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell class='merge-t border-b rounded-bl' />
        <TableCell class='border-b'>
          <span class='font-mono'>Male</span>
        </TableCell>
        <TableCell
          grow
          class='border-b'
        >
          <div class='bg-inherit px-5'>
            <BarChart v-bind='stats[2]' />
          </div>
        </TableCell>
        <TableCell
          grow
          class='border-b rounded-br'
        >
          <div class='bg-inherit px-5'>
            <BarChart v-bind='stats[1]' />
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell head>
          <h5 class='text-blue-dark mt-5'>
            Multiple Breakdown
          </h5>
        </TableCell>
        <TableCell head />
        <TableCell
          head
          grow
        />
      </TableRow>
      <TableRow>
        <TableCell class='rounded-tl'>
          <span class='bg-grey-dark px-5 py-1 mr-3 rounded' />
          <span class='font-mono'>Alex Morgan</span>
        </TableCell>
        <TableCell>
          <span class='font-mono'>Female</span>
        </TableCell>
        <TableCell grow>
          <div class='bg-inherit px-5'>
            <BarChart v-bind='stats[0]' />
          </div>
        </TableCell>
        <TableCell
          grow
          class='rounded-tr'
        >
          <div class='bg-inherit px-5'>
            <BarChart v-bind='stats[0]' />
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell class='merge-t' />
        <TableCell>
          <span class='font-mono'>Male</span>
        </TableCell>
        <TableCell grow>
          <div class='bg-inherit px-5'>
            <BarChart v-bind='stats[0]' />
          </div>
        </TableCell>
        <TableCell grow>
          <div class='bg-inherit px-5'>
            <BarChart v-bind='stats[0]' />
          </div>
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
          <div class='bg-inherit px-5'>
            <BarChart v-bind='stats[0]' />
          </div>
        </TableCell>
        <TableCell grow>
          <div class='bg-inherit px-5'>
            <BarChart v-bind='stats[0]' />
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell class='merge-t' />
        <TableCell>
          <span class='font-mono'>Male</span>
        </TableCell>
        <TableCell grow>
          <div class='bg-inherit px-5'>
            <BarChart v-bind='stats[0]' />
          </div>
        </TableCell>
        <TableCell grow>
          <div class='bg-inherit px-5'>
            <BarChart v-bind='stats[0]' />
          </div>
        </TableCell>
      </TableRow>
    </Table>
  </Index>
</template>

<script>
const sharedProps = { scale: 10, max: 9, min: -3 }
const stats = [{
  ...sharedProps,
  deltaLabel: '+44.2%',
  baselineLabel: '38.5%',
  baseline: 3.85,
  delta: 4.42,
  error: 0.9,
},
{
  ...sharedProps,
  baselineLabel: '54.5%',
  deltaLabel: '-2.4%',
  baseline: 5.45,
  delta: -0.24,
  insignificant: true,
  error: 0.31,
},
{
  ...sharedProps,
  baselineLabel: '18.5%',
  deltaLabel: '-14.1%',
  baseline: 1.85,
  delta: -1.41,
  error: 1.2,
}]

/**
 * Shows how to layout and structure a page.
 */
export default {
  name: 'Demo',
  props: {
    /**
     * The html element name used for the component.
     */
    element: {
      type: String,
      default: 'div',
    },
  },
  data() {
    const toggleOptions = ['Delta', 'Engagement']
    const selectedToggle = toggleOptions[0]
    const testOptions = [
      'Nike Dream Crazy',
      'Just Do It',
      'Another test',
    ]
    return {
      stats,
      links: {
        Setup: { href: '#', active: true },
        Responses: { href: '#' },
        Results: { href: '#' },
      },
      toggleOptions,
      selectedToggle,
      testOptions,
    }
  },
}
</script>

<docs>
  ```jsx
  <Index />
  ```
</docs>
