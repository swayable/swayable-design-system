<template>
  <div class='colors'>
    <div
      v-for='(colorGroup, groupName) in colors'
      :key='groupName'
    >
      <Heading
        type='h3'
        class='mt-5'
      >
        {{ groupName }}
      </Heading>
      <div class='flex flex-wrap -mx-8'>
        <div
          v-for='prop in colorGroup'
          :key='prop.name'
          :class='`p-8`'
        >
          <ToolTip
            :delay='200'
          >
            <div class='color overflow-hidden text-center'>
              <div
                :class='`bg-${prop.classSuffix} shadow rounded-full inline-block p-16 swatch`'
              />
              <div class='px-6 pt-4'>
                <div class='font-semibold text-lg mb-2 capitalize font-heading text-blue-dark'>
                  {{ prop.title }}
                </div>
              </div>
            </div>
            <template #tip>
              <div class='font-mono font-normal text-center'>
                <p>
                  .bg-{{ prop.classSuffix }}
                </p>
                <p>
                  .text-{{ prop.classSuffix }}
                </p>
                <p>
                  .border-{{ prop.classSuffix }}
                </p>
                <p>
                  $color-{{ prop.classSuffix }}
                </p>
                <p>
                  {{ prop.originalValue }}
                </p>
              </div>
            </template>
          </ToolTip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _filter from 'lodash/filter'
import Token from '../../decorators/token'
import tokens from '../../../src/utils/tokens'
import ToolTip from '../../../src/patterns/ToolTip'
import Heading from '../../../src/elements/Heading'

/**
 * The colors found here are defined in [Swayable Designs by Gabriel Winer](https://www.figma.com/file/enhdfkmMOUqVOJHO7KrA14/Design-System?node-id=0%3A1).
 */
export default {
  name: 'Color',
  components: {
    ToolTip,
    Heading,
  },
  computed: {
    colors() {
      const colors = {}
      colors['Primary'] = tokens.primaryColors.map(Token.build)
      colors['Secondary'] = tokens.secondaryColors.map(Token.build)
      colors['Basic'] = tokens.basicColors.map(Token.build)
      return colors
    },
  },
}
</script>

<docs>
  ```jsx
  <color/>
  ```
</docs>
