#!/bin/sh
currentDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
app=checkoutui
port=$NODE_PORT
instances=max
merge=""

if [ -z "$port" ]; then
    port='8500'
fi

if [ -z "$NODE_ENV" ]; then
    NODE_ENV="development"
fi

if [ "$NODE_ENV" == "development" ]; then
    instances=2
    merge="--merge-logs"
fi

if [ "$NODE_ENV" == "test" ]; then
    instances=2
fi

if [ "$NODE_SUBENV" != "" ]; then
    app=$app"-"$NODE_SUBENV
fi

if [ "$NODE_ENV" == "production" ]; then
    merge="--merge-logs"
    export NEW_RELIC_HOME="$currentDir/src/config"
    export NEW_RELIC_ENABLE_CHECKOUT_NEW=TRUE
fi
