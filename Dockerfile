FROM node:10.16.3@sha256:900d982334a1c4218eab398f8728e89e882311c6d457e9e512fa594ed85366c0
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

ADD certs/* ./certs/

# Bundle app source
COPY . .

EXPOSE 8100
CMD [ "node", "server.js" ]