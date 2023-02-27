import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { localStorageKeys } from 'commonUtils/constants';
import { props } from 'testUtils/paymentMockData';
import PaymentFailureHalfCard from './';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';

const {
  TRY_RETRY_TEXT,
  TRY_COD_TEXT,
  TRY_OTHER_TEXT
} = PaymentConstants.FAILURE_BUTTON_TEXT_MAP;

describe('Payment Failure HalfCard', () => {
  beforeEach(() => {
    window.triggerEvent = sinon.spy();
    window._checkout_ = {
      __myx_ab__: {},
      __myx_deviceData__: {}
    };
    localStorage.setItem(localStorageKeys.PAYMENT_MODE_ATTRIBUTES, '{}');
  });

  const instrumentDataMap = props.paymentConfig.instrumentData;

  const componentProps = {
    halfCardConfig: {
      threshold: 1,
      text:
        'Your order was not placed as there was a problem processing payment. How would you like to proceed?'
    },
    outstandingAmount: '1500',
    switchTab: sinon.spy()
  };

  const analyticsFunc = () => sinon.spy();

  const closePaymentFailureModal = () => sinon.spy();
  const retryPaymentMap = [
    '{"paymentMode":"upi","paymentModeName":"savedinstrument","modeAttributes":{"use_saved_card":"false","use_saved_vpa":"true","upiSdkEnabled":false,"cvv_code":"","other_cards":"false","payment_instrument":"a5687b20-2bef-48a5-b366-27a54a23e425","bank_cashback_eligible":"false","bank_cashback_amount":0,"address-sel":6189893,"user":"automation-6df4f9bb.cb67.4716.97c3.4ee935d3d71b4riuJLPT90"}}',
    '{"paymentMode":"netbanking","paymentModeName":"netbanking","modeAttributes":{"paymentProviderId":1}}',
    '{"paymentMode":"upi","paymentModeName":"upi","modeAttributes":{"paymentProviderId":"67","vpa":"","save_vpa":"on","upiSdkEnabled":""}}',
    '{"paymentMode":"netbanking","paymentModeName":"wallet","modeAttributes":{"wallet_enabled":"true","paymentProviderId":"78","wallet_amount":1326,"wallet_mobile":"9999999999"}}',
    '{"paymentMode":"netbanking","paymentModeName":"emi","modeAttributes":{"paymentProviderId":"73"}}'
  ];

  const codPaymentMap = [
    '{"paymentMode":"cod","paymentModeName":"cod","modeAttributes":{}}',
    '{"paymentMode":"cod","paymentModeName":"cod","modeAttributes":{"otp_input": "", "otp_enabled": "true"}}'
  ];

  const retryTogglesHalfCardMap = [
    '{"paymentMode":"creditcard","paymentModeName":"savedinstrument","modeAttributes":{}}',
    '{"paymentMode":"creditcard","paymentModeName":"card","modeAttributes":{}}'
  ];

  it('should not render payment failure halfcard if local storage is empty', () => {
    const wrapper = shallow(
      <PaymentFailureHalfCard
        {...componentProps}
        showHalfCard={true}
        closePaymentFailureModal={closePaymentFailureModal}
        instrumentDataMap={instrumentDataMap}
      />
    );
    expect(wrapper.find('.modal').length).toBe(0);
  });

  retryPaymentMap.forEach(storageKeyValue => {
    it('should test if payment failure halfcard renders with all components when all instruments are eligible and payment mode allows retry', () => {
      localStorage.setItem(
        localStorageKeys.PAYMENT_MODE_ATTRIBUTES,
        storageKeyValue
      );

      const wrapper = shallow(
        <PaymentFailureHalfCard
          {...componentProps}
          showHalfCard={true}
          closePaymentFailureModal={closePaymentFailureModal}
          instrumentDataMap={instrumentDataMap}
          analytics={analyticsFunc}
        />
      );
      expect(wrapper.find('.modal').length).toBe(1);
      expect(wrapper.find('.header').length).toBe(1);
      expect(wrapper.find('.headerText').text()).toEqual('Payment Failed');
      expect(wrapper.find('.container').length).toBe(1);
      expect(
        wrapper
          .find('.failureText')
          .text()
          .trim()
      ).toEqual(
        'Your order was not placed as there was a problem processing payment. How would you like to proceed?'
      );
      expect(wrapper.find('.toPayText').text()).toEqual(
        ' To Pay: <RuppeBold />1500'
      );
      expect(wrapper.find('Button').length).toBe(2);
      expect(wrapper.find('.primaryCta').props().children).toEqual(
        TRY_RETRY_TEXT
      );
      expect(wrapper.find('.secondaryCta').props().children).toEqual(
        TRY_COD_TEXT
      );
    });

    it('should test if payment failure halfcard renders with all components when all instruments, but cod, are eligible and payment mode allows retry', () => {
      localStorage.setItem(
        localStorageKeys.PAYMENT_MODE_ATTRIBUTES,
        storageKeyValue
      );

      let testSpecificInstrumentDataMap = JSON.parse(
        JSON.stringify(instrumentDataMap)
      );
      testSpecificInstrumentDataMap.cod.code = 3001;

      const wrapper = shallow(
        <PaymentFailureHalfCard
          {...componentProps}
          showHalfCard={true}
          closePaymentFailureModal={closePaymentFailureModal}
          instrumentDataMap={testSpecificInstrumentDataMap}
          analytics={analyticsFunc}
        />
      );
      expect(wrapper.find('.modal').length).toBe(1);
      expect(wrapper.find('.header').length).toBe(1);
      expect(wrapper.find('.headerText').text()).toEqual('Payment Failed');
      expect(wrapper.find('.container').length).toBe(1);
      expect(
        wrapper
          .find('.failureText')
          .text()
          .trim()
      ).toEqual(
        'Your order was not placed as there was a problem processing payment. How would you like to proceed?'
      );
      expect(wrapper.find('.toPayText').text()).toEqual(
        ' To Pay: <RuppeBold />1500'
      );
      expect(wrapper.find('Button').length).toBe(2);
      expect(wrapper.find('.primaryCta').props().children).toEqual(
        TRY_OTHER_TEXT
      );
      expect(wrapper.find('.secondaryCta').props().children).toEqual(
        TRY_RETRY_TEXT
      );
    });

    it('should test if payment failure halfcard renders with all components when instruments are NOT eligible', () => {
      localStorage.setItem(
        localStorageKeys.PAYMENT_MODE_ATTRIBUTES,
        storageKeyValue
      );

      const failedPaymentMode = shallow(
        <PaymentFailureHalfCard
          {...componentProps}
          showHalfCard={true}
          closePaymentFailureModal={closePaymentFailureModal}
          instrumentDataMap={instrumentDataMap}
          analytics={analyticsFunc}
        />
      )
        .instance()
        .getFailedPaymentMode();

      let testSpecificInstrumentDataMap = JSON.parse(
        JSON.stringify(instrumentDataMap)
      );
      testSpecificInstrumentDataMap.cod.code = 3001;
      testSpecificInstrumentDataMap[failedPaymentMode] = {
        code: 3001
      };

      const wrapper = shallow(
        <PaymentFailureHalfCard
          {...componentProps}
          showHalfCard={true}
          closePaymentFailureModal={closePaymentFailureModal}
          instrumentDataMap={testSpecificInstrumentDataMap}
          analytics={analyticsFunc}
        />
      );
      expect(wrapper.find('.modal').length).toBe(1);
      expect(wrapper.find('.header').length).toBe(1);
      expect(wrapper.find('.headerText').text()).toEqual('Payment Failed');
      expect(wrapper.find('.container').length).toBe(1);
      expect(
        wrapper
          .find('.failureText')
          .text()
          .trim()
      ).toEqual(
        'Your order was not placed as there was a problem processing payment. How would you like to proceed?'
      );
      expect(wrapper.find('.toPayText').text()).toEqual(
        ' To Pay: <RuppeBold />1500'
      );
      expect(wrapper.find('Button').length).toBe(1);
      expect(wrapper.find('.primaryCta').props().children).toEqual(
        TRY_OTHER_TEXT
      );
    });
  });

  codPaymentMap.forEach(storageKeyValue => {
    it('should test if payment failure halfcard renders with all components when all instruments are eligible and payment mode is COD', () => {
      localStorage.setItem(
        localStorageKeys.PAYMENT_MODE_ATTRIBUTES,
        storageKeyValue
      );

      const wrapper = shallow(
        <PaymentFailureHalfCard
          {...componentProps}
          showHalfCard={true}
          closePaymentFailureModal={closePaymentFailureModal}
          instrumentDataMap={instrumentDataMap}
          analytics={analyticsFunc}
        />
      );
      expect(wrapper.find('.modal').length).toBe(1);
      expect(wrapper.find('.header').length).toBe(1);
      expect(wrapper.find('.headerText').text()).toEqual('Payment Failed');
      expect(wrapper.find('.container').length).toBe(1);
      expect(
        wrapper
          .find('.failureText')
          .text()
          .trim()
      ).toEqual(
        'Your order was not placed as there was a problem processing payment. How would you like to proceed?'
      );
      expect(wrapper.find('.toPayText').text()).toEqual(
        ' To Pay: <RuppeBold />1500'
      );
      expect(wrapper.find('Button').length).toBe(2);
      expect(wrapper.find('.primaryCta').props().children).toEqual(
        TRY_RETRY_TEXT
      );
      expect(wrapper.find('.secondaryCta').props().children).toEqual(
        TRY_OTHER_TEXT
      );
    });

    it('should test if payment failure halfcard renders with all components when all instruments, but cod, are eligible', () => {
      localStorage.setItem(
        localStorageKeys.PAYMENT_MODE_ATTRIBUTES,
        storageKeyValue
      );

      let testSpecificInstrumentDataMap = JSON.parse(
        JSON.stringify(instrumentDataMap)
      );
      testSpecificInstrumentDataMap.cod.code = 3001;

      const wrapper = shallow(
        <PaymentFailureHalfCard
          {...componentProps}
          showHalfCard={true}
          closePaymentFailureModal={closePaymentFailureModal}
          instrumentDataMap={testSpecificInstrumentDataMap}
          analytics={analyticsFunc}
        />
      );
      expect(wrapper.find('.modal').length).toBe(1);
      expect(wrapper.find('.header').length).toBe(1);
      expect(wrapper.find('.headerText').text()).toEqual('Payment Failed');
      expect(wrapper.find('.container').length).toBe(1);
      expect(
        wrapper
          .find('.failureText')
          .text()
          .trim()
      ).toEqual(
        'Your order was not placed as there was a problem processing payment. How would you like to proceed?'
      );
      expect(wrapper.find('.toPayText').text()).toEqual(
        ' To Pay: <RuppeBold />1500'
      );
      expect(wrapper.find('Button').length).toBe(1);
      expect(wrapper.find('.primaryCta').props().children).toEqual(
        TRY_OTHER_TEXT
      );
    });
  });

  retryTogglesHalfCardMap.forEach(storageKeyValue => {
    it('should test if payment failure halfcard renders with all components when all instruments are eligible and payment mode is COD', () => {
      localStorage.setItem(
        localStorageKeys.PAYMENT_MODE_ATTRIBUTES,
        storageKeyValue
      );

      const wrapper = shallow(
        <PaymentFailureHalfCard
          {...componentProps}
          showHalfCard={true}
          closePaymentFailureModal={closePaymentFailureModal}
          instrumentDataMap={instrumentDataMap}
          analytics={analyticsFunc}
        />
      );
      expect(wrapper.find('.modal').length).toBe(1);
      expect(wrapper.find('.header').length).toBe(1);
      expect(wrapper.find('.headerText').text()).toEqual('Payment Failed');
      expect(wrapper.find('.container').length).toBe(1);
      expect(
        wrapper
          .find('.failureText')
          .text()
          .trim()
      ).toEqual(
        'Your order was not placed as there was a problem processing payment. How would you like to proceed?'
      );
      expect(wrapper.find('.toPayText').text()).toEqual(
        ' To Pay: <RuppeBold />1500'
      );
      expect(wrapper.find('Button').length).toBe(2);
      expect(wrapper.find('.primaryCta').props().children).toEqual(
        TRY_RETRY_TEXT
      );
      expect(wrapper.find('.secondaryCta').props().children).toEqual(
        TRY_COD_TEXT
      );
    });

    it('should test if payment failure halfcard renders with all components when all instruments, but cod, are eligible', () => {
      localStorage.setItem(
        localStorageKeys.PAYMENT_MODE_ATTRIBUTES,
        storageKeyValue
      );

      let testSpecificInstrumentDataMap = JSON.parse(
        JSON.stringify(instrumentDataMap)
      );
      testSpecificInstrumentDataMap.cod.code = 3001;

      const wrapper = shallow(
        <PaymentFailureHalfCard
          {...componentProps}
          showHalfCard={true}
          closePaymentFailureModal={closePaymentFailureModal}
          instrumentDataMap={testSpecificInstrumentDataMap}
          analytics={analyticsFunc}
        />
      );
      expect(wrapper.find('.modal').length).toBe(1);
      expect(wrapper.find('.header').length).toBe(1);
      expect(wrapper.find('.headerText').text()).toEqual('Payment Failed');
      expect(wrapper.find('.container').length).toBe(1);
      expect(
        wrapper
          .find('.failureText')
          .text()
          .trim()
      ).toEqual(
        'Your order was not placed as there was a problem processing payment. How would you like to proceed?'
      );
      expect(wrapper.find('.toPayText').text()).toEqual(
        ' To Pay: <RuppeBold />1500'
      );
      expect(wrapper.find('Button').length).toBe(1);
      expect(wrapper.find('.primaryCta').props().children).toEqual(
        TRY_OTHER_TEXT
      );
    });
  });
});
