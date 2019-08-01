<template>
  <div class='flex flex-wrap bg-light'>
    <div
      v-for='prop in tokens'
      :key='prop.name'
      :class='`w-full lg:w-1/3  p-4 color ${prop.category}`'
    >
      <div class='max-w-sm rounded overflow-hidden shadow-lg'>
        <div
          :class='`bg-${prop.className} h-20`'
          alt='Sunset in the mountains'
        />
        <div class='px-6 pt-4'>
          <div class='font-bold text-lg mb-2 capitalize font-heading text-dark'>
            {{ prop.name }}
          </div>
          <p
            v-if='prop.description'
            class='text-base'
          >
            {{ prop.description }}
          </p>
          <p class='flex flex-wrap text-xs text-semibold mt-3'>
            <span class='w-1/2'>
              <code class='bg-gray-200'>
                ${{ prop.className }}
              </code>
            </span>
            <span class='w-1/2'>
              <code class='bg-gray-200'>
                .bg-{{ prop.className }}
              </code>
            </span>
            <span class='pt-1 w-1/2'>
              <code class='bg-gray-200'>
                .text-{{ prop.className }}
              </code>
            </span>
            <span class='pt-1 w-1/2'>
              <code class='bg-gray-200'>
                .border-{{ prop.className }}
              </code>
            </span>
          </p>
        </div>
        <div class='px-4 py-4'>
          <span
            v-for='tag in prop.tags'
            :key='tag'
            class='px-1'
          >
            <span
              class='inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700'
            >
              {{ tag }}
            </span>
          </span>
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
 * The colors found here are defined in Swayable Designs by Gabriel Winer. Their are two groups: **primary** and **secondary**.
 * 
 * Each standard color has two variants: **fade** for use on light background, and **burn** for dark backgrounds. Standard colors can be used on both light and dark backgrounds.
 *  
 * Because the Swayable Design System uses Tailwindcss, [their color palette](https://tailwindcss.com/docs/customizing-colors/#default-color-palette) is also available for use if necessary.
 * 
 * To edit the colors, see
 * [/src/tokens/color.yml](https://github.com/swayable/swayable-design-system/blob/master/src/tokens/color.yml).
 */
export default {
  name: 'Color',
  data() {
    const decorate = t => {
      if (t.decorated) return t
      const tags = t.tags ? t.tags.split(',') : []
      const className = t.name.replace(/_/g, '-')
      const name = t.name.replace(/_/g, ' ')

      t.tags = tags
      t.className = className
      t.name = name
      t.decorated = true

      return t
    }
    const filteredTokens = filter(designTokens.props, { type: 'color' })
    const decoratedTokens = colorTokens.map(decorate)
    const orderedTokens = orderBy(decoratedTokens, ['order', 'category', 'name'])
    
    return { colorTokens: orderedTokens }
  },
}
</script>

<docs>
  ```jsx
  <color/>
  ```
</docs>
