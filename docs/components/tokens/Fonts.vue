<template>
  <div class='fonts'>
    <div
      v-for='prop in fontTypes'
      :key='prop.name'
      :style='{ fontFamily: prop.value }'
    >
      <h2 v-if='prop.name.includes("heading")'>
        ${{ prop.name.replace(/_/g, "-") }}
      </h2>
      <p v-else>
        ${{ prop.name.replace(/_/g, "-") }}
      </p>
      <code>{{ prop.value }}</code>
    </div>
    <br>
    <div
      v-for='prop in fontWeights'
      :key='prop.name'
      :style='{ fontWeight: prop.value }'
    >
      ${{ prop.name.replace(/_/g, "-") }} <span>({{ prop.value }})</span>
    </div>
  </div>
</template>

<script>
import designTokens from '@/assets/tokens/tokens.raw.json'
import orderBy from 'lodash/orderBy'

export default {
  name: 'Fonts',
  data() {
    return {
      tokens: this.orderData(designTokens.props),
    }
  },
  computed: {
    fontTokens() {
      return this.tokens.filter(token => token.category === 'font')
    },

    fontWeights() {
      return this.fontTokens.filter(token => token.name.startsWith('weight_'))
    },

    fontTypes() {
      return this.fontTokens.filter(token => token.name.startsWith('font_'))
    },
  },
  methods: {
    orderData: function(data) {
      let order = orderBy(data, 'value', 'desc')
      return order
    },
  },
}
</script>

<style lang="scss" scoped>
@import "../../docs.tokens.scss";

/* STYLES
--------------------------------------------- */

.fonts {
  margin-top: $space-l;
  overflow: hidden;
  width: 100%;
}
</style>

<docs>
  ```jsx
  <Fonts/>
  ```
</docs>
