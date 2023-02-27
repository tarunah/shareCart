import React from 'react';
import Loader from 'commonComp/Loader';
import Loadable from 'commonComp/Loadable';

import { errorNotification } from 'commonBrowserUtils/Helper';
import Strings from 'commonBrowserUtils/Strings';

function loadComponent({
  loader,
  loading,
  errorCallback,
  loaderProperties = {}
}) {
  const { show = false, backdrop = false } = loaderProperties;
  return Loadable({
    loader,
    loading:
      loading ||
      ((props = {}) => <Loader show={show} backdrop={backdrop} {...props} />),
    errorCallback:
      errorCallback ||
      (() => errorNotification({ message: Strings.BUNDLE_LOAD_ERROR }))
  });
}

export default loadComponent;
