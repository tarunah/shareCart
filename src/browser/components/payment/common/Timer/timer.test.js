import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Timer from './';

describe('Timer', () => {
  it('should display timer', () => {
    const wrapper = mount(
      <Timer seconds={59} minutes={1} stopCallback={() => {}} />
    );

    expect(wrapper.find('.timer').length).toEqual(1);
    expect(wrapper.find('.timer').text()).toEqual('01:59');
  });

  it('minute count is decreased', () => {
    const clock = sinon.useFakeTimers();
    const wrapper = mount(
      <Timer seconds={0} minutes={1} stopCallback={() => {}} />
    );

    clock.tick(1000);
    expect(wrapper.state().minutes).toEqual(0);
    expect(wrapper.state().seconds).toEqual(59);
  });

  it('second count is decreased', () => {
    const clock = sinon.useFakeTimers();
    const wrapper = mount(
      <Timer seconds={59} minutes={1} stopCallback={() => {}} />
    );

    clock.tick(1000);
    expect(wrapper.state().minutes).toEqual(1);
    expect(wrapper.state().seconds).toEqual(58);
  });

  it('stopCallback is called', () => {
    const clock = sinon.useFakeTimers();
    const stopCallbackMock = sinon.spy();
    mount(<Timer seconds={0} minutes={0} stopCallback={stopCallbackMock} />);

    clock.tick(1000);
    expect(stopCallbackMock).toHaveProperty('callCount', 1);
  });

  it('should disable a running timer and then enable it', () => {
    const clock = sinon.useFakeTimers();
    const wrapper = mount(
      <Timer seconds={0} minutes={1} stopCallback={() => {}} />
    );

    clock.tick(1000);
    expect(wrapper.state().minutes).toEqual(0);
    expect(wrapper.state().seconds).toEqual(59);
    wrapper.instance().disableTimer();
    clock.tick(1000);
    expect(wrapper.state().seconds).toEqual(59);
    wrapper.instance().enableTimer();
    clock.tick(1000);
    expect(wrapper.state().seconds).toEqual(58);
  });
});
