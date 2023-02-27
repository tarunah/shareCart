import React from 'react';
import { shallow } from 'enzyme';
import Tip from './';

describe('Tip', () => {
  it('should display Tip Component', () => {
    const tipMsg = 'Tip message';
    const tipStyles = { tip: 'tip', tipHead: 'tipHead' };
    const wrapper = shallow(<Tip message={tipMsg} styles={tipStyles} />);

    expect(wrapper.find('.tip').text()).toEqual(`Tip: ${tipMsg}`);
  });
});
