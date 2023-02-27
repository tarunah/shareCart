import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import FreePurchase from './';

const props = {
  paymentOptions: {
    csrfToken: 'testToken',
    paymentInstrumentDetails: [
      {
        type: 'myntraCredit',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          enable2fa: true,
          phoneNumbers: ['9167299287', '7022022049', '9600497563'],
          enableEmailOTP: true,
          paymentUrl: 'https://pps.myntra.com'
        }
      }
    ]
  },
  cartData: {
    id: 'testCartId1'
  }
};

describe('FreePurchase', () => {
  beforeEach(() => {
    window._checkout_ = {
      __myx_profile__: {
        uidx: 'testUser1'
      }
    };
  });

  it('should submit the pay now form with right attributes', () => {
    const updateStickyButtonMock = sinon.spy();
    const wrapper = mount(
      <FreePurchase
        {...props}
        mode={'desktop'}
        updateStickyButton={updateStickyButtonMock}
      />
    );
  });
});
