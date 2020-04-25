<template>
  <nav class='flex flex-col sm:flex-row max-w-full mx-auto px-3 sm:px-5 py-2'>
    <div class='flex flex-grow'>
      <slot />
    </div>
    <div class='flex mt-2 sm:mt-0'>
      <slot name='right' />
    </div>
  </nav>
</template>

<script>
import tokens from '@/utils/tokens'

const START_RGB = tokens.getColorRGB('pink')
const END_RGB = tokens.getColorRGB('azure')

import { directive as onClickaway } from 'vue-clickaway'

/**
 * Used to control viewstate (sits under the navbar)
 * */
export default {
  name: 'ToolBar',
}
</script>

<docs>
  ```jsx

  const options = ['Delta', 'Engagement']
  const selected = options[0]
  <div class='mb-64 transition-colors ease-in-out'>
    <ToolBar>
       <SelectMultiple
        :options='[
          { value: 1, text: "Mobilization", selected: true },
          { value: 2, text: "Support", selected: false },
        ]'
      >
        <Icon name='metric' size='sm' />
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
        <Icon name='segment' size='sm' />
        Segments
      </SelectMultiple>
      
      <template slot='right'>
        <Toggle
          :options='options'
          :selected='selected'
          @select='o => selected = o'
        />
      </template>
    </ToolBar>
  </div>
  ```
</docs>
