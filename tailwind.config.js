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
  theme: {
    fontFamily: {
      heading: '"azo-sans-web",sans-serif',
      body: '"roboto",sans-serif',
      mono: '"roboto-mono",monospace',
    },
    extend: {
      minHeight: sizeMap,
      inset: sizeMap,
      colors: {
        blue: {
          '900': '#233341',
        },
        gray: {
          '100': '#E9EAEB',
          '200': '#D4D6D9',
          '300': '#BDC1C5',
          '400': '#A8ADB3',
          '500': '#92999F',
          '600': '#7D858C',
          '700': '#677079',
          '800': '#515C66',
          '900': '#3B4753',
        },
      },
    },
  },
}
