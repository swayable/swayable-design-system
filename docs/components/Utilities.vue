<template>
  <div class='utilities'>
    <div
      v-for='(utilities, group) in utilityClasses'
      :key='group'
    >
      <h2 class='mt-20 uppercase'>
        {{ group }}
      </h2>
      <Table class='w-full table-fixed'>
        <template slot='head'>
          <TableRow class='w-full'>
            <TableCell head>
              Utility Class
            </TableCell>

            <TableCell head>
              Light Theme / Suggested Use
            </TableCell>

            <TableCell head>
              Dark Theme / Effect
            </TableCell>
          </TableRow>
        </template>

        <template v-for='(description, utility) in utilities'>
          <TableRow
            :key='utility'
            class='w-full'
          >
            <TableCell class='text-md text-secondary'>
              <div class='overflow-hidden truncate'>
                {{ `.${group}-${utility}` }}
              </div>
            </TableCell>

            <TableCell flush>
              <div class='flex items-center h-full overflow-hidden w-full'>
                <div class='flex-grow'>
                  <div
                    class='m-2'
                    :class='
                      `${group === "border" ? "border px-1": "px-3 py-1.5"} ${group}-${utility}`
                    '
                    :title='description[0]'
                  >
                    {{ description[0] }}
                  </div>
                </div>
              </div>
            </TableCell>
            
            <TableCell flush>
              <div class='theme-dark-mode flex items-center h-full overflow-hidden w-full'>
                <div class='flex-grow'>
                  <div
                    class='m-2'
                    :class='
                      `${group === "border" ? "border px-1": "px-3 py-1.5"} ${group}-${utility}`
                    '
                    :title='description[1]'
                  >
                    {{ description[1] }}
                  </div>
                </div>
              </div>
            </TableCell>
          </TableRow>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Utilities',
  data() {
    return {
      utilityClasses: {
        typography: {
          '1': ['Banner', 'Size, Weight, Line height'],
          '2': ['Title', 'Size, Weight, Line height'],
          '3': ['Subtitle', 'Size, Weight, Line height'],
          '4': ['Large text', 'Size, Weight, Line height'],
          '5': ['Default text', 'Size, Weight, Line height'],
          '6': ['Field hint', 'Size, Weight, Line height'],
          '7': ['Field title', 'Size, Weight, Line height'],
          '8': ['Description', 'Size, Weight, Line height'],
        },
        text: {
          primary: ['Most text will be this color', 'Text color'],
          secondary: ['Better against some alt background colors', 'Text color'],
          tertiary: ['Additional information', 'Text color'],
          quarternary: ['Meta, etc.', 'Text color'],
          disabled: ['Indicates something unavailable.', 'Text color'],
        },
        bg: {
          container: ['Page background', 'Background color'],
          card: ['Bounding box of related items', 'Background color'],
          'action-card': ['For interactive cards', 'Background color'],
          'card-sub': ['Subsections of cards (additional information)', 'Background color'],
          'disabled': ['Indicates unavailable action', 'Background color'],
          active: ['Action items', 'Background and font color'],
          'active': ['Indicates an item is active', 'Background and font color'],
          'action': ['Indicates an action is possible', 'Background and font color'],
          'destructive': ['Destructive action items (e.g. delete)', 'Background and font color'],
          'inherit': ['Inherits the parent background', 'Background color'],
        },
        border: {
          default: ['Default border color', 'Stroke color'],
        },
      },
    }
  },
}
</script>

<docs>
  ```jsx
  <utilities/>
  ```
</docs>
