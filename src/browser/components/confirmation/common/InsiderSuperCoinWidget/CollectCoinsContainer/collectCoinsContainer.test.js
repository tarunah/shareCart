import React from 'react';
import { shallow } from 'enzyme';
import CollectCoinsContainer from '.';

const componentProps = {
  acceleratedEarning: {
    Elite: ['2X', 'DOUBLE EARNING'],
    Icon: ['3X', 'TRIPLE EARNING']
  },
  collectCoinsMessage:
    'Collect {{superCoinToCollect}} {{break}} once your order is delivered',
  coinsToCollect: 9,
  tierName: 'Select'
};

describe('collectCoinsContainer renders', () => {
  it('should render the collectCoinsContainer', () => {
    const wrapper = shallow(<CollectCoinsContainer {...componentProps} />);
    expect(wrapper.find('.collectCoinsContainer').length).toBe(1);
    expect(wrapper.find('.collectCoinsText').length).toBe(1);
  });
});
