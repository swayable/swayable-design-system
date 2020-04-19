import orderBy from 'lodash/orderBy'
import tinycolor from 'tinycolor2'


class Token {
  constructor(args) {
    Object.assign(this, args)
    
    this.title = args.name.replace(/color|_/g, ' ')
    this.classSuffix = args.name.replace(/color_/g, '').replace(/_/g, '-')
  }

  matches(valueToFind) {
    return this.allInfo.includes(valueToFind)
  }

  get allInfo() {
    return `${this.name} ${this.tags} ${this.classSuffix} ${this.description} ${this.originalValue} ${this.value} ${this.category}`
  }

  get shortName() {
    return this.title.split(' ').map(s => s[0]).join('')
  }

  static build(token) {
    return new Token(token)
  }

  static order(tokens) {
    return orderBy(tokens, ['order', 'category', 'name'])
  }
}

export default Token