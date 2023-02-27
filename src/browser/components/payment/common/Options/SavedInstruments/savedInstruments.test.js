import React from 'react';
import { mount } from 'enzyme';
import SavedInstruments from './';
import sinon from 'sinon';
import cloneDeep from 'lodash/cloneDeep';
import { ItemListWithOffer } from 'testUtils/cartMockData';

import PaymentManager from 'commonBrowserUtils/PaymentsManager';

import PaymentConstants from 'commonBrowserUtils/PaymentConstants';

const props = {
  paymentOptions: {
    csrfToken: 'testToken'
  },
  cartData: {
    id: 'testCartId1',
    price: ItemListWithOffer.itemsList[0].price
  },
  paymentMode: 'creditcard',
  paymentModeName: 'savedinstrument',
  paymentConfig: {
    instrumentData: {
      [PaymentConstants.SAVED_INSTRUMENT]: {
        type: 'savedinstrument',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          paymentUrl: 'https://pps.myntra.com',
          lowSROptions: null,
          data: [
            {
              paymentInstrumentType: 'card',
              maskedCardNumber: '355801xxxxx5479',
              encryptedCardNumber: null,
              instrumentId: '4094784441918993506',
              defaultInstrument: true,
              cardHolderName: 'styleBasedICB',
              cardType: 'JCB',
              expired: false,
              inValid: false,
              bankName: '',
              expiryMonth: '04',
              expiryYear: '23',
              productType: 'Debit Card',
              paymentInstrumentId: null,
              paymentMaskedNumber: '**** 5479',
              lowSuccessRate: true,
              tokenizationConsent: true
            },
            {
              paymentInstrumentType: 'card',
              maskedCardNumber: '343298xxxxx7709',
              encryptedCardNumber: null,
              instrumentId: '5709419736710617269',
              defaultInstrument: false,
              cardHolderName: 'icici',
              cardType: 'AMEX',
              expired: false,
              inValid: false,
              bankName: '',
              expiryMonth: '03',
              expiryYear: '20',
              productType: 'Credit Card',
              paymentInstrumentId: null,
              paymentMaskedNumber: '**** 7709',
              tokenizationConsent: false
            },
            {
              paymentInstrumentType: 'card',
              maskedCardNumber: '541567xxxxxx7290',
              encryptedCardNumber: null,
              instrumentId: '8893599104278094319',
              defaultInstrument: false,
              cardHolderName: 'Expiry',
              cardType: 'MASTERCARD',
              expired: true,
              inValid: false,
              bankName: 'CITI',
              expiryMonth: '01',
              expiryYear: '19',
              productType: 'Debit Card',
              paymentInstrumentId: null,
              paymentMaskedNumber: '**** 7290',
              tokenizationConsent: false
            },
            {
              paymentInstrumentType: 'card',
              maskedCardNumber: '541567xxxxxx1111',
              instrumentId: '8893599104278091111',
              cardHolderName: 'Test1',
              cardType: 'MASTERCARD',
              expired: false,
              inValid: true,
              bankName: 'HDFC',
              expiryMonth: '01',
              expiryYear: '30',
              productType: 'Debit Card',
              paymentInstrumentId: null,
              paymentMaskedNumber: '**** 1111',
              tokenizationConsent: false
            },
            {
              paymentInstrumentType: 'card',
              maskedCardNumber: '541567xxxxxx1112',
              instrumentId: '8893599104278091112',
              cardHolderName: 'Test2',
              cardType: 'MASTERCARD',
              expired: false,
              inValid: true,
              bankName: 'IDFC',
              expiryMonth: '01',
              expiryYear: '30',
              productType: 'Debit Card',
              paymentInstrumentId: null,
              paymentMaskedNumber: '**** 1112',
              tokenizationConsent: false
            },
            {
              paymentInstrumentType: 'card',
              maskedCardNumber: '541567xxxxxx1113',
              instrumentId: '8893599104278091113',
              cardHolderName: 'Test3',
              cardType: 'maestro',
              expired: false,
              inValid: false,
              bankName: 'IDFC',
              expiryMonth: '01',
              expiryYear: '30',
              productType: 'Debit Card',
              paymentInstrumentId: null,
              paymentMaskedNumber: '**** 1113',
              tokenizationConsent: false
            },
            {
              paymentInstrumentType: 'vpa',
              vpa: 'xyz@123',
              appName: 'Google Pay',
              payerAccountName: 'XYZ',
              instrumentId: '78',
              lowSuccessRate: true
            },
            {
              paymentInstrumentType: 'vpa',
              vpa: 'abc@123',
              appName: 'BHIM',
              payerAccountName: 'ABC',
              instrumentId: '79'
            },
            {
              paymentInstrumentType: 'vpa',
              vpa: 'abcd@123',
              appName: 'BHIM',
              payerAccountName: 'ABCD',
              instrumentId: '80'
            }
          ]
        }
      }
    }
  }
};

