import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import DeliveryBlocks from '.';
import serviceabilityMockData from 'testUtils/serviceabilityMockData';

const {
  standardShippingInfo,
  valueShippingInfo,
  sddShippingInfo,
  expressShippingInfo
} = serviceabilityMockData.serviceability;

describe('Standard Delivery for address', () => {
  it('should show header', () => {
    const wrapper = mount(
      <DeliveryBlocks
        title="Standard Delivery"
        charges={0}
        {...standardShippingInfo}
      />
    );
    expect(wrapper.find('.title').text()).to.contain('Standard Delivery');
  });

  it('should show No convenience fee', () => {
    const wrapper = mount(
      <DeliveryBlocks charges={0} {...standardShippingInfo} />
    );
    expect(wrapper.text()).to.contain('No convenience fee');
  });

  it('should show delivery charges', () => {
    const wrapper = mount(
      <DeliveryBlocks charges={149} {...standardShippingInfo} />
    );
    expect(wrapper.text()).to.contain('Convenience fee 149');
  });
});

describe('Value Shipping for address', () => {
  it('should show header', () => {
    const wrapper = mount(
      <DeliveryBlocks
        enabled={true}
        charges={0}
        {...valueShippingInfo.deliveryPromise}
        valueShippingCharge="50"
        title="Value Shipping"
        highlightText="SPECIAL OFFER"
      />
    );
    expect(wrapper.find('.title').text()).to.contain('Value Shipping');
    expect(wrapper.find('.highlight').text()).to.contain('SPECIAL OFFER');
  });

  it('should show value shipping charges', () => {
    const wrapper = mount(
      <DeliveryBlocks
        enabled={true}
        charges={60}
        {...valueShippingInfo.deliveryPromise}
        valueShippingCharge={50}
      />
    );
    expect(wrapper.text()).to.contain('Save 50');
  });
});

describe('Same Day Delivery for address', () => {
  it('should show header', () => {
    const wrapper = mount(
      <DeliveryBlocks
        enabled={true}
        tryNBuyEligible={true}
        {...sddShippingInfo.deliveryPromise}
        charges={199}
        minDays={-1}
        title="Get It Today for 199"
      />
    );
    expect(wrapper.find('.title').text()).to.contain('Get It Today for 199');
  });

  it('should show festive offer', () => {
    const wrapper = mount(
      <DeliveryBlocks
        enabled={true}
        tryNBuyEligible={true}
        {...sddShippingInfo.deliveryPromise}
        charges={1}
        minDays={-1}
        isFestiveTime={true}
        highlightText="FESTIVE OFFER"
      />
    );
    expect(wrapper.text()).to.contain('FESTIVE OFFER');
    expect(wrapper.text()).to.contain('Now just for 1');
  });

  it('should show Try & Buy info', () => {
    const wrapper = mount(
      <DeliveryBlocks
        enabled={true}
        {...sddShippingInfo.deliveryPromise}
        charges={199}
        minDays={-1}
      />
    );
    expect(wrapper.text()).to.contain(
      'Try & Buy is not available with this option'
    );
  });
});

describe('Next Day Delivery for address', () => {
  it('should show header', () => {
    const wrapper = mount(
      <DeliveryBlocks
        enabled={true}
        tryNBuyEligible={true}
        {...expressShippingInfo.deliveryPromise}
        charges={199}
        minDays={-2}
        title="Get It Tomorrow for 199"
      />
    );
    expect(wrapper.find('.title').text()).to.contain('Get It Tomorrow for 199');
  });

  it('should show Try & Buy info', () => {
    const wrapper = mount(
      <DeliveryBlocks
        enabled={true}
        {...expressShippingInfo.deliveryPromise}
        charges={199}
        minDays={-2}
      />
    );
    expect(wrapper.text()).to.contain(
      'Try & Buy is not available with this option'
    );
  });
});
