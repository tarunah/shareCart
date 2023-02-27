import React from 'react';
import { mount } from 'enzyme';
import { OfferHeader, OfferDiscountText, OfferFooter } from './';

window._checkout_ = {
  __myx_ab__: {},
  __myx_deviceData__: {
    isApp: true
  }
};

describe('Item Offer Components', () => {
  it('should render offer header - Combo Complete', () => {
    const data = {
      discountType: 256,
      conditionComplete: true,
      data: {
        currentCount: 1,
        appliedDiscountPercent: 10,
        comboInfo: []
      }
    };
    let container = mount(<OfferHeader offerData={data} />);

    expect(container.find('.comboComplete').length).not.toBe(0);
    expect(container.find('.comboHeaderText').text()).toEqual(
      'You have got 10% off on 1 item'
    );
  });

  it('should render offer header - Combo InComplete', () => {
    const data = {
      discountType: 256,
      conditionComplete: false,
      type: 'test',
      data: {
        currentCount: 1,
        appliedDiscountPercent: 10,
        comboInfo: [
          {
            minMore: 1,
            salePrice: 100
          }
        ]
      }
    };
    let container = mount(<OfferHeader offerData={data} />);

    expect(container.find('.comboInComplete').length).not.toBe(0);
    expect(container.find('.comboHeaderText').text()).toEqual(
      'You have got 10% off on 1 item'
    );
    expect(container.text()).toContain('Get 2 item(s) for 100');
    expect(container.find('.plus').text()).toEqual('+ Add 1 item(s)');
  });

  it('should render offer header - Combo InComplete - Staggered - More than one combo info', () => {
    const data = {
      discountType: 256,
      conditionComplete: false,
      type: 'test',
      data: {
        currentCount: 1,
        appliedDiscountPercent: 10,
        comboInfo: [
          {
            minMore: 1,
            percent: 8
          },
          {
            minMore: 2,
            percent: 20
          }
        ]
      }
    };
    let container = mount(<OfferHeader offerData={data} />);

    expect(container.find('.comboInComplete').length).not.toBe(0);
    expect(container.find('.comboHeaderText').text()).toEqual(
      'You have got 10% off on 1 item'
    );
    expect(container.text()).toContain('Get 8% off on 2 item(s)');
    expect(container.find('.plus').text()).toEqual('+ Add 1 item(s)');
  });
  it('should render offer header - BxGy', () => {
    const data = {
      discountType: 2,
      conditionComplete: false,
      comboComplete: false,
      type: 'test',
      message: 'testMessage',
      data: {
        buyCount: 2,
        getCount: 1,
        currentCount: 1
      }
    };
    let container = mount(<OfferHeader offerData={data} />);

    expect(container.find('a').length).not.toBe(0);
    expect(container.find('.comboStatus').text()).toEqual('COMBO OFFER');
    expect(container.find('.comboMessage').text()).toEqual('testMessage');
    expect(container.find('.comboAddItem').text()).toEqual('+ADD ITEM');
  });

  it('should render offer header - BxGyTD', () => {
    const data = {
      discountType: 1024,
      conditionComplete: false,
      comboComplete: false,
      type: 'test',
      message: 'testMessage',
      data: {
        buyCount: 2,
        getCount: 1,
        currentCount: 1
      }
    };
    let container = mount(<OfferHeader offerData={data} />);

    expect(container.find('a').length).not.toBe(0);
    expect(container.find('.comboStatus').text()).toEqual('COMBO OFFER');
    expect(container.find('.comboMessage').text()).toEqual('testMessage');
    expect(container.find('.comboAddItem').text()).toEqual('+ADD ITEM');
  });

  it('should render offer header - No Discount', () => {
    const data = {
      discountType: null
    };
    let container = mount(<OfferHeader offerData={data} />);

    expect(container.find('a').length).toBe(0);
  });

  it('should render offer header - Conditional offer', () => {
    const data = {
      id: 123,
      discountType: 8,
      conditionComplete: true,
      comboComplete: true,
      type: 'test',
      message: 'testMessage',
      data: {
        buyCount: 2,
        getCount: 1,
        currentCount: 1
      }
    };
    let container = mount(<OfferHeader offerData={data} />);

    expect(container.find('a').length).toBe(0);
    expect(container.find('.comboAddItem').length).toBe(0);
    expect(container.find('.comboStatus').text()).toEqual(
      'Yay! Combo offer applied'
    );
    expect(container.find('.comboMessage').text()).toEqual('testMessage');
  });

  it('should render offer header for best discount - Conditional offer', () => {
    const data = {
      id: 123,
      discountType: 8,
      conditionComplete: true,
      comboComplete: false,
      type: 'test',
      message: 'testMessage',
      data: {
        buyCount: 2,
        getCount: 1,
        currentCount: 1
      }
    };
    let container = mount(<OfferHeader offerData={data} />);

    expect(container.find('a').length).toBe(0);
    expect(container.find('.comboAddItem').length).toBe(0);
    expect(container.find('.comboStatus').text()).toEqual(
      'Great Choice! You got the best discount'
    );
    expect(container.find('.comboMessage').text()).toEqual('testMessage');
  });

  it('should render offer discount text - Free Gift', () => {
    let container = mount(
      <OfferDiscountText discountType={4} className="testClassName" />
    );

    expect(container.find('.freeGiftText').length).not.toBe(0);
    expect(container.find('.testClassName').length).not.toBe(0);
    expect(container.find('.freeGiftText').text()).toEqual(' Free Gift');
  });

  it('should render offer discount text - Free Gift - Flag', () => {
    const flags = {
      freeItem: true
    };
    let container = mount(
      <OfferDiscountText flags={flags} className="testClassName" />
    );

    expect(container.find('.freeGiftText').length).not.toBe(0);
    expect(container.find('.testClassName').length).not.toBe(0);
    expect(container.find('.freeGiftText').text()).toEqual(' Free Gift');
  });

  it('should render offer discount text - Trade Discount', () => {
    const de = {
      value: 200,
      meta: {
        unit: 'percent',
        value: 10
      }
    };
    let container = mount(
      <OfferDiscountText
        discountType={8}
        discountEntry={de}
        className="testClassName"
      />
    );

    expect(container.find('.itemDiscount').length).not.toBe(0);
    expect(container.find('.testClassName').length).not.toBe(0);
    expect(container.find('.tradeRupeeIcon').length).not.toBe(0);
    expect(container.find('.itemDiscount').text()).toEqual('200 OFF');
  });

  it('should render offer discount text - Trade Discount - Percentage', () => {
    const de = {
      value: 1,
      meta: {
        unit: 'PERCENT',
        value: 10
      }
    };
    let container = mount(
      <OfferDiscountText
        discountType={8}
        discountEntry={de}
        className="testClassName"
      />
    );

    expect(container.find('.itemDiscount').length).not.toBe(0);
    expect(container.find('.testClassName').length).not.toBe(0);
    expect(container.find('.itemDiscount').text()).toEqual('10% OFF');
  });

  it('should render frg header with add items callout - FRG List Page - app mode', () => {
    const data = {
      id: '58413568',
      type: 'TDGwpAm3000_0126d12ae64d40698c19f12ccfa17148',
      hasFreeItem: false,
      message: 'Add items worth 100 more',
      discountType: 2048,
      conditionComplete: false,
      comboComplete: false,
      showFrgListPage: true,
      frgSlabComboParams: [
        {
          slabName: 'Standard',
          minMore: 100,
          buyAmount: 1000,
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT',
          freeGiftInfo: []
        },
        {
          slabName: 'Exclusive',
          minMore: 500,
          buyAmount: 1500,
          freeGiftInfo: [],
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT'
        },
        {
          slabName: 'Premium',
          minMore: 1000,
          buyAmount: 2000,
          freeGiftInfo: [],
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT'
        }
      ],
      data: {
        minMore: 0,
        buyAmount: 599,
        currentCount: 1,
        currentAmount: 499,
        discountCategory: 'AMOUNT'
      }
    };

    const itemsList = [
      {
        id: 14976922,
        skuId: 49195444,
        itemId: 1635357882,
        flags: {
          freeItem: false
        },
        selectedSeller: {
          id: 25,
          partnerId: 4027
        },
        offerId: '58413568'
      },
      {
        id: 12343562,
        skuId: 42997964,
        itemId: 3478,
        flags: {
          freeItem: true
        },
        selectedSeller: {
          id: 3478,
          partnerId: 3478
        },
        offerId: '58413568'
      }
    ];

    window.triggerEvent = () => {};
    //App view
    window._checkout_ = {
      __myx_deviceData__: { isApp: true }
    };

    let container = mount(
      <OfferHeader
        offerData={data}
        itemsList={itemsList}
        isSampleSelectorEnabled={true}
      />
    );

    expect(container.find('FreeGiftV2').exists()).toEqual(true);
    expect(
      container.find('FreeGiftV2 FreeGiftConditionContainer').exists()
    ).toEqual(true);
    expect(container.find('Gift').exists()).toEqual(true);
    expect(container.find('.freeGiftTitle').length).toBe(1);
    expect(container.find('.freeGiftTitle').text()).toEqual('Get Free Gift');
    expect(container.find('.freeGiftTextContainer').children().length).toEqual(
      2
    );
    expect(
      container
        .find('.freeGiftTextContainer')
        .children()
        .at(1)
        .text()
    ).toEqual('Add items worth 100 more');
    expect(container.find('ChevronRight').exists()).toEqual(true);
    expect(container.find('a').props().href).toEqual(
      '/free-gift-list?baseStyleId=14976922&sellerPartnerId=4027&skuId=49195444&src=cart'
    );
  });

  it('should render frg header with Gift Available - FRG List Page - app mode', () => {
    const data = {
      id: '58413568',
      type: 'TDGwpAm3000_0126d12ae64d40698c19f12ccfa17148',
      hasFreeItem: false,
      message: 'Get 1 Free Gift',
      discountType: 2048,
      conditionComplete: true,
      comboComplete: false,
      showFrgListPage: true,
      frgSlabComboParams: [
        {
          slabName: 'Standard',
          minMore: 0,
          buyAmount: 1000,
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT',
          freeGiftInfo: []
        },
        {
          slabName: 'Exclusive',
          minMore: 500,
          buyAmount: 1500,
          freeGiftInfo: [],
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT'
        },
        {
          slabName: 'Premium',
          minMore: 1000,
          buyAmount: 2000,
          freeGiftInfo: [],
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT'
        }
      ],
      data: {
        minMore: 0,
        buyAmount: 599,
        currentCount: 1,
        currentAmount: 499,
        discountCategory: 'AMOUNT'
      }
    };

    const itemsList = [
      {
        id: 14976922,
        skuId: 49195444,
        itemId: 1635357882,
        flags: {
          freeItem: false
        },
        selectedSeller: {
          id: 25,
          partnerId: 4027
        },
        offerId: '58413568'
      },
      {
        id: 12343562,
        skuId: 42997964,
        itemId: 3478,
        flags: {
          freeItem: true
        },
        selectedSeller: {
          id: 3478,
          partnerId: 3478
        },
        offerId: '58413568'
      }
    ];

    window.triggerEvent = () => {};

    //mweb view
    window._checkout_ = {
      __myx_deviceData__: { deviceChannel: 'mobile' }
    };

    let container = mount(
      <OfferHeader
        offerData={data}
        itemsList={itemsList}
        isSampleSelectorEnabled={true}
      />
    );
    expect(container.find('FreeGiftV2').exists()).toEqual(true);
    expect(
      container.find('FreeGiftV2 FreeGiftConditionContainer').exists()
    ).toEqual(true);
    expect(container.find('Gift').exists()).toEqual(true);
    expect(container.find('.freeGiftTitle').length).toBe(1);
    expect(container.find('.freeGiftTitle').text()).toEqual(
      'Free Gift Available'
    );
    expect(container.find('.conditionCompleteTitle').length).toBe(2);
    expect(container.find('.freeGiftTextContainer').children().length).toEqual(
      2
    );
    expect(
      container
        .find('.freeGiftTextContainer')
        .children()
        .at(1)
        .text()
    ).toEqual('Get 1 Free Gift');
    expect(container.find('ChevronRight').exists()).toEqual(true);
    expect(container.find('a').props().href).toEqual(
      '/free-gift-list?query={"baseStyleId":"14976922","sellerPartnerId":"4027","skuId":"49195444","src":"cart"}'
    );
  });

  it('should render frg header with Gift callout - FRG List Page - app mode', () => {
    const data = {
      id: '58413568',
      type: 'TDGwpAm3000_0126d12ae64d40698c19f12ccfa17148',
      hasFreeItem: true,
      message: 'Gift Added',
      discountType: 2048,
      conditionComplete: true,
      comboComplete: false,
      showFrgListPage: true,
      frgSlabComboParams: [
        {
          slabName: 'Standard',
          minMore: 100,
          buyAmount: 1000,
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT',
          freeGiftInfo: []
        },
        {
          slabName: 'Exclusive',
          minMore: 500,
          buyAmount: 1500,
          freeGiftInfo: [],
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT'
        },
        {
          slabName: 'Premium',
          minMore: 1000,
          buyAmount: 2000,
          freeGiftInfo: [],
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT'
        }
      ],
      data: {
        minMore: 0,
        buyAmount: 599,
        currentCount: 1,
        currentAmount: 499,
        discountCategory: 'AMOUNT'
      }
    };

    const itemsList = [
      {
        id: 14976922,
        skuId: 49195444,
        itemId: 1635357882,
        flags: {
          freeItem: false
        },
        selectedSeller: {
          id: 25,
          partnerId: 4027
        },
        offerId: '58413568'
      },
      {
        id: 12343562,
        skuId: 42997964,
        itemId: 3478,
        flags: {
          freeItem: true
        },
        selectedSeller: {
          id: 3478,
          partnerId: 3478
        },
        offerId: '58413568'
      }
    ];

    window.triggerEvent = () => {};

    window._checkout_ = {
      __myx_kvpairs__: {
        'cart.sampleSelector': {
          androidVersion: '',
          iosVersion: '',
          freeGiftAdded: 'Yay! You got a free gift'
        }
      }
    };

    let container = mount(
      <OfferHeader
        offerData={data}
        itemsList={itemsList}
        isSampleSelectorEnabled={true}
      />
    );
    expect(container.find('FreeGiftV2').exists()).toEqual(true);
    expect(
      container.find('FreeGiftV2 FreeGiftComboContainer').exists()
    ).toEqual(true);
    expect(container.find('.freeGiftTitle').length).toBe(1);
    expect(container.find('.freeGiftTitle').text()).toEqual(
      'Yay! You got a free gift'
    );
  });

  it('should render frg header with add items callout - No FRG List Page', () => {
    const data = {
      id: '58413568',
      type: 'TDGwpAm3000_0126d12ae64d40698c19f12ccfa17148',
      hasFreeItem: false,
      message: 'Add items worth 100 more',
      discountType: 2048,
      conditionComplete: false,
      comboComplete: false,
      showFrgListPage: false,
      frgSlabComboParams: [
        {
          slabName: 'Standard',
          minMore: 100,
          buyAmount: 1000,
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT',
          freeGiftInfo: []
        },
        {
          slabName: 'Exclusive',
          minMore: 500,
          buyAmount: 1500,
          freeGiftInfo: [],
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT'
        },
        {
          slabName: 'Premium',
          minMore: 1000,
          buyAmount: 2000,
          freeGiftInfo: [],
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT'
        }
      ],
      data: {
        minMore: 0,
        buyAmount: 599,
        currentCount: 1,
        currentAmount: 499,
        discountCategory: 'AMOUNT'
      }
    };

    const itemsList = [
      {
        id: 14976922,
        skuId: 49195444,
        itemId: 1635357882,
        flags: {
          freeItem: false
        },
        selectedSeller: {
          id: 25,
          partnerId: 4027
        },
        offerId: '58413568'
      },
      {
        id: 12343562,
        skuId: 42997964,
        itemId: 3478,
        flags: {
          freeItem: true
        },
        selectedSeller: {
          id: 3478,
          partnerId: 3478
        },
        offerId: '58413568'
      }
    ];

    window.triggerEvent = () => {};

    let container = mount(
      <OfferHeader
        offerData={data}
        itemsList={itemsList}
        isSampleSelectorEnabled={true}
      />
    );

    expect(container.find('FreeGiftV2').exists()).toEqual(true);
    expect(
      container.find('FreeGiftV2 FreeGiftConditionContainer').exists()
    ).toEqual(true);
    expect(container.find('Gift').exists()).toEqual(true);
    expect(container.find('.freeGiftTitle').length).toBe(1);
    expect(container.find('.freeGiftTitle').text()).toEqual('Get Free Gift');
    expect(container.find('.freeGiftTextContainer').children().length).toEqual(
      2
    );
    expect(
      container
        .find('.freeGiftTextContainer')
        .children()
        .at(1)
        .text()
    ).toEqual('Add items worth 100 more');
    expect(container.find('ChevronRight').exists()).toEqual(true);
    expect(container.find('a').props().href).toEqual(
      '/online-fashion-store?userQuery=false&p=1&f=Offers%3ATDGwpAm3000_0126d12ae64d40698c19f12ccfa17148'
    );
  });

  it('should render OOS Header - FRG List Page - app mode', () => {
    const data = {
      id: '58413568',
      type: 'TDGwpAm3000_0126d12ae64d40698c19f12ccfa17148',
      hasFreeItem: true,
      message: 'Gift Added',
      discountType: 2048,
      conditionComplete: true,
      comboComplete: false,
      showFrgListPage: true,
      frgSlabComboParams: [
        {
          slabName: 'Standard',
          minMore: 100,
          buyAmount: 1000,
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT',
          freeGiftInfo: [
            {
              outOfStock: true
            }
          ]
        },
        {
          slabName: 'Exclusive',
          minMore: 500,
          buyAmount: 1500,
          freeGiftInfo: [],
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT'
        },
        {
          slabName: 'Premium',
          minMore: 1000,
          buyAmount: 2000,
          freeGiftInfo: [],
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT'
        }
      ],
      data: {
        minMore: 0,
        buyAmount: 599,
        currentCount: 1,
        currentAmount: 499,
        discountCategory: 'AMOUNT'
      }
    };

    const itemsList = [
      {
        id: 14976922,
        skuId: 49195444,
        itemId: 1635357882,
        flags: {
          freeItem: false
        },
        selectedSeller: {
          id: 25,
          partnerId: 4027
        },
        offerId: '58413568'
      },
      {
        id: 12343562,
        skuId: 42997964,
        itemId: 3478,
        flags: {
          freeItem: true
        },
        selectedSeller: {
          id: 3478,
          partnerId: 3478
        },
        offerId: '58413568'
      }
    ];

    window.triggerEvent = () => {};

    let container = mount(
      <OfferHeader
        offerData={data}
        itemsList={itemsList}
        isSampleSelectorEnabled={true}
      />
    );
    expect(container.find('FreeGiftV2').exists()).toEqual(true);
    expect(
      container.find('FreeGiftComboContainer FreeGiftOOSContainer').exists()
    ).toEqual(true);
    expect(container.find('.freeGiftTitle').length).toBe(1);
    expect(container.find('.freeGiftTitle').text()).toEqual(
      'Selected free gift went out of stock'
    );
    expect(
      container
        .find('.freeGiftTextContainer')
        .children()
        .at(1)
        .text()
    ).toEqual('Please remove or change free gift.');
  });

  it('should render OOS Header - FRG List Page - non app mode', () => {
    const data = {
      id: '58413568',
      type: 'TDGwpAm3000_0126d12ae64d40698c19f12ccfa17148',
      hasFreeItem: true,
      message: 'Gift Added',
      discountType: 2048,
      conditionComplete: true,
      comboComplete: false,
      showFrgListPage: true,
      frgSlabComboParams: [
        {
          slabName: 'Standard',
          minMore: 100,
          buyAmount: 1000,
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT',
          freeGiftInfo: [
            {
              outOfStock: true
            }
          ]
        },
        {
          slabName: 'Exclusive',
          minMore: 500,
          buyAmount: 1500,
          freeGiftInfo: [],
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT'
        },
        {
          slabName: 'Premium',
          minMore: 1000,
          buyAmount: 2000,
          freeGiftInfo: [],
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT'
        }
      ],
      data: {
        minMore: 0,
        buyAmount: 599,
        currentCount: 1,
        currentAmount: 499,
        discountCategory: 'AMOUNT'
      }
    };

    window.triggerEvent = () => {};

    let container = mount(
      <OfferHeader offerData={data} isSampleSelectorEnabled={false} />
    );
    expect(container.find('FreeGiftV1').exists()).toEqual(true);
    expect(container.find('FreeGiftOOSContainer').exists()).toEqual(true);
    expect(container.find('FreeGiftOOSContainer').props().isFreeGiftV1).toEqual(
      true
    );
    expect(container.find('.freeGiftTitle').length).toBe(1);
    expect(container.find('.freeGiftTitle').text()).toEqual(
      'Selected free gift went out of stock'
    );
    expect(
      container
        .find('.freeGiftTextContainer')
        .children()
        .at(1)
        .text()
    ).toEqual('Use latest Myntra app to change your free gift');
  });

  it('should render frg Header with add items callout - FRG List Page - non app mode', () => {
    const data = {
      id: '58413568',
      type: 'TDGwpAm3000_0126d12ae64d40698c19f12ccfa17148',
      hasFreeItem: false,
      message: 'Gift Added',
      discountType: 2048,
      conditionComplete: false,
      comboComplete: false,
      showFrgListPage: true,
      frgSlabComboParams: [
        {
          slabName: 'Standard',
          minMore: 100,
          buyAmount: 1000,
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT',
          freeGiftInfo: []
        },
        {
          slabName: 'Exclusive',
          minMore: 500,
          buyAmount: 1500,
          freeGiftInfo: [],
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT'
        },
        {
          slabName: 'Premium',
          minMore: 1000,
          buyAmount: 2000,
          freeGiftInfo: [],
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT'
        }
      ],
      data: {
        minMore: 0,
        buyAmount: 599,
        currentCount: 1,
        currentAmount: 499,
        discountCategory: 'AMOUNT'
      }
    };

    window.triggerEvent = () => {};

    let container = mount(
      <OfferHeader offerData={data} isSampleSelectorEnabled={false} />
    );
    expect(container.find('FreeGiftV1').exists()).toEqual(true);
    expect(container.find('.freeGiftHeaderContainer').exists()).toEqual(true);
    expect(container.find('Gift').exists()).toEqual(true);
    expect(container.find('.freeGiftTitle').length).toBe(1);
    expect(container.find('.freeGiftTitle').text()).toEqual(
      'Get a Free Gift with items worth ₹100 more'
    );
    expect(
      container
        .find('.freeGiftTextContainer')
        .children()
        .at(1)
        .text()
    ).toEqual('Use latest Myntra app to view offer');
  });

  it('should render frg Header with Gift Available - FRG List Page - non app mode', () => {
    const data = {
      id: '58413568',
      type: 'TDGwpAm3000_0126d12ae64d40698c19f12ccfa17148',
      hasFreeItem: false,
      message: 'Gift Added',
      discountType: 2048,
      conditionComplete: true,
      comboComplete: false,
      showFrgListPage: true,
      frgSlabComboParams: [
        {
          slabName: 'Standard',
          minMore: 0,
          buyAmount: 1000,
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT',
          freeGiftInfo: []
        },
        {
          slabName: 'Exclusive',
          minMore: 500,
          buyAmount: 1500,
          freeGiftInfo: [],
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT'
        },
        {
          slabName: 'Premium',
          minMore: 1000,
          buyAmount: 2000,
          freeGiftInfo: [],
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT'
        }
      ],
      data: {
        minMore: 0,
        buyAmount: 599,
        currentCount: 1,
        currentAmount: 499,
        discountCategory: 'AMOUNT'
      }
    };

    window.triggerEvent = () => {};

    let container = mount(
      <OfferHeader offerData={data} isSampleSelectorEnabled={false} />
    );
    expect(container.find('FreeGiftV1').exists()).toEqual(true);
    expect(container.find('.freeGiftHeaderContainer').exists()).toEqual(true);
    expect(container.find('Gift').exists()).toEqual(true);
    expect(container.find('.freeGiftTitle').length).toBe(1);
    expect(container.find('.conditionCompleteTitle').length).toBe(2);
    expect(container.find('.freeGiftTitle').text()).toEqual(
      'You can avail a Free Gift with this combo'
    );
    expect(
      container
        .find('.freeGiftTextContainer')
        .children()
        .at(1)
        .text()
    ).toEqual('Use latest Myntra app to select your free gift');
  });

  it('should render frg Header with Gift Added - FRG List Page - non app mode', () => {
    const data = {
      id: '58413568',
      type: 'TDGwpAm3000_0126d12ae64d40698c19f12ccfa17148',
      hasFreeItem: true,
      message: 'Gift Added',
      discountType: 2048,
      conditionComplete: true,
      comboComplete: false,
      showFrgListPage: true,
      frgSlabComboParams: [
        {
          slabName: 'Standard',
          minMore: 0,
          buyAmount: 1000,
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT',
          freeGiftInfo: []
        },
        {
          slabName: 'Exclusive',
          minMore: 500,
          buyAmount: 1500,
          freeGiftInfo: [],
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT'
        },
        {
          slabName: 'Premium',
          minMore: 1000,
          buyAmount: 2000,
          freeGiftInfo: [],
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT'
        }
      ],
      data: {
        minMore: 0,
        buyAmount: 599,
        currentCount: 1,
        currentAmount: 499,
        discountCategory: 'AMOUNT'
      }
    };

    window.triggerEvent = () => {};

    window._checkout_ = {
      __myx_kvpairs__: {
        'cart.sampleSelector': {
          androidVersion: '',
          iosVersion: '',
          freeGiftAdded: 'Yay! You got a free gift'
        }
      }
    };

    let container = mount(
      <OfferHeader offerData={data} isSampleSelectorEnabled={false} />
    );
    expect(container.find('FreeGiftV1').exists()).toEqual(true);
    expect(container.find('.freeGiftHeaderContainer').exists()).toEqual(true);
    expect(container.find('Gift').exists()).toEqual(true);
    expect(container.find('.freeGiftTitle').length).toBe(1);
    expect(container.find('.freeGiftTitle').text()).toEqual(
      'Yay! You got a free gift'
    );
    expect(
      container
        .find('.freeGiftTextContainer')
        .children()
        .at(1)
        .text()
    ).toEqual('Use latest Myntra app to change your free gift');
  });

  it('should render frg footer with unlock slab callout', () => {
    const unlockableSlab = {
      slabName: 'Exclusive',
      minMore: 500,
      buyAmount: 1500,
      freeGiftInfo: [],
      maxFreeItemCount: 1,
      discountCategory: 'AMOUNT'
    };

    const itemsList = [
      {
        id: 14976922,
        skuId: 49195444,
        itemId: 1635357882,
        flags: {
          freeItem: false
        },
        selectedSeller: {
          id: 25,
          partnerId: 4027
        },
        offerId: '58413568'
      },
      {
        id: 12343562,
        skuId: 42997964,
        itemId: 3478,
        flags: {
          freeItem: true
        },
        selectedSeller: {
          id: 3478,
          partnerId: 3478
        },
        offerId: '58413568'
      }
    ];

    window.triggerEvent = () => {};

    //mweb view
    window._checkout_ = {
      __myx_deviceData__: { deviceChannel: 'mobile' }
    };

    let container = mount(
      <OfferFooter unlockableSlab={unlockableSlab} itemsList={itemsList} />
    );

    expect(container.find('FreeGiftConditionContainer').exists()).toEqual(true);
    expect(container.find('Gift').exists()).toEqual(true);
    expect(container.find('.freeGiftTitle').length).toBe(1);
    expect(container.find('.freeGiftTitle').text()).toEqual(
      'Unlock Exclusive Free Gift'
    );
    expect(container.find('.freeGiftTextContainer').children().length).toEqual(
      2
    );
    expect(
      container
        .find('.freeGiftTextContainer')
        .children()
        .at(1)
        .text()
    ).toEqual('Add items worth ₹500 more to unlock.');
    expect(container.find('ChevronRight').exists()).toEqual(true);
    expect(container.find('a').props().href).toEqual(
      '/free-gift-list?query={"baseStyleId":"14976922","sellerPartnerId":"4027","skuId":"49195444","src":"cart","slabName":"Exclusive"}'
    );
  });

  it('should render OfferDiscountText for zero mrp free item - FRG List Page', () => {
    const props = {
      styleId: 58413568,
      discountType: 2048,
      flags: {
        freeItem: true
      },
      showFrgListPage: true,
      zeroMrp: true,
      frgSlabComboParams: [
        {
          slabName: 'Standard',
          minMore: 0,
          buyAmount: 1000,
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT',
          freeGiftInfo: []
        },
        {
          slabName: 'Exclusive',
          minMore: 500,
          buyAmount: 1500,
          freeGiftInfo: [
            {
              styleId: 58413568
            }
          ],
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT'
        },
        {
          slabName: 'Premium',
          minMore: 1000,
          buyAmount: 2000,
          freeGiftInfo: [],
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT'
        }
      ]
    };

    window.triggerEvent = () => {};

    let container = mount(<OfferDiscountText {...props} />);
    expect(container.find('.freeGiftText').length).toBe(1);
    expect(container.find('.freeGiftText').text()).toEqual(
      'Exclusive Free Gift'
    );
  });

  it('should render OfferDiscountText for zero mrp free item - No FRG List Page', () => {
    const props = {
      styleId: 58413568,
      discountType: 2048,
      flags: {
        freeItem: true
      },
      showFrgListPage: false,
      zeroMrp: true,
      frgSlabComboParams: [
        {
          slabName: 'Standard',
          minMore: 0,
          buyAmount: 1000,
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT',
          freeGiftInfo: []
        },
        {
          slabName: 'Exclusive',
          minMore: 500,
          buyAmount: 1500,
          freeGiftInfo: [
            {
              styleId: 58413568
            }
          ],
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT'
        },
        {
          slabName: 'Premium',
          minMore: 1000,
          buyAmount: 2000,
          freeGiftInfo: [],
          maxFreeItemCount: 1,
          discountCategory: 'AMOUNT'
        }
      ]
    };

    window.triggerEvent = () => {};

    let container = mount(<OfferDiscountText {...props} />);
    expect(container.find('.freeGiftText').length).toBe(1);
    expect(container.find('.freeGiftText').text()).toEqual(' Free Gift');
  });
});
