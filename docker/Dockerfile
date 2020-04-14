FROM node:10.19.0-alpine

LABEL application="gysp/customer-frontend"
LABEL maintainer="Get your State Pension Team"
LABEL version="[ci]"
LABEL build_src="[ci]"

RUN apk add --update --no-cache stunnel && mv "$(command -v stunnel)" /usr/local/bin/

WORKDIR /opt/stunnel

COPY --chown=node:node docker/stunnel.conf /opt/stunnel/stunnel.conf

RUN apk add --update --no-cache tzdata
ENV TZ=Europe/London

RUN mkdir -p /home/node/customer-frontend

RUN chown -R node:node /home/node
RUN chown -R node:node /opt/stunnel

USER node

WORKDIR /home/node/customer-frontend

COPY --chown=node:node package*.json ./
COPY --chown=node:node . .

RUN npm ci
RUN npm run build

ENTRYPOINT ["/bin/sh", "./docker/init.sh"]

CMD [ "node", "server.js" ]