import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import {
  CartModalDetailedComponent,
  CartModalDefaultComponent,
  cartModalConstants
} from './';

describe('Default Cart Modal Component', () => {
  it('should render the cart level modal', () => {
    const callback = sinon.spy();
    const data = {
      header: 'Test',
      body: 'Test body',
      className: 'testClassName'
    };
    let cartModal = mount(
      <CartModalDefaultComponent
        header={data.header}
        body={data.body}
        halfCard={true}
        className={data.className}
        cancelCallback={callback}
      />
    );

    expect(cartModal.find('.testClassName').length).not.toBe(0);
    expect(cartModal.find('.container').length).not.toBe(0);
    expect(cartModal.find('.modalHeaderText').text()).toEqual(data.header);
    expect(cartModal.find('.modalBodyText').text()).toEqual(data.body);
  });
});

describe('Detailed Cart Modal', () => {
  // Simulating global functions
  window.triggerEvent = () => {};
  window.SHELL = {
    alert: sinon.fake()
  };

  // Test data for the props
  const data = {
    header: 'Test',
    body: 'Test body',
    className: 'testClassName'
  };

  const invalidProducts = [
    {
      images: [{ secureSrc: 'image' }],
      brand: 'brand',
      name: 'name',
      selectedForCheckout: true
    }
  ];

  const SUCCESS_CALLBACK = 'successCb';
  const ERROR_CALLBACK = 'errorCb';

  // Common Utility for mounting the component in every test case
  const mountComponent = props => {
    return mount(
      <CartModalDetailedComponent
        header={data.header}
        body={data.body}
        halfCard={true}
        className={data.className}
        invalidProducts={invalidProducts}
        analytics={() => sinon.spy()}
        showDetailedOosModal={true}
        {...props}
      />
    );
  };

  beforeEach(() => {
    sinon.spy(CartModalDetailedComponent.prototype, SUCCESS_CALLBACK);
    sinon.spy(CartModalDetailedComponent.prototype, ERROR_CALLBACK);
  });

  afterEach(() => {
    CartModalDetailedComponent.prototype[SUCCESS_CALLBACK].restore();
    CartModalDetailedComponent.prototype[ERROR_CALLBACK].restore();
  });

  // Utility for below test cases with common funcitonality to check action on button click
  const testBtnAction = function(
    primaryBtnConstant,
    actionName,
    callbackName,
    cartAction
  ) {
    const callback = sinon.spy();
    document.cookie = 'ilgim=true';
    sinon.spy(CartModalDetailedComponent.prototype, actionName);
    let cartModal = mountComponent({
      cancelCallback: callback,
      primaryButton: primaryBtnConstant,
      handleCartAction: cartAction
    });
    cartModal.find('.primaryButton').simulate('click');
    expect(CartModalDetailedComponent.prototype[actionName]).toHaveProperty(
      'callCount',
      1
    );
    expect(CartModalDetailedComponent.prototype[callbackName]).toHaveProperty(
      'callCount',
      1
    );
    CartModalDetailedComponent.prototype[actionName].restore();
  };

  it('should render the cart level modal', () => {
    const callback = sinon.spy();
    let cartModal = mountComponent({ cancelCallback: callback });

    expect(cartModal.find('.testClassName').length).not.toBe(0);
    expect(cartModal.find('.container').length).not.toBe(0);
    expect(cartModal.find('.modalHeaderText').text()).toEqual(data.header);
    expect(cartModal.find('.modalBodyText').text()).toEqual(data.body);
  });

  it('should move wishlist success', () => {
    const handleCartAction = (_, __, success) => {
      success();
    };
    testBtnAction(
      cartModalConstants.MOVE_TO_WISHLIST,
      'moveToWishlist',
      SUCCESS_CALLBACK,
      handleCartAction
    );
  });

  it('should move wishlist failure', () => {
    const handleCartAction = (_, __, ___, failure) => {
      failure();
    };
    testBtnAction(
      cartModalConstants.MOVE_TO_WISHLIST,
      'moveToWishlist',
      ERROR_CALLBACK,
      handleCartAction
    );
  });

  it('should remove items success', () => {
    const handleCartAction = (_, __, success) => {
      success();
    };
    testBtnAction(
      cartModalConstants.REMOVE,
      'removeItems',
      SUCCESS_CALLBACK,
      handleCartAction
    );
  });

  it('should remove items failure', () => {
    const handleCartAction = (_, __, ___, failure) => {
      failure();
    };
    testBtnAction(
      cartModalConstants.REMOVE,
      'removeItems',
      ERROR_CALLBACK,
      handleCartAction
    );
  });

  it('should unselect items success', () => {
    const handleCartAction = (_, __, success) => {
      success();
    };
    testBtnAction(
      cartModalConstants.UNSELECT,
      'unselectItems',
      SUCCESS_CALLBACK,
      handleCartAction
    );
  });

  it('should unselect items failure', () => {
    const handleCartAction = (_, __, ___, failure) => {
      failure();
    };
    testBtnAction(
      cartModalConstants.UNSELECT,
      'unselectItems',
      ERROR_CALLBACK,
      handleCartAction
    );
  });

  it('should render invalid products', () => {
    const callback = sinon.spy();
    let cartModal = mountComponent({
      cancelCallback: callback
    });
    expect(cartModal.find('.brandName').text()).toEqual(
      invalidProducts[0].brand
    );
    expect(
      cartModal
        .find('Image')
        .at(1)
        .prop('src')
    ).toEqual(invalidProducts[0].images[0].secureSrc);
  });
});
