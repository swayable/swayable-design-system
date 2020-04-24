
<template>
  <Index :class='themeClass'>
    <template slot='header'>
      <NavBar
        :links='links'
        align-right
      >
        <span class='theme-dark-mode'>
          <SelectSingle
            :small='true'
            :options='testOptions'
            :selected='testOptions[0]'
          />
        </span>
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

    <div class='flex min-w-screen-sm'>
      <div class='flex-shrink-0'>
        <Table class='merge-r'>
          <template slot='head'>
            <TableRow head>
              <HeadCell>
                Single
              </HeadCell>
              <HeadCell>
                Segment
              </HeadCell>
            </TableRow>
          </template>
          <TableRow last>
            <TableCell>
              Alex Morgan
            </TableCell>
            <TableCell>
              Female
            </TableCell>
          </TableRow>
          <TableRow head>
            <HeadCell>
              Breakdown
            </HeadCell>
            <HeadCell />
          </TableRow>
          <TableRow>
            <TableCell
              wrap
              class='merge-b'
            >
              Alex Morgan
            </TableCell>
            <TableCell>
              Female
            </TableCell>
          </TableRow>
          <TableRow last>
            <TableCell />
            <TableCell>
              Male
            </TableCell>
          </TableRow>
          <TableRow head>
            <HeadCell>
              Multiple Breakdown
            </HeadCell>
            <HeadCell />
          </TableRow>
          <TableRow>
            <TableCell class='merge-b'>
              Alex Morgan
            </TableCell>
            <TableCell>
              Female
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell>
              Male
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell class='merge-b'>
              Colin Kaepernick
            </TableCell>
            <TableCell>
              Female
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell>
              Male
            </TableCell>
          </TableRow>
        </Table>
      </div>
      <div class='flex-grow'>
        <Table class='table-fixed w-full merge-l'>
          <template slot='head'>
            <TableRow head>
              <HeadCell>
                Support
              </HeadCell>
              <HeadCell>
                Mobilization
              </HeadCell>
            </TableRow>
          </template>
          <TableRow last>
            <TableCell chart>
              <BarChart v-bind='stats[0]'>
                Delta {{ stats[0].delta }}
              </BarChart>
            </TableCell>
            <TableCell chart>
              <BarChart v-bind='stats[1]' />
            </TableCell>
          </TableRow>
          <TableRow head>
            <HeadCell />
            <HeadCell />
          </TableRow>
          <TableRow>
            <TableCell chart>
              <BarChart v-bind='stats[0]' />
            </TableCell>
            <TableCell chart>
              <BarChart v-bind='stats[1]' />
            </TableCell>
          </TableRow>
          <TableRow last>
            <TableCell chart>
              <BarChart v-bind='stats[2]' />
            </TableCell>
            <TableCell chart>
              <BarChart v-bind='stats[1]' />
            </TableCell>
          </TableRow>
          <TableRow head>
            <HeadCell />
            <HeadCell />
          </TableRow>
          <TableRow>
            <TableCell chart>
              <BarChart v-bind='stats[0]' />
            </TableCell>
            <TableCell chart>
              <BarChart v-bind='stats[0]' />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell chart>
              <BarChart v-bind='stats[0]' />
            </TableCell>
            <TableCell chart>
              <BarChart v-bind='stats[0]' />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell chart>
              <BarChart v-bind='stats[0]' />
            </TableCell>
            <TableCell chart>
              <BarChart v-bind='stats[0]' />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell chart>
              <BarChart v-bind='stats[0]' />
            </TableCell>
            <TableCell chart>
              <BarChart v-bind='stats[0]' />
            </TableCell>
          </TableRow>
        </Table>
      </div>
    </div>
  </Index>
</template>

<script>
const sharedProps = { scale: 10, max: 10, min: 0 }
const stats = [{
  ...sharedProps,
  deltaLabel: '+44.2%',
  baselineLabel: '38.5%',
  baseline: 3.85,
  delta: 4.42,
  error: .9,
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
    const toggleOptions = ['Light Theme', 'Dark Theme']
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
      themeClass: '',
    }
  },
  watch: {
    selectedToggle(theme) {
      if (theme === 'Dark Theme') {
        this.themeClass = 'theme-dark-mode'
      } else {
        this.themeClass = ''
      }
    },
  },
}
</script>

<docs>
  ```jsx
  <div class='p-3 bg-light-6'>
    <div class='bg-light-4'>
      <Demo />
    </div>
  </div>
  ```
</docs>
