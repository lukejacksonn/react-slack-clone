// import preroll from 'preroll'

// If rollup was called with the watch flag
// const dev = !!process.env.ROLLUP_WATCH
//
// export default {
//   input: 'src/index.js',
//   output: {
//     file: 'static/index.js',
//     sourcemap: dev ? 'inline' : false,
//     format: 'iife',
//   },
//   plugins: [
//     ...preroll(dev),
//     // Add other rollup plugins here...
//   ],
// }

// Scripts
var buble = require('rollup-plugin-buble')
var commonjs = require('rollup-plugin-commonjs')
var resolve = require('rollup-plugin-node-resolve')
var uglify = require('rollup-plugin-uglify')
var serve = require('rollup-plugin-serve')
var livereload = require('rollup-plugin-livereload')
// Styles
var postcssModules = require('postcss-modules')
var postcss = require('rollup-plugin-postcss')
var nested = require('postcss-nested')
var cssnano = require('cssnano')
var autoprefixer = require('autoprefixer')

var cssExportMap = {}

const dev = !!process.env.ROLLUP_WATCH

export default {
  input: 'src/index.js',
  output: {
    file: 'static/index.js',
    sourcemap: dev ? 'inline' : false,
    format: 'iife',
  },
  plugins: [
    postcss({
      plugins: [
        nested(),
        postcssModules({
          getJSON(id, exportTokens) {
            cssExportMap[id] = exportTokens
          },
        }),
      ].concat(dev ? [] : [autoprefixer('last 2 versions'), cssnano()]),
      getExportNamed: false,
      getExport(id) {
        return cssExportMap[id]
      },
    }),
    buble({ jsx: 'h' }),
    resolve({ jsnext: true }),
    commonjs(),
    !dev && uglify(),
    dev && livereload('static'),
    dev &&
      serve({
        contentBase: ['static'],
        historyApiFallback: true,
        port: 8080,
      }),
  ],
}
