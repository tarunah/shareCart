import { getConfirmationData } from './webengage';
import productData, { bountyOrder } from 'testUtils/confirmationMockData';

describe('webengage', () => {
  it('should return data properly', () => {
    const data = getConfirmationData({ bountyOrder, productData });

    expect(data).toMatchObject({
      'Order ID': '110081092623002118301',
      Quantity: 2,
      Price: 27.98,
      Discount: 0,
      'Coupon Discount': 5.596,
      'Final Price': 22.63,
      'Payment Mode': 'Online',
      'Shipping Method': 'NORMAL',
      'Loyalty Points Used': false,
      'Product IDs': [1531, 355130],
      Brands: ['Puma', 'Nike'],
      'Article Types': ['Tshirts', 'Duffel Bag'],
      Categories: ['Apparel', 'Accessories'],
      'Sub categories': ['Topwear', 'Bags'],
      'Products:': [
        {
          'Product ID': 355130,
          Product: 'Nike Navy Blue Brasilia 6 Large    Training  Duffle Bag',
          Brand: 'Nike',
          Quantity: 2,
          'Article Type': 'Duffel Bag',
          Category: 'Accessories',
          'Sub Category': 'Bags',
          'Discounted Price': 22.384,
          'SKU ID': 1184006,
          Price: 1399,
          Discount: 0,
          'Coupon Discount': 5.596,
          'Try & Buy': false
        }
      ]
    });
  });
});
