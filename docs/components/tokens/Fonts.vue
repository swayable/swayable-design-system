<template>
  <div class='fonts'>
    <div
      v-for='prop in fontTypes'
      :key='prop.name'
      :class='`mt-2 font font-${prop.class}`'
    >
      <div :class='`flex flex-wrap flex-1 mt-2 -mx-2 font-${prop.class}`'>
        <div
          v-for='weight in prop.weights'
          :key='weight.weight'
          :class='`p-2 flex-grow font-weight font-${weight.class}`'
        >
          <div class='max-w-sm rounded overflow-hidden shadow-lg bg-grey-lighter h-full'>
            <p class='flex border-b p-2 text-black'>
              <span class='flex-grow capitalize'>
                {{ prop.value.split(',')[0].replace(/"/g, '') }}
              </span>
              <span>{{ weight.weight }}</span>
            </p>

            <p class='text-sm m-2 text-black'>
              The five boxing wizards jump quickly.
            </p>
            <p class='m-2 mb-4'>
              <code class='bg-grey-light'>
                .font-{{ prop.class }}
              </code>
              <code class='bg-grey-light'>
                .font-{{ weight.class }}
              </code>
            </p>
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
