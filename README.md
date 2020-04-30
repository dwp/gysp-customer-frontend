# Get your State Pension Frontend
[![Build Status](https://travis-ci.org/dwp/gysp-customer-frontend.svg?branch=master)](https://travis-ci.org/dwp/gysp-customer-frontend) [![Known Vulnerabilities](https://snyk.io/test/github/dwp/gysp-customer-frontend/badge.svg)](https://snyk.io/test/github/dwp/gysp-customer-frontend)

Frontend service for Get your State Pension.

### Requirements

* Docker 18.0.0+
* Docker compose 1.23.0+

#### Config

Use to provided `.env.example` file and create your own `.env` file and complete the config.

### Running Locally

#### Running

```
make up
```

This will now be available at at your configered URL, default is: `http://localhost:3001`.

#### Stopping

To stop the app running, in the terminal window press `CTRL` + `C`.

### Running in DEV/TEST

There are various system variables that need to be set for the application to run correctly in different environments, most have some form of default.

### Testing

#### Requirements

* Node.JS 10.16.0+
* npm v6.4.1+

There is a few options for testing within the application, these have been configured on jenkins. Testing uses [mocha](https://github.com/mochajs/mocha), [supertest](https://github.com/visionmedia/supertest)/[superagent](https://github.com/visionmedia/superagent), [chai](https://github.com/chaijs/chai) and [istanbul](https://gotwarlost.github.io/istanbul/).

Setup:
```
npm install
```

Unit tests:
```
npm run test
```

Code coverage:
```
npm run test-coverage
```