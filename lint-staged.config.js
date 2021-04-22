module.exports = {
  '**/*.js': ['npm run compliance:lint'],
  'package.json': ['npm run security:outdated', 'npm run security:audit'],
  // function format prevents passing the changed file path as an argument to the command
  // if the file path is passed, the docker command throws an error
  'docker/Dockerfile': () => 'npm run compliance:lint-docker',
};
