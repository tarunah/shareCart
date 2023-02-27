import React from 'react';
import { mount } from 'enzyme';

import OtpPage from '.';
import PaymentsManager from 'commonBrowserUtils/PaymentsManager';

const mockData = {
  mobile: 1234567890,
  transactionId: 'aqeiumz6390a',
  type: 'mobile'
};

jest.mock('commonUtils/helper', () => ({
  ...jest.requireActual('commonUtils/helper'),
  getQueryParam: jest.fn(params => mockData[params.name])
}));
jest.mock('commonBrowserUtils/PaymentsManager', () => jest.fn());

beforeEach(() => {
  window.SHELL = {};
  SHELL.setActivePage = jest.fn();
});

describe('OTP Page', () => {
  it('displaying mobile number', () => {
    const wrapper = mount(<OtpPage deviceMode="mobile" />);
    expect(wrapper.find('.otpScannerDesc').text()).toEqual(
      `Flipkart has sent you an OTP on your registered mobile number +91-${mockData['mobile']}`
    );
  });
});
