import React from 'react';
import { shallow, mount } from 'enzyme';
import ExpiryDate from './';
import sinon from 'sinon';

describe('Expiry Date', () => {
  describe('Expiry', () => {
    it('should display the icon and date', () => {
      window.innerWidth = 360;
      const wrapper = mount(
        <ExpiryDate showExpiryDate={true} expiryDate={1621865077000} />
      );

      expect(wrapper.find('Clock').exists()).toBe(true);
      expect(wrapper.text()).toBe('Expiry date updated : 24 May 2021');
    });

    it('should show short text for small screens', () => {
      window.innerWidth = 320;
      const wrapper = mount(
        <ExpiryDate showExpiryDate={true} expiryDate={1621865077000} />
      );

      expect(wrapper.find('Clock').exists()).toBe(true);
      expect(wrapper.text()).toBe('Expiry updated : 24 May 2021');
    });

    it('should not display if the showExpiryDate is false ', () => {
      const wrapper = mount(
        <ExpiryDate showExpiryDate={false} expiryDate={1621865077000} />
      );

      expect(wrapper.find('Clock').exists()).toBe(false);
      expect(wrapper.text()).toBe('');
    });
  });
});
