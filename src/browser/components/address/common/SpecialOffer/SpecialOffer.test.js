import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import SpecialOffer from '.';

describe('Special Offer for address', () => {
  it('should show header', () => {
    const wrapper = mount(<SpecialOffer show={true} />);
    expect(wrapper.find('.title').text()).to.contain('Special Offer');
  });

  it('should show offer data', () => {
    window._checkout_ = {
      __myx_kvpairs__: { 'paid.trynbuy.enabled': 25 }
    };
    const wrapper = mount(<SpecialOffer show={true} />);
    expect(wrapper.text()).to.contain(
      'Get 25 off by selecting Value Shipping.'
    );
  });
});
