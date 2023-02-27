#!/bin/bash

curDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source $curDir"/common.sh"

pm2 delete $app
echo stopped $app