import { getBannerConfigValue } from './';

describe('Banner Config Manager', () => {
  it('Returns banner config value - client - unknown feature', () => {
    window._checkout_ = {
      __myx_bannerconfig__: { 'checkout.confirmation.promotionoffer': null }
    };
    const value = getBannerConfigValue('PROMOTIONAL_OFFER', null);
    expect(value).toEqual(null);
  });
});
