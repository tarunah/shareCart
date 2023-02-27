import React from 'react';
import { mount } from 'enzyme';
import EMI from './';
import OfferBanner from './';
import { wrap } from 'lodash';

const props = {
  selected: true,
  deviceMode: 'desktop',
  offerData: [
    {
      heading: '10% discount',
      message: '10% instant discount',
      tnc: ['line 1', 'line 2', 'line 3']
    }
  ]
};

describe('Offer Banner test', () => {
  beforeEach(() => {
    window._checkout_ = {
      __myx_profile__: {
        uidx: 'testUser1'
      }
    };
  });

  it('should render offer banner', () => {
    window.triggerEvent = () => {};
    const wrapper = mount(<OfferBanner {...props} />);
    expect(wrapper.find('.offerSlide').length).toBe(1);
    expect(wrapper.find('.offerHeading').length).toBe(1);
    expect(wrapper.find('.offerHeading').text()).toEqual('10% discount');
    expect(wrapper.find('.offerMessage').length).toBe(1);
    expect(wrapper.find('.offerMessage').text()).toEqual(
      '10% instant discount'
    );
    expect(wrapper.find('.infoIcon').length).toBe(1);
    wrapper.find('.infoIcon').simulate('click');
    expect(wrapper.find('.tncHeading').length).toBe(1);
    expect(wrapper.find('.tncHeading').text()).toEqual('Terms & Conditions');
    expect(wrapper.find('.tncBody').length).toBe(3);
  });
});
