import React from 'react';
import { mount } from 'enzyme';

import { cartMockData } from 'testUtils/cartMockData';

import AttachProducts from './';

describe('Attached Product Comp', () => {
  window.triggerEvent = () => {};
  const options = {
    analytics: () => () => {},
    attachedProductOffers: cartMockData.attachedProductOffers
  };
  window._checkout_ = {
    __myx_features__: {
      'checkout.attachedProducts.enabled': true
    }
  };
  it('should render attached product touchpoint when there are offer available', () => {
    const wrapper = mount(<AttachProducts {...options} />);
    expect(wrapper.find('.attachProductContainer').length).toBe(1);
    expect(wrapper.find('.title').text()).toContain('On Your Bag');
  });
  it('should not render attached product touchpoint when there are no offers available', () => {
    const wrapper = mount(<AttachProducts />);
    expect(wrapper.find('.attachProductContainer').length).toBe(0);
  });
  it('should render attached product modal', () => {
    const wrapper = mount(<AttachProducts {...options} />);
    wrapper.find('ChevronRight.attachProductArrowIcon').simulate('click');
    expect(wrapper.find('.modalHeading').text()).toContain(
      'Offers on your bag'
    );
    expect(wrapper.find('.modalSubText').text()).toContain('Offer');
  });
  it('should display offers', () => {
    const wrapper = mount(<AttachProducts {...options} />);
    wrapper.find('ChevronRight.attachProductArrowIcon').simulate('click');
    wrapper.find('.viewItemCTA').simulate('click');
    expect(wrapper.find('.modalContainer').length).toBe(1);
    expect(wrapper.find('.offerContainer').length).toBe(1);
    expect(wrapper.find('.offers').length).toBe(2);
    expect(wrapper.find('.offerHeader').length).toBe(2);
    expect(wrapper.find('.offerHeaderText').length).toBe(2);
    expect(wrapper.find('.offerText').length).toBe(2);
  });
});
