# Get your State Pension Frontend
[![Build Status](https://travis-ci.org/dwp/gysp-customer-frontend.svg?branch=master)](https://travis-ci.org/dwp/gysp-customer-frontend) [![Known Vulnerabilities](https://snyk.io/test/github/dwp/gysp-customer-frontend/badge.svg)](https://snyk.io/test/github/dwp/gysp-customer-frontend)

Frontend service for Get your State Pension.

### Requirements

* Docker 18.0.0+
* Docker compose 1.23.0+

### Running Locally

#### Config

##### Automatically
Running the below script assumes you are using a Secure Engineering MacBook device and have installed AWS credentials as the default profile in `~/.aws/credentials`.

```
./init/start.sh
```

##### Manually

Create a file called `.env` with the following values, replacing the placeholders with your AWS credentials.

```
AWS_ACCESS_KEY_ID=YOUR_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=YOUR_SECRET_ACCESS_KEY
```

To change the base Kong URL add this option to your `.env` file, making sure you postfix with `/api`.

```
CUSTOMER_API_GATEWAY=http://yourapi.local/api
```

For other config options see `config` folder for various env settings.

#### Running

```
docker-compose up
```

This will now be available at `http://localhost:3001`.

#### Stopping

To stop the app running, in the terminal window press `CTRL` + `C`.

### Running in DEV/QA

There are various system variables that need to be set for the application to run correctly in different environments, most have some form of default.

#### Config

Configuration is now done via the yaml.js file in the config folder. There is an example application.yaml for running locally.

- CONFIG_LOCATION is a env var that can be changed to load in a yaml in a different location.

### Testing

#### Requirements

* Node.JS 10.15.1+
* npm v6.4.1+
* Aws credentials setup locally

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

Integration tests:
```
npm run test-it
```

Code linting using [ESLint](https://github.com/eslint/eslint):
```
npm run lint
```

Sass liniting using [sass-lint](https://www.npmjs.com/package/sass-lint):
```
gulp sasslint
```

### Building a tar

This will give a clean build of the project with only needed files. It can be ran from the www/bin file or the server.js via node.

```
npm install

npm test

npm run build

npm prune --production

npm run package
```

Artifact will now be available in `target/X.X.X-SNAPSHOT-customer-frontend.tar` (where X.X.X will be the version from the pom.xml)
