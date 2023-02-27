import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import PlaceOrder from './';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

window._checkout_ = {
  __myx_kvpairs__: {
    'priorityCheckout.config': {
      enable: false,
      event: 'Fashionotsav',
      charges: 99,
      option1: {
        header: 'Buy Now With Early Access',
        image:
          'https://constant.myntassets.com/checkout/assets/img/EarlyCheckout.svg',
        linesLevel1: [
          'Checkout before the sale rush starts.',
          'Pay only Rs. 99 extra per order and get your favourite products for sure at Fashionotsav sale.'
        ],
        linesLevel2: [
          'Pay only 99 extra(non refundable) for the entire order and shop at Fashionotsav price now.',
          'No need of worrying about products or sizes going out-of-stock and no need of shopping at midnight!',
          'Cash on delivery will not be available.'
        ],
        agreeText: 'I agree to pay 99 for Early Access.'
      },
      option2: {
        header: 'Wait For The Sale To Start',
        image:
          'https://constant.myntassets.com/checkout/assets/img/Waiting.svg',
        linesLevel1: [
          'Wait for Fashionotsav to start (midnight, 24 Oct) and shop without paying the 99 fee.'
        ],
        linesLevel2: [
          "Don't want to pay the Early Access fee? Wait for the sale to start",
          'There is a chance that your favorite products will run out-of-stock during the sale rush.'
        ],
        slotLine: 'Your early slot is at $slot.'
      },
      Eorstime: 'Fashionotsav to start (midnight, 24 Oct)',
      headerIcon: 'https://constant.myntassets.com/checkout/assets/img/pig.svg',
      buttonText: 'BUY NOW WITH EARLY ACCESS',
      featureName: 'Early Access',
      orderTotalName: 'Early Access Fee',
      headerSubLine:
        'Buy now with Early Access and get your favourite products for sure, at Fashionotsav prices! Additional offers available on the payments page.',
      mainText: 'Hurray! You will save Rs. %s on this order'
    }
  }
};

describe('Place Order', () => {
  it('should render place order button', () => {
    render(
      <PlaceOrder
        coverFeeOpted={false}
        coverFeeApplicable={false}
        handleCartAction={() => {}}
        displayCartModal={() => {}}
        products={[]}
        disabled={false}
        virtualBundleConflict={false}
        total={1000}
      />
    );

    screen.getByRole('button');
    expect(screen.getByRole('button').textContent).toEqual('PLACE ORDER');
  });

  it('should render place order button with priority checkout enabled', () => {
    render(
      <PlaceOrder
        coverFeeOpted={false}
        coverFeeApplicable={true}
        handleCartAction={() => {}}
        displayCartModal={() => {}}
        products={[]}
        disabled={false}
        virtualBundleConflict={false}
        total={1000}
      />
    );

    screen.getByRole('button');
    const pcConfig = getKVPairValue('PRIORITY_CHECKOUT');
    expect(screen.getByRole('button').textContent).toEqual(pcConfig.buttonText);
  });

  it('should render Priority Checkout modals and function properly', () => {
    const mockHandleCartAction = sinon.spy();
    render(
      <PlaceOrder
        coverFeeOpted={false}
        coverFeeApplicable={true}
        handleCartAction={mockHandleCartAction}
        displayCartModal={() => {}}
        products={[]}
        disabled={false}
        virtualBundleConflict={false}
        total={1000}
      />
    );

    const pcConfig = getKVPairValue('PRIORITY_CHECKOUT');
    userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('dialog'));
    screen.getByText('CHOOSE AN OPTION');
    screen.getByText(pcConfig.option1.header);
    screen.getByText(pcConfig.option2.header);
    pcConfig.option1.linesLevel2.forEach(line => {
      screen.getByText(line);
    });

    userEvent.click(screen.getByTestId('earlyCheckout'));
    userEvent.click(screen.getByTestId('ea-confirm-cb'));

    screen.getByText('CONFIRM');
  });
});
