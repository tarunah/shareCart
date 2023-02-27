import React from 'react';
import { mount } from 'enzyme';
import PayNowAjax from './';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import PaymentConstants from '../../../../utils/PaymentConstants';
import PaymentsManager from 'commonBrowserUtils/PaymentsManager';

let props = {};

describe('Pay Now Ajax ', () => {
  beforeEach(() => {
    props = {
      paymentOptions: {
        formSubmitUrl: 'https://pps.myntra.com',
        csrfToken: 'testToken'
      },
      cartId: 'testCartId1',
      paymentModeName: 'test',
      paymentMode: 'test',
      actionData: {
        enabled: true
      },
      twoFA: {
        disabled: false,
        otp: '111'
      },
      myntraInstrumentsData: {
        testKey: 'testValue',
        twofa_mc_data: {
          enable: true,
          mobileNumbers: ['1234567890'],
          enableEmailOtp: true
        },
        twofa_lp_data: {
          enable: true,
          mobileNumbers: ['1234567890', '1234567890', '1234567890'],
          enableEmailOtp: true
        }
      },
      instrumentData: {
        paymentInstrumentDetails: {
          enable2fa: true,
          phoneNumbers: ['1234567890', '0123456789'],
          enableEmailOTP: false
        },
        type: 'test'
      }
    };
    PaymentsManager.paynow = jest.fn(() => {});
  });
  it('should create pay now ajax data', () => {
    const wrapper = mount(<PayNowAjax {...props} />);

    const ajaxObject = wrapper.instance().getPayNowBaseData();

    expect(ajaxObject['csrf']).toEqual('testToken');
    expect(ajaxObject['cartContext']).toEqual('default');
    expect(ajaxObject['cartId']).toEqual('testCartId1');
    expect(ajaxObject['clientContext']).toEqual('responsive');
    expect(ajaxObject['paymentMethods']).toEqual('test');
    expect(ajaxObject['profile']).toEqual('localhost');

    expect(ajaxObject['xMetaApp']).toEqual('deviceID=');
  });

  it('verify onsubmit - with 2fa', () => {
    const triggerSpy = sinon.spy();
    window.triggerEvent = triggerSpy;
    const setLoaderMock = (loaderState, scb) => {
      expect(loaderState).toBe(true);
      scb && scb();
    };

    const toggle2FAmock = params => {
      if (params) {
        expect(params.callback).not.toBe(null);
        params.callback();
      }
    };

    const wrapper = mount(
      <PayNowAjax
        {...props}
        setLoader={setLoaderMock}
        toggleTwoFA={toggle2FAmock}
      />
    );

    wrapper.find('#action-test').simulate('click');
    // PROCEED_TO_PAY  and SUBMIT_TWOFA
    expect(triggerSpy.callCount).toBe(1);
  });

  it('verify onsubmit - with 2fa - toggle2fa args - mobile numbers - mc', () => {
    const triggerSpy = sinon.spy();
    window.triggerEvent = triggerSpy;
    const setLoaderMock = (loaderState, scb) => {
      expect(loaderState).toBe(true);
      scb && scb();
    };

    const toggle2FAmock = params => {
      if (params) {
        expect(params.callback).not.toBe(null);
        expect(params.enableEmailOtp).toBe(true);
        expect(params.mobileNumbers.length).toBe(1);
        expect(params.paymentModes.length).toBe(3);
        expect(
          params.paymentModes.indexOf(
            PaymentConstants.TWO_FA_PAYMENT_MODE_MAPPING.mc
          )
        ).not.toBe(-1);
        expect(
          params.paymentModes.indexOf(
            PaymentConstants.TWO_FA_PAYMENT_MODE_MAPPING.lp
          )
        ).not.toBe(-1);
        expect(params.paymentModes.indexOf('TEST')).not.toBe(-1);
        params.callback();
      }
    };

    const wrapper = mount(
      <PayNowAjax
        {...props}
        setLoader={setLoaderMock}
        toggleTwoFA={toggle2FAmock}
      />
    );

    wrapper.find('#action-test').simulate('click');
    // PROCEED_TO_PAY  and SUBMIT_TWOFA
    expect(triggerSpy.callCount).toBe(1);
  });

  it('verify onsubmit - with 2fa - toggle2fa args - mobile numbers - instrument', () => {
    const triggerSpy = sinon.spy();
    window.triggerEvent = triggerSpy;
    const setLoaderMock = (loaderState, scb) => {
      expect(loaderState).toBe(true);
      scb && scb();
    };

    const toggle2FAmock = params => {
      if (params) {
        expect(params.callback).not.toBe(null);
        expect(params.enableEmailOtp).toBe(false);
        expect(params.mobileNumbers.length).toBe(2);
        expect(params.paymentModes.length).toBe(1);
        expect(params.paymentModes.indexOf('TEST')).not.toBe(-1);
        params.callback();
      }
    };

    props.myntraInstrumentsData.twofa_mc_data.enable = false;
    props.myntraInstrumentsData.twofa_lp_data.enable = false;

    const wrapper = mount(
      <PayNowAjax
        {...props}
        setLoader={setLoaderMock}
        toggleTwoFA={toggle2FAmock}
      />
    );

    wrapper.find('#action-test').simulate('click');
    // PROCEED_TO_PAY  and SUBMIT_TWOFA
    expect(triggerSpy.callCount).toBe(1);
  });

  it('verify onsubmit - with 2fa - toggle2fa args - mobile numbers - lp', () => {
    const triggerSpy = sinon.spy();
    window.triggerEvent = triggerSpy;
    const setLoaderMock = (loaderState, scb) => {
      expect(loaderState).toBe(true);
      scb && scb();
    };

    const toggle2FAmock = params => {
      if (params) {
        expect(params.callback).not.toBe(null);
        expect(params.enableEmailOtp).toBe(true);
        expect(params.mobileNumbers.length).toBe(3);
        expect(params.paymentModes.length).toBe(2);
        expect(
          params.paymentModes.indexOf(
            PaymentConstants.TWO_FA_PAYMENT_MODE_MAPPING.lp
          )
        ).not.toBe(-1);
        expect(params.paymentModes.indexOf('TEST')).not.toBe(-1);
        params.callback();
      }
    };

    props.myntraInstrumentsData.twofa_mc_data.enable = false;

    const wrapper = mount(
      <PayNowAjax
        {...props}
        setLoader={setLoaderMock}
        toggleTwoFA={toggle2FAmock}
      />
    );

    wrapper.find('#action-test').simulate('click');
    // PROCEED_TO_PAY  and SUBMIT_TWOFA
    expect(triggerSpy.callCount).toBe(1);
  });

  it('verify onsubmit - without 2fa', () => {
    const triggerSpy = sinon.spy();
    window.triggerEvent = triggerSpy;
    const setLoaderMock = (loaderState, scb) => {
      expect(loaderState).toBe(true);
      scb && scb();
    };

    const toggle2FAmock = sinon.spy();

    const newProps = { ...props };
    newProps.twoFA.disabled = true;
    newProps.twoFA.otp = '';

    const wrapper = mount(
      <PayNowAjax
        {...newProps}
        setLoader={setLoaderMock}
        toggleTwoFA={toggle2FAmock}
      />
    );

    wrapper.find('#action-test').simulate('click');
    // PROCEED_TO_PAY
    expect(triggerSpy.callCount).toBe(1);
    expect(toggle2FAmock.callCount).toBe(0);
  });

  it('verify onsubmit - without 2fa - BNPL', () => {
    const triggerSpy = sinon.spy();
    window.triggerEvent = triggerSpy;
    const setLoaderMock = (loaderState, scb) => {
      expect(loaderState).toBe(true);
      scb && scb();
    };

    const toggle2FAmock = sinon.spy();

    props.paymentMode = 'paylater';
    props.paymentModeName = 'paylater';
    const wrapper = mount(
      <PayNowAjax
        {...props}
        setLoader={setLoaderMock}
        toggleTwoFA={toggle2FAmock}
      />
    );

    wrapper.find('#action-paylater').simulate('click');
    expect(toggle2FAmock.callCount).toBe(0);
  });
});
