const nodemon = require('gulp-nodemon'); // eslint-disable-line import/no-extraneous-dependencies

function watchNodemon(cb) {
  let started = false;
  return nodemon({
    script: 'server.js',
    nodeArgs: '--inspect=0.0.0.0:9229',
    ext: 'js, json, yaml, html',
    ignore: ['node_modules/', 'app/assets/', 'public/'],
  }).on('start', () => {
    if (!started) {
      cb();
      started = true;
    }
  });
}

exports.default = watchNodemon;
