<template>
  <div class='font-sizes'>
    <template v-for='(size, name, i) in tokens'>
      <div
        :key='name'
        :class='`font mt-5 p-2 ${(i%2 === 0 ? "bg-white" : "")}`'
      >
        <div class='flex text-xs'>
          <p class='flex-grow text-gray-600'>
            <code>.text-{{ name }}</code>
          </p>
          <p class='text-gray-600'>
            {{ size }}
          </p>
        </div>
        <p :class='`text-${name} truncate`'>
          How quickly daft jumping zebras vex!
        </p>
      </div>
    </template>
  </div>
</template>

<script>
import designTokens from '@/assets/tokens/tokens.raw.json'
import orderBy from 'lodash/orderBy'

/**
 * This is a reference to [Tailwindcss font sizes](https://tailwindcss.com/docs/font-size/).
 * 
 */
export default {
  name: 'FontSize',
  data() {
    return {
      tokens: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
    }
  },
}
</script>

<docs>
  ```jsx
  <FontSize/>
  ```
</docs>
