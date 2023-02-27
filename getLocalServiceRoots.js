process.stdin.on('data', function(data) {
  const service = JSON.parse(data);
  const clusterName = service.clusterName;
  const envVariables = service.envVariables;

  envVariables &&
    envVariables.split(',').map(envVar => {
      switch (envVar) {
        case 'LOCAL_KNUTH=TRUE':
          const KNUTH_ROOT =
            'https://' + clusterName + '-knuth.dockins.myntra.com/';
          console.log('KNUTH_ROOT=' + KNUTH_ROOT);
          break;
        case 'LOCAL_PPS=TRUE':
          const PPS_ROOT =
            'https://' + clusterName + '-pps.dockins.myntra.com/';
          console.log('PPS_ROOT=' + PPS_ROOT);
          break;
        case 'LOCAL_PLUTUS=TRUE':
          const PLUTUS_ROOT =
            'https://' + clusterName + '-plutus.dockins.myntra.com/';
          console.log('PLUTUS_ROOT=' + PLUTUS_ROOT);
          break;
        case 'RELEASE_BUILD=TRUE':
          console.log('RELEASE_BUILD=true');
          break;
      }
    });
});
