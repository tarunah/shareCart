import trackSizeFit, { getProducts, getSizeAndFitVendor } from './sizeAndFit';
import { bountyOrder } from 'testUtils/confirmationMockData';

describe('size and fit', () => {
  it('should return data properly', () => {
    const data = getProducts({ bountyOrder });

    expect(data).toMatchObject([
      { sku: '355130_1184006', price: 22.384, quantity: 2 }
    ]);
  });

  it('gets correct sizeAndFit vendor', () => {
    window._checkout_ = {
      __myx_abd__: {
        sizefit: 'truefit'
      }
    };
    let vendor = getSizeAndFitVendor();
    expect(vendor).toEqual('truefit');

    window._checkout_.__myx_abd__.sizefit = 'pixibo';
    vendor = getSizeAndFitVendor();
    expect(vendor).toEqual('pixibo');

    window._checkout_.__myx_abd__.sizefit = 'fitanalytics';
    vendor = getSizeAndFitVendor();
    expect(vendor).toEqual('fitanalytics');

    window._checkout_.__myx_abd__.sizefit = '';
    vendor = getSizeAndFitVendor();
    expect(vendor).toEqual('mfa');
  });

  it('runs sizeAndFit tracker', () => {
    window._checkout_ = {
      __myx_abd__: {
        sizefit: 'truefit'
      },
      __myx_profile__: {
        uidx: '43b7411d.82f8.4ccd.80a3.cc6507149024zcedQkpOyG',
        userHashId: '5a736de82fe09f7b819914002cf3dc5d'
      }
    };

    trackSizeFit({ bountyOrder });

    expect(window.Myntra).toMatchObject({
      Data: {
        socialAction: 'purchase',
        pageName: 'confirmation',
        userHashId: '5a736de82fe09f7b819914002cf3dc5d'
      }
    });
    expect(window.sizeAndFit).toMatchObject({
      vendor: 'truefit',
      userId: '43b7411d.82f8.4ccd.80a3.cc6507149024zcedQkpOyG',
      orderId: '110081092623002118301'
    });
  });
});
