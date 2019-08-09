const _reduce = require('lodash/reduce')
const _filter = require('lodash/filter')

const designTokens = require('./src/assets/tokens/tokens.raw.json')

const sizeMap = {
  '-20': '-5rem',
  '-16': '-4rem',
  '-12': '-3rem',
  '-10': '-2.5rem',
  '-8': '-2rem',
  '-6': '-1.5rem',
  '-5': '-1.25rem',
  '-4': '-1rem',
  '-3': '-0.75rem',
  '-2': '-0.5rem',
  '-1': '-0.25rem',
  '1': '0.25rem',
  '2': '0.5rem',
  '3': '0.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '8': '2rem',
  '10': '2.5rem',
  '12': '3rem',
  '16': '4rem',
  '20': '5rem',
}

const colors = _reduce(
  _filter(designTokens.props, { type: 'color' }),
  (acc, color) => {
    acc[color.name.replace(/color_/g, '').replace(/_/g, '-')] = color.originalValue
    return acc
  },
  {},
)

module.exports = {
  important: true,
  theme: {
    fontFamily: {
      heading: designTokens.props.font_heading.originalValue,
      body: designTokens.props.font_text.originalValue,
      mono: designTokens.props.font_mono.originalValue,
    },
    extend: {
      minHeight: sizeMap,
      minWidth: sizeMap,
      inset: sizeMap,
      colors,
    },
  },
}
