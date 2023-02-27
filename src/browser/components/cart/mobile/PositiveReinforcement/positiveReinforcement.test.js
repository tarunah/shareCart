import React from 'react';
import { mount, shallow } from 'enzyme';
import PositiveReinforcement from './';
import CartManager from 'commonBrowserUtils/CartManager';
import { orderHistory } from 'testUtils/cartMockData';
import sinon from 'sinon';

describe('test for positive reinforcement for cart ', () => {
  beforeAll(() => {
    window.triggerEvent = sinon.spy();
    orderHistory.orders = orderHistory.orders.map(item => {
      item.createdOn = Date.now();
      return item;
    });
  });
  it('should render component', () => {
    const cartData = {
      price: {
        total: 1893
      }
    };
    CartManager.getPastOrders = (data, scb, ecb) => {
      scb(orderHistory);
    };
    const wrapper = mount(
      <PositiveReinforcement
        isReinforcementEnabled={true}
        cartData={cartData}
      />
    );
    expect(wrapper.find('.container').exists()).toBe(true);
    expect(wrapper.find('.icon').exists()).toBe(true);
    expect(wrapper.find('.textBlock').exists()).toBe(true);
    expect(wrapper.find('.textBlock').text()).toEqual(
      "You are our Star Shopper and that's rare!You are among the top 2% of our shoppers"
    );
  });
});
