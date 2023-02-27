import React from 'react';
import { mount } from 'enzyme';

import LowSRMessage from '.';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import sinon from 'sinon';

describe('Low SR Message', () => {
  beforeEach(() => {
    window._checkout_ = {
      __myx_kvpairs__: {
        'checkout.lowSR.messages': {
          lowSuccessRate: 'is currently facing low success rate.',
          highFailureRate: 'is currently facing high failure rate.'
        }
      }
    };
  });
  it('should display instrument name, message and should call triggerEvent once', () => {
    const triggerEvent = sinon.spy();
    window.triggerEvent = triggerEvent;
    const wrapper = mount(
      <LowSRMessage
        instrumentType={'upi'}
        instrumentName={'Google Pay'}
        show={true}
        disable={false}
      />
    );
    expect(wrapper.find('.lowSRMessage').text()).toEqual(
      'Google Pay is currently facing low success rate.'
    );
    expect(triggerEvent.calledOnce).toBe(true);
  });

  it('should display a message starting  with "This bank" for card for low SR', () => {
    const wrapper = mount(
      <LowSRMessage
        instrumentType={'card'}
        instrumentName={''}
        show={true}
        disable={false}
      />
    );
    expect(wrapper.find('.lowSRMessage').text()).toEqual(
      'This bank is currently facing low success rate.'
    );
  });

  it('should display a message starting  with "This payment option" for card with low SR', () => {
    const wrapper = mount(
      <LowSRMessage
        instrumentType={'vpa'}
        instrumentName={'Google Pay'}
        show={true}
        disable={false}
      />
    );
    expect(wrapper.find('.lowSRMessage').text()).toEqual(
      `This payment option is currently facing low success rate.`
    );
  });

  it('should display instrument name, high failure message and should call triggerEvent once', () => {
    const triggerEvent = sinon.spy();
    window.triggerEvent = triggerEvent;
    const wrapper = mount(
      <LowSRMessage
        instrumentType={'upi'}
        instrumentName={'Google Pay'}
        show={true}
        disable={true}
      />
    );
    expect(wrapper.find('.lowSRMessage').text()).toEqual(
      `Google Pay is currently facing high failure rate.`
    );
    expect(triggerEvent.calledOnce).toBe(true);
  });
});
