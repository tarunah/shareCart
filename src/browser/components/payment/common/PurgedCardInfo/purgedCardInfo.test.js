import React from 'react';
import { mount } from 'enzyme';

import PurgedCardInfo from './';

describe('Purged card info widget', () => {
  const mockData = {
    purgedCardInfo: {
      text:
        'Your saved cards have been removed as per new RBI guidelines. Kindly add them again and secure them for future transactions.',
      customizedMessage:
        'Some of your saved cards have been removed as per new RBI guidelines. Kindly add them again and secure them for future transactions.',
      url: '/faqs',
      urlText: 'Learn More'
    },
    phase2Enabled: true
  };
  beforeEach(() => {
    window._checkout_ = {
      __myx_kvpairs__: {
        savedCardConsent: mockData
      }
    };
  });
  it('should display purged card info widget when key is present - All saved cards purged', () => {
    const wrapper = mount(
      <PurgedCardInfo deviceMode={'desktop'} show={true} />
    );
    expect(wrapper.find('.deskTopContainer').length).toBe(1);
    expect(wrapper.find('.box').length).toBe(1);
    expect(wrapper.find('.text').text()).toEqual(
      'Your saved cards have been removed as per new RBI guidelines. Kindly add them again and secure them for future transactions.'
    );
    expect(wrapper.find('.link').text()).toEqual('Learn More');
  });

  it('should display purged card info widget when key is present - Some saved cards purged', () => {
    const wrapper = mount(
      <PurgedCardInfo
        deviceMode={'desktop'}
        show={true}
        isSavedCardPresent={true}
      />
    );
    expect(wrapper.find('.deskTopContainer').length).toBe(1);
    expect(wrapper.find('.box').length).toBe(1);
    expect(wrapper.find('.text').text()).toEqual(
      'Some of your saved cards have been removed as per new RBI guidelines. Kindly add them again and secure them for future transactions.'
    );
    expect(wrapper.find('.link').text()).toEqual('Learn More');
  });

  it('should not display purged card info widget when key is not present', () => {
    const wrapper = mount(
      <PurgedCardInfo deviceMode={'desktop'} show={false} />
    );
    expect(wrapper.find('.deskTopContainer').length).toBe(0);
  });
});
