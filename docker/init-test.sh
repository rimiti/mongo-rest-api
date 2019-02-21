#!/bin/sh

cd /api &&
yarn &&
yarn build &&
mongorestore -h $API_MONGO_HOST -u $API_MONGO_USERNAME -p $API_MONGO_PASSWORD -d $API_MONGO_DATABASE ./mongo/dump/ --authenticationDatabase admin
