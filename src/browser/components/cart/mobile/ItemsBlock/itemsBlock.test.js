import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import ItemsBlock from './';
import CartManager from 'commonBrowserUtils/CartManager';
import { localStorageKeys } from 'commonUtils/constants';
import {
  ItemListWithOffer,
  ProductsList,
  unavailableSizes
} from 'testUtils/cartMockData';

describe('ItemsBlock for mobile', () => {
  CartManager.notifyMe = () => {};

  const NOTIFY_ME_STORAGE_KEY = 'notify_me_subscribed';
  it('should render all the item components', () => {
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

    let wrapper = mount(<ItemsBlock data={data} total={300} />);
    expect(wrapper.find('#cartItemsList').length).not.toBe(0);
    expect(wrapper.find('#cartItemsList').children.length).toBe(1);
  });

  it('should not render the item components when no data present', () => {
    let data = null;
    let wrapper = mount(<ItemsBlock data={data} total={300} />);

    expect(wrapper.html()).toBe(null);
  });

  it('should only make notifyMe call for oos products', () => {
    window._checkout_ = {
      __myx_features__: {
        'checkout.notifymeSubscription.enable': true
      }
    };

    let notifyMeSubscriberSuccess = sinon
      .stub(CartManager, 'notifyMe')
      .yields();

    unavailableSizes[0].available = true;
    unavailableSizes[0].inventory = 0;
    ProductsList.itemsList[0].sizes = unavailableSizes;

    let expectedOOSProducts = [
      {
        styleId: ProductsList.itemsList[0].id,
        skuId: ProductsList.itemsList[0].skuId
      }
    ];

    // Checking whether data was correctly stored
    let expectedLocalStorageData = {};
    expectedLocalStorageData['products'] = {};
    const oosObjKey = `${ProductsList.itemsList[0].id}-${ProductsList.itemsList[0].skuId}`;
    expectedLocalStorageData['products'][oosObjKey] = true;

    let data = {
      count: 5,
      products: ProductsList.itemsList,
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

    mount(<ItemsBlock data={data} total={300} />);
    expect(notifyMeSubscriberSuccess.callCount).toEqual(1);
    expect(notifyMeSubscriberSuccess.getCalls()[0].args[0]).toEqual(
      expectedOOSProducts
    );
    const localStorageData = JSON.parse(
      localStorage.getItem(localStorageKeys.NOTIFY_ME_STORAGE_KEY)
    );
    expect(expectedLocalStorageData).toEqual(localStorageData);

    localStorage.removeItem(localStorageKeys.NOTIFY_ME_STORAGE_KEY);
    notifyMeSubscriberSuccess.restore();
  });

  it('should not save data in local storage in case api fails', () => {
    window._checkout_ = {
      __myx_features__: {
        'checkout.notifymeSubscription.enable': true
      }
    };

    let notifyMeSubscriberFailure = sinon
      .stub(CartManager, 'notifyMe')
      .yieldsRight();

    unavailableSizes[0].available = true;
    unavailableSizes[0].inventory = 0;
    ProductsList.itemsList[0].sizes = unavailableSizes;

    let expectedOOSProducts = [
      {
        styleId: ProductsList.itemsList[0].id,
        skuId: ProductsList.itemsList[0].skuId
      }
    ];

    let data = {
      count: 5,
      products: ProductsList.itemsList,
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

    mount(<ItemsBlock data={data} total={300} />);
    expect(notifyMeSubscriberFailure.callCount).toEqual(1);
    expect(notifyMeSubscriberFailure.getCalls()[0].args[0]).toEqual(
      expectedOOSProducts
    );
    const localStorageData = JSON.parse(
      localStorage.getItem(NOTIFY_ME_STORAGE_KEY)
    );
    expect(localStorageData).toEqual(null);
    notifyMeSubscriberFailure.restore();
  });

  it('should not subscribe to already subscribed products', () => {
    window._checkout_ = {
      __myx_features__: {
        'checkout.notifymeSubscription.enable': true
      }
    };

    let notifyMeSubscriberSuccess = sinon
      .stub(CartManager, 'notifyMe')
      .yields();

    // Set unavailable products in data
    unavailableSizes[0].available = true;
    unavailableSizes[0].inventory = 0;
    ProductsList.itemsList[0].sizes = unavailableSizes;
    ProductsList.itemsList[1].sizes = unavailableSizes;

    // Save alread subscribed products in localstorage
    let alreadySubscribed = {};

    const oosObjKey = `${ProductsList.itemsList[0].id}-${ProductsList.itemsList[0].skuId}`;

    alreadySubscribed[oosObjKey] = true;
    localStorage.setItem(
      localStorageKeys.NOTIFY_ME_STORAGE_KEY,
      JSON.stringify({
        products: alreadySubscribed
      })
    );

    const expectedOOSProducts = [
      {
        styleId: ProductsList.itemsList[1].id,
        skuId: ProductsList.itemsList[1].skuId
      }
    ];

    let data = {
      count: 5,
      products: ProductsList.itemsList,
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

    mount(<ItemsBlock data={data} total={300} />);
    expect(notifyMeSubscriberSuccess.callCount).toEqual(1);
    expect(notifyMeSubscriberSuccess.getCalls()[0].args[0]).toEqual(
      expectedOOSProducts
    );

    // Remove unavailable products to local storage
    localStorage.removeItem(NOTIFY_ME_STORAGE_KEY);
    notifyMeSubscriberSuccess.restore();
  });
});
