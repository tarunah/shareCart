import React from 'react';
import { shallow } from 'enzyme';
import Header from './';

describe('Header', () => {
  it('should display header in confirmation page', () => {
    const storeOrderId = '123456789';
    const wrapper = shallow(<Header storeOrderId={storeOrderId} />);

    expect(wrapper.find('.confirmTick').length).not.toBe(0);
    expect(wrapper.find('.heading').text()).toEqual('Order Confirmed');
    expect(wrapper.find('.desc').text()).toEqual(
      `You will receive an order confirmation email shortly with the expected delivery date.`
    );
  });
});
