FROM node:14-alpine

COPY . /app
WORKDIR /app

RUN yarn
CMD yarn start
