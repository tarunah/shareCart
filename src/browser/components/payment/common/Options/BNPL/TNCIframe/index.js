import React from 'react';

import Styles from './tncIframe.base.css';

class TNCIframe extends React.PureComponent {
  constructor() {
    super();
    this.readMessage = this.readMessage.bind(this);
    window.addEventListener('message', this.readMessage, false);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.readMessage, false);
  }

  readMessage(message) {
    const { data } = message;
    if (data === 204) {
      this.props.successCallback();
    } else if (typeof data === 'object' && data.type !== 'iframeLoaded') {
      window.location =
        '/checkout/payment?transaction_status=N&errorCode=40001';
    }
  }

  render() {
    return <iframe src={this.props.src} className={Styles.iframe} sandbox />;
  }
}

export default TNCIframe;
