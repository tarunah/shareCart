import {
  currencyValue,
  formatDate,
  chainFns,
  bool,
  shortNum,
  throttle,
  setValueInObject,
  getSelectedProducts,
  getSelectedProductsCount,
  slicePayloads,
  triggerMaWithLargePayload,
  getScrollSpeed,
  getUserFullName,
  getSingularOrPluralText
} from '.';
import sinon from 'sinon';

import { payloadMockdata } from 'testUtils/paymentMockData';

describe('Common Util', () => {
  beforeEach(() => {
    window.SHELL = {
      redirectTo: sinon.spy()
    };
  });

  it('currencyValue - should format the number', () => {
    const result = currencyValue(189789);
    expect(result).toEqual('1,89,789');
  });
  it('currencyValue - should format the number with no rounding off', () => {
    const result = currencyValue(189789.889999, false);
    expect(result).toEqual('1,89,789.89');
  });
  it('currencyValue - should format the number - float', () => {
    const result = currencyValue(189789.889999);
    expect(result).toEqual('1,89,790');
  });
  it('currencyValue - should format the number - round off', () => {
    const result = currencyValue(0.12345);
    expect(result).toEqual('0');
  });
  it('formatDate - should format the date', () => {
    const result = formatDate(1533889388173);
    expect(result).toEqual('10 Aug 2018');
  });
  it('formatDate - should format the date - hide year', () => {
    const result = formatDate(1533889388173, { hideYear: true });
    expect(result).toEqual('10 Aug');
  });
  it('formatDate - should format the date - fullMonthName', () => {
    const result = formatDate(1533889388173, { fullMonthName: true });
    expect(result).toEqual('10 August 2018');
  });
  it('formatDate - should format the date - dateSuperscript', () => {
    const result = formatDate(1533889388173, { dateSuperscript: true });
    expect(result).toEqual('10th Aug 2018');
  });
  it('chainFns - should chain functions', () => {
    const testFn1 = sinon.spy();
    const testFn2 = sinon.spy();
    const test = chainFns(testFn1, testFn2);
    test();
    expect(testFn1).toHaveProperty('callCount', 1);
    expect(testFn2).toHaveProperty('callCount', 1);
  });
  it('bool - should return boolean value - true', () => {
    const result = bool('true');
    expect(result).toEqual(true);
  });
  it('bool - should return boolean value - false', () => {
    const result = bool('0');
    expect(result).toEqual(false);
  });
  it('bool - should return boolean value - object', () => {
    const result = bool({});
    expect(result).toEqual({});
  });
  it('bool - should return boolean value - null', () => {
    const result = bool(null);
    expect(result).toEqual(false);
  });
  it('shortNum - converts numbers into short forms - 10', () => {
    const result = shortNum(10);
    expect(result).toEqual('10');
  });
  it('shortNum - converts numbers into short forms - 1100', () => {
    const result = shortNum(1100);
    expect(result).toEqual('1.1K');
  });
  it('shortNum - converts numbers into short forms - null', () => {
    const result = shortNum(null);
    expect(result).toEqual('');
  });
  it('shortNum - converts numbers into short forms - 110000', () => {
    const result = shortNum(110000);
    expect(result).toEqual('1.1L');
  });

  describe('throttle', () => {
    it('throttle should throttle function calls', () => {
      const spyFunc = sinon.spy();
      const throttleSpyFunc = new throttle(spyFunc, 1000);

      // Throttled at 1 second. Approximate test, assumes
      // that the loop below will finish executing under 1s
      for (let i = 0; i < 10; i++) {
        throttleSpyFunc();
      }
      expect(spyFunc.callCount).toBe(1);
    });

    it('should execute the last throttled function after the time interval', async () => {
      const spyFunc = sinon.spy();
      const throttleSpyFunc = throttle(spyFunc, 1000);

      // Throttled at 1 second. Approximate test, assumes
      // that the loop below will finish executing under 1s
      for (let i = 0; i < 10; i++) {
        throttleSpyFunc(i);
      }
      expect(spyFunc.callCount).toBe(1);
      await new Promise((res, rej) => setTimeout(res, 1000));
      expect(spyFunc.callCount).toBe(2);
      expect(spyFunc.secondCall.lastArg).toBe(9);
    });
  });

  it('setValueInObject - should set value in object', () => {
    let obj = { a: { b: 1 }, b: { c: 2 } };
    setValueInObject(obj, 'a.b', 4);
    expect(obj.a.b).toBe(4);

    setValueInObject(obj, 'b.c', 4);
    expect(obj.b.c).toBe(4);

    setValueInObject(obj, 'b.c.d', 4);
    expect(obj.b.c.d).toBe(4);

    setValueInObject(obj, 'd', { a: 5 });
    expect(obj.d.a).toBe(5);

    obj = null;
    setValueInObject(obj, 'b.c.d', 4);
    expect(obj).toBe(null);
  });

  it('getUserFullName should return of user full name with capitalize first latter', () => {
    window._checkout_ = {
      __myx_profile__: {
        name: { firstName: 'myntra', lastName: 'test' }
      }
    };
    const result = getUserFullName();
    expect(result).toEqual('Myntra Test');
  });

  it('getSingularOrPluralText should return of Singular and Plural text based on number', () => {
    const result = getSingularOrPluralText(15, 'Day', 'Days', true);
    expect(result).toEqual('15 Days');
  });

  it('getSelectedProducts - should return only products with selectedForCheckout is true', () => {
    const data = [
      { selectedForCheckout: true },
      { selectedForCheckout: false }
    ];
    const result = getSelectedProducts(data);
    expect(result.length).toEqual(1);
  });

  it('getSelectedProducts - should return empty array if data is null', () => {
    const data = null;
    const result = getSelectedProducts(data);
    expect(result.length).toEqual(0);
  });

  it('getSelectedProductsCount - should return count of selected Products that are not free gift', () => {
    const data1 = [
      { selectedForCheckout: true },
      { selectedForCheckout: false }
    ];
    const data2 = [
      { selectedForCheckout: true },
      { selectedForCheckout: true }
    ];
    const data3 = [
      { selectedForCheckout: true },
      { selectedForCheckout: true, flags: { freeItem: true } }
    ];
    expect(getSelectedProductsCount(data1)).toEqual(1);
    expect(getSelectedProductsCount(data2)).toEqual(2);
    expect(getSelectedProductsCount(data3)).toEqual(1);
  });

  describe('Chunk payload', () => {
    it('should create an array of payload with correct sizes', () => {
      const result = slicePayloads(JSON.stringify(payloadMockdata));

      expect(result[0].custom.custom.v1.length).toEqual(400);
      expect(result[0].custom.custom.v2.length).toEqual(100);
      expect(result[0].custom.custom.v3.length).toEqual(25);
      expect(result[0].custom.custom.v4.length).toEqual(25);
    });

    it('should contain all the payload in proper chunks', () => {
      const stringifiedPayload = JSON.stringify(payloadMockdata);
      const result = slicePayloads(stringifiedPayload);
      const totalSize =
        result[0].custom.custom.v1.length +
        result[0].custom.custom.v2.length +
        result[0].custom.custom.v3.length +
        result[0].custom.custom.v4.length +
        result[1].custom.custom.v1.length +
        result[1].custom.custom.v2.length +
        result[1].custom.custom.v3.length +
        result[1].custom.custom.v4.length +
        result[2].custom.custom.v1.length;

      expect(totalSize).toEqual(stringifiedPayload.length);
    });

    it('triggerMaWithLargePayload should not call triggerEvent when its not there in payload', () => {
      window._checkout_ = {
        __myx_kvpairs__: {
          'checkout.maPayloadEvent': ['']
        }
      };
      const spy = sinon.spy();
      window.triggerEvent = spy;
      triggerMaWithLargePayload('TestingEvent', payloadMockdata);

      expect(spy.called).toEqual(false);
    });

    it('triggerMaWithLargePayload should call triggerEvent with result payload when the event in there in kv pair', () => {
      window._checkout_ = {
        __myx_kvpairs__: {
          'checkout.maPayloadEvent': ['TestingEvent']
        }
      };
      const spy = sinon.spy();
      window.triggerEvent = spy;
      triggerMaWithLargePayload('TestingEvent', payloadMockdata);

      expect(spy.calledThrice).toEqual(true);
      expect(spy.getCall(0).args[0]).toEqual('TestingEvent');
      expect(spy.getCall(0).args[1]).toEqual({
        custom: {
          custom: {
            v1:
              '{"addressSel":909451916,"cardNumber":"5555555555554444","billName":"asdfaf","cardMonth":"02","cardYear":"25","otherCards":false,"saveCard":"on","useSavedCard":false,"user":"automation-94048ece.8722.4ffc.b892.44cd564d53b99yxCLjNAzg","paymenInstrument":"creditcard","bankCashbackEligible":"false","bankCashbackAmount":0,"csrf":"FrTpVrtLzYeXQ22CfW7lnQ==:QfnnH1Doq1o9uMJUq+sF42kLdjCIpp8FEPMiAwd0WR3vjbDat',
            v2:
              'BwDMg/WeKN+WBFMt97QcOmKEZT3BI2Z1Oj5J/8H1cFFyjFsjOnk3mCEKL8KHnpKQgg1kfh4ZmluYzwJJyxfjcPHtNAbbywjJwdKB',
            v3: 'XxfC1KYiK6j39H2Rnc9540/G3',
            v4: '1FBjKMwr5C5aSOp+X8","cart'
          }
        }
      });
      expect(spy.getCall(1).args[0]).toEqual('TestingEvent');
      expect(spy.getCall(1).args[1]).toEqual({
        custom: {
          custom: {
            v1:
              'Context":"default","cartId":"bbbbf52a-0c31-405a-be54-6117db682b01","clientContext":"responsive","paymentMethods":"creditcard","profile":"dev.myntra.com:8500","addressId":909451916,"bAddress":"123, Manali Saravana Nagar","bCity":"Bengaluru","bCountry":"India","bFirstname":"Saravanan asasdf","bState":"Karnataka","bZipcode":"560068","email":"agg2@myntra.com","mobile":"8148871471","xMetaApp":"deviceID',
            v2:
              '=e12a42b0-3d33-4464-a1b2-996e8ecfa954","channel":"desktop","autoGiftCardUsed":"","autoGiftCardAmount',
            v3: '":"0","giftcardType":"","',
            v4: 'useloyaltypoints":"N","te'
          }
        }
      });
      expect(spy.getCall(2).args[0]).toEqual('TestingEvent');
      expect(spy.getCall(2).args[1]).toEqual({
        custom: {
          custom: {
            v1: 'mplateCode":105}',
            v2: '',
            v3: '',
            v4: ''
          }
        }
      });
    });

    it('should handle undefined properly', () => {
      window._checkout_ = {
        __myx_kvpairs__: {
          'checkout.maPayloadEvent': ['TestingEvent']
        }
      };
      const spy = sinon.spy();
      window.triggerEvent = spy;
      triggerMaWithLargePayload('TestingEvent', null);

      expect(spy.calledOnce).toEqual(false);
    });

    it('should handle undefined properly', () => {
      window._checkout_ = {
        __myx_kvpairs__: {
          'checkout.maPayloadEvent': ['TestingEvent']
        }
      };
      const spy = sinon.spy();
      window.triggerEvent = spy;
      triggerMaWithLargePayload('TestingEvent', undefined);

      expect(spy.calledOnce).toEqual(false);
    });
  });

  describe('getScrollSpeed', () => {
    it('should get the speed correctly', () => {
      //When scroll starts and first getScrollSpeed will result in zero
      window.scrollY = 10;
      expect(getScrollSpeed()).toBe(0);

      window.scrollY = 15;
      expect(getScrollSpeed()).toBe(5);

      window.scrollY = 26;
      expect(getScrollSpeed()).toBe(11);

      window.scrollY = 50;
      expect(getScrollSpeed()).toBe(24);

      //negative speed is scrolling up
      window.scrollY = 15;
      expect(getScrollSpeed()).toBe(-35);

      window.scrollY = 15;
      expect(getScrollSpeed()).toBe(0);
    });
  });
});
