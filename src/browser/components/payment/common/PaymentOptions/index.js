import React from 'react';
import get from 'lodash/get';

//Common Components
import { getTabCreator } from './tabComponents';
import { SavedInstruments, RecommendedInstruments, GiftCard } from '../Options';
import Notifications from '../Notifications';
import FreePurchase from '../FreePurchase';
import SuggestionNotification from '../Notifications/Suggestion';
import CreditsBlock from '../CreditsBlock';
import {
  getUidx,
  isAndroidApp,
  isIOSApp,
  onEnteringViewport
} from 'commonBrowserUtils/Helper';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import {
  showTab,
  showSuggestionNotification,
  showSavedInstrumentsInMobile,
  showRecommendedInstrumentsInMobile
} from './paymentOptionsHelper';
import { getAppliedInstrument } from 'commonBrowserUtils/CartHelper';
import { getInstalledAppsPromise } from 'commonBrowserUtils/PaymentHelper';

const {
  COD,
  SAVED_INSTRUMENT,
  RECOMMENDED_INSTRUMENT,
  PAY_LATER,
  CARD_TYPE,
  WALLET_TYPE,
  EMI_TYPE,
  NETBANKING,
  UPI,
  GIFTCARD,
  CREDIT_CARD,
  DEBIT_CARD,
  MYNTRA_CREDIT,
  LOYALTY_POINTS,
  INSTRUMENT_ELIGIBLE_CODE
} = PaymentConstants;

const boundFuncs = [
  'onSwitchTab',
  'onTabClick',
  'setSavedInstrumentRef',
  'setRecommendedInstrumentRef',
  'closeTab',
  'setPaymentOptionRef',
  'triggerScrollEvent'
];

class PaymentOptions extends React.PureComponent {
  constructor(props) {
    super(props);

    boundFuncs.forEach(method => (this[method] = this[method].bind(this)));
    this.orderedInstrumentList = this.getOrderedInstrumentList();
    this.state = {
      upiAppsCount: 0
    };
  }

  componentDidMount() {
    if (isFeatureEnabled('RECOMMENDED_OPTIONS')) {
      triggerEvent('PAYMENT_OPTIONS_ORDER', {
        custom: {
          custom: {
            v1: this.orderedInstrumentList.join('|')
          }
        }
      });
    }
    this.props.triggerWebengageEvent({ amount: this.props.totalPayable });
    const codInstrumentCode = get(
      this.props,
      'paymentConfig.instrumentData.cod.code'
    );
    const isNuNudgeEnabled = isFeatureEnabled('NEW_USER_COD_NUDGE');
    if (
      get(this.props, 'cartData.userDetails.isFirstTimeCustomer') &&
      codInstrumentCode === INSTRUMENT_ELIGIBLE_CODE
    ) {
      const eventObj = {
        custom: {
          custom: {
            v1: getUidx(),
            v2: codInstrumentCode
          },
          widget: {
            name: isNuNudgeEnabled
              ? 'cod_preferred_method_highlight'
              : 'cod_eligible_new_user_flag',
            data_set: {
              entity_optional_attributes: this.props.totalPayable
            }
          }
        }
      };

      if (isNuNudgeEnabled) {
        triggerEvent('HIGHLIGHT_COD_NU_LOAD', eventObj);
      } else {
        triggerEvent('NOT_HIGHLIGHT_COD_NU_LOAD', eventObj);
      }
    }
    if (this.paymentOptionRef) {
      this.triggerObserver();
    }
    this.orderedInstrumentList.map(instrument => {
      const off = get(
        this,
        `props.inlineOffer.paymentInstruments.${instrument}`,
        ''
      );
      if (off && off.length > 0)
        triggerEvent('INLINE_OFFER_AVAILABLE', {
          custom: {
            custom: {
              v1: instrument
            }
          }
        });
    });
    if (isFeatureEnabled('INLINE_OFFER')) {
      let upiOptions = '';
      this.props.paymentOptions.paymentInstrumentDetails.map(instrument => {
        if (instrument.type === 'upi')
          upiOptions = instrument.paymentInstrumentDetails.data;
      });
      if (isAndroidApp() || isIOSApp())
        this.getNumberOfUpiOffers(
          get(this, `props.inlineOffer.paymentInstruments.upi`, ''),
          upiOptions,
          getKVPairValue('UPI_CONFIG').supportedUPI
        );
      else
        this.getNumberOfUpiOffersDesktop(
          get(this, `props.inlineOffer.paymentInstruments.upi`, ''),
          upiOptions,
          getKVPairValue('UPI_CONFIG').supportedUPI
        );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      get(prevProps, 'cartData.price.total') !==
        get(this.props, 'cartData.price.total') &&
      this.paymentOptionRef
    ) {
      this.triggerObserver();
    }
  }

