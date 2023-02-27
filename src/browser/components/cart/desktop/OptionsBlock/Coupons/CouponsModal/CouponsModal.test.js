import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { CouponsUI } from '.';

describe('Coupons Modal', () => {
  beforeAll(() => {
    window.triggerEvent = () => {};
  });

  it('should show title', () => {
    let wrapper = shallow(
      <CouponsUI coupons={[{ code: 'abc' }, { code: 'xyz' }]} />
    );
    expect(wrapper.find('.couponsModalHeader').text()).to.contain(
      'APPLY COUPON'
    );
  });
});
