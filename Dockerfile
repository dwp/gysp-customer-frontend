FROM node:10.16.0@sha256:29c9996eec44dae51ef74bf064985bb89c4e077bd224171facbe2f24bd7106b0
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

ADD certs/* ./certs/

# RUN npm install
RUN npm install -g nodemon
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8100
CMD [ "node", "server.js" ]