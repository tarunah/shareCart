import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import RadioButton from '.';

describe('RadioButton common Comp', () => {
  let onClick;

  beforeEach(() => {
    onClick = sinon.spy();
  });

  it('should show label', () => {
    const wrapper = mount(<RadioButton onClick={onClick}>xyz</RadioButton>);
    expect(wrapper.find('.labelContainer').text()).to.equal('xyz');
  });

  it('should call onClick', () => {
    const onClick = sinon.spy();

    const wrapper = mount(<RadioButton onClick={onClick}>xyz</RadioButton>);

    wrapper.simulate('click');
    expect(onClick.called).to.equal(true);
  });

  it('should show selected label as highlighted', () => {
    const wrapper = mount(
      <RadioButton checked={true} value={1234} onClick={onClick}>
        xyz
      </RadioButton>
    );
    expect(wrapper.find('.selected')).to.have.lengthOf(1);
  });
});
