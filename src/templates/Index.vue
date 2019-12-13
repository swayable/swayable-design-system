<template>
  <component
    :is='element'
    class='min-h-screen page font-body'
  >
    <header>
      <NavBar primary>
        <NavGroup class='flex-grow'>
          <NavLogo href='#' />
        </NavGroup>
        <NavGroup>
          <NavItem href='#'>
            <span class='flex items-center'>
              <Icon name='tests' />
              <span class='ml-2 flex'>Tests</span>
            </span>
          </NavItem>
          <NavItem href='#'>
            <span class='flex items-center'>
              <Icon name='library' />
              <span class='ml-2 flex'>Library</span>
            </span>
          </NavItem>
          <NavDrop>
            <span class='truncate max-w-16 sm:max-w-full'>Organization</span>
            <template #dropdown>
              <NavItem href='#'>
                Profile
              </NavItem>
              <NavItem href='#'>
                Settings
              </NavItem>
              <hr class='border-t m-0'>
              <NavItem href='#'>
                Logout
              </NavItem>
            </template>
          </NavDrop>
        </NavGroup>
      </NavBar>
      <NavBar>
        <NavGroup class='flex-grow'>
          <NavDrop align='left'>
            <Heading type='h3'>
              Project Title
            </Heading>
            <template #dropdown>
              <NavItem href='#'>
                Project 2
              </NavItem>
              <NavItem href='#'>
                Project 3
              </NavItem>
            </template>
          </NavDrop>
        </NavGroup>
        <NavGroup class='sm:hidden'>
          <NavItem>
            <SelectSingle
              primary
              title='Quantitative'
              :options='[
                "Qualitative",
                "2D Quantitative",
              ]'
            />
          </NavItem>
        </NavGroup>
        <NavGroup class='hidden sm:flex'>
          <NavItem
            class='pt-1 text-base'
            href='#'
          >
            Content
          </NavItem>
          <NavItem
            class='pt-1 text-base'
            href='#'
          >
            Survey
          </NavItem>
          <NavItem
            class='pt-1 text-base'
            href='#'
            active
          >
            Results
          </NavItem>
        </NavGroup>
      </NavBar>
      <NavBar class='h-14'>
        <NavGroup class='flex-grow'>
          <NavItem class='hidden sm:flex'>
            <SelectSingle
              primary
              title='Quantitative'
              :options='[
                "Qualitative",
                "2D Quantitative",
              ]'
            />
          </NavItem>
          <NavItem
            flush
            class='ml-2'
          >
            <SelectMultiple
              title='Metrics'
              :options='[
                "Support",
                "Mobilization",
              ]'
            />
          </NavItem>
          <NavItem
            flush
            class='ml-1'
          >
            <SelectMultiple
              title='Content'
              :options='[
                "Video",
                "Image",
              ]'
            />
          </NavItem>
          <NavItem
            flush
            class='ml-1'
          >
            <SelectMultiple
              title='Segments'
              :options='[
                "18-44",
                "44+",
              ]'
            />
          </NavItem>
          <NavItem
            class='ml-2 hidden sm:flex'
            flush
          >
            <ButtonGroup>
              <Button
                class='h-9 px-3 flex border-r-0'
                size='xs'
              >
                <Icon
                  name='bar-equal'
                  class='text-blue-dark'
                />
              </Button>
              <span class='w-px border-t border-b py-2 border-grey flex items-stretch'>
                <span class='w-px border-r border-grey inline-block' />
              </span>
              <Button
                class='h-9 px-3 flex'
                size='xs'
              >
                <Icon
                  name='bar-float'
                  class='text-grey'
                />
              </Button>
            </ButtonGroup>
          </NavItem>
          <NavItem
            class='ml-2 hidden sm:flex'
            flush
          >
            <ButtonGroup>
              <Button
                class='h-9 px-3 flex border-r-0'
                size='xs'
              >
                <Icon
                  name='bar-equal'
                  class='text-blue-dark'
                />
              </Button>
              <span class='w-px border-t border-b py-2 border-grey flex items-stretch'>
                <span class='w-px border-r border-grey inline-block' />
              </span>
              <Button
                class='h-9 px-3 flex'
                size='xs'
              >
                <Icon
                  name='bar-distribute'
                  class='text-grey'
                />
              </Button>
            </ButtonGroup>
          </NavItem>
        </NavGroup>
        <NavGroup class='hidden sm:flex'>
          <NavItem flush>
            <Button
              class='h-9'
              size='sm'
            >
              <Icon
                name='download'
                class='text-grey-darker mt-px'
                size='md'
              />
            </Button>
          </NavItem>
          <NavItem
            flush
            class='ml-2'
          >
            <Label class='flex items-center justify-center h-9'>
              <Icon
                name='respondents'
                class='text-grey-darker'
                size='md'
              />
              <span class='ml-1 font-mono text-base'>2907</span>
            </Label>
          </NavItem>
        </NavGroup>
      </NavBar>
    </header>
    <article class='p-4 md:p-6 w-full overflow-x-scroll'>
      <section>
        <Table class='min-w-screen-sm'>
          <template slot='head'>
            <TableRow>
              <TableCell head>
                <Heading
                  type='h5'
                  class='text-blue-dark'
                >
                  Single
                </Heading>
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
              <Heading
                type='h5'
                class='text-blue-dark mt-5'
              >
                Breakdown
              </Heading>
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
              <Heading
                type='h5'
                class='text-blue-dark mt-5'
              >
                Multiple Breakdown
              </Heading>
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
      </section>
    </article>
  </component>
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
  name: 'Index',
  metaInfo: {
    title: 'Swayable Design System',
    htmlAttrs: {
      lang: 'en',
    },
  },
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
    return {
      stats,
    }
  },
}
</script>

<docs>
  ```jsx
  <Index />
  ```
</docs>
