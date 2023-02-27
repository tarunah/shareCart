import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import ListSellers from './';
import { productListWithOffer } from 'testUtils/cartMockData';
import { RadioGroup } from 'commonComp/Radio';

describe('List an array sellers', () => {
  it('should display given number of sellers', () => {
    const seller = productListWithOffer.productList1[0].sizes[0].sellers;
    const wrapper = mount(
      <ListSellers
        availableSeller={seller}
        selectedSellerId={seller[0].partnerId}
        deviceMode="desktop"
        wrapper="div"
      />
    );

    expect(wrapper.find('SellerInfo').length).toBe(2);
  });

  describe('Desktop', () => {
    it('should display radiobutton with name, price and discount', () => {
      const seller = productListWithOffer.productList1[0].sizes[0].sellers[0];
      const wrapper = mount(
        <ListSellers
          availableSeller={[seller]}
          selectedSellerId={seller.seller.partnerId}
          deviceMode="desktop"
          wrapper={RadioGroup}
        />
      );
      expect(wrapper.find('.radioIcon').exists()).toBe(true);
      expect(wrapper.find('.sellerBox').text()).toContain(seller.seller.name);
      expect(wrapper.find('SellerPriceComponent Amount').text()).toEqual('68');
      expect(wrapper.find('SellerPriceComponent StrikedAmount').text()).toEqual(
        '1,295'
      );
      expect(wrapper.find('SellerPriceComponent .discountText').text()).toEqual(
        '50% OFF'
      );
    });

    it('should Select the first seller (buyButtonWinner), if the user changed size', () => {
      const seller = productListWithOffer.productList1[0].sizes[0].sellers;
      const wrapper = mount(
        <ListSellers
          availableSeller={seller}
          deviceMode="desktop"
          wrapper={RadioGroup}
        />
      );

      expect(
        wrapper
          .find('SellerInfo')
          .first()
          .find('RadioActive')
          .exists()
      ).toBe(true);
    });

    it('should call onChange on clicking the item', () => {
      const seller = productListWithOffer.productList1[0].sizes[0].sellers;
      const spy = sinon.spy(() => {});
      const wrapper = mount(
        <ListSellers
          availableSeller={seller}
          deviceMode="desktop"
          onChange={spy}
          wrapper={RadioGroup}
        />
      );

      wrapper
        .find('SellerInfo')
        .at(1)
        .simulate('click');
      expect(spy.callCount).toBe(1);
    });
  });

  describe('Mobile', () => {
    it('should display select button, name, price and discount', () => {
      const seller = productListWithOffer.productList1[0].sizes[0].sellers[0];
      const wrapper = mount(
        <ListSellers
          availableSeller={[seller]}
          selectedSellerId={seller.seller.partnerId}
          deviceMode="mobile"
          wrapper="div"
        />
      );

      expect(wrapper.find('SelectButton').exists()).toBe(true);
      expect(wrapper.find('.sellerBox').text()).toContain(seller.seller.name);
      expect(wrapper.find('SellerPriceComponent Amount').text()).toEqual('68');
      expect(wrapper.find('SellerPriceComponent StrikedAmount').text()).toEqual(
        '1,295'
      );
      expect(wrapper.find('SellerPriceComponent .discountText').text()).toEqual(
        '50% OFF'
      );
    });

    it('should not select any seller, if the user changed size', () => {
      const seller = productListWithOffer.productList1[0].sizes[0].sellers;
      const wrapper = mount(
        <ListSellers
          availableSeller={seller}
          deviceMode="mobile"
          wrapper="div"
        />
      );

      expect(wrapper.find('.checkedButton').exists()).toBe(false);
    });

    it('should Select the seller selected by user, if he clicks on the same size', () => {
      const seller = productListWithOffer.productList1[0].sizes[0].sellers;
      const wrapper = mount(
        <ListSellers
          availableSeller={seller}
          selectedSellerId={500}
          deviceMode="mobile"
          wrapper="div"
        />
      );

      expect(
        wrapper
          .find('SellerInfo')
          .first()
          .find('.checkedButton')
          .exists()
      ).toBe(true);
      expect(
        wrapper
          .find('SellerInfo')
          .first()
          .find('.checkedButton')
          .text()
      ).toEqual('SELECTED');
    });

    it('should call onChange on clicking the item', () => {
      const seller = productListWithOffer.productList1[0].sizes[0].sellers;
      const spy = sinon.spy(() => {});
      const wrapper = mount(
        <ListSellers
          availableSeller={seller}
          deviceMode="mobile"
          onChange={spy}
          wrapper="div"
        />
      );
      wrapper
        .find('SellerInfo')
        .at(1)
        .find('SelectButton .unCheckedButton')
        .simulate('click');
      expect(spy.callCount).toBe(1);
    });
  });
});
