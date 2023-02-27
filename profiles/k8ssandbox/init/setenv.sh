#!/bin/bash
export NODE_PORT=8500
export APP_NAME=checkoutui
export NODE_ENV=release
export NODE_SUBENV=dockins
export INSTANCES=2
export MERGE="--merge-logs"
export APP_BASE="/myntra/$APP"
export ARTIFACT_PATH=index.js
export LOG_DIR="$APP_BASE/logs"
export CONFIG_PATH="$APP_BASE/conf/config.dockins.json"
export PM2_NODE_ARGS="--max-http-header-size=35000"
