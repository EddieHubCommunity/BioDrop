FROM node:18
LABEL org.opencontainers.image.source https://github.com/eddiehubcommunity/BioDrop

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install  --omit=dev --ignore-scripts
COPY . .

RUN sed -i 's/0.0.0/'`npm pkg get version | tr -d '"'`'/g' config/app.json

RUN --mount=type=secret,id=MONGO,target=./.env npm run build

CMD ["npm", "start"]
