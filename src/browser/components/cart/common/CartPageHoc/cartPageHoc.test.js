import React from 'react';
import { shallow, render, mount } from 'enzyme';
import sinon from 'sinon';
import CartPageHoc from '.';
import { ItemListWithOffer } from 'testUtils/cartMockData';
import CartManager from 'commonBrowserUtils/CartManager';

const cartPageData = {
  httpStatus: 200,
  cartData: {
    products: [
      {
        id: 11,
        offerId: 167,
        price: ItemListWithOffer.itemsList[0].price
      },
      {
        id: 22,
        offerId: 167,
        price: ItemListWithOffer.itemsList[0].price
      },
      {
        id: 33,
        price: ItemListWithOffer.itemsList[0].price
      }
    ],
    offers: [
      {
        id: 167
      }
    ],
    price: ItemListWithOffer.itemsList[0].price,
    userDetails: {
      returnAbuser: {
        level: 'DEFAULT'
      }
    }
  }
};

const HocTestComponent = ({ spyFunc, ...props }) => {
  spyFunc(props);
  return null;
};

describe('Cart Page', () => {
  beforeEach(() => {
    window.SHELL = {
      setActivePage: () => {},
      alert: () => {}
    };
    window._checkout_ = {
      __myx_ab__: {},
      __myx_deviceData__: {},
      __myx_data__: null
    };
  });

  it('should render the cart page ', () => {
    window._checkout_.__myx_data__ = cartPageData;
    const triggerSpy = sinon.spy();
    window.triggerEvent = triggerSpy;
    const analyticsFunc = () => sinon.spy();
    const spyFunc = sinon.spy(() => {});
    const CartPage = CartPageHoc(HocTestComponent);
    let cartPage = mount(
      <CartPage
        analytics={analyticsFunc}
        getCartStoreData={() => ({})}
        spyFunc={spyFunc}
        getAddressStoreData={() => ({})}
      />
    );
    expect(spyFunc).toHaveProperty('callCount', 2);
    expect(spyFunc.getCall(0).args[0].error).toEqual(null);
    expect(spyFunc.getCall(0).args[0].data).toEqual(null);
    expect(spyFunc.getCall(0).args[0].loading).toEqual(true);
    expect(spyFunc.getCall(1).args[0].error).toEqual(null);
    expect(spyFunc.getCall(1).args[0].data).toEqual(cartPageData.cartData);
    expect(spyFunc.getCall(1).args[0].loading).toEqual(false);
  });

  it('should render the cart page - client call - success', () => {
    CartManager.getPageData = (data, scb, ecb) => {
      scb(cartPageData);
    };
    const triggerSpy = sinon.spy(() => {});
    window.triggerEvent = triggerSpy;
    const analyticsFunc = () => sinon.spy();
    const spyFunc = sinon.spy();
    const CartPage = CartPageHoc(HocTestComponent);
    let cartPage = mount(
      <CartPage
        analytics={analyticsFunc}
        getCartStoreData={() => cartPageData.cartData}
        spyFunc={spyFunc}
        getAddressStoreData={() => ({})}
      />
    );

    expect(triggerSpy).toHaveProperty('callCount', 3);
    expect(spyFunc).toHaveProperty('callCount', 3);
    expect(spyFunc.getCall(0).args[0].error).toEqual(null);
    expect(spyFunc.getCall(0).args[0].data).toEqual(null);
    expect(spyFunc.getCall(0).args[0].loading).toEqual(true);
    expect(spyFunc.getCall(1).args[0].error).toEqual(null);
    expect(spyFunc.getCall(1).args[0].data).toEqual(cartPageData.cartData);
    expect(spyFunc.getCall(1).args[0].loading).toEqual(true);
    expect(spyFunc.getCall(2).args[0].loading).toEqual(false);
  });

  it('should render the cart page - client call - error', () => {
    CartManager.getPageData = (data, scb, ecb) => {
      ecb({ msg: 'Error' });
    };
    const triggerSpy = sinon.spy();
    window.triggerEvent = triggerSpy;
    const analyticsFunc = () => sinon.spy();
    const spyFunc = sinon.spy();
    const CartPage = CartPageHoc(HocTestComponent);
    let cartPage = mount(
      <CartPage
        analytics={analyticsFunc}
        spyFunc={spyFunc}
        getCartStoreData={() => null}
        setCartStoreData={sinon.spy()}
        getAddressStoreData={() => ({})}
      />
    );

    expect(triggerSpy).toHaveProperty('callCount', 0);
    expect(spyFunc).toHaveProperty('callCount', 3);
    expect(spyFunc.getCall(0).args[0].error).toEqual(null);
    expect(spyFunc.getCall(0).args[0].data).toEqual(null);
    expect(spyFunc.getCall(0).args[0].loading).toEqual(true);
    expect(spyFunc.getCall(2).args[0].error.msg).toEqual('Error');
    expect(spyFunc.getCall(2).args[0].data).toEqual(null);
    expect(spyFunc.getCall(2).args[0].loading).toEqual(false);
  });
});
