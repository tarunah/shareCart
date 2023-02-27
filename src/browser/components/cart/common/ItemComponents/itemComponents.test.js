import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { render, screen } from '@testing-library/react';

import {
  ReturnInfo,
  ItemPersonalizedDiscount,
  EssentialTag,
  DeselectComboDialog,
  SelectionIndicator,
  MoveOutOfBagModal,
  CartViews,
  ServiceabilityInfo
} from './';

describe('Item Components', () => {
  const currentDate = Date.now();
  const normalShippingInfo = {
    serviceable: true,
    shippingEstimates: [
      {
        shippingMethod: 'NORMAL',
        promiseDate: '1628142494000',
        orderBy: `${currentDate + 11633713}`,
        expressLabelMap: {
          NORMAL: 'Delivery by 16 sep'
        }
      }
    ]
  };

  const expressShippingInfo = {
    serviceable: true,
    shippingEstimates: [
      {
        shippingMethod: 'EXPRESS',
        promiseDate: '1628142494000',
        orderBy: `${currentDate + 11633713}`,
        expressLabelMap: {
          MEXPRESS: 'Delivery in 1 day'
        }
      },
      {
        shippingMethod: 'NORMAL',
        promiseDate: '1628142494000',
        orderBy: `${currentDate + 11633713}`,
        expressLabelMap: {
          NORMAL: 'Delivery by 16 sep'
        }
      }
    ]
  };

  const mexpressShippingInfo = {
    serviceable: true,
    shippingEstimates: [
      {
        shippingMethod: 'EXPRESS',
        promiseDate: `${currentDate + 86400000}`,
        orderBy: `${currentDate + 11633713}`,
        expressLabelMap: {
          MEXPRESS: 'Delivery in 1 day'
        }
      },
      {
        shippingMethod: 'NORMAL',
        promiseDate: `${currentDate + 172800000}`,
        orderBy: `${currentDate + 11633713}`,
        expressLabelMap: {
          MEXPRESS: 'Delivery in 1 day'
        }
      }
    ]
  };

  const emptyShippingInfo = {
    serviceable: true,
    shippingEstimates: []
  };

  const serviceabilityProps = {
    serviceabilityInfo: {
      pincodeInfo: normalShippingInfo,
      tryNBuyAvailable: true,
      alterationAvailable: true
    },
    show: true,
    isExchangeCart: false,
    updateDeliveryEstimates: () => {}
  };

  it('ReturnInfo should not show return policy when AB is disabled', () => {
    window._checkout_ = {
      __myx_ab__: { 'cart.returnpolicy': 'disabled' },
      __myx_deviceData__: { isApp: true }
    };

    const wrapper = mount(
      <ReturnInfo
        returnable={true}
        exchangeable={true}
        returnPeriod={5}
        cartItemsReturnInfo={{
          allReturnable: true,
          allExchangeable: true,
          sameReturnPeriod: true,
          commonReturnPeriod: 5
        }}
      />
    );

    const returnInfoWrapper = wrapper.find('.returnInfoContainer');
    expect(returnInfoWrapper.length).toBe(0);
  });

  it('ReturnInfo should show correct return policy when when AB variant is `oncard`', () => {
    window._checkout_ = {
      __myx_ab__: { 'cart.returnpolicy': 'oncard' },
      __myx_deviceData__: { isApp: true }
    };

    const wrapper = mount(
      <ReturnInfo
        returnable={true}
        exchangeable={true}
        returnPeriod={7}
        cartItemsReturnInfo={{
          allReturnable: true,
          allExchangeable: true,
          sameReturnPeriod: false,
          commonReturnPeriod: null
        }}
      />
    );

    const returnInfoWrapper = wrapper.find('.returnInfoContainer');
    expect(returnInfoWrapper.length).toBe(1);
    const returnInfoWrapperText = returnInfoWrapper
      .find('.returnPolicyMessage')
      .text();
    expect(returnInfoWrapperText).toBe('7 Days Easy Return');
  });

  it('ReturnInfo should show correct return policy when when AB variant is `oncard`', () => {
    window._checkout_ = {
      __myx_ab__: { 'cart.returnpolicy': 'oncard' },
      __myx_deviceData__: { isApp: true }
    };

    const wrapper = mount(
      <ReturnInfo
        returnable={true}
        exchangeable={false}
        returnPeriod={7}
        cartItemsReturnInfo={{
          allReturnable: true,
          allExchangeable: true,
          sameReturnPeriod: false,
          commonReturnPeriod: null
        }}
      />
    );

    const returnInfoWrapper = wrapper.find('.returnInfoContainer');
    expect(returnInfoWrapper.length).toBe(1);
    const returnInfoWrapperText = returnInfoWrapper
      .find('.returnPolicyMessage')
      .text();
    expect(returnInfoWrapperText).toBe('7 Days Easy Return (non exchangable)');
  });

  it('ReturnInfo should show correct return policy when when AB variant is `oncard`', () => {
    window._checkout_ = {
      __myx_ab__: { 'cart.returnpolicy': 'oncard' },
      __myx_deviceData__: { isApp: true }
    };

    const wrapper = mount(
      <ReturnInfo
        returnable={false}
        exchangeable={true}
        returnPeriod={7}
        cartItemsReturnInfo={{
          allReturnable: true,
          allExchangeable: true,
          sameReturnPeriod: false,
          commonReturnPeriod: null
        }}
      />
    );

    const returnInfoWrapper = wrapper.find('.returnInfoContainer');
    expect(returnInfoWrapper.length).toBe(1);
    const returnInfoWrapperText = returnInfoWrapper
      .find('.returnPolicyMessage')
      .text();
    expect(returnInfoWrapperText).toBe('7 Days Easy Exchange (non returnable)');
  });

  it('ReturnInfo should show return policy if present when when AB variant is `onstrip` but policy is non uniform', () => {
    window._checkout_ = {
      __myx_ab__: { 'cart.returnpolicy': 'onstrip' },
      __myx_deviceData__: { isApp: true }
    };

    const wrapper = mount(
      <ReturnInfo
        returnable={true}
        exchangeable={true}
        returnPeriod={3}
        cartItemsReturnInfo={{
          allReturnable: true,
          allExchangeable: true,
          sameReturnPeriod: false,
          commonReturnPeriod: null
        }}
      />
    );

    const returnInfoWrapper = wrapper.find('.returnInfoContainer');
    expect(returnInfoWrapper.length).toBe(1);
    const returnInfoWrapperText = returnInfoWrapper
      .find('.returnPolicyMessage')
      .text();
    expect(returnInfoWrapperText).toBe('3 Days Easy Return');
  });

  it('ReturnInfo should not show return policy if uniform when AB variant is `onstrip`', () => {
    window._checkout_ = {
      __myx_ab__: { 'cart.returnpolicy': 'onstrip' },
      __myx_deviceData__: { isApp: true }
    };

    const wrapper = mount(
      <ReturnInfo
        returnable={true}
        exchangeable={true}
        returnPeriod={3}
        cartItemsReturnInfo={{
          allReturnable: true,
          allExchangeable: true,
          sameReturnPeriod: true,
          commonReturnPeriod: 3
        }}
      />
    );

    const returnInfoWrapper = wrapper.find('.returnInfoContainer');
    expect(returnInfoWrapper.length).toBe(0);
  });

  it('ReturnInfo should show correct return policy when AB is off', () => {
    window._checkout_ = {
      __myx_ab__: { 'cart.returnpolicy': 'disabled' },
      __myx_deviceData__: { isApp: true }
    };

    const wrapper = mount(
      <ReturnInfo
        returnable={false}
        exchangeable={true}
        returnPeriod={3}
        cartItemsReturnInfo={{
          allReturnable: false,
          allExchangeable: false,
          sameReturnPeriod: false,
          commonReturnPeriod: null
        }}
      />
    );

    const returnInfoWrapper = wrapper.find('.returnInfoContainer');
    expect(returnInfoWrapper.length).toBe(1);
    const returnInfoWrapperText = returnInfoWrapper
      .find('.returnPolicyMessage')
      .text();
    expect(returnInfoWrapperText).toBe('Exchange Only');
  });

  it('ReturnInfo should show correct return policy if not returnable', () => {
    const wrapper = mount(
      <ReturnInfo
        returnable={false}
        exchangeable={false}
        returnPeriod={0}
        cartItemsReturnInfo={{
          allReturnable: false,
          allExchangeable: false,
          sameReturnPeriod: false,
          commonReturnPeriod: null
        }}
      />
    );

    const returnInfoWrapper = wrapper.find('.returnInfoContainer');
    expect(returnInfoWrapper.length).toBe(1);
    const returnInfoWrapperText = returnInfoWrapper
      .find('.returnPolicyMessage')
      .text();
    expect(returnInfoWrapperText).toBe('Not returnable');
  });

  it('ReturnInfo should show correct return policy when user is new and AB variant enable', () => {
    window._checkout_ = {
      __myx_ab__: { 'checkout.cart.returnPolicyNewUser': 'enabled' },
      __myx_features__: {
        'checkout.returnPolicyOnNewUser.enable': true
      },
      __myx_deviceData__: { isApp: true }
    };

    const wrapper = mount(
      <ReturnInfo
        returnable={true}
        exchangeable={true}
        returnPeriod={30}
        cartItemsReturnInfo={{
          allReturnable: true,
          allExchangeable: true,
          sameReturnPeriod: false,
          commonReturnPeriod: null
        }}
      />
    );

    const returnInfoWrapper = wrapper.find('.returnInfoContainer');
    expect(returnInfoWrapper.length).toBe(1);
    const returnInfoWrapperText = returnInfoWrapper
      .find('.returnPolicyMessage')
      .text();
    expect(returnInfoWrapperText).toBe('Hassle free 30 Days Return');
  });

  it('ReturnInfo should show correct return policy when user is new and AB variant enable', () => {
    window._checkout_ = {
      __myx_ab__: { 'checkout.cart.returnPolicyNewUser': 'enabled' },
      __myx_features__: {
        'checkout.returnPolicyOnNewUser.enable': true
      },
      __myx_deviceData__: { isApp: true }
    };

    const wrapper = mount(
      <ReturnInfo
        returnable={false}
        exchangeable={true}
        returnPeriod={30}
        cartItemsReturnInfo={{
          allReturnable: true,
          allExchangeable: true,
          sameReturnPeriod: false,
          commonReturnPeriod: null
        }}
      />
    );

    const returnInfoWrapper = wrapper.find('.returnInfoContainer');
    expect(returnInfoWrapper.length).toBe(1);
    const returnInfoWrapperText = returnInfoWrapper
      .find('.returnPolicyMessage')
      .text();
    expect(returnInfoWrapperText).toBe(
      'Hassle free 30 Days Exchange (non returnable)'
    );
  });

  it('should display personalized coupon Component', () => {
    const appliedCoupons = [
      {
        coupon: 'abckkd',
        couponDiscount: 124.12,
        couponBucketType: 2
      }
    ];
    let component = mount(<ItemPersonalizedDiscount {...appliedCoupons[0]} />);
    expect(component.text()).toEqual('Pre-Applied deal abckkd');
  });

  it('should show essential tag', () => {
    const wrapper = mount(<EssentialTag />);

    expect(wrapper.find('.essentialTag').text()).toEqual('Essential');
  });

  describe('DeselectComboDialog', () => {
    it('Should not show the comboDialogue component if showComboDialogue is false', () => {
      const wrapper = mount(<DeselectComboDialog showComboDialogue={false} />);

      expect(wrapper.find('Modal').exists()).toBe(false);
    });

    it('Should show the comboDialogue component', () => {
      const wrapper = mount(
        <DeselectComboDialog
          showComboDialogue={true}
          image="http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/2364443/2018/1/12/11515760122749-Nike-Men-Blue-Printed-Round-Neck-T-shirt-6471515760122672-1.jpg"
        />
      );

      expect(wrapper.find('Modal').exists()).toBe(true);
      expect(wrapper.find('.modalTitle').text()).toEqual('Deselect item(s)');
      expect(wrapper.find('.modalText').text()).toContain(
        'A combo has applied on this item. Are you sure you want to deselect and dismiss the combo?'
      );
      expect(
        wrapper
          .find('button')
          .at(0)
          .text()
      ).toEqual('DESELECT ITEM');
      expect(
        wrapper
          .find('button')
          .at(1)
          .text()
      ).toEqual('KEEP THE COMBO');
    });

    it('Should call toggleComboDialogue on click of KEEP THE COMBO button', () => {
      const toggleComboDialogue = sinon.spy();
      const wrapper = mount(
        <DeselectComboDialog
          showComboDialogue={true}
          toggleComboDialogue={toggleComboDialogue}
        />
      );

      wrapper
        .find('button')
        .at(1)
        .simulate('click');

      expect(toggleComboDialogue.calledOnce).toBe(true);
    });

    it('Should call toggleSelection on click of DESELECT ITEM button', () => {
      const toggleSelection = sinon.spy();
      const wrapper = mount(
        <DeselectComboDialog
          showComboDialogue={true}
          toggleSelection={toggleSelection}
        />
      );

      wrapper
        .find('button')
        .at(0)
        .simulate('click');

      expect(toggleSelection.calledOnce).toBe(true);
    });
  });

  describe('SelectionIndicator', () => {
    it('should show tool tip with a delay of 300ms, when isFirstItem is true and SELECTIVE_CHECKOUT_TOOLTIP cookie is not found', async () => {
      const _setTimeout = window.setTimeout;
      //for rendered delay
      const setTimeout = sinon.spy((cb, _) => {
        cb();
      });
      window.setTimeout = setTimeout;

      const wrapper = mount(<SelectionIndicator isFirstItem={true} />);

      expect(setTimeout.getCall(0).args[1]).toBe(300);
      expect(wrapper.find('ToolTipMessage').exists()).toBe(true);
      expect(wrapper.find('.toolTipContainer').text()).toContain(
        'Select items that you want to buy now and proceed. Remaining items will stay in your bag.'
      );
      expect(wrapper.find('.toolTipCTA').text()).toEqual('Ok, Got it');

      //on click of okay it should disappear
      wrapper.find('.toolTipCTA').simulate('click');

      expect(wrapper.state().showToolTip).toBe(false);
      window.setTimeout = _setTimeout;
    });

    it('should CheckboxActive while selectedForCheckout is true', () => {
      const wrapper = mount(<SelectionIndicator selectedForCheckout={true} />);

      expect(wrapper.find('CheckboxActive').exists()).toBe(true);
    });

    it('should ProductInactive while selectedForCheckout is true', () => {
      const wrapper = mount(<SelectionIndicator selectedForCheckout={false} />);
      expect(wrapper.find('ProductInactive').exists()).toBe(true);
    });

    it('should highlight product while selectedForCheckout is false and highlightProductsSelection is true', () => {
      const wrapper = mount(
        <SelectionIndicator
          selectedForCheckout={false}
          dynamicStyles={{ highlightProductsSelection: true }}
        />
      );

      expect(wrapper.find('ProductInactive').exists()).toBe(true);
      expect(wrapper.find('.selectionHighlight').exists()).toBe(true);
    });
  });

  describe('MoveOutOfBagModal', () => {
    it('should show modal if showMoveOutOfBagDialogue is true', () => {
      window.triggerEvent = () => {};
      let wrapper = mount(
        <MoveOutOfBagModal
          showMoveOutOfBagDialogue={false}
          toggleMoveOutOfBagDialogue={() => {}}
          remove={() => {}}
          moveToWishlist={() => {}}
        />
      );

      expect(wrapper.find('ConfirmOrCancelModal div').exists()).toBe(false);

      wrapper = mount(
        <MoveOutOfBagModal
          showMoveOutOfBagDialogue={true}
          toggleMoveOutOfBagDialogue={() => {}}
          remove={() => {}}
          moveToWishlist={() => {}}
          image="http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/2364443/2018/1/12/11515760122749-Nike-Men-Blue-Printed-Round-Neck-T-shirt-6471515760122672-1.jpg"
        />
      );

      expect(wrapper.find('ConfirmOrCancelModal div').exists()).toBe(true);
    });

    it('should show similar products and correct text if isShowSimilarProducts is true', () => {
      window.triggerEvent = () => {};
      let wrapper = mount(
        <MoveOutOfBagModal
          showMoveOutOfBagDialogue
          toggleMoveOutOfBagDialogue={() => {}}
          remove={() => {}}
          moveToWishlist={() => {}}
          isShowSimilarProducts
        />
      );
      expect(wrapper.find('ViewSimilarStrip').exists()).toBe(true);
    });

    it('should not show similar products if isShowSimilarProducts is false', () => {
      let wrapper = mount(
        <MoveOutOfBagModal
          showMoveOutOfBagDialogue={false}
          toggleMoveOutOfBagDialogue={() => {}}
          remove={() => {}}
          moveToWishlist={() => {}}
          isShowSimilarProducts={false}
        />
      );
      expect(wrapper.find('.similarStripContainer').exists()).toBe(false);
    });

    it('should show proper content in modal', () => {
      const src =
        'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/2364443/2018/1/12/11515760122749-Nike-Men-Blue-Printed-Round-Neck-T-shirt-6471515760122672-1.jpg';
      const wrapper = mount(
        <MoveOutOfBagModal
          showMoveOutOfBagDialogue={true}
          toggleMoveOutOfBagDialogue={() => {}}
          remove={() => {}}
          moveToWishlist={() => {}}
          image={src}
        />
      );

      expect(wrapper.find('Image').props().src).toBe(src);
      expect(wrapper.find('.modalTitle').text()).toEqual('Move from Bag');
      expect(wrapper.find('.modalText').text()).toContain(
        'Are you sure you want to move this item from bag?'
      );
      expect(
        wrapper
          .find('InlineButton button')
          .at(0)
          .text()
      ).toContain('REMOVE');
      expect(
        wrapper
          .find('InlineButton button')
          .at(1)
          .text()
      ).toContain('MOVE TO WISHLIST');
    });

    it('should show call remove callback on click of remove button', () => {
      const remove = sinon.spy();
      const wrapper = mount(
        <MoveOutOfBagModal
          showMoveOutOfBagDialogue={true}
          toggleMoveOutOfBagDialogue={() => {}}
          remove={remove}
          moveToWishlist={() => {}}
        />
      );

      wrapper
        .find('InlineButton button')
        .at(0)
        .simulate('click');
      expect(remove.calledOnce).toBe(true);
    });

    it('should show call moveToWishlist callback on click of remove button', () => {
      const moveToWishlist = sinon.spy();
      const wrapper = mount(
        <MoveOutOfBagModal
          showMoveOutOfBagDialogue={true}
          toggleMoveOutOfBagDialogue={() => {}}
          remove={() => {}}
          moveToWishlist={moveToWishlist}
        />
      );

      wrapper
        .find('InlineButton button')
        .at(1)
        .simulate('click');
      expect(moveToWishlist.calledOnce).toBe(true);
    });
  });

  it('should display Cart Views', () => {
    window._checkout_ = {
      __myx_kvpairs__: {
        'cart.views': {
          minLimit: 10,
          cartViewText: 'People viewing now'
        }
      }
    };
    const wrapper = mount(<CartViews liveViews={10} />);
    expect(wrapper.find('Eye').exists()).toBe(true);
    expect(wrapper.find('.cartViewCount').text()).toEqual('10');
    expect(wrapper.find('.cartViewText').text()).toEqual('People viewing now');
  });

  it('should show serviceability component with normal shipping timelines', () => {
    window._checkout_ = {
      __myx_ab__: { 'cart.addressoncartv2': 'variant1' },
      __myx_features__: {
        'checkout.addressOnCartV2.enabled': true
      }
    };

    render(<ServiceabilityInfo {...serviceabilityProps} />);

    expect(screen.getAllByText('Delivery by'));
    expect(screen.getAllByText('5 Aug 2021'));
    expect(() => screen.getAllByText('If ordered within')).toThrowError();
    expect(screen.getAllByText('Eligible for Try & Buy'));
    expect(screen.getAllByText('Eligible for Alteration'));
  });

  it('should show serviceability component with speed11 shipping timelines', () => {
    window._checkout_ = {
      __myx_ab__: { 'cart.addressoncartv2': 'variant1' },
      __myx_features__: {
        'checkout.addressOnCartV2.enabled': true,
        'cart.item.orderby': true,
        'cart.speed11': true
      }
    };

    serviceabilityProps.serviceabilityInfo.pincodeInfo = expressShippingInfo;

    render(<ServiceabilityInfo {...serviceabilityProps} />);

    expect(screen.getAllByText('Delivery by'));
    expect(screen.getAllByText('5 Aug 2021'));
    expect(screen.getAllByText('If ordered within'));
    expect(screen.getAllByText('03 hr 13 min'));
    expect(screen.getAllByText('Eligible for Try & Buy'));
    expect(screen.getAllByText('Eligible for Alteration'));
  });

  it('should show serviceability component without speed11 shipping timelines', () => {
    window._checkout_ = {
      __myx_ab__: { 'cart.addressoncartv2': 'variant1' },
      __myx_features__: {
        'checkout.addressOnCartV2.enabled': true,
        'cart.item.orderby': true,
        'cart.speed11': false
      }
    };

    serviceabilityProps.serviceabilityInfo.pincodeInfo = expressShippingInfo;

    render(<ServiceabilityInfo {...serviceabilityProps} />);

    expect(screen.getAllByText('Delivery by'));
    expect(screen.getAllByText('5 Aug 2021'));
    expect(() => screen.getAllByText('If ordered within')).toThrowError();
  });

  it('should show serviceability component without order by in speed11 shipping timelines', () => {
    window._checkout_ = {
      __myx_ab__: { 'cart.addressoncartv2': 'variant1' },
      __myx_features__: {
        'checkout.addressOnCartV2.enabled': true,
        'cart.item.orderby': false,
        'cart.speed11': true
      }
    };

    serviceabilityProps.serviceabilityInfo.pincodeInfo = expressShippingInfo;

    render(<ServiceabilityInfo {...serviceabilityProps} />);

    expect(screen.getAllByText('Delivery by'));
    expect(screen.getAllByText('5 Aug 2021'));
    expect(() => screen.getAllByText('If ordered within')).toThrowError();
  });

  it('should show serviceability component with Mexpress timelines even with speed11', () => {
    window._checkout_ = {
      __myx_ab__: {
        'cart.addressoncartv2': 'variant1',
        'search.speed.mexpress': 'VariantB'
      },
      __myx_features__: {
        'checkout.addressOnCartV2.enabled': true,
        'cart.item.orderby': false,
        'cart.speed11': true
      },
      __myx_deviceData__: {
        deviceChannel: 'mobile'
      }
    };
    serviceabilityProps.serviceabilityInfo.pincodeInfo = mexpressShippingInfo;

    render(<ServiceabilityInfo {...serviceabilityProps} />);

    expect(screen.getAllByText('EXPRESS'));
    expect(screen.getAllByText('Delivery by'));
    expect(screen.getAllByText('tomorrow'));
  });

  it('should show serviceability component with Mexpress timelines without speed11', () => {
    window._checkout_ = {
      __myx_ab__: {
        'cart.addressoncartv2': 'variant1',
        'search.speed.mexpress': 'VariantB'
      },
      __myx_features__: {
        'checkout.addressOnCartV2.enabled': true,
        'cart.item.orderby': false,
        'cart.speed11': false
      },
      __myx_deviceData__: {
        deviceChannel: 'mobile'
      }
    };
    serviceabilityProps.serviceabilityInfo.pincodeInfo = mexpressShippingInfo;

    render(<ServiceabilityInfo {...serviceabilityProps} />);

    expect(screen.getAllByText('EXPRESS'));
    expect(screen.getAllByText('Delivery in'));
    expect(screen.getAllByText('2 days'));
  });

  it('should show serviceability component without Mexpress icon', () => {
    window._checkout_ = {
      __myx_ab__: {
        'cart.addressoncartv2': 'variant1',
        'search.speed.mexpress': 'VariantB'
      },
      __myx_features__: {
        'checkout.addressOnCartV2.enabled': true,
        'cart.item.orderby': false,
        'cart.speed11': false
      }
    };
    serviceabilityProps.serviceabilityInfo.pincodeInfo = {
      serviceable: true,
      shippingEstimates: [
        {
          shippingMethod: 'NORMAL',
          promiseDate: `${currentDate + 345600000}`,
          orderBy: `${currentDate + 11633713}`
        }
      ]
    };

    render(<ServiceabilityInfo {...serviceabilityProps} />);

    expect(() => screen.getAllByText('EXPRESS')).toThrowError();
    expect(screen.getAllByText('Delivery by'));
  });

  it('should show serviceability component without delivery estimates', () => {
    window._checkout_ = {
      __myx_ab__: { 'cart.addressoncartv2': 'variant1' },
      __myx_features__: {
        'checkout.addressOnCartV2.enabled': true
      }
    };

    serviceabilityProps.serviceabilityInfo.pincodeInfo = emptyShippingInfo;

    render(<ServiceabilityInfo {...serviceabilityProps} />);

    expect(() => screen.getAllByText('Delivery by')).toThrowError();
    expect(screen.getAllByText('Eligible for Try & Buy'));
    expect(screen.getAllByText('Eligible for Alteration'));
  });

  it('should show serviceability component without tryNBuy and alteration', () => {
    window._checkout_ = {
      __myx_ab__: { 'cart.addressoncartv2': 'variant1' },
      __myx_features__: {
        'checkout.addressOnCartV2.enabled': true,
        'cart.item.orderby': true,
        'cart.speed11': true
      }
    };

    serviceabilityProps.serviceabilityInfo.tryNBuyAvailable = false;
    serviceabilityProps.serviceabilityInfo.alterationAvailable = false;
    serviceabilityProps.serviceabilityInfo.pincodeInfo = expressShippingInfo;

    render(<ServiceabilityInfo {...serviceabilityProps} />);

    expect(screen.getAllByText('Delivery by'));
    expect(screen.getAllByText('5 Aug 2021'));
    expect(screen.getAllByText('If ordered within'));
    expect(screen.getAllByText('03 hr 13 min'));
    expect(() => screen.getAllByText('Eligible for Try & Buy')).toThrowError();
    expect(() => screen.getAllByText('Eligible for Alteration')).toThrowError();
  });

  it('should show serviceability component with serviceability error', () => {
    window._checkout_ = {
      __myx_ab__: { 'cart.addressoncartv2': 'variant1' },
      __myx_features__: {
        'checkout.addressOnCartV2.enabled': true
      }
    };

    serviceabilityProps.serviceabilityInfo.pincodeInfo.serviceable = false;
    render(<ServiceabilityInfo {...serviceabilityProps} />);

    expect(screen.getByText('Not deliverable at selected pincode.'));
  });
});
