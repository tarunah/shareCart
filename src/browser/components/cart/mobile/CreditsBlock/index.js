import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import Credits from 'commonComp/Credits';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import {
  cookieKeys,
  userActionTypes,
  checkoutPage
} from 'commonUtils/constants';
import {
  setCookie,
  getSelectedProductsCount,
  getTotalQuantityInCart
} from 'commonBrowserUtils/Helper';
import { getAppliedInstrument } from 'commonBrowserUtils/CartHelper';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

const CREDIT_AUTO_APPLY_OFF_COOKIE_EXPIRY = 60 * 60 * 1000;
const boundFuncs = ['creditsToggleSuccessCallback'];

class CreditsBlock extends React.Component {
  constructor(props) {
    super(props);
    this.isSuperCoinsCreditFGEnabled = isFeatureEnabled('PAY_VIA_SUPERCOINS');
    boundFuncs.forEach(method => (this[method] = this[method].bind(this)));
  }

  creditsToggleSuccessCallback(res, action) {
    this.props.updatePageData(res, { updateKey: 'cartData' });
    action === 'removeGiftCard' &&
      setCookie(
        cookieKeys.CREDIT_AUTO_APPLY_OFF_COOKIE,
        true,
        CREDIT_AUTO_APPLY_OFF_COOKIE_EXPIRY
      );
  }

  render() {
    const {
      cartData,
      creditsBalance,
      show,
      setLoader,
      updateCredits,
      isExchangeCart
    } = this.props;

    const cartId = get(cartData, 'id');
    const appliedGC = getAppliedInstrument('giftcard', cartData);
    const appliedLP = getAppliedInstrument('loyaltypoints', cartData);
    const giftcardApplicable = get(cartData, 'flags.giftcardApplicable', {});
    const loyaltyPointsApplicable = get(
      cartData,
      'flags.loyaltyPointsApplicable',
      {}
    );
    const cartCreditsConfig = getKVPairValue('CART_CREDIT_CONFIG');
    const selectedProductsCount = getSelectedProductsCount(
      get(cartData, 'products', [])
    );
    const totalQuantityInCart = getTotalQuantityInCart(
      get(cartData, 'products', [])
    );
    const cartTotal = get(cartData, 'price.total', 0);
    const isRefund =
      get(cartData, 'price.userAction') === userActionTypes.REFUND;

    return show ? (
      <Credits
        balance={creditsBalance}
        appliedGC={appliedGC}
        appliedLP={appliedLP}
        cartId={cartId}
        cartTotal={cartTotal}
        giftcardApplicable={giftcardApplicable}
        loyaltyPointsApplicable={loyaltyPointsApplicable}
        show={{
          mcShow: cartCreditsConfig.giftCard.show,
          lpShow: cartCreditsConfig.loyaltyPoints.show,
          scShow: this.isSuperCoinsCreditFGEnabled
        }}
        creditsToggleSuccessCallback={this.creditsToggleSuccessCallback}
        setLoader={setLoader}
        updateCredits={updateCredits}
        selectedProductsCount={selectedProductsCount}
        totalQuantityInCart={totalQuantityInCart}
        isExchangeCart={isExchangeCart}
        isRefund={isRefund}
        deviceMode="mobile"
        pagesource={checkoutPage.CART}
      />
    ) : null;
  }
}

CreditsBlock.propTypes = {
  show: PropTypes.bool,
  cartData: PropTypes.object,
  isExchangeCart: PropTypes.bool,
  updatePageData: PropTypes.func,
  setLoader: PropTypes.func
};

export default CreditsBlock;
