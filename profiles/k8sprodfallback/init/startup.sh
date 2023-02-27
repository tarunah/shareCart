#!/bin/sh

. /myntra/$APP/bin/setenv.sh
cd $APP_BASE

if [ ! -d $LOG_DIR ]; then
  echo "Directory $LOG_DIR does not exist. Trying to create..."
  mkdir -p ${LOG_DIR}
fi

tar xzf $APP_BASE/_nm.tgz
sleep 5
pm2 kill
pm2 start $ARTIFACT_PATH -f -n $APP_NAME -i $INSTANCES $MERGE -e "$LOG_DIR/pm2-$APP_NAME-err.log" -o "$LOG_DIR/pm2-$APP_NAME-out.log"  --node-args=$PM2_NODE_ARGS

echo "k8s prodfallback started $APP_NAME port:$NODE_PORT env:$NODE_ENV"