  getInstalledUPIApps = () => {
    return new Promise(resolve => {
      getInstalledAppsPromise().then(({ installedApps }) => {
        resolve(installedApps);
      });
    });
  };

  getNumberOfUpiOffers = async (offer, instrumentData, switchConfig) => {
    if (!offer) return 0;
    let count = 0;
    let apps = [];
    apps = await this.getInstalledUPIApps();
    offer.forEach(off => {
      const code = off.bankCode.toLowerCase();
      if (
        switchConfig &&
        apps &&
        switchConfig.indexOf(code) != -1 &&
        (apps.indexOf(code) != -1 || apps.indexOf(off.bankCode) != -1)
      ) {
        (instrumentData || []).forEach(data => {
          if (data.bankCode.toLowerCase() == code && !data.disable) {
            count += off.offerDetails.length;
          }
        });
      }
    });
    this.setState({ upiAppsCount: count });
  };

  getNumberOfUpiOffersDesktop = (offer, instrumentData, switchConfig) => {
    if (!offer) return 0;
    let count = 0;
    offer.forEach(off => {
      const code = off.bankCode.toLowerCase();
      if (switchConfig && switchConfig.indexOf(code) != -1) {
        (instrumentData || []).forEach(data => {
          if (
            data.bankCode.toLowerCase() == code &&
            !data.disable &&
            data.popular
          ) {
            count += off.offerDetails.length;
          }
        });
      }
    });
    this.setState({ upiAppsCount: count });
  };

  setSavedInstrumentRef(node) {
    this.savedInstrumentRef = node;
  }

  setRecommendedInstrumentRef(node) {
    this.recommendedInstrumentRef = node;
  }

  setPaymentOptionRef(node) {
    this.paymentOptionRef = node;
  }

  triggerObserver() {
    const node = this.paymentOptionRef;
    try {
      const observer = new IntersectionObserver(
        (entries, observer) => {
          const entry = entries[0];
          if (entry.isIntersecting && entry.intersectionRatio === 1) {
            this.triggerScrollEvent();
            observer.unobserve(entry.target);
          }
        },
        {
          threshold: 1
        }
      );
      node && observer.observe(node);
    } catch (e) {
      node &&
        document.addEventListener(
          'scroll',
          onEnteringViewport(node, this.triggerScrollEvent)
        );
    }
  }

  triggerScrollEvent() {
    const orderAmount =
      get(this.props, 'cartData.price.total') +
      get(
        getAppliedInstrument('giftcard', get(this.props, 'cartData', {})),
        'value',
        0
      );
    triggerEvent('PAYMENTS_ICON_REVAMP', {
      custom: {
        custom: {
          v1: orderAmount
        },
        widget: {
          name: 'payment_cards_upi_flag'
        }
      }
    });
  }

  onSwitchTab(tabId) {
    if (this.recommendedInstrumentRef && tabId !== '') {
      this.recommendedInstrumentRef.clearSelection();
    } else if (this.savedInstrumentRef && tabId !== '') {
      this.savedInstrumentRef.clearSelection();
    }
  }

  onTabClick(e) {
    const tab = e.currentTarget.id;
    triggerEvent('PAYMENT_TAB_CLICK', {
      gaLabel: tab
    });

    tab === SAVED_INSTRUMENT && triggerEvent('OPEN_SAVED_CARDS');
  }

  closeTab() {
    this.props.mode === 'mobile' && triggerEvent('OPEN_SAVED_CARDS');
  }

