FROM node:16
LABEL org.opencontainers.image.source https://github.com/eddiehubcommunity/LinkFree

WORKDIR /usr/src/app

COPY package*.json ./
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; then npm install --ignore-scripts; else npm install  --omit=dev --ignore-scripts; fi
COPY . .

RUN sed -i 's/0.0.0/'`npm pkg get version | tr -d '"'`'/g' config/app.json

RUN npm run build

CMD ["npm", "start"]
