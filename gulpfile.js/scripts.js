/* eslint-disable import/no-extraneous-dependencies */
const { src, dest, parallel } = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rollup = require('gulp-better-rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

function scripts() {
  return src('app/assets/javascripts/**/*.js')
    .pipe(babel({
      presets: ['@babel/preset-env'],
    }))
    .pipe(uglify())
    .pipe(dest('public/javascripts'));
}

function hmrcFrontend() {
  return src('node_modules/hmrc-frontend/hmrc/components/timeout-dialog/timeout-dialog.js')
    .pipe(rollup({
      plugins: [
        babel(),
        resolve(),
        commonjs(),
      ],
    }, {
      name: 'TimeoutDialog',
      // Legacy mode is required for IE8 support
      legacy: true,
      // UMD allows the published bundle to work in CommonJS and in the browser.
      format: 'umd',
    }))
    .pipe(uglify())
    .pipe(dest('public/javascripts/vendor/hmrc-frontend'));
}

function shiv() {
  return src('node_modules/html5shiv/dist/html5shiv.js')
    .pipe(uglify())
    .pipe(dest('public/javascripts/vendor'));
}

exports.default = parallel(scripts, hmrcFrontend, shiv);
