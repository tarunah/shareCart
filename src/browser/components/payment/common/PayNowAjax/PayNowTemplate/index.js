import React from 'react';
import PropTypes from 'prop-types';

import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import { getCartContext } from 'commonBrowserUtils/CartHelper';
import { createUrlWithQueryParams } from 'commonBrowserUtils/PaymentHelper';
import {
  triggerMaWithLargePayload,
  isAndroidApp
} from 'commonBrowserUtils/Helper';

const { PAYNOW_TEMPLATE_CODE, PAYNOW_ERROR_CODE } = PaymentConstants;

const onPaynowError = ({
  closeLoader,
  setPaymentFailureAttributes,
  templateCode,
  errorCode = PAYNOW_ERROR_CODE.DEFAULT_PAYMENT_FAILURE_ERROR_CODE,
  cartContext,
  postURL,
  payload
}) => {
  setPaymentFailureAttributes(errorCode, cartContext || getCartContext());

  triggerEvent('PAY_NOW_ERROR', {
    gaLabel: `V3|${postURL}|${templateCode}|${errorCode}`,
    maData: {
      version: 'V3',
      postURL,
      templateCode,
      errorCode
    }
  });
  triggerMaWithLargePayload('PAY_NOW_ERROR_PAYLOAD', {
    ...payload,
    templateCode,
    errorCode
  });
  closeLoader && closeLoader();
};

class PhonePeSdkTemplate extends React.Component {
  constructor(props) {
    super(props);
    [
      'setFormRef',
      'onSdkLoadSuccess',
      'onPaymentError',
      'onPaymentSuccess'
    ].forEach(method => (this[method] = this[method].bind(this)));
  }

  setFormRef(node) {
    this.form = node;
  }

  onPaymentError(message, errorCode) {
    const {
      setPaymentFailureAttributes,
      closeLoader,
      templateCode,
      postURL,
      payload
    } = this.props;
    onPaynowError({
      setPaymentFailureAttributes,
      closeLoader,
      message,
      templateCode,
      errorCode,
      postURL,
      payload
    });
  }

  onPaymentSuccess() {
    const {
      paynowResponse: { postURL, templateCode }
    } = this.props;
    triggerEvent('PAY_NOW_SUCCESS', { version: 'V3', postURL, templateCode });
    this.form.submit();
  }

  onSdkLoadSuccess() {
    const self = this;
    PhonePe.PhonePe.build(
      PhonePe.Constants.Species.web,
      PhonePe.Constants.OS.android
    )
      .then(function(sdk) {
        const {
          paynowResponse: { postURL: fallbackURL, params } = {}
        } = self.props;
        const {
          merchantName,
          imageURL,
          quantity,
          reservationId,
          merchantId,
          validFor,
          merchantTransactionId,
          serviceCategory,
          payableAmount
        } = params;

        const context = {
          quantity,
          reservationId,
          merchantId,
          validFor,
          merchantTransactionId,
          serviceCategory,
          payableAmount
        };
        sdk
          .openPaymentsPage(merchantName, context, fallbackURL, imageURL, [])
          .then(function(response) {
            self.onPaymentSuccess();
          })
          .catch(function(err) {
            // TODO: Should be cross verified with payments team
            self.onPaymentSuccess();
          });
      })
      .catch(function(err) {
        self.onPaymentError(err, PAYNOW_ERROR_CODE.SDK_LOAD_ERROR);
      });
  }

  componentDidMount() {
    if (loadJS) {
      loadJS(
        'https://constant.myntassets.com/pwa/assets/js/phonepesdk-11082020.js',
        this.onSdkLoadSuccess
      );
    } else {
      this.onPaymentError('loadJS function is not defined in the shell');
    }
  }

  render() {
    const { postURL } = this.props.paynowResponse;
    return (
      <form
        name={'PhonepeSdkTemplateForm'}
        autoComplete="off"
        id={`paynow-phonepeSdkTemplate`}
        method="POST"
        action={postURL}
        ref={this.setFormRef}
      ></form>
    );
  }
}

class ErrorTemplate extends React.Component {
  componentDidMount() {
    const {
      paynowResponse: {
        params: { paymentErrorCode, cartContext },
        templateCode,
        postURL
      } = {},
      setPaymentFailureAttributes,
      closeLoader,
      payload
    } = this.props;

    onPaynowError({
      setPaymentFailureAttributes,
      closeLoader,
      message: '',
      templateCode,
      errorCode: paymentErrorCode,
      cartContext,
      postURL,
      payload
    });
  }

