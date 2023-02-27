import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { mount } from 'enzyme';
import sinon from 'sinon';
import TryAndBuy from '.';
import serviceabilityData from 'testUtils/serviceabilityMockData';

describe('Try & Buy for address', () => {
  window._checkout_ = {
    __myx_features__: { 'paid.trynbuy.enabled': true },
    __myx_kvpairs__: {
      'cart.paidTryNBuy': {
        firstUser: 'free for first order',
        codNotAvailable: 'Available only on Prepaid'
      },
      'shipping.charges.tryNbuy': 1,
      'shipping.trynbuy.max_items': 3,
      'shipping.trynbuy.min_amount': 999
    }
  };
  window.triggerEvent = () => {};

  it('should show Try & Buy available block', () => {
    const wrapper = mount(
      <TryAndBuy
        tryNBuyApplicable={{ remark: 'NO_ISSUE' }}
        s
        products={serviceabilityData.products}
        tryNBuyServiceable={true}
        count={4}
      />
    );
    expect(wrapper.find('.title').text()).toContain('Try & Buy');
    expect(wrapper.find('ImageBanner')).toHaveLength(0);
    expect(wrapper.text()).toContain('Try items at the time of delivery');
    expect(wrapper.text()).toContain('Available only on Prepaid');
  });

  it('should show Try & Buy with too many items', () => {
    const wrapper = mount(
      <TryAndBuy
        tryNBuyApplicable={{ remark: 'TOO_MANY_ITEMS' }}
        products={serviceabilityData.products}
        tryNBuyServiceable={true}
        count={4}
      />
    );
    expect(wrapper.find('.title').text()).toContain('Try & Buy not available');
    expect(wrapper.find('ImageBanner').prop('name')).toContain(
      'trynbuy-unavailable'
    );
    expect(wrapper.text()).toContain(
      'Orders with more than 3 items are not eligible'
    );
  });

  it('should show Try & Buy with less amount', () => {
    const wrapper = mount(
      <TryAndBuy
        tryNBuyApplicable={{ remark: 'AMOUNT_IS_LESS_THAN_ALLOWED' }}
        products={serviceabilityData.products}
        tryNBuyServiceable={true}
        count={4}
      />
    );
    expect(wrapper.find('.title').text()).toContain('Try & Buy not available');
    expect(wrapper.find('ImageBanner').prop('name')).toContain(
      'trynbuy-unavailable'
    );
    expect(wrapper.text()).toContain('Orders below 999 are not eligible');
  });

  it('should show Try & Buy with express delivery', () => {
    const wrapper = mount(
      <TryAndBuy
        tryNBuyApplicable={{ remark: 'NO_TNB_WITH_EXPRESS_DELIVERY' }}
        products={serviceabilityData.products}
        tryNBuyServiceable={true}
        count={4}
      />
    );
    expect(wrapper.find('.title').text()).toContain('Try & Buy not available');
    expect(wrapper.find('ImageBanner').prop('name')).toContain(
      'trynbuy-unavailable'
    );
    expect(wrapper.text()).toContain('Available only with standard delivery');
  });

  it('should show Try & Buy when seller is not allowing', () => {
    const wrapper = mount(
      <TryAndBuy
        tryNBuyApplicable={{ remark: 'SELLER_NOT_ALLOWING' }}
        products={serviceabilityData.products}
        tryNBuyServiceable={true}
        count={4}
      />
    );
    expect(wrapper.find('.title').text()).toContain('Try & Buy not available');
    expect(wrapper.find('ImageBanner').prop('name')).toContain(
      'trynbuy-unavailable'
    );
    expect(wrapper.text()).toContain(
      'This order is not eligible for Try & Buy'
    );
  });

  it('should show Try & Buy modal', () => {
    const wrapper = mount(
      <TryAndBuy
        tryNBuyApplicable={{ remark: 'NO_ISSUE' }}
        products={serviceabilityData.products}
        tryNBuyServiceable={true}
        count={4}
      />
    );
    wrapper.find('.how').simulate('click');
    expect(wrapper.find('div.modal')).toHaveLength(1);
  });

  it('should call toggleTryNBuy on clicking checkbox', () => {
    const handleCartAction = sinon.spy();
    const wrapper = mount(
      <TryAndBuy
        tryNBuyApplicable={{ remark: 'NO_ISSUE' }}
        products={serviceabilityData.products}
        productDeliveryInfo={
          serviceabilityData.serviceability.productDeliveryInfo
        }
        handleCartAction={handleCartAction}
        tryNBuyServiceable={true}
        count={4}
      />
    );
    wrapper.find('CheckboxInactive.checkboxIcon').simulate('click');
    expect(handleCartAction).toHaveProperty('callCount', 1);
  });

  it('should not show Try & Buy', () => {
    window._checkout_ = {
      __myx_features__: { 'paid.trynbuy.enabled': false }
    };
    const wrapper = mount(
      <TryAndBuy
        tryNBuyApplicable={{ remark: 'NO_ISSUE' }}
        products={serviceabilityData.products}
        count={4}
      />
    );
    expect(wrapper.html()).toEqual(null);
  });

  it('Should show All items are are eligible for Try & Buy', () => {
    const tnbEnabledProd = serviceabilityData.products[0];
    tnbEnabledProd.productServiceabilityInfo.tryNBuyAvailable = true;
    window._checkout_ = {
      __myx_features__: { 'paid.trynbuy.enabled': true },
      __myx_kvpairs__: {
        'cart.paidTryNBuy': {
          firstUser: 'free for first order',
          codNotAvailable: 'Available only on Prepaid'
        },
        'shipping.charges.tryNbuy': 1,
        'shipping.trynbuy.max_items': 3,
        'shipping.trynbuy.min_amount': 999
      }
    };
    const wrapper = mount(
      <TryAndBuy
        tryNBuyApplicable={{ remark: 'NO_ISSUE' }}
        products={[tnbEnabledProd]}
        productDeliveryInfo={
          serviceabilityData.serviceability.productDeliveryInfo
        }
        count={1}
      />
    );
    expect(wrapper.find('.message').get(0).props.children[1]).toEqual(
      'All items are eligible for Try & Buy'
    );
  });

  it('should show Try & Buy available block for new users', () => {
    window._checkout_ = {
      __myx_deviceData__: { isApp: true },
      __myx_features__: { 'paid.trynbuy.enabled': true },
      __myx_profile__: {},
      __myx_ab__: { 'newuser.trynbuy': 'enabled' },
      __myx_kvpairs__: {
        'shipping.newUserTnb': {
          oldPrice: 49,
          newPrice: 0,
          message: 'for your first purchase'
        }
      }
    };

    const wrapper = mount(
      <TryAndBuy
        isNewUser={true}
        tryNBuyApplicable={{ remark: 'NO_ISSUE' }}
        products={serviceabilityData.products}
        tryNBuyServiceable
        count={4}
      />
    );
    expect(wrapper.find('.title').text()).toContain('Try & Buy');
    expect(wrapper.find('ImageBanner')).toHaveLength(0);
    expect(wrapper.text()).toContain('Try items at the time of delivery');
  });

  describe('AocV2Variant3', () => {
    it('should show view Items buttons', () => {
      window._checkout_ = {
        __myx_deviceData__: { isApp: true, isMobile: true },
        __myx_features__: {
          'paid.trynbuy.enabled': true,
          'checkout.addressOnCartV2.enabled': true
        },
        __myx_profile__: {},
        __myx_ab__: {
          'newuser.trynbuy': 'enabled',
          'cart.addressoncartv2': 'variant3'
        },
        __myx_kvpairs__: {
          'shipping.newUserTnb': {
            oldPrice: 49,
            newPrice: 0,
            message: 'for your first purchase'
          }
        }
      };

      render(
        <TryAndBuy
          isNewUser={true}
          tryNBuyApplicable={{ remark: 'NO_ISSUE' }}
          products={serviceabilityData.products}
          tryNBuyServiceable
          count={4}
        />
      );

      expect(screen.queryByText('View Items')).toBeInTheDocument();
    });

    it('should show modal with items on click of view items and close it on click of got it', () => {
      window._checkout_ = {
        __myx_deviceData__: { isApp: true, isMobile: true },
        __myx_features__: {
          'paid.trynbuy.enabled': true,
          'checkout.addressOnCartV2.enabled': true
        },
        __myx_profile__: {},
        __myx_ab__: {
          'newuser.trynbuy': 'enabled',
          'cart.addressoncartv2': 'variant3'
        },
        __myx_kvpairs__: {
          'shipping.newUserTnb': {
            oldPrice: 49,
            newPrice: 0,
            message: 'for your first purchase'
          }
        }
      };

      render(
        <TryAndBuy
          isNewUser={true}
          tryNBuyApplicable={{ remark: 'NO_ISSUE' }}
          products={serviceabilityData.products}
          tryNBuyServiceable
          count={4}
        />
      );

      userEvent.click(screen.queryByText('View Items'));

      expect(
        screen.queryByText("Women's Victory Compression Sports Bra")
      ).toBeInTheDocument();
      expect(screen.queryByText('GOT IT')).toBeInTheDocument();

      userEvent.click(screen.getByText('GOT IT'));

      expect(
        screen.queryByText("Women's Victory Compression Sports Bra")
      ).not.toBeInTheDocument();
      expect(screen.queryByText('GOT IT')).not.toBeInTheDocument();
    });
  });
});
