stageKnuthRoot='https://knuth.stage.myntra.com/'
stagePPSRoot="https://pps.stage.myntra.com/"
stagePlutusRoot="https://plutus.stage.myntra.com/"

localServiceConfig=$(echo ${SERVICE} | node getLocalServiceRoots.js)
for config in ${localServiceConfig}
do
  IFS='=' read -r -a array <<< "$config"
  service=${array[0]}
  root=${array[1]}

  case $service in
    "KNUTH_ROOT")
      echo "Updating API_CLIENT_ROOT from" ${stageKnuthRoot} "to" ${root}
      sed -i "s|${stageKnuthRoot}|${root}|g" ./src/config/config.dockins.json
      ;;
    "PPS_ROOT")
      echo "Updating PPS_CLIENT_ROOT from" ${stagePPSRoot} "to" ${root}
      sed -i "s|${stagePPSRoot}|${root}|g" ./src/config/config.dockins.json
      ;;
    "PLUTUS_ROOT")
      echo "Updating PLUTUS_CLIENT_ROOT from" ${stagePlutusRoot} "to" ${root}
      sed -i "s|${stagePlutusRoot}|${root}|g" ./src/config/config.dockins.json
      ;;
    "RELEASE_BUILD")
      echo "Enablling SENTRY_PUSH for release"
      sed -i "s|const SENTRY_PUSH = false;|const SENTRY_PUSH = true;|g" ./webpack.prod.js
      ;;
  esac
done
