import React from 'react';
import { mount } from 'enzyme';
import RecommendedInstruments from './';
import PaymentManager from 'commonBrowserUtils/PaymentsManager';

const props = {
  paymentOptions: {
    csrfToken: 'testToken'
  },
  cartData: {
    id: 'testCartId1'
  },
  instrumentData: [
    {
      type: 'wallet',
      paymentInstrumentDetails: {
        data: [
          {
            id: 3,
            name: 'PayPal',
            bankCode: 'PayPal',
            disable: false,
            directIntegration: true,
            directDisplay: false
          }
        ],
        enable2fa: false,
        enableEmailOTP: false,
        paymentUrl:
          'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
      }
    },
    {
      type: 'cod',
      paymentInstrumentDetails: {
        data: [
          {
            cashOnly: false,
            firstTimeUser: false
          }
        ],
        enable2fa: false,
        phoneNumbers: ['9950580066'],
        enableEmailOTP: false,
        paymentUrl: 'https://pps.myntra.com/myntra-payment-plan-service/v3/buy'
      }
    },
    {
      type: 'netbanking',
      paymentInstrumentDetails: {
        data: [
          {
            id: 1,
            name: 'Axis Bank',
            defaultBank: false,
            lowSuccessRate: false,
            popular: true,
            disable: false
          }
        ],
        enable2fa: false,
        enableEmailOTP: false,
        paymentUrl:
          'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
      }
    },
    {
      type: 'savedinstrument',
      paymentInstrumentDetails: {
        data: [
          {
            paymentInstrumentType: 'card',
            lowSuccessRate: false,
            lastSuccessfulTransaction: 1575486493,
            maskedCardNumber: '607431xxxxxx7018',
            encryptedCardNumber: null,
            instrumentId: '606301280855795524',
            defaultInstrument: false,
            cardHolderName: 'Chetan choudhary',
            cardType: 'RUPAY',
            expired: false,
            inValid: false,
            bankName: '',
            cardBankName: 'State Bank of India',
            expiryMonth: '01',
            expiryYear: '24',
            productType: 'Debit Card',
            paymentInstrumentId: null,
            disable: false,
            paymentMaskedNumber: '**** 7018'
          }
        ],
        enable2fa: false,
        enableEmailOTP: false,
        paymentUrl:
          'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
      }
    },
    {
      type: 'savedinstrument',
      paymentInstrumentDetails: {
        data: [
          {
            paymentInstrumentType: 'vpa',
            lowSuccessRate: false,
            lastSuccessfulTransaction: 0,
            vpa: 'h.acholia99@okicici',
            payerAccountName: '',
            appName: 'Google Pay',
            instrumentId: 'faa947f8-cb9b-44e6-b0c1-12611ec481c3',
            updatedOn: 1581072902000
          }
        ],
        enable2fa: false,
        enableEmailOTP: false,
        paymentUrl:
          'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
      }
    },
    {
      type: 'paylater',
      paymentInstrumentDetails: {
        data: [
          {
            id: 1,
            name: 'Buy Now Pay Later',
            status: null,
            loginType: null,
            availableCredit: null,
            tncAccepted: false,
            tncUrl: null,
            authenticationRequired: false,
            providerCode: 20006,
            applicable: false,
            disable: true
          }
        ],
        enable2fa: false,
        enableEmailOTP: false,
        paymentUrl:
          'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
      }
    },
    {
      type: 'upi',
      paymentInstrumentDetails: {
        data: [
          {
            id: 70,
            bankCode: 'GooglePay',
            name: 'Google Pay',
            defaultBank: false,
            lowSuccessRate: false,
            popular: true,
            disable: false
          }
        ],
        enable2fa: false,
        enableEmailOTP: false,
        paymentUrl:
          'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
      }
    }
  ],
  twoFA: { disabled: false },
  myntraInstrumentsData: {},
  addressData: {
    id: 'testAddress1',
    country: { name: 'testCountry1' },
    user: { name: 'testUName', email: 'testEmail', mobile: '11111' },
    state: { name: 'testStateName' },
    streetAddress: 'testStreetAddress',
    city: 'testCity',
    pincode: '567777'
  }
};

