import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import PriceBlock from '.';
import PriceBreakUp from '../../../common/PriceBreakUp';
import { cartMockData } from 'testUtils/cartMockData';

describe('Price Block for desktop', () => {
  beforeAll(() => {
    window.SHELL = { alert: () => {} };
  });

  it('should display header', () => {
    const wrapper = shallow(<PriceBlock count={4} data={cartMockData} />);
    expect(wrapper.find('.priceHeader').text()).to.equal(
      'PRICE DETAILS (4 Items)'
    );
  });

  it('should have price breakup component', () => {
    const wrapper = shallow(<PriceBlock data={cartMockData} />);
    expect(wrapper.find(PriceBreakUp)).to.have.lengthOf(1);
  });
});
