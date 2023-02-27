import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';

import { SnackBar, SnackBarButton } from './';

describe('SnackBar notification', () => {
  describe('SnackBar', () => {
    it('should appear only when show is true', () => {
      const wrapper = mount(<SnackBar show={false}> hi </SnackBar>);
      expect(wrapper.find('.container').exists()).toBe(false);

      wrapper.setProps({ show: true });
      wrapper.update();
      expect(wrapper.find('.container').text()).toBe(' hi ');
    });

    it('snackBar should have up animation in the start and down animation at the end', () => {
      const wrapper = mount(<SnackBar show={true}>testing</SnackBar>);
      expect(wrapper.find('.up').exists()).toBe(true);

      wrapper.setProps({ show: false });
      wrapper.update();

      expect(wrapper.find('.down').exists()).toBe(true);
    });
  });

  describe('SnackBarButton', () => {
    it('onClick on the button should call the onClick', () => {
      const spy = sinon.spy();
      const wrapper = mount(<SnackBarButton show={true} onClick={spy} />);

      wrapper.find('.container div').simulate('click');
      expect(spy.calledOnce).toBe(true);
    });
  });
});
