<template>
  <div class='colors'>
    <input
      v-model='filter'
      placeholder='Search colors'
    >
    <div class='flex flex-wrap -mx-4'>
      <div
        v-for='prop in filteredColorTokens'
        :key='prop.name'
        :class='`p-4 color ${prop.category}`'
      >
        <div class='max-w-sm rounded overflow-hidden shadow-lg bg-gray-100'>
          <div
            :class='`bg-${prop.classSuffix} p-20 swatch`'
          />
          <div class='px-6 pt-4'>
            <div class='font-bold text-lg mb-2 capitalize font-heading text-dark'>
              {{ prop.title }}
            </div>
            <p
              v-if='prop.description'
              class='text-black'
            >
              {{ prop.description }}
            </p>
            <p class='flex flex-wrap text-xs text-semibold mt-3'>
              <span class='w-1/2'>
                <code class='bg-gray-200'>
                  $color-{{ prop.classSuffix }}
                </code>
              </span>
              <span class='w-1/2'>
                <code class='bg-gray-200'>
                  .bg-{{ prop.classSuffix }}
                </code>
              </span>
              <span class='pt-1 w-1/2'>
                <code class='bg-gray-200'>
                  .text-{{ prop.classSuffix }}
                </code>
              </span>
              <span class='pt-1 w-1/2'>
                <code class='bg-gray-200'>
                  .border-{{ prop.classSuffix }}
                </code>
              </span>
            </p>
          </div>
          <div class='px-4 py-4'>
            <span
              v-for='tag in prop.meta'
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
  </div>
</template>

<script>
import _filter from 'lodash/filter'

import designTokens from '@/assets/tokens/tokens.raw.json'
import Token from '../../decorators/token'

/**
 * The colors found here are defined in Swayable Designs by Gabriel Winer. There are two groups: **primary** and **secondary**.
 *
 * Each standard color has two variants: **fade** for use on light background, and **burn** for dark backgrounds. Standard colors can be used on both light and dark backgrounds.
 *
 */
export default {
  name: 'Color',
  data() {
    const filteredTokens = _filter(designTokens.props, { type: 'color' })
    const decoratedTokens = filteredTokens.map(Token.build)
    const orderedTokens = Token.order(decoratedTokens)
    return { colorTokens: orderedTokens, filter: '' }
  },
  computed: {
    filteredColorTokens() {
      if (this.filter.length === 0) return this.colorTokens
      return _filter(this.colorTokens, token => token.matches(this.filter))
    },
  },
}
</script>

<docs>
  ```jsx
  <color/>
  ```
</docs>
