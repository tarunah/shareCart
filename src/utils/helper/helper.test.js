import {
  getQueryParam,
  extractQueryParams,
  isGiftcardContext,
  cacheDecorator
} from './';
import sinon from 'sinon';

describe('Common Helpers', () => {
  it('extractQueryParams should return empty object when no params', () => {
    window.history.pushState({}, 'mock get params', '/payment');
    const expectedParams = {};
    const extractedParams = extractQueryParams();
    expect(extractedParams).toMatchObject(expectedParams);
  });

  it('extractQueryParams should extract query params correctly from window', () => {
    window.history.pushState(
      {},
      'mock get params',
      '/payment?cartContext=egiftcard&value=234&name=mockdata'
    );
    const expectedParams = {
      cartContext: 'egiftcard',
      value: '234',
      name: 'mockdata'
    };
    const extractedParams = extractQueryParams();
    expect(extractedParams).toMatchObject(expectedParams);
  });

  it('isGiftcardContext should be true if giftcard context', () => {
    window.history.pushState(
      {},
      'mock get params',
      '/payment?cartContext=egiftcard'
    );
    expect(isGiftcardContext()).toBe(true);
  });

  it('isGiftcardContext should be false if default context', () => {
    window.history.pushState(
      {},
      'mock get params',
      '/payment?cartContext=default'
    );
    expect(isGiftcardContext()).toBe(false);
  });

  it('getQueryParam should return value for passed query param', () => {
    window.history.pushState(
      {},
      'mock get params',
      '/payment?cartContext=egiftcard'
    );
    const expectedParam = 'egiftcard';
    const extractedParam = getQueryParam({ name: 'cartContext' });
    expect(extractedParam).toEqual(expectedParam);
  });

  it('getQueryParam should return empty string if passed query param not found', () => {
    window.history.pushState(
      {},
      'mock get params',
      '/payment?cartContext=egiftcard'
    );
    const expectedParam = '';
    const extractedParam = getQueryParam({ name: 'caRtContext' });
    expect(extractedParam).toEqual(expectedParam);
  });

  it('getQueryParam should return value for query param in optional names if passed name not present', () => {
    window.history.pushState(
      {},
      'mock get params',
      '/payment?cartContext=egiftcard'
    );
    const expectedParam = 'egiftcard';
    const extractedParam = getQueryParam({
      name: 'caRtContext',
      optionalNames: ['CartContext', 'cartContext']
    });
    expect(extractedParam).toEqual(expectedParam);
  });

  describe('cacheDecorator', () => {
    it('should cache the output of a function with args as its key', () => {
      const spyFunc = sinon.spy((arg1, arg2) => ({ ...arg1, ...arg2 }));
      const decoratedFunc = cacheDecorator(spyFunc);

      const argObject1 = { a: 1, b: 2 };
      const argObject2 = { c: 3, d: 4 };

      expect(decoratedFunc(argObject1, argObject2)).toEqual({
        a: 1,
        b: 2,
        c: 3,
        d: 4
      }); //cache miss
      expect(spyFunc.calledOnce).toBe(true);

      expect(decoratedFunc(argObject1, argObject2)).toEqual({
        a: 1,
        b: 2,
        c: 3,
        d: 4
      }); //cache hit
      expect(spyFunc.calledTwice).toBe(false);
      expect(spyFunc.calledOnce).toBe(true);
    });

    it('should cache the output of a function with function name if args is not available', () => {
      const spyFunc = sinon.spy(() => 123);
      const decoratedFunc = cacheDecorator(spyFunc);

      expect(decoratedFunc()).toEqual(123); //cache miss
      expect(spyFunc.calledOnce).toBe(true);

      expect(decoratedFunc()).toEqual(123); //cache hit
      expect(spyFunc.calledTwice).toBe(false);
      expect(spyFunc.calledOnce).toBe(true);
    });

    it('should not cache null values', () => {
      const spyFunc = sinon.spy(() => null);
      const decoratedFunc = cacheDecorator(spyFunc);

      expect(decoratedFunc()).toEqual(null); //cache miss
      expect(spyFunc.calledOnce).toBe(true);

      expect(decoratedFunc()).toEqual(null); //cache miss
      expect(spyFunc.calledTwice).toBe(true);
    });
  });
});