describe('Recommended Instruments', () => {
  beforeEach(() => {
    window._checkout_ = {
      __myx_profile__: {
        uidx: 'testUser1'
      }
    };
    PaymentManager.getPlutusEligibility = () => {};

    window.SHELL = {
      alert: () => {}
    };

    window.triggerEvent = () => {};
  });

  it('should display recommended instruments in desktop', () => {
    const wrapper = mount(
      <RecommendedInstruments
        {...props}
        deviceMode="desktop"
        handlePaymentAction={() => {}}
        setLoader={() => {}}
        updateStickyButton={() => {}}
      />
    );

    expect(
      wrapper.find('.recommendedInstrumentsDesktopHeading').text()
    ).toEqual('Recommended Payment Options');

    expect(wrapper.find('.recommendedInstrumentContainer').length).toEqual(1);

    const instrument1 = wrapper
      .find('.recommendedInstrumentContainer')
      .childAt(0);
    const instrument2 = wrapper
      .find('.recommendedInstrumentContainer')
      .childAt(1);
    const instrument3 = wrapper
      .find('.recommendedInstrumentContainer')
      .childAt(2);
    const instrument4 = wrapper
      .find('.recommendedInstrumentContainer')
      .childAt(3);
    const instrument5 = wrapper
      .find('.recommendedInstrumentContainer')
      .childAt(4);
    const instrument6 = wrapper
      .find('.recommendedInstrumentContainer')
      .childAt(5);
    const instrument7 = wrapper
      .find('.recommendedInstrumentContainer')
      .childAt(6);

    expect(instrument1.find('div#reco_wallet-3').length).toEqual(1);
    expect(instrument2.find('div#reco_cod-cod').length).toEqual(1);
    expect(instrument3.find('div#reco_netbanking-1').length).toEqual(1);
    expect(
      instrument4.find('div#reco_savedinstrument-606301280855795524').length
    ).toEqual(1);
    expect(
      instrument5.find(
        'div#reco_savedinstrument-faa947f8-cb9b-44e6-b0c1-12611ec481c3'
      ).length
    ).toEqual(1);
    expect(instrument6.find('div#reco_paylater-paylater').length).toEqual(1);
    expect(instrument7.find('div#reco_upi-70').length).toEqual(1);
  });

  it('should display recommended instruments in mobile', () => {
    const wrapper = mount(
      <RecommendedInstruments
        {...props}
        deviceMode="mobile"
        handlePaymentAction={() => {}}
        setLoader={() => {}}
        updateStickyButton={() => {}}
      />
    );

    expect(wrapper.find('.recommendedInstrumentsMobileHeading').text()).toEqual(
      'Recommended Payment Options'
    );

    expect(wrapper.find('.recommendedInstrumentContainer').length).toEqual(1);

    const instrument1 = wrapper
      .find('.recommendedInstrumentContainer')
      .childAt(0);
    const instrument2 = wrapper
      .find('.recommendedInstrumentContainer')
      .childAt(1);
    const instrument3 = wrapper
      .find('.recommendedInstrumentContainer')
      .childAt(2);
    const instrument4 = wrapper
      .find('.recommendedInstrumentContainer')
      .childAt(3);
    const instrument5 = wrapper
      .find('.recommendedInstrumentContainer')
      .childAt(4);
    const instrument6 = wrapper
      .find('.recommendedInstrumentContainer')
      .childAt(5);
    const instrument7 = wrapper
      .find('.recommendedInstrumentContainer')
      .childAt(6);

    expect(instrument1.find('div#reco_wallet-3').length).toEqual(1);
    expect(instrument2.find('div#reco_cod-cod').length).toEqual(1);
    expect(instrument3.find('div#reco_netbanking-1').length).toEqual(1);
    expect(
      instrument4.find('.hide div#reco_savedinstrument-606301280855795524')
        .length
    ).toEqual(1);
    expect(
      instrument5.find(
        '.hide div#reco_savedinstrument-faa947f8-cb9b-44e6-b0c1-12611ec481c3'
      ).length
    ).toEqual(1);
    expect(instrument6.find('.hide div#reco_paylater-paylater').length).toEqual(
      1
    );
    expect(instrument7.find('.hide div#reco_upi-70').length).toEqual(1);
  });
});
