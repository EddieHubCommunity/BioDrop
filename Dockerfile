FROM node:16
LABEL org.opencontainers.image.source https://github.com/eddiehubcommunity/LinkFree

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --omit=dev --ignore-scripts
COPY . .

RUN sed -i 's/0.0.0/'`npm pkg get version | tr -d '"'`'/g' config/app.json
RUN sed -i 's/http:\/\/localhost:3000/https:\/\/linkfree.eddiehub.io/g' config/app.json

RUN npm run build

CMD ["npm", "start"]
