import getStatsdMiddleware from 'commonUtils/statsd';
import RequestManager from 'commonUtils/RequestManager';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
class BrowserStatsdClient {
  constructor() {
    this.browserPrefix = 'cli.';
    this.delimiter = '--';
    this.counterObject = {};
    this.statsdData = [];
    this.maximumSavedEvents = 10;
    this.currentEventCount = 0;
    this.statsDEnabled = null;
    this.statsDConfig = {};
    this.apiStatsDList = {};
    this.apiLevelStatsDEnabled = true;
    const pushIntervalTime = 5 * 60 * 1000;

    this.intervalId = window.setInterval(
      this.pushStatsToServer,
      pushIntervalTime
    );

    [
      'increment',
      'timing',
      'clearBuffer',
      'pushStatsToServer',
      'cleanUp',
      'configureBrowserStatsd',
      'isAPIStatsDEnabled'
    ].forEach(method => (this[method] = this[method].bind(this)));
  }

  configureBrowserStatsd(maximumSavedEvents, pushIntervalTimeInSeconds) {
    //Initialize statsD config from switch
    if (isEmpty(this.statsDConfig)) {
      this.statsDConfig = getKVPairValue('STATSD_CONFIG');
      this.apiLevelStatsDEnabled = get(
        this.statsDConfig,
        'apiLevelStatsDEnabled',
        true
      );
      //Keeping an array to store whether for that api we can push the data
      const urlPathMap = get(this.statsDConfig, 'urlPathMap') || [];
      urlPathMap.map(obj => (this.apiStatsDList[obj.path] = null));
    }
    this.maximumSavedEvents = maximumSavedEvents
      ? maximumSavedEvents
      : this.maximumSavedEvents;

    if (pushIntervalTimeInSeconds) {
      window.clearInterval(this.intervalId);
      this.intervalId = window.setInterval(
        this.pushStatsToServer,
        pushIntervalTimeInSeconds * 1000
      );
    }
  }

  isStatsDEnabled() {
    if (this.statsDEnabled === null) {
      const { samplingProbability, featureEnabled } = getKVPairValue(
        'STATSD_CONFIG'
      );

      this.statsDEnabled =
        Math.random() <= samplingProbability && featureEnabled;
    }
    return this.statsDEnabled;
  }

  increment(path, count = 1) {
    const prefixedPath = this.browserPrefix + path;
    if (prefixedPath in this.counterObject) {
      this.counterObject[prefixedPath] += count;
    } else {
      this.counterObject[prefixedPath] = count;
    }
    this.currentEventCount++;
    this.currentEventCount >= this.maximumSavedEvents &&
      this.pushStatsToServer();
  }

  timing(path, timer) {
    const prefixedPath = this.browserPrefix + path;
    const message = prefixedPath + ':' + timer + '|ms';
    this.statsdData.push(message);
    this.currentEventCount++;
    this.currentEventCount >= this.maximumSavedEvents &&
      this.pushStatsToServer();
  }

  getFinalData() {
    for (const path in this.counterObject) {
      const message = path + ':' + this.counterObject[path] + '|c';
      this.statsdData.push(message);
    }
    const result = this.statsdData.join(this.delimiter);
    return result;
  }

  clearBuffer() {
    this.statsdData = [];
    this.counterObject = {};
    this.currentEventCount = 0;
  }

  //return api name
  findPath(str) {
    let result1 = str.replace(/^(cli.checkout.)/, '');
    let index = 0;
    for (let i = 0; i < result1.length; i++) {
      if (result1[i] >= '0' && result1[i] <= '9') {
        index = i;
        break;
      }
    }
    let i;
    for (i = index - 2; result1[i] !== '.' && i > 0; i--) {}
    index = i;
    return result1.substring(0, index);
  }

  //Given a api will retrun true/false based on samplingProbability
  isAPIStatsDEnabled(apiKey) {
    const { urlPathMap } = this.statsDConfig;
    let index = urlPathMap.findIndex(api => api.path === apiKey);
    if (index !== -1 && this.apiStatsDList[apiKey] === null) {
      let { samplingProbability, featureEnabled } = urlPathMap[index];

      //fallback to global samplingProbability and feature if api level samplingProbability/featureEnabled is not present
      if (!samplingProbability || !featureEnabled) {
        samplingProbability = get(
          getKVPairValue('STATSD_CONFIG'),
          'samplingProbability'
        );
        featureEnabled = get(getKVPairValue('STATSD_CONFIG'), 'featureEnabled');
      }

      const random = Math.random();
      this.apiStatsDList[apiKey] =
        random <= samplingProbability && featureEnabled;
    }
    return this.apiStatsDList[apiKey];
  }

  //This boolean function will return whether a particular api is eligible to push to statsD
  checkApiLevelProbability(data) {
    const key = this.findPath(data);
    return this.isAPIStatsDEnabled(key);
  }

  //newer function to push data to statsD server at api level
  pushApiLevelDataToServer() {
    let tempData = [];
    const finalData = this.getFinalData();
    const apiList = finalData.split(this.delimiter);
    apiList.length > 0 &&
      apiList.forEach(statsMessage => {
        if (this.checkApiLevelProbability(statsMessage)) {
          tempData.push(statsMessage);
        }
      });
    const data = tempData.join(this.delimiter);
    data !== '' &&
      apiList.length > 0 &&
      RequestManager.handle(
        {
          method: 'post',
          url: '/checkoutproxy/data',
          data: { data }
        },
        this.clearBuffer
      );
  }

  pushStatsToServer() {
    if (!this.apiLevelStatsDEnabled) {
      if (this.isStatsDEnabled()) {
        const data = this.getFinalData();
        data !== '' &&
          RequestManager.handle(
            {
              method: 'post',
              url: '/checkoutproxy/data',
              data: { data }
            },
            this.clearBuffer
          );
      }
    } else {
      this.pushApiLevelDataToServer();
    }
  }

  cleanUp() {
    this.pushStatsToServer();
    window.clearInterval(this.intervalId);
  }
}

const browserStatsdClient = new BrowserStatsdClient();

const browserStatsdCleanup = browserStatsdClient.cleanUp;
const pushStatsToServer = browserStatsdClient.pushStatsToServer;
const configureBrowserStatsd = browserStatsdClient.configureBrowserStatsd;

const browserStatsdMiddleware = getStatsdMiddleware(browserStatsdClient);

export default browserStatsdMiddleware;
export {
  pushStatsToServer,
  browserStatsdCleanup,
  configureBrowserStatsd,
  browserStatsdClient
};
