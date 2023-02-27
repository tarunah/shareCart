#!/bin/bash
servicesToBlockFile=/var/www/html/health/servicesToBlock.php
serviceName='checkoutui'

if [ -f $servicesToBlockFile ]
then
    echo "Bringing service - $serviceName - into LB"
    sed -i "s/^'$serviceName'/#'$serviceName'/g" $servicesToBlockFile
fi

