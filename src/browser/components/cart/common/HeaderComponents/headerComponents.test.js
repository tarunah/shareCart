import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import {
  PriceChange,
  OutOfStock,
  ProductsUnavailable,
  NewItemsInCart,
  VBHeader,
  TaxBanner,
  SavingsFeedback,
  SellerChangeNotification
} from './';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
import { currencyValue } from 'commonBrowserUtils/Helper';
import * as CartHelper from 'commonBrowserUtils/CartHelper';
let callback;

describe('Header components', () => {
  beforeEach(() => {
    callback = sinon.spy();
    window._checkout_ = {
      __myx_ab__: {},
      __myx_deviceData__: {}
    };
  });
  it('should display PriceChange Component when prices have dropped ', () => {
    const mockData = [
      {
        conflict: {
          state: 'CONFLICTED',
          price: {
            state: 'CONFLICTED',
            oldPrice: 1000
          },
          seller: {
            state: 'NOT_CONFLICTED',
            oldSeller: {}
          }
        },
        price: {
          mrp: 1499,
          total: 824,
          subTotal: 824
        },
        quantity: 1
      }
    ];
    const wrapper = shallow(
      <PriceChange products={mockData} handleCartAction={callback} />
    );
    const headerText = 'Prices Have Dropped';
    const descText =
      'The price of one or more items in your bag has dropped. Buy them now!';

    expect(wrapper.find('.priceDropIcon')).toHaveLength(1);
    expect(wrapper.find('.header').text()).toEqual(headerText);
    expect(wrapper.text()).toContain(descText);
  });

  it('should display PriceChange component when prices have dropped with seller change', () => {
    const mockData = [
      {
        conflict: {
          state: 'CONFLICTED',
          price: {
            state: 'CONFLICTED',
            oldPrice: 1000
          },
          seller: {
            state: 'CONFLICTED',
            oldSeller: {
              id: 19,
              name: 'RetailNet'
            }
          }
        },
        price: {
          mrp: 1499,
          total: 824,
          subTotal: 824
        },
        quantity: 1
      }
    ];
    const wrapper = shallow(
      <PriceChange products={mockData} handleCartAction={callback} />
    );
    const headerText = 'Prices Have Dropped';
    const descText =
      'The price and seller of one or more items in your bag has changed. Buy them now!';

    expect(wrapper.find('.priceDropIcon')).toHaveLength(1);
    expect(wrapper.find('.header').text()).toEqual(headerText);
    expect(wrapper.text()).toContain(descText);
  });

  it('should display PriceChange component when prices have increased with seller change', () => {
    const mockData = [
      {
        conflict: {
          state: 'CONFLICTED',
          price: {
            state: 'CONFLICTED',
            oldPrice: 500
          },
          seller: {
            state: 'CONFLICTED',
            oldSeller: {
              id: 19,
              name: 'RetailNet'
            }
          }
        },
        price: {
          mrp: 1499,
          total: 824,
          subTotal: 824
        },
        quantity: 1
      }
    ];
    const wrapper = shallow(
      <PriceChange products={mockData} handleCartAction={callback} />
    );
    const headerText = 'Seller has changed';
    const descText =
      'Seller of one or more items in your bag has changed. Please review them before proceeding.';

    expect(wrapper.find('.priceDropIcon')).toHaveLength(1);
    expect(wrapper.find('.header').text()).toEqual(headerText);
    expect(wrapper.text()).toContain(descText);
  });

  it('should display nothing when prices alone is increased ', () => {
    const mockData = [
      {
        conflict: {
          state: 'CONFLICTED',
          price: {
            state: 'CONFLICTED',
            oldPrice: 500
          },
          seller: {
            state: 'NOT_CONFLICTED',
            oldSeller: {}
          }
        },
        price: {
          mrp: 1499,
          total: 824,
          subTotal: 824
        },
        quantity: 1
      }
    ];
    const wrapper = shallow(
      <PriceChange products={mockData} handleCartAction={callback} />
    );
    expect(wrapper.find('PriceComponent').exists()).toBe(false);
  });

  it('should display OutOfStock strip', () => {
    window.triggerEvent = () => {};

    const wrapper = shallow(
      <OutOfStock
        handleCartAction={callback}
        oosItems={[]}
        analytics={() => sinon.spy()}
      />
    );

    expect(wrapper.find('.header').text()).toEqual('Items Out Of StockVIEW');
    CartHelper.toggleOosCartHc = sinon.spy();
    wrapper.find('.viewButton').simulate('click');
    expect(CartHelper.toggleOosCartHc.callCount).toBe(1);
  });

  it('should display ProductsUnavailable Component ', () => {
    const wrapper = shallow(
      <ProductsUnavailable handleCartAction={callback} unavailableItems={[]} />
    );

    const headerText = 'Item(s) unavailable';
    const descText = getKVPairValue('PRELAUNCH_MESSAGE');

    expect(wrapper.find('.header').text()).toEqual(headerText);
    expect(wrapper.text()).toContain(descText);

    wrapper.find('.button').simulate('click');
    expect(callback).toHaveProperty('callCount', 1);
  });

  it('should display NewItemsInCart Component ', () => {
    const wrapper = shallow(<NewItemsInCart />);

    const headerText = 'New Items In Your Cart';
    const descText =
      'We have included item(s) in your cart that you had selected previously.';

    expect(wrapper.find('.header').text()).toEqual(headerText);
    expect(wrapper.text()).toContain(descText);
  });

  it('should display VBHeader Component ', () => {
    const wrapper = shallow(<VBHeader />);

    const headerText = 'Items Repeated In Your Bag';
    const descText =
      'Same items in your bag are already present as a pack. Please remove either the pack or the item to proceed.';

    expect(wrapper.find('.header').text()).toEqual(headerText);
    expect(wrapper.text()).toContain(descText);
  });

  it('should display upfront pricing header', () => {
    const wrapper = shallow(<TaxBanner />);
    const descText = 'Prices are inclusive of all taxes';
    expect(wrapper.text()).toContain(descText);
  });

  it('should display seller change notification on mobile', () => {
    const mockData = [
      {
        conflict: {
          state: 'CONFLICTED',
          price: {
            state: 'CONFLICTED',
            oldPrice: 1000
          },
          seller: {
            state: 'CONFLICTED',
            oldSeller: {
              id: 19,
              name: 'RetailNet'
            }
          }
        },
        price: {
          mrp: 1499,
          total: 824,
          subTotal: 824
        },
        quantity: 1
      }
    ];
    const wrapper = shallow(<SellerChangeNotification products={mockData} />);
    expect(wrapper.find('.container').exists()).toBe(true);
    expect(wrapper.find('.sellerChange').exists()).toBe(true);
    expect(wrapper.find('.header').text()).toBe('Seller has changed');
    expect(
      wrapper
        .find('.container')
        .childAt(2)
        .text()
    ).toBe(
      'Seller of one or more items in your bag has changed. Please review them before proceeding.'
    );
  });

  it('should display SavingsFeedback component', () => {
    window.triggerEvent = sinon.spy();
    const savingsFeedbackConfig = getGrowthHackConfigValue('SAVINGS_FEEDBACK');
    const { savingsCTA } = savingsFeedbackConfig;
    const price = {
      totalSavings: 100.01
    };
    const wrapper = mount(
      <SavingsFeedback
        price={price}
        savingsFeedbackConfig={savingsFeedbackConfig}
      />
    );
    expect(wrapper.find('.savingsFeedbackIcon').exists()).toBe(true);
    expect(wrapper.find('.savingsStrip').exists()).toBe(true);
    const expectedCTA = savingsCTA
      .replace('<b>', '')
      .replace('</b>', '')
      .replace('${amount}', ` ₹${currencyValue(price.totalSavings)} `);
    expect(wrapper.find('.savingsStrip').text()).toBe(expectedCTA);
  });
});
