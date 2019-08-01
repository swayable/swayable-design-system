<template>
  <div class='fonts'>
    <div
      v-for='prop in fontTypes'
      :key='prop.name'
      :class='`mt-8 border border-dark rounded font-${prop.class}`'
    >
      <div class='p-4 flex items-center'>
        <h2 class='text-xl capitalize flex-grow'>
          {{ prop.value.split(',')[0].replace(/"/g, '') }}
        </h2>
        <code>.font-{{ prop.class }}</code>
      </div>
      <div :class='`p-4 bg-dark text-light font-${prop.class}`'>
        <div
          v-for='weight in prop.weights'
          :key='weight.weight'
          :class='`flex font-${weight.class}`'
        >
          <div class='w-1/4'>
            <code>.font-{{ weight.class }}</code>
          </div>
          <div class='w-1/4'>
            {{ weight.weight }}
          </div>
          <div class='w-1/2 truncate text-right'>
            The five boxing wizards jump quickly.
          </div>
        </div>
      </div>
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
      weightMap: {
        '100': 'hairline',
        '200': 'thin',
        '300': 'light',
        '400': 'normal',
        '500': 'medium',
        '600': 'semibold',
        '700': 'bold',
        '800': 'extrabold',
        '900': 'black',
      },
    }
  },
  computed: {
    fontTokens() {
      return this.tokens.filter(token => token.category === 'font').reverse()
    },

    fontTypes() {
      const buildWeights = token => {
        if (!token.weights || typeof token.weights !== 'string') return token
        token.weights = token.weights.split(',').map(weight => ({
          weight, class: this.weightMap[weight],
        }))
        return token
      }

      return this.fontTokens
        .filter(token => token.name.startsWith('font_'))
        .map(buildWeights)
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

<docs>
  ```jsx
  <Fonts/>
  ```
</docs>
