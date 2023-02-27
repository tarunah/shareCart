import React from 'react';
import { mount } from 'enzyme';

import OTPScanner from './';

jest.mock('commonBrowserUtils/Helper', () => ({
  __esModule: true,
  ...jest.requireActual('commonBrowserUtils/Helper'),
  errorNotification: jest.fn()
}));

import { errorNotification } from 'commonBrowserUtils/Helper';

describe('OTP Scanner component', () => {
  /* Cannot be tested as the source refers to a real DOM node and bypasses the this.ref provided by React.
  
  it('prevents keying of non numeric values', () => {
    const preventDefault = jest.fn();
    const wrapper = mount(<OTPScanner />);
    const otpField = wrapper.find("input[id='otpField']").getDOMNode();
    const event = new KeyboardEvent('keydown', { keyCode: 37, bubbles: true });
    event.preventDefault = preventDefault;
    otpField.dispatchEvent(event);
    expect(preventDefault).toHaveBeenCalled();
  });

  it('allows keying of numeric values', () => {
    const preventDefault = jest.fn();
    const wrapper = mount(<OTPScanner />);
    const otpField = wrapper.find("input[id='otpField']").getDOMNode();
    const event = new KeyboardEvent('keydown', { keyCode: 50, bubbles: true });
    event.preventDefault = preventDefault;
    otpField.dispatchEvent(event);
    expect(preventDefault).not.toHaveBeenCalled();
  });


  it('should show error when submit is pressed with invalid OTP', () => {
    const wrapper = mount(<OTPScanner />);
    wrapper
      .find('input[id="otpField"]')
      .simulate('change', { currentTarget: { value: '@34312' } });
    wrapper.find('Button').simulate('click');
    expect(wrapper.find('.error').text()).toEqual('Please enter valid otp');
  });

   it('should call submit function if the entered OTP is valid', () => {
      const onSubmit = jest.fn();
      const wrapper = mount(<OTPScanner onSubmit={onSubmit} />);
      wrapper
        .find('input[id="otpField"]')
        .simulate('change', { currentTarget: { value: '134312' } });
      wrapper.find('Button').simulate('click');
      expect(onSubmit).toHaveBeenCalled();
    });
  */

  describe('OtpScanner Component: rendering for different contexts', () => {
    it('should display OtpScanner component properly for bnpl', () => {
      const wrapper = mount(<OTPScanner resendOtp={() => {}} context="bnpl" />);

      expect(wrapper.exists('.scanContainer')).toEqual(true);
      expect(wrapper.exists('.otpImage')).toEqual(true);
      expect(wrapper.find('.otpScannerHeading').text()).toEqual(
        'Enter One Time Password (OTP)'
      );
      expect(wrapper.find('.otpScannerDesc').text()).toEqual(
        'Flipkart has sent you an OTP on your registered mobile number'
      );
      expect(wrapper.exists('.otpInput')).toEqual(true);
      expect(wrapper.find('div.sendButton').text()).toEqual('CONFIRM');
      expect(wrapper.exists('.timerBlock')).toEqual(true);
    });

    it('should display OtpScanner component properly for paymentOTP', () => {
      const wrapper = mount(
        <OTPScanner resendOtp={() => {}} context="paymentOTP" />
      );

      expect(wrapper.exists('.scanContainer')).toEqual(true);
      expect(wrapper.exists('.otpImage')).toEqual(false);
      expect(wrapper.find('.otpScannerHeading').text()).toEqual(
        'Enter One Time Password (OTP)'
      );
      expect(wrapper.find('.otpScannerDesc').text()).toEqual(
        'Your bank has sent you an OTP on your registered mobile number'
      );
      expect(wrapper.exists('.otpInput')).toEqual(true);
      expect(wrapper.find('div.sendButton').text()).toEqual('PAY NOW');
      expect(wrapper.exists('.timerBlock')).toEqual(true);
      expect(wrapper.exists('.partnerTextBlock')).toEqual(true);
      expect(wrapper.find('.partnerTextContent').text()).toEqual(
        'We have partnered with payment partners to provide you fast and secure OTP experience.'
      );
    });
  });

  describe('Testing the functionality in the component', () => {
    it('should call onResendOTP prop when resend button is clicked', () => {
      const resendOTP = jest.fn();
      const wrapper = mount(
        <OTPScanner resendOtp={resendOTP} context="bnpl" />
      );
      wrapper.setState({ resendDisabled: false });
      wrapper.find('.resendOTP').simulate('click');
      expect(resendOTP).toHaveBeenCalled();
    });

    it('should update attemptsLeft when resend is successful', () => {
      const resendOTP = jest.fn((successCB, failureCB) => {
        successCB({ attemptsLeft: 2 });
      });
      const wrapper = mount(
        <OTPScanner resendOtp={resendOTP} context="bnpl" />
      );

      wrapper.setState({ resendDisabled: false });
      wrapper.find('.resendOTP').simulate('click');
      expect(wrapper.state().resendAttempts).toEqual(2);
    });

    it('should update attemptsLeft when resend is successful', () => {
      const onSubmit = jest.fn();
      const wrapper = mount(<OTPScanner onSubmit={onSubmit} context="bnpl" />);
      wrapper.instance().setOtpValue({ currentTarget: { value: '1234' } });
      wrapper.find('div.sendButton').simulate('click');
      expect(onSubmit).toHaveBeenCalled();
    });

    it('should call errorNotification if the resend otp fails in server and resendOTP should be enabled', () => {
      const resendOTP = jest.fn((successCB, failureCB) => {
        successCB({ code: 400 });
      });
      const wrapper = mount(
        <OTPScanner resendOtp={resendOTP} context="bnpl" />
      );
      wrapper.setState({ resendDisabled: false });
      wrapper.find('.resendOTP').simulate('click');
      expect(errorNotification).toHaveBeenCalled();
      expect(wrapper.find('.resendOTP').exists('.disabled')).toEqual(false);
      expect(wrapper.exists('.resendOTP')).toEqual(true);
    });

    it('should call errorNotification if the resend network otp call fails', () => {
      const resendOTP = jest.fn((successCB, failureCB) => {
        failureCB();
      });
      const wrapper = mount(
        <OTPScanner resendOtp={resendOTP} context="bnpl" />
      );
      wrapper.setState({ resendDisabled: false });
      wrapper.find('.resendOTP').simulate('click');
      expect(errorNotification).toHaveBeenCalled();
    });

    it('should enable the timer when resendOTP is successfull', () => {
      const resendOTP = jest.fn((successCB, failureCB) => {
        successCB({});
      });
      const wrapper = mount(
        <OTPScanner resendOtp={resendOTP} context="bnpl" />
      );
      wrapper.setState({ resendDisabled: false });
      wrapper.find('.resendOTP').simulate('click');
      expect(wrapper.exists('.timerBlock')).toEqual(true);
    });

    describe('Testing the timer component', () => {
      it('stopTimer should disable the timer and enable resendOTP button', () => {
        const wrapper = mount(<OTPScanner context="bnpl" />);
        wrapper.instance().stopTimer();

        //rendering the component with states updated by the stopTimer
        wrapper.setState(wrapper.instance().state);
        expect(wrapper.find('.disabled').exists('.otpScannerButton')).toEqual(
          false
        );
        expect(wrapper.exists('.timerBlock')).toEqual(false);
      });

      it('checks if the timer is mounted with defined amount of time', () => {
        const wrapper = mount(<OTPScanner context="bnpl" />);
        const timerWrapper = wrapper.find('Timer').props();
        expect(timerWrapper.seconds).toEqual(30);
      });
    });
  });
});
