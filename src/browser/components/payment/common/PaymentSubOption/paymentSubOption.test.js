import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import PaymentSubOption from '.';

describe('PaymentSubOption', () => {
  it('displays PaymentSubOption component', () => {
    const clickSpy = sinon.spy();
    const wrapper = mount(
      <PaymentSubOption
        id={'abc-1'}
        selected={true}
        iconName={'abc-icon1'}
        displayName={'ABC'}
        onClick={clickSpy}
      />
    );

    expect(wrapper.find('div.rowContainer').length).toBe(1);
    expect(wrapper.find('.sprite-abc-icon1').length).toBe(1);
    expect(wrapper.find('.row').text()).toEqual('ABC');
    wrapper.find('.row').simulate('click');
    expect(clickSpy).toHaveProperty('callCount', 1);
  });
});
