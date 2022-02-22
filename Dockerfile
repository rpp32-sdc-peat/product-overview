FROM node:^17.2.0

WORKDIR /code

ENV PORT 80

COPY package.json /code/package.json

RUN npm install

COPY . /code

CMD [ 'nodemon', 'server/index.js']