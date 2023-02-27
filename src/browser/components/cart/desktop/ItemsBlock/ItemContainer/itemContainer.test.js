import React from 'react';
import { mount } from 'enzyme';

import ItemContainer from './';
import {
  ItemListWithOffer,
  ItemListNoOffer,
  unavailableSizes,
  freeShipLostData,
  BPCProduct
} from 'testUtils/cartMockData';
import { StyleOffersPopup } from '../../../common/ItemComponents';

describe('Desktop Item Container Component - Combo', () => {
  window._checkout_ = {
    __myx_ab__: {}
  };

  it('should render the item container - Combo', () => {
    const itemDetails = ItemListWithOffer;
    const mockFunc = () => true;
    let wrapper = mount(
      <ItemContainer itemGroup={itemDetails} handleCartAction={mockFunc} />
    );

    expect(wrapper.find('.itemLeft').length).not.toBe(0);
    expect(wrapper.find('.itemRight').length).not.toBe(0);
    expect(wrapper.find('.itemLeft a').get(0).props.href).toEqual(
      '/Tshirts/Nike/Nike-Men-Blue-Printed-AS-M-NK-BRT-SS-DRY-GFX-T-shirt/2364443/buy?mini=true&skuId=15197763&sellerPartnerId=500'
    );
    expect(wrapper.find('.brand').text()).toEqual('Nike');
    expect(wrapper.find('.itemLink').text()).toEqual(
      'Men Blue Printed AS M NK BRT SS DRY GFX T-shirt'
    );
    expect(wrapper.find('.bold').text()).toEqual('5,615');
    expect(wrapper.find('.strike').text()).toEqual('8,380');
    expect(wrapper.find('.itemDiscount').length).toBe(0);
    expect(wrapper.find('.sellerData').text()).toEqual('Sold by: RetailNet');
    expect(wrapper.find('.size').text()).toEqual('Size: 2XL');
    expect(wrapper.find('.quantity').text()).toEqual('Qty: 4');
    expect(wrapper.find('.itemComboDiscount').text()).toEqual(
      ' Combo Discount: 2,765'
    );
    expect(wrapper.find('.comboHeaderText').text()).toContain(
      'You have got 33% off on 4 item(s)'
    );
    expect(wrapper.find('SelectionIndicator').isEmptyRender()).toBe(false);
    expect(wrapper.find('Close').isEmptyRender()).toBe(false);
  });
});

