import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import CouponsPage from './';
import CartManager from 'commonBrowserUtils/CartManager';
import Styles from './couponsPage.base.css';

beforeAll(() => {
  window._checkout_ = {
    __myx_deviceData__: {
      isApp: true
    }
  };
});

describe('Coupons Block for mobile', () => {
  window.triggerEvent = () => {};
  window.isFeatureEnabled = () => true;
  it('should display coupon block', () => {
    CartManager.applyAndGetCoupons = (coupons, successCB, errorCB) => {
      successCB({ coupons: [] });
    };

    const mockHandleCartAction = (method, data, successCB, errorCB) => {
      CartManager.applyAndGetCoupons(data, successCB, errorCB);
    };

    const wrapper = mount(
      <CouponsPage loading={false} handleCartAction={mockHandleCartAction} />
    );

    expect(wrapper.find('.couponsPageContainer').exists()).toBeTruthy();
    expect(wrapper.find('#coupon-input-field').exists()).toBeTruthy();
    expect(wrapper.find('.applyButton').exists()).toBeTruthy();
    expect(wrapper.find('.noCouponMessage').exists()).toBeTruthy();
  });
});
