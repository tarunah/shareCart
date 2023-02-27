import { getChangedDeliveryPromise, getChangedShippingEstimate } from './';
import sinon from 'sinon';

import GrowthHackConfigManager from 'commonUtils/GrowthHackConfigManager';

import { cartMockData } from 'testUtils/cartMockData';

describe('Helper', () => {
  let productDeliveryInfo = [];

  beforeEach(() => {
    window.SHELL = {
      redirectTo: sinon.spy()
    };
    window._checkout_ = {
      __myx_ab__: {},
      __myx_deviceData__: {}
    };

    productDeliveryInfo = [...cartMockData.serviceability.productDeliveryInfo];
  });

  it('should show decresed shipping estimate for negative value as per config for when ab is enabled', () => {
    window._checkout_.__myx_ab__['tat.change'] = 'enabled';
    window._checkout_.__myx_deviceData__['isApp'] = true;

    const getGrowthHackConfigValueStub = sinon
      .stub(GrowthHackConfigManager, 'getGrowthHackConfigValue')
      .returns({
        defaultTatChange: -2,
        promisedTatChange: { 2: -1, 3: -1, 5: -1 },
        skipPincodeCheck: true
      });

    const result = getChangedShippingEstimate(5, 'NORMAL', '560068');

    expect(result).toEqual(4);
    getGrowthHackConfigValueStub.restore();
  });

  it('should show control bucket value shipping estimate for for sla exclusion when ab is enabled', () => {
    window._checkout_.__myx_ab__['tat.change'] = 'enabled';
    window._checkout_.__myx_deviceData__['isApp'] = true;

    const getGrowthHackConfigValueStub = sinon
      .stub(GrowthHackConfigManager, 'getGrowthHackConfigValue')
      .returns({
        defaultTatChange: -2,
        promisedTatChange: { 2: 0, 3: -1, 5: -1 },
        skipPincodeCheck: true
      });

    const result = getChangedShippingEstimate(2, 'NORMAL', '560068');

    expect(result).toEqual(2);
    getGrowthHackConfigValueStub.restore();
  });

  it('should take use default shipping estimate if shipping estimate is not present in promisedShippingEstimateChange', () => {
    window._checkout_.__myx_ab__['tat.change'] = 'enabled';
    window._checkout_.__myx_deviceData__['isApp'] = true;

    const getGrowthHackConfigValueStub = sinon
      .stub(GrowthHackConfigManager, 'getGrowthHackConfigValue')
      .returns({
        defaultTatChange: -2,
        promisedTatChange: { 2: 0, 3: -1 },
        skipPincodeCheck: true
      });

    const result = getChangedShippingEstimate(5, 'NORMAL', '560068');

    expect(result).toEqual(3);
    getGrowthHackConfigValueStub.restore();
  });

  it('should show increased shipping estimate for positive value as per config for when ab is enabled', () => {
    window._checkout_.__myx_ab__['tat.change'] = 'enabled';
    window._checkout_.__myx_deviceData__['isApp'] = true;

    const getGrowthHackConfigValueStub = sinon
      .stub(GrowthHackConfigManager, 'getGrowthHackConfigValue')
      .returns({
        defaultTatChange: -2,
        promisedTatChange: { 2: 1, 3: -1, 5: -1 },
        skipPincodeCheck: true
      });

    const result = getChangedShippingEstimate(2, 'NORMAL', '560068');

    expect(result).toEqual(3);
    getGrowthHackConfigValueStub.restore();
  });

  it('should show increased shipping estimate for only whitelisted pincdoes  ', () => {
    window._checkout_.__myx_ab__['tat.change'] = 'enabled';
    window._checkout_.__myx_deviceData__['isApp'] = true;

    const getGrowthHackConfigValueStub = sinon
      .stub(GrowthHackConfigManager, 'getGrowthHackConfigValue')
      .returns({
        defaultTatChange: -2,
        promisedTatChange: { 2: 1, 3: -1, 5: -1 },
        skipPincodeCheck: false,
        pincodes: { '560068': true, '560069': true }
      });

    const result = getChangedShippingEstimate(2, 'NORMAL', '560068');

    expect(result).toEqual(3);
    getGrowthHackConfigValueStub.restore();
  });

  it('should show control bucket shipping estimate when ab is disaabled', () => {
    window._checkout_.__myx_ab__['tat.change'] = 'disabled';
    window._checkout_.__myx_deviceData__['isApp'] = true;
    const getGrowthHackConfigValueStub = sinon
      .stub(GrowthHackConfigManager, 'getGrowthHackConfigValue')
      .returns({
        defaultTatChange: -2,
        promisedTatChange: { 2: 1, 3: -1, 5: -1 },
        skipPincodeCheck: true
      });

    const result = getChangedShippingEstimate(3, 'NORMAL', '560068');

    expect(result).toEqual(3);
    getGrowthHackConfigValueStub.restore();
  });

  it('should show control bucket shipping estimate for non app uses', () => {
    window._checkout_.__myx_ab__['tat.change'] = 'enabled';
    window._checkout_.__myx_deviceData__['isApp'] = false;
    const getGrowthHackConfigValueStub = sinon
      .stub(GrowthHackConfigManager, 'getGrowthHackConfigValue')
      .returns({
        defaultTatChange: -2,
        promisedTatChange: { 2: 1, 3: -1, 5: -1 },
        skipPincodeCheck: true
      });

    const result = getChangedShippingEstimate(3, 'NORMAL', '560068');

    expect(result).toEqual(3);
    getGrowthHackConfigValueStub.restore();
  });

  it('get updated max min for standard delivery', () => {
    productDeliveryInfo[0].shippingEstimates = [
      {
        shippingMethod: 'NORMAL',
        promiseDate: new Date().setDate(new Date().getDate() + 5),
        orderBy: '1630681560000'
      }
    ];

    productDeliveryInfo[1].shippingEstimates = [
      {
        shippingMethod: 'NORMAL',
        promiseDate: new Date().setDate(new Date().getDate() + 7),
        orderBy: '1630681560000'
      }
    ];

    productDeliveryInfo[2].shippingEstimates = [
      {
        shippingMethod: 'NORMAL',
        promiseDate: new Date().setDate(new Date().getDate() + 9),
        orderBy: '1630681560000'
      }
    ];
    const result = getChangedDeliveryPromise({
      productDeliveryInfo,
      pincode: '560068',
      type: 'NORMAL'
    });
    expect(result).toEqual({ minDays: 5, maxDays: 9 });
  });

  it('get updated max min for value shipping', () => {
    productDeliveryInfo[0].shippingEstimates = [
      {
        shippingMethod: 'VALUE_SHIPPING',
        promiseDate: new Date().setDate(new Date().getDate() + 2),
        orderBy: '1630681560000'
      }
    ];

    productDeliveryInfo[1].shippingEstimates = [
      {
        shippingMethod: 'VALUE_SHIPPING',
        promiseDate: new Date().setDate(new Date().getDate() + 7),
        orderBy: '1630681560000'
      }
    ];

    productDeliveryInfo[2].shippingEstimates = [
      {
        shippingMethod: 'VALUE_SHIPPING',
        promiseDate: new Date().setDate(new Date().getDate() + 10),
        orderBy: '1630681560000'
      }
    ];
    const result = getChangedDeliveryPromise({
      productDeliveryInfo,
      pincode: '560068',
      type: 'VALUE_SHIPPING'
    });
    expect(result).toEqual({ minDays: 2, maxDays: 10 });
  });
});
