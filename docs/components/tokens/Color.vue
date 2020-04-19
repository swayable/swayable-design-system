<template>
  <div class='colors'>
    <div
      v-for='(colorGroup, groupName) in colors'
      :key='groupName'
    >
      <h2 class='mt-20 capitalize'>
        {{ groupName }} Colors
      </h2>
      <div class='flex flex-wrap -mx-8'>
        <div
          v-for='prop in colorGroup'
          :key='prop.name'
          class='py-4'
        >
          <ToolTip
            :delay='200'
          >
            <div class='color overflow-hidden text-center flex flex-col max-w-48 items-center justify-center'>
              <div
                :class='`bg-${prop.classSuffix}`'
                class='shadow rounded-full inline-block w-32 h-32 swatch flex items-center justify-center mx-8'
              >
                <div
                  class='capitalize font-semibold text-3xl'
                  :class='prop.name.includes("light") || prop.name.includes("white") ? "text-dark-2" : "text-white"'
                >
                  {{ prop.shortName }}
                </div>
              </div>
              <div class='px-6 pt-4'>
                <div class='text-center text-dark-4 text-xs mb-2'>
                  {{ prop.usage }}
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
                  {{ prop.value }}
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
import ToolTip from '../../../src/components/ToolTip'

/**
 * Blue is often used for links. The Swayable gradient is from Azure to Pink.
 */
export default {
  name: 'Color',
  components: {
    ToolTip,
  },
  computed: {
    colors() {
      const colors = tokens.colors.reduce((acc, color) => {
        const category = color.category.replace('color-', '').replace('-',  ' ')
        acc[category] = acc[category] || []
        acc[category].push(Token.build(color))
        return acc
      }, {})
      console.log(colors)
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
