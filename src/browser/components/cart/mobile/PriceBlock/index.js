import React from 'react';
import get from 'lodash/get';

// Components
import PriceBreakUp from '../../../common/PriceBreakUp';
import ExchangePriceDetailsInfo from 'commonComp/ExchangePriceDetailsInfo';
import { Redirect } from 'react-router';
import SavingsStrip from 'commonComp/SavingsStrip';
import ShippingTip from 'commonComp/ShippingTip';

// Utils
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
  priceBlockEvent,
  getUidx,
  isReturnAbuser
} from 'commonBrowserUtils/Helper';
import { getCartFields } from 'commonBrowserUtils/priceBreakupFields';
import DiscountUtil from 'commonBrowserUtils/DiscountUtil';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

// Styles
import Style from './priceBlock.base.css';

class PriceBlock extends React.PureComponent {
  constructor(props) {
    super(props);
    const { data: { shippingData = {} } = {} } = props;
    this.state = { redirectToCoupon: false };
    this.redirectToCoupon = this.redirectToCoupon.bind(this);
    this.fields = getCartFields(this.redirectToCoupon, shippingData);
    this.userUidx = getUidx();
  }

  componentDidMount() {
    priceBlockEvent(this.userUidx, this.props.data.price);
  }

  redirectToCoupon() {
    const { count } = this.props;
    if (count === 0) {
      const styleOverrides = getSnackBarStyleOverrides('mobile');
      SHELL.alert('info', {
        styleOverrides,
        message: 'Select at least one item in bag to apply coupons. '
      });
    } else {
      this.setState({ redirectToCoupon: true });
    }
  }

  render() {
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
        coverFeeOpted,
        userDetails,
        userDetails: { returnAbuser },
        attachedProductOffers = {}
      },
      count,
      dynamicStyles = {},
      isExchangeCart,
      totalQuantity
    } = this.props;

    const attachedProductDiscount = get(
      attachedProductOffers,
      'totalOfferAmount'
    );
    const isItemsSelected = count !== 0;
    let priceDetails = transformPriceDetails(
      DiscountUtil.getPrice(price),
      this.fields,
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
          callback: this.redirectToCoupon,
          appliedCoupons: coupons,
          attachedProductDiscount: attachedProductDiscount
        }
      },
      isItemsSelected
    );

    if (this.state.redirectToCoupon) {
      return (
        <Redirect
          to={{
            pathname: '/checkout/cart/coupons',
            state: { cartId }
          }}
          push
        />
      );
    }

    if (
      isExchangeCart &&
      (totalQuantity > 1 ||
        get(flags, 'checkoutReady.remark') ===
          'TOO_MANY_PRODUCT_SELECTED_FOR_EXCHANGE')
    ) {
      return (
        <div className={Style.container}>
          <div
            id="priceBlockHeader"
            className={`${Style.priceHeader}
                ${dynamicStyles.animatePriceBlockHeader ? Style.animate : ''}`}
          >
            PRICE DETAILS
          </div>
          <ExchangePriceDetailsInfo />
        </div>
      );
    }

    const total = getTotal(DiscountUtil.getPrice(price), getCartFields());

    return (
      <div className={Style.container} ref={this.props.ref}>
        <div
          id="priceBlockHeader"
          className={`${Style.priceHeader}
              ${dynamicStyles.animatePriceBlockHeader ? Style.animate : ''}`}
        >
          PRICE DETAILS ({count} {count > 1 ? 'Items' : 'Item'})
        </div>
        <div className={Style.priceBreakUpContainer}>
          <PriceBreakUp
            priceDetails={priceDetails}
            returnAbuser={returnAbuser}
            disableCouponLineItemInPrice={
              this.props.disableCouponLineItemInPrice
            }
          />
        </div>
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
      </div>
    );
  }
}

export default PriceBlock;
