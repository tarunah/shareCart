import Madalytics from 'madalytics-web';
import { isPhonePeWebView } from 'commonBrowserUtils/Helper';

const settings = {
  url: 'https://touch.myntra.com/track-web',
  storage: window.localStorage,
  variant: 'checkout',
  clientId: 'lzZNMYGoPkQVWOGL3wg81DLeJ4arpd',
  debug: false,
  batchMaxDuration: 2000
};

const options = isPhonePeWebView()
  ? {
      app: {
        name: 'phonepe-webview'
      }
    }
  : {};

// Initialize MA
export const configure = (updateSettings = {}) => {
  const finalSettings = { ...settings, ...updateSettings };
  Madalytics.configure(finalSettings, options);
};

configure();

export const setPageContext = name =>
  Madalytics.setPageContext({ name, url: window.location.pathname });

/*
 * Send event function.
 * data format: { data_set, type, variant }
 */
const sendEvent = ({
  event,
  data,
  custom,
  rootParams = {},
  immediate = false
}) => Madalytics.send(event, data, custom, rootParams, immediate);

/**
 * Send all the events in one go
 */
export const flushEvents = () => {
  Madalytics.flush();
};

export default sendEvent;
