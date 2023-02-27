import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

// Functional Imports.
import {
  isLoggedIn,
  errorNotification,
  navigateBack,
  isAndroidApp,
  getUidx,
  isSessionStorageEnabled,
  setCookie,
  getCookie,
  isMyntAppEnabled
} from 'commonBrowserUtils/Helper';
import {
  isValidCart,
  checkExchangeCart,
  isCartCodServiceable,
  getShippingInfo
} from 'commonBrowserUtils/CartHelper';
import {
  getPaymentLoginUrl,
  getCodFallbackResponse,
  getPaymentConfig
} from 'commonBrowserUtils/PaymentHelper';
import PaymentsManager from 'commonBrowserUtils/PaymentsManager';
import ProfileManager from 'commonBrowserUtils/ProfileManager';
import TokenManager from 'commonBrowserUtils/TokenManager';
import {
  isFeatureEnabled,
  isVariantEnabled
} from 'commonUtils/FeaturesManager';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import {
  sessionStorageKeys,
  cookieKeys,
  orderStates
} from 'commonUtils/constants';
import { getQueryParam } from 'commonUtils/helper';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import defautlMAPayloadForWeb from '../../../../utils/maHelper';
const DATA_KEY = '_checkout_.__myx_data__';

const boundFuncs = [
  'initPageData',
  'onSuccess',
  'onError',
  'handlePaymentOptionsError',
  'handlePaymentAction',
  'updatePageData',
  'setLoader',
  'updateBankDiscount',
  'getPaymentData',
  'toggleTwoFA',
  'disableTwoFA',
  'handleTwoFASubmit',
  'updateDynamicStyles',
  'setPaymentFailureAttributes',
  'disableRetrySession',
  'disableRetryTimer',
  'enableRetryTimer',
  'updateCreditsBalance',
  'toggleRetryGC',
  'showBackConfirmationModal',
  'stayHere',
  'tryLater',
  'setTwoFADetails',
  'getTwoFADetails',
  'initializePhonePe',
  'toggleSaveCardConsent',
  'onPaymentDataSuccess',
  'onPaymentDataFailure'
];

class PaymentPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      spinner: true,
      error: null,
      cartData: isLoggedIn() ? this.props.getCartStoreData() : null,
      isExchangeCart: false,
      paymentOptions: null,
      paymentConfig: null,
      addressInfo: {},
      retrySessionEnabled: true,
      retryTimerDisabled: false,
      retryGCapplied: false,
      backConfirmationModalShown: false,
      twoFA: {
        display: false,
        callback: () => {},
        otp: null,
        disabled: false,
        mobileNumbers: null,
        enableEmailOtp: true,
        paymentModes: []
      },
      showSaveCardConsent: false,
      twoFAResponse: {},
      errorAttribute: {
        paymentErrorCode: getQueryParam({ name: 'errorCode' }),
        paymentErrorCodeOverride: getQueryParam({ name: 'overrideErrorCode' }),
        cartContext: getQueryParam({ name: 'cartContext' }),
        updateCounter: 0
      },
      bankDiscount: 0,
      dynamicStyles: {}
    };

    boundFuncs.forEach(method => (this[method] = this[method].bind(this)));
    this.payMode = getQueryParam({ name: 'mode' });
    this.referrer = getQueryParam({ name: 'referrer' });
    this.ppsId = getQueryParam({ name: 'ppsid' });

    this.initializePhonePe();
  }

  componentDidMount() {
    this.props.analytics('setPageContext')('Checkout-payment');
    this.props.analytics('initWebengage')();
    triggerEvent('PAYMENT_SCREEN_LOAD', defautlMAPayloadForWeb);
    triggerEvent('PAYMENT_PAGE_VIEW');
    setCookie(cookieKeys.ORDER_CONFIRMED, '', 0);
    ProfileManager.fetchDetails(() =>
      this.initPageData({
        spinner: !isAndroidApp(),
        prefetchedData:
          isFeatureEnabled('PAYMENT_PREFETCH') && this.getPrefetchedData()
      })
    );

    if (this.payMode === 'retry') {
      triggerEvent('DOPE_RETRY_PAYMENT_PAGE_LOADED');
      const { history } = this.props;
      history.push({
        path: history.location.path,
        search: history.location.search
      });
      window.addEventListener('popstate', this.showBackConfirmationModal);
    }
  }

  componentWillUnmount() {
    const {
      state: { cartData },
      props: { setCartStoreData }
    } = this;

    setCartStoreData(cartData);
    if (this.payMode === 'retry') {
      window.removeEventListener('popstate', this.showBackConfirmationModal);
    }
  }

  componentDidUpdate() {
    if (!this.firstUpdate) {
      const data = this.state.cartData;
      if (data) {
        this.props.analytics('pushDataLayerObjectForGTM')(data, 'payment');
        this.firstUpdate = true;
      }
    }
  }

  initializePhonePe() {
    if (isMyntAppEnabled(['initializePhonePe'])) {
      MyntApp.initializePhonePe();
    }
  }

  onSuccess(data) {
    const { lpBalance, gcBalance, ...pageData } = data;

    const { paymentOptions } = pageData;

    if (
      paymentOptions &&
      isFeatureEnabled('LOW_SR_OPTIONS_REMOVE') &&
      Array.isArray(paymentOptions.paymentInstrumentDetails)
    ) {
      paymentOptions.paymentInstrumentDetails = paymentOptions.paymentInstrumentDetails.filter(
        instrument => {
          if (
            PaymentConstants.LOW_SR_FILTER_EXCLUSIONS.includes(instrument.type)
          ) {
            return true;
          }
          const instrumentDetails = instrument.paymentInstrumentDetails;
          if (instrumentDetails && Array.isArray(instrumentDetails.data)) {
            instrumentDetails.data = instrumentDetails.data.filter(
              item => !item.lowSuccessRate
            );
            if (instrumentDetails.data.length === 0) {
              return false;
            }
          }
          return true;
        }
      );
    }

    this.creditsBalance = {
      lpBalance,
      gcBalance
    };

    this.setState({
      ...pageData,
      paymentConfig: getPaymentConfig(paymentOptions),
      isExchangeCart: checkExchangeCart(pageData.cartData),
      loading: false
    });
  }

  onError(error = {}) {
    const uidx = getUidx();
    const { code = '', message = '' } = error;
    triggerEvent('PAYMENT_PAGE_LOAD_ERROR', {
      gaLabel: `${code}:${message}:${uidx}`
    });
    this.setState({
      error,
      loading: false
    });
    errorNotification({ message: error.message });
  }

  getPrefetchedData() {
    const { gcBalance, lpBalance } = this.props.getPaymentStoreData() || {};

    return {
      gcBalance,
      lpBalance
    };
  }

  toggleSaveCardConsent(showSaveCardConsent, done = () => {}) {
    this.setState(
      {
        showSaveCardConsent
      },
      done
    );
  }

  setTwoFADetails(data) {
    this.setState({
      twoFAResponse: data
    });
  }

  getTwoFADetails(cartData) {
    //setting twofa details from shield
    if (cartData) {
      PaymentsManager.userTwoFAVerification(
        {
          addressId: get(cartData, 'orderAddressId'),
          addressUnifiedId: get(cartData, 'unifiedAddressId')
        },
        res => {
          this.setTwoFADetails(res);
        },
        () => {
          // not throw an error in this case
        }
      );
    }
  }

  toggleTwoFA(state = {}) {
    this.state.twoFA.display && triggerEvent('CLOSE_TWOFA');
    this.setState(prevState => ({
      twoFA: {
        ...prevState.twoFA,
        ...state,
        display: !prevState.twoFA.display
      },
      loading: false
    }));
  }

  disableTwoFA() {
    this.setState(prevState => ({
      twoFA: {
        ...prevState.twoFA,
        display: false,
        disabled: true
      }
    }));
    errorNotification({ message: 'Two factor authentication is disabled' });
  }

  handleTwoFASubmit(data) {
    this.setState(
      prevState => ({
        twoFA: { ...prevState.twoFA, ...data }
      }),
      this.state.twoFA.callback
    );
  }

  handleRedirect(data, forceRedirect) {
    errorNotification({ message: data.message });
    navigateBack(this.props.history, {
      message: true,
      url: data.redirectUrl || '/checkout/address',
      forceRedirect
    });
  }

  displayCODFallback(data, errorMessage) {
    let shippingInfo;
    try {
      shippingInfo = JSON.stringify(getShippingInfo(data.cartData) || {});
    } catch (e) {
      shippingInfo = '{}';
    }

    const codServiceable = isCartCodServiceable(data.cartData);
    if (codServiceable) {
      triggerEvent('COD_FALLBACK', {
        maData: {
          entity_type: 'cart',
          entity_name: 'cart',
          entity_id: get(data, 'cartData.id')
        },
        custom: {
          custom: { v1: shippingInfo },
          widget_items: {
            data_set: {
              data: (get(data, 'cartData.products') || []).map(product => ({
                entity_type: 'product',
                entity_name: product.name,
                entity_id: product.id
              }))
            }
          }
        }
      });
      const paymentOptions = getCodFallbackResponse();
      this.onSuccess({
        ...data,
        paymentOptions
      });
    } else {
      this.onError({ message: errorMessage });
    }
  }

  fireTwoFAEvent(data) {
    const paymentInstruments = get(data, 'paymentInstrumentDetails', []);
    const payload = [];
    for (let instrument of paymentInstruments) {
      const type = get(instrument, 'type');
      const isMobileOtpEnabled = get(
        instrument,
        'paymentInstrumentDetails.enable2fa',
        false
      );
      const isEmailOtpEnabled = get(
        instrument,
        'paymentInstrumentDetails.enableEmailOTP',
        false
      );
      const aggregatedData =
        isMobileOtpEnabled || isEmailOtpEnabled
          ? `${type}|${isMobileOtpEnabled}|${isEmailOtpEnabled}`
          : '';
      aggregatedData && payload.push(aggregatedData);
    }

    if (payload.length > 0) {
      triggerEvent('TWO_FA_ENABLED', {
        custom: {
          custom: {
            v1: payload.toString()
          }
        }
      });
    }
  }

  handleCODFallback({ errorConfig, message, data }) {
    const errorMessage = errorConfig.message || message;
    if (isSessionStorageEnabled()) {
      try {
        let errorCount = Number(
          sessionStorage.getItem(
            sessionStorageKeys.PAYMENT_OPTIONS_ERROR_COUNT
          ) || 0
        );
        const retryCount = getKVPairValue('COD_FALLBACK_CONFIG').retryCount;
        if (errorCount < retryCount) {
          sessionStorage.setItem(
            sessionStorageKeys.PAYMENT_OPTIONS_ERROR_COUNT,
            ++errorCount
          );
          this.onError({ message: errorMessage });
        } else {
          this.displayCODFallback(data, errorMessage);
        }
      } catch (e) {
        this.displayCODFallback(data, errorMessage);
      }
    } else {
      this.displayCODFallback(data, errorMessage);
    }
  }

  handlePaymentOptionsError(errorData, data) {
    const { error, message } = errorData;
    const errorCode = get(error, 'errorCode');
    const instrumentsFailureKV = getKVPairValue('PAYMENT_INSTRUMENTS_FAILURE');
    const errorConfig = get(instrumentsFailureKV, errorCode, {});
    const uidx = getUidx();

    triggerEvent('GET_PAYMENT_OPTIONS_ERROR', {
      gaLabel: `${errorCode}:${errorConfig.message || message}:${uidx}`
    });

    if (errorConfig.goBack) {
      errorNotification({ message: errorConfig.message });
      navigateBack(this.props.history, {
        message: true,
        url: errorConfig.url || '/checkout/cart',
        forceRedirect: errorConfig.forceRedirect
      });
    } else if (errorConfig.forceLogin) {
      SHELL.redirectTo(getPaymentLoginUrl({ force: true }));
    } else if (
      isFeatureEnabled('COD_FALLBACK_ENABLED') &&
      this.payMode !== 'retry'
    ) {
      this.handleCODFallback({ errorConfig, message, data });
    } else {
      this.onError({ message: errorConfig.message || message });
    }
  }

  initPageData(options) {
    if (isLoggedIn()) {
      const data = get(window, DATA_KEY, null);
      if (data) {
        if (data.httpStatus === 200) {
          this.setState({
            cartData: data.cartData,
            addressData: data.addressData,
            loading: false
          });
          this.getPaymentOptions(data)
            .then(paymentOptions => {
              this.onSuccess({ ...data, paymentOptions });
            })
            .catch(err => {
              this.onPaymentDataFailure(err, data.cartData);
            });
          this.getTwoFADetails(data.cartData);
        } else if (data.status === 'UPDATE_TOKENS') {
          TokenManager.refreshToken(this.getPaymentData);
        } else if (data.status === 'AUTHNZ_FAIL') {
          this.onError(data);
        } else if (data.httpStatus === 401) {
          SHELL.redirectTo(getPaymentLoginUrl({}));
        } else if (data.httpStatus === 302) {
          this.handleRedirect(data);
        } else {
          this.onError(data);
        }
        window._checkout_.__myx_data__ = null;
      } else {
        this.getPaymentData(options);
      }
    } else {
      SHELL.redirectTo(getPaymentLoginUrl({ force: true }));
    }
  }

  deferredPaymentOptionsHandler(data) {
    return new Promise((resolve, reject) => {
      PaymentsManager.getDeferredPaymentOptions(
        { ppsId: this.ppsId },
        paymentOptions => {
          resolve(paymentOptions);
        },
        error => {
          this.handlePaymentOptionsError(error, data);
          reject(error);
        }
      );
    });
  }

  paymentOptionsHandler(data) {
    return new Promise((resolve, reject) => {
      if (isValidCart(data.cartData)) {
        PaymentsManager.getPaymentOptions(
          {
            cartId: data.cartData.id,
            isExchangeCart: checkExchangeCart(data.cartData)
          },
          paymentOptions => {
            isSessionStorageEnabled() &&
              sessionStorage.setItem(
                sessionStorageKeys.PAYMENT_OPTIONS_ERROR_COUNT,
                0
              );
            this.fireTwoFAEvent(paymentOptions);
            resolve(paymentOptions);
          },
          error => {
            // the error handling is already there
            reject({ ...error, isPaymentOptions: true });
          }
        );
      } else {
        const checkoutReady = get(data, 'cartData.flags.checkoutReady');
        let message = 'Bag is empty or invalid. Redirecting back...';
        let url = '/checkout/cart';
        let steps = 1;
        if (
          !get(checkoutReady, 'value') &&
          get(checkoutReady, 'remark') === 'ADDRESS_NOT_FOUND'
        ) {
          message =
            get(
              getKVPairValue('PAYMENT_NOT_READY_ERROR'),
              'message.OEE_ADDRESS_NOT_FOUND'
            ) || 'Something went wrong! Please try again';

          //normal cart flow
          if (!checkExchangeCart(data.cartData)) {
            url = '/checkout/address';
            message =
              get(
                getKVPairValue('PAYMENT_NOT_READY_ERROR'),
                'message.ADDRESS_NOT_FOUND'
              ) || 'Something went wrong! Please reselect the address';
          }
        }
        errorNotification({
          message
        });
        if (window && window.location.hash.includes('#disableBack')) {
          steps = 2;
        }
        navigateBack(this.props.history, {
          message: true,
          url,
          steps
        });
      }
    });
  }

  getPaymentOptions(data) {
    return this.payMode === 'retry'
      ? this.deferredPaymentOptionsHandler(data)
      : this.paymentOptionsHandler(data);
  }

  onPaymentDataSuccess(
    { gcBalance, lpBalance, addressData, cartData, paymentOptions },
    options
  ) {
    this.onSuccess({
      cartData,
      gcBalance: gcBalance || get(options, 'prefetchedData.gcBalance'),
      lpBalance: lpBalance || get(options, 'prefetchedData.lpBalance'),
      addressData,
      paymentOptions
    });
  }

  onPaymentDataFailure(error, cartData = {}) {
    if (error.isPaymentOptions) {
      this.handlePaymentOptionsError(error, { cartData });
    } else if (error.status === 401) {
      SHELL.redirectTo(getPaymentLoginUrl({}));
    } else if (error.status === 302) {
      this.handleRedirect(error.error, true);
    } else if (error.status === 'UPDATE_TOKENS') {
      TokenManager.refreshToken(this.getPaymentData);
    } else {
      this.onError(error);
    }
  }

  async getPaymentData(options) {
    const { payMode, referrer, ppsId } = this;
    let { cartData, selectedAddress } = this.props;

    if (cartData) {
      Promise.all([
        PaymentsManager.getPageData(
          { payMode, referrer, ppsId, ...options },
          cartData,
          selectedAddress
        ),
        this.getPaymentOptions({ cartData })
      ])
        .then(
          async ([
            { gcBalance, lpBalance, addressData, cartData: fetchedCartData },
            paymentOptions
          ]) => {
            this.onPaymentDataSuccess(
              {
                gcBalance,
                lpBalance,
                addressData,
                cartData: fetchedCartData ? fetchedCartData : cartData,
                paymentOptions
              },
              options
            );
          }
        )
        .catch(error => {
          this.onPaymentDataFailure(error, cartData);
        });
      this.getTwoFADetails(cartData);
    } else {
      try {
        const {
          gcBalance,
          lpBalance,
          addressData,
          cartData: fetchedCartData
        } = await PaymentsManager.getPageData(
          {
            payMode,
            referrer,
            ppsId,
            ...options
          },
          {},
          selectedAddress
        );
        cartData = fetchedCartData;
        this.getTwoFADetails(cartData);
        const paymentOptions = await this.getPaymentOptions({
          cartData
        });

        this.onPaymentDataSuccess(
          {
            gcBalance,
            lpBalance,
            addressData,
            cartData,
            paymentOptions
          },
          options
        );
      } catch (error) {
        //Temp fix when address ID is not there when user coming from OCP or aggregator fails
        const isAddressIDNotAvailable =
          error.message === 'Unable to fetch address id';
        if (isAddressIDNotAvailable) {
          await this.getPaymentOptions({});
        } else {
          this.onPaymentDataFailure(error, cartData);
        }
      }
    }
  }

  updatePageData(res, options) {
    if (!options.keepPreviousState && options.updateKey) {
      const obj = {
        [options.updateKey]: res
      };
      if (options.updateKey === 'cartData') {
        obj.isExchangeCart = checkExchangeCart(res);
      }
      if (options.updateKey === 'paymentOptions') {
        this.fireTwoFAEvent(res);
      }
      this.setState(obj);
    }
  }

  handlePaymentAction(action, data, options = {}, onSuccess, onError) {
    this.setState({ loading: true, error: null });
    PaymentsManager[action](
      data,
      res => {
        this.setState({ loading: false });
        this.updatePageData(res, options);
        onSuccess && onSuccess(res);
      },
      err => {
        this.setState({ loading: false });
        onError ? onError(err) : errorNotification(options);
      }
    );
  }

  setLoader(loading, callback) {
    this.setState({ loading }, callback);
  }

  updateBankDiscount(bankDiscount) {
    this.setState({ bankDiscount });
  }

  updateDynamicStyles(key, value) {
    this.setState({
      dynamicStyles: { ...this.state.dynamicStyles, [key]: value }
    });
  }

  setPaymentFailureAttributes(errorCode, context) {
    this.setState(prevState => ({
      errorAttribute: {
        paymentErrorCode: errorCode,
        cartContext: context,
        updateCounter: ++prevState.errorAttribute.updateCounter
      }
    }));
  }

  disableRetrySession() {
    this.setState({
      retrySessionEnabled: false
    });
  }

  disableRetryTimer() {
    this.setState({
      retryTimerDisabled: true
    });
  }

  enableRetryTimer() {
    this.setState({
      retryTimerDisabled: false
    });
  }

  updateCreditsBalance(balance) {
    this.creditsBalance = balance;
  }

  toggleRetryGC() {
    this.setState(prevState => ({
      retryGCapplied: !prevState.retryGCapplied
    }));
  }

  showBackConfirmationModal() {
    this.setState({
      backConfirmationModalShown: true
    });
  }

  stayHere() {
    const { history } = this.props;
    history.push({
      path: history.location.path,
      search: history.location.search
    });

    this.setState({
      backConfirmationModalShown: false
    });
  }

  tryLater() {
    const redirectConfig =
      this.referrer === orderStates.PLACED
        ? { steps: 2 }
        : { url: '/', forceRedirect: true };

    navigateBack(this.props.history, redirectConfig);
  }

  render() {
    const {
      props: {
        render,
        analytics,
        cartData: savedCartData,
        selectedAddress: savedSelectedAddress
      },
      payMode,
      referrer,
      ppsId,
      updateBankDiscount,
      updateDynamicStyles,
      setLoader,
      handlePaymentAction,
      updatePageData,
      toggleTwoFA,
      disableTwoFA,
      handleTwoFASubmit,
      setPaymentFailureAttributes,
      state,
      creditsBalance,
      disableRetrySession,
      disableRetryTimer,
      enableRetryTimer,
      updateCreditsBalance,
      toggleRetryGC,
      stayHere,
      tryLater,
      setTwoFADetails,
      toggleSaveCardConsent
    } = this;
    const { cartData, addressData } = state;
    return render({
      ...state,
      payMode,
      referrer,
      ppsId,
      updateBankDiscount,
      handlePaymentAction,
      updatePageData,
      setLoader,
      updateDynamicStyles,
      toggleTwoFA,
      disableTwoFA,
      handleTwoFASubmit,
      setPaymentFailureAttributes,
      disableRetrySession,
      disableRetryTimer,
      enableRetryTimer,
      updateCreditsBalance,
      toggleRetryGC,
      stayHere,
      tryLater,
      analytics,
      refreshPageData: this.initPageData,
      creditsBalance,
      setTwoFADetails,
      toggleSaveCardConsent,
      cartData: cartData ? cartData : savedCartData,
      addressData: addressData ? addressData : savedSelectedAddress
    });
  }
}

PaymentPage.propTypes = {
  render: PropTypes.func,
  updateStoreData: PropTypes.func
};

export default PaymentPage;
