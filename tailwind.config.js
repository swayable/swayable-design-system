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

module.exports = {
  important: true,
  theme: {
    fontFamily: {
      heading: designTokens.props.font_heading,
      body: designTokens.props.font_text,
      mono: designTokens.props.font_mono,
    },
    extend: {
      minHeight: sizeMap,
      inset: sizeMap,
      colors: {
        brand: designTokens.props.brand,
        light: designTokens.props.light,
        lighter: designTokens.props.lighter,
        dark: designTokens.props.dark,
      },
    },
  },
}
