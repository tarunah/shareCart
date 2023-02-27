import { getSellerInfo } from './wishlistUtils';
import { wishlistItemsV2 } from 'testUtils/cartMockData';

describe('WishlistHOC', () => {
  it('should test getSellerInfo', () => {
    const expectedValue = {
      sellerPartnerId: 2242,
      name: 'KESHVI FASHION',
      availableCount: 966,
      discountedPrice: 727,
      discountDisplayLabel: '(48% OFF)'
    };
    const data = wishlistItemsV2.products[7];
    const { sellerInfo } = getSellerInfo(data);
    expect(sellerInfo.sellerPartnerId).toEqual(expectedValue.sellerPartnerId);
    expect(sellerInfo.availableCount).toEqual(expectedValue.availableCount);
    expect(sellerInfo.discountDisplayLabel).toEqual(
      expectedValue.discountDisplayLabel
    );
    expect(sellerInfo.discountedPrice).toEqual(expectedValue.discountedPrice);
  });
});
