// https://github.com/michael-ciniawsky/postcss-load-config

const plugins = [
  require("postcss-import"),
  require("postcss-url"),
  // to edit target browsers: use "browserslist" field in package.json
  require("tailwindcss"),
  require("autoprefixer"),
]

if (process.env.NODE_ENV === "production") {
  const purgecss = require("@fullhuman/postcss-purgecss")({
    // Specify the paths to all of the template files in your project
    content: ["./src/**/*.vue"],

    // Include any special characters you're using in this regular expression
    defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || [],
  })

  // purgecss must be the last plugin
  plugins.push(purgecss)
}

module.exports = { plugins }
