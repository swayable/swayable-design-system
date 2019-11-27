// https://github.com/michael-ciniawsky/postcss-load-config

const plugins = [
  require("postcss-import"),
  require("postcss-url"),
  require("tailwindcss"),
  require("autoprefixer"),
  require('postcss-color-mod-function'),
]

module.exports = { plugins }
