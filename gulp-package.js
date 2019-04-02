const path = require('path');
const { src, dest, series } = require('gulp');
const tar = require('gulp-tar');
const rename = require('gulp-rename');
const fs = require('fs');
const pomParser = require('pom-parser');

function renamePackage(cb) {
  pomParser.parse({ filePath: path.join(__dirname, '/pom.xml') }, (err, result) => {
    if (err) {
      process.stdout.write(`\n${err}\n`);
      process.exit(1);
    }

    const artifactId = result.pomObject.project.artifactid;
    const { version } = result.pomObject.project;

    fs.rename('target/build.tar', `target/${artifactId}-${version}.tar`, () => {
      if (err) {
        throw err;
      }
    });
  });
  cb();
}

function build() {
  return src([
    'node_modules/**/*',
    'public/**/*',
    'config/**',
    'bin/**',
    'app/**',
    'lib/**',
    'locales/**',
    'logs',
    '*.js',
    '!gulpfile.js/**',
    '!start.js',
    '!awsPrivateIp.js',
    '!gulpfile.js',
    '!gulp-package.js',
    '!config/application.yaml',
    '!node_modules/gulp*{,/**/*}',
  ], { base: './' })
    .pipe(rename((path) => { // eslint-disable-line no-shadow
      path.dirname = `customer-frontend/${path.dirname}`; // eslint-disable-line no-param-reassign
    }))
    .pipe(tar('build.tar'))
    .pipe(dest('target'));
}

exports.default = series(build, renamePackage);
