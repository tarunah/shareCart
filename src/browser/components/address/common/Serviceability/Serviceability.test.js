/** @jest-environment jsdom */

import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Serviceability from '.';
import { getEstimatedDate } from 'commonBrowserUtils/AddressHelper';
import { getTimeBasedDate } from 'commonBrowserUtils/Helper';

describe('Serviceability for address', () => {
  const productDeliveryInfo = [
    {
      id: 234,
      image: {
        src:
          'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/productimage/2018/4/26/11524725960030-1.jpg',
        secureSrc:
          'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/productimage/2018/4/26/11524725960030-1.jpg'
      },
      tryNBuyInfo: {
        enabled: true,
        opted: false
      },
      isEssential: true,
      serviceable: true,
      shippingEstimates: [
        {
          shippingMethod: 'NORMAL',
          promiseDate: new Date().setDate(new Date().getDate() + 3),
          orderBy: '1630681560000'
        },
        {
          shippingMethod: 'VALUE_SHIPPING',
          promiseDate: new Date().setDate(new Date().getDate() + 8),
          orderBy: '1630079700000'
        }
      ]
    },
    {
      id: 567,
      image: {
        src:
          'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/productimage/2018/4/26/11524725960030-1.jpg',
        secureSrc:
          'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/productimage/2018/4/26/11524725960030-1.jpg'
      },
      tryNBuyInfo: {
        enabled: true,
        opted: false
      },
      isEssential: false,
      serviceable: false,
      shippingEstimates: [
        {
          shippingMethod: 'NORMAL',
          promiseDate: new Date().setDate(new Date().getDate() + 0),
          orderBy: '1630681560000'
        },
        {
          shippingMethod: 'SDD',
          promiseDate: new Date().setDate(new Date().getDate() + 0),
          orderBy: '1630079700000'
        },
        {
          shippingMethod: 'VALUE_SHIPPING',
          promiseDate: new Date().setDate(new Date().getDate() + 0),
          orderBy: '1630079700000'
        }
      ]
    }
  ];

  const productDeliveryInfoForSDD = [
    {
      id: 234,
      image: {
        src:
          'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/productimage/2018/4/26/11524725960030-1.jpg',
        secureSrc:
          'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/productimage/2018/4/26/11524725960030-1.jpg'
      },
      tryNBuyInfo: {
        enabled: true,
        opted: false
      },
      isEssential: true,
      serviceable: true,
      shippingEstimates: [
        {
          shippingMethod: 'NORMAL',
          promiseDate: new Date().setDate(new Date().getDate() + 3),
          orderBy: '1630681560000'
        },
        {
          shippingMethod: 'SDD',
          promiseDate: new Date().setDate(new Date().getDate() + 1),
          orderBy: '1630079700000'
        },
        {
          shippingMethod: 'VALUE_SHIPPING',
          promiseDate: new Date().setDate(new Date().getDate() + 8),
          orderBy: '1630079700000'
        }
      ]
    },
    {
      id: 567,
      image: {
        src:
          'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/productimage/2018/4/26/11524725960030-1.jpg',
        secureSrc:
          'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/productimage/2018/4/26/11524725960030-1.jpg'
      },
      tryNBuyInfo: {
        enabled: true,
        opted: false
      },
      isEssential: false,
      serviceable: false,
      shippingEstimates: [
        {
          shippingMethod: 'NORMAL',
          promiseDate: new Date().setDate(new Date().getDate() + 0),
          orderBy: '1630681560000'
        },
        {
          shippingMethod: 'SDD',
          promiseDate: new Date().setDate(new Date().getDate() + 0),
          orderBy: '1630079700000'
        },
        {
          shippingMethod: 'VALUE_SHIPPING',
          promiseDate: new Date().setDate(new Date().getDate() + 0),
          orderBy: '1630079700000'
        }
      ]
    }
  ];

  const productDeliveryInfoForValueShipping = [
    {
      id: 234,
      image: {
        src:
          'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/productimage/2018/4/26/11524725960030-1.jpg',
        secureSrc:
          'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/productimage/2018/4/26/11524725960030-1.jpg'
      },
      tryNBuyInfo: {
        enabled: true,
        opted: false
      },
      isEssential: true,
      serviceable: true,
      shippingEstimates: [
        {
          shippingMethod: 'VALUE_SHIPPING',
          promiseDate: new Date().setDate(new Date().getDate() + 8),
          orderBy: '1630079700000'
        }
      ]
    },
    {
      id: 567,
      image: {
        src:
          'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/productimage/2018/4/26/11524725960030-1.jpg',
        secureSrc:
          'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/productimage/2018/4/26/11524725960030-1.jpg'
      },
      tryNBuyInfo: {
        enabled: true,
        opted: false
      },
      isEssential: false,
      serviceable: false,
      shippingEstimates: [
        {
          shippingMethod: 'NORMAL',
          promiseDate: new Date().setDate(new Date().getDate() + 0),
          orderBy: '1630681560000'
        },
        {
          shippingMethod: 'SDD',
          promiseDate: new Date().setDate(new Date().getDate() + 0),
          orderBy: '1630079700000'
        },
        {
          shippingMethod: 'VALUE_SHIPPING',
          promiseDate: new Date().setDate(new Date().getDate() + 0),
          orderBy: '1630079700000'
        }
      ]
    }
  ];

  const productDeliveryInfoForExpress = [
    {
      id: 234,
      image: {
        src:
          'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/productimage/2018/4/26/11524725960030-1.jpg',
        secureSrc:
          'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/productimage/2018/4/26/11524725960030-1.jpg'
      },
      tryNBuyInfo: {
        enabled: true,
        opted: false
      },
      isEssential: true,
      serviceable: true,
      shippingEstimates: [
        {
          shippingMethod: 'NORMAL',
          promiseDate: new Date().setDate(new Date().getDate() + 3),
          orderBy: '1630681560000'
        },
        {
          shippingMethod: 'EXPRESS',
          promiseDate: new Date().setDate(new Date().getDate() + 1),
          orderBy: '1630681560000'
        },
        {
          shippingMethod: 'VALUE_SHIPPING',
          promiseDate: new Date().setDate(new Date().getDate() + 8),
          orderBy: '1630079700000'
        }
      ]
    }
  ];
  const productDeliveryInfoForNoShipping = [
    {
      id: 234,
      image: {
        src:
          'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/productimage/2018/4/26/11524725960030-1.jpg',
        secureSrc:
          'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/productimage/2018/4/26/11524725960030-1.jpg'
      },
      tryNBuyInfo: {
        enabled: true,
        opted: false
      },
      isEssential: true,
      serviceable: true,
      shippingEstimates: []
    }
  ];
  const addressInfo = { pincode: '560068' };

  window.triggerEvent = () => {};

  beforeEach(() => {
    window._checkout_ = {
      __myx_ab__: {},
      __myx_deviceData__: {}
    };
  });

  it('should show title', () => {
    const wrapper = mount(
      <Serviceability
        shippingData={{ method: 'NORMAL' }}
        productDeliveryInfo={productDeliveryInfo}
        addressInfo={addressInfo}
      />
    );
    expect(wrapper.find('.title').text()).to.contain('DELIVERY ESTIMATES');
  });

  it('should show estimated date for standard delivery', () => {
    const date = getEstimatedDate(3);
    const wrapper = mount(
      <Serviceability
        shippingData={{ method: 'NORMAL' }}
        productDeliveryInfo={productDeliveryInfo}
        addressInfo={addressInfo}
      />
    );
    expect(wrapper.text()).to.contain(date);
  });

  it('should show estimated date for sdd', () => {
    const date = getEstimatedDate(1);
    const wrapper = mount(
      <Serviceability
        shippingData={{ method: 'SDD' }}
        productDeliveryInfo={productDeliveryInfoForSDD}
        addressInfo={addressInfo}
      />
    );
    expect(wrapper.text()).to.contain(date);
  });

  it('should show not show estimated date for no shippingmethod', () => {
    const wrapper = mount(
      <Serviceability
        shippingData={{ method: 'SDD' }}
        productDeliveryInfo={productDeliveryInfoForNoShipping}
        addressInfo={addressInfo}
      />
    );
    expect(wrapper.text()).to.contain('DELIVERY ESTIMATES');
  });

  it('should show estimated date for expressShipping when fg in ON', () => {
    window._checkout_ = {
      __myx_features__: {
        'cart.speed11': true,
        'cart.item.orderby': true
      }
    };
    const date = getTimeBasedDate(new Date().setDate(new Date().getDate() + 1));
    const wrapper = mount(
      <Serviceability
        shippingData={{ method: 'EXPRESS' }}
        productDeliveryInfo={productDeliveryInfoForExpress}
        addressInfo={addressInfo}
      />
    );
    expect(wrapper.text()).to.contain(date);
  });

  it('should show estimated date for valueShipping', () => {
    const date = getEstimatedDate(8);
    const wrapper = mount(
      <Serviceability
        shippingData={{ method: 'VALUE_SHIPPING' }}
        productDeliveryInfo={productDeliveryInfoForValueShipping}
        addressInfo={addressInfo}
      />
    );
    expect(wrapper.text()).to.contain(date);
  });

  it('should show Try & Buy eligiblity info', () => {
    window._checkout_ = { __myx_features__: { 'paid.trynbuy.enabled': true } };
    const wrapper = mount(
      <Serviceability
        shippingData={{ method: 'VALUE_SHIPPING' }}
        productDeliveryInfo={productDeliveryInfo}
        tryNBuyRemark="NO_ISSUE"
        tryNBuyServiceable={true}
        addressInfo={addressInfo}
        tryNBuyApplicable={true}
      />
    );
    expect(
      wrapper
        .find('.tryNBuyInfo')
        .at(0)
        .text()
    ).to.contain('Eligible for Try & Buy');
  });

  it('should show express delivery label when AB is is set to test variant', () => {
    window._checkout_ = {
      __myx_ab__: { expressdelivery: 'express.delivery' },
      __myx_deviceData__: { isApp: true }
    };
    const wrapper = mount(
      <Serviceability
        shippingData={{ method: 'NORMAL' }}
        productDeliveryInfo={productDeliveryInfo}
        tryNBuyRemark="NO_ISSUE"
        tryNBuyServiceable={true}
        expressDeliveryAvailable={true}
        expressDeliveryThreshold={10}
        addressInfo={addressInfo}
      />
    );
    expect(wrapper.exists('.expressDeliveryLabel')).to.equal(true);
  });

  it('should NOT show express delivery label when AB is disabled', () => {
    window._checkout_ = {
      __myx_ab__: { expressdelivery: 'disabled' },
      __myx_deviceData__: { isApp: true }
    };
    const wrapper = mount(
      <Serviceability
        shippingData={{ method: 'NORMAL' }}
        productDeliveryInfo={productDeliveryInfo}
        tryNBuyRemark="NO_ISSUE"
        tryNBuyServiceable={true}
        expressDeliveryAvailable={true}
        expressDeliveryThreshold={10}
        addressInfo={addressInfo}
      />
    );
    expect(wrapper.exists('.expressDeliveryLabel')).to.equal(false);
  });

  it('should NOT show express delivery label for non-app users', () => {
    window._checkout_ = {
      __myx_ab__: { expressdelivery: 'express.delivery' },
      __myx_deviceData__: { isApp: false }
    };
    const wrapper = mount(
      <Serviceability
        shippingData={{ method: 'NORMAL' }}
        productDeliveryInfo={productDeliveryInfo}
        tryNBuyRemark="NO_ISSUE"
        tryNBuyServiceable={true}
        expressDeliveryAvailable={true}
        expressDeliveryThreshold={10}
        addressInfo={addressInfo}
      />
    );
    expect(wrapper.exists('.expressDeliveryLabel')).to.equal(false);
  });

  it('should NOT show express delivery label when it is not available irrespective of AB', () => {
    window._checkout_ = {
      __myx_ab__: { expressdelivery: 'express.delivery' },
      __myx_deviceData__: { isApp: true }
    };
    const wrapper = mount(
      <Serviceability
        shippingData={{ method: 'NORMAL' }}
        productDeliveryInfo={productDeliveryInfo}
        tryNBuyRemark="NO_ISSUE"
        tryNBuyServiceable={true}
        expressDeliveryAvailable={false}
        expressDeliveryThreshold={10}
        addressInfo={addressInfo}
      />
    );
    expect(wrapper.exists('.expressDeliveryLabel')).to.equal(false);
  });

  it('should show essential tag', () => {
    window._checkout_ = {
      __myx_features__: { 'checkout.essentialTag.enabled': true }
    };
    const wrapper = mount(
      <Serviceability
        shippingData={{ method: 'NORMAL' }}
        productDeliveryInfo={productDeliveryInfo}
        tryNBuyRemark="NO_ISSUE"
        tryNBuyServiceable={true}
        expressDeliveryAvailable={false}
        expressDeliveryThreshold={10}
        addressInfo={addressInfo}
      />
    );
    expect(
      wrapper
        .find('.essentialTag')
        .at(0)
        .text()
    ).to.equal('Essential');
  });

  it('should show not serviceable msg', () => {
    const wrapper = mount(
      <Serviceability
        shippingData={{ method: 'NORMAL' }}
        productDeliveryInfo={productDeliveryInfo}
        tryNBuyRemark="NO_ISSUE"
        tryNBuyServiceable={true}
        expressDeliveryAvailable={false}
        expressDeliveryThreshold={10}
        addressInfo={addressInfo}
      />
    );
    expect(
      wrapper
        .find('.notServiceableMsg')
        .at(0)
        .text()
    ).to.equal(
      'This item can not be delivered to this pincode. Please remove this item from your bag to continue.'
    );
  });

  it('should show estimated days if days to delivery ab is enabled', () => {
    window._checkout_.__myx_ab__['address.deliveryday'] = 'enabled';
    window._checkout_.__myx_deviceData__['isApp'] = true;

    const todayDate = new Date();
    const date = getEstimatedDate(3);
    const wrapper = mount(
      <Serviceability
        shippingData={{ method: 'NORMAL' }}
        productDeliveryInfo={productDeliveryInfo}
        addressInfo={addressInfo}
      />
    );
    expect(wrapper.text()).to.contain(date);
    expect(wrapper.find('.estimatedDate').text()).to.equal(
      `${date} - in 3 Days`
    );
  });
});
