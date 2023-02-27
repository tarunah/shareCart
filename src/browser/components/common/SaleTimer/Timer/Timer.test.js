import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Timer from '.';

describe('Timer Component', () => {
  it('should show proper time', () => {
    const endDate = new Date().setDate(new Date().getDate() + 2);
    let wrapper = mount(<Timer endDate={endDate} />);
    expect(wrapper.text()).to.contain('01 Day');
    expect(wrapper.text()).to.contain('23 Hrs');
    expect(wrapper.text()).to.contain('59 Min');
    expect(wrapper.text()).to.contain('59 Sec');
  });

  it('should not display day', () => {
    const endDate = new Date().setHours(new Date().getHours() + 1);
    let wrapper = mount(<Timer endDate={endDate} />);
    expect(wrapper.text()).to.not.contain('Day');
  });

  it('should not display anything', () => {
    const endDate = new Date().setHours(new Date().getHours() - 1);
    let wrapper = mount(<Timer endDate={endDate} />);
    expect(wrapper.html()).to.be.equal(null);
  });
});
