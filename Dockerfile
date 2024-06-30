ARG NODE_VERSION=20

FROM node:${NODE_VERSION}
LABEL org.opencontainers.image.source https://github.com/eddiehubcommunity/biodrop

WORKDIR /usr/src/app

COPY . .

RUN npm ci

EXPOSE 3000

CMD npm run build && npm run start
