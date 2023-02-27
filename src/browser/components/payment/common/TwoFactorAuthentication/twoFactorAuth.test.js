import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { waitFor, render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TwoFactorAuthentication from './';
import { OTPScanner } from './TwoFactorAuthComponents';

describe('Two-Factor Authentication', () => {
  window.triggerEvent = () => {};
  it('renders mobileOtp and otpScanner screens properly', async () => {
    const wrapper = render(
      <MemoryRouter>
        <TwoFactorAuthentication
          numbers={['123', '456']}
          email="abc@myntra.com"
          mode="desktop"
          close={() => {}}
          handlePaymentAction={() => {}}
          submit={() => {}}
        />
      </MemoryRouter>
    );

    await waitFor(() => wrapper.getByText('OTP Verification required'));

    wrapper.getByText(
      'Select a mobile number to send OTP. You will also receive OTP on your registered email id:'
    );
    wrapper.getByText('abc@myntra.com');

    expect(wrapper.getAllByTestId('number').length).toBe(2);

    expect(wrapper.queryByTestId('otpScannerContainer')).toBeFalsy();

    fireEvent.click(wrapper.getByText('123'));
    fireEvent.click(wrapper.getByText('SEND OTP'));

    wrapper.getByTestId('otpScannerContainer');
    wrapper.getByText('ENTER OTP');
    wrapper.getByText('OTP sent to mobile number +91-123');
    wrapper.getByTestId('otpField');
    wrapper.getByText('CHANGE NUMBER');
    wrapper.getByText('RESEND OTP');
  });

  it('renders emailOtp screen and sendOtp is called in otpScanner', async () => {
    const handlePaymentMock = sinon.spy();
    const wrapper = render(
      <MemoryRouter>
        <TwoFactorAuthentication
          numbers={[]}
          email="abc@myntra.com"
          mode="desktop"
          close={() => {}}
          handlePaymentAction={handlePaymentMock}
          submit={() => {}}
        />
      </MemoryRouter>
    );

    await waitFor(() => wrapper.getByText('OTP Verification required'));

    wrapper.getByText(
      'You will receive the OTP on your registered email id: abc@myntra.com'
    );

    fireEvent.click(wrapper.getByText('SEND OTP'));

    wrapper.getByText('OTP sent to registered email abc@myntra.com');

    wrapper.getByTestId('otpField');
    expect(handlePaymentMock).toHaveProperty('callCount', 1);
  });

  it('timer is set in otpScanner and ', async () => {
    const handlePaymentMock = (fnName, data, options, successCallback) => {
      successCallback();
    };
    const wrapper = render(
      <MemoryRouter>
        <TwoFactorAuthentication
          numbers={['123', '456']}
          email="abc@myntra.com"
          mode="desktop"
          close={() => {}}
          handlePaymentAction={handlePaymentMock}
          submit={() => {}}
        />
      </MemoryRouter>
    );

    await waitFor(() => fireEvent.click(wrapper.getByText('SEND OTP')));

    wrapper.getByText('Resend OTP in');
    wrapper.getByText('RESEND OTP');
  });

  it('timer is not set in otpScanner, error is displayed and changeNumber is clicked', async () => {
    const handlePaymentMock = (
      fnName,
      data,
      options,
      successCallback,
      errorCallback
    ) => {
      errorCallback();
    };

    const wrapper = render(
      <MemoryRouter>
        <TwoFactorAuthentication
          numbers={['123', '456']}
          email="abc@myntra.com"
          mode="desktop"
          close={() => {}}
          handlePaymentAction={handlePaymentMock}
          submit={() => {}}
        />
      </MemoryRouter>
    );

    await waitFor(() => fireEvent.click(wrapper.getByText('SEND OTP')));

    expect(wrapper.queryByTestId('twoFAtimerBlock')).toBeFalsy();

    wrapper.getByText('CHANGE NUMBER');
    wrapper.getByText('RESEND OTP');
    wrapper.getByText('Failed to send OTP');

    const otpScanner = wrapper.getByTestId('otpField');
    fireEvent.change(otpScanner, { target: { value: '23' } });
    fireEvent.change(otpScanner, { target: { value: '1234' } });
    expect(otpScanner.value).toBe('1234');

    fireEvent.click(wrapper.getByText('CHANGE NUMBER'));
    wrapper.getByText('OTP Verification required');
  });
});
