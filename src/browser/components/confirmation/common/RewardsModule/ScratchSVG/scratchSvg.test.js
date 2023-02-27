import React from 'react';
import { mount } from 'enzyme';
import ScratchSVG from './index';

describe('ScratchSVG test', () => {
  it('Should check if ScratchSVG is displayed properly', () => {
    const wrapper = mount(<ScratchSVG />);
    expect(wrapper.find('.svgWrapper').exists()).toEqual(true);
  });
});
