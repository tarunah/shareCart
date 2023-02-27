import React from 'react';
import { mount, shallow } from 'enzyme';
import RatingModule from '.';
import sinon from 'sinon';

describe('Myntra app feedback Section in mobile', () => {
  const appFeedbackTriggerEvent = sinon.spy();
  window._checkout_ = {
    ...window._checkout_,
    __myx_deviceData__: {
      isApp: true,
      isIOS: false,
      isAndroid: true
    }
  };
  it('if myntra app feedback card is displayed properly', () => {
    const wrapper = shallow(
      <RatingModule
        ratingClass={'style'}
        appFeedbackTriggerEvent={appFeedbackTriggerEvent}
      />
    );
    expect(wrapper.find('.yesNoBlock').length).toBe(1);
    expect(wrapper.find('.expContainer').length).toBe(1);
    expect(
      wrapper.find('.subText').contains('Would you like to spread some love?')
    ).toBe(true);
    expect(
      wrapper
        .find('.notSatisfied')
        .find('a')
        .childAt(0)
        .text()
    ).toEqual('NO');
    expect(
      wrapper
        .find('.notSatisfied')
        .find('a')
        .childAt(1)
        .text()
    ).toEqual('Give Feedback');
    expect(
      wrapper
        .find('.satisfied')
        .find('a')
        .childAt(0)
        .text()
    ).toEqual('YES');
    expect(
      wrapper
        .find('.satisfied')
        .find('a')
        .childAt(1)
        .text()
    ).toEqual('Rate us on Play Store');
  });

  it('if events are fired for feedback when pressed no', () => {
    const wrapper = mount(
      <RatingModule
        ratingClass={'class'}
        appFeedbackTriggerEvent={appFeedbackTriggerEvent}
      />
    );
    wrapper.setState({ sharedExp: true });
    wrapper.find('.notSatisfied').simulate('click');
    expect(appFeedbackTriggerEvent).toHaveProperty('callCount', 1);
    expect(wrapper.state().sharedExp).toBe(false);
  });

  it('if events are fired for feedback when pressed yes', () => {
    const wrapper = mount(
      <RatingModule
        ratingClass={'class'}
        appFeedbackTriggerEvent={appFeedbackTriggerEvent}
      />
    );
    wrapper.setState({ sharedExp: true });
    wrapper.find('.satisfied').simulate('click');
    expect(appFeedbackTriggerEvent).toHaveProperty('callCount', 2);
    expect(wrapper.state().sharedExp).toBe(false);
  });

  it('should check if updateFeedbackAttempt is working properly on android', () => {
    const updateFeedbackAttempt = sinon.spy();
    const openStoreFromWeb = sinon.spy();
    window.open = sinon.spy();
    window.MyntApp = {
      openStoreFromWeb: openStoreFromWeb,
      updateFeedbackAttempt: updateFeedbackAttempt
    };
    const wrapper = shallow(
      <RatingModule
        ratingClass={'class'}
        appFeedbackTriggerEvent={appFeedbackTriggerEvent}
      />
    );
    wrapper.instance().updateFeedbackAttempt(true);
    expect(updateFeedbackAttempt.callCount).toEqual(1);
    expect(openStoreFromWeb.callCount).toEqual(1);

    wrapper.instance().updateFeedbackAttempt(false);
    expect(window.open.callCount).toEqual(1);
  });

  it('should check if updateFeedbackAttempt is working properly on ios', () => {
    const updateFeedbackAttempt = sinon.spy();
    const openStoreFromWeb = sinon.spy();
    const openMailFromWeb = sinon.spy();
    window.open = sinon.spy();
    window.MyntApp = {
      ...window.MyntApp,
      openStoreFromWeb: openStoreFromWeb,
      updateFeedbackAttempt: updateFeedbackAttempt
    };
    window.webkit = {
      messageHandlers: {
        openStoreFromWeb: {
          postMessage: openStoreFromWeb
        },
        updateFeedbackAttempt: {
          postMessage: updateFeedbackAttempt
        },
        openMailFromWeb: {
          postMessage: openMailFromWeb
        }
      }
    };
    const wrapper = shallow(
      <RatingModule
        ratingClass={'class'}
        appFeedbackTriggerEvent={appFeedbackTriggerEvent}
      />
    );
    wrapper.instance().updateFeedbackAttempt(true);
    expect(updateFeedbackAttempt.callCount).toEqual(1);
    expect(openStoreFromWeb.callCount).toEqual(1);
    wrapper.instance().updateFeedbackAttempt(false);
    expect(window.open.callCount).toEqual(1);
  });
});
