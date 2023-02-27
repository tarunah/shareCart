import sinon from 'sinon';
import ExpressCheckoutContainer from './';
import { shallow, mount } from 'enzyme';
import React from 'react';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
const { NETBANKING, COD, SAVED_INSTRUMENT } = PaymentConstants;
import * as AddressHelper from 'commonBrowserUtils/AddressHelper';
import * as PaymentHelper from 'commonBrowserUtils/PaymentHelper';
import {
  expressCheckoutData,
  cartData,
  addressData,
  loyaltyData,
  creditData,
  priceObj,
  serviceabilityData,
  paymentsData,
  netBankingObj,
  cardObj
} from './mock';
import ProfileManager from 'commonBrowserUtils/ProfileManager';
import AddressManager from 'commonBrowserUtils/AddressManager';
import CreditsManager from 'commonBrowserUtils/CreditsManager';
import PaymentsManager from 'commonBrowserUtils/PaymentsManager';
import CartManager from 'commonBrowserUtils/CartManager';
const { LOYALTY, CREDIT } = ExpressConstants;

import ExpressConstants from './expressConstants';

import * as utils from './util.js';

describe('Test ExpressCheckout Container', () => {
  let xpressProps = {
    cartData,
    addressData,
    serviceabilityData,
    showExpressCheckoutHalfCard: false,
    updatePageData: sinon.spy(),
    hideExpressCheckoutHalfCard: sinon.spy(),
    expressCheckoutData,
    setLoader: sinon.spy(),
    analytics: () => sinon.spy()
  };
  window.triggerEvent = () => {};
  beforeEach(() => {
    window.document = {
      cookie: ''
    };
    window.SHELL = {
      setActivePage: sinon.spy(),
      redirectTo: sinon.spy(),
      alert: sinon.spy()
    };
    ProfileManager.prefetchDetails = () => {};
    CreditsManager.getLoyaltyPointsBalance = (data, resolve, reject) =>
      resolve(loyaltyData);
    CreditsManager.getGiftCardBalance = (data, resolve, reject) =>
      resolve(creditData);
    CartManager.getCartServiceability = (pincode, resolve, reject) =>
      resolve({ serviceability: { productDeliveryInfo: serviceabilityData } });
    PaymentsManager.getPaymentOptions = (data, resolve, reject) =>
      resolve(paymentsData);
    AddressManager.setOrderAddress = () => {};
  });

  it('should not render expressCheckout if returnAbuser is true', () => {
    const wrapper = shallow(
      <ExpressCheckoutContainer
        {...{ ...xpressProps, returnAbuser: { level: 'LOW' } }}
      />
    );
    expect(wrapper.find('.expressCheckoutWrapper').exists()).toBe(false);
  });

  it('should return finalamount as number when bankdiscount and price object is sent', () => {
    const wrapper = shallow(
      <ExpressCheckoutContainer
        {...{ ...xpressProps, ...{ showExpressCheckoutHalfCard: true } }}
      />
    );
    wrapper.instance().handleExpressCheckout();
    const total = wrapper.instance().getFinalAmount(100, priceObj);
    expect(typeof total).toBe('number');
  });

  it('Toggle details click should redirect to corresponding page when clicked on address or payment', done => {
    const wrapper = shallow(
      <ExpressCheckoutContainer
        {...{ ...xpressProps, ...{ showExpressCheckoutHalfCard: true } }}
      />
    );
    AddressHelper.redirectToAddressSubpage = sinon.spy();
    PaymentHelper.redirectToPayment = sinon.spy();
    wrapper.setState({ expressCheckoutData });
    wrapper.instance().toggleDetails('addressList');
    setTimeout(() => {
      expect(AddressHelper.redirectToAddressSubpage.callCount).toEqual(1);
      const redirectToAddressArgs =
        AddressHelper.redirectToAddressSubpage.args[0];
      expect(redirectToAddressArgs[0]).toEqual('list');
      // done();
    }, 10);

    wrapper.instance().toggleDetails('payment');
    setTimeout(() => {
      expect(PaymentHelper.redirectToPayment.callCount).toEqual(1);
      done();
    }, 10);
  });

  it(`Toggle details should redirect to address page when clicked on "More Options" 
    in arrival info panel or when clicked on "View" button in TrynBuy panel`, done => {
    const wrapper = shallow(
      <ExpressCheckoutContainer
        {...{ ...xpressProps, ...{ showExpressCheckoutHalfCard: true } }}
      />
    );
    AddressHelper.redirectToAddress = sinon.spy();
    wrapper.setState({ expressCheckoutData });
    wrapper.instance().toggleDetails('address');
    setTimeout(() => {
      expect(AddressHelper.redirectToAddress.callCount).toEqual(1);
      done();
    }, 10);
  });

  it('Toggle details should not redirect when clicked on arrow in arrival info', () => {
    const wrapper = shallow(
      <ExpressCheckoutContainer
        {...{ ...xpressProps, ...{ showExpressCheckoutHalfCard: true } }}
      />
    );
    wrapper.setState({ expressCheckoutData });
    wrapper.instance().toggleDetails('arrival');
    expect(window.SHELL.redirectTo.callCount).toEqual(0);
  });

  it('should test initExpressCheckout outside of cod', () => {
    window.console.warn = jest.fn();
    window.console.error = sinon.spy();

    sinon.stub(ExpressCheckoutContainer.prototype, 'inCodRange').returns(false);
    const wrapper = shallow(<ExpressCheckoutContainer {...xpressProps} />);
    wrapper.instance().initExpressCheckout();
    expect(window.console.warn).toHaveBeenCalledWith('Skipping Express');
  });

  it('should test onCreditFailure', () => {
    const callback = sinon.spy();
    const wrapper = shallow(<ExpressCheckoutContainer {...xpressProps} />);
    wrapper.instance().onCreditFailure({}, callback);
    expect(callback.callCount).toBe(1);
  });

  it('Makepayment method call should trigger submit btn click if all details are present', () => {
    const wrapper = shallow(
      <ExpressCheckoutContainer {...xpressProps} setLoader={sinon.spy()} />
    );
    wrapper.setState({
      expressCheckoutData: {
        ...expressCheckoutData,
        ...{
          paymentType: NETBANKING,
          instrumentData: netBankingObj,
          finalAmount: 100
        }
      }
    });
    wrapper.instance().triggerPlaceOrder = sinon.spy();
    wrapper.instance().makePayment();
    expect(wrapper.instance().triggerPlaceOrder.callCount).toBe(1);
  });

  it('Makepayment method should show CVV Error when CVV is absent for SAVED_CARD', () => {
    const setLoader = sinon.spy();
    const wrapper = shallow(
      <ExpressCheckoutContainer {...xpressProps} setLoader={setLoader} />
    );
    wrapper.setState({
      cvv: null,
      expressCheckoutData: {
        ...expressCheckoutData,
        ...{
          paymentType: SAVED_INSTRUMENT,
          instrumentData: cardObj,
          finalAmount: 100
        }
      }
    });
    wrapper.instance().triggerPlaceOrder = sinon.spy();
    wrapper.instance().showCVVError = sinon.spy();
    wrapper.instance().makePayment();
    expect(wrapper.instance().triggerPlaceOrder.callCount).toBe(0);
    expect(wrapper.instance().showCVVError.callCount).toBe(1);
  });

  it('should test updateLoyalty', () => {
    window.triggerEvent = sinon.spy();
    CreditsManager.applyLoyaltyPoints = (data, resolve) => resolve({});
    CreditsManager.removeLoyaltyPoints = (data, resolve) => resolve({});
    const wrapper = shallow(<ExpressCheckoutContainer {...xpressProps} />);
    wrapper.instance().onCreditSuccessUpdate = sinon.spy();
    wrapper.instance().onCreditFailure = sinon.spy();

    wrapper.instance().updateLoyalty(true);
    expect(wrapper.instance().onCreditSuccessUpdate.callCount).toBe(1);

    wrapper.instance().updateLoyalty(false);
    expect(wrapper.instance().onCreditSuccessUpdate.callCount).toBe(2);
    expect(wrapper.state().loading).toBe(true);

    CreditsManager.applyLoyaltyPoints = (data, resolve, reject) => reject({});
    wrapper.instance().updateLoyalty(true);
    expect(wrapper.instance().onCreditFailure.callCount).toBe(1);
  });

  it('should test updateCredit', () => {
    window.triggerEvent = sinon.spy();
    CreditsManager.applyGiftCard = (data, resolve) => resolve({});
    CreditsManager.removeGiftCard = (data, resolve) => resolve({});
    const wrapper = shallow(<ExpressCheckoutContainer {...xpressProps} />);
    wrapper.instance().onCreditSuccessUpdate = sinon.spy();
    wrapper.instance().onCreditFailure = sinon.spy();

    wrapper.instance().updateCredit(true);
    expect(wrapper.instance().onCreditSuccessUpdate.callCount).toBe(1);

    wrapper.instance().updateCredit(false);
    expect(wrapper.instance().onCreditSuccessUpdate.callCount).toBe(2);
    expect(wrapper.state().loading).toBe(true);

    CreditsManager.applyGiftCard = (data, resolve, reject) => reject({});
    wrapper.instance().updateCredit(true);
    expect(wrapper.instance().onCreditFailure.callCount).toBe(1);
  });

  it('should test onCreditSuccessUpdate', () => {
    const getPaymentInstrumentByType = sinon.stub(
      utils,
      'getPaymentInstrumentByType'
    );
    const res = {
      price: {
        instruments: {
          data: [
            {
              name: 'loyaltypoints',
              value: 100
            },
            {
              name: 'giftcard',
              value: 100
            }
          ]
        }
      }
    };

    const wrapper = shallow(<ExpressCheckoutContainer {...xpressProps} />);

    wrapper.instance().updateExpressState = sinon.spy();
    wrapper.instance().refreshPaymentOptions = cb => cb();
    wrapper.instance().addMyntraInstrumentsData = sinon.spy();
    wrapper.instance().getFinalAmount = sinon.stub().returns(1000);

    wrapper.instance().onCreditSuccessUpdate(res, true, CREDIT);

    expect(wrapper.instance().updateExpressState.callCount).toBe(1);
    expect(wrapper.instance().addMyntraInstrumentsData.callCount).toBe(1);
    expect(wrapper.state().loading).toBe(false);

    wrapper.instance().onCreditSuccessUpdate(res, false, LOYALTY);

    expect(wrapper.instance().updateExpressState.callCount).toBe(2);
    expect(wrapper.instance().addMyntraInstrumentsData.callCount).toBe(2);
    expect(wrapper.state().loading).toBe(false);
  });

  it('should test resolveExpressCheckout', () => {
    const wrapper = shallow(<ExpressCheckoutContainer {...xpressProps} />);
    wrapper.instance().onExpressError = sinon.spy();
    wrapper.instance().inCodRange = sinon.stub().returns(false);
    wrapper.setState({
      expressCheckoutData: {
        paymentType: COD
      }
    });
    wrapper.instance().resolveExpressCheckout();
    expect(wrapper.instance().onExpressError.callCount).toBe(1);
    expect(wrapper.state().expressCheckoutResolved).toBe(true);
  });

  it('should test updateBankDiscount', () => {
    const wrapper = shallow(<ExpressCheckoutContainer {...xpressProps} />);
    wrapper.instance().updateExpressState = sinon.spy();
    wrapper.setState({
      expressCheckoutData: {
        paymentType: COD
      }
    });
    wrapper.instance().updateBankDiscount(100);
    expect(wrapper.instance().updateExpressState.callCount).toBe(1);
  });
});
