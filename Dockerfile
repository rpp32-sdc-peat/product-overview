FROM node:^17.2.0

WORKDIR /app

ENV PORT 80

COPY package.json /app/package.json

RUN npm install

COPY . /app

CMD [ 'nodemon', 'server/index.js']