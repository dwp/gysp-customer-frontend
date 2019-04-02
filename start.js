const gulp = require('gulp');
const gulpFile = require('./gulpfile.js');
const awsPrivateIp = require('./awsPrivateIp');

process.env.SECURECOOKIES = false;
process.env.DATA_HOST = 'localhost';

if (process.env.CONFIG_LOCATION === undefined) {
  process.env.CONFIG_LOCATION = './';
}

if (process.env.STORE === undefined) {
  process.env.STORE = 'redis';
}

if (process.env.PORT === undefined) {
  process.env.PORT = '3001';
}

async function setIpAddresses() {
  if (process.env.CUSTOMERAPIGATEWAY === undefined || process.env.CUSTOMERAPIGATEWAY === '') {
    const kongIP = await awsPrivateIp.getEc2PrivateIp('gysp-dev-kong');
    process.env.CUSTOMERAPIHOST = kongIP;
    process.env.CUSTOMERAPIGATEWAY = `http://${kongIP}:8000/api`;
  }

  if (process.env.VERIFY_SERVICE_PROVIDER_HOST === undefined) {
    const customerServicesIP = await awsPrivateIp.getEc2PrivateIp('gysp-dev-customer-services');
    process.env.VERIFY_SERVICE_PROVIDER_HOST = `http://${customerServicesIP}:50401`;
  }
}

setIpAddresses().then(() => {
  gulp.series(gulpFile.default)(() => {});
  process.on('SIGINT', () => {
    process.kill(process.pid, 'SIGTERM');
    process.exit();
  });
});
