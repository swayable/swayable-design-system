<template>
  <div class='font-sizes'>
    <template v-for='token in tokens'>
      <div
        :key='token.name'
        :class='`font mt-5 p-2`'
      >
        <div class='flex items-center'>
          <p>
            <code>.text-{{ token.name }}</code>
          </p>
          <p class='text-grey-darker ml-2 text-sm'>
            {{ token.size }}
          </p>
        </div>
        <p :class='`text-${token.name} truncate`'>
          How quickly daft jumping zebras vex!
        </p>
      </div>
    </template>
  </div>
</template>

<script>
import designTokens from '@/assets/tokens/tokens.raw.json'
import _filter from 'lodash/fp/filter'
import _map from 'lodash/fp/map'
import _orderBy from 'lodash/fp/orderBy'
import _flow from 'lodash/fp/flow'

const tokens = _flow(
  _filter(x => x.category === 'font-size'),
  _map(x => ({ name: x.token, size: x.originalValue })),
  _orderBy(x => parseFloat(x.size), 'asc')
)(designTokens.props)

/**
 * This is a reference to [Tailwindcss font sizes](https://tailwindcss.com/docs/font-size/).
 *
 */
export default {
  name: 'FontSize',
  data() {
    return { tokens }
  },
}
</script>

<docs>
  ```jsx
  <FontSize/>
  ```
</docs>
