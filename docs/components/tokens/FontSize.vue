<template>
  <div class='font-sizes'>
    <template v-for='prop in tokens'>
      <div
        v-if='prop.category === "font-size"'
        :key='prop.name'
        :style='{ fontSize: prop.value }'
        class='font'
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
 * This typographic scale makes it easier to achieve visual harmony in the
 * interface. It’s purposefully designed to keep the number of separate font
 * sizes to a minimum. To edit font-sizes, see
 * [/src/tokens/font-size.yml](https://github.com/swayable/swayable-design-system/blob/master/src/tokens/font-size.yml).
 */
export default {
  name: 'FontSize',
  data() {
    return {
      tokens: this.orderData(designTokens.props),
    }
  },
  methods: {
    orderData: function(data) {
      let order = orderBy(data, 'value', 'desc')
      return order
    },
  },
}
</script>

<docs>
  ```jsx
  <FontSize/>
  ```
</docs>
