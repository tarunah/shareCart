import React from 'react';
import { shallow, mount } from 'enzyme';
import CheckoutSteps from './';

describe('Checkout Steps', () => {
  beforeEach(() => {
    window._checkout_ = {
      __myx_ab__: {},
      __myx_deviceData__: {
        isApp: true
      }
    };
  });

  it('should render only in app', () => {
    window._checkout_.__myx_deviceData__['isApp'] = false;
    const wrapper = shallow(<CheckoutSteps currentPage={'Bag'} />);
    expect(wrapper.find('.stepsContainer').length).toBe(0);
  });

  it('should render in the bag/cart page in V2', () => {
    const wrapper = mount(<CheckoutSteps currentPage={'Bag'} />);
    expect(wrapper.find('.stepsContainer').length).toBe(1);
    expect(wrapper.find('.stepsContentV2.completed').length).toBe(0);
    expect(wrapper.find('.stepsContentV2.active').length).toBe(1);
    expect(wrapper.find('.stepsContentV2.inactive').length).toBe(2);
    expect(wrapper.find('.stepsTextV2').length).toBe(3);
    expect(wrapper.find('.stepsContentV2.active .stepsTextV2').text()).toMatch(
      'Bag'
    );
  });

  it('should render in the address page in V2', () => {
    const wrapper = mount(<CheckoutSteps currentPage={'Address'} />);
    expect(wrapper.find('.stepsContainer').length).toBe(1);
    expect(wrapper.find('.stepsContentV2.completed').length).toBe(1);
    expect(wrapper.find('.stepsContentV2.active').length).toBe(1);
    expect(wrapper.find('.stepsContentV2.inactive').length).toBe(1);
    expect(wrapper.find('.stepsTextV2').length).toBe(3);
    expect(wrapper.find('.stepsContentV2.active .stepsTextV2').text()).toMatch(
      'Address'
    );
  });

  it('should render in the payment page in V2', () => {
    const wrapper = mount(<CheckoutSteps currentPage={'Payment'} />);
    expect(wrapper.find('.stepsContainer').length).toBe(1);
    expect(wrapper.find('.stepsContentV2.completed').length).toBe(2);
    expect(wrapper.find('.stepsContentV2.active').length).toBe(1);
    expect(wrapper.find('.stepsContentV2.inactive').length).toBe(0);
    expect(wrapper.find('.stepsTextV2').length).toBe(3);
    expect(wrapper.find('.stepsContentV2.active .stepsTextV2').text()).toMatch(
      'Payment'
    );
  });

  it('should not render if context is egiftcard', () => {
    window.history.pushState(
      {},
      'mock giftcard context',
      '/payment?cartContext=egiftcard'
    );

    const wrapper = shallow(<CheckoutSteps currentPage={'Payment'} />);
    expect(wrapper.find('.stepsContainer').length).toBe(0);
  });
});
