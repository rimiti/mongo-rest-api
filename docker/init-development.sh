#!/bin/sh

cd /api &&
rm -f /api/docker/initialization-done.lock &&
yarn --production=false &&
yarn build &&
touch /api/docker/initialization-done.lock &&
sleep 5 &&
mongorestore -h $API_MONGO_HOST -u $API_MONGO_USERNAME -p $API_MONGO_PASSWORD -d $API_MONGO_DATABASE ./mongo/dump/ --authenticationDatabase admin &&
rm -f /api/docker/initialization-done.lock &&
yarn build:watch
