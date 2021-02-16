const { src, dest, parallel } = require('gulp');
const uglify = require('gulp-uglify');

function scripts() {
  return src('app/assets/javascripts/**/*.js')
    .pipe(uglify())
    .pipe(dest('public/javascripts'));
}

function shiv() {
  return src('node_modules/html5shiv/dist/html5shiv.js')
    .pipe(uglify())
    .pipe(dest('public/javascripts/vendor'));
}

exports.default = parallel(scripts, shiv);
