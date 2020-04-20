const _map = require('lodash/map')
const _reduce = require('lodash/reduce')
const _filter = require('lodash/filter')

const designTokens = require('./src/assets/tokens/tokens.raw.json')

const spacing = {
  '7': '1.75rem',
  '9': '2.3rem',
  '14': '3.5rem',
  '15': '3.75rem',
  '16': '4rem',
  '128': '32rem',
  '256': '64rem',
  '1/2': '50%',
  '1/3': '33.3333%',
  '2/3': '66.6666%',
  '1/4': '25%',
  '1/5': '20%',
  '3/4': '75%',
}

const colors = _reduce(
  _filter(designTokens.props, { type: 'color' }),
  (acc, color) => {
    acc[color.name.replace(/color_/g, '').replace(/_/g, '-')] = color.originalValue
    return acc
  },
  { transparent: 'rgba(0,0,0,0)' },
)

const fontSize = _reduce(
  _filter(designTokens.props, { category: 'font-size' }),
  (acc, size) => ({ ...acc, [size.token]: size.originalValue }),
  {},
)

module.exports = {
  important: true,
  theme: {
    fontSize,
    fontFamily: {
      mono: ['Inter', 'monospace'],
      sans: ['Inter', 'sans-serif'],
    },
    colors,
    extend: {
      opacity: {
        '10': '0.1',
      },
      spacing,
      maxWidth: theme => ({
        ...theme('spacing'),
        ...spacing,
      }),
      maxHeight: theme => ({
        ...theme('spacing'),
        ...spacing,
      }),
      minHeight: theme => ({
        ...theme('spacing'),
        ...spacing,
      }),
      minWidth: theme => ({
        ...theme('spacing'),
        ...spacing,
        'screen-sm': '640px',
        'screen-md': '1024px',
        'screen-lg': '1280px',
      }),
      zIndex: {
        '999': '999',
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
    require('@tailwindcss/ui'),
  ],
}
