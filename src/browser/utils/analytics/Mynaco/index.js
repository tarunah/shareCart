import get from 'lodash/get';

import getTemplateData from './payloadConfig';

const getMynacoPayload = ({
  mynacoV3Data,
  gaData,
  screen,
  type,
  event,
  category,
  action
}) => {
  const finalMynacoPayload = getTemplateData(event, {
    ...mynacoV3Data,
    type,
    screen,
    category,
    action
  });

  if (gaData) {
    const { eventType, ...rest } = gaData;
    finalMynacoPayload.type = finalMynacoPayload.type || eventType;

    for (const key in rest) {
      finalMynacoPayload[key] = finalMynacoPayload[key] || rest[key];
    }
    finalMynacoPayload.nonInteraction = null;
    finalMynacoPayload.url = null;
  }

  finalMynacoPayload.screenName = `Checkout-${screen}`;
  finalMynacoPayload.referer = {};

  return finalMynacoPayload;
};

const getAppsFlyerPayload = mynacoV3Data => {
  return get(mynacoV3Data, 'customEvents', {});
};

const getGenericMynacoData = ({
  mynacoV3Data,
  gaData,
  screen,
  type,
  event,
  category,
  action
}) => {
  const mynacoPayload = getMynacoPayload({
    mynacoV3Data,
    gaData,
    screen,
    type,
    event,
    category,
    action
  });
  const appsflyerPayload = getAppsFlyerPayload(mynacoV3Data);
  return { mynacoPayload, appsflyerPayload };
};

export default getGenericMynacoData;
