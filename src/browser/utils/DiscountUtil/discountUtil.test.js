import DiscountUtil from '.';
import { PriceWithPD, PriceWithPDInPercent } from 'testUtils/cartMockData';

describe('DiscountUtil', () => {
  it('getPrice works as expected', () => {
    let price = DiscountUtil.getPrice(PriceWithPD);
    expect(price.discounts.data).toEqual([
      {
        name: 'discount',
        value: 70,
        meta: null
      },
      {
        name: 'coupon',
        value: 50,
        meta: null
      },
      {
        name: 'bag',
        value: 0,
        meta: null
      },
      {
        name: 'personalised',
        value: 20,
        meta: null
      }
    ]);

    price = DiscountUtil.getPrice(PriceWithPDInPercent);
    expect(price.discounts.data).toEqual([
      {
        name: 'discount',
        value: 70,
        meta: { unit: 'PERCENT', value: 20 }
      },
      {
        name: 'coupon',
        value: 50,
        meta: null
      },
      {
        name: 'bag',
        value: 0,
        meta: null
      },
      {
        name: 'personalised',
        value: 20,
        meta: { unit: 'PERCENT', value: 5 }
      }
    ]);
  });
});
