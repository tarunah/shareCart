import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { ProductsList } from 'testUtils/cartMockData';

import BulkActionStrip from './';

describe('BulkActionStrip', () => {
  beforeEach(() => {
    window._checkout_ = {
      __myx_ab__: {},
      __myx_deviceData__: {}
    };
  });
  const products = ProductsList.itemsList;

  it('should show CheckboxActive icons when all products are selected and clicking on it should call handleCartAction with updateItems and selectedForCheckout as false', () => {
    const handleCartAction = sinon.spy();
    const triggerEvent = sinon.spy();
    window.triggerEvent = triggerEvent;
    const wrapper = mount(
      <BulkActionStrip
        totalItemsCount={products.length}
        selectedProductCount={products.length}
        mode="mobile"
        products={products}
        handleCartAction={handleCartAction}
      />
    );

    expect(wrapper.find('CheckboxActive').exists()).toBe(true);

    wrapper
      .find('CheckboxActive')
      .at(0)
      .simulate('click');
    expect(handleCartAction.getCall(0).args[0]).toEqual('updateItems');
    expect(handleCartAction.getCall(0).args[1]).toEqual([
      {
        itemId: 1529405416,
        selectedForCheckout: false,
        quantity: 4,
        sellerPartnerId: undefined,
        skuId: 15197763
      },
      {
        itemId: 1529405419,
        selectedForCheckout: false,
        quantity: 4,
        sellerPartnerId: undefined,
        skuId: 15197763
      }
    ]);
    expect(triggerEvent.calledOnce).toBe(true);
  });

  it('should show CheckboxIntermediate icons when some products are selected and clicking on it should call handleCartAction with updateItems and selectedForCheckout as false', () => {
    const handleCartAction = sinon.spy();
    const triggerEvent = sinon.spy();
    window.triggerEvent = triggerEvent;

    products[0].selectedForCheckout = false;
    const wrapper = mount(
      <BulkActionStrip
        totalItemsCount={2}
        selectedProductCount={1}
        mode="mobile"
        products={products}
        handleCartAction={handleCartAction}
      />
    );

    expect(wrapper.find('CheckboxIntermediate').exists()).toBe(true);

    wrapper
      .find('CheckboxIntermediate')
      .at(0)
      .simulate('click');
    expect(handleCartAction.getCall(0).args[0]).toEqual('updateItems');
    expect(handleCartAction.getCall(0).args[1]).toEqual([
      {
        itemId: 1529405419,
        quantity: 4,
        selectedForCheckout: false,
        sellerPartnerId: undefined,
        skuId: 15197763
      }
    ]);
    expect(triggerEvent.calledOnce).toBe(true);
  });

  it('should show ProductInactive icons when no product is selected and clicking on it should call handleCartAction with updateItems and selectedForCheckout as true', () => {
    const handleCartAction = sinon.spy();
    const triggerEvent = sinon.spy();
    window.triggerEvent = triggerEvent;

    products[0].selectedForCheckout = false;
    products[1].selectedForCheckout = false;
    const wrapper = mount(
      <BulkActionStrip
        totalItemsCount={2}
        selectedProductCount={0}
        mode="mobile"
        products={products}
        handleCartAction={handleCartAction}
      />
    );

    expect(wrapper.find('ProductInactive').exists()).toBe(true);

    wrapper
      .find('ProductInactive')
      .at(0)
      .simulate('click');
    expect(handleCartAction.getCall(0).args[0]).toEqual('updateItems');
    expect(handleCartAction.getCall(0).args[1]).toEqual([
      {
        itemId: 1529405416,
        selectedForCheckout: true,
        quantity: 4,
        sellerPartnerId: undefined,
        skuId: 15197763
      },
      {
        itemId: 1529405419,
        selectedForCheckout: true,
        quantity: 4,
        sellerPartnerId: undefined,
        skuId: 15197763
      }
    ]);
    expect(triggerEvent.calledOnce).toBe(true);
  });

  describe('Confirmation modal', () => {
    it('should show nudge when no product is selected and moveToWishlist is clicked', () => {
      const alert = sinon.spy();
      window.SHELL = { alert };
      const handleCartAction = sinon.spy();
      products[0].selectedForCheckout = false;
      products[1].selectedForCheckout = false;

      const wrapper = mount(
        <BulkActionStrip
          totalItemsCount={products.length}
          selectedProductCount={0}
          mode="mobile"
          products={products}
          handleCartAction={handleCartAction}
        />
      );

      wrapper
        .find('.mobileButtonContainer NewWishlist')
        .at(0)
        .simulate('click');
      expect(alert.getCall(0).args[1].message).toEqual(
        'Select any item to move to wishlist.'
      );
    });

    it('should show nudge when no product is selected and remove is clicked', () => {
      const alert = sinon.spy();
      window.SHELL = { alert };
      const handleCartAction = sinon.spy();
      products[0].selectedForCheckout = false;
      products[1].selectedForCheckout = false;

      const wrapper = mount(
        <BulkActionStrip
          totalItemsCount={products.length}
          selectedProductCount={0}
          mode="mobile"
          products={products}
          handleCartAction={handleCartAction}
        />
      );

      wrapper
        .find('.mobileButtonContainer Delete')
        .at(0)
        .simulate('click');
      expect(alert.getCall(0).args[1].message).toEqual(
        'Select any item to remove from bag.'
      );
    });

    describe('wishlist modal atleast one product', () => {
      it('should move the items to wishlist when MOVE TO WISHLIST is clicked on wishlist confirmationModal', () => {
        const handleCartAction = sinon.spy();
        const triggerEvent = sinon.spy();
        window.triggerEvent = triggerEvent;
        products[0].selectedForCheckout = true;
        products[1].selectedForCheckout = false;
        document.cookie = 'ilgim=true';

        const wrapper = mount(
          <BulkActionStrip
            totalItemsCount={products.length}
            selectedProductCount={1}
            mode="mobile"
            products={products}
            handleCartAction={handleCartAction}
          />
        );

        wrapper
          .find('.mobileButtonContainer Delete')
          .at(0)
          .simulate('click');

        const confirmationModal = wrapper.find('Modal');
        expect(confirmationModal.exists()).toEqual(true);
        confirmationModal
          .find('button')
          .at(1)
          .simulate('click');

        expect(handleCartAction.getCall(0).args[0]).toEqual(
          'bulkMoveToWishlist'
        );
        expect(handleCartAction.getCall(0).args[1]).toEqual([
          { itemId: 1529405416, id: 2364443, skuId: 15197763 }
        ]);
        expect(triggerEvent.calledOnce).toBe(true);
      });

      it('should close the modal when cancel is pressed', () => {
        const handleCartAction = sinon.spy();
        products[0].selectedForCheckout = true;
        products[1].selectedForCheckout = false;

        const wrapper = mount(
          <BulkActionStrip
            totalItemsCount={products.length}
            selectedProductCount={1}
            mode="mobile"
            products={products}
            handleCartAction={handleCartAction}
          />
        );

        wrapper
          .find('.mobileButtonContainer Delete')
          .at(0)
          .simulate('click');

        const confirmationModal = wrapper.find('Modal');
        expect(confirmationModal.exists()).toEqual(true);

        confirmationModal
          .find('button')
          .at(0)
          .simulate('click');
        expect(
          wrapper
            .find('Modal')
            .find('Modal')
            .exists()
        ).toEqual(false);
      });

      it('Should close the modal and show shell notification if move to wishlist is success', () => {
        const alert = sinon.spy();
        window.SHELL = { alert };
        const handleCartAction = (action, data, successCB, errorCB) => {
          successCB();
        };
        products[0].selectedForCheckout = true;
        products[1].selectedForCheckout = false;
        document.cookie = 'ilgim=true';

        const wrapper = mount(
          <BulkActionStrip
            totalItemsCount={products.length}
            selectedProductCount={1}
            mode="mobile"
            products={products}
            handleCartAction={handleCartAction}
          />
        );

        wrapper
          .find('.mobileButtonContainer Delete')
          .at(0)
          .simulate('click');
        const confirmationModal = wrapper.find('Modal');
        confirmationModal
          .find('button')
          .at(1)
          .simulate('click');

        expect(alert.getCall(0).args[1].message).toEqual(
          '1 item successfully moved to wishlist. '
        );
        expect(wrapper.find('Modal').exists()).toEqual(false);
      });

      it('Should  close the modal and show shell notification if move to wishlist failed', () => {
        const alert = sinon.spy();
        window.SHELL = { alert };
        const handleCartAction = (action, data, successCB, errorCB) => {
          errorCB();
        };
        products[0].selectedForCheckout = true;
        products[1].selectedForCheckout = false;
        document.cookie = 'ilgim=true';

        const wrapper = mount(
          <BulkActionStrip
            totalItemsCount={products.length}
            selectedProductCount={1}
            mode="mobile"
            products={products}
            handleCartAction={handleCartAction}
          />
        );

        wrapper
          .find('.mobileButtonContainer Delete')
          .at(0)
          .simulate('click');
        const confirmationModal = wrapper.find('Modal');
        confirmationModal
          .find('button')
          .at(1)
          .simulate('click');

        expect(alert.getCall(0).args[1].message).toEqual(
          'Failed to move items to wishlist, please try again.'
        );
        expect(wrapper.find('Modal').exists()).toEqual(false);
      });
    });

    describe('remove modal with atleast one product', () => {
      it('should remove the items when remove is clicked on confirmationModal', () => {
        const handleCartAction = sinon.spy();
        const triggerEvent = sinon.spy();
        window.triggerEvent = triggerEvent;

        products[0].selectedForCheckout = true;
        products[1].selectedForCheckout = false;

        const wrapper = mount(
          <BulkActionStrip
            totalItemsCount={products.length}
            selectedProductCount={1}
            mode="mobile"
            products={products}
            handleCartAction={handleCartAction}
          />
        );

        wrapper
          .find('.mobileButtonContainer Delete')
          .at(0)
          .simulate('click');

        const confirmationModal = wrapper.find('Modal');
        expect(confirmationModal.exists()).toEqual(true);
        confirmationModal
          .find('button')
          .at(0)
          .simulate('click');

        expect(handleCartAction.getCall(0).args[0]).toEqual('removeItems');
        expect(handleCartAction.getCall(0).args[1]).toEqual([
          { itemId: 1529405416 }
        ]);
        expect(triggerEvent.calledOnce).toBe(true);
      });

      it('should close the modal and move to wishlist when moveToWishlist is clicked on cancel confirmationModal', () => {
        const handleCartAction = sinon.spy();
        const triggerEvent = sinon.spy();
        window.triggerEvent = triggerEvent;

        products[0].selectedForCheckout = true;
        products[1].selectedForCheckout = false;

        const wrapper = mount(
          <BulkActionStrip
            totalItemsCount={products.length}
            selectedProductCount={1}
            mode="mobile"
            products={products}
            handleCartAction={handleCartAction}
          />
        );

        wrapper
          .find('.mobileButtonContainer Delete')
          .at(0)
          .simulate('click');

        const confirmationModal = wrapper.find('Modal');
        expect(confirmationModal.exists()).toEqual(true);

        confirmationModal
          .find('button')
          .at(1)
          .simulate('click');
        expect(handleCartAction.getCall(0).args[0]).toEqual(
          'bulkMoveToWishlist'
        );
        expect(handleCartAction.getCall(0).args[1]).toEqual([
          { itemId: 1529405416, id: 2364443, skuId: 15197763 }
        ]);
        expect(
          wrapper
            .find('Modal')
            .find('Modal')
            .exists()
        ).toEqual(false);
        expect(triggerEvent.calledOnce).toBe(true);
      });

      it('Should close the modal and show shell notification if remove is success', () => {
        const alert = sinon.spy();
        window.SHELL = { alert };
        const handleCartAction = (action, data, successCB, errorCB) => {
          successCB();
        };
        products[0].selectedForCheckout = true;
        products[1].selectedForCheckout = false;

        const wrapper = mount(
          <BulkActionStrip
            totalItemsCount={products.length}
            selectedProductCount={1}
            mode="mobile"
            products={products}
            handleCartAction={handleCartAction}
          />
        );

        wrapper
          .find('.mobileButtonContainer Delete')
          .at(0)
          .simulate('click');
        const confirmationModal = wrapper.find('Modal');
        confirmationModal
          .find('button')
          .at(0)
          .simulate('click');

        expect(alert.getCall(0).args[1].message).toEqual(
          '1 item removed from bag. '
        );
        expect(wrapper.find('Modal').exists()).toEqual(false);
      });

      it('Should  close the modal and show shell notification if remove failed', () => {
        const alert = sinon.spy();
        window.SHELL = { alert };
        const handleCartAction = (action, data, successCB, errorCB) => {
          errorCB();
        };
        products[0].selectedForCheckout = true;
        products[1].selectedForCheckout = false;

        const wrapper = mount(
          <BulkActionStrip
            totalItemsCount={products.length}
            selectedProductCount={1}
            mode="mobile"
            products={products}
            handleCartAction={handleCartAction}
          />
        );

        wrapper
          .find('.mobileButtonContainer Delete')
          .at(0)
          .simulate('click');
        const confirmationModal = wrapper.find('Modal');
        confirmationModal
          .find('button')
          .at(0)
          .simulate('click');

        expect(alert.getCall(0).args[1].message).toEqual(
          'Failed to remove items, please try again.'
        );
        expect(wrapper.find('Modal').exists()).toEqual(false);
      });
    });
  });

  describe('mobile', () => {
    it('should show the selected item count and total items in cart and render mobile icons', () => {
      const wrapper = mount(
        <BulkActionStrip
          totalItemsCount={5}
          selectedProductCount={3}
          mode="mobile"
          products={[]}
          handleCartAction={() => {}}
          total={123}
        />
      );
      expect(wrapper.find('.message').text()).toEqual(
        '3/5 ITEMS SELECTED (123)'
      );
      expect(wrapper.find('.mobileButtonContainer Delete').exists()).toBe(true);
      expect(wrapper.find('.mobileButtonContainer NewWishlist').exists()).toBe(
        true
      );
    });

    it('should show the selected item count and total items in cart and render mobile icons', () => {
      const wrapper = mount(
        <BulkActionStrip
          totalItemsCount={5}
          selectedProductCount={3}
          mode="mobile"
          products={[]}
          handleCartAction={() => {}}
          total={500}
        />
      );
      expect(wrapper.find('.message').text()).toEqual(
        '3/5 ITEMS SELECTED (500)'
      );
    });

    it('should show a confirmation modal when atleast one product is selected and wishlist icon is pressed', () => {
      const handleCartAction = sinon.spy();
      products[0].selectedForCheckout = true;
      products[1].selectedForCheckout = false;

      const wrapper = mount(
        <BulkActionStrip
          totalItemsCount={products.length}
          selectedProductCount={1}
          mode="mobile"
          products={products}
          handleCartAction={handleCartAction}
        />
      );
      wrapper
        .find('.mobileButtonContainer NewWishlist')
        .at(0)
        .simulate('click');

      const confirmationModal = wrapper.find('Modal');
      expect(confirmationModal.exists()).toEqual(true);
      expect(confirmationModal.find('.confirmationTitle').text()).toEqual(
        'Move 1 item to wishlist'
      );
      expect(confirmationModal.find('.confirmationText').text()).toEqual(
        'Are you sure you want to move 1 item from bag.'
      );
      expect(
        confirmationModal
          .find('button')
          .at(0)
          .text()
      ).toEqual('CANCEL');
      expect(
        confirmationModal
          .find('button')
          .at(1)
          .text()
      ).toEqual('MOVE TO WISHLIST');
    });

    it('should show a confirmation modal when atleast one product is selected and delete icon is pressed', () => {
      const handleCartAction = sinon.spy();
      products[0].selectedForCheckout = true;
      products[1].selectedForCheckout = false;

      const wrapper = mount(
        <BulkActionStrip
          totalItemsCount={products.length}
          selectedProductCount={1}
          mode="mobile"
          products={products}
          handleCartAction={handleCartAction}
        />
      );
      wrapper
        .find('.mobileButtonContainer Delete')
        .at(0)
        .simulate('click');

      const confirmationModal = wrapper.find('Modal');

      expect(confirmationModal.exists()).toEqual(true);
      expect(confirmationModal.find('.confirmationTitle').text()).toEqual(
        'Remove 1 item'
      );
      expect(confirmationModal.find('.confirmationText').text()).toEqual(
        'Are you sure you want to remove 1 item from bag.'
      );
      expect(
        confirmationModal
          .find('button')
          .at(0)
          .text()
      ).toEqual('REMOVE');
      expect(
        confirmationModal
          .find('button')
          .at(1)
          .text()
      ).toEqual('MOVE TO WISHLIST');
    });

    it('should show the total amount and click of it should call scroll function', () => {
      const spy = sinon.spy();
      window._checkout_.__myx_ab__['checkout.selective.enhancement'] =
        'enabled';
      window._checkout_.__myx_features__ = {
        'checkout.selective.enhancement': true
      };
      const wrapper = mount(
        <BulkActionStrip
          totalItemsCount={products.length}
          selectedProductCount={1}
          mode="mobile"
          products={products}
          scrollToPriceBlock={spy}
          handleCartAction={() => {}}
          total={123}
        />
      );
      wrapper.find('.message span span').simulate('click');

      expect(spy.calledOnce).toBe(true);
    });
  });

  describe('desktop', () => {
    it('should show the selected item count and total items in cart and render desktop buttons', () => {
      const wrapper = mount(
        <BulkActionStrip
          totalItemsCount={5}
          selectedProductCount={3}
          mode="desktop"
          products={[]}
          handleCartAction={() => {}}
        />
      );

      expect(wrapper.find('.message').text()).toEqual('3/5 ITEMS SELECTED');
      expect(wrapper.find('.desktopBulkWishlist').text()).toEqual(
        'MOVE TO WISHLIST'
      );
      expect(wrapper.find('.desktopBulkRemove').text()).toEqual('REMOVE');
    });

    it('should show a confirmation modal when atleast one product is selected and wishlist icon is pressed', () => {
      const handleCartAction = sinon.spy();
      products[0].selectedForCheckout = true;
      products[1].selectedForCheckout = false;

      const wrapper = mount(
        <BulkActionStrip
          totalItemsCount={products.length}
          selectedProductCount={1}
          mode="desktop"
          products={products}
          handleCartAction={handleCartAction}
        />
      );

      wrapper.find('.desktopBulkWishlist').simulate('click');

      const confirmationModal = wrapper.find('Modal');
      expect(confirmationModal.exists()).toEqual(true);
      expect(confirmationModal.find('.confirmationTitle').text()).toEqual(
        'Move 1 item to wishlist'
      );
      expect(confirmationModal.find('.confirmationText').text()).toEqual(
        'Are you sure you want to move 1 item from bag.'
      );
      expect(
        confirmationModal
          .find('button')
          .at(0)
          .text()
      ).toEqual('CANCEL');
      expect(
        confirmationModal
          .find('button')
          .at(1)
          .text()
      ).toEqual('MOVE TO WISHLIST');
    });

    it('should show a confirmation modal when atleast one product is selected and delete icon is pressed', () => {
      const handleCartAction = sinon.spy();
      products[0].selectedForCheckout = true;
      products[1].selectedForCheckout = false;

      const wrapper = mount(
        <BulkActionStrip
          totalItemsCount={products.length}
          selectedProductCount={1}
          mode="desktop"
          products={products}
          handleCartAction={handleCartAction}
        />
      );

      wrapper.find('.desktopBulkRemove').simulate('click');

      const confirmationModal = wrapper.find('Modal');

      expect(confirmationModal.exists()).toEqual(true);
      expect(confirmationModal.find('.confirmationTitle').text()).toEqual(
        'Remove 1 item'
      );
      expect(confirmationModal.find('.confirmationText').text()).toEqual(
        'Are you sure you want to remove 1 item from bag.'
      );
      expect(
        confirmationModal
          .find('button')
          .at(0)
          .text()
      ).toEqual('REMOVE');
      expect(
        confirmationModal
          .find('button')
          .at(1)
          .text()
      ).toEqual('MOVE TO WISHLIST');
    });
  });
});
