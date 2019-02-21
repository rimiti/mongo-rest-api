FROM node:10-alpine

MAINTAINER Dimitri DO BAIRRO <dimitri.dobairro@dimsolution.com>

ENV \
  NODE_ENV="development" \
  API_REDIS_HOST="redis" \
  API_REDIS_PORT="6379" \
  API_PORT="3000" \
  API_MONGO_HOST="mongo" \
  API_MONGO_PORT="27017" \
  API_MONGO_USERNAME="root" \
  API_MONGO_PASSWORD="password" \
  API_MONGO_DATABASE="api" \
  API_PASSWORD_SALT="5fypt5910qdea2zoeo86hgyp3" \
  API_PASSWORD_TYPE="sha256" \
  API_PASSWORD_DIGEST="hex" \
  API_JWT_SECRET="lkjD1vn5sdlkjfvnsdfjvoizp32F" \
  API_JWT_EXPIRATION="1d" \
  API_JWT_ALGORITHM="HS256"

RUN mkdir -p /api

WORKDIR /api

COPY . ./

RUN apk add mongodb-tools

RUN yarn

RUN yarn build

EXPOSE 3000
