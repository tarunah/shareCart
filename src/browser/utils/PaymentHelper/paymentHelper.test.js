import {
  getPaymentLoginUrl,
  getInstrumentTwoFAData,
  getWalletTabs,
  getPaymentConfig,
  getInstrumentData,
  createUrlWithQueryParams,
  consolidatePriceInstruments
} from '.';
import { props } from 'testUtils/paymentMockData';
import sinon from 'sinon';

describe('Payment Util', () => {
  beforeEach(() => {
    window.SHELL = {
      redirectTo: sinon.spy()
    };
    window._checkout_ = {
      __myx_profile__: {
        email: 'abc@myntra.com'
      }
    };
  });

  it('getPaymentLoginUrl - force true', () => {
    const result = getPaymentLoginUrl({ force: true });
    expect(result).toEqual('/login?referer=/checkout/payment&force=true');
  });
  it('getPaymentLoginUrl - force false', () => {
    const result = getPaymentLoginUrl({ force: false });
    expect(result).toEqual('/login?referer=/checkout/payment&force=');
  });
  it('getInstrumentTwoFAData', () => {
    let result = getInstrumentTwoFAData({
      enable2fa: true,
      enableEmailOTP: true,
      phoneNumbers: ['123', '456', '789']
    });
    expect(result).toEqual({
      enable: true,
      enableEmailOtp: true,
      mobileNumbers: ['123', '456', '789']
    });

    result = getInstrumentTwoFAData({
      enable2fa: true,
      enableEmailOTP: false,
      phoneNumbers: []
    });
    expect(result).toEqual({
      enable: false,
      enableEmailOtp: false,
      mobileNumbers: []
    });

    result = getInstrumentTwoFAData({
      enable2fa: false,
      enableEmailOTP: true,
      phoneNumbers: ['123']
    });
    expect(result).toEqual({
      enable: false,
      enableEmailOtp: true,
      mobileNumbers: ['123']
    });

    window._checkout_.__myx_profile__.email = '';

    result = getInstrumentTwoFAData({
      enable2fa: true,
      enableEmailOTP: true,
      phoneNumbers: []
    });
    expect(result).toEqual({
      enable: false,
      enableEmailOtp: true,
      mobileNumbers: []
    });
  });
  it('getWalletTabs', () => {
    const result = getWalletTabs({
      paymentInstrumentDetails: {
        data: [
          { id: 1, directDisplay: true },
          { id: 2, directDisplay: false },
          { id: 3, directDisplay: false }
        ]
      }
    });
    expect(result).toEqual([{ id: 1, directDisplay: true }]);
  });
  it('getPaymentConfig', () => {
    const result = getPaymentConfig(props.paymentOptions);

    const savedcard = getInstrumentData(props.paymentOptions, 'savedcard');
    const cod = getInstrumentData(props.paymentOptions, 'cod');
    const debitcard = getInstrumentData(props.paymentOptions, 'debitcard');
    const creditcard = getInstrumentData(props.paymentOptions, 'creditcard');
    const netbanking = getInstrumentData(props.paymentOptions, 'netbanking');
    const upi = getInstrumentData(props.paymentOptions, 'upi');
    const giftcard = getInstrumentData(props.paymentOptions, 'giftcard');
    const emi = getInstrumentData(props.paymentOptions, 'emi');
    const wallet = getInstrumentData(props.paymentOptions, 'wallet');
    const paylater = getInstrumentData(props.paymentOptions, 'paylater');

    Object.keys(result.instrumentData.cod).forEach(key => {
      expect(result.instrumentData.cod[key]).toEqual(cod[key]);
    });
    Object.keys(result.instrumentData.debitcard).forEach(key => {
      expect(result.instrumentData.debitcard[key]).toEqual(debitcard[key]);
    });
    Object.keys(result.instrumentData.creditcard).forEach(key => {
      expect(result.instrumentData.creditcard[key]).toEqual(creditcard[key]);
    });
    Object.keys(result.instrumentData.netbanking).forEach(key => {
      expect(result.instrumentData.netbanking[key]).toEqual(netbanking[key]);
    });
    Object.keys(result.instrumentData.upi).forEach(key => {
      expect(result.instrumentData.upi[key]).toEqual(upi[key]);
    });
    Object.keys(result.instrumentData.giftcard).forEach(key => {
      expect(result.instrumentData.giftcard[key]).toEqual(giftcard[key]);
    });
    Object.keys(result.instrumentData.emi).forEach(key => {
      expect(result.instrumentData.emi[key]).toEqual(emi[key]);
    });
    Object.keys(result.instrumentData.wallet).forEach(key => {
      expect(result.instrumentData.wallet[key]).toEqual(wallet[key]);
    });
    Object.keys(result.instrumentData.paylater).forEach(key => {
      expect(result.instrumentData.paylater[key]).toEqual(paylater[key]);
    });

    expect(result.walletConfig.walletTabs.length).toEqual(0);
  });

  describe('createUrlWithQueryParams', () => {
    it('should add the key value in params to the URL as query params', () => {
      const params = {
        redirectUrl: 'www.testcase.com',
        cartContext: 'EGFITCARD'
      };
      const url = 'https://stage.myntra.com/checkout/confirm';
      const resultUrl = createUrlWithQueryParams(url, params);

      expect(resultUrl).toEqual(
        'https://stage.myntra.com/checkout/confirm?redirectUrl=www.testcase.com&cartContext=EGFITCARD'
      );
    });

    it('should add the key value in params to the URL as query params along with other queryParams', () => {
      const params = {
        redirectUrl: 'www.testcase.com',
        cartContext: 'EGFITCARD'
      };
      const url = 'https://stage.myntra.com/checkout/confirm?queryParam=true';
      const resultUrl = createUrlWithQueryParams(url, params);

      expect(resultUrl).toEqual(
        'https://stage.myntra.com/checkout/confirm?queryParam=true&redirectUrl=www.testcase.com&cartContext=EGFITCARD'
      );
    });

    it('should return empty string when inputs are null', () => {
      expect(createUrlWithQueryParams(null, undefined)).toEqual('');
      expect(createUrlWithQueryParams('', undefined)).toEqual('');
      expect(createUrlWithQueryParams(null, null)).toEqual('');
    });
  });

  it('should test consolidatePriceInstruments', () => {
    let consolidatedInstruments = consolidatePriceInstruments(
      [
        { name: 'giftcard', value: 100 },
        { name: 'loyaltyPoints', value: 50 }
      ],
      { giftcard: 0, bankDiscount: 0 }
    );

    expect(consolidatedInstruments).toEqual([
      { name: 'giftcard', value: 100 },
      { name: 'loyaltyPoints', value: 50 },
      { name: 'bankDiscount', value: 0 }
    ]);

    consolidatedInstruments = consolidatePriceInstruments(
      [
        { name: 'giftcard', value: 100 },
        { name: 'loyaltyPoints', value: 50 }
      ],
      { giftcard: 0 }
    );

    expect(consolidatedInstruments).toEqual([
      { name: 'giftcard', value: 100 },
      { name: 'loyaltyPoints', value: 50 }
    ]);

    consolidatedInstruments = consolidatePriceInstruments(
      [
        { name: 'giftcard', value: 100 },
        { name: 'loyaltyPoints', value: 50 }
      ],
      {}
    );

    expect(consolidatedInstruments).toEqual([
      { name: 'giftcard', value: 100 },
      { name: 'loyaltyPoints', value: 50 }
    ]);

    consolidatedInstruments = consolidatePriceInstruments([], {
      giftcard: 0,
      bankDiscount: 0
    });

    expect(consolidatedInstruments).toEqual([
      { name: 'giftcard', value: 0 },
      { name: 'bankDiscount', value: 0 }
    ]);

    consolidatedInstruments = consolidatePriceInstruments([], {
      giftcard: 100,
      bankDiscount: 10
    });

    expect(consolidatedInstruments).toEqual([
      { name: 'giftcard', value: 100 },
      { name: 'bankDiscount', value: 10 }
    ]);

    consolidatedInstruments = consolidatePriceInstruments(
      [{ name: 'giftcard', value: 0 }],
      { giftcard: 100, bankDiscount: 10 }
    );

    expect(consolidatedInstruments).toEqual([
      { name: 'giftcard', value: 100 },
      { name: 'bankDiscount', value: 10 }
    ]);

    consolidatedInstruments = consolidatePriceInstruments(
      [
        { name: 'giftcard', value: 100 },
        { name: 'loyaltyPoints', value: 50 }
      ],
      { giftcard: 40, bankDiscount: 10 }
    );

    expect(consolidatedInstruments).toEqual([
      { name: 'giftcard', value: 140 },
      { name: 'loyaltyPoints', value: 50 },
      { name: 'bankDiscount', value: 10 }
    ]);
  });
});
