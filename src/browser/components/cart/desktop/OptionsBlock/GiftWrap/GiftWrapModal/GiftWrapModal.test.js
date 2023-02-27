import React from 'react';
import { mount } from 'enzyme';
import GiftWrapModal from './';

describe('Giftwrap Block for desktop', () => {
  window.SHELL = { setActivePage: () => {} };
  it('should display giftwrap block', () => {
    const mockData = {
      giftOrder: {
        details: {
          to: 'test1',
          from: 'test2',
          message: 'testMessage'
        }
      }
    };
    const wrapper = mount(<GiftWrapModal data={mockData} />);

    expect(wrapper.find('GiftWrapForm').length).not.toBe(0);
    expect(wrapper.find('GiftWrapDetails').length).not.toBe(0);
    expect(
      wrapper
        .find('ImageBanner')
        .at(0)
        .prop('name')
    ).toBe('giftwrap-1');
    expect(
      wrapper
        .find('ImageBanner')
        .at(1)
        .prop('name')
    ).toBe('giftwrap-2');
  });
});
