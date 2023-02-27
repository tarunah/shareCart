import React from 'react';
import { mount } from 'enzyme';

import TrustNSafetyMarker from './index';

describe('Trust and Safety Marker', () => {
  it('should display trustNSafety Marker', () => {
    const wrapper = mount(<TrustNSafetyMarker mode="desktop" />);
    expect(wrapper.find('.container').length).toBe(1);
    expect(wrapper.find('.heading').text()).toEqual(
      'Myntra Trust & Safety Promise'
    );
    expect(wrapper.find('.subText').text()).toContain('Original Products');
  });
});
