import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';

import Payment from './';
import { props, retryProps } from 'testUtils/paymentMockData';
import CreditsManager from 'commonBrowserUtils/CreditsManager';
import { orderStates } from 'commonUtils/constants';

const updateBankDiscount = discount => {};
describe('Payment Desktop', () => {
  beforeAll(() => {
    sinon.stub(CreditsManager, 'getGiftCardBalance');
    sinon.stub(CreditsManager, 'getLoyaltyPointsBalance');
    window._checkout_ = {
      __myx_kvpairs__: {
        'payment.options.error': {
          default: 'Instrument is not eligible'
        }
      }
    };
    window.triggerEvent = () => {};
    window.SHELL = { setActivePage: () => {} };
  });

  it('renders Payment component', () => {
    const wrapper = mount(
      <Payment
        {...props}
        handlePaymentAction={() => {}}
        twoFA={{}}
        loading={false}
        error={null}
        analytics={() => () => {}}
        gcBalance={{ totalBalance: 1000 }}
        lpBalance={{ totalActivePoints: 500, conversionFactor: 1 }}
        updateBankDiscount={updateBankDiscount}
      />
    );

    expect(wrapper.find('.paymentLayout').length).toBe(1);
    expect(wrapper.find('.left').length).toBe(1);
    expect(wrapper.find('.right').length).toBe(1);
    // expect(wrapper.find('.pageOffersBlock').length).toBe(1);
  });

  it('renders Payment component in retry mode', () => {
    const wrapper = mount(
      <Payment
        {...retryProps}
        payMode="retry"
        referrer={orderStates.PLACED}
        handlePaymentAction={() => {}}
        twoFA={{}}
        loading={false}
        error={null}
        analytics={() => () => {}}
        gcBalance={{ totalBalance: 1000 }}
        lpBalance={{ totalActivePoints: 500, conversionFactor: 1 }}
        updateBankDiscount={updateBankDiscount}
      />
    );

    expect(wrapper.find('.retryTimerContainer').length).toBe(1);
    expect(wrapper.find('SaleTimer').length).toBe(0);
    expect(wrapper.find('.paymentLayout').length).toBe(1);
    expect(wrapper.find('.left').length).toBe(1);
    expect(wrapper.find('.right').length).toBe(1);
    // expect(wrapper.find('.pageOffersBlock').length).toBe(1);
    expect(wrapper.find('RetrySessionExpiryModal').length).toBe(1);
    expect(wrapper.find('RetryBackConfirmationModal').length).toBe(1);
  });

  it('renders error in Payment component', () => {
    const wrapper = mount(
      <Payment
        cartData={null}
        addressData={null}
        loading={false}
        analytics={() => () => {}}
        error={{ message: 'Unable to fetch' }}
        gcBalance={{ totalBalance: 1000 }}
        lpBalance={{ totalActivePoints: 500, conversionFactor: 1 }}
        updateBankDiscount={updateBankDiscount}
      />
    );

    expect(wrapper.find('.paymentLayout').length).toBe(0);
    expect(wrapper.find('.errorText').length).toBe(1);
  });
});
