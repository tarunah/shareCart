import React from 'react';
import { shallow } from 'enzyme';
import Item from './';
import sinon from 'sinon';
import CartCountHandler from 'commonBrowserUtils/CartCountHandler';
import { ItemListWithOffer } from 'testUtils/cartMockData';

describe('Item component', () => {
  it('onMoveToWishlist - should handle moving to wishlist - logged in', () => {
    const renderFunc = sinon.spy();
    const triggerEventFunc = sinon.spy();
    window.triggerEvent = triggerEventFunc;

    const updateStateFunc = sinon.spy();
    CartCountHandler.updateState = updateStateFunc;

    document.cookie = 'ilgim=true';

    const handleCartFunc = function(a1, a2, a3) {
      expect(a1).toBe('moveToWishlist');
      expect(typeof a3).toBe('function');
    };
    const itemDetails = ItemListWithOffer.itemsList[0];

    const wrapper = shallow(
      <Item
        handleCartAction={handleCartFunc}
        render={renderFunc}
        {...itemDetails}
      />
    );

    wrapper.instance().onMoveToWishlist();
    expect(triggerEventFunc).toHaveProperty('callCount', 3);
    expect(triggerEventFunc.getCall(0).args[0]).toBe(
      'SELECTIVE_ENHANCED_WISHLIST'
    );
    expect(triggerEventFunc.getCall(1).args[0]).toBe('MOVE_TO_WISHLIST_APP');
    expect(triggerEventFunc.getCall(2).args[0]).toBe('MOVE_TO_WISHLIST');
    expect(updateStateFunc).toHaveProperty('callCount', 0);
  });

  it('onMoveToWishlist - should handle moving to wishlist - logged in - success', () => {
    const renderFunc = sinon.spy();
    const triggerEventFunc = sinon.spy();
    window.triggerEvent = triggerEventFunc;

    const updateStateFunc = sinon.spy();
    CartCountHandler.updateState = updateStateFunc;

    document.cookie = 'ilgim=true';

    const handleCartFunc = function(a1, a2, a3) {
      expect(a1).toBe('moveToWishlist');
      expect(typeof a3).toBe('function');
      a3();
    };
    const itemDetails = ItemListWithOffer.itemsList[0];

    const wrapper = shallow(
      <Item
        handleCartAction={handleCartFunc}
        render={renderFunc}
        {...itemDetails}
      />
    );

    wrapper.instance().onMoveToWishlist();
    expect(triggerEventFunc).toHaveProperty('callCount', 4);
    expect(triggerEventFunc.getCall(0).args[0]).toBe(
      'SELECTIVE_ENHANCED_WISHLIST'
    );
    expect(triggerEventFunc.getCall(1).args[0]).toBe('MOVE_TO_WISHLIST_APP');
    expect(triggerEventFunc.getCall(2).args[0]).toBe('MOVE_TO_WISHLIST');
    expect(triggerEventFunc.getCall(3).args[0]).toBe(
      'MOVE_TO_WISHLIST_SUCCESS'
    );
    expect(updateStateFunc).toHaveProperty('callCount', 1);
  });

  it('onMoveToWishlist - should handle moving to wishlist - logged in - remove context', () => {
    const renderFunc = sinon.spy();
    const triggerEventFunc = sinon.spy();
    window.triggerEvent = triggerEventFunc;

    const updateStateFunc = sinon.spy();
    CartCountHandler.updateState = updateStateFunc;

    document.cookie = 'ilgim=true';

    const handleCartFunc = function(a1, a2, a3) {
      expect(a1).toBe('moveToWishlist');
      expect(typeof a3).toBe('function');
    };
    const itemDetails = ItemListWithOffer.itemsList[0];

    const wrapper = shallow(
      <Item
        handleCartAction={handleCartFunc}
        render={renderFunc}
        {...itemDetails}
      />
    );

    const toggleRemoveDialog = sinon.spy();
    wrapper.instance().toggleRemoveDialog = toggleRemoveDialog;

    wrapper.instance().onMoveToWishlist('Remove');
    expect(triggerEventFunc).toHaveProperty('callCount', 3);
    expect(triggerEventFunc.getCall(0).args[0]).toBe(
      'SELECTIVE_ENHANCED_WISHLIST'
    );
    expect(triggerEventFunc.getCall(1).args[0]).toBe('MOVE_TO_WISHLIST_APP');
    expect(triggerEventFunc.getCall(2).args[0]).toBe('MOVE_TO_WISHLIST');
    expect(toggleRemoveDialog).toHaveProperty('callCount', 1);
    expect(updateStateFunc).toHaveProperty('callCount', 0);
  });

  it('onRemove - should handle remove item - logged in', () => {
    const renderFunc = sinon.spy();
    const triggerEventFunc = sinon.spy();
    window.triggerEvent = triggerEventFunc;

    const updateStateFunc = sinon.spy();
    CartCountHandler.updateState = updateStateFunc;

    document.cookie = 'ilgim=true';

    const handleCartFunc = function(a1, a2, a3) {
      expect(a1).toBe('removeItems');
      expect(typeof a3).toBe('function');
    };
    const itemDetails = ItemListWithOffer.itemsList[0];

    const wrapper = shallow(
      <Item
        handleCartAction={handleCartFunc}
        render={renderFunc}
        {...itemDetails}
      />
    );

    wrapper.instance().onRemove();
    expect(triggerEventFunc).toHaveProperty('callCount', 2);
    expect(triggerEventFunc.getCall(0).args[0]).toBe(
      'SELECTIVE_ENHANCED_REMOVE'
    );
    expect(triggerEventFunc.getCall(1).args[0]).toBe('REMOVE_ITEM');
    expect(wrapper.state().showRemoveDialog).toBe(false);
    expect(updateStateFunc).toHaveProperty('callCount', 0);
  });

  it('onRemove - should handle remove item - logged in - success', () => {
    const renderFunc = sinon.spy();
    const triggerEventFunc = sinon.spy();
    window.triggerEvent = triggerEventFunc;

    const updateStateFunc = sinon.spy();
    CartCountHandler.updateState = updateStateFunc;

    document.cookie = 'ilgim=true';

    const handleCartFunc = function(a1, a2, a3) {
      expect(a1).toBe('removeItems');
      expect(typeof a3).toBe('function');
      a3();
    };
    const itemDetails = ItemListWithOffer.itemsList[0];

    const wrapper = shallow(
      <Item
        handleCartAction={handleCartFunc}
        render={renderFunc}
        {...itemDetails}
      />
    );

    wrapper.instance().onRemove();
    expect(triggerEventFunc).toHaveProperty('callCount', 2);
    expect(triggerEventFunc.getCall(0).args[0]).toBe(
      'SELECTIVE_ENHANCED_REMOVE'
    );
    expect(triggerEventFunc.getCall(1).args[0]).toBe('REMOVE_ITEM');
    expect(wrapper.state().showRemoveDialog).toBe(false);
    expect(updateStateFunc).toHaveProperty('callCount', 1);
  });

  it('changeQuantity - should handle change qty', () => {
    const renderFunc = sinon.spy();
    const triggerEventFunc = sinon.spy();
    window.triggerEvent = triggerEventFunc;

    const updateStateFunc = sinon.spy();
    CartCountHandler.updateState = updateStateFunc;

    const handleCartFunc = function(a1, a2, a3) {
      expect(a1).toBe('updateItems');
      expect(typeof a3).toBe('function');
    };
    const itemDetails = ItemListWithOffer.itemsList[0];

    const wrapper = shallow(
      <Item
        handleCartAction={handleCartFunc}
        render={renderFunc}
        {...itemDetails}
      />
    );

    const toggleQuantityDialog = sinon.spy();
    wrapper.instance().toggleQuantityDialog = toggleQuantityDialog;

    wrapper.instance().changeQuantity({ currentTarget: { id: 2 } });
    expect(triggerEventFunc).toHaveProperty('callCount', 1);
    expect(triggerEventFunc.getCall(0).args[0]).toBe('EDIT_QUANTITY');
    expect(toggleQuantityDialog).toHaveProperty('callCount', 1);
    expect(updateStateFunc).toHaveProperty('callCount', 0);
  });

  it('changeQuantity - should handle change qty - success', () => {
    const renderFunc = sinon.spy();
    const triggerEventFunc = sinon.spy();
    window.triggerEvent = triggerEventFunc;

    const updateStateFunc = sinon.spy();
    CartCountHandler.updateState = updateStateFunc;

    const handleCartFunc = function(a1, a2, a3) {
      expect(a1).toBe('updateItems');
      expect(typeof a3).toBe('function');
      a3();
    };
    const itemDetails = ItemListWithOffer.itemsList[0];

    const wrapper = shallow(
      <Item
        handleCartAction={handleCartFunc}
        render={renderFunc}
        {...itemDetails}
      />
    );

    const toggleQuantityDialog = sinon.spy();
    wrapper.instance().toggleQuantityDialog = toggleQuantityDialog;

    wrapper.instance().changeQuantity({ currentTarget: { id: 2 } });
    expect(triggerEventFunc).toHaveProperty('callCount', 1);
    expect(triggerEventFunc.getCall(0).args[0]).toBe('EDIT_QUANTITY');
    expect(toggleQuantityDialog).toHaveProperty('callCount', 1);
    expect(updateStateFunc).toHaveProperty('callCount', 1);
  });

  it('changeSize - should handle change size', () => {
    const renderFunc = sinon.spy();
    const triggerEventFunc = sinon.spy();
    window.triggerEvent = triggerEventFunc;

    const updateStateFunc = sinon.spy();
    CartCountHandler.updateState = updateStateFunc;

    const handleCartFunc = function(a1) {
      expect(a1).toBe('updateItems');
    };
    const itemDetails = ItemListWithOffer.itemsList[0];

    const wrapper = shallow(
      <Item
        handleCartAction={handleCartFunc}
        render={renderFunc}
        {...itemDetails}
      />
    );

    const toggleSizeDialog = sinon.spy();
    wrapper.instance().toggleSizeDialog = toggleSizeDialog;

    wrapper
      .instance()
      .changeSizeAndSeller({ currentTarget: { skuId: '21', sellerId: '2' } });
    expect(triggerEventFunc).toHaveProperty('callCount', 1);
    expect(triggerEventFunc.getCall(0).args[0]).toBe('EDIT_SIZE');
    expect(toggleSizeDialog).toHaveProperty('callCount', 1);
    expect(updateStateFunc).toHaveProperty('callCount', 0);
  });

  describe('toggleSelection', () => {
    it('toggleSelection - should select if a product is not selected ', () => {
      const renderFunc = sinon.spy();
      const triggerEventFunc = sinon.spy();
      const preventDefault = sinon.spy();
      const handleCartFunc = sinon.spy();
      window.triggerEvent = triggerEventFunc;

      const updateStateFunc = sinon.spy();
      CartCountHandler.updateState = updateStateFunc;

      const itemDetails = ItemListWithOffer.itemsList[0];
      itemDetails.selectedForCheckout = false;

      const wrapper = shallow(
        <Item
          handleCartAction={handleCartFunc}
          render={renderFunc}
          {...itemDetails}
        />
      );

      wrapper.instance().toggleSelection({ preventDefault });

      expect(handleCartFunc.getCall(0).args[0]).toEqual('updateItems');
      expect(handleCartFunc.getCall(0).args[1]).toEqual([
        {
          itemId: 1529405416,
          selectedForCheckout: true,
          quantity: 4,
          sellerPartnerId: 500,
          skuId: 15197763
        }
      ]);
      expect(preventDefault.calledOnce).toBe(true);
      //expect(triggerEventFunc).toHaveProperty('callCount', 1);
      //expect(triggerEventFunc.getCall(0).args[0]).toBe('REMOVE_ITEM');
      //expect(toggleRemoveDialog).toHaveProperty('callCount', 1);
    });

    it('toggleSelection - should unselect if a product is selected', () => {
      const renderFunc = sinon.spy();
      const triggerEventFunc = sinon.spy();
      const preventDefault = sinon.spy();
      const handleCartFunc = sinon.spy();
      window.triggerEvent = triggerEventFunc;

      const updateStateFunc = sinon.spy();
      CartCountHandler.updateState = updateStateFunc;

      const itemDetails = ItemListWithOffer.itemsList[0];
      itemDetails.selectedForCheckout = true;

      const wrapper = shallow(
        <Item
          handleCartAction={handleCartFunc}
          render={renderFunc}
          {...itemDetails}
        />
      );

      wrapper.instance().toggleSelection({ preventDefault });

      expect(handleCartFunc.getCall(0).args[0]).toEqual('updateItems');
      expect(handleCartFunc.getCall(0).args[1]).toEqual([
        {
          itemId: 1529405416,
          selectedForCheckout: false,
          quantity: 4,
          sellerPartnerId: 500,
          skuId: 15197763
        }
      ]);
      expect(preventDefault.calledOnce).toBe(true);
      //expect(triggerEventFunc).toHaveProperty('callCount', 1);
      //expect(triggerEventFunc.getCall(0).args[0]).toBe('REMOVE_ITEM');
      //expect(toggleRemoveDialog).toHaveProperty('callCount', 1);
    });

    it('toggleSelection - should unselect if a product is selected and set showComboDialogue to false ', () => {
      const triggerEventFunc = sinon.spy();
      const handleCartFunc = sinon.spy();
      const updateStateFunc = sinon.spy();
      const preventDefault = sinon.spy();

      window.triggerEvent = triggerEventFunc;
      CartCountHandler.updateState = updateStateFunc;

      const itemDetails = ItemListWithOffer.itemsList[0];
      itemDetails.selectedForCheckout = true;

      const wrapper = shallow(
        <Item
          handleCartAction={handleCartFunc}
          render={() => {}}
          {...itemDetails}
        />
      );

      wrapper.setState({ showComboDialogue: true });
      wrapper.instance().toggleSelection({ preventDefault });

      expect(wrapper.state('showComboDialogue')).toBe(false);
      expect(handleCartFunc.getCall(0).args[0]).toEqual('updateItems');
      expect(handleCartFunc.getCall(0).args[1]).toEqual([
        {
          itemId: 1529405416,
          selectedForCheckout: false,
          quantity: 4,
          sellerPartnerId: 500,
          skuId: 15197763
        }
      ]);
      expect(preventDefault.calledOnce).toBe(true);
    });
  });
});
