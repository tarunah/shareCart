import React from 'react';
import { mount } from 'enzyme';
import Captcha from './';
import sinon from 'sinon';

import PaymentManager from 'commonBrowserUtils/PaymentsManager';

describe('Captcha', () => {
  window.triggerEvent = () => {};
  beforeEach(() => {
    PaymentManager.generateCaptcha = (a1, a2) => {
      a1({ image: Math.random(), id: Math.random() });
    };
  });

  it('should render captcha - change image', () => {
    const wrapper = mount(<Captcha />);

    wrapper.setState({
      show: true,
      changeOption: { show: true, text: 'Change Image' },
      retryCount: 0,
      loading: true,
      captchaText: '',
      timeStamp: new Date().getTime(),
      captchaLoaded: true,
      error: { text: '' }
    });

    const src = wrapper.find('.captchaImage').get(0).props.src;

    expect(wrapper.find('.changeImage').length).toBe(1);

    wrapper.find('.changeImage').simulate('click');

    const newsrc = wrapper.find('.captchaImage').get(0).props.src;

    expect(newsrc).not.toBe(src);
  });

  it('should render captcha -  image load event', () => {
    const wrapper = mount(<Captcha />);
    expect(wrapper.state().captchaLoaded).toBe(true);
  });

  it('should render captcha -  image load error event', () => {
    PaymentManager.generateCaptcha = (a1, a2) => {
      a2();
    };
    const wrapper = mount(<Captcha />);
    expect(wrapper.state().retryCount).toBe(1);
  });

  it('captcha component', () => {
    const wrapper = mount(<Captcha />);

    expect(wrapper.find('.captchaImageContainer').length).toBe(1);
    expect(wrapper.find('.captchaImage').length).toBe(1);
    expect(wrapper.find('.input').length).toBe(1);
  });

  it('submit with captcha - error (empty captcha)', () => {
    const testFunc = sinon.spy();
    const scrollIntoView = sinon.spy();

    const wrapper = mount(
      <Captcha setLoader={() => {}} setCaptchaDetails={() => {}} />
    );
    wrapper.instance().containerRef = { scrollIntoView };
    wrapper.setState({
      show: true,
      changeOption: { show: true, text: 'Change Image' },
      retryCount: 0,
      loading: true,
      captchaText: '',
      timeStamp: new Date().getTime(),
      captchaLoaded: true,
      error: { text: '' }
    });
    wrapper.find('.input').simulate('change', { target: { value: '' } });

    wrapper.instance().submitWithCaptcha(testFunc);

    expect(wrapper.find('.captchaImageContainer').length).toBe(1);
    expect(wrapper.find('.captchaImage').length).toBe(1);
    expect(wrapper.find('.input').length).toBe(1);

    expect(wrapper.state().error.text).toContain(
      'Please enter the code to place order.'
    );
    expect(testFunc).toHaveProperty('callCount', 0);
    expect(scrollIntoView).toHaveProperty('callCount', 1);
  });

  it('submit with captcha - success', () => {
    const testFunc = sinon.spy();
    const wrapper = mount(
      <Captcha setLoader={() => {}} setCaptchaDetails={() => {}} />
    );

    wrapper.find('.input').simulate('change', { target: { value: '111' } });
    wrapper.instance().submitWithCaptcha(testFunc);

    expect(wrapper.find('.captchaImageContainer').length).toBe(1);
    expect(wrapper.find('.captchaImage').length).toBe(1);
    expect(wrapper.find('.input').length).toBe(1);

    expect(wrapper.find('.errorMessage').length).toBe(0);
    expect(wrapper.state().error.text).toBe('');
  });
});