  render() {
    return null;
  }
}

class RedirectTemplate extends React.Component {
  componentDidMount() {
    const {
      paynowResponse: { postURL, templateCode } = {},
      resetPaynowResponse
    } = this.props;
    triggerEvent('PAY_NOW_SUCCESS', { version: 'V3', postURL, templateCode });
    SHELL.redirectTo(postURL);
    resetPaynowResponse && resetPaynowResponse();
  }

  render() {
    return null;
  }
}

class HTMLPostTemplate extends React.Component {
  constructor(props) {
    super(props);
    ['setFormRef'].forEach(method => (this[method] = this[method].bind(this)));
  }

  componentDidMount() {
    const {
      paynowResponse: { postURL, templateCode },
      resetPaynowResponse
    } = this.props;
    triggerEvent('PAY_NOW_SUCCESS', { version: 'V3', postURL, templateCode });
    this.form.submit();
    resetPaynowResponse && resetPaynowResponse();
  }

  setFormRef(node) {
    this.form = node;
  }

  getFormData(params) {
    const formData = [];
    for (const key in params) {
      formData.push(<input type="hidden" name={key} value={params[key]} />);
    }
    return formData;
  }

  render() {
    const {
      paynowResponse: { postURL, params } = {},
      upiSdkEnabled
    } = this.props;
    /*
     *  TODO: Make a new template for UPI Intent or make use of RedirectTemplate.
     *  This is a patch for android app as they don't intercept Post calls and
     *  making a fix from android would force pps to maintain paynowForm as well
     *  as paynow json.
     */
    let method = 'POST';
    let formParams = params;
    if (upiSdkEnabled && isAndroidApp()) {
      method = 'GET';
      const { vpa, ...rest } = params;
      formParams = rest;
    }

    const formData = this.getFormData(formParams);

    return (
      <form
        name={'HtmlPostTemplateForm'}
        autoComplete="off"
        id={`paynow-htmlPostTemplate`}
        action={postURL}
        method={method}
        ref={this.setFormRef}
      >
        {formData}
      </form>
    );
  }
}

class PhonePeAndroidSdkTemplate extends React.Component {
  componentDidMount() {
    const {
      paynowResponse: { postURL, params, templateCode } = {},
      resetPaynowResponse
    } = this.props;
    triggerEvent('PAY_NOW_SUCCESS', { version: 'V3', postURL, templateCode });
    const redirectUrl = createUrlWithQueryParams(postURL, params);
    SHELL.redirectTo(redirectUrl);
    resetPaynowResponse && resetPaynowResponse();
  }

  render() {
    return null;
  }
}

class OrderSucessTemplate extends React.Component {
  componentDidMount() {
    const {
      paynowResponse: { postURL, params, templateCode } = {},
      resetPaynowResponse
    } = this.props;
    triggerEvent('PAY_NOW_SUCCESS', { version: 'V3', postURL, templateCode });
    const redirectUrl = createUrlWithQueryParams(postURL, params);
    SHELL.redirectTo(redirectUrl);
    resetPaynowResponse && resetPaynowResponse();
  }

  render() {
    return null;
  }
}

const resTemplateCode = {
  [PAYNOW_TEMPLATE_CODE.HTML_TEMPLATE]: HTMLPostTemplate,
  [PAYNOW_TEMPLATE_CODE.REDIRECT_TEMPLATE]: RedirectTemplate,
  [PAYNOW_TEMPLATE_CODE.PHONEPE_JS_TEMPLATE]: PhonePeSdkTemplate,
  [PAYNOW_TEMPLATE_CODE.PHONEPE_ANDROID_TEMPLATE]: PhonePeAndroidSdkTemplate,
  [PAYNOW_TEMPLATE_CODE.ORDER_SUCCESS_TEMPLATE]: OrderSucessTemplate,
  [PAYNOW_TEMPLATE_CODE.ERROR_TEMPLATE]: ErrorTemplate
};

const PayNowTemplate = props => {
  const { paynowResponse: { templateCode } = {} } = props;
  const Component = resTemplateCode[templateCode];
  return <Component {...props} />;
};

export default PayNowTemplate;

PayNowTemplate.propTypes = {
  paynowResponse: PropTypes.object,
  setPaymentFailureAttributes: PropTypes.func,
  closeLoader: PropTypes.func,
  resetPaynowResponse: PropTypes.func
};

PayNowTemplate.defaultProps = {
  paynowResponse: {},
  setPaymentFailureAttributes: () => {},
  closeLoader: () => {},
  resetPaynowResponse: () => {}
};
