import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import PlaceOrder from './';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { checkoutPage } from 'commonUtils/constants';

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
    const wrapper = mount(
      <PlaceOrder
        coverFeeOpted={false}
        coverFeeApplicable={false}
        handleCartAction={() => {}}
        displayCartModal={() => {}}
        products={[]}
        disabled={false}
        virtualBundleConflict={false}
        updateDynamicStyles={() => {}}
        total={1000}
      />
    );

    const button = wrapper.find('.placeOrderButton');
    expect(button).toHaveLength(1);
    expect(button.text()).toEqual('PLACE ORDER');
  });

  it('should render place order button with priority checkout enabled', () => {
    const wrapper = mount(
      <PlaceOrder
        coverFeeOpted={false}
        coverFeeApplicable={true}
        handleCartAction={() => {}}
        displayCartModal={() => {}}
        products={[]}
        disabled={false}
        virtualBundleConflict={false}
        updateDynamicStyles={() => {}}
        total={1000}
      />
    );

    const pcConfig = getKVPairValue('PRIORITY_CHECKOUT');
    const button = wrapper.find('.button');
    expect(button).toHaveLength(1);
    expect(button.text()).toEqual(pcConfig.buttonText);
  });

  it('should render Priority Checkout modals and function properly', () => {
    const mockHandleCartAction = sinon.spy();
    const wrapper = mount(
      <PlaceOrder
        coverFeeOpted={false}
        coverFeeApplicable={true}
        handleCartAction={mockHandleCartAction}
        displayCartModal={() => {}}
        products={[]}
        disabled={false}
        virtualBundleConflict={false}
        updateDynamicStyles={() => {}}
        total={1000}
      />
    );

    const pcConfig = getKVPairValue('PRIORITY_CHECKOUT');
    const button = wrapper.find('.button');

    button.simulate('click');
    const pcModalContainer = wrapper.find('.container');

    expect(pcModalContainer).toHaveLength(1);
    expect(pcModalContainer.find('.headerText').text()).toEqual(
      'CHOOSE AN OPTION'
    );
    expect(pcModalContainer.find('.modalDisplayBlock')).toHaveLength(2);

    const earlyCheckoutBlock = pcModalContainer.find('#earlyCheckout');

    expect(earlyCheckoutBlock.find('.blockHeader').text()).toEqual(
      pcConfig.option1.header
    );
    expect(earlyCheckoutBlock.find('.modalDisplayBlockContent').text()).toEqual(
      pcConfig.option1.linesLevel1.join('')
    );

    const waitForSale = pcModalContainer.find('#waitForSale');
    expect(waitForSale.find('.blockHeader').text()).toEqual(
      pcConfig.option2.header
    );

    expect(waitForSale.find('.modalDisplayBlockContent').text()).toEqual(
      pcConfig.option2.linesLevel1.join('')
    );

    earlyCheckoutBlock.simulate('click');

    expect(wrapper.find('.hide .mainList').text()).toEqual(
      pcConfig.option2.linesLevel2.join('')
    );

    const confirmationOption = pcModalContainer.find('.confirmationOption');
    expect(confirmationOption).toHaveLength(1);
  });
});

