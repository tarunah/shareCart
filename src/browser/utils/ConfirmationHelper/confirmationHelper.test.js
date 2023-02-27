import { getMynacoConfirmationScreenLoadData } from '.';
import { bountyOrder } from 'testUtils/confirmationMockData';
import sinon from 'sinon';

describe('Confirmation Util', () => {
  beforeEach(() => {
    window.SHELL = {
      redirectTo: sinon.spy()
    };
  });

  it('getMynacoConfirmationScreenLoadData returns proper data', () => {
    const data = getMynacoConfirmationScreenLoadData({ bountyOrder });

    expect(data).toMatchObject({
      id: '1100810-9262300-2118301',
      revenue: 22.63,
      tax: 0,
      shipping: 0,
      storeOrderId: '110081092623002118301',
      'storefront-id': '',
      products: [
        {
          Quantity: 2,
          'Article-Type': '',
          Category: '',
          SKU: 1184006,
          Price: 22.384
        }
      ]
    });
  });
});
