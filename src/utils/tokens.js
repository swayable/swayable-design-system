import _orderBy from 'lodash/orderBy'
import _map from 'lodash/map'

import designTokens from '@/assets/tokens/tokens.raw.json'

const orderedTokens = _orderBy( designTokens.props, ['order', 'category', 'name'])

const Tokens = {
  getColor(colorName) {
    return this.colors.find(c => c.name === `color_${colorName}`)
  },

  getColorRGB(colorName) {
    const { value } = this.getColor(colorName)
    return value
      .replace('rgb(', '')
      .replace(')', '')
      .split(',')
  },

  get colors() {
    const tokens = Object.values(orderedTokens)
    return tokens.filter(t => t.type === 'color')
  },

  get primaryColors() {
    return this.colors.filter(c => c.category === 'color-primary')
      .concat(this.colors.filter(c => c.category === 'color-secondary'))
  },
}

export default Tokens