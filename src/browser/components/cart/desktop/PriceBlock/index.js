import React from 'react';
import get from 'lodash/get';

import PriceBreakUp from 'commonComp/PriceBreakUp';
import ExchangePriceDetailsInfo from 'commonComp/ExchangePriceDetailsInfo';
import Loader from 'commonComp/Loader';
import Loadable from 'commonComp/Loadable';
import ShippingTip from 'commonComp/ShippingTip';

import useModal from 'customHooks/useModal';
import useConstructor from 'customHooks/useConstructor';

import {
  transformPriceDetails,
  getTotal
} from 'commonBrowserUtils/transformPriceDetails';
import {
  getTaxBreakup,
  getSnackBarStyleOverrides
} from 'commonBrowserUtils/CartHelper';
import {
  isLoggedIn,
  isFreeEarlyAccess,
  getTryAndBuyOpted,
  errorNotification
} from 'commonBrowserUtils/Helper';
import { getCartFields } from 'commonBrowserUtils/priceBreakupFields';
import DiscountUtil from 'commonBrowserUtils/DiscountUtil';
import Strings from 'commonBrowserUtils/Strings';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

// Styles
import Styles from './priceBlock.base.css';

const CouponsModal = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "cartOptions",
      webpackPrefetch: true */
      '../OptionsBlock/Coupons/CouponsModal'
    ),
  loading: (props = {}) => <Loader show={true} backdrop={true} {...props} />,
  errorCallback: () => errorNotification({ message: Strings.BUNDLE_LOAD_ERROR })
});

let cartFields;

const PriceBlock = props => {
  const [isCouponModalShown, toggleState] = useModal(false);

  useConstructor(() => {
    cartFields = getCartFields();
  });

  const toggleCouponModal = () => {
    const { count } = props;
    if (count === 0) {
      const styleOverrides = getSnackBarStyleOverrides('desktop');
      SHELL.alert('info', {
        styleOverrides,
        message: 'Select at least one item in bag to apply coupons. '
      });
    } else {
      toggleState();
    }
  };

  let {
    data: {
      id: cartId,
      price: { charges: { data: charges = [] } = {} },
      price,
      products,
      flags,
      coupons,
      shippingData,
      shippingData: { shippingApplicableCharge },
      userDetails,
      userDetails: { returnAbuser },
      attachedProductOffers = {}
    },
    count,
    handleCartAction,
    isExchangeCart,
    totalQuantity,
    analytics
  } = props;

  const attachedProductDiscount = get(
    attachedProductOffers,
    'totalOfferAmount'
  );
  const isItemsSelected = count !== 0;

  const priceDetails = transformPriceDetails(
    DiscountUtil.getPrice(price),
    cartFields,
    {
      freeEarlyAccess: isFreeEarlyAccess(
        get(flags, 'coverFeeApplicable.remark')
      ),
      coupon: { show: !isFeatureEnabled('COUPON_DISABLED') },
      tryAndBuyOpted: getTryAndBuyOpted(products)
    },
    {
      tax: getTaxBreakup(price, products),
      shipping: {
        shippingApplicableCharge
      },
      coupon: {
        callback: toggleCouponModal,
        appliedCoupons: coupons,
        attachedProductDiscount: attachedProductDiscount
      }
    },
    isItemsSelected
  );

  if (
    isExchangeCart &&
    (totalQuantity > 1 ||
      get(flags, 'checkoutReady.remark') ===
        'TOO_MANY_PRODUCT_SELECTED_FOR_EXCHANGE')
  ) {
    return (
      <div className={Styles.container}>
        <div className={Styles.priceHeader}>PRICE DETAILS</div>
        <ExchangePriceDetailsInfo />
      </div>
    );
  }

  const total = getTotal(DiscountUtil.getPrice(price), getCartFields());

  return (
    <div className={Styles.container}>
      <div className={Styles.priceHeader}>
        PRICE DETAILS ({count} {count > 1 ? 'Items' : 'Item'})
      </div>
      <PriceBreakUp priceDetails={priceDetails} returnAbuser={returnAbuser} />
      {isItemsSelected &&
        isFeatureEnabled('CART_MESSAGING_REVAMP') &&
        isLoggedIn() && (
          <ShippingTip
            {...userDetails}
            shippingData={shippingData}
            charges={charges}
            total={total}
          />
        )}
      {isCouponModalShown && (
        <CouponsModal
          cancelCallback={toggleCouponModal}
          handleCartAction={handleCartAction}
          cartId={cartId}
          analytics={analytics}
        />
      )}
    </div>
  );
};

export default PriceBlock;
