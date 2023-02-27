import React from 'react';
import { mount } from 'enzyme';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import LoginNudge from './';

describe('Login Nudge on Cart', () => {
  it('should display the login tip', () => {
    const wrapper = mount(<LoginNudge />);
    const loginNudgeTip = getKVPairValue('LOGIN_NUDGE_ITEMLIST_TIP');
    expect(wrapper.find('.message').text()).toEqual(loginNudgeTip);
  });
});
