const _map = require('lodash/map')
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
  '1/2': '50%',
  '1/3': '33.3333%',
  '2/3': '66.6666%',
  '1/4': '25%',
  '3/4': '75%',
}

const colors = _reduce(
  _filter(designTokens.props, { type: 'color' }),
  (acc, color) => {
    acc[color.name.replace(/color_/g, '').replace(/_/g, '-')] = color.originalValue
    return acc
  },
  {},
)

const fontSize = _reduce(
  _filter(designTokens.props, { category: 'font-size' }),
  (acc, size) => ({ ...acc, [size.token]: size.originalValue }),
  {},
)

module.exports = {
  important: '#app',
  theme: {
    fontSize,
    fontFamily: {
      heading: designTokens.props.font_heading.originalValue,
      body: designTokens.props.font_text.originalValue,
      mono: designTokens.props.font_mono.originalValue,
    },
    extend: {
      minHeight: sizeMap,
      minWidth: sizeMap,
      maxHeight: sizeMap,
      maxWidth: sizeMap,
      inset: sizeMap,
      colors,
      boxShadow: {
        outline: `0 0 0 2px ${colors['blue-fade']}`,
      },
    },
    rotate: {
      '1/8': '45deg',
      '1/4': '90deg',
      '3/8': '135deg',
      '1/2': '180deg',
      '5/8': '225deg',
      '3/4': '270deg',
      '7/8': '315deg',
    },
  },
  plugins: [
    function({ addUtilities, config, e }) {
      const rotateUtilities = _map(config('theme.rotate'), (value, key) => {
        return {
          [`.${e(`rotate-${key}`)}`]: {
            transform: `rotate(${value})`,
          },
        }
      })

      addUtilities(rotateUtilities)
    },
  ],
}
