import React from 'react';
import { shallow } from 'enzyme';
import SavingsFomo from './';
import { cartMockData } from 'testUtils/cartMockData';
import { checkoutPage } from 'commonUtils/constants';

describe('Savings Fomo', () => {
  beforeEach(() => {
    window._checkout_ = {
      __myx_ab__: {
        'checkout.fomoWidget': 'disabled'
      },
      __myx_deviceData__: {
        isApp: true
      }
    };
  });

  it('should not show savings fomo if experiment is not enabled', () => {
    const wrapper = shallow(
      <SavingsFomo
        price={cartMockData.price}
        products={cartMockData.products}
        currentPage={checkoutPage.PAYMENT}
      />
    );
    expect(wrapper.find('.container').length).toBe(0);
  });
});
