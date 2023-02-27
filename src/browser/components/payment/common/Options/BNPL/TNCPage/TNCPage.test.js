import React from 'react';
import { mount } from 'enzyme';
import TNCPage from './';
import { props } from 'testUtils/paymentMockData';

describe('TNC page', () => {
  it('should show tnc page', () => {
    const wrapper = mount(<TNCPage {...props} setLoader={() => {}} />);
    expect(wrapper.find('iframe').length).toBe(1);
    expect(wrapper.find('iframe').props().src).toBe(
      'https://www.myntra.com&origin=http://localhost'
    );
  });
});
