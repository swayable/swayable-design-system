import _orderBy from 'lodash/orderBy'

import designTokens from '@/assets/tokens/tokens.raw.json'

const tokens = _orderBy(designTokens.props, ['order', 'category', 'name'])

export default {
  get colors() {
    const colors = Object.values(tokens)
    const primaryColors = colors.filter(c => c.category === 'color-primary')
    const fadeColors = colors.filter(c => c.category === 'color-primary')
    return colors.filter(c => c.type === 'color')
  },
  
  get primaryColors() {
    return this.colors.filter(c => c.category === 'color-primary')
  },

  get secondaryColors() {
    return this.colors.filter(c => c.category === 'color-secondary')
  },
}