/*
  Ga file is already being initialized in the m-shell

  Usage:
  1. sending an Event:
    data = {
      eventType: 'event',
      category: 'Cart',
      action: 'Checkout-cart', // accept any string that is being passed as an action
      label: 'newCart'
    }
  ga(data);

  2. Sending PageView Event:
    data = {
      eventType: 'pageView'
    }
  ga(data);

  ~ PRAMOD M G
*/

import { getDeviceType } from 'commonBrowserUtils/Helper';

let gaInitialized = false;

/**
 * Initilize the GA
 */
const initializeGa = () => {
  if (!gaInitialized) {
    gaInitialized = true;
    ga('set', 'dimension57', getDeviceType());
  }
};

const gaUtil = data => {
  if (!data) return;
  if (typeof data === 'string') {
    data = JSON.parse(data) || {};
  }
  initializeGa();
  if (data.eventType === 'event') {
    sendEvent(data);
  } else if (data.eventType === 'pageView') {
    sendPageView(data);
  } else if (data.eventType === 'ec') {
    sendECEvent(data);
  }
};

const sendEvent = data => {
  if (typeof ga !== 'undefined') {
    ga('send', 'event', data.category, data.action, data.label);
  }
};

const sendPageView = data => {
  if (typeof ga !== 'undefined') {
    ga('send', 'pageview');
  }
};

const sendECEvent = data => {
  if (typeof ga !== 'undefined') {
    ga('require', 'ec');
    ga('set', '&cu', 'INR');
    if (data.category) {
      ga(`ec:${data.name}`, data.category, data.data);
    } else {
      ga(`ec:${data.name}`, data.data);
    }
  }
};

export default gaUtil;
