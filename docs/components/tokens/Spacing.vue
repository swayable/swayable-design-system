<template>
  <div class='spacing'>
    <template v-for='prop in tokens'>
      <div
        v-if='prop.category === "space"'
        :key='prop.name'
        :style='{ lineHeight: prop.value, height: prop.value }'
        class='space'
      >
        ${{ prop.name.replace(/_/g, "-") }} <span>({{ prop.value }})</span>
      </div>
    </template>
  </div>
</template>

<script>
import designTokens from '@/assets/tokens/tokens.raw.json'
import orderBy from 'lodash/orderBy'

/**
 * A framework for creating a predictable and harmonious spacing system. These
 * tokens are used for padding, margins, and position together with
 * [spacing utilities](https://github.com/swayable/swayable-design-system/wiki/spacing).
 * To edit spacing, see
 * [/src/tokens/spacing.yml](https://github.com/swayable/swayable-design-system/blob/master/src/tokens/spacing.yml).
 */
export default {
  name: 'Spacing',
  data() {
    return {
      tokens: this.orderData(designTokens.props),
    }
  },
  methods: {
    orderData: function(data) {
      let order = orderBy(data, 'category', 'asc')
      return order
    },
  },
}
</script>

<docs>
  ```jsx
  <spacing/>
  ```
</docs>
