import _orderBy from 'lodash/orderBy'

import designTokens from '@/assets/tokens/tokens.raw.json'

const orderedTokens = _orderBy(designTokens.props, ['order', 'category', 'name'])

export default {
  get colors() {
    const tokens = Object.values(orderedTokens)
    return tokens.filter(c => c.type === 'color')
  },
  
  get primaryColors() {
    return this.colors.filter(c => c.category === 'color-primary')
  },

  get secondaryColors() {
    return this.colors.filter(c => c.category === 'color-secondary')
  },
}