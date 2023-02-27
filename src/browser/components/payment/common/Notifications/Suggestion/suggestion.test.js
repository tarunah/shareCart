import React from 'react';
import { mount } from 'enzyme';
import SuggestionNotification from './';

describe('Suggestion Notification', () => {
  it('should render notification', () => {
    const wrapper = mount(<SuggestionNotification />);

    expect(wrapper.find('.title').text()).toEqual(
      'Having trouble with your payments?'
    );
    expect(wrapper.find('.tip').text()).toEqual('PAY VIA CASH ON DELIVERY');
  });
});
