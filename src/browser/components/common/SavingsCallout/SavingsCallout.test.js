import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import SavingsCallout from '.';

describe('Savings Callout Payment', () => {
  const props = {
    cartData: {
      price: {
        totalSavings: 100
      }
    }
  };

  it('should show the savings callout component', () => {
    window._checkout_ = {
      __myx_ab__: {
        'payments.savings_callout': 'above_pricing'
      },
      __myx_deviceData__: {
        isApp: true
      }
    };
    const expectedText = `<SavingsCallout />Wohoo! You are saving  ₹${props.cartData.price.totalSavings}  on this order`;
    window.triggerEvent = sinon.spy();
    const wrapper = shallow(<SavingsCallout {...props} />);
    expect(wrapper.find('.container').exists()).toBe(true);
    expect(wrapper.find('.abovePriceBlock').exists()).toBe(true);
    expect(wrapper.find('SavingsCallout').exists()).toBe(true);
    expect(wrapper.find('.container').text()).toBe(expectedText);
  });

  it('should show the savings callout component sticky', () => {
    window._checkout_ = {
      __myx_ab__: {
        'payments.savings_callout': 'sticky_bottom'
      },
      __myx_deviceData__: {
        isApp: true
      }
    };
    const expectedText = `Wohoo! You are saving  ₹${props.cartData.price.totalSavings}  on this order`;
    const wrapper = shallow(<SavingsCallout {...props} isSticky={true} />);
    expect(wrapper.find('.container').exists()).toBe(true);
    expect(wrapper.find('.abovePriceBlock').exists()).toBe(false);
    expect(wrapper.find('SavingsCallout').exists()).toBe(false);
    expect(wrapper.find('.container').text()).toBe(expectedText);
  });
});
