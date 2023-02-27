import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import NotServiceableHeader from '.';

describe('Not serviceable header for address', () => {
  it('should render header', () => {
    window.SHELL = {
      redirectTo: url => expect(url).to.equal('/checkout/cart')
    };
    window.triggerEvent = () => {};

    const wrapper = mount(
      <NotServiceableHeader
        isAllEssentialItemsServiceable={true}
        pincode="560068"
      />
    );
    expect(wrapper.text()).to.contain(
      'One or more items in bag can not be delivered to this pincode. Please remove non deliverable items from bag to continue.'
    );
    expect(wrapper.find('.button').text()).to.contain('GO TO BAG');
    wrapper.find('.button').simulate('click');
  });
});
