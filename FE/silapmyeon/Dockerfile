FROM node:18.16.1

RUN npm install -g serve

RUN mkdir ./build
ADD ./build ./build

ENTRYPOINT [ "serve", "-s", "build" ]