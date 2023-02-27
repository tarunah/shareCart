import React from 'react';
import { shallow } from 'enzyme';
import Footer from './';

describe('Footer', () => {
  it('should display footer', () => {
    window._checkout_ = {
      __myx_deviceData__: {
        deviceChannel: 'mobile'
      }
    };

    const wrapper = shallow(<Footer />);

    expect(wrapper.find('.heading').text()).toEqual(
      'Get the Myntra mobile app'
    );
    expect(wrapper.find('.desc').text()).toEqual(
      'A faster and more convenient way to shop'
    );
    expect(wrapper.find('a')).toHaveLength(1);
  });
});
