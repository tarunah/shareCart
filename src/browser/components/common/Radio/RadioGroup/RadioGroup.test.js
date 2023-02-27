import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import RadioGroup from '.';
import RadioButton from '../RadioButton';

describe('RadioGroup common Comp', () => {
  let onClick;

  beforeEach(() => {
    onClick = sinon.spy();
  });

  it('should render component', () => {
    const wrapper = mount(
      <RadioGroup>
        <RadioButton>xyz</RadioButton>
      </RadioGroup>
    );
    expect(wrapper.text()).to.equal('xyz');
  });

  it('should select one child', () => {
    const wrapper = shallow(
      <RadioGroup name="test" onChange={onClick}>
        <RadioButton value="xyz">xyz</RadioButton>
        <RadioButton value="abc">abc</RadioButton>
        sdmvms
      </RadioGroup>
    );
    wrapper.find('#testButton0').simulate('click');
    expect(onClick.called).to.equal(true);
  });
});
