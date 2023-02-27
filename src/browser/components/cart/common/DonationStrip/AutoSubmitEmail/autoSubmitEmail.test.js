import React from 'react';
import { mount } from 'enzyme';

import AutoSubmitEmail from './';
import Sinon from 'sinon';
import CartManager from 'commonBrowserUtils/CartManager';

describe('AutoSubmitEmail', () => {
  window.triggerEvent = () => {};
  describe('Visual', () => {
    it('should contain text and input', () => {
      const wrapper = mount(
        <AutoSubmitEmail titleText="You'll receive Donation receipt to claim for tax exemption under 80G on your email. Please enter your email ID." />
      );

      expect(wrapper.text()).toContain(
        "You'll receive Donation receipt to claim for tax exemption under 80G on your email. Please enter your email ID."
      );
      expect(wrapper.find('Input').exists()).toEqual(true);
      expect(wrapper.find('Input').prop('placeHolder')).toEqual(
        'Enter your email'
      );
    });
  });

  describe('Functional', () => {
    it('Should validate email and show error if email entered is not valid', () => {
      const wrapper = mount(<AutoSubmitEmail />);

      wrapper.find('input').prop('onChange')({
        currentTarget: { value: 'Asdfsdfasdf' }
      });
      wrapper.update();
      wrapper.find('input').prop('onBlur')();
      wrapper.update();

      expect(wrapper.find('.error').text()).toEqual(
        'Please enter a valid email address.'
      );
    });

    it('Should validate email and show call editEmail for valid email', () => {
      const spy = Sinon.spy((data, scb, ecb) => {
        scb({ profile: {} });
      });
      CartManager.editEmail = spy;

      const wrapper = mount(<AutoSubmitEmail />);

      wrapper.find('input').prop('onChange')({
        currentTarget: { value: 'agg2@myntra.com' }
      });
      wrapper.update();
      wrapper.find('input').prop('onBlur')();
      wrapper.update();

      expect(spy.args[0][0]).toEqual({ emailId: 'agg2@myntra.com' });
    });

    it('Should validate email and show call editEmail for valid email and for twoFa response show an error message', () => {
      const spy = Sinon.spy((data, scb, ecb) => {
        scb({ twoFactorAuthRequired: true });
      });
      CartManager.editEmail = spy;

      const wrapper = mount(<AutoSubmitEmail />);

      wrapper.find('input').prop('onChange')({
        currentTarget: { value: 'agg2@myntra.com' }
      });
      wrapper.update();
      wrapper.find('input').prop('onBlur')();
      wrapper.update();

      expect(spy.args[0][0]).toEqual({ emailId: 'agg2@myntra.com' });

      expect(wrapper.find('.error').text()).toEqual(
        'Unable to verify your email id, we will send your donation receipt in an SMS.'
      );
    });
  });
});
