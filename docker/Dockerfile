FROM node:12.22.5-alpine3.11@sha256:372e5cc17da5baedf302643c3bb54283dac990942fc816d9f7c12565e89c3265

LABEL application="gysp/customer-frontend"
LABEL maintainer="Get your State Pension Team"
LABEL version="[ci]"

ARG APP_FOLDER=/home/node/customer-frontend/
ARG STUNNEL_FOLDER=/opt/stunnel/
ARG HARDEN_FOLDER=/opt/harden/

# Need to use internal package repository for apks
# hadolint ignore=DL3018
RUN sed -i "s|http://dl-cdn.alpinelinux.org|https://nexus.nonprod.dwpcloud.uk/repository|" /etc/apk/repositories &&\
  apk add --no-cache tzdata curl

# Default ENV
ENV TZ=Europe/London
ENV PORT=3001
ENV CONTEXT_PATH=/

# Set up stunnel for use with Redis
# hadolint ignore=DL3018
RUN apk add --update --no-cache stunnel && mv "$(command -v stunnel)" /usr/local/bin/

WORKDIR ${STUNNEL_FOLDER}
COPY --chown=node:node docker/stunnel.conf ${STUNNEL_FOLDER}stunnel.conf

HEALTHCHECK --interval=30s --timeout=2s --start-period=30s  \
  CMD curl -fk $(if [ "$USE_TLS" = "true" ]; then echo "https"; else echo "http"; fi)://localhost:${PORT}${CONTEXT_PATH}actuator/health || exit 1

RUN mkdir -p ${APP_FOLDER}

# remove root user privilidge
RUN chown -R node:node ${APP_FOLDER} &&\
  chown -R node:node ${STUNNEL_FOLDER}

USER node

WORKDIR ${APP_FOLDER}
COPY --chown=node:node package*.json ./
COPY --chown=node:node . .

RUN npm ci &&\
  npm run build &&\
  npm prune --production

USER root

WORKDIR ${HARDEN_FOLDER}

# Download and verify hardening script
ADD https://raw.githubusercontent.com/dwp/packer-infrastructure/master/docker-builder/scripts/base/harden.sh harden.sh
COPY docker/harden.sh.md5 .
RUN md5sum -c harden.sh.md5

# hadolint ignore=DL3059
RUN chmod +x ${HARDEN_FOLDER}harden.sh && sh ${HARDEN_FOLDER}harden.sh && rm ${HARDEN_FOLDER}harden.sh

USER node

WORKDIR ${APP_FOLDER}

ENTRYPOINT ["/bin/sh", "./docker/init.sh"]

CMD [ "node", "server.js" ]