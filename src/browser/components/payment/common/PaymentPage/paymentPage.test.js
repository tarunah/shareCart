import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import PaymentPage from './PaymentPage';

import PaymentsManager from 'commonBrowserUtils/PaymentsManager';
import ProfileManager from 'commonBrowserUtils/ProfileManager';
import { getPaymentConfig } from 'commonBrowserUtils/PaymentHelper';

import { props } from 'testUtils/paymentMockData';
import { cartMockData, gcBalance, lpBalance } from 'testUtils/cartMockData';

describe('Payment Page', () => {
  beforeEach(() => {
    window.SHELL = {
      setActivePage: sinon.spy(),
      redirectTo: sinon.spy(),
      alert: sinon.spy()
    };
  });

  window.triggerEvent = () => {};

  const options = {
    analytics: () => () => {},
    render: () => null,
    getCartStoreData: () => null,
    setCartStoreData: () => {},
    getAddressStoreData: () => {},
    getPaymentStoreData: () => {},
    cartData: cartMockData,
    history: {},
    updateCheckoutState: jest.fn()
  };

  window._checkout_ = {
    __myx_profile__: {
      email: 'abc@myntra.com',
      mobile: '1234567890'
    }
  };

  document.cookie = 'ilgim=true';

  it('tests state after PaymentPage mounts on success', async () => {
    ProfileManager.fetchDetails = cb => cb();
    PaymentsManager.getPageData = (options, scb, ecb) => {
      return new Promise(resolve => {
        resolve({
          cartData: cartMockData,
          gcBalance,
          lpBalance,
          httpStatus: 200
        });
      });
    };
    PaymentsManager.getPaymentOptions = (data, scb, ecb) => {
      scb(props.paymentOptions);
    };

    PaymentsManager.userTwoFAVerification = (data, scb, ecb) => {
      scb();
    };

    const wrapper = mount(<PaymentPage {...options} />);

    await new Promise(process.nextTick);

    expect(wrapper.state().cartData).toEqual(cartMockData);
    expect(wrapper.state().paymentOptions).toEqual(props.paymentOptions);
    expect(wrapper.state().paymentConfig).toEqual(
      getPaymentConfig(props.paymentOptions)
    );
    expect(wrapper.state().loading).toEqual(false);
    expect(wrapper.state().error).toEqual(null);
  });

  it('tests state after PaymentPage mounts on page data error', async () => {
    ProfileManager.fetchDetails = cb => cb();

    PaymentsManager.getPageData = (options, scb, ecb) => {
      return new Promise((_, reject) => {
        reject({
          code: '1001',
          message: 'Something went wrong.'
        });
      });
    };

    PaymentsManager.getPaymentOptions = (data, scb, ecb) => {
      scb(props.paymentOptions);
    };

    PaymentsManager.userTwoFAVerification = (data, scb, ecb) => {
      scb();
    };

    const wrapper = mount(<PaymentPage {...options} />);

    await new Promise(process.nextTick);

    expect(wrapper.state().cartData).toEqual(null);
    expect(wrapper.state().paymentOptions).toEqual(null);
    expect(wrapper.state().paymentConfig).toEqual(null);
    expect(wrapper.state().loading).toEqual(false);
    expect(wrapper.state().error.message).toEqual('Something went wrong.');
  });

  it('tests state after PaymentPage mounts on payment options error', async () => {
    ProfileManager.fetchDetails = cb => cb();

    PaymentsManager.getPageData = (options, scb, ecb) => {
      return new Promise(resolve => {
        resolve({
          cartData: cartMockData,
          gcBalance,
          lpBalance,
          httpStatus: 200
        });
      });
    };

    PaymentsManager.getPaymentOptions = (data, scb, ecb) => {
      ecb({
        error: { errorCode: 1000 },
        message: 'Payment options error',
        isPaymentOptions: true
      });
    };

    PaymentsManager.userTwoFAVerification = (data, scb, ecb) => {
      scb();
    };

    const wrapper = mount(<PaymentPage {...options} />);

    await new Promise(process.nextTick);

    expect(wrapper.state().cartData).toEqual(null);
    expect(wrapper.state().paymentOptions).toEqual(null);
    expect(wrapper.state().paymentConfig).toEqual(null);
    expect(wrapper.state().loading).toEqual(false);
    expect(wrapper.state().error.message).toEqual('Payment options error');
  });

  it('tests cod fallback not displaying after PaymentPage mounts on payment options error', async () => {
    window._checkout_.__myx_features__ = {
      'checkout.codFallback.enable': true
    };

    ProfileManager.fetchDetails = cb => cb();
    PaymentsManager.getPageData = (options, scb, ecb) => {
      return new Promise(resolve => {
        resolve({
          cartData: cartMockData,
          gcBalance,
          lpBalance,
          httpStatus: 200
        });
      });
    };
    PaymentsManager.getPaymentOptions = (data, scb, ecb) => {
      ecb({
        error: { errorCode: 1000 },
        message: 'Payment options error',
        isPaymentOptions: true
      });
    };

    PaymentsManager.userTwoFAVerification = (data, scb, ecb) => {
      scb();
    };

    const wrapper = mount(<PaymentPage {...options} />);

    await new Promise(process.nextTick);

    expect(wrapper.state().error.message).toEqual('Payment options error');
  });

  it('tests cod fallback displaying after PaymentPage mounts on payment options error', async () => {
    window._checkout_.__myx_features__ = {
      'checkout.codFallback.enable': true
    };

    window.sessionStorage.setItem('payment_options_error_count', 4);

    ProfileManager.fetchDetails = cb => cb();
    PaymentsManager.getPageData = (options, scb, ecb) => {
      return new Promise(resolve => {
        resolve({
          cartData: cartMockData,
          gcBalance,
          lpBalance,
          httpStatus: 200
        });
      });
    };
    PaymentsManager.getPaymentOptions = (data, scb, ecb) => {
      ecb({
        error: { errorCode: 1000 },
        message: 'Payment options error',
        isPaymentOptions: true
      });
    };

    PaymentsManager.userTwoFAVerification = (data, scb, ecb) => {
      scb();
    };

    const wrapper = mount(<PaymentPage {...options} />);

    await new Promise(process.nextTick);

    expect(
      wrapper.state().paymentOptions.paymentInstrumentDetails[0].type
    ).toEqual('cod');
  });
});
