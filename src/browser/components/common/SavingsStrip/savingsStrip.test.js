import React from 'react';
import { shallow, mount } from 'enzyme';
import SavingsStrip from './';
import { cartMockData, freeShipLostData } from 'testUtils/cartMockData';
import sinon from 'sinon';
import GrowthHackConfigManager from 'commonUtils/GrowthHackConfigManager';

describe('Savings Strip', () => {
  const savingsStripConfig = {
    stripThreshold: 200,
    textThreshold: 400,
    includeShipping: true,
    visibility: {
      cart: true,
      address: true,
      payment: true
    },
    preThresholdText: 'You are saving {cart_savings} on this order.',
    postThresholdText: 'Awesome! You are saving {cart_savings} on this order.',
    paymentInvisibilitySavingsText: 'You save {cart_savings} on this order.'
  };
  let growthHackStub = sinon
    .stub(GrowthHackConfigManager, 'getGrowthHackConfigValue')
    .returns(savingsStripConfig);

  beforeEach(() => {
    growthHackStub.restore();
    window.triggerEvent = () => {};
  });

  it('should not render if savings is less than strip threshold', () => {
    sinon
      .stub(GrowthHackConfigManager, 'getGrowthHackConfigValue')
      .returns({ ...savingsStripConfig, stripThreshold: 500 });
    const wrapper = shallow(
      <SavingsStrip
        price={cartMockData.price}
        shippingApplicableCharge={
          freeShipLostData.shippingData.shippingApplicableCharge
        }
      />
    );
    expect(wrapper.find('.savingsStrip').length).toBe(0);
  });

  it('should render in cart', () => {
    const wrapper = shallow(
      <SavingsStrip
        price={cartMockData.price}
        shippingApplicableCharge={
          freeShipLostData.shippingData.shippingApplicableCharge
        }
      />
    );
    expect(wrapper.find('.savingsStrip').length).toBe(1);
    expect(wrapper.find('.savingsStripText').length).toBe(1);
    expect(wrapper.text()).toEqual('<FormatString />');
    expect(wrapper.find('FormatString').props().savings).toBe('449');
  });

  it('should render in address', () => {
    const wrapper = shallow(
      <SavingsStrip
        price={cartMockData.price}
        shippingApplicableCharge={
          freeShipLostData.shippingData.shippingApplicableCharge
        }
      />
    );
    expect(wrapper.find('.savingsStrip').length).toBe(1);
    expect(wrapper.find('.savingsStripText').length).toBe(1);
    expect(wrapper.text()).toEqual('<FormatString />');
    expect(wrapper.find('FormatString').props().savings).toBe('449');
  });

  it('should render in payment', () => {
    const wrapper = shallow(
      <SavingsStrip
        price={cartMockData.price}
        shippingApplicableCharge={
          freeShipLostData.shippingData.shippingApplicableCharge
        }
      />
    );
    expect(wrapper.find('.savingsStrip').length).toBe(1);
    expect(wrapper.find('.savingsStripText').length).toBe(1);
    expect(wrapper.text()).toEqual('<FormatString />');
    expect(wrapper.find('FormatString').props().savings).toBe('449');
  });

  it('strip content should show preTextThresholdCopy text', () => {
    const testMockPrice = JSON.parse(JSON.stringify(cartMockData.price));
    testMockPrice.charges.data = [];
    sinon
      .stub(GrowthHackConfigManager, 'getGrowthHackConfigValue')
      .returns({ ...savingsStripConfig, includeShipping: false });
    const wrapper = mount(
      <SavingsStrip
        price={testMockPrice}
        shippingApplicableCharge={
          freeShipLostData.shippingData.shippingApplicableCharge
        }
      />
    );
    expect(wrapper.find('.savingsStrip').length).toBe(1);
    expect(wrapper.find('.savingsStripText').length).toBe(1);
    expect(wrapper.text()).toEqual('You are saving 300\u00a0 on this order.');
  });

  it('strip content should show postTextThresholdCopy text', () => {
    const testMockPrice = JSON.parse(JSON.stringify(cartMockData.price));
    testMockPrice.charges.data = [];
    sinon.stub(GrowthHackConfigManager, 'getGrowthHackConfigValue').returns({
      ...savingsStripConfig,
      includeShipping: false,
      textThreshold: 300
    });
    const wrapper = mount(
      <SavingsStrip
        price={testMockPrice}
        shippingApplicableCharge={
          freeShipLostData.shippingData.shippingApplicableCharge
        }
      />
    );
    expect(wrapper.find('.savingsStrip').length).toBe(1);
    expect(wrapper.find('.savingsStripText').length).toBe(1);
    expect(wrapper.text()).toEqual(
      'Awesome! You are saving 300\u00a0 on this order.'
    );
  });

  it('strip content should show payment invisibility savings text', () => {
    const testMockPrice = JSON.parse(JSON.stringify(cartMockData.price));
    const wrapper = mount(
      <SavingsStrip
        price={testMockPrice}
        shippingApplicableCharge={
          freeShipLostData.shippingData.shippingApplicableCharge
        }
        isPaymentInvisibilityEnabled={true}
      />
    );
    expect(wrapper.find('.savingsStrip').length).toBe(1);
    expect(wrapper.find('.savingsStripText').length).toBe(1);
    expect(wrapper.text()).toEqual('You save 449\u00a0 on this order.');
  });
});
