import React from 'react';
import {
  DebitCreditCard,
  ExpressCashback,
  PaymentModes,
  PaymentSection,
  PaymentSectionInfo,
  PaymentSectionWrapper
} from './PaymentSection';
import { getSpriteObj } from './util';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import {
  expressCheckoutData,
  cartData,
  priceObj,
  cardObj,
  vpaObj,
  paymentsData
} from './mock';
import ExpressConstants from './expressConstants';

describe('Test Payment Section Component', () => {
  const { CASHBACK_RETRY_MSG } = ExpressConstants;

  const showDetails = sinon.spy();
  const updateCVV = sinon.spy();
  const updateBankDiscount = sinon.spy();
  const getNewPaymentForm = sinon.spy();
  const cvvError = 'Please enter valid CVV Details';
  let hidePayment = false;
  const resolved = true;
  const { paymentType, instrumentData, gcObj, lpObj } = expressCheckoutData;
  const balanceAmountProps = {
    gcObj,
    lpObj,
    updateLoyalty: sinon.spy(),
    updateCredit: sinon.spy(),
    loyaltyInfo: {
      conversion: 100,
      finalAmount: 100,
      orderTotal: 100
    }
  };

  const payableAmountProps = {
    price: priceObj,
    hasChecked: false,
    finalAmount: 100,
    showPayable: true
  };

  it('should test if it is rendered properly', () => {
    const wrapper = shallow(
      <PaymentSection
        showDetails={showDetails}
        paymentType={paymentType}
        paymentObj={instrumentData}
        updateCVV={updateCVV}
        errorMsg={cvvError}
        hidePayment={hidePayment}
        cartData={cartData}
        updateBankDiscount={updateBankDiscount}
        balanceAmountProps={balanceAmountProps}
        payableAmountProps={payableAmountProps}
        paymentFormResolved={resolved}
        getNewPaymentForm={getNewPaymentForm}
      />
    );

    expect(wrapper.find('.paymentOptions').exists()).toBe(true);
    expect(wrapper.find('PaymentSectionWrapper').exists()).toBe(true);
    expect(wrapper.find('BalanceAmount').exists()).toBe(true);
    expect(wrapper.find('PayableAmount').exists()).toBe(true);
    expect(getNewPaymentForm.callCount).toBe(1);
  });

  it('should test PaymentSectionWrapper', () => {
    let wrapper = shallow(
      <PaymentSectionWrapper
        paymentObj={instrumentData}
        paymentType={paymentType}
        updateCVV={updateCVV}
        errorMsg={cvvError}
        updateBankDiscount={updateBankDiscount}
        cartData={cartData}
        showDetails={showDetails}
        hidePayment={hidePayment}
      />
    );

    expect(wrapper.find('.paymentSectionWrapper').length).toBe(1);
    expect(wrapper.find('MiniHeaderNav').exists()).toBe(true);

    hidePayment = true;
    wrapper = shallow(
      <PaymentSectionWrapper
        paymentObj={instrumentData}
        paymentType={paymentType}
        updateCVV={updateCVV}
        errorMsg={cvvError}
        updateBankDiscount={updateBankDiscount}
        cartData={cartData}
        showDetails={showDetails}
        hidePayment={hidePayment}
      />
    );

    expect(wrapper.find('.hidePayments').length).toBe(1);
  });

  it('should test ExpressCashBack', () => {
    const data = {
      onClickEligibility: sinon.spy(),
      totalAmount: 1000,
      icbRetryCount: 15,
      state: {
        deff: {
          show: true,
          message: 'deff message'
        },
        icb: {
          show: true,
          code: '',
          message: 'hello',
          error: 'no error'
        },
        currentRetryCount: 10
      }
    };
    let wrapper = shallow(<ExpressCashback data={data} />);
    expect(wrapper.find('.errorMsg').exists()).toBe(true);
    expect(wrapper.find('.errorMsg').text()).toBe(
      'Could not check the discount amount for this card. Please check again.'
    );
    expect(wrapper.find('.retryBtn').exists()).toBe(true);
    expect(wrapper.find('.retryBtn').text()).toBe(' Check Offer Eligibility');

    data.icbRetryCount = 1;
    wrapper = shallow(<ExpressCashback data={data} />);
    expect(wrapper.find('.errorMsg').exists()).toBe(true);
    expect(wrapper.find('.errorMsg').text()).toBe(CASHBACK_RETRY_MSG);

    data.state.icb.error = null;
    data.state.icb.code = 'code';
    wrapper = shallow(<ExpressCashback data={data} />);
    expect(wrapper.find('.cashbackInfo').exists()).toBe(true);

    data.state.icb.error = null;
    data.state.icb.code = '';
    wrapper = shallow(<ExpressCashback data={data} />);
    expect(wrapper.find('.cashbackTxt').exists()).toBe(true);
    expect(wrapper.find('.cashbackTxt').text()).toBe(data.state.icb.message);

    data.state.icb.show = false;
    wrapper = shallow(<ExpressCashback data={data} />);
    expect(wrapper.find('.cashbackTxt').exists()).toBe(true);
    expect(wrapper.find('.cashbackTxt').text()).toBe(data.state.deff.message);

    data.state = {};
    wrapper = shallow(<ExpressCashback data={data} />);
    expect(wrapper.type()).toBe(null);
  });

  it('should test DebitCreditCard', () => {
    const defaultCard = {
      cardType: 'MASTERCARD',
      paymentMaskedNumber: 'Hello',
      cardHolderName: 'Myntra',
      bankName: 'SBI',
      productType: 'Myntra'
    };
    let wrapper = shallow(
      <DebitCreditCard
        card={defaultCard}
        updateCVV={updateCVV}
        errorMsg={cvvError}
      />
    );

    expect(wrapper.find('.cardDetails').exists()).toBe(true);
    expect(wrapper.find('.bankInfo').exists()).toBe(true);
    expect(wrapper.find('.bankCardType').exists()).toBe(true);
    expect(wrapper.find('.bankCardType').text()).toBe('SBI Myntra');
    expect(wrapper.find('.maskedCardno').exists()).toBe(true);
    expect(wrapper.find('.maskedCardno').text()).toBe('Hello');
    expect(wrapper.find('.cardHolder').exists()).toBe(true);
    expect(wrapper.find('.cardLogoName').exists()).toBe(true);
    expect(wrapper.find('.cardLogoName').exists()).toBe(true);
    expect(wrapper.find('.holderName').exists()).toBe(true);
    expect(wrapper.find('.cvvInput').exists()).toBe(true);
    expect(wrapper.find('.errorMsg').exists()).toBe(true);
    expect(wrapper.find('.errorMsg').text()).toBe(
      'Please enter valid CVV Details'
    );
    defaultCard.cardType = null;

    wrapper = shallow(
      <DebitCreditCard card={defaultCard} updateCVV={updateCVV} errorMsg={''} />
    );
    expect(wrapper.find('Sprite').prop('name')).toEqual('card-default');
  });

  it('should test getSpriteObj', () => {
    let options = {
      type: 'netbanking',
      message: 'Instrument is Eligible',
      code: 3000,
      paymentInstrumentDetails: {
        lowSROptions: null,
        data: [
          {
            id: 10,
            name: 'citibank',
            defaultBank: false,
            popular: true
          }
        ]
      }
    };
    const paymentType = 'netbanking';
    let wrapper = getSpriteObj(options, paymentType);
    expect(wrapper).toEqual({
      bankName: 'citibank',
      spriteName: 'wallet-citi',
      paymentName: 'Net Banking'
    });

    options.type = 'wallet';

    wrapper = getSpriteObj(options, paymentType);
    expect(wrapper).toEqual({
      bankName: 'citibank',
      paymentName: 'Net Banking',
      spriteName: 'wallet-citibank'
    });

    options.paymentInstrumentDetails.data[0].name = 'paypal';
    wrapper = getSpriteObj(options, paymentType);
    expect(wrapper).toEqual({
      bankName: 'paypal',
      paymentName: 'Net Banking',
      spriteName: 'wallet-tab-paypal'
    });

    wrapper = getSpriteObj(vpaObj, 'savedinstrument');
    expect(wrapper).toEqual({
      bankName: 'googlepay',
      payerName: 'SANDEEP KUMAR K',
      paymentName: undefined,
      spriteName: 'upi-googlepay',
      vpa: 'sandeepkumar.k09@okhdfcbank'
    });
  });

  it('should test PaymentModes', () => {
    const options = {
      type: 'netbanking',
      message: 'Instrument is Eligible',
      code: 3000,
      paymentInstrumentDetails: {
        lowSROptions: null,
        data: [
          {
            id: 10,
            name: 'citibank',
            defaultBank: false,
            popular: true
          }
        ]
      }
    };
    const paymentType = 'netbanking';
    let wrapper = shallow(
      <PaymentModes instrumentsData={options} paymentType={paymentType} />
    );
    expect(wrapper.find('.paymentCompany').length).toBe(1);
    expect(wrapper.find('.paymentCompany').text()).toBe(
      '<Sprite />citibank Net Banking'
    );
    expect(wrapper.find('.override-citi').length).toBe(1);
  });

  it('should test PaymentSectionInfo', () => {
    let wrapper = shallow(
      <PaymentSectionInfo
        paymentObj={cardObj}
        paymentType={paymentType}
        updateCVV={updateCVV}
        errorMsg={cvvError}
        updateBankDiscount={updateBankDiscount}
        cartData={cartData}
        paymentOptions={paymentsData}
      />
    );

    expect(wrapper.find('.paymentSectionInfo').exists()).toBe(true);
    expect(wrapper.find('DebitCreditCard').exists()).toBe(true);
    expect(wrapper.find('Cashback').exists()).toBe(true);

    wrapper = shallow(
      <PaymentSectionInfo
        paymentObj={cardObj}
        paymentType={'cod'}
        updateCVV={updateCVV}
        errorMsg={cvvError}
        updateBankDiscount={updateBankDiscount}
        cartData={cartData}
        paymentOptions={paymentsData}
      />
    );

    expect(wrapper.find('PaymentModes').exists()).toBe(true);
  });
});