describe('Return Policy AB', () => {
  it('should not show return info banner when AB is off', () => {
    window._checkout_ = {
      __myx_ab__: { 'cart.returnpolicy': 'disabled' },
      __myx_deviceData__: { isApp: true }
    };

    const wrapper = mount(
      <PlaceOrder
        coverFeeOpted={false}
        coverFeeApplicable={false}
        handleCartAction={() => {}}
        displayCartModal={() => {}}
        products={[]}
        disabled={false}
        virtualBundleConflict={false}
        updateDynamicStyles={() => {}}
        total={1000}
        cartItemsReturnInfo={{
          allReturnable: true,
          allExchangeable: true,
          sameReturnPeriod: true,
          commonReturnPeriod: 5,
          cartCount: 2
        }}
      />
    );

    const returnInfoBannerWrapper = wrapper.find('.returnInfoBanner');
    expect(returnInfoBannerWrapper.length).toBe(0);
  });

  it('should not show return info banner when AB variant is `onstrip` and return policy is not uniform', () => {
    window._checkout_ = {
      __myx_ab__: { 'cart.returnpolicy': 'onstrip' },
      __myx_deviceData__: { isApp: true }
    };

    const wrapper = mount(
      <PlaceOrder
        coverFeeOpted={false}
        coverFeeApplicable={false}
        handleCartAction={() => {}}
        displayCartModal={() => {}}
        products={[]}
        disabled={false}
        virtualBundleConflict={false}
        updateDynamicStyles={() => {}}
        total={1000}
        cartItemsReturnInfo={{
          allReturnable: true,
          allExchangeable: true,
          sameReturnPeriod: false,
          commonReturnPeriod: null,
          cartCount: 2
        }}
      />
    );

    const returnInfoBannerWrapper = wrapper.find('.returnInfoBanner');
    expect(returnInfoBannerWrapper.length).toBe(0);
  });

  it('should not show return info banner when AB variant is `onstrip` and return policy is not uniform', () => {
    window._checkout_ = {
      __myx_ab__: { 'cart.returnpolicy': 'onstrip' },
      __myx_deviceData__: { isApp: true }
    };

    const wrapper = mount(
      <PlaceOrder
        coverFeeOpted={false}
        coverFeeApplicable={false}
        handleCartAction={() => {}}
        displayCartModal={() => {}}
        products={[]}
        disabled={false}
        virtualBundleConflict={false}
        updateDynamicStyles={() => {}}
        total={1000}
        cartItemsReturnInfo={{
          allReturnable: true,
          allExchangeable: false,
          sameReturnPeriod: false,
          commonReturnPeriod: null,
          cartCount: 2
        }}
      />
    );

    const returnInfoBannerWrapper = wrapper.find('.returnInfoBanner');
    expect(returnInfoBannerWrapper.length).toBe(0);
  });

  it('should not show return info banner when AB variant is `onstrip` and return policy is not uniform', () => {
    window._checkout_ = {
      __myx_ab__: { 'cart.returnpolicy': 'onstrip' },
      __myx_deviceData__: { isApp: true }
    };

    const wrapper = mount(
      <PlaceOrder
        coverFeeOpted={false}
        coverFeeApplicable={false}
        handleCartAction={() => {}}
        displayCartModal={() => {}}
        products={[]}
        disabled={false}
        virtualBundleConflict={false}
        updateDynamicStyles={() => {}}
        total={1000}
        cartItemsReturnInfo={{
          allReturnable: false,
          allExchangeable: true,
          sameReturnPeriod: false,
          commonReturnPeriod: null,
          cartCount: 2
        }}
      />
    );

    const returnInfoBannerWrapper = wrapper.find('.returnInfoBanner');
    expect(returnInfoBannerWrapper.length).toBe(0);
  });

  it('should not show return info banner when AB variant is `onstrip` and products have uniform return policy', () => {
    window._checkout_ = {
      __myx_ab__: { 'cart.returnpolicy': 'onstrip' },
      __myx_deviceData__: { isApp: true }
    };

    const wrapper = mount(
      <PlaceOrder
        coverFeeOpted={false}
        coverFeeApplicable={false}
        handleCartAction={() => {}}
        displayCartModal={() => {}}
        products={[]}
        disabled={false}
        virtualBundleConflict={false}
        updateDynamicStyles={() => {}}
        total={1000}
        cartItemsReturnInfo={{
          allReturnable: true,
          allExchangeable: false,
          sameReturnPeriod: true,
          commonReturnPeriod: 10,
          cartCount: 2
        }}
        showReturnInfoBanner={true}
      />
    );

    const returnInfoBannerWrapper = wrapper.find('.returnInfoBanner');
    expect(returnInfoBannerWrapper.length).toBe(1);
    const returnInfoBannerText = returnInfoBannerWrapper.find('.text').text();
    expect(returnInfoBannerText).toBe('10 days easy return on all items.');
  });

  it('should not show return info banner when AB variant is `onstrip` and products have uniform exchange policy', () => {
    window._checkout_ = {
      __myx_ab__: { 'cart.returnpolicy': 'onstrip' },
      __myx_deviceData__: { isApp: true }
    };

    const wrapper = mount(
      <PlaceOrder
        coverFeeOpted={false}
        coverFeeApplicable={false}
        handleCartAction={() => {}}
        displayCartModal={() => {}}
        products={[]}
        disabled={false}
        virtualBundleConflict={false}
        updateDynamicStyles={() => {}}
        total={1000}
        cartItemsReturnInfo={{
          allReturnable: false,
          allExchangeable: true,
          sameReturnPeriod: true,
          commonReturnPeriod: 10,
          cartCount: 2
        }}
        showReturnInfoBanner={true}
      />
    );

    const returnInfoBannerWrapper = wrapper.find('.returnInfoBanner');
    expect(returnInfoBannerWrapper.length).toBe(1);
    const returnInfoBannerText = returnInfoBannerWrapper.find('.text').text();
    expect(returnInfoBannerText).toBe('10 days easy exchange on all items.');
  });

  it('should not show return info banner when AB variant is `oncard` and return policy is same', () => {
    window._checkout_ = {
      __myx_ab__: { 'cart.returnpolicy': 'oncard' },
      __myx_deviceData__: { isApp: true }
    };

    const wrapper = mount(
      <PlaceOrder
        coverFeeOpted={false}
        coverFeeApplicable={false}
        handleCartAction={() => {}}
        displayCartModal={() => {}}
        products={[]}
        disabled={false}
        virtualBundleConflict={false}
        updateDynamicStyles={() => {}}
        total={1000}
        cartItemsReturnInfo={{
          allReturnable: true,
          allExchangeable: true,
          sameReturnPeriod: true,
          commonReturnPeriod: 5,
          cartCount: 2
        }}
      />
    );

    const returnInfoBannerWrapper = wrapper.find('.returnInfoBanner');
    expect(returnInfoBannerWrapper.length).toBe(0);
  });

  it('should show return info banner when AB variant is `onstrip` and return policy is same', () => {
    window._checkout_ = {
      __myx_ab__: { 'cart.returnpolicy': 'onstrip' },
      __myx_deviceData__: { isApp: true }
    };

    const wrapper = mount(
      <PlaceOrder
        coverFeeOpted={false}
        coverFeeApplicable={false}
        handleCartAction={() => {}}
        displayCartModal={() => {}}
        products={[]}
        disabled={false}
        virtualBundleConflict={false}
        updateDynamicStyles={() => {}}
        total={1000}
        cartItemsReturnInfo={{
          allReturnable: true,
          allExchangeable: true,
          sameReturnPeriod: true,
          commonReturnPeriod: 5,
          cartCount: 2
        }}
        showReturnInfoBanner={true}
      />
    );

    const returnInfoBannerWrapper = wrapper.find('.returnInfoBanner');
    expect(returnInfoBannerWrapper.length).toBe(1);
    const returnInfoBannerText = returnInfoBannerWrapper.find('.text').text();
    expect(returnInfoBannerText).toBe(
      '5 days easy return and exchange on all items.'
    );
  });
});

