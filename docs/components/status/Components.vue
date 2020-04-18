<template>
  <div class='components'>
    <h2 class='mt-15'>
      Controls
    </h2>

    <div class='mt-10'>
      <TextInput placeholder='Text Input' />
    </div>
    <div class='mt-10'>
      <TextInput
        type='textarea'
        placeholder='Text Area'
      />
    </div>

    <div class='mt-10'>
      <Button>Button</Button>
    </div>
    
    <div class='mt-10'>
      <Toggle
        :options='toggle.options'
        :selected='toggle.selected'
        @select='o => toggle.selected = o'
      />
    </div>

    <div class='mt-10'>
      <SelectSingle
        :options='single.options'
        :selected='single.selected'
        @select='o => single.selected = o'
      />
    </div>

    <div class='mt-10'>
      <SelectMultiple :options='multiple.options'>
        Multi-select
      </SelectMultiple>
    </div>
    
    <h2 class='mt-20'>
      Elements
    </h2>
    
    <div class='mt-10'>
      <Label>Label</Label>
    </div>

    <div class='mt-10'>
      <Icon
        name='tests'
        size='md'
      />
      <span class='ml-1'>Icon</span>
    </div>

    <div class='mt-10 bg-grey-light'>
      <BarChart
        :baseline='20'
        :delta='60'
        baseline-label='BarChart'
      />
    </div>

    <div class='mt-6'>
      <WordChart
        text='Wordchart Wordchart Wordchart Wordchart Wordchart Wordchart Wordchart Wordchart Wordchart Wordchart Wordchart is is is is is is is is the the the the the cool cool cool chart chart'
      />
    </div>

    <h2 class='mt-20'>
      Layout
    </h2>
    <div class='mt-10'>
      <NavBar :links='{ NavBar: { active: true }, and: {}, NavItem: {} }' />
    </div>
    <div class='mt-10'>
      <ToolBar class='bg-white'>
        <span>ToolBar</span>
      </ToolBar>
    </div>
    <div class='mt-10'>
      <Button
        primary
        @click='modal = true'
      >
        Open Modal
      </Button>
      
      <Modal
        :open='modal'
        @close='modal = false'
      >
        <p>
          Hey,
          <br>
          Thanks for checking out the modal.
        </p>
        <p class='text-right'>
          - Your friend
        </p>
      </Modal>
    </div>
    <div class='mt-10 mb-128'>
      <Table>
        <template slot='head'>
          <TableRow>
            <TableCell head>
              Table
            </TableCell>
            <TableCell head>
              Head
            </TableCell>
          </TableRow>
        </template>
        <TableRow>
          <TableCell>
            Table
          </TableCell>
          <TableCell>
            Contents
          </TableCell>
        </TableRow>
      </Table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Components',
  data() {
    const toggle = {
      options: ['Toggle', 'Boggle', 'Foggle'],
      selected: 'Toggle',
    }
    const single = {
      options: ['Single-select', 'Option 2', 'Option 3'],
      selected: 'Single-select',
    }
    const multiple = {
      options: [
        { value: 1, text: 'Option 1', selected: true },
        { value: 2, text: 'Option 2', selected: false },
        { value: 3, text: 'Option 3', selected: true },
      ],
    }
    return {
      toggle,
      single,
      multiple,
      modal: false,
    }
  },
}
</script>
,