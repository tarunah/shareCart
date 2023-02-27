import { getKVPairValue, KVPairsMap } from './';

describe('KVPair Manager', () => {
  it('KVpairsMap - should have a sample expected value for all keys', () => {
    window._checkout_ = {
      __myx_kvpairs__: {}
    };
    const keys = Object.keys(KVPairsMap);
    keys.forEach(key => {
      const keyConfig = KVPairsMap[key];
      expect(typeof keyConfig.expectedType).not.toBe('undefined');
      expect(typeof keyConfig.defaultValue).not.toBe('undefined');
    });
  });

  it('KVpairsMap - should return value whose type is same as expected value', () => {
    window._checkout_ = {
      __myx_kvpairs__: {}
    };
    const keys = Object.keys(KVPairsMap);
    keys.forEach(key => {
      const keyConfig = KVPairsMap[key];
      const value = getKVPairValue(key, null);
      expect(typeof value).toBe(typeof keyConfig.expectedType);
    });
  });

  it('Returns kvpair value - client', () => {
    window._checkout_ = {
      __myx_kvpairs__: { 'shipping.charges.cartlimit': 890 }
    };
    const value = getKVPairValue('CART_SHIPPING_CHARGES_LIMIT', null);
    expect(value).toEqual(890);
  });

  it('Returns kvpair value - invalid switch config', () => {
    window._checkout_ = {
      __myx_kvpairs__: { 'hrdr.pricereveal.data': '{buttonLabel:[}' }
    };
    const value = getKVPairValue('PRICE_REVEAL_DATA', null);
    expect(value).toEqual(
      JSON.parse(KVPairsMap['PRICE_REVEAL_DATA'].defaultValue)
    );
  });

  it('Returns kvpair value - client - unknown feature', () => {
    window._checkout_ = {
      __myx_kvpairs__: {}
    };
    const value = getKVPairValue('CART_SHIPPING_CHARGES_LIMIT_TEST', null);
    expect(value).toEqual(null);
  });

  it('Return default value when __myx_kvpairs__ is null/undefined', () => {
    window._checkout_ = {
      __myx_kvpairs__: null
    };
    const value = getKVPairValue('CART_SHIPPING_CHARGES_LIMIT', null);
    expect(value).toEqual(999);
  });

  it('Return default value when _checkout_ is null/undefined', () => {
    window._checkout_ = undefined;
    const value = getKVPairValue('CART_SHIPPING_CHARGES_LIMIT', null);
    expect(value).toEqual(999);
  });
});
