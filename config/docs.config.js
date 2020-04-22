const path = require('path')
const baseConfig = require('../build/webpack.base.conf.js')
const merge = require('webpack-merge')
const packageConfig = require('../package.json')
const chalk = require('chalk')

module.exports = {
  /**
   * Name of your design system. Changes both page title and sidebar logo.
   */
  title: 'Swayable Design System',
  /**
   * Most of the styles are defined in /docs/docs.styles.scss
   */
  version: packageConfig.version,
  theme: {
    maxWidth: '100%',
    sidebarWidth: 240,
    fontFamily: {
      base: '"Inter",sans-serif',
      mono: '"Inter",sans-serif',
      title: '"Inter",sans-serif',
    },
  },
  renderRootJsx: path.join(__dirname, '../docs/components/Preview.js'),
  /**
   * Define a custom code highlighting theme.
   */
  editorConfig: {
    theme: 'night',
  },
  codeSplit: true,
  simpleEditor: false,
  /**
   * Path to static assets directory
   */
  assetsDir: path.join(__dirname, '../src/assets'),
  /**
   * Enabling the below option will break things in Swayable Design System!
   */
  skipComponentsWithoutExample: false,
  /**
   * We’re defining below JS and SCSS requires for the documentation.
   */
  require: [
    path.join(__dirname, '../docs/docs.helper.js'),
    path.join(__dirname, '../docs/docs.styles.scss'),
  ],
  /**
   * Enabling the following option splits sections into separate views.
   */
  pagePerSection: true,
  components: '../src/components/**/*/.vue',
  sections: [
    {
      name: 'Getting Started',
      content: '../docs/getting-started.md',
      components: '../docs/components/Components.vue',
      sectionDepth: 1,
      exampleMode: 'hide',
      usageMode: 'hide',
    },
    {
      name: 'Design Principles',
      content: '../docs/principles.md',
      sectionDepth: 1,
      exampleMode: 'hide',
      usageMode: 'hide',
    },
    {
      name: 'Design Tokens',
      content: '../docs/tokens.md',
      sectionDepth: 1,
      exampleMode: 'hide',
      usageMode: 'hide',
      components: '../docs/components/Color.vue',
    },
    {
      name: 'Utility Classes',
      content: '../docs/utilities.md',
      sectionDepth: 1,
      exampleMode: 'hide',
      usageMode: 'hide',
      components: '../docs/components/Utilities.vue',
    },
    {
      name: 'Component Library',
      content: '../docs/components.md',
      components: '../src/components/**/[A-Z]*.vue',
      exampleMode: 'expand',
      usageMode: 'expand',
      sectionDepth: 2,
    },
    {
      name: 'Templates',
      content: '../docs/templates.md',
      components: '../src/templates/**/[A-Z]*.vue',
      exampleMode: 'hide',
      usageMode: 'hide',
      sectionDepth: 2,
    },
  ],
  /**
   * Custom wrapper template for the documentation.
   */
  template: {
    title: 'Example — Swayable Design System',
    lang: 'en',
    trimWhitespace: true,
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0',
        },
        {
          name: 'format-detection',
          content: 'telephone=no',
        },
      ],
    },
  },
  /**
   * Ignore app.vue, tests, and example component.
   */
  ignore: [
    '**/App.vue',
    '**/__tests__/**',
    '**/*.test.js',
    '**/*.test.jsx',
    '**/*.spec.js',
    '**/*.spec.jsx',
    '**/ExampleComponent.vue',
  ],
  webpackConfig: merge(baseConfig, {
    module: {
      rules: [
        {
          test: /\.(css?|scss|sass)(\?.*)?$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader',
            {
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  path.join(__dirname, '../src/assets/tokens/tokens.scss'),
                  path.join(__dirname, '../src/assets/tokens/tokens.map.scss'),
                  path.join(__dirname, '../src/styles/styles.scss'),
                ],
              },
            },
          ],
        },
      ],
    },
  }),
  styleguideDir: '../dist/docs',
  printServerInstructions() {},
  printBuildInstructions(config) {
    console.log(chalk.cyan('\n  Design System Docs build finished succesfully!\n'))
    console.log(
      chalk.yellow(
        '  Tip: You can now deploy the docs as a static website.\n' +
          '  Copy the build files from ' +
          `${config.styleguideDir}\n`
      )
    )
  },
  /**
   * Configure docs server to redirect asset queries
   */
  // configureServer(app) {
  //   // `app` is the instance of the express server running the docs
  //   app.get("/assets/:file", (req, res) => {
  //     res.redirect(req.params.file)
  //   })
  // },
}
