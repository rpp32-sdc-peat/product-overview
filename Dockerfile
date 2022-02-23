FROM node:17-alpine

WORKDIR /app

ENV PORT 80

COPY package.json package-lock.json ./

RUN npm ci install

COPY . /app

CMD [ "nodemon", "server/index.js"]