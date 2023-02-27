import React from 'react';
import { mount } from 'enzyme';
import SuccessAnim from '.';

describe('Success Animation', () => {
  it('success animation is displayed', () => {
    const wrapper = mount(<SuccessAnim />);

    expect(wrapper.find('.parent').length).toBe(1);
    expect(wrapper.find('#successAnimCircle').length).toBe(1);
    expect(wrapper.find('.circle').length).toBe(1);
  });
});
