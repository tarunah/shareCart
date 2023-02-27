import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import TryAndBuyInfo from './TryAndBuyInfo';
import { cartData } from './mock';

describe('Test TryAndBuyInfo Components', () => {
  window._checkout_ = {
    __myx_features__: { 'paid.trynbuy.enabled': true }
  };
  const showDetails = sinon.spy();
  const products = cartData.products;
  const tryAndBuyFlags = {
    ...cartData.flags,
    tryNBuyApplicable: {
      value: true,
      remark: 'NO_ISSUE'
    }
  };

  it('should render the component properly', () => {
    let wrapper = shallow(
      <TryAndBuyInfo
        {...tryAndBuyFlags}
        products={products}
        showDetails={showDetails}
      />
    );
    expect(wrapper.find('.tnbContainer').length).toBe(1);
    expect(wrapper.find('.tnbMessage').length).toBe(1);
  }),
    it('should not render the component if T&B is not enabled', () => {
      let wrapper = shallow(
        <TryAndBuyInfo
          {...cartData.flags}
          products={products}
          showDetails={showDetails}
        />
      );
      expect(wrapper.find('.tnbContainer').length).toBe(0);
      expect(wrapper.find('.tnbMessage').length).toBe(0);
    });
});
