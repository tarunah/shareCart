import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import MFU from '.';

describe('MFU for desktop', () => {
  window._checkout_ = { __myx_features__: { 'mfu.enable': true } };
  it('should display mfu info', () => {
    const wrapper = mount(<MFU payable={100} points={10} />);
    expect(wrapper.text()).to.contain('You pay 100 +  10 MynCash');
    expect(wrapper.text()).to.contain('MynCash will be auto applied');
  });
  it('should not display mfu info when points 0', () => {
    const wrapper = mount(<MFU payable={100} points={0} />);
    expect(wrapper.html()).to.equal(null);
  });
  it('should not display mfu info when fg off', () => {
    window._checkout_.__myx_features__['mfu.enable'] = false;
    const wrapper = mount(<MFU payable={100} points={10} />);
    expect(wrapper.html()).to.equal(null);
  });
});
