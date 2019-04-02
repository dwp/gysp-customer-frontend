const { src, dest } = require('gulp');
const uglify = require('gulp-uglify');

function scripts() {
  return src('app/assets/javascripts/**/*.js')
    .pipe(uglify())
    .pipe(dest('public/javascripts'));
}

exports.default = scripts;
