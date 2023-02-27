import React from 'react';
import { mount } from 'enzyme';
import EMILimitMessage from './';

describe('EMI Limit Message', () => {
  window._checkout_ = {
    __myx_kvpairs__: {
      'checkout.payment.emiEligibilityCode': {
        '60003': {
          eligible: true,
          message: ''
        },
        '60004': {
          eligible: false,
          message: 'Available on min. order of {amount}'
        },
        default: {
          eligible: true,
          message: ''
        }
      }
    }
  };
  it('should display EMILimit Message', () => {
    const wrapper = mount(<EMILimitMessage emiLimit={100} code={60004} />);
    expect(wrapper.find('.container').text()).toContain('100');
  });
});
