<template>
  <div class='all-tokens'>
    <div class='flex font-heading text-dark p-2'>
      <div class='w-1/3'>
        Token Name
      </div>
      <div class='w-1/3'>
        Value
      </div>
      <div class='w-1/3'>
        Description
      </div>
    </div>
    <div
      v-for='(token, index) in tokens'
      :key='index'
      class='p-4 border-gray-600 border-t flex items-center token'
      :class='{
        [token.bgClass]: true,
        [`text-${token.classSuffix}`]: token.type === "color",
      }'
    >
      <div class='w-1/3'>
        <code>
          {{ token.name }}
        </code>
      </div>
      <div class='w-1/3 flex items-center'>
        <div
          v-if='token.type === "color"'
          :class='`p-3 inline-block bg-${token.classSuffix}`'
        />
        <code class='type ml-2'>{{ token.value }}</code>
      </div>
      <div class='w-1/3'>
        <p class='capitalize'>
          {{ token.category }}
        </p>
        <p class='text-sm'>
          {{ token.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import orderBy from 'lodash/orderBy'

import designTokens from '@/assets/tokens/tokens.raw.json'
import Token from '../../decorators/token'

/**
 * A list of available tokens in Swayable Design System. Use these tokens in place
 * of hard-coded values in order to maintain a scalable and consistent system.
 * To edit these tokens and add more, see
 * [/src/tokens/](https://github.com/swayable/swayable-design-system/blob/master/src/tokens).
 */
export default {
  name: 'All',
  data() {
    return {
      tokens: Token.order(designTokens.props).map(Token.build),
    }
  },
}
</script>

<docs>
  ```jsx
  <all/>
  ```
</docs>
