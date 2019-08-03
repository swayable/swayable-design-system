import orderBy from 'lodash/orderBy'

class Token {
  constructor({ type, description, category, value, order, originalValue, name, tags = '' }) {
    Object.assign(this, { type, description, category, value, order, originalValue, name, tags })
    
    this.title = name.replace(/_/g, ' ')
    this.classSuffix = name.replace(/_/g, '-')
    if (this.tags) {
      this.meta = tags.split(',')
      this.bgClass = this.meta.includes('Dark') || this.name === 'light' ? 'bg-dark' : ''
    } else {
      this.meta = []
    }
  }

  static build(token) {
    return new Token(token)
  }

  static order(tokens) {
    return orderBy(tokens, ['order', 'category', 'name'])
  }
}

export default Token