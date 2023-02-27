import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { mount } from 'enzyme';
import sinon from 'sinon';
import ItemsBlock from '.';
import {
  ItemListWithOffer,
  productListWithOffer
} from 'testUtils/cartMockData';

describe('ItemsBlock for desktop', () => {
  window.triggerEvent = sinon.spy();
  it('should render all the item components - conflict, cart merged and not a return abuser', () => {
    window._checkout_ = {};
    ItemListWithOffer.itemsList[0].conflict = {
      price: {
        state: 'CONFLICTED',
        oldPrice: 2000
      }
    };
    let data = {
      count: 5,
      products: ItemListWithOffer.itemsList,
      conflict: {
        state: 'CONFLICTED',
        price: {
          state: 'CONFLICTED',
          oldPrice: 200
        }
      },
      cartMergeState: 'MERGED',
      userDetails: {},
      price: ItemListWithOffer.itemsList[0].price,
      offers: [
        {
          id: ItemListWithOffer.groupData.id
        }
      ]
    };
    let wrapper = mount(<ItemsBlock data={data} total={300} oosItems={[]} />);
    expect(wrapper.find('.leftBlock').length).not.toBe(0);
    expect(wrapper.find('.priceDropIcon').length).not.toBe(0);
    expect(wrapper.find('.priceDropIcon + .header').text()).toEqual(
      'Prices Have Dropped'
    );
    expect(wrapper.find('.container').length).not.toBe(0);
    expect(wrapper.find('.info .header').length).toBe(0);
    expect(wrapper.find('.info .textMessage').length).toBe(0);
    expect(wrapper.find('BulkActionStrip').exists()).toBe(true);
    expect(wrapper.find('#cartItemsList').length).not.toBe(0);
    expect(wrapper.find('#cartItemsList').children.length).toBe(1);
  });

  it('should render all the item components - no conflict and cart not merge', () => {
    let data = {
      count: 5,
      products: ItemListWithOffer.itemsList,
      conflict: {
        state: 'NOT_CONFLICTED',
        oldPrice: 200
      },
      cartMergeState: 'NOT_MERGED',
      userDetails: {},
      price: ItemListWithOffer.itemsList[0].price,
      offers: [
        {
          id: ItemListWithOffer.groupData.id
        }
      ]
    };
    document.cookie = 'ilgim=true';
    let wrapper = mount(<ItemsBlock data={data} total={300} oosItems={[]} />);

    expect(wrapper.find('.leftBlock').length).not.toBe(0);
    expect(wrapper.find('.container').length).toBe(1);
    expect(wrapper.find('.info .header').length).toBe(0);
    expect(wrapper.find('.info .textMessage').length).toBe(0);
    expect(wrapper.find('BulkActionStrip').exists()).toBe(true);
    expect(wrapper.find('#cartItemsList').length).not.toBe(0);
    expect(wrapper.find('#cartItemsList').children.length).toBe(1);
  });

  it('should not render the item components when no data present', () => {
    let data = null;
    let wrapper = mount(<ItemsBlock data={data} total={300} />);

    expect(wrapper.html()).toBe(null);
  });

  it('should render conflicted component and when experiment value is onlydecrease', () => {
    let data = {
      products: productListWithOffer.productList1,
      conflict: productListWithOffer.productList1[0].conflict,
      cartMergeState: 'MERGED',
      userDetails: {},
      price: productListWithOffer.productList1[0].price,
      offers: [
        {
          id: productListWithOffer.groupData.id
        }
      ]
    };
    let data2 = {
      products: productListWithOffer.productList2,
      conflict: productListWithOffer.productList2[0].conflict,
      cartMergeState: 'MERGED',
      userDetails: {},
      price: productListWithOffer.productList2[0].price,
      offers: [
        {
          id: productListWithOffer.groupData.id
        }
      ]
    };

    window._checkout_ = {};
    window._checkout_.__myx_ab__ = {};
    window._checkout_.__myx_ab__['cart.pricedrop'] = 'onlydecrease';

    let wrapper = mount(<ItemsBlock data={data} total={300} oosItems={[]} />);
    expect(wrapper.find('.priceDropIcon').length).not.toBe(0);
    expect(wrapper.find('.priceDropIcon + .header').text()).toEqual(
      'Prices Have Dropped'
    );

    let wrapper2 = mount(<ItemsBlock data={data2} total={300} oosItems={[]} />);
    expect(wrapper2.find('.priceDropIcon').length).toBe(0);
  });

  describe('AocV2', () => {
    it('should render the aocv2 strip if ab is on', () => {
      window._checkout_ = {
        __myx_features__: {
          'checkout.addressOnCartV2.enabled': true
        },
        __myx_ab__: { 'cart.addressoncartv2': 'variant2' }
      };
      const userSelectedLocation = {
        pincode: '560068',
        addressInfo: {
          id: 909454308,
          unifiedId: '909454308:4',
          isDefault: true,
          checkoutAllowed: true,
          addressType: 'HOME',
          notAvailableDays: [],
          streetAddress: '1,madfsa',
          locality: 'bangalore',
          landmark: null,
          city: 'Bengaluru',
          pincode: '560068',
          state: { code: 'KA', name: 'Karnataka' },
          country: { code: 'IN', name: 'India' },
          user: {
            uidx: 'automation-94048ece.8722.4ffc.b892.44cd564d53b99yxCLjNAzg',
            name: 'asdfasdf',
            email: '',
            mobile: '7147781488'
          }
        },
        addressNotFound: false
      };
      const data = {
        count: 5,
        products: ItemListWithOffer.itemsList,
        conflict: {
          state: 'CONFLICTED',
          oldPrice: 200
        },
        cartMergeState: 'MERGED',
        userDetails: {},
        price: ItemListWithOffer.itemsList[0].price,
        offers: [
          {
            id: ItemListWithOffer.groupData.id
          }
        ]
      };
      render(
        <ItemsBlock
          data={data}
          userSelectedLocation={userSelectedLocation}
          total={300}
          oosItems={[]}
        />
      );

      expect(screen.getByText('Deliver to:')).toBeInTheDocument();
    });

    it('should not render the aocv2 strip if FG is off', () => {
      window._checkout_ = {
        __myx_features__: {
          'checkout.addressOnCartV2.enabled': false
        },
        __myx_ab__: { 'cart.addressoncartv2': 'variant2' }
      };
      const userSelectedLocation = {
        pincode: '560068',
        addressInfo: {
          id: 909454308,
          unifiedId: '909454308:4',
          isDefault: true,
          checkoutAllowed: true,
          addressType: 'HOME',
          notAvailableDays: [],
          streetAddress: '1,madfsa',
          locality: 'bangalore',
          landmark: null,
          city: 'Bengaluru',
          pincode: '560068',
          state: { code: 'KA', name: 'Karnataka' },
          country: { code: 'IN', name: 'India' },
          user: {
            uidx: 'automation-94048ece.8722.4ffc.b892.44cd564d53b99yxCLjNAzg',
            name: 'asdfasdf',
            email: '',
            mobile: '7147781488'
          }
        },
        addressNotFound: false
      };
      const data = {
        count: 5,
        products: ItemListWithOffer.itemsList,
        conflict: {
          state: 'CONFLICTED',
          oldPrice: 200
        },
        cartMergeState: 'MERGED',
        userDetails: {},
        price: ItemListWithOffer.itemsList[0].price,
        offers: [
          {
            id: ItemListWithOffer.groupData.id
          }
        ]
      };
      render(
        <ItemsBlock
          data={data}
          userSelectedLocation={userSelectedLocation}
          total={300}
          oosItems={[]}
        />
      );

      expect(screen.queryByText('Deliver to:')).toBeNull();
    });
  });
});
