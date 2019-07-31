<template>
  <div class='flex flex-wrap bg-gray-100'>
    <div
      v-for='prop in tokens'
      :key='prop.name'
      :class='`w-1/3 p-8 color ${prop.category}`'
    >
      <div class='max-w-sm rounded overflow-hidden shadow-lg'>
        <div
          :class='`w-full h-20 border-b border-gray-200 swatch bg-${prop.className}`'
        />
        <div class='p-4 pt-2'>
          <div class='flex'>
            <span class='flex-grow capitalize font-bold text-lg'>
              {{ prop.name }}
            </span>
            <span>
              <p class='bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700'>
                {{ prop.category }}
              </p>
            </span>
          </div>
          <div class='flex text-gray-700 text-xs mt-1'>
            <div class='w-1/2'>
              <p>
                ${{ prop.className }}
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
                .bg-{{ prop.className }}
              </p>
              <p>
                .text-{{ prop.className }}
              </p>
              <p>
                .border-{{ prop.className }}
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
    const decorate = t => {
      t.className =  t.name.replace(/_/g, '-')
      t.category = t.category.replace(/color_/g, '')
      return t
    }
    const tokens = orderBy(
      filter(designTokens.props, { type: 'color' }).map(decorate),
      ['order', 'category', 'name'],
      'asc',
    )
    return { tokens }
  },
}
</script>

<docs>
  ```jsx
  <color/>
  ```
</docs>
