FROM node:18
LABEL org.opencontainers.image.source https://github.com/eddiehubcommunity/BioDrop
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci  --omit=dev --ignore-scripts
COPY . .

RUN npm run build

CMD ["npm", "start"]