  getOrderedInstrumentList() {
    let order;
    const isFirstTimeCustomer = get(
      this.props,
      'cartData.userDetails.isFirstTimeCustomer',
      false
    );

    const isPaymentOptionReorderEnabled = isFeatureEnabled(
      'PAYMENT_OPTION_REORDER'
    );
    const isPaymentOptionReorderV2Enabled = isFeatureEnabled(
      'PAYMENT_OPTION_REORDERV2'
    );

    const paymentPersonalizationConfig =
      getKVPairValue('CHECKOUT_PAYMENT_PERSONZALIZATION_CONFIG') || {};
    if (
      isFeatureEnabled('RECOMMENDED_OPTIONS') &&
      get(paymentPersonalizationConfig, 'enablePaymentOptionPersonalization') &&
      !(isFirstTimeCustomer && isPaymentOptionReorderEnabled)
    ) {
      order = get(
        this,
        'props.paymentOptions.paymentInstrumentDetails',
        []
      ).reduce(
        (acc, instrument) => {
          if (
            (instrument.type === CREDIT_CARD ||
              instrument.type === DEBIT_CARD) &&
            acc.indexOf(CARD_TYPE) === -1
          ) {
            acc.push(CARD_TYPE);
          }

          if (
            [
              GIFTCARD,
              LOYALTY_POINTS,
              MYNTRA_CREDIT,
              CREDIT_CARD,
              DEBIT_CARD
            ].indexOf(instrument.type) === -1
          ) {
            acc.push(instrument.type);
          }

          return acc;
        },
        [RECOMMENDED_INSTRUMENT]
      );
    } else {
      let paymentOptionOrdering = 'default';
      if (isPaymentOptionReorderEnabled && isFirstTimeCustomer) {
        paymentOptionOrdering = 'reorder';
      } else if (isPaymentOptionReorderV2Enabled) {
        paymentOptionOrdering = 'reorderV2';
      }
      order = get(getKVPairValue('PAYMENT_OPTIONS'), paymentOptionOrdering) || [
        SAVED_INSTRUMENT,
        PAY_LATER,
        COD,
        CARD_TYPE,
        UPI,
        WALLET_TYPE,
        NETBANKING,
        EMI_TYPE
      ];

      //for payment personalization replacing saved instrument with recommended isntrument
      if (isFeatureEnabled('RECOMMENDED_OPTIONS')) {
        order[0] = RECOMMENDED_INSTRUMENT;
      }
    }

    return order;
  }

