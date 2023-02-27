import React from 'react';
import { shallow, render, mount } from 'enzyme';
import sinon from 'sinon';
import CartItemList from './';
import { ItemListWithOffer, ProductsWithOffer } from 'testUtils/cartMockData';

describe('Cart Items List component', () => {
  describe('default case > group by offerId', () => {
    const mockFunc = sinon.spy();
    const renderFunc = sinon.spy();
    const mockData = {
      products: [
        {
          id: 11,
          offerId: 167
        },
        {
          id: 22,
          offerId: 167
        },
        {
          id: 33
        }
      ],
      offers: [
        {
          id: 167
        }
      ],
      price: ItemListWithOffer.itemsList[0].price
    };

    it('should group items by offerId and non offer items individually', () => {
      const itemsList = mount(
        <CartItemList
          handleCartAction={mockFunc}
          data={mockData}
          render={renderFunc}
        />
      );

      expect(itemsList.find('#cartItemsList').length).not.toBe(0);
      expect(renderFunc).toHaveProperty('callCount', 2);
      expect(renderFunc.getCall(1).args[1].key).toEqual('itemByGroup-noGroup0');
      expect(renderFunc.getCall(1).args[1].couponApplied).toEqual(true);
      expect(renderFunc.getCall(0).args[1].key).toEqual('itemByGroup-167');
      expect(renderFunc.getCall(0).args[1].couponApplied).toEqual(true);
    });
  });

  describe('group items by article type', () => {
    let mockFunc;
    let renderFunc;
    const mockData = {
      products: [
        {
          gender: 'Men',
          articleType: 'Flip Flops',
          articleTypeId: 127,
          brand: 'Nike',
          id: 1421326,
          name: 'Nike Men Blue Printed Chroma Flip-Flops',
          offerId: '',
          price: { mrp: 1395, total: 1395, subTotal: 1395 },
          quantity: 1
        },
        {
          gender: 'Women',
          articleType: 'Tshirts',
          articleTypeId: 90,
          brand: 'Roadster',
          id: 632366,
          name: 'Roadster Off-White & Orange Ombre-Dyed T-shirt',
          offerId: '',
          price: { mrp: 299, total: 299, subTotal: 299 },
          quantity: 1
        },
        {
          gender: 'Men',
          articleType: 'Tshirts',
          articleTypeId: 90,
          brand: 'Puma',
          id: 1531,
          name: 'Puma Men Grey Solid Henley Neck T-shirt',
          offerId: '',
          price: { mrp: 1000, total: 1000, subTotal: 1000 },
          quantity: 1
        },
        {
          gender: 'Unisex',
          articleType: 'Bedsheets',
          articleTypeId: 321,
          brand: 'Cortina',
          id: 1517087,
          name:
            'Cortina Multicoloured Cotton 220 TC Fine Double Bedsheet with 2 Pillow Covers',
          offerId: '',
          price: {
            mrp: 1898,
            total: 1898,
            subTotal: 1898,
            discounts: { data: [{ name: 'discount', value: 800 }] }
          },
          quantity: 1
        }
      ]
    };

    beforeEach(() => {
      window._checkout_ = {
        __myx_deviceData__: {
          isApp: true
        }
      };

      mockFunc = sinon.spy();
      renderFunc = sinon.spy();
    });

    it('should group and sort correctly for cart.sorted = groupandsort', () => {
      window._checkout_ = {
        ...window._checkout_,
        __myx_ab__: { 'cart.sort': 'groupandsort' }
      };

      const itemsList = mount(
        <CartItemList
          handleCartAction={mockFunc}
          data={mockData}
          render={renderFunc}
        />
      );

      expect(itemsList.find('#cartItemsList').length).not.toBe(0);
      expect(renderFunc).toHaveProperty('callCount', 4);

      const [topIspGroup, topIspGroupOptions] = renderFunc.getCall(0).args;
      const [nextIspGroup, nextIspGroupOptions] = renderFunc.getCall(1).args;
      const mockProducts = mockData.products;

      const topIspItem = mockProducts[3];
      const nextIspItem = mockProducts[0];

      // No Gender for Top ISP item (bedsheets)
      expect(topIspGroup.itemsList[0].id).toEqual(topIspItem.id);
      expect(topIspGroup.groupData.id).toEqual(`${topIspItem.articleTypeId}`);
      expect(topIspGroup.itemsList.length).toEqual(
        mockProducts.filter(
          product => product.articleTypeId === topIspItem.articleTypeId
        ).length
      );

      // Gender included for next ISP item
      expect(nextIspGroup.itemsList[0].id).toEqual(nextIspItem.id);
      expect(nextIspGroup.groupData.id).toEqual(
        `${nextIspItem.articleTypeId}-${nextIspItem.gender}`
      );
      expect(nextIspGroup.itemsList.length).toEqual(
        mockProducts.filter(
          product =>
            product.articleTypeId === nextIspItem.articleTypeId &&
            product.gender === nextIspItem.gender
        ).length
      );

      expect(topIspGroupOptions.key).toEqual(
        `itemByGroup-${topIspItem.articleTypeId}`
      );
      expect(nextIspGroupOptions.key).toEqual(
        `itemByGroup-${nextIspItem.articleTypeId}-${nextIspItem.gender}`
      );
    });

    it('should group items correctly for cart.sorted = onlygroup', () => {
      window._checkout_ = {
        ...window._checkout_,
        __myx_ab__: { 'cart.sort': 'onlygroup' }
      };

      const itemsList = mount(
        <CartItemList
          handleCartAction={mockFunc}
          data={mockData}
          render={renderFunc}
        />
      );

      expect(itemsList.find('#cartItemsList').length).not.toBe(0);
      expect(renderFunc).toHaveProperty('callCount', 4);

      const [firstGroup, firstOptions] = renderFunc.getCall(0).args;
      const [lastGroup, lastOptions] = renderFunc.getCall(3).args;
      const mockProducts = mockData.products;

      const lastItemAdded = mockProducts[mockProducts.length - 1];
      const firstItemAdded = mockProducts[0];

      expect(firstGroup.itemsList[0].id).toEqual(firstItemAdded.id);
      expect(firstGroup.groupData.id).toEqual(
        `${firstItemAdded.articleTypeId}-${firstItemAdded.gender}`
      );
      expect(firstGroup.itemsList.length).toEqual(
        mockProducts.filter(
          product =>
            product.articleTypeId === firstItemAdded.articleTypeId &&
            product.gender === firstItemAdded.gender
        ).length
      );

      expect(lastGroup.itemsList[0].id).toEqual(lastItemAdded.id);
      expect(lastGroup.groupData.id).toEqual(`${lastItemAdded.articleTypeId}`);
      // Unisex gender shouldn't be shown
      expect(lastGroup.itemsList.length).toEqual(
        mockProducts.filter(
          product => product.articleTypeId === lastItemAdded.articleTypeId
        ).length
      );

      expect(lastOptions.key).toEqual(
        `itemByGroup-${lastItemAdded.articleTypeId}`
      );
      expect(firstOptions.key).toEqual(
        `itemByGroup-${firstItemAdded.articleTypeId}-${firstItemAdded.gender}`
      );
    });

    it('should group items correctly for cart.sorted = onlysort', () => {
      window._checkout_ = {
        ...window._checkout_,
        __myx_ab__: { 'cart.sort': 'onlysort' }
      };

      const itemsList = mount(
        <CartItemList
          handleCartAction={mockFunc}
          data={mockData}
          render={renderFunc}
        />
      );

      const mockProducts = mockData.products;
      expect(itemsList.find('#cartItemsList').length).not.toBe(0);
      expect(renderFunc).toHaveProperty('callCount', mockProducts.length);

      const sortedItems = mockProducts.sort(
        (a, b) => b.price.total - a.price.total
      );

      sortedItems.forEach((sortedItem, idx) => {
        const [group, options] = renderFunc.getCall(idx).args;
        expect(group.itemsList[0].id).toEqual(sortedItem.id);
        expect(group.groupData).toBeFalsy();
        expect(group.itemsList.length).toEqual(1);
        expect(options.key).toEqual(`itemByGroup-noGroup${idx}`);
      });
    });

    it('should not run any experiment if offerId is present', () => {
      window._checkout_ = {
        ...window._checkout_,
        __myx_ab__: { 'cart.sort': 'groupandsort' }
      };

      const newMockData = {
        products: [
          ...mockData.products,
          {
            gender: 'Men',
            articleType: 'Tshirts',
            articleTypeId: 90,
            brand: 'Puma',
            id: 1531,
            name: 'Puma Men Grey Solid Henley Neck T-shirt',
            offerId: '271666',
            price: { mrp: 1000, total: 1000, subTotal: 1000 },
            quantity: 1
          }
        ],
        offers: [
          {
            id: '271666'
          }
        ]
      };

      const mockProducts = newMockData.products;

      const itemsList = mount(
        <CartItemList
          handleCartAction={mockFunc}
          data={newMockData}
          render={renderFunc}
        />
      );

      expect(itemsList.find('#cartItemsList').length).not.toBe(0);
      expect(renderFunc).toHaveProperty('callCount', 5);

      // Groups
      expect(renderFunc.getCall(0).args[0].itemsList[0].id).toEqual(
        mockProducts[0].id
      );
      expect(renderFunc.getCall(1).args[0].itemsList[0].id).toEqual(
        mockProducts[1].id
      );
      expect(renderFunc.getCall(2).args[0].itemsList[0].id).toEqual(
        mockProducts[2].id
      );
      expect(renderFunc.getCall(3).args[0].itemsList[0].id).toEqual(
        mockProducts[3].id
      );
      expect(renderFunc.getCall(4).args[0].itemsList[0].id).toEqual(
        mockProducts[4].id
      );

      // Options
      expect(renderFunc.getCall(0).args[1].key).toEqual('itemByGroup-noGroup0');
      expect(renderFunc.getCall(1).args[1].key).toEqual('itemByGroup-noGroup1');
      expect(renderFunc.getCall(2).args[1].key).toEqual('itemByGroup-noGroup2');
      expect(renderFunc.getCall(3).args[1].key).toEqual('itemByGroup-noGroup3');
      expect(renderFunc.getCall(4).args[1].key).toEqual(
        `itemByGroup-${271666}`
      );
    });

    it('should not run any experiment on desktop', () => {
      window._checkout_ = {
        __myx_deviceData__: {
          isApp: false
        },
        __myx_ab__: { 'cart.sort': 'onlygroup' }
      };

      const itemsList = mount(
        <CartItemList
          handleCartAction={mockFunc}
          data={mockData}
          render={renderFunc}
        />
      );

      expect(itemsList.find('#cartItemsList').length).not.toBe(0);
      expect(renderFunc).toHaveProperty('callCount', 4);

      // Options
      expect(renderFunc.getCall(0).args[1].key).toEqual('itemByGroup-noGroup0');
      expect(renderFunc.getCall(1).args[1].key).toEqual('itemByGroup-noGroup1');
      expect(renderFunc.getCall(2).args[1].key).toEqual('itemByGroup-noGroup2');
    });
  });
});
