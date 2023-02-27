import React from 'react';
import { shallow } from 'enzyme';
import ErrorPage from './';

describe('Error Page', () => {
  it('should display error text', () => {
    const errorText = `We're Sorry! Something went wrong. Please try again.`;
    const wrapper = shallow(<ErrorPage message={errorText} />);

    expect(wrapper.find('.errorText').text()).toEqual(errorText);
  });
});
