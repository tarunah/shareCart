import React from 'react';
import { mount } from 'enzyme';
import { cartMockData } from '../../../../../../testUtil/cartMockData';
import OrderReview from '.';
import { getDeliveryEstimateRange } from 'commonBrowserUtils/Helper';

describe('[Order Review]', () => {
  beforeEach(() => {
    window.triggerEvent = () => {};
  });
  it('should render the Accordian Header', () => {
    let wrapper = mount(<OrderReview cartData={cartMockData} mode="desktop" />);
    const date = getDeliveryEstimateRange(cartMockData.products);
    const subText = 'Estimated delivery by ' + date;
    expect(wrapper.find('.heading').text()).toBe('Item(s) In Your Cart (4)');
    expect(wrapper.find('.subText').text()).toBe(subText);
  });
});
