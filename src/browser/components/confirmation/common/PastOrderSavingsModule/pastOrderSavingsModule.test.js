import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import PastOrderSavingsModule from '.';
import GrowthHackConfigManager from 'commonUtils/GrowthHackConfigManager';
import ConfirmationManager from 'commonBrowserUtils/ConfirmationManager';

const currentOrderSavings = {
  dataState: {
    data: {
      bountyOrder: {
        payments: {
          discounts: {
            cart: 9000,
            coupon: 9000
          },
          amount: 99900
        }
      }
    }
  }
};

const pastOrdersData = {
  orders: [
    {
      items: [
        {
          return: null,
          status: {
            code: 'C'
          },
          payments: {
            instruments: {
              bankCashback: 10000
            },
            discounts: {
              cart: 0,
              coupon: 0,
              product: 12000,
              mynts: 0
            }
          }
        },
        {
          return: null,
          status: {
            code: 'IC'
          },
          payments: {
            instruments: {
              bankCashback: 10000
            },
            discounts: {
              cart: 0,
              coupon: 0,
              product: 12000,
              mynts: 0
            }
          }
        },
        {
          return: {},
          status: {
            code: 'C'
          },
          payments: {
            instruments: {
              bankCashback: 10000
            },
            discounts: {
              cart: 0,
              coupon: 0,
              product: 12000,
              mynts: 0
            }
          }
        },
        {
          return: null,
          status: {
            code: 'C'
          },
          payments: {
            instruments: null,
            discounts: {
              cart: 0,
              coupon: 0,
              product: 0,
              mynts: 0
            }
          }
        }
      ]
    },
    {
      items: [
        {
          return: null,
          status: {
            code: 'C'
          },
          payments: {
            instruments: {
              bankCashback: 10000
            },
            discounts: {
              cart: 0,
              coupon: 0,
              product: 12000,
              mynts: 0
            }
          }
        }
      ]
    }
  ]
};

describe('test for total savings banner module', () => {
  sinon.stub(GrowthHackConfigManager, 'getGrowthHackConfigValue').returns({
    totalSavingsThreshold: 50
  });
  it('should test total Saving Banner with success callback', () => {
    ConfirmationManager.getPastOrders = (data, scb, ecb) => {
      scb({ ...pastOrdersData });
    };
    window.triggerEvent = sinon.spy();
    const props = {
      ...currentOrderSavings,
      analytics: () => () => {}
    };
    const wrapper = mount(<PastOrderSavingsModule {...props} />);
    expect(wrapper.find('.totalSavingsContainer').length).toBe(1);
    expect(wrapper.find('.savingsMessage').text()).toEqual(
      'Total Savings in less than 1 month'
    );
    expect(wrapper.find('.savingsValuePlaceholder').text()).toEqual('440');
  });

  it('should test total Saving Banner with error callback', () => {
    ConfirmationManager.getPastOrders = (data, scb, ecb) => {
      ecb();
    };
    window.triggerEvent = sinon.spy();
    const props = {
      ...currentOrderSavings,
      analytics: () => () => {}
    };
    const wrapper = mount(<PastOrderSavingsModule {...props} />);
    expect(wrapper.find('.totalSavingsContainer').length).toBe(1);
    expect(wrapper.find('.savingsMessage').text()).toEqual(
      'Total Savings in this order'
    );
    expect(wrapper.find('.savingsValuePlaceholder').text()).toEqual('180');
  });
});
