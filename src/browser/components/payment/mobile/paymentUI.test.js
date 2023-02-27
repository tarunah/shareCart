import React from 'react';

import PaymentUI, { getBannerUrl } from './PaymentUI';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { render, screen } from '@testing-library/react';
import { cartMockData } from 'testUtils/cartMockData';
import { props } from 'testUtils/paymentMockData';
import '@testing-library/jest-dom/extend-expect';
import PaymentManager from 'commonBrowserUtils/PaymentsManager';

describe('Payment UI', () => {
  it('should test getBannerURL', () => {
    let newUserBannerConfig = getKVPairValue('NEW_USER_DEFAULT_PAYMENT_BANNER');
    newUserBannerConfig.enabled = true;
    const userDetails = {
      isFirstTimeCustomer: true
    };
    let isAbEnabled = true;
    let bannerUrl = getBannerUrl(newUserBannerConfig, userDetails, isAbEnabled);
    expect(bannerUrl).toBe(newUserBannerConfig.urlV2);
    isAbEnabled = false;
    bannerUrl = getBannerUrl(newUserBannerConfig, userDetails, isAbEnabled);
    expect(bannerUrl).toBe(newUserBannerConfig.url);
  });

  it('should show the aocv2 strip in payments page', () => {
    window._checkout_ = {
      __myx_features__: {
        'checkout.addressOnCartV2.enabled': true
      },
      __myx_deviceData__: {
        isMobile: true
      },
      __myx_ab__: { 'cart.addressoncartv2': 'variant3' }
    };
    window.triggerEvent = () => {};
    PaymentManager.userTwoFAVerification = () => {};
    render(
      <PaymentUI
        {...props}
        cartData={cartMockData}
        kvpairs={{}}
        offersConfig={{ messages: [] }}
        stickyButton={{}}
        triggerWebengageEvent={() => {}}
      />
    );

    expect(screen.queryByText('Deliver to:')).toBeInTheDocument();
  });
});
