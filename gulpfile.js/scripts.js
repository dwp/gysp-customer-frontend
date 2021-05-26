/* eslint-disable import/no-extraneous-dependencies */
const { src, dest, parallel } = require('gulp');
const uglify = require('gulp-uglify');
const rollup = require('gulp-better-rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

function vendorScripts() {
  return src('app/assets/javascripts/vendor/**/*.js')
    .pipe(uglify())
    .pipe(dest('public/javascripts/vendor'));
}

function scripts() {
  return src('app/assets/javascripts/*.js')
    .pipe(rollup({
      plugins: [
        resolve(),
        commonjs(),
        babel({
          exclude: 'node_modules/**',
        }),
      ],
    }, {
      // Legacy mode is required for IE8 support
      legacy: true,
      // UMD allows the published bundle to work in CommonJS and in the browser.
      format: 'umd',
    }))
    .pipe(uglify())
    .pipe(dest('public/javascripts'));
}


function shiv() {
  return src('node_modules/html5shiv/dist/html5shiv.js')
    .pipe(uglify())
    .pipe(dest('public/javascripts/vendor'));
}

exports.default = parallel(vendorScripts, scripts, shiv);
