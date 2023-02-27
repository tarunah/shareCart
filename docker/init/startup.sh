#!/bin/bash
. /myntra/$APP/bin/setenv.sh
cd /myntra/$APP
time tar xzf /myntra/$APP/_nm.tgz
pm2 start $ARTIFACT_PATH -f -n $NAME -i max -e logs/pm2-$APP-err.log -o logs/pm2-$APP-out.log