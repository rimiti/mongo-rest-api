#!/bin/sh

# If this locker file doesn't exist, we wait 1s.
while [ ! -f /api/docker/initialization-done.lock ]
do
  sleep 1
done
