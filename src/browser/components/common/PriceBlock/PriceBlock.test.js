import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import PriceBlock from '.';
import SavingsStrip from '.';
import priceMockData from 'testUtils/priceMockData';
import { getAddressFields } from 'commonBrowserUtils/priceBreakupFields';

describe('PriceBlock for address', () => {
  it('should show the title', () => {
    const wrapper = mount(
      <PriceBlock
        price={priceMockData}
        count={3}
        getFields={getAddressFields}
        shippingData={{ method: 'NORMAL' }}
        userDetails={{}}
      />
    );
    expect(wrapper.find('.items').text()).to.equal('PRICE DETAILS (3 Items)');
  });

  it('should show Total Amount and Convenience Fee', () => {
    const wrapper = mount(
      <PriceBlock
        price={priceMockData}
        count={3}
        getFields={getAddressFields}
        shippingData={{ method: 'NORMAL' }}
        userDetails={{}}
      />
    );
    const priceDetails = wrapper.find('.items + div').text();
    expect(priceDetails).to.contain('Total Amount');
    expect(priceDetails).to.contain('Convenience Fee');
  });

  it('should show Bag Total, Bag discount', () => {
    const wrapper = mount(
      <PriceBlock
        price={priceMockData}
        count={3}
        getFields={getAddressFields}
        shippingData={{ method: 'NORMAL' }}
        userDetails={{}}
      />
    );
    const priceDetails = wrapper.find('.items + div');
    expect(priceDetails.text()).to.contain('Total MRP');
    expect(priceDetails.text()).to.contain('Discount on MRP');
  });
});
