import React from 'react';

import { expect } from 'chai';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import sinon from 'sinon';
import CartManager from 'commonBrowserUtils/CartManager';

import Coupons from '.';

describe('Coupons Block for mobile', () => {
  window._checkout_ = {
    __myx_env__: {
      cookie: { prefix: '' }
    },
    __myx_deviceData__: {
      isApp: true
    }
  };
  window.isFeatureEnabled = () => true;

  it('should display Apply Coupon label', () => {
    const wrapper = mount(
      <Router>
        <Coupons />
      </Router>
    );
    expect(wrapper.text()).to.contain('Apply Coupon');
  });

  it('should display Offer heading when attached product offer is available', () => {
    window._checkout_ = {
      __myx_features__: {
        'checkout.attachedProducts.enabled': true
      }
    };
    const attachedProductOffers = {
      appliedOffers: [
        {
          offerText: '10% off',
          offerDescription: 'Buy from selected catalogue to get additional off',
          tagLink: 'https://www.myntra.com/myntra?f=Coupons:WINTER_BASE'
        }
      ],
      totalOfferAmount: 100
    };
    const wrapper = mount(
      <Router>
        <Coupons attachedProductOffers={attachedProductOffers} />
      </Router>
    );
    expect(wrapper.find('.header').text()).to.contain('OFFERS & COUPONS');
  });

  it('should show nudge when clicking on Apply Coupon label when selectedProductsCount is 0', () => {
    const alert = sinon.spy();
    window.triggerEvent = () => {};
    window.SHELL = { alert };
    const wrapper = mount(
      <Router>
        <Coupons selectedProductsCount={0} />
      </Router>
    );

    wrapper.find('ApplyCouponUI .coupon').simulate('click');
    expect(alert.getCall(0).args[1].message).to.equal(
      'Select at least one item in bag to apply coupons. '
    );
  });

  it('should display coupon count in label when coupons are already applied', () => {
    window.triggerEvent = () => {};
    const wrapper = mount(
      <Router>
        <Coupons discount={20} count={2} />
      </Router>
    );
    expect(wrapper.text()).to.contain('2 Coupons applied');
    expect(wrapper.text()).to.contain('You saved additional 20');
  });

  it('should display discount info when coupon is applied', () => {
    const wrapper = mount(
      <Router>
        <Coupons discount={2000} />
      </Router>
    );
    expect(wrapper.text()).to.contain('You saved additional 2,000');
  });

  it('should display tooltip when coupon is disabled', () => {
    const wrapper = mount(
      <Router>
        <Coupons disable={true} />
      </Router>
    );
    expect(wrapper.find('.toolTipText')).to.have.lengthOf(1);
  });

  it('should not make call to CartManager "applyAndGetCoupons" when feature is disabled', () => {
    window._checkout_.__myx_features__ = {
      'checkout.upfrontCouponSavings.enable': 'false'
    };
    window._checkout_.__myx_deviceData__ = { isApp: true };

    const spy = sinon.spy();
    const getCouponsStub = sinon.stub(CartManager, 'applyAndGetCoupons');
    getCouponsStub.callsFake(spy);

    mount(
      <Router>
        <Coupons />
      </Router>
    );

    expect(spy.callCount).to.equal(0);
    getCouponsStub.restore();
  });

  it('should not make call to CartManager "applyAndGetCoupons" when feature "CART_NEW_USER_PROPOSITIONS" is disabled', () => {
    window._checkout_.__myx_ab__ = {
      'cart.newusers': 'disabled'
    };
    window._checkout_.__myx_deviceData__ = { isApp: true };

    const spy = sinon.spy();
    const getCouponsStub = sinon.stub(CartManager, 'applyAndGetCoupons');
    getCouponsStub.callsFake(spy);

    mount(
      <Router>
        <Coupons />
      </Router>
    );

    expect(spy.callCount).to.equal(0);
    getCouponsStub.restore();
  });
});
