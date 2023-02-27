import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import PriceBreakUp from './';

const getMockData = count =>
  Array.from(Array(count)).map((val, index) => ({
    name: `name-${index + 1}`,
    displayValue: `display-${index + 1}`,
    type: ''
  }));

describe('PriceBreakUp Component', () => {
  it('has rows', () => {
    const rowCount = 7;
    let wrapper = shallow(
      <PriceBreakUp priceDetails={getMockData(rowCount)} />
    );
    expect(wrapper.children()).toHaveLength(rowCount);
  });

  it('total is displayed', () => {
    const rowCount = 7;
    const mockData = [
      ...getMockData(rowCount),
      {
        name: `name-${rowCount + 1}`,
        displayValue: `display-${rowCount + 1}`,
        type: 'total'
      }
    ];

    let wrapper = shallow(<PriceBreakUp priceDetails={mockData} />);
    expect(
      wrapper
        .children()
        .last()
        .prop('type')
    ).toEqual('total');
  });
});
