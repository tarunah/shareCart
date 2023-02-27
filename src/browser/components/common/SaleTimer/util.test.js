import { expect } from 'chai';
import { getSaleBannerData } from './util';

describe('Sale Timer util', () => {
  let priceRevealData = { enable: 'true' };
  let saleBannerData = {
    enable: 'true',
    image:
      'https://assets.myntassets.com/assets/images/2016/12/7/11481093702784-eors_logo.png',
    timerlabel: 'SALE ENDS IN',
    enddate: '2018-08-06T18:29:59.999Z'
  };
  let date = new Date();
  date.setDate(date.getDate() + 1);

  window._checkout_ = {
    __myx_env__: { cookie: { prefix: '' } }
  };

  it('should not display any timer', () => {
    const timerData = getSaleBannerData(priceRevealData, saleBannerData);
    expect(timerData.showTimer).to.equal(false);
  });

  it('should retun sale timer data', () => {
    saleBannerData.enddate = date;
    const timerData = getSaleBannerData(priceRevealData, saleBannerData);
    expect(timerData.showTimer).to.equal(true);
    expect(timerData.timerLabel).to.equal('SALE ENDS IN');
    expect(timerData.timerEndDate).to.equal(date.getTime());
    expect(timerData.timerImage).to.equal(
      'https://assets.myntassets.com/assets/images/2016/12/7/11481093702784-eors_logo.png'
    );
  });

  it('should not display any timer', () => {
    saleBannerData.enable = false;
    const timerData = getSaleBannerData(priceRevealData, saleBannerData);
    expect(timerData.showTimer).to.equal(false);
  });

  it('should not display slot timer', () => {
    const slot = { sl: { st: new Date().getTime(), et: date.getTime() } };
    document.cookie = 'stp=' + JSON.stringify(slot);
    const timerData = getSaleBannerData(priceRevealData, saleBannerData);
    expect(timerData.showTimer).to.equal(false);
  });

  it('should display slot timer', () => {
    const slot = { sl: { st: new Date().getTime(), et: date.getTime() } };
    document.cookie = 'stp=' + JSON.stringify(slot);
    document.cookie = 'ilgim=true';
    const timerData = getSaleBannerData(priceRevealData, saleBannerData);
    expect(timerData.showTimer).to.equal(true);
    expect(timerData.timerLabel).to.equal('BUY WITHIN');
    expect(timerData.timerEndDate).to.equal(date.getTime());
  });

  it('should not display slot timer', () => {
    priceRevealData.enable = false;
    const slot = { sl: { st: new Date().getTime(), et: date.getTime() } };
    document.cookie = 'stp=' + JSON.stringify(slot);
    document.cookie = 'ilgim=true';
    const timerData = getSaleBannerData(priceRevealData, saleBannerData);
    expect(timerData.showTimer).to.equal(false);
  });
});
