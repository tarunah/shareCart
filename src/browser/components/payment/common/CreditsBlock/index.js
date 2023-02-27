import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import Credits from 'commonComp/Credits';

import {
  getProfileDetails,
  setCookie,
  getSelectedProductsCount,
  currencyValue
} from 'commonBrowserUtils/Helper';
import {
  getAppliedInstrument,
  checkExchangeCart
} from 'commonBrowserUtils/CartHelper';
import {
  getInstrumentData,
  getPaymentConfig
} from 'commonBrowserUtils/PaymentHelper';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';

import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import {
  cookieKeys,
  userActionTypes,
  checkoutPage
} from 'commonUtils/constants';

const { MYNTRA_CREDIT, LOYALTY_POINTS } = PaymentConstants;
const CREDIT_AUTO_APPLY_OFF_COOKIE_EXPIRY = 60 * 60 * 1000;
const boundFuncs = ['refreshPaymentOptions', 'creditsToggleSuccessCallback'];

class CreditsBlock extends React.PureComponent {
  constructor(props) {
    super(props);
    boundFuncs.forEach(method => (this[method] = this[method].bind(this)));
  }

  refreshPaymentOptions(cartData) {
    const outstandingAmount = get(cartData, 'price.total');
    const { id: cartId } = cartData;
    if (outstandingAmount) {
      return this.props.handlePaymentAction(
        'getPaymentOptions',
        {
          cartId,
          isExchangeCart: checkExchangeCart(cartData)
        },
        {
          updateKey: 'paymentOptions'
        },
        res => {
          this.props.updatePageData(getPaymentConfig(res), {
            updateKey: 'paymentConfig'
          });
        }
      );
    }
  }

  creditsToggleSuccessCallback(res, action) {
    this.props.updatePageData(res, { updateKey: 'cartData' });
    this.refreshPaymentOptions(res);
    isFeatureEnabled('CART_CREDIT') &&
      action === 'removeGiftCard' &&
      setCookie(
        cookieKeys.CREDIT_AUTO_APPLY_OFF_COOKIE,
        true,
        CREDIT_AUTO_APPLY_OFF_COOKIE_EXPIRY
      );
  }

  render() {
    const {
      creditsBalance,
      cartData,
      paymentOptions,
      setLoader,
      addMyntraInstrumentsData,
      showTab,
      deviceMode,
      payMode,
      retryGCappliedValue,
      updateCreditsBalance,
      toggleRetryGC
    } = this.props;

    let appliedGC;
    if (payMode === 'retry') {
      appliedGC = retryGCappliedValue ? { value: retryGCappliedValue } : null;
    } else {
      appliedGC = getAppliedInstrument('giftcard', cartData);
    }

    const appliedLP = getAppliedInstrument('loyaltypoints', cartData);
    const mcInstrumentData = getInstrumentData(paymentOptions, MYNTRA_CREDIT);
    const lpInstrumentData = getInstrumentData(paymentOptions, LOYALTY_POINTS);
    const selectedProductsCount = getSelectedProductsCount(
      get(cartData, 'products')
    );
    const cartTotal = currencyValue(get(cartData, 'price.total', 0));
    const isExchangeCart = checkExchangeCart(cartData);
    const isRefund =
      get(cartData, 'price.userAction') === userActionTypes.REFUND;
    const giftcardApplicable =
      payMode === 'retry'
        ? { value: true }
        : get(cartData, 'flags.giftcardApplicable', {});
    const loyaltyPointsApplicable =
      payMode === 'retry'
        ? { value: false }
        : get(cartData, 'flags.loyaltyPointsApplicable', {});

    return (
      <Credits
        payMode={payMode}
        pagesource={checkoutPage.PAYMENT}
        balance={creditsBalance}
        appliedGC={appliedGC}
        appliedLP={appliedLP}
        cartId={get(cartData, 'id')}
        cartTotal={cartTotal}
        giftcardApplicable={giftcardApplicable}
        loyaltyPointsApplicable={loyaltyPointsApplicable}
        deviceMode={deviceMode}
        isExchangeCart={isExchangeCart}
        isRefund={isRefund}
        show={{
          mcShow: showTab(MYNTRA_CREDIT, mcInstrumentData),
          lpShow: showTab(LOYALTY_POINTS, lpInstrumentData),
          scShow: false
        }}
        instrumentData={{ mc: mcInstrumentData, lp: lpInstrumentData }}
        creditsToggleSuccessCallback={this.creditsToggleSuccessCallback}
        addMyntraInstrumentsData={addMyntraInstrumentsData}
        updateCreditsBalance={updateCreditsBalance}
        toggleRetryGC={toggleRetryGC}
        setLoader={setLoader}
        selectedProductsCount={selectedProductsCount}
      />
    );
  }
}

CreditsBlock.propTypes = {
  creditsBalance: PropTypes.object,
  cartData: PropTypes.object,
  paymentOptions: PropTypes.object,
  updatePageData: PropTypes.func,
  setLoader: PropTypes.func,
  addMyntraInstrumentsData: PropTypes.func,
  showTab: PropTypes.func
};

export default CreditsBlock;
