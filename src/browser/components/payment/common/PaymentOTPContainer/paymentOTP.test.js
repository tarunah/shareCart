import React from 'react';
import { mount } from 'enzyme';
import PaymentOTPContainer from '.';
import OtpScanner from 'commonComp/OtpScanner';

const mockParams = {
  amount: '100',
  transactionId: 'abcd1234',
  type: '1'
};

jest.mock('commonUtils/helper', () => ({
  ...jest.requireActual('commonUtils/helper'),
  getQueryParam: jest.fn(params => mockParams[params.name])
}));

describe('Payment OTP page', () => {
  const props = {
    deviceMode: 'desktop',
    history: { location: '', goBack: jest.fn(), push: jest.fn() },
    styles: {
      pageBackground: 'pageBackground',
      container: 'container',
      redirectToBank: 'redirectToBank',
      redirectIcon: 'redirectIcon',
      bankRedirectHeading: 'bankRedirectHeading',
      bankRedirectDesc: 'bankRedirectDesc',
      redirectIcon: 'redirectIcon',
      cancelConfirmModal: 'cancelConfirmModal',
      cancelConfirmModalHeader: 'cancelConfirmModalHeader',
      cancelConfirmModalDesc: 'cancelConfirmModalDesc',
      cancelConfirmModalButtonGroup: 'cancelConfirmModalButtonGroup'
    }
  };

  window.SHELL = { setActivePage: jest.fn() };
  window.triggerEvent = () => {};

  it('should display PaymentOTP page properly', () => {
    const wrapper = mount(<PaymentOTPContainer {...props} />);

    expect(wrapper.exists('.pageBackground')).toEqual(true);

    const paymentForm = wrapper.find('#paymentForm');
    expect(paymentForm.props().method).toEqual('POST');
    // expect(paymentForm.props().action).toEqual(
    //   'https://pps.myntra.com/myntra-payment-plan-service/v2/verifyPayment'
    // );
    expect(wrapper.find('[name="transactionId"]').prop('value')).toEqual(
      'abcd1234'
    );
    expect(wrapper.find('[name="otp"]').prop('value')).toEqual('');
    expect(wrapper.find('[name="instrumentType"]').prop('value')).toEqual('1');

    expect(wrapper.find(OtpScanner).length).toEqual(1);

    const bankRedirectForm = wrapper.find('#bankRedirectForm');
    expect(bankRedirectForm.props().method).toEqual('GET');
    // expect(bankRedirectForm.props().action).toEqual(
    //   'https://pps.myntra.com/myntra-payment-plan-service/v2/getBankRedirectTemplate/1/abcd1234'
    // );
    expect(wrapper.exists('.redirectToBank')).toEqual(true);
    expect(wrapper.find('.bankRedirectHeading').text()).toEqual(
      "Continue payment on bank's website."
    );
    expect(wrapper.find('.bankRedirectDesc').text()).toEqual(
      'You will be redirected to bank OTP page.'
    );
    expect(wrapper.exists('.redirectIcon')).toEqual(true);

    wrapper.setState({ cancelConfirmationShown: true });
    expect(wrapper.exists('.cancelConfirmModal')).toEqual(true);
    expect(wrapper.find('.cancelConfirmModalHeader').text()).toEqual(
      'Cancel Payment?'
    );
    expect(wrapper.find('.cancelConfirmModalDesc').text()).toEqual(
      'Are you sure you want to cancel payment?'
    );
    expect(wrapper.exists('.cancelConfirmModalButtonGroup')).toEqual(true);
  });
});
