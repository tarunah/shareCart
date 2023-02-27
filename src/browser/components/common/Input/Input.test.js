import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Input from '.';

describe('Input common Comp', () => {
  it('should show label', () => {
    const wrapper = mount(<Input label="xyz" />);
    expect(wrapper.find('.label').text()).to.equal('xyz');
  });
  it('should show render input', () => {
    const wrapper = mount(<Input label="xyz" errorMessage="abc" />);
    expect(wrapper.find('input')).to.have.lengthOf(1);
  });
  it('should show error message', () => {
    const wrapper = mount(<Input label="xyz" errorMessage="abc" />);
    expect(wrapper.find('.errorMessage').text()).to.equal('abc');
  });
  it('should be selected on focus', () => {
    const wrapper = mount(<Input label="xyz" />);
    wrapper.find('input').simulate('focus');
    expect(wrapper.find('.selected')).to.have.lengthOf(1);
    expect(wrapper.find('.top')).to.have.lengthOf(1);
  });
  it('should be deselected on blur', () => {
    const wrapper = mount(<Input label="xyz" />);
    wrapper.find('input').simulate('focus');
    wrapper.find('input').simulate('blur');
    expect(wrapper.find('.selected')).to.have.lengthOf(0);
    expect(wrapper.find('.top')).to.have.lengthOf(0);
  });
  it('should have top class if value is there', () => {
    const wrapper = mount(<Input label="xyz" value="ss" onChange={() => {}} />);
    expect(wrapper.find('.top')).to.have.lengthOf(1);
  });
});
