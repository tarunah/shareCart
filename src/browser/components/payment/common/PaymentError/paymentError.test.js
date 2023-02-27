import React from 'react';
import { mount } from 'enzyme';

import PaymentError from './';

describe('Payment Error', () => {
  const errorMessage =
    'Your order was not placed as there was a problem processing payment.';
  window._checkout_ = {
    __myx_kvpairs__: {
      'checkout.payment.errorCode': {
        1001: errorMessage,
        10004: { heading: 'Incorrect OTP', desc: errorMessage },
        default: errorMessage
      }
    }
  };
  window.triggerEvent = () => {};

  it('renders PaymentError component', () => {
    const wrapper = mount(
      <PaymentError
        errorAttributes={{ code: '1001' }}
        analytics={() => () => {}}
      />
    );

    expect(wrapper.find('.heading').text()).toEqual(
      'Sorry, your order could not be placed.'
    );
    expect(wrapper.find('.desc').text()).toEqual(errorMessage);
  });

  it('renders PaymentError component with configurable heading', () => {
    const wrapper = mount(
      <PaymentError
        errorAttributes={{ code: '10004' }}
        analytics={() => () => {}}
      />
    );

    expect(wrapper.find('.heading').text()).toEqual('Incorrect OTP');
    expect(wrapper.find('.desc').text()).toEqual(errorMessage);
  });

  it('Forces login incase error code is 1064', () => {
    window.SHELL = {
      redirectTo: url => {
        expect(url).toBe('/login?referer=/checkout/payment');
      }
    };
    const wrapper = mount(
      <PaymentError
        errorAttributes={{ code: '1064' }}
        analytics={() => () => {}}
      />
    );
  });
});
