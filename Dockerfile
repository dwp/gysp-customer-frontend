FROM node:10.17.0@sha256:93e9a9283f0e2ead937a8f77a2c72b18f80005c10b57b4f1cfd40d2b3aa6595f
# Create app directory
WORKDIR /usr/src/app

ENV PORT=8100
ENV SECRET=thisIsASecret
ENV SESSION_STORE=redis
ENV SESSION_NAME=sessionID
ENV SESSION_SECRET=secret
ENV SESSION_TIMEOUT=1200000
ENV SESSION_SECURE_COOKIES=false

ENV KEY_SERVICE_API_GATEWAY=http://host.docker.internal:8082
ENV KEY_SERVICE_API_KEY=U2FsdGVkX1/D5EN8vd/E8Cf8yArx8trlyIdFpzLGlDs=
ENV CLAIM_SERVICE_API_GATEWAY=http://host.docker.internal:8085
ENV CLAIM_SERVICE_API_KEY=U2FsdGVkX1/D5EN8vd/E8Cf8yArx8trlyIdFpzLGlDs=
ENV CUSTOMER_SERVICE_API_GATEWAY=http://host.docker.internal:8083
ENV CUSTOMER_SERVICE_API_KEY=U2FsdGVkX1/D5EN8vd/E8Cf8yArx8trlyIdFpzLGlDs=

ENV LOG_LEVEL=error
ENV LOG_PATH=logs
ENV LOG_SIZE=10240k
ENV LOG_BACKUPS=10
ENV LOG_ROTATE=daily

ENV FEATURE_BANK=true
ENV FEATURE_DATE_CONFIRMATION=true
ENV FEATURE_VERIFY=true
ENV FEATURE_LANGUAGE=true

ENV REDIS_HOST=host.docker.internal
ENV REDIS_PORT=6379
ENV REDIS_PREFIX=spa
ENV REDIS_PASSWORD=password

ENV VERIFY_SERVICE_PROVIDER_HOST=http://example.com

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install

# ADD certs/* ./certs/

# Bundle app source
COPY . .

EXPOSE 8100
CMD [ "node", "server.js" ]