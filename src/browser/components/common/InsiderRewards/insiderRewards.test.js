import React from 'react';

import { mount } from 'enzyme';
import sinon from 'sinon';

import InsiderRewards from './index';

import CartManager from 'commonBrowserUtils/CartManager';
import { cartMockData } from 'testUtils/cartMockData';

import Styles from './insiderRewards.base.css';
import Style from './Components/components.base.css';

describe('Insider Rewards Component', () => {
  let spy;
  let totalPoints;

  beforeEach(() => {
    totalPoints = 10;
    CartManager.getPointsForItems = (products, successCallback) => {
      successCallback({
        enrolmentStatus: 'ENROLLED',
        totalPoints
      });
    };
    spy = sinon.spy(CartManager, 'getPointsForItems');
    window._checkout_ = {
      __myx_ab__: {}
    };
    window.SHELL = {
      alert: () => {}
    };
    window.triggerEvent = () => {};
  });

  it('should display insider points correctly', () => {
    const insiderRewards = mount(
      <InsiderRewards
        cartData={{
          products: cartMockData.products
        }}
      />
    );

    // just to make sure promises are resolved before hand
    setTimeout(() => {
      expect(CartManager.getPointsForItems.called).toBeTruthy();
      const rewardsContainer = insiderRewards.find(
        `.${Styles.rewardsContainer}`
      );
      expect(rewardsContainer).toHaveLength(1);
      expect(
        rewardsContainer
          .find(`.${Styles.textGreen}`)
          .text()
          .trim()
      ).toBe('10');
    });
  });

  it('should update insider points if cart is updated', () => {
    const insiderRewards = mount(
      <InsiderRewards
        cartData={{
          products: cartMockData.products,
          modifiedAt: '2006101112'
        }}
        selectedProducts={cartMockData.products}
      />
    );

    // just to make sure promises are resolved before hand
    setTimeout(() => {
      expect(CartManager.getPointsForItems.called).toBeTruthy();
      const rewardsContainer = insiderRewards.find(
        `.${Styles.rewardsContainer}`
      );
      expect(rewardsContainer).toHaveLength(1);
      expect(
        rewardsContainer
          .find(`.${Styles.textGreen}`)
          .text()
          .trim()
      ).toBe('10');

      totalPoints = 22; // Points have changed
      // Component updated
      insiderRewards.setProps({
        cartData: {
          products: [
            { ...cartMockData.products[0] },
            { ...cartMockData.products[1], id: '114211' }
          ],
          modifiedAt: '2006111222'
        },
        selectedProducts: [
          { ...cartMockData.products[0] },
          { ...cartMockData.products[1], id: '114211' }
        ]
      });
      insiderRewards.update();

      const updatedRewardsContainer = insiderRewards.find(
        `.${Styles.rewardsContainer}`
      );
      expect(updatedRewardsContainer).toHaveLength(1);
      expect(
        updatedRewardsContainer
          .find(`.${Styles.textGreen}`)
          .text()
          .trim()
      ).toBe('22');
    });
  });

  it('should call the api if insider data is cached', () => {
    const insiderRewards = mount(
      <InsiderRewards
        cartData={{
          products: cartMockData.products,
          modifiedAt: '2006101112'
        }}
        selectedProducts={cartMockData.products}
      />
    );

    // just to make sure promises are resolved before hand
    setTimeout(() => {
      expect(CartManager.getPointsForItems.calledOnce).toBeTruthy();
      insiderRewards.setProps({
        cartData: {
          products: cartMockData.products,
          modifiedAt: '2006111222'
        },
        selectedProducts: cartMockData.products
      });
      insiderRewards.update();

      expect(CartManager.getPointsForItems.calledTwice).toBeFalsy();
    });
  });

  it('should not display anything if points <= 0 and user is insider', () => {
    CartManager.getPointsForItems = (products, successCallback) => {
      successCallback({
        enrolmentStatus: 'ENROLLED',
        totalPoints: 0
      });
    };
    spy = sinon.spy(CartManager, 'getPointsForItems');
    const insiderRewards = mount(
      <InsiderRewards
        cartData={{
          products: [
            { ...cartMockData.products[0] },
            { ...cartMockData.products[1], id: 113214211 }
          ],
          modifiedAt: '23143567'
        }}
        selectedProducts={[
          { ...cartMockData.products[0] },
          { ...cartMockData.products[1], id: 113214211 }
        ]}
      />
    );
    expect(CartManager.getPointsForItems.called).toBeTruthy();
    expect(insiderRewards.find(`.${Styles.rewardsContainer}`)).toHaveLength(0);
  });

  it('should work properly if points go from non-zero to zero', () => {
    const insiderRewards = mount(
      <InsiderRewards
        cartData={{
          products: cartMockData.products,
          modifiedAt: '2006111122'
        }}
      />
    );

    // just to make sure promises are resolved before hand
    setTimeout(() => {
      expect(CartManager.getPointsForItems.called).toBeTruthy();
      const rewardsContainer = insiderRewards.find(
        `.${Styles.rewardsContainer}`
      );
      expect(rewardsContainer).toHaveLength(1);
      expect(
        rewardsContainer
          .find(`.${Styles.textGreen}`)
          .text()
          .trim()
      ).toBe('10');

      totalPoints = 0;
      insiderRewards.setProps({
        cartData: {
          modifiedAt: '2006111222'
        },
        selectedProducts: [
          { ...cartMockData.products[0] },
          { ...cartMockData.products[1], id: 11321 }
        ]
      });
      insiderRewards.update();
      expect(CartManager.getPointsForItems.called).toBeTruthy();
      expect(insiderRewards.find(`.${Styles.rewardsContainer}`)).toHaveLength(
        0
      );
    });
  });
});