describe('Saved Cards payment option', () => {
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

  it('should return the correct SavedInstruments attributes - mobile mode - cvv entered', () => {
    const testFunc = sinon.spy();

    const wrapper = mount(
      <SavedInstruments
        {...props}
        updateStickyButton={testFunc}
        handlePaymentAction={() => {}}
        deviceMode="mobile"
        setLoader={() => {}}
      />
    );
    let payNowObject = wrapper
      .find('PayNowAjax')
      .instance()
      .getPayload();
    wrapper
      .find('div[id="savedinstrument-4094784441918993506"]')
      .simulate('click');
    expect(payNowObject['cvvCode']).toEqual('');
    wrapper
      .find('div[id="savedinstrument-4094784441918993506"] input')
      .simulate('change', { target: { value: '111' } });
    payNowObject = wrapper
      .find('PayNowAjax')
      .instance()
      .getPayload();
    expect(payNowObject['cvvCode']).toEqual('111');
    expect(wrapper.instance().isValidCvv()).toBe(true);
    expect(payNowObject['useSavedCard']).toEqual('true');
    wrapper.instance().toggleAllowTokenization();
    wrapper.instance().clearSelection();
  });

  it('should return updated upi mode attributes on selection of a saved UPI - ', () => {
    const testFunc = sinon.spy();
    const wrapper = mount(
      <SavedInstruments
        {...props}
        updateStickyButton={testFunc}
        handlePaymentAction={() => {}}
        updateBankDiscount={() => {}}
        deviceMode="mobile"
        setLoader={() => {}}
      />
    );
    let payNowObject = wrapper
      .find('PayNowAjax')
      .instance()
      .getPayload();

    expect(payNowObject['useSavedVpa']).toEqual('false');

    wrapper.find('div[id="savedinstrument-78"]').simulate('click');
    payNowObject = wrapper
      .find('PayNowAjax')
      .instance()
      .getPayload();

    expect(payNowObject['useSavedVpa']).toEqual('true');
    expect(payNowObject['paymentInstrument']).toEqual('78');
  });

  it('should render the error comp', () => {
    const testFunc = sinon.spy();

    window._checkout_ = {
      __myx_kvpairs__: {
        'payment.options.error': {
          2222: 'Saved cards not allowed'
        }
      }
    };

    const wrapper = mount(
      <SavedInstruments
        {...{ ...props, instrumentData: { savedinstrument: { code: 2222 } } }}
        handlePaymentAction={() => {}}
        deviceMode="mobile"
        updateStickyButton={testFunc}
        setLoader={sinon.spy()}
      />
    );

    expect(wrapper.find('#form-savedinstrument').length).toBe(0);
  });

  it('only 2 cards and 2 upis are shown upfront in mobile mode', () => {
    const testFunc = sinon.spy();
    const wrapper = mount(
      <SavedInstruments
        {...props}
        updateStickyButton={testFunc}
        updateBankDiscount={() => {}}
        handlePaymentAction={() => {}}
        deviceMode="mobile"
        setLoader={sinon.spy()}
      />
    );

    expect(wrapper.find('div.hide').length).toBe(6);
    expect(wrapper.state().isOptionsCollapsed).toBe(true);

    wrapper.instance().showMoreOptions();

    expect(wrapper.state().isOptionsCollapsed).toBe(false);
  });

  it('should remove expired card', () => {
    const testFunc = sinon.spy();
    PaymentManager.removeSavedCard = (data, scb) => scb();
    const customProps = cloneDeep(props);
    const wrapper = mount(
      <SavedInstruments
        {...customProps}
        updateStickyButton={testFunc}
        updateBankDiscount={() => {}}
        handlePaymentAction={() => {}}
        deviceMode="mobile"
        onRemoveExpireCard={sinon.fake()}
        setLoader={sinon.spy()}
        updatePageData={sinon.fake()}
      />
    );

    expect(wrapper.state().instrumentListArr.length).toBe(9);

    wrapper
      .find(
        'div[id="savedinstrument-8893599104278094319"] .expired .ctaContainer div.ctaBtn'
      )
      .simulate('click');

    expect(wrapper.state().instrumentListArr.length).toBe(8);
  });

  it('should shows invalid maestro card and remove maestro card', () => {
    const testFunc = sinon.spy();
    PaymentManager.removeSavedCard = (data, scb) => scb();
    const customProps = cloneDeep(props);
    const wrapper = mount(
      <SavedInstruments
        {...customProps}
        updateStickyButton={testFunc}
        updateBankDiscount={() => {}}
        handlePaymentAction={() => {}}
        deviceMode="mobile"
        onRemoveExpireCard={sinon.fake()}
        setLoader={() => {}}
        updatePageData={sinon.fake()}
      />
    );

    expect(wrapper.state().instrumentListArr.length).toBe(9);

    expect(
      wrapper
        .find('div[id="savedinstrument-8893599104278091113"] .maestroCard')
        .text()
    ).toBe('Maestro card not supported');

    wrapper
      .find(
        'div[id="savedinstrument-8893599104278091113"] Info.tooltipInfoIcon'
      )
      .simulate('click');

    expect(
      wrapper
        .find('div[id="savedinstrument-8893599104278091113"] ToolTip')
        .text()
    ).toBe('Banks do not support Maestro cards now for transactions.');

    wrapper
      .find(
        'div[id="savedinstrument-8893599104278091113"] .expired .ctaContainer div.ctaBtn'
      )
      .simulate('click');

    expect(wrapper.state().instrumentListArr.length).toBe(8);
  });

  it('should show lowSrMessage when its selected, lowSr is true and disable is false', () => {
    window._checkout_ = {
      __myx_kvpairs__: {
        'checkout.lowSR.messages': {
          lowSuccessRate: 'is currently facing low success rate.',
          highFailureRate: 'is currently facing high failure rate.'
        }
      }
    };
    const testFunc = sinon.spy();

    const wrapper = mount(
      <SavedInstruments
        {...props}
        updateStickyButton={testFunc}
        updateBankDiscount={() => {}}
        handlePaymentAction={() => {}}
        setLoader={() => {}}
        deviceMode="mobile"
      />
    );

    //saved cards default card is selected
    wrapper
      .find('div[id="savedinstrument-4094784441918993506"]')
      .simulate('click');
    expect(wrapper.find('LowSRMessage .lowSRMessage').length).toBe(1);
    expect(wrapper.find('LowSRMessage .lowSRMessage').text()).toEqual(
      `This bank is currently facing low success rate.`
    );

    //Selecting the saved UPI
    wrapper.find('div[id="savedinstrument-78"]').simulate('click');
    expect(wrapper.find('LowSRMessage .lowSRMessage').length).toBe(1);
    expect(wrapper.find('LowSRMessage .lowSRMessage').text()).toEqual(
      `This payment option is currently facing low success rate.`
    );

    //nothing is disabled here
    expect(wrapper.find('[className~="disabled"]').length).toEqual(0);
  });

  it('should show lowSrMessage eventhough its not selected and should disable it when disable is true', () => {
    window._checkout_ = {
      __myx_kvpairs__: {
        'checkout.lowSR.messages': {
          lowSuccessRate: 'is currently facing low success rate.',
          highFailureRate: 'is currently facing high failure rate.'
        }
      }
    };
    const testFunc = sinon.spy();
    const customProps = cloneDeep(props);
    const {
      paymentConfig: { instrumentData }
    } = customProps;
    const { paymentInstrumentDetails } = instrumentData[
      PaymentConstants.SAVED_INSTRUMENT
    ];
    paymentInstrumentDetails.data[1].disable = true;
    paymentInstrumentDetails.data[7].disable = true;

    const wrapper = mount(
      <SavedInstruments
        {...customProps}
        updateStickyButton={testFunc}
        updateBankDiscount={() => {}}
        handlePaymentAction={() => {}}
        setLoader={() => {}}
        deviceMode="mobile"
      />
    );

    expect(wrapper.find('LowSRMessage .lowSRMessage').length).toBe(2);
    expect(
      wrapper
        .find(
          'div[id="savedinstrument-5709419736710617269"] LowSRMessage .lowSRMessage'
        )
        .text()
    ).toEqual(`This bank is currently facing high failure rate.`);
    expect(
      wrapper
        .find('div[id="savedinstrument-79"] LowSRMessage .lowSRMessage')
        .text()
    ).toEqual(`This payment option is currently facing high failure rate.`);
    //Two instruments are disabled
    expect(wrapper.find('[className*="disabled"]').exists()).toEqual(true);
  });

  it('should show secured icon against tokenized card on mobile', () => {
    const testFunc = sinon.spy();
    const customProps = cloneDeep(props);
    const wrapper = mount(
      <SavedInstruments
        {...customProps}
        updateStickyButton={testFunc}
        updateBankDiscount={() => {}}
        handlePaymentAction={() => {}}
        deviceMode="mobile"
        setLoader={sinon.spy()}
        updatePageData={sinon.fake()}
      />
    );
    expect(wrapper.find('.secured').length).toBe(1);
    expect(wrapper.find('.tickIconWrapper').length).toBe(1);
    expect(wrapper.find('.tickIcon').length).toBe(1);
    expect(wrapper.find('.securedText').length).toBe(1);
  });

  it('should show secured icon against tokenized card on desktop', () => {
    const testFunc = sinon.spy();
    const customProps = cloneDeep(props);
    const wrapper = mount(
      <SavedInstruments
        {...customProps}
        updateStickyButton={testFunc}
        updateBankDiscount={() => {}}
        handlePaymentAction={() => {}}
        deviceMode="desktop"
        setLoader={sinon.spy()}
        updatePageData={sinon.fake()}
      />
    );
    expect(wrapper.find('.secured').length).toBe(1);
    expect(wrapper.find('.tickIconWrapper').length).toBe(1);
    expect(wrapper.find('.tickIcon').length).toBe(1);
    expect(wrapper.find('.securedText').length).toBe(1);
  });
});
