import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import A2HS from './';
import { localStorageKeys } from 'commonUtils/constants';

describe('A2HS', () => {
  beforeEach(() => {
    window.triggerEvent = () => {};
    window.a2hs = null;
    Object.defineProperty(window.navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Mobile Safari/537.36',
      configurable: true
    });
    window.chrome = { csi: () => {} };
    window._checkout_ = {
      __myx_kvpairs__: {
        'checkout.a2hs': {
          enable: true,
          content: {
            heading: 'Track your order quickly',
            desc: 'Add Myntra to Home screen and access your orders quickly.',
            button: 'Add To Home Screen Now'
          }
        }
      }
    };
  });

  it('render A2HS banner', () => {
    const wrapper = mount(<A2HS />);

    expect(wrapper.find('div.image').length).toBe(1);
    expect(wrapper.find('div.header').text()).toBe('Track your order quickly');
    expect(wrapper.find('div.desc').text()).toBe(
      'Add Myntra to Home screen and access your orders quickly.'
    );
    expect(wrapper.find('div.button').text()).toBe('Add To Home Screen Now');
  });

  it('event prompt is shown on widget click', () => {
    const wrapper = mount(<A2HS />);
    const triggerEventSpy = sinon.spy();
    const promptSpy = sinon.spy();

    window.triggerEvent = triggerEventSpy;
    window.a2hs = { prompt: promptSpy };

    wrapper.find('div.button').simulate('click');
    expect(triggerEventSpy).toHaveProperty('callCount', 1);
    expect(promptSpy).toHaveProperty('callCount', 1);
  });

  it('render A2HS instruction screen, if app not installed, on widget click', () => {
    const wrapper = mount(<A2HS />);

    wrapper.find('div.button').simulate('click');
    expect(wrapper.find('.screenContainer').length).toBe(1);
    expect(wrapper.find('.arrow').length).toBe(1);
    expect(wrapper.find('.aboutPWA').length).toBe(1);
    expect(wrapper.find('.aboutPWA .screenHeading').text()).toBe(
      'Enjoy app-like experience'
    );
    expect(wrapper.find('.aboutPWAlist').length).toBe(3);
    expect(wrapper.find('.installSteps .screenHeading').text()).toBe(
      'How to add Myntra to homescreen ?'
    );
    expect(wrapper.find('.installStep').length).toBe(2);
    expect(wrapper.find('div.screenButton').text()).toBe('OKAY, GOT IT');
  });

  it('render A2HS installation screen, if app is installed, on widget click', () => {
    localStorage.setItem(localStorageKeys.PWA_INSTALLED, true);
    const wrapper = mount(<A2HS />);

    wrapper.find('div.button').simulate('click');
    expect(wrapper.find('.screenContainer').length).toBe(1);
    expect(wrapper.find('.arrow').length).toBe(0);
    expect(wrapper.find('.aboutPWA').length).toBe(1);
    expect(wrapper.find('.aboutPWA .screenHeading').text()).toBe(
      'Use Myntra from Homescreen'
    );
    expect(wrapper.find('.aboutPWAlist').length).toBe(3);
    expect(wrapper.find('.installSteps .screenHeading').text()).toBe(
      'How to access Myntra from homescreen ?'
    );
    expect(wrapper.find('.installStep').length).toBe(2);
    expect(wrapper.find('div.screenButton').text()).toBe('OKAY, GOT IT');
  });

  it('should not render A2HS when disabled from kv pair', () => {
    window._checkout_.__myx_kvpairs__['checkout.a2hs'].enable = false;
    const wrapper = mount(<A2HS />);

    expect(wrapper.find('.container').length).toBe(0);
  });

  it('should not render A2HS when hideA2hsCard is set in localStorage', () => {
    localStorage.setItem(localStorageKeys.HIDE_A2HS, true);
    const wrapper = mount(<A2HS />);

    expect(wrapper.find('.container').length).toBe(0);
  });

  it('should not render A2HS when chrome browser is not used', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      value:
        'Mozilla/5.0 (Linux; Android 8.0; Pixel 2 Build/OPD3.170816.012) AppleWebKit/537.36',
      configurable: true
    });
    const wrapper = mount(<A2HS />);

    expect(wrapper.find('.container').length).toBe(0);
  });
});
