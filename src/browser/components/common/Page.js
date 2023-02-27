/*
 * High level component.
 * Use it to wrap only the containers of different checkout pages.
 */

import React, { Component } from 'react';
import get from 'lodash/get';
import { withRouter } from 'react-router';

import DataStore from 'commonBrowserUtils/DataStore';
import { configureBrowserStatsd } from 'commonBrowserUtils/browserStatsdMiddleware';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { isAndroidApp, isIOSApp, isApp } from 'commonBrowserUtils/Helper';
import browserEventsListener from 'commonBrowserUtils/browserEventsListener';

const enableDevPlugins = () => {
  // include only for dev and dockins
  // if (get(window, '_checkout_.__myx_env__.cookie.prefix', '') === 'fox-') {
  //   const { whyDidYouUpdate } = require('why-did-you-update');
  //   whyDidYouUpdate && whyDidYouUpdate(React);
  // }
};

/**
 * Does code splitting for 'analyticsManager.js' bundled in 'analytics' chunk.
 * Returns promise.
 */
const getAnalyticsPromise = () =>
  new Promise((resolve, reject) => {
    require.ensure(
      ['commonBrowserUtils/analytics/analyticsManager'],
      require => {
        resolve(require('commonBrowserUtils/analytics/analyticsManager'));
      },
      error => {
        console.log('require error: ', error);
        reject(error);
      },
      'analytics'
    );
  });

class Page extends Component {
  constructor(props) {
    super(props);
    this.analytics = this.analytics.bind(this);
    this.analyticsPromise = getAnalyticsPromise();
    this.analyticsPromise.catch(() => {
      console.log('Chunk loading failed');
    });
    window.triggerEvent = (...args) => this.analytics('default')(...args);
    window.addEventListener('beforeunload', () => {
      this.analytics('flushMA')();
    });
    enableDevPlugins();

    const { maximumSavedEvents, pushInterval } = getKVPairValue(
      'STATSD_CONFIG'
    );
    configureBrowserStatsd(maximumSavedEvents, pushInterval);
  }
  trackWebPage() {
    let currentPage = location.href;
    if (ga) {
      ga('set', 'page', location.pathname);
      ga('set', 'location', currentPage);
      ga('set', 'title', document.title);
      ga('set', 'referrer', window.previousPage);
      ga('send', 'pageview');
      window.referringUrl = window.previousPage;
      window.previousPage = currentPage;
    }
  }

  componentDidMount() {
    if (!isApp()) {
      this.trackWebPage();
    }
  }
  componentDidUpdate(prevProps) {
    const { location } = prevProps;
    if (this.props.location.pathname !== location.pathname) {
      if (!isApp()) {
        this.trackWebPage();
      }
    }
  }

  /**
   * Function to encapsulate all analytics related async code.
   * Usage: this.analytics(<function_name>)(arguments)
   */
  analytics(fn) {
    return (...args) =>
      this.analyticsPromise.then(
        analytics => analytics[fn](...args),
        () => {}
      );
  }

  render() {
    let { className, show, render } = this.props;
    if (show === false) {
      return null;
    }

    return (
      <div
        className={`page ${className} ${isAndroidApp() ? 'android' : ''} ${
          isIOSApp() ? 'ios' : ''
        }`}
      >
        {render({
          analytics: this.analytics,
          DataStore
        })}
      </div>
    );
  }
}

Page.defaultProps = {
  show: true,
  className: ''
};

export default withRouter(Page);
