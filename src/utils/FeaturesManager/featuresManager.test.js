import { isFeatureEnabled, FeaturesMap } from './';
import sinon from 'sinon';

describe('Features Manager', () => {
  it('Returns feature gate value - client', () => {
    window._checkout_ = {
      __myx_features__: { 'checkout.codCaptcha.enable': 'false' }
    };
    const value = isFeatureEnabled('COD_CAPTCHA', null);
    expect(value).toEqual(false);
  });

  it('Returns feature gate value - client - unknown feature', () => {
    const value = isFeatureEnabled('COD_CAPTCHA_TEST', null);
    expect(value).toEqual(false);
  });

  it('Invokes the callback given in FeatureMap', () => {
    const testCallback = sinon.spy();
    FeaturesMap['test'] = {
      key: 'test',
      defaultValue: 'test1',
      callback: testCallback
    };
    isFeatureEnabled('test', null);
    expect(testCallback).toHaveProperty('callCount', 1);
  });

  it('Return default value when __myx_features__ is null/undefined', () => {
    window._checkout_ = {
      __myx_features__: null
    };
    const value = isFeatureEnabled('COD_CAPTCHA', null, null);
    expect(value).toEqual(true);
  });

  it('Return default value when _checkout_ is null/undefined', () => {
    window._checkout_ = undefined;
    const value = isFeatureEnabled('COD_CAPTCHA', null, null);
    expect(value).toEqual(true);
  });

  it('Sale timer callback test', () => {
    const value = isFeatureEnabled('SALE_TIMER', { type: 'cart' });
    expect(value).toEqual(true);
  });

  it('Sale timer callback test - with address sale timer disabled', () => {
    window._checkout_ = {
      __myx_kvpairs__: {
        'checkout.salebanner.data':
          '{"enable":"true","page":{"cart":"1","address":"0","payment":"1"}}'
      }
    };
    const value = isFeatureEnabled('SALE_TIMER', { type: 'address' });
    expect(value).toEqual(false);
  });

  it('Sale timer callback test - Sale banner disabled', () => {
    window._checkout_ = {
      __myx_kvpairs__: {
        'checkout.salebanner.data': '{"enable":"false"}'
      }
    };
    const value = isFeatureEnabled('SALE_TIMER', { type: 'address' });
    expect(value).toEqual(false);
  });
});
