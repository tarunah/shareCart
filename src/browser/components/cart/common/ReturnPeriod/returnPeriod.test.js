import React from 'react';
import { shallow } from 'enzyme';
import ReturnPeriod from '.';

describe('ReturnPeriod component', () => {
  it('should not display component for less then 30 days', () => {
    const wrapper = shallow(
      <ReturnPeriod returnPeriod={30} returnable={true} />
    );
    expect(wrapper.find('.returnItem').length).toBe(1);
  });
  it('should not display component if returnable is false', () => {
    const wrapper = shallow(
      <ReturnPeriod returnPeriod={30} returnable={false} />
    );
    expect(wrapper.find('.returnItem').length).toBe(0);
  });
  it('should not display component for more then 30 days', () => {
    const wrapper = shallow(
      <ReturnPeriod returnPeriod={31} returnable={false} />
    );
    expect(wrapper.find('.returnItem').length).toBe(0);
  });
});
