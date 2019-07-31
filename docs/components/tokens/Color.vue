<template>
  <div class='flex flex-wrap bg-gray-100'>
    <div
      v-for='prop in tokens'
      :key='prop.name'
      :class='prop.category'
      class='w-1/3 p-8 '
    >
      <div class='max-w-sm rounded overflow-hidden shadow-lg'>
        <div
          class='w-full h-20 border-b border-gray-200'
          :style='{ backgroundColor: prop.value }'
        />
        <div class='p-4 pt-2'>
          <div class='flex'>
            <span class='flex-grow capitalize font-bold text-lg'>
              {{ prop.name.replace(/_/g, " ").replace(/color/g, "").replace(/primary/g, "").replace(/secondary/g, "") }}
            </span>
            <span>
              <p class='bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700'>
                {{ prop.category.replace(/color_/g, "") }}
              </p>
            </span>
          </div>
          <div class='flex text-gray-700 text-xs mt-1'>
            <div class='w-1/2'>
              <p>
                ${{ prop.name.replace(/_/g, "-") }}
              </p>
              <p class='lowercase'>
                {{ prop.originalValue }}
              </p>
              <p>
                {{ prop.value }}
              </p>
            </div>
            <div class='w-1/2 text-right mr-2'>
              <p>
                .bg-{{ prop.name.replace(/_/g, "-") }}
              </p>
              <p>
                .text-{{ prop.name.replace(/_/g, "-") }}
              </p>
              <p>
                .border-{{ prop.name.replace(/_/g, "-") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import designTokens from '@/assets/tokens/tokens.raw.json'
import orderBy from 'lodash/orderBy'
import filter from 'lodash/filter'

/**
 * These hues should be used purposefully to communicate how things function in the
 * interface.
 * 
 * * Colors in the `theme` category are from Swayable designs
 * * Colors marked `tailwindcss` are from [Tailwindcss](https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js)
 * 
 * To edit the colors, see
 * [/src/tokens/color.yml](https://github.com/swayable/swayable-design-system/blob/master/src/tokens/color.yml).
 */
export default {
  name: 'Color',
  data() {
    return {
      tokens: orderBy(
        filter(designTokens.props, { type: 'color' }),
        ['order', 'category', 'name'],
        'asc',
      ),
    }
  },
}
</script>

<docs>
  ```jsx
  <color/>
  ```
</docs>
