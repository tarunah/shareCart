import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { waitFor, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Payment from './';
import { props, retryProps } from 'testUtils/paymentMockData';
import CreditsManager from 'commonBrowserUtils/CreditsManager';
import CartManager from 'commonBrowserUtils/CartManager';
import { orderStates } from 'commonUtils/constants';

describe('Payment Mobile', () => {
  sinon.stub(CreditsManager, 'getGiftCardBalance');
  sinon.stub(CreditsManager, 'getLoyaltyPointsBalance');
  CartManager.getPointsForItems = (products, successCallback) => {
    successCallback({
      enrolmentStatus: 'ENROLLED',
      totalPoints: 10
    });
  };

  window._checkout_ = {
    __myx_kvpairs__: {
      'payment.options.error': {
        default: 'Instrument is not eligible'
      }
    },
    __myx_features__: { 'checkout.insiderPoints.enable': true },
    __myx_deviceData__: {
      isApp: true
    },
    __myx_profile__: { uidx: 'abcd' }
  };

  window.triggerEvent = jest.fn();
  document.cookie = 'ilgim=true';

  it('should show insider points if is app and user is logged in', async () => {
    const payment = render(
      <MemoryRouter>
        <Payment loading={false} {...props} analytics={() => () => {}} />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(payment.queryByTestId('insiderrewards')).toBeTruthy()
    );
  });

  it('should not show insider points if user is not logged in', async () => {
    document.cookie = 'ilgim=false';
    const payment = render(
      <MemoryRouter>
        <Payment loading={false} {...props} analytics={() => () => {}} />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(payment.queryByTestId('insiderrewards')).toBeFalsy()
    );
  });

  it('should not show insider points if not app', async () => {
    window._checkout_ = {
      ...window._checkout_,
      __myx_deviceData__: {
        isApp: false
      }
    };
    const payment = render(
      <MemoryRouter>
        <Payment loading={false} {...props} analytics={() => () => {}} />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(payment.queryByTestId('insiderrewards')).toBeFalsy()
    );
  });

  it('should not show insider points if feature gate is not enabled', async () => {
    window._checkout_ = {
      ...window._checkout_,
      __myx_features__: { 'checkout.insiderPoints.enable': false }
    };
    const payment = render(
      <MemoryRouter>
        <Payment loading={false} {...props} analytics={() => () => {}} />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(payment.queryByTestId('insiderrewards')).toBeFalsy()
    );
  });

  it('should not show insider points if it is gift card context', async () => {
    window.history.pushState(
      {},
      'mock giftcard context',
      '/payment?cartContext=egiftcard'
    );
    const payment = render(
      <MemoryRouter>
        <Payment loading={false} {...props} analytics={() => () => {}} />
      </MemoryRouter>
    );
    await waitFor(() =>
      expect(payment.queryByTestId('insiderrewards')).toBeFalsy()
    );
  });

  it('renders Payment component', () => {
    const wrapper = mount(
      <Payment
        {...props}
        handlePaymentAction={() => {}}
        loading={false}
        error={null}
        analytics={() => () => {}}
        gcBalance={{ totalBalance: 1000 }}
        lpBalance={{ totalActivePoints: 500, conversionFactor: 1 }}
      />
    );

    expect(wrapper.find('.mobileLayout').length).toBe(1);
    expect(wrapper.find('CheckoutSteps').length).toBe(1);
    expect(wrapper.find('SaleTimer').length).toBe(1);
    expect(wrapper.find('.priceBreakUp').length).toBe(1);
    expect(wrapper.find('StickyButton').length).toBe(1);
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
      />
    );

    expect(wrapper.find('.retryTimerContainer').length).toBe(1);
    expect(wrapper.find('CheckoutSteps').length).toBe(0);
    expect(wrapper.find('Banner').length).toBe(0);
    expect(wrapper.find('SaleTimer').length).toBe(0);
    expect(wrapper.find('.mobileLayout').length).toBe(1);
    expect(wrapper.find('.priceBreakUp').length).toBe(1);
    expect(wrapper.find('StickyButton').length).toBe(1);
    expect(wrapper.find('RetrySessionExpiryModal').length).toBe(1);
    expect(wrapper.find('RetryBackConfirmationModal').length).toBe(1);
  });

  it('renders error in Payment component', async () => {
    const wrapper = render(
      <MemoryRouter>
        <Payment
          cartData={null}
          addressData={null}
          loading={false}
          analytics={() => () => {}}
          error={{ message: 'Unable to fetch' }}
          gcBalance={{ totalBalance: 1000 }}
          lpBalance={{ totalActivePoints: 500, conversionFactor: 1 }}
        />
      </MemoryRouter>
    );

    await waitFor(() => wrapper.getByTestId('errorpage'));
  });
});
