import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import PriceChangeContainer from './';
import PriceDropModal from './PriceDropModal';
import PriceDropStrip from './PriceDropStrip';
import { getPriceChangeInfo } from 'commonBrowserUtils/CartHelper';
import { priceChangedProducts } from 'testUtils/cartMockData';
import { priceChangeTypes } from 'commonUtils/constants';
const { INCREASED, DECREASED } = priceChangeTypes;

describe('PriceChangeAlert Components', () => {
  beforeEach(() => {
    window.triggerEvent = () => {};
  });

  it('should display PriceDropStrip with view details and price drop icon if net drop is above thresold', () => {
    const showPriceDropModal = sinon.spy();
    const wrapper = shallow(
      <PriceDropStrip
        amount={200}
        threshold={100}
        showPDModal={showPriceDropModal}
      />
    );
    expect(wrapper.find('.priceDropIcon')).toHaveLength(1);
    expect(wrapper.find('.rupeeIcon')).toHaveLength(1);
    expect(wrapper.find('.viewDetails')).toHaveLength(1);
    wrapper.find('.viewDetails').simulate('click');
    expect(showPriceDropModal).toHaveProperty('callCount', 1);
  });

  it('should display PriceDropStrip with view details and not show price value if net drop is less than threshold', () => {
    const showPriceDropModal = sinon.spy();
    const wrapper = shallow(
      <PriceDropStrip
        amount={80}
        threshold={100}
        showPDModal={showPriceDropModal}
      />
    );
    expect(wrapper.find('.priceDropIcon')).toHaveLength(1);
    expect(wrapper.find('.rupeeIcon')).toHaveLength(0);
    expect(wrapper.find('.viewDetails')).toHaveLength(1);
    wrapper.find('.viewDetails').simulate('click');
    expect(showPriceDropModal).toHaveProperty('callCount', 1);
  });

  it('should display PriceDropModal with atleast one product when clicked on priceDropStrip details', () => {
    const { products, netDiff } = getPriceChangeInfo(priceChangedProducts);
    const absNetDiff = Math.abs(netDiff);
    const wrapper = shallow(
      <PriceChangeContainer
        products={products}
        netDrop={absNetDiff}
        threshold={100}
      />
    );
    wrapper.setState({
      showPriceDropModal: false
    });
    wrapper.instance().togglePriceDropModal();
    expect(wrapper.find('PriceDropModal')).toHaveLength(1);
    wrapper.unmount();
  });

  it('should display proper icons and info about the price change', () => {
    // the mocked data has 2 price drops, and one price incr, so checking if the right icons are rendered
    const closeModal = sinon.spy();
    const { products, netDiff } = getPriceChangeInfo(priceChangedProducts);
    const wrapper = mount(
      <PriceDropModal
        cancelModal={closeModal}
        totalDrop={Math.abs(netDiff)}
        products={products}
      />
    );
    expect(wrapper.find('.productPriceAlert')).toHaveLength(products.length);
    expect(
      wrapper
        .find('ProductPriceAlert')
        .at(0)
        .props().type
    ).toBe(DECREASED);
    expect(
      wrapper
        .find('ProductPriceAlert')
        .at(1)
        .props().type
    ).toBe(INCREASED);
    expect(
      wrapper
        .find('ProductPriceAlert')
        .at(2)
        .props().type
    ).toBe(DECREASED);
  });
});