describe('Desktop Item Container Component - No Combo', () => {
  it('should render the item container - No Combo', () => {
    const itemDetails = ItemListNoOffer;
    const mockFunc = () => true;
    let wrapper = mount(
      <ItemContainer itemGroup={itemDetails} handleCartAction={mockFunc} />
    );

    expect(wrapper.find('.itemLeft').length).not.toBe(0);
    expect(wrapper.find('.itemRight').length).not.toBe(0);
    expect(wrapper.find('.itemLeft a').get(0).props.href).toEqual(
      '/Tshirts/Nike/Nike-Men-Blue-Printed-Round-Neck--T-shirt/2437409/buy?mini=true&skuId=15482826&sellerPartnerId=500'
    );
    expect(wrapper.find('.brand').text()).toEqual('Nike');
    expect(wrapper.find('.itemLink').text()).toEqual(
      'Men Blue Printed Round Neck  T-shirt'
    );
    expect(wrapper.find('.price.bold').text()).toEqual('1,121');
    expect(wrapper.find('.strike').text()).toEqual('1,495');
    expect(wrapper.find('.itemDiscount').text()).toEqual('25% OFF');
    expect(wrapper.find('.sellerData').text()).toEqual('Sold by: RetailNet');
    expect(wrapper.find('.size').text()).toEqual('Size: M');
    expect(wrapper.find('.quantity').text()).toEqual('Qty: 1');
    expect(wrapper.find('SelectionIndicator').isEmptyRender()).toBe(false);
    expect(wrapper.find('Close').isEmptyRender()).toBe(false);
  });

  describe('Desktop Item Container - Messages', () => {
    it('should display out of stock message', () => {
      const itemDetails = ItemListWithOffer;
      const mockFunc = () => true;

      itemDetails.itemsList[0].sizes = unavailableSizes;

      let wrapper = mount(
        <ItemContainer itemGroup={itemDetails} handleCartAction={mockFunc} />
      );
      expect(wrapper.find('.oosMessage').text()).toEqual('Item out of stock');
    });

    it('should display size not available message', () => {
      const itemDetails = ItemListWithOffer;
      const mockFunc = () => true;

      unavailableSizes[0].available = true;
      itemDetails.itemsList[0].sizes = unavailableSizes;

      let wrapper = mount(
        <ItemContainer itemGroup={itemDetails} handleCartAction={mockFunc} />
      );
      expect(wrapper.find('.sizeNotAvailable').text()).toEqual(
        'Size not available'
      );
    });

    it('should display quantity not available message', () => {
      const itemDetails = ItemListWithOffer;
      const mockFunc = () => true;
      const selectedSizeIndex = 3;

      unavailableSizes[selectedSizeIndex].available = true;
      unavailableSizes[selectedSizeIndex].inventory = 1;
      itemDetails.itemsList[0].sizes = unavailableSizes;
      itemDetails.itemsList[0].selectedSeller.inventory = 1;

      let wrapper = mount(
        <ItemContainer itemGroup={itemDetails} handleCartAction={mockFunc} />
      );
      expect(wrapper.find('.availabilityMessage').text()).toEqual(
        'Selected quantity not available'
      );
    });

    it('should display units in stock message', () => {
      const itemDetails = ItemListWithOffer;
      const mockFunc = () => true;
      const mockUnitCount = 5;
      const selectedSizeIndex = 3;

      unavailableSizes[selectedSizeIndex].available = true;
      unavailableSizes[selectedSizeIndex].inventory = mockUnitCount;
      itemDetails.itemsList[0].sizes = unavailableSizes;
      itemDetails.itemsList[0].selectedSeller.inventory = mockUnitCount;

      let wrapper = mount(
        <ItemContainer itemGroup={itemDetails} handleCartAction={mockFunc} />
      );
      expect(wrapper.find('.lowUnitCount').text()).toEqual(
        `${mockUnitCount} left`
      );
    });
  });

  describe('Desktop Item Container - Actions', () => {
    it('should open/close popups', () => {
      let wrapper = mount(
        <ItemContainer
          itemGroup={ItemListWithOffer}
          handleCartAction={() => true}
          freeShipLostData={freeShipLostData}
        />
      );
      window.triggerEvent = () => {};

      expect(wrapper.find('MoveOutOfBagModal')).toHaveLength(1);
      expect(wrapper.find('MoveOutOfBagModal').isEmptyRender()).toBe(true);
      wrapper.find('ItemComponent Close').simulate('click');
      expect(wrapper.find('MoveOutOfBagModal').isEmptyRender()).toBe(false);

      wrapper.find('.size DropDown.dropDown').simulate('click');
      expect(wrapper.find('SizeDialog').find('Modal')).toHaveLength(1);

      wrapper.find('.size DropDown.dropDown').simulate('click');
      expect(wrapper.find('SizeDialog').find('Modal')).toHaveLength(0);

      wrapper.find('.quantity DropDown.dropDown').simulate('click');
      expect(wrapper.find('QtyDialog').find('Modal')).toHaveLength(1);

      wrapper.find('.quantity DropDown.dropDown').simulate('click');
      expect(wrapper.find('QtyDialog').find('Modal')).toHaveLength(0);
    });
  });

  describe('expiryBPC', () => {
    it('should not show the expiry if the either  feature is off or ab is disabled', () => {
      //FG is off
      window._checkout_.__myx_ab__ = { 'pdp.expiry.date': 'enabled' };
      window._checkout_.__myx_features__ = { 'checkout.expiry.bpc': false };
      let wrapper = mount(
        <ItemContainer itemGroup={BPCProduct} handleCartAction={() => {}} />
      );
      expect(wrapper.find('ExpiryDate div').exists()).toBe(false);

      //AB is off
      window._checkout_.__myx_ab__ = { 'pdp.expiry.date': 'disabled' };
      window._checkout_.__myx_features__ = { 'checkout.expiry.bpc': true };
      wrapper = mount(
        <ItemContainer itemGroup={BPCProduct} handleCartAction={() => {}} />
      );
      expect(wrapper.find('ExpiryDate div').exists()).toBe(false);
    });

    it('should show the expiry if the isExpirableFlag is true', () => {
      window._checkout_.__myx_ab__ = { 'pdp.expiry.date': 'enabled' };
      window._checkout_.__myx_features__ = { 'checkout.expiry.bpc': true };

      const wrapper = mount(
        <ItemContainer itemGroup={BPCProduct} handleCartAction={() => {}} />
      );
      expect(wrapper.find('ExpiryDate div').exists()).toBe(true);
    });

    it('should not show the expiry if the expirable Flag is false and earlierExpiryDate is true', () => {
      BPCProduct.itemsList[0].flags.expirable = false;
      BPCProduct.itemsList[0].selectedSeller.earlierExpiryDate = true;
      const wrapper = mount(
        <ItemContainer itemGroup={BPCProduct} handleCartAction={() => {}} />
      );
      expect(wrapper.find('ExpiryDate div').exists()).toBe(false);
    });

    it('should not show the expiry if the expirable Flag is false', () => {
      BPCProduct.itemsList[0].selectedSeller.earlierExpiryDate = false;
      BPCProduct.itemsList[0].flags.expirable = true;

      const wrapper = mount(
        <ItemContainer itemGroup={BPCProduct} handleCartAction={() => {}} />
      );
      expect(wrapper.find('ExpiryDate div').exists()).toBe(false);
    });
  });
});

describe('<ItemContainer />: Desktop, Style Offers ', () => {
  it('should open style offers pop only if present', () => {
    let wrapper = mount(
      <ItemContainer
        itemGroup={ItemListWithOffer}
        handleCartAction={() => true}
        freeShipLostData={freeShipLostData}
      />
    );
    const bankOfferText = `+ ${ItemListWithOffer.itemsList[0].styleOffers.length} Bank Offers Available`;

    wrapper.find('.bankOfferText').simulate('click');
    expect(wrapper.find('.styleOffersPopup')).toHaveLength(1);
    expect(wrapper.find(StyleOffersPopup).length).toBe(1);
    expect(wrapper.find('.bankOfferText').text()).toEqual(bankOfferText);
  });

  it('should not display style offers text', () => {
    let wrapper = mount(
      <ItemContainer
        itemGroup={ItemListNoOffer}
        handleCartAction={() => true}
        freeShipLostData={freeShipLostData}
      />
    );
    expect(wrapper.find('.bankOfferText')).toHaveLength(0);
  });
});
