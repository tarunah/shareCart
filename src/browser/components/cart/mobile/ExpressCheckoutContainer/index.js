/*
 *
 * This file acts as a wrapper for the entire expresscheckout component and manages to get all the required data
 * from relevant API's, and consolidates the data into the react state, in the form of objects, which are easy to pass as
 * props to the individual react sub components that get rendered inside ExpressCheckout.js file
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import pick from 'lodash/pick';
import isEmpty from 'lodash/isEmpty';

// Data Managers
import AddressManager from 'commonBrowserUtils/AddressManager';
import PaymentsManager from 'commonBrowserUtils/PaymentsManager';
import {
  isFeatureEnabled,
  isVariantEnabled
} from 'commonUtils/FeaturesManager';
import CreditsManager from 'commonBrowserUtils/CreditsManager';
import ProfileManager from 'commonBrowserUtils/ProfileManager';
import { getPaymentFields } from 'commonBrowserUtils/priceBreakupFields';
import PayNowHandler from '../../../payment/common/PayNowHandler';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
import {
  getPaymentInstrumentList,
  isPaymentInstrumentValid,
  getDefaultPaymentInstrument,
  getDefaultSavedInstrument,
  getPaymentInstrumentByType,
  getPaymentModeObj,
  getDefaultWallet,
  getDefaultBank,
  getSpriteObj,
  getMinDeliveryDate,
  getMaxDeliveryDate
} from './util.js';
import {
  getTotal,
  transformPriceDetails
} from 'commonBrowserUtils/transformPriceDetails';
import {
  roundNumber,
  getProfileDetails,
  getProfileMobile,
  errorNotification,
  isIOSApp,
  isFreeEarlyAccess,
  isReturnAbuser,
  navigateBack
} from 'commonBrowserUtils/Helper';
import { getAppliedInstrument } from 'commonBrowserUtils/CartHelper';
import {
  redirectToAddress,
  redirectToAddressSubpage,
  setSelectedAddressCookie
} from 'commonBrowserUtils/AddressHelper';
import {
  redirectToPayment,
  getInstrumentTwoFAData,
  resetPaymentRetrySession,
  getInstalledAppsPromise,
  createUrlWithQueryParams,
  isTwoFAEnabled
} from 'commonBrowserUtils/PaymentHelper';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';

const {
  SAVED_INSTRUMENT,
  CARD_TYPE,
  CREDIT_CARD,
  VPA,
  NETBANKING,
  UPI,
  WALLET_PM_NAME,
  LOYALTY_POINTS,
  MYNTRA_CREDIT,
  COD
} = PaymentConstants;
import ExpressConstants from './expressConstants';
import ExpressCheckout from './ExpressCheckout';
import Styles from './expresscheckout.base.css';

const {
  LOYALTY,
  CREDIT,
  MAESTRO,
  XPRESS_EVENT_MAP,
  DEFAULT,
  ADDRESS,
  ADDRESS_LIST,
  ARRIVAL,
  PAYMENT,
  TRY_AND_BUY,
  PHONEPE
} = ExpressConstants;

const xpressMethods = [
  'updateCredit',
  'updateLoyalty',
  'onExpressError',
  'setOrderAddress',
  'refreshPaymentOptions',
  'onClose',
  'toggleDetails',
  'makePayment',
  'getNewPaymentForm',
  'updateBankDiscount',
  'updateCVV',
  'handleTwoFASubmit',
  'disableTwoFA',
  'handlePaymentAction',
  'toggleTwoFA',
  'blockTwoFAToggle',
  'initExpressCheckoutData',
  'triggerSuccessPaymentEvent',
  'clearExpressHistory',
  'setCaptchaRef',
  'setCaptchaDetails',
  'handleCaptchaSubmit',
  'resetCaptcha'
];

class ExpressCheckoutContainer extends React.Component {
  constructor(props) {
    super(props);
    this.isBlockTwoFAToggle = true;
    this.state = {
      installedApps: [],
      upiIntentEnabled: false,
      loading: false,
      error: null,
      expressCheckoutResolved: false,
      showDetails: false,
      section: 'default',
      cvv: null,
      cvvError: null,
      twoFA: {
        display: false,
        callback: () => {},
        otp: null,
        disabled: false,
        mobileNumbers: null,
        enableEmailOtp: true,
        paymentModes: []
      },
      twoFAResponse: {},
      captchaDetails: {
        display: false,
        id: null,
        code: null,
        callback: () => {}
      },
      expressCheckoutData: {
        instrumentData: {},
        myntraInstrumentsData: {},
        paymentOptions: {},
        balanceData: {
          GC: {},
          LP: {}
        },
        gcObj: {
          gcBalance: 0,
          gcAmount: 0,
          gcApplicable: false,
          creditChecked: false
        },
        lpObj: {
          lpBalance: 0,
          lpAmount: 0,
          lpApplicable: false,
          loyaltyChecked: false
        },
        resolved: false,
        paymentType: null,
        finalAmount: 0,
        bankDiscount: 0,
        cashbackObj: null,
        orderTotal: 0
      }
    };
    this.cvv = null;
    this.cartChanged = false;
    [
      ...xpressMethods,
      'initExpressCheckout',
      'updateCreditStatus',
      'initExpressCheckoutData',
      'getModeAttributes',
      'updateExpressState',
      'onCreditSuccessUpdate',
      'onCreditFailure',
      'addMyntraInstrumentsData',
      'getFinalAmount',
      'getPriceDetails',
      'getCreditsBalance',
      'setCreditsBalance',
      'setInstalledAppsConfig',
      'setTwoFADetails',
      'redirectToPaymentError'
    ].forEach(method => (this[method] = this[method].bind(this)));
  }

  componentDidMount() {
    resetPaymentRetrySession();
    this.setInstalledAppsConfig();
    ProfileManager.fetchDetails(this.initExpressCheckout);
  }

  setInstalledAppsConfig() {
    this.props.setLoader(true, () => {
      getInstalledAppsPromise().then(({ installedApps, upiSDKEnabled }) => {
        this.setState({
          installedApps,
          upiIntentEnabled:
            upiSDKEnabled && isFeatureEnabled('UPI_INTENT_ENABLED')
        });
        this.props.setLoader(false);
      });
    });
  }

  hasCartChanged(prevProps) {
    return prevProps.cartData.modifiedAt !== this.props.cartData.modifiedAt;
  }

  componentDidUpdate(prevProps) {
    if (this.hasCartChanged(prevProps)) {
      this.cartChanged = true;
    }
    if (
      prevProps.showExpressCheckoutHalfCard !==
      this.props.showExpressCheckoutHalfCard
    ) {
      if (this.props.showExpressCheckoutHalfCard) {
        this.state.expressCheckoutResolved && !this.cartChanged
          ? this.resolveExpressCheckout()
          : this.handleExpressCheckout(); // Prevents calling API again if its already resolved
      }
    }
  }

  getFinalAmount(bankDiscount, price) {
    const priceWithBankDiscount = {
      ...price,
      instruments: {
        data: [...price.instruments.data, { name: 'bank', value: bankDiscount }]
      }
    };
    return getTotal(priceWithBankDiscount, getPaymentFields());
  }

  getTwoFAData(options) {
    const { paymentOptions } = this.state.expressCheckoutData;
    const loyaltyInstrument = getPaymentInstrumentByType(
      options || paymentOptions,
      LOYALTY_POINTS
    );
    const creditInstrument = getPaymentInstrumentByType(
      options || paymentOptions,
      MYNTRA_CREDIT
    );
    const mcTwoFAData = getInstrumentTwoFAData(
      get(creditInstrument, 'paymentInstrumentDetails')
    );
    const lpTwoFAData = getInstrumentTwoFAData(
      get(loyaltyInstrument, 'paymentInstrumentDetails')
    );
    return {
      lpTwoFAData,
      mcTwoFAData
    };
  }

  setTwoFADetails(data) {
    this.setState({
      twoFAResponse: data
    });
  }

  setCaptchaRef(node) {
    this.captchaComp = node;
  }

  setCaptchaDetails(data, done = () => {}) {
    this.setState(
      prevState => ({
        captchaDetails: {
          ...prevState.captchaDetails,
          ...data
        }
      }),
      () => {
        this.props.setLoader(false);
        this.state.captchaDetails.callback();
        done();
      }
    );
  }

  handleCaptchaSubmit() {
    this.captchaComp.submitWithCaptcha(() => {});
  }

  resetCaptcha() {
    this.setState({
      captchaDetails: {
        display: false,
        id: null,
        code: null,
        callback: () => {}
      }
    });
  }

  updateCreditStatus(loyalty = {}, credit = {}) {
    const { cartData } = this.props;
    const { expressCheckoutData } = this.state;
    const { activePoints = 0 } = loyalty;
    const { totalBalance = 0 } = credit;
    const appliedGC = getAppliedInstrument('giftcard', cartData);
    const appliedLP = getAppliedInstrument('loyaltypoints', cartData);
    const mcTwoFAData = {
      enable: !!appliedGC
    };
    const lpTwoFAData = {
      enable: !!appliedLP
    };
    const giftcardApplicable = get(cartData, 'flags.giftcardApplicable', {});
    const loyaltyPointsApplicable = get(
      cartData,
      'flags.loyaltyPointsApplicable',
      {}
    );
    const gcObj = {
      gcBalance: totalBalance,
      gcAmount: appliedGC ? appliedGC.value : 0,
      gcApplicable: giftcardApplicable,
      creditChecked: !!appliedGC
    };

    const lpObj = {
      lpBalance: activePoints,
      lpAmount: appliedLP ? appliedLP.value : 0,
      lpApplicable: loyaltyPointsApplicable,
      loyaltyChecked: !!appliedLP
    };

    this.addMyntraInstrumentsData({
      auto_giftcard_used: appliedGC ? 'true' : '',
      auto_giftcard_amount: appliedGC ? appliedGC.value : '0',
      giftcard_type: appliedGC ? 'myntracredit' : '',
      twofa_mc_data: mcTwoFAData,
      twofa_lp_data: lpTwoFAData,
      useloyaltypoints: appliedLP ? 'Y' : 'N',
      paynowInstrumentsData: {
        autoGiftCardAmount: appliedGC ? appliedGC.value : '0',
        autoGiftCardUsed: appliedGC ? 'true' : '',
        giftcardType: appliedGC ? 'myntracredit' : '',
        useloyaltypoints: appliedLP ? 'Y' : 'N',
        myntraCreditEligible: appliedGC ? 'true' : '',
        myntraCreditAmount: appliedGC ? appliedGC.value : '0'
      }
    });
    // Just passing gcObj wasn't causing a re-render, hence extending it using initial state
    this.updateExpressState({
      gcObj: Object.assign(expressCheckoutData.gcObj, gcObj),
      lpObj: Object.assign(expressCheckoutData.lpObj, lpObj)
    });
  }

  getPriceDetails() {
    const {
      price,
      shippingData: { method, shippingApplicableCharge },
      flags
    } = this.props.cartData;
    const priceDetails =
      transformPriceDetails(
        price,
        getPaymentFields(),
        {
          shippingMethod: method,
          freeEarlyAccess: isFreeEarlyAccess(
            get(flags, 'coverFeeApplicable.remark')
          )
        },
        {
          shipping: { shippingApplicableCharge }
        }
      ) || [];
    return priceDetails;
  }

  getEventRelatedData() {
    const {
      balanceData: { GC: creditData, LP: loyaltyData },
      paymentType,
      instrumentData
    } = this.state.expressCheckoutData;
    const { addressData, serviceabilityData } = this.props;
    const { addressType } = addressData;
    const { id: cartId, products } = this.props.cartData;
    const { subTotal } = get(this.props.cartData, 'price', {});
    const uidx = get(addressData, 'user.uidx');
    const { activePoints } = loyaltyData;
    const { totalBalance } = creditData;
    const hasLoyalty = parseInt(activePoints, 10) > 0;
    const hasCredit = parseInt(totalBalance, 10) > 0;
    const paymentInstrumentType = get(
      instrumentData,
      'paymentInstrumentDetails.data.0.paymentInstrumentType',
      ''
    );

    let bankData;
    if (
      paymentType === SAVED_INSTRUMENT &&
      paymentInstrumentType === CARD_TYPE
    ) {
      bankData = getDefaultSavedInstrument(instrumentData);
    } else {
      bankData = getSpriteObj(instrumentData, paymentType);
    }
    const { bankName } = bankData;

    const productIds = products.map(product => `${product.id}`).join('_');
    const minDelivery = getMinDeliveryDate(this.props.serviceabilityData);
    const maxDelivery = getMaxDeliveryDate(this.props.serviceabilityData);

    return {
      bankName,
      hasLoyalty,
      hasCredit,
      uidx,
      addressType,
      paymentType,
      cartCount: serviceabilityData.length,
      cartId,
      productIds,
      minDelivery,
      maxDelivery,
      subTotal
    };
  }

  toggleDetails(section = DEFAULT) {
    const sections = [
      DEFAULT,
      ADDRESS,
      ADDRESS_LIST,
      ARRIVAL,
      PAYMENT,
      TRY_AND_BUY
    ];
    if (sections.indexOf(section) === -1) return;

    let { paymentType, finalAmount } = this.state.expressCheckoutData;
    const {
      bankName,
      addressType,
      uidx,
      cartCount,
      hasCredit,
      hasLoyalty,
      cartId,
      productIds,
      minDelivery,
      maxDelivery,
      subTotal
    } = this.getEventRelatedData();
    let customVariables = {};
    let widgetName;
    let eventTitle = XPRESS_EVENT_MAP[section];
    if (section === ADDRESS_LIST || section === PAYMENT) {
      customVariables = {
        v1: uidx,
        v2: `${paymentType},${bankName},${addressType},${
          hasLoyalty ? 'loyalty' : ''
        },${hasCredit ? 'credit' : ''}`
      };
      widgetName = `change-${section === ADDRESS_LIST ? 'address' : 'payment'}`;
    } else if (section === ARRIVAL) {
      customVariables = {
        v1: productIds,
        v2: cartCount,
        v3: minDelivery,
        v4: maxDelivery
      };
      widgetName = 'check-delivery';
    } else if (section === TRY_AND_BUY) {
      widgetName = 'try-and-buy-click';
      customVariables = {
        v1: uidx
      };
    } else if (section === ADDRESS) {
      widgetName = 'more_options-expresscheckout';
      customVariables = {
        v1: subTotal
      };
    }

    if (section !== DEFAULT) {
      triggerEvent(eventTitle, {
        custom: {
          widget: {
            name: 'express-checkout',
            type: 'card',
            data_set: {
              data: [
                {
                  entity_type: 'cart',
                  enitity_id: cartId,
                  entity_name: finalAmount
                }
              ]
            }
          },
          widget_items: {
            name: widgetName,
            type: 'button'
          },
          custom: customVariables,
          event_type: 'widgetItemClick'
        }
      });
    }
    if (section === ADDRESS_LIST) {
      this.props.history && navigateBack(this.props.history);
      setTimeout(redirectToAddressSubpage, 1, 'list');
      return;
    } else if (section === TRY_AND_BUY || section === ADDRESS) {
      this.props.history && navigateBack(this.props.history);
      setTimeout(redirectToAddress, 1);
      return;
    } else if (section === PAYMENT) {
      this.props.history && navigateBack(this.props.history);
      setTimeout(redirectToPayment, 1);
      return;
    }

    this.setState(prevState => {
      const { showDetails } = prevState;
      return {
        showDetails: !showDetails,
        section
      };
    });
  }

  /* Neeeded for 2FA form */
  handlePaymentAction(action, data, options = {}, onSuccess, onError) {
    PaymentsManager[action](
      data,
      res => {
        onSuccess && onSuccess(res);
      },
      err => {
        this.setState({ loading: false, error: err });
        onError ? onError(err) : errorNotification(options);
      }
    );
  }

  toggleTwoFA(state = {}) {
    this.props.setLoader(false);
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

  blockTwoFAToggle() {
    this.props.setLoader(false);
    this.state.twoFA.display && triggerEvent('CLOSE_TWOFA');
    this.setState({
      loading: false
    });
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

  addMyntraInstrumentsData(data) {
    this.state.expressCheckoutData.myntraInstrumentsData = {
      ...this.state.expressCheckoutData.myntraInstrumentsData,
      ...data
    };
  }

  updateExpressState(obj, cb = () => {}) {
    this.setState(
      prevState => ({
        expressCheckoutData: { ...prevState.expressCheckoutData, ...obj }
      }),
      cb
    );
  }

  updateCVV(e) {
    this.setState({
      cvv: e.target.value,
      cvvError: null
    });
  }

  triggerExpressCloseEvent() {
    const {
      expressCheckoutData: { paymentType, finalAmount }
    } = this.state;
    const {
      bankName,
      addressType,
      uidx,
      hasCredit,
      hasLoyalty,
      cartId
    } = this.getEventRelatedData();
    const customV2 = `${paymentType},${bankName},${addressType},${
      hasLoyalty ? 'loyalty' : ''
    },${hasCredit ? 'credit' : ''}`;
    triggerEvent('XPRESS_HALFCARD_CLOSE', {
      custom: {
        widget: {
          name: 'express-checkout',
          type: 'card',
          data_set: {
            data: [
              {
                entity_type: 'cart',
                enitity_id: cartId,
                entity_name: finalAmount
              }
            ]
          }
        },
        widget_items: {
          name: 'close-expresscheckout',
          type: 'button'
        },
        custom: {
          v1: uidx,
          v2: customV2
        }
      }
    });
  }

  onClose() {
    this.props.hideExpressCheckoutHalfCard();
    this.state.twoFA.display && this.toggleTwoFA();
    this.state.captchaDetails.display && this.resetCaptcha();
    this.resetExpressCheckout();
    this.triggerExpressCloseEvent();
  }

  getModeAttributes() {
    const {
      instrumentData,
      paymentType,
      finalAmount,
      bankDiscount
    } = this.state.expressCheckoutData;
    const recommendedOptionsParams = get(
      instrumentData,
      'paymentInstrumentDetails.data[0]',
      {}
    );
    let modeAttributes = {};
    const showingRecommendedOptions = isFeatureEnabled('RECOMMENDED_OPTIONS');
    const paymentInstrumentList = getPaymentInstrumentList(instrumentData);
    const vpaAppName = getSpriteObj(instrumentData, paymentType).bankName;
    const upiSDKEnabled =
      this.state.installedApps.indexOf(vpaAppName) !== -1 &&
      this.state.upiIntentEnabled;

    switch (paymentType) {
      case SAVED_INSTRUMENT:
        if (finalAmount) {
          const paymentInstrumentData = getDefaultSavedInstrument(
            instrumentData
          );
          const savedInstrumentType = get(
            paymentInstrumentData,
            'paymentInstrumentType',
            ''
          );
          const isVPA = savedInstrumentType === VPA;
          const { addressData } = this.props;
          const user = get(addressData, 'user.uidx');

          modeAttributes = showingRecommendedOptions
            ? {
                useSavedCard: recommendedOptionsParams.vpa ? 'false' : 'true',
                useSavedVpa: recommendedOptionsParams.vpa ? 'true' : 'false',
                upiSdkEnabled: upiSDKEnabled,
                cvvCode: this.state.cvv,
                otherCards: 'false',
                paymentInstrument: recommendedOptionsParams.instrumentId,
                bankCashbackEligible: `${bankDiscount !== 0}`,
                bankCashbackAmount: bankDiscount,
                user: user
              }
            : {
                useSavedCard: isVPA ? 'false' : 'true',
                useSavedVpa: isVPA ? 'true' : 'false',
                upiSdkEnabled: upiSDKEnabled,
                cvvCode: this.state.cvv,
                otherCards: 'false',
                paymentInstrument: get(paymentInstrumentData, 'instrumentId'),
                bankCashbackEligible: `${bankDiscount !== 0}`,
                bankCashbackAmount: bankDiscount,
                user: user
              };
        }
        break;
      case WALLET_PM_NAME:
        const { walletPriority } =
          getGrowthHackConfigValue('XPRESS_CHECKOUT_CONFIG') || {};
        const defaultWallet =
          getDefaultWallet(paymentInstrumentList, walletPriority) || {};

        modeAttributes = showingRecommendedOptions
          ? {
              walletEnabled: 'true',
              paymentProviderId: recommendedOptionsParams.id || '',
              walletAmount: roundNumber(finalAmount || 0, 2)
            }
          : {
              walletEnabled: 'true',
              paymentProviderId: defaultWallet.id || '',
              walletAmount: roundNumber(finalAmount || 0, 2)
            };
        break;
      case UPI:
        const paymentInstrumentDetails =
          get(instrumentData, 'paymentInstrumentDetails.data', []) || [];
        const defaultUpi =
          paymentInstrumentDetails.find(
            entry => entry.name && entry.name.toLowerCase().includes(PHONEPE)
          ) || {};
        modeAttributes = showingRecommendedOptions
          ? {
              paymentProviderId: recommendedOptionsParams.id || '',
              vpa: '',
              saveVpa: '',
              upiSdkEnabled: upiSDKEnabled
            }
          : {
              paymentProviderId: defaultUpi.id || '',
              vpa: '',
              saveVpa: '',
              upiSdkEnabled: upiSDKEnabled
            };
        break;
      case NETBANKING:
        const defaultBank = getDefaultBank(paymentInstrumentList) || {};
        modeAttributes = showingRecommendedOptions
          ? {
              paymentProviderId: recommendedOptionsParams.id
            }
          : {
              paymentProviderId: defaultBank.id
            };
        break;
      case COD:
        const { captchaDetails } = this.state;
        modeAttributes = {
          captchaId: get(captchaDetails, 'id', ''),
          codCaptcha: get(captchaDetails, 'code', '')
        };
        break;
    }
    //Free Purchase has empty mode attributes
    return modeAttributes;
  }

  triggerSuccessPaymentEvent(done) {
    const twoFAData = {
      instrumentData: this.state.expressCheckoutData.instrumentData,
      myntraInstrumentsData: this.state.expressCheckoutData
        .myntraInstrumentsData,
      twoFA: this.state.twoFA,
      twoFAResponse: this.state.twoFAResponse
    };
    const showCaptcha =
      this.state.expressCheckoutData.paymentType === COD &&
      isFeatureEnabled('COD_CAPTCHA_ENABLED') &&
      !isEmpty(twoFAData.twoFAResponse) &&
      !isTwoFAEnabled(twoFAData);

    if (showCaptcha) {
      this.setState(
        prevState => ({
          captchaDetails: {
            ...prevState.captchaDetails,
            display: true,
            callback: done
          }
        }),
        this.props.setLoader(false)
      );
      return;
    }
    done();
  }

  getNewPaymentForm() {
    const {
      expressCheckoutData: { paymentOptions }
    } = this.state;
    const { cartData } = this.props;
    const {
      paymentType,
      finalAmount,
      instrumentData,
      myntraInstrumentsData
    } = this.state.expressCheckoutData;
    let { paymentMode, paymentModeName, paymentUrl } = getPaymentModeObj(
      paymentType,
      instrumentData,
      finalAmount
    );

    return (
      <PayNowHandler
        paymentUrl={paymentUrl}
        paymentMode={paymentMode}
        paymentModeName={paymentModeName}
        paymentOptions={paymentOptions}
        modeAttributes={this.getModeAttributes()}
        deviceMode={'mobile'}
        submitCallback={this.triggerSuccessPaymentEvent}
        cartData={cartData}
        myntraInstrumentsData={myntraInstrumentsData}
        twoFA={this.state.twoFA}
        twoFAResponse={this.state.twoFAResponse}
        toggleTwoFA={this.toggleTwoFA}
        isBlockTwoFAToggle={this.isBlockTwoFAToggle}
        blockTwoFAToggle={this.blockTwoFAToggle}
        setTwoFADetails={this.setTwoFADetails}
        setPaymentFailureAttributes={this.redirectToPaymentError}
        setLoader={this.props.setLoader}
        instrumentData={instrumentData}
        actionData={{
          hideBtn: true,
          enabled: true,
          className: `${Styles.hideFormBtn}`
        }}
      />
    );
  }

  triggerPlaceOrder(btn) {
    btn && btn.click();
  }

  showCVVError(inputElem) {
    inputElem.focus();
    this.setState({
      cvvError: 'Please enter valid CVV Details',
      loading: false
    });
  }

  makePayment() {
    const {
      paymentType,
      finalAmount,
      instrumentData
    } = this.state.expressCheckoutData;
    const { id: cartId } = this.props.cartData;
    const { walletPriority } =
      getGrowthHackConfigValue('XPRESS_CHECKOUT_CONFIG') || {};
    const {
      uidx,
      addressType,
      hasCredit,
      hasLoyalty,
      bankName
    } = this.getEventRelatedData();
    const customV2 = `${paymentType},${bankName},${addressType},${
      hasLoyalty ? 'loyalty' : ''
    },${hasCredit ? 'credit' : ''}`;
    let { paymentMode, paymentModeName } = getPaymentModeObj(
      paymentType,
      instrumentData,
      finalAmount,
      walletPriority
    );

    const inputElem = document.getElementById('cvvInput');
    const submitBtn = document.getElementById(`action-${paymentModeName}`);
    let eventTitle = 'XPRESS_PREPAID_ORDER';
    if (
      finalAmount &&
      paymentType === SAVED_INSTRUMENT &&
      paymentMode === CREDIT_CARD &&
      !this.state.cvv
    ) {
      const defaultCard = getDefaultSavedInstrument(instrumentData);
      const isMaestro = (defaultCard.cardType || '').toLowerCase() === MAESTRO;
      !isMaestro && this.showCVVError(inputElem);
      return;
    }
    triggerEvent(eventTitle, {
      custom: {
        widget: {
          name: 'express-checkout',
          type: 'card',
          data_set: {
            data: [
              {
                entity_type: 'cart',
                enitity_id: cartId,
                entity_name: finalAmount
              }
            ]
          }
        },
        widget_items: {
          name: 'place-order',
          type: 'button'
        },
        custom: {
          v1: uidx,
          v2: customV2
        }
      }
    });
    this.triggerPlaceOrder(submitBtn);
  }

  updateBankDiscount(amount) {
    const {
      cartData: { price }
    } = this.props;
    const finalAmount = this.getFinalAmount(amount, price);
    this.updateExpressState({
      finalAmount,
      bankDiscount: amount
    });
  }

  initExpressCheckoutData() {
    try {
      const {
        balanceData: { GC: creditData, LP: loyaltyData },
        paymentOptions
      } = this.state.expressCheckoutData;
      const { price } = this.props.cartData;
      const { bankDiscount } = this.state.expressCheckoutData;
      const finalAmount = this.getFinalAmount(bankDiscount, price);
      const priceDetails = this.getPriceDetails();
      const orderTotalDetails =
        priceDetails.find(detail => detail.field === 'orderTotal') || {};
      const orderTotal = orderTotalDetails.value;
      const instrumentData = getDefaultPaymentInstrument(paymentOptions);
      const isValid = isPaymentInstrumentValid(instrumentData);
      if (!isValid) {
        this.onExpressError('No Valid Payment options found');
        return;
      }
      let paymentType = instrumentData.type;
      this.updateCreditStatus(loyaltyData, creditData);
      let checkoutData = {
        ...this.state.expressCheckoutData,
        paymentType,
        instrumentData,
        resolved: true,
        finalAmount,
        orderTotal
      };
      this.cartChanged = false;
      this.setState(
        {
          expressCheckoutData: checkoutData,
          expressCheckoutResolved: true,
          loading: false
        },
        () => {
          const {
            bankName,
            hasCredit,
            hasLoyalty,
            addressType,
            uidx
          } = this.getEventRelatedData();
          const customV2 = `${paymentType},${bankName},${addressType},${
            hasLoyalty ? 'loyalty' : ''
          },${hasCredit ? 'credit' : ''}`;
          triggerEvent('XPRESS_PREPAID_LOADED', {
            custom: {
              widget: {
                name: 'express-checkout',
                type: 'card',
                data_set: {
                  data: [
                    {
                      entity_type: 'cart',
                      entity_id: finalAmount,
                      entity_name: 'cart_value'
                    }
                  ]
                }
              },
              custom: {
                v1: uidx,
                v2: customV2,
                v3: paymentType
              }
            }
          });
        }
      );
    } catch (e) {
      this.onExpressError(`Init Express Error - ${e}`);
    }
  }

  setOrderAddress(data, successCB, errorCB) {
    AddressManager.setOrderAddress(data, successCB, errorCB);
  }

  getCreditsBalance() {
    const promises = [];
    promises.push(
      isFeatureEnabled('LP_BALANCE_LAZYLOAD')
        ? Promise.resolve()
        : new Promise(resolve =>
            CreditsManager.getLoyaltyPointsBalance(null, resolve, resolve)
          )
    );
    promises.push(
      isFeatureEnabled('AUTOGC_BALANCE_LAZYLOAD')
        ? Promise.resolve()
        : new Promise(resolve =>
            CreditsManager.getGiftCardBalance(null, resolve, resolve)
          )
    );

    Promise.all(promises)
      .then(this.setCreditsBalance)
      .catch(e => {
        this.onExpressError(`Credits API could not be initialised - ${e}`);
      });
  }

  setCreditsBalance(balance) {
    const [lpBalance, gcBalance] = balance;
    const { expressCheckoutData } = this.state;
    const { balanceData } = expressCheckoutData;

    if (gcBalance && !gcBalance.error) {
      balanceData.GC = gcBalance;
    }
    if (lpBalance && !lpBalance.error) {
      balanceData.LP = lpBalance;
    }
    this.updateExpressState({
      balanceData
    });
  }

  resolveExpressCheckout() {
    let { paymentType } = this.state.expressCheckoutData;
    if (paymentType === COD && !this.inCodRange()) {
      this.onExpressError('Express Not in COD range');
    }
    this.setState({
      expressCheckoutResolved: true
    });
  }

  resetExpressCheckout() {
    const { section } = this.state;
    if (typeof section === 'string' && section !== 'default') {
      this.toggleDetails('default');
    }
    this.setState({
      cvvError: null
    });
  }

  refreshPaymentOptions(cb) {
    this.getPaymentOptions()
      .then(paymentOptions => {
        this.onPaymentOptionsFetch(paymentOptions);
        return paymentOptions;
      })
      .then(cb)
      .catch(e => {
        console.error('Could not get payment options', e);
      });
  }

  handleExpressCheckout() {
    this.setState({
      expressCheckoutResolved: true,
      loading: true
    });
    const { addressData } = this.props;
    const { id: addressId, unifiedId } = addressData;
    this.setOrderAddress(
      { addressId: addressId, unifiedAddressId: unifiedId },
      () => {
        setSelectedAddressCookie({ addressId, unifiedId });
        const paymentOptionsPromise = this.getPaymentOptions();
        paymentOptionsPromise.then(
          paymentOptions => {
            this.onPaymentOptionsFetch(
              paymentOptions,
              this.initExpressCheckoutData
            );
          },
          e => {
            this.onExpressError(
              `Failed to fetch payment options in handleExpress - ${e}`
            );
          }
        );
      },
      e => {
        this.onExpressError(`Failed to set address in handleExpress - ${e}`);
      }
    );
  }

  // // done callback is only passed when the PayNowForm is getting submitted
  clearExpressHistory(done) {
    if (this.props.showExpressCheckoutHalfCard) {
      !isIOSApp() && this.props.history.goBack();
    }
    done && done();
  }

  onExpressError(msg) {
    console.error('Express Error', msg);
    triggerEvent('XPRESS_SERVICE_ERROR', {
      custom: {
        widget: {
          name: 'express-checkout',
          type: 'card'
        },
        widget_items: {
          name: `error-${msg}`,
          type: 'card'
        }
      }
    });
    this.clearExpressHistory();
    setTimeout(
      !isVariantEnabled('AOC_V2_VARIANT3')
        ? redirectToAddress
        : redirectToPayment,
      10
    );
  }

  getTwoFADetails() {
    //setting twofa details from shield
    const { addressData } = this.props;
    const { id: addressId, unifiedId } = addressData;
    PaymentsManager.userTwoFAVerification(
      {
        addressId: addressId,
        addressUnifiedId: unifiedId
      },
      res => {
        this.setTwoFADetails(res);
      },
      err => {}
    );
  }

  getPaymentOptions() {
    this.getTwoFADetails();
    const { id: cartId } = this.props.cartData;
    return new Promise((resolve, reject) => {
      PaymentsManager.getPaymentOptions(
        { cartId },
        r => {
          resolve(r);
        },
        reject
      );
    });
  }

  updateLoyalty(isApply) {
    return new Promise(resolve => {
      let apiFn = isApply
        ? CreditsManager.applyLoyaltyPoints
        : CreditsManager.removeLoyaltyPoints;
      this.setState({ loading: true }, () =>
        apiFn(
          null,
          res => this.onCreditSuccessUpdate(res, isApply, LOYALTY),
          res => this.onCreditFailure(res, resolve)
        )
      );
    });
  }

  updateCredit(isApply) {
    return new Promise((resolve, reject) => {
      let apiFn = isApply
        ? CreditsManager.applyGiftCard
        : CreditsManager.removeGiftCard;
      this.setState(
        {
          loading: true
        },
        () =>
          apiFn(
            null,
            res => this.onCreditSuccessUpdate(res, isApply, CREDIT),
            res => this.onCreditFailure(res, resolve)
          )
      );
    });
  }

  onCreditSuccessUpdate(res, isApply, creditType) {
    const { lpObj, gcObj, bankDiscount } = this.state.expressCheckoutData;
    this.props.updatePageData(res, { updateKey: 'cartData' });
    const appliedGC = getAppliedInstrument('giftcard', res);
    const appliedLP = getAppliedInstrument('loyaltypoints', res);
    const gcAmount = appliedGC ? appliedGC.value : 0;
    const lpAmount = appliedLP ? appliedLP.value : 0;
    const updatedGCObj = {
      ...gcObj,
      gcAmount,
      ...(creditType === CREDIT && { creditChecked: isApply })
    };
    const updatedLPObj = {
      ...lpObj,
      lpAmount,
      ...(creditType === LOYALTY && { loyaltyChecked: isApply })
    };

    creditType === CREDIT
      ? this.triggerCreditClickEvent(
          isApply,
          get(updatedGCObj, 'gcBalance'),
          get(updatedGCObj, 'gcAmount'),
          creditType
        )
      : this.triggerCreditClickEvent(
          isApply,
          get(updatedLPObj, 'lpBalance'),
          get(updatedLPObj, 'lpAmount'),
          creditType
        );

    this.updateExpressState({
      lpObj: updatedLPObj,
      gcObj: updatedGCObj,
      finalAmount: this.getFinalAmount(bankDiscount, res.price)
    });
    this.refreshPaymentOptions(updatedPaymentOptions => {
      const mcTwoFAData = {
        enable: !!appliedGC
      };
      const lpTwoFAData = {
        enable: !!appliedLP
      };
      this.addMyntraInstrumentsData({
        ...(creditType === CREDIT && {
          auto_giftcard_used: isApply ? 'true' : '',
          auto_giftcard_amount: isApply ? gcAmount : '0',
          giftcard_type: isApply ? 'myntracredit' : '',
          twofa_mc_data: mcTwoFAData,
          twofa_lp_data: lpTwoFAData,
          paynowInstrumentsData: {
            ...get(
              this,
              'state.expressCheckoutData.myntraInstrumentsData.paynowInstrumentsData'
            ),
            autoGiftCardAmount: isApply ? gcAmount : '0',
            autoGiftCardUsed: isApply ? 'true' : '',
            myntraCreditEligible: isApply ? 'true' : '',
            myntraCreditAmount: isApply ? gcAmount : '0',
            giftcardType: isApply ? 'myntracredit' : ''
          }
        }),
        ...(creditType === LOYALTY && {
          useloyaltypoints: isApply ? 'Y' : 'N',
          twofa_mc_data: mcTwoFAData,
          twofa_lp_data: lpTwoFAData,
          paynowInstrumentsData: {
            ...get(
              this,
              'state.expressCheckoutData.myntraInstrumentsData.paynowInstrumentsData'
            ),
            useloyaltypoints: isApply ? 'Y' : 'N'
          }
        })
      });
      this.setState({
        loading: false
      });
    });
  }

  triggerCreditClickEvent(isApply, balance, amount, type) {
    triggerEvent(`XPRESS_${type === CREDIT ? 'CREDIT' : 'POINTS'}_CLICK`, {
      custom: {
        widget: {
          name: 'express-checkout',
          type: 'card'
        },
        widget_items: {
          name: `myntra_${
            type === CREDIT ? 'credit' : 'points'
          }-expresscheckout`,
          type: 'button'
        },
        custom: {
          v1:
            isApply !== undefined
              ? isApply
                ? 'select'
                : 'deselect'
              : undefined,
          v2: balance,
          v3: amount
        },
        event_type: 'widgetItemClick'
      }
    });
  }

  onCreditFailure(err, callback) {
    callback && callback(err);
  }

  onPaymentOptionsFetch(data, cb = () => {}) {
    this.updateExpressState(
      {
        paymentOptions: data
      },
      cb
    );
  }

  redirectToPaymentError(errorCode, cartContext) {
    const params = {
      errorCode: errorCode
    };
    const url = createUrlWithQueryParams('/checkout/payment', params);
    SHELL.redirectTo(url);
  }

  inCodRange() {
    const { returnAbuser, cod } = get(this.props, 'cartData.userDetails', {});
    const minCOD = get(cod, 'minCod', '0');
    const maxCOD = get(cod, 'maxCod');
    const _isReturnAbuser = isReturnAbuser(returnAbuser);
    const { subTotal } = get(this.props, 'cartData.price', {});
    const skipExpressCheckout =
      _isReturnAbuser || subTotal <= minCOD || subTotal >= maxCOD;
    return !skipExpressCheckout;
  }

  initExpressCheckout() {
    if (this.inCodRange()) {
      this.getCreditsBalance();
    } else {
      console.warn('Skipping Express');
    }
  }

  render() {
    const {
      props: {
        updatePageData,
        showExpressCheckoutHalfCard,
        addressData,
        serviceabilityData,
        serviceabilityFlags,
        setLoader
      },
      state
    } = this;
    const expressProps = {
      ...state,
      ...pick(this, xpressMethods),
      data: this.props.cartData,
      updatePageData,
      addressData,
      serviceabilityData,
      serviceabilityFlags,
      setLoader
    };
    return showExpressCheckoutHalfCard && <ExpressCheckout {...expressProps} />;
  }
}

ExpressCheckoutContainer.propTypes = {
  hideExpressCheckoutHalfCard: PropTypes.func,
  updatePageData: PropTypes.func,
  showExpressCheckoutHalfCard: PropTypes.bool,
  cartData: PropTypes.object,
  setLoader: PropTypes.func,
  history: PropTypes.object
};

export default ExpressCheckoutContainer;
