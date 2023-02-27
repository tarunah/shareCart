#!/bin/bash
export NODE_PORT=8500
export APP_NAME=checkoutui
export NODE_ENV=production
export INSTANCES=8
export MERGE="--merge-logs"
export APP_BASE="/myntra/$APP"
export ARTIFACT_PATH=index.js
export LOG_DIR="$APP_BASE/logs"
export CONFIG_PATH="$APP_BASE/conf/config.production.json"
export NEW_RELIC_HOME="$APP_BASE/conf"
export NEW_RELIC_ENABLE_CHECKOUT_NEW=TRUE
export PM2_NODE_ARGS="--max-http-header-size=35000"
