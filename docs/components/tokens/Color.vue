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
                <div class='font-semibold text-lg mb-2 capitalize text-blue-dark'>
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
