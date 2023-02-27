#!/bin/sh

curDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source ~/.bashrc
log_dir=${curDir}/logs
source $curDir"/common.sh"

if [ ! -d "$log_dir" ]; then
  echo "Directory ${log_dir} does not exist. Trying to create..."
  mkdir -p ${log_dir}
fi

sudo cp ./ops/config/filebeat.yml /etc/filebeat/filebeat.yml
sudo service filebeat start

NODE_PORT=$port DEBUG='' \
pm2 kill
cd /home/deploy
pm2 ls
pm2 start ${curDir}/index.js -f -n $app -i $instances $merge -e ${curDir}/logs/pm2-$app-err.log -o ${curDir}/logs/pm2-$app-out.log  --node-args="--max-http-header-size=35000"


echo started $app port:$port env:$NODE_ENV subenv: $NODE_SUBENV
exit 0