  render() {
    const {
      props: {
        LayoutClass,
        styles,
        mode,
        defaultSelect,
        setRef,
        setPaymentFailureAttributes,
        showPaymentFailureHalfCard,
        creditsBalance,
        bankDiscount,
        outstandingAmount,
        updateCreditsBalance,
        toggleRetryGC,
        paymentConfig: { instrumentData, savedInstruments },
        paymentConfig,
        inlineOffer,
        ...restProps
      }
    } = this;
    const {
      cartData,
      paymentOptions,
      handlePaymentAction,
      addMyntraInstrumentsData,
      refreshPageData,
      updateStickyButton,
      switchTab,
      setLoader,
      updatePageData,
      isExchangeCart,
      payMode,
      retryGCappliedValue
    } = restProps;

    const { phase2Enabled = false } = getKVPairValue('SAVED_CARD_CONSENT');
    const isSavedCardPurged =
      get(paymentOptions, 'savedCardPurged', false) &&
      mode === 'mobile' &&
      phase2Enabled;
    const tabNameConfig = getKVPairValue('PAYMENT_TAB_NAME');
    const isSavedInstrumentsShownMobile =
      !isFeatureEnabled('RECOMMENDED_OPTIONS') &&
      ((savedInstruments &&
        savedInstruments.length <= 0 &&
        isSavedCardPurged) ||
        showSavedInstrumentsInMobile(
          mode,
          savedInstruments,
          outstandingAmount
        ));
    const isRecommendedInstrumentsShownMobile = showRecommendedInstrumentsInMobile(
      mode,
      instrumentData[RECOMMENDED_INSTRUMENT],
      outstandingAmount
    );
    return (
      <div>
        {mode === 'desktop' && (
          <div className={styles.pModeHeading}> Choose Payment Mode </div>
        )}
        <Notifications />
        <CreditsBlock
          payMode={payMode}
          cartData={cartData}
          creditsBalance={creditsBalance}
          paymentOptions={paymentOptions}
          deviceMode={mode}
          retryGCappliedValue={retryGCappliedValue}
          isExchangeCart={isExchangeCart}
          addMyntraInstrumentsData={addMyntraInstrumentsData}
          updateCreditsBalance={updateCreditsBalance}
          toggleRetryGC={toggleRetryGC}
          handlePaymentAction={handlePaymentAction}
          updatePageData={updatePageData}
          showTab={showTab}
          setLoader={setLoader}
        />
        {!showPaymentFailureHalfCard &&
          showSuggestionNotification(
            instrumentData[COD],
            outstandingAmount
          ) && <SuggestionNotification switchTab={switchTab} mode={mode} />}
        {isRecommendedInstrumentsShownMobile ? (
          <RecommendedInstruments
            ref={this.setRecommendedInstrumentRef}
            bankDiscount={bankDiscount}
            outstandingAmount={outstandingAmount}
            instrumentData={instrumentData[RECOMMENDED_INSTRUMENT]}
            deviceMode={mode}
            handlePaymentAction={handlePaymentAction}
            setPaymentFailureAttributes={setPaymentFailureAttributes}
            showPaymentFailureHalfCard={showPaymentFailureHalfCard}
            inlineOffer={inlineOffer}
            {...restProps}
          />
        ) : isSavedInstrumentsShownMobile ? (
          <SavedInstruments
            ref={this.setSavedInstrumentRef}
            bankDiscount={bankDiscount}
            deviceMode={mode}
            handlePaymentAction={handlePaymentAction}
            setPaymentFailureAttributes={setPaymentFailureAttributes}
            paymentConfig={paymentConfig}
            showPaymentFailureHalfCard={showPaymentFailureHalfCard}
            {...restProps}
          />
        ) : null}
        {mode === 'mobile' && (
          <div className={styles.tabBarHeading} ref={this.setPaymentOptionRef}>
            {isRecommendedInstrumentsShownMobile ||
            isSavedInstrumentsShownMobile
              ? 'OTHER PAYMENT OPTIONS'
              : 'PAYMENT OPTIONS'}
          </div>
        )}
        {outstandingAmount === '0' ? (
          <FreePurchase
            mode={mode}
            {...restProps}
            setPaymentFailureAttributes={setPaymentFailureAttributes}
          />
        ) : (
          <LayoutClass
            defaultSelect={defaultSelect}
            mode={mode}
            ref={setRef}
            className={styles.paymentOptionsBlock}
            onTabClick={this.onTabClick}
            onSwitchTab={this.onSwitchTab}
            closeTab={this.closeTab}
            isFirstTimeCustomer={get(
              this.props,
              'cartData.userDetails.isFirstTimeCustomer',
              false
            )}
          >
            {this.orderedInstrumentList.map((instrument, index) => {
              const createTab = getTabCreator(instrument);
              return (
                createTab &&
                createTab({
                  paymentConfig,
                  mode,
                  outstandingAmount,
                  bankDiscount,
                  handlePaymentAction,
                  refreshPageData,
                  updateStickyButton,
                  setPaymentFailureAttributes,
                  tabNameConfig,
                  showPaymentFailureHalfCard,
                  rank: index + 1,
                  inlineOffer,
                  ...this.state,
                  ...restProps
                })
              );
            })}
          </LayoutClass>
        )}
        {showTab(GIFTCARD, instrumentData[GIFTCARD], { outstandingAmount }) && (
          <GiftCard
            mode={mode}
            payMode={payMode}
            instrumentData={instrumentData[GIFTCARD]}
            handlePaymentAction={handlePaymentAction}
            refreshPageData={refreshPageData}
            updateStickyButton={updateStickyButton}
            className={styles.giftCardBlock}
          />
        )}
      </div>
    );
  }
}

PaymentOptions.defaultProps = {
  updateStickyButton: () => {}
};

export default PaymentOptions;
