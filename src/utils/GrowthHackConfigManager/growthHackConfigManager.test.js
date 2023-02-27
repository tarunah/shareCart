import { getGrowthHackConfigValue } from './';

describe('Growth Hack Config Manager', () => {
  it('Returns growth hack config value', () => {
    window._checkout_ = {
      __myx_growthhack__: { expressDelivery: { threshold: 3 } }
    };
    const value = getGrowthHackConfigValue('EXPRESS_DELIVERY', null);
    expect(value.threshold).toEqual(3);
  });

  it('Return default value when __myx_growthhack__ is null/undefined', () => {
    window._checkout_ = {
      __myx_growthhack__: null
    };
    const value = getGrowthHackConfigValue('EXPRESS_DELIVERY', null);
    expect(value.threshold).toEqual(0);
  });

  it('Return default value when _checkout_ is null/undefined', () => {
    window._checkout_ = undefined;
    const value = getGrowthHackConfigValue('EXPRESS_DELIVERY', null);
    expect(value.threshold).toEqual(0);
  });

  it('Returns null for an unknown key', () => {
    const value = getGrowthHackConfigValue('SLOW_AND_BORING_DELIVERY', null);
    expect(value).toEqual(null);
  });
});
