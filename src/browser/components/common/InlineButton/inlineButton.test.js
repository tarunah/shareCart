import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import InlineButton from './';

describe('Inline button Component', () => {
  it('should display 2 buttons', () => {
    let wrapper = shallow(
      <InlineButton button1={{ text: 'btn1' }} button2={{ text: 'btn2' }} />
    );
    expect(wrapper.find('button')).toHaveLength(2);
  });

  it('should display the buttons with text', () => {
    let wrapper = shallow(
      <InlineButton button1={{ text: 'btn1' }} button2={{ text: 'btn2' }} />
    );
    expect(wrapper.text()).toEqual('btn1btn2');
  });

  it('should be clicked once', () => {
    const onButtonClick = sinon.spy();
    let wrapper = mount(
      <InlineButton
        button1={{
          text: 'btn1',
          className: 'btn1Class',
          clickHandler: onButtonClick
        }}
        button2={{
          text: 'btn2',
          className: 'btn2Class',
          clickHandler: onButtonClick
        }}
      />
    );
    wrapper.find('.btn1Class').simulate('click');
    expect(onButtonClick).toHaveProperty('callCount', 1);
  });
});
