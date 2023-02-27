import sinon from 'sinon';
import ExpressCheckout from './ExpressCheckout';
import { shallow } from 'enzyme';
import React from 'react';
import { expressCheckoutData, addressData } from './mock';

describe('Test ExpressCheckout', () => {
  const props = {
    expressCheckoutData,
    twoFA: {
      callback: sinon.spy(),
      disabled: false,
      display: false,
      otp: null
    },
    captchaDetails: {
      display: false,
      id: null,
      code: null,
      callback: () => {}
    },
    data: {
      price: {}
    },
    addressData,
    cvvError: null,
    section: 'default',
    showDetails: true,
    loading: false,
    showExpressCheckoutHalfCard: true,
    setContentRef: sinon.spy(),
    toggleTwoFA: sinon.spy(),
    handleTwoFASubmit: sinon.spy(),
    disableTwoFA: sinon.spy(),
    toggleDetails: sinon.spy(),
    updateCVV: sinon.spy(),
    updateBankDiscount: sinon.spy(),
    getNewPaymentForm: sinon.spy(),
    makePayment: sinon.spy()
  };
  it('should test if express checkout renders with all components', () => {
    const wrapper = shallow(<ExpressCheckout {...props} />);
    expect(wrapper.find('.expressContent').length).toBe(2);
    expect(wrapper.find('.innerExpressContent').length).toBe(1);
    expect(wrapper.find('.moreDetails').length).toBe(1);
    expect(wrapper.find('.backIcon').length).toBe(1);
    expect(wrapper.find('.slideOut').length).toBe(1);
    expect(wrapper.find('.sectionHead').length).toBe(1);
    wrapper.find('.sectionHead').simulate('click');
    expect(props.toggleDetails.callCount).toBe(1);

    expect(wrapper.find('DeliveryAddress').exists()).toBe(true);
    expect(wrapper.find('ItemArrivalInfo').exists()).toBe(true);
    expect(wrapper.find('PaymentSection').exists()).toBe(true);
    expect(wrapper.find('ActionButton').exists()).toBe(true);
    expect(wrapper.find('ArrivalDetails').exists()).toBe(true);
  });

  it('should test two FA', () => {
    props.twoFA.display = true;
    const wrapper = shallow(<ExpressCheckout {...props} />);
    expect(wrapper.find('TwoFactorAuthentication').exists()).toBe(true);
  });

  it('should test captcha verification', () => {
    props.captchaDetails.display = true;
    const wrapper = shallow(<ExpressCheckout {...props} />);
    expect(wrapper.find('CaptchaVerification').exists()).toBe(true);
  });

  it('should test loader', () => {
    props.twoFA.display = false;
    props.loading = true;
    const wrapper = shallow(<ExpressCheckout {...props} />);
    expect(wrapper.find('Loader').exists()).toBe(true);
  });
});
