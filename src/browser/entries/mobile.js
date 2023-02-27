import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import App from '../components/app/mobile';
import ScrollToTop from 'commonComp/ScrollToTop';
import * as Sentry from '@sentry/react';
import registerSW from 'commonBrowserUtils/registerServiceWorker';

const history = createBrowserHistory();

registerSW();

Sentry.init({
  dsn:
    'https://b5d33d8552de4fb398cac728d130f7e2@o128185.ingest.sentry.io/1278523',

  release: process.env.RELEASE
});

window.ckrrhistory = history;

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('mountRoot');
  ReactDOM.render(
    <Router history={history}>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Router>,
    root
  );
});
