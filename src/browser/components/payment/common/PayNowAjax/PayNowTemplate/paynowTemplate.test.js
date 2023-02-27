import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import PayNowTemplate from './';

describe('PaynowTemplate', () => {
  window.triggerEvent = () => {};
  window.SHELL = { redirectTo: () => {} };
  it('HTMLTemplate should render form with hidden elements', () => {
    const paynowResponse = {
      templateCode: 100,
      postURL:
        'https://test.ccavenue.com/bnk/servlet/processNbkReq?gtwID=AVN&requestType=PAYMENT',
      params: {
        RU: '100',
        oid: '1234567'
      }
    };
    const wrapper = mount(<PayNowTemplate paynowResponse={paynowResponse} />);

    expect(wrapper.find('HTMLPostTemplate').exists()).toBe(true);
    expect(wrapper.find('[name="RU"]').prop('value')).toEqual('100');
    expect(wrapper.find('[name="oid"]').prop('value')).toEqual('1234567');
  });

  it('RedirectTemplate should render nothing and redirect to given URL', () => {
    const paynowResponse = {
      templateCode: 101,
      postURL:
        'https://test.ccavenue.com/bnk/servlet/processNbkReq?gtwID=AVN&requestType=PAYMENT',
      params: {}
    };
    const spy = sinon.spy();
    window.SHELL.redirectTo = spy;
    const wrapper = mount(
      <PayNowTemplate paynowResponse={paynowResponse} closeLoader={() => {}} />
    );

    expect(wrapper.find('RedirectTemplate').exists()).toBe(true);
    expect(
      spy.calledOnceWith(
        'https://test.ccavenue.com/bnk/servlet/processNbkReq?gtwID=AVN&requestType=PAYMENT'
      )
    ).toBe(true);
  });

  it('PhonePeAndroidSdk should render nothing and redirect to given URL', () => {
    const paynowResponse = {
      templateCode: 103,
      postURL:
        'https://test.ccavenue.com/bnk/servlet/processNbkReq?gtwID=AVN&requestType=PAYMENT',
      params: {}
    };

    const spy = sinon.spy();
    window.SHELL.redirectTo = spy;
    const wrapper = mount(
      <PayNowTemplate paynowResponse={paynowResponse} closeLoader={() => {}} />
    );

    expect(wrapper.find('PhonePeAndroidSdkTemplate').exists()).toBe(true);
    expect(
      spy.calledOnceWith(
        'https://test.ccavenue.com/bnk/servlet/processNbkReq?gtwID=AVN&requestType=PAYMENT'
      )
    ).toBe(true);
  });

  it('OrderSucessTemplate should render nothing and redirect confirmation page', () => {
    const paynowResponse = {
      templateCode: 104,
      postURL: 'https://stage.myntra.com/checkout/confirm',
      params: {
        orderId: 1234567899876,
        cartContext: 'EGIFTCARD'
      }
    };

    const spy = sinon.spy();
    window.SHELL.redirectTo = spy;
    const wrapper = mount(
      <PayNowTemplate paynowResponse={paynowResponse} closeLoader={() => {}} />
    );

    expect(wrapper.find('OrderSucessTemplate').exists()).toBe(true);
    expect(
      spy.calledOnceWith(
        'https://stage.myntra.com/checkout/confirm?orderId=1234567899876&cartContext=EGIFTCARD'
      )
    ).toBe(true);
  });

  it('ErrorTemplate should call setPaymentFailureAttributes if errorAttributes are passed', () => {
    const paynowResponse = {
      templateCode: 105,
      postURL: null,
      params: {
        cartContext: 'EGIFTCARD',
        paymentErrorCode: 10001
      }
    };
    const setPaymentFailureAttributes = sinon.spy(() => {});
    const closeLoader = sinon.spy(() => {});
    const wrapper = mount(
      <PayNowTemplate
        paynowResponse={paynowResponse}
        closeLoader={closeLoader}
        setPaymentFailureAttributes={setPaymentFailureAttributes}
      />
    );

    expect(wrapper.find('ErrorTemplate').exists()).toBe(true);
    expect(setPaymentFailureAttributes.calledOnce).toBe(true);
    expect(closeLoader.calledOnce).toBe(true);
  });
});
