import React from 'react';
import { mount } from 'enzyme';
import Confetti from './index';

describe('Confetti Coponent Tests', () => {
  it('should Confetti rendered properly', () => {
    const wrapper = mount(<Confetti />);
    expect(wrapper.find('.confettiWrapper').exists()).toEqual(true);
  });
});
