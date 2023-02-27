import { expect } from 'chai';
import priceMockData from 'testUtils/priceMockData';
import {
  transformPriceDetails,
  getDisplayName,
  getTotal
} from './transformPriceDetails';
import { getCartFields } from './priceBreakupFields';
import { ItemListWithOffer } from 'testUtils/cartMockData';

window._checkout_ = {
  __myx_ab__: {}
};

describe('Get Total', () => {
  it('should have correct total value', () => {
    const cartFields = getCartFields();
    const total = getTotal(priceMockData, cartFields);
    expect(total).to.equal(1143.42);
  });
});

describe('Tranform Price Details for Cart', () => {
  let cartFields = getCartFields();
  let priceDetails = transformPriceDetails(priceMockData, cartFields);

  it('should maintain order of keys', () => {
    let lastIndex = -1;
    priceDetails.forEach(info => {
      expect(lastIndex).to.lessThan(info.key);
      lastIndex = info.key;
    });
  });

  it('should not display with value 0', () => {
    const bagDetails = priceDetails.find(
      info => info.name === getDisplayName()['bag']
    );
    expect(bagDetails).to.equal(undefined);
  });

  it('should display Apply Coupon when coupon discount is zero', () => {
    const couponDetails = priceDetails.find(
      info => info.name === getDisplayName()['coupon']
    );
    expect(couponDetails.displayText).to.equal('Apply Coupon');
    expect(couponDetails.show).to.equal(true);
  });

  it('should display the coupon discount when not zero even though coupon is disabled', () => {
    const priceDetails = transformPriceDetails(
      ItemListWithOffer.itemsList[0].price,
      cartFields,
      {
        coupon: { show: false }
      }
    );
    const couponDetails = priceDetails.find(
      info => info.name === getDisplayName()['coupon']
    );
    expect(couponDetails.displayValue).to.equal('3,369');
    expect(couponDetails.show).to.equal(true);
  });

  it('should not display Apply coupon when coupon is disabled', () => {
    const priceDetails = transformPriceDetails(priceMockData, cartFields, {
      coupon: { show: false }
    });
    const couponDetails = priceDetails.find(
      info => info.name === getDisplayName()['coupon']
    );
    expect(couponDetails.displayText).to.equal('Apply Coupon');
    expect(couponDetails.show).to.equal(false);
  });

  it('should display FREE when shipping charge is zero', () => {
    const shippingDetails = priceDetails.find(
      info => info.name === getDisplayName()['shipping']
    );
    expect(shippingDetails.displayText).to.equal('FREE');
  });
  it('should pass the prop based on field', () => {
    const priceDetails = transformPriceDetails(
      priceMockData,
      cartFields,
      {},
      { shipping: { info: 'xyz' } }
    );
    const shippingDetails = priceDetails.find(
      info => info.name === getDisplayName()['shipping']
    );
    expect(shippingDetails.info).to.equal('xyz');
  });
});