describe('ItemSelectionStrip comp', () => {
  it('should render place order button with ItemSelectionStrip and show select atleast one item if selectedProductCount is 0', () => {
    const wrapper = mount(
      <PlaceOrder
        coverFeeOpted={false}
        coverFeeApplicable={false}
        handleCartAction={() => {}}
        displayCartModal={() => {}}
        products={[]}
        disabled={false}
        virtualBundleConflict={false}
        updateDynamicStyles={() => {}}
        total={0}
        selectedProductCount={0}
      />
    );

    const button = wrapper.find('.placeOrderButton');

    expect(button).toHaveLength(1);
    expect(button.text()).toEqual('PLACE ORDER');
    expect(wrapper.find('.itemSelectedStrip').exists()).toBe(true);
    expect(wrapper.find('.itemSelectedStrip').text()).toBe(
      'No Item selected, select at least one item to place order.'
    );
  });

  it('should render  ItemSelectionStrip show number of items selected', () => {
    const wrapper = mount(
      <PlaceOrder
        coverFeeOpted={false}
        coverFeeApplicable={false}
        handleCartAction={() => {}}
        displayCartModal={() => {}}
        products={[]}
        disabled={false}
        virtualBundleConflict={false}
        updateDynamicStyles={() => {}}
        total={0}
        selectedProductCount={3}
      />
    );

    const button = wrapper.find('.placeOrderButton');

    expect(button).toHaveLength(1);
    expect(button.text()).toEqual('PLACE ORDER');
    expect(wrapper.find('.itemSelectedStrip').exists()).toBe(true);
    expect(wrapper.find('.itemSelectedStrip').text()).toBe(
      '3 Items selected for order'
    );
  });

  it('should not show value if price invisibility is enabled', () => {
    const wrapper = mount(
      <PlaceOrder
        coverFeeOpted={false}
        coverFeeApplicable={false}
        handleCartAction={() => {}}
        displayCartModal={() => {}}
        products={[]}
        disabled={false}
        virtualBundleConflict={false}
        updateDynamicStyles={() => {}}
        total={0}
        selectedProductCount={3}
        currentPage={checkoutPage.CART}
      />
    );
    const button = wrapper.find('.placeOrderButton');
    expect(button).toHaveLength(1);
    expect(button.text()).toEqual('PLACE ORDER');
    expect(wrapper.find('.fullWidthButton').exists()).toBe(true);
  });
});
