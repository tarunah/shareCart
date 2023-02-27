import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import SaleTimer from '.';
import Timer from '../Timer';

describe(' Sale Timer for mobile', () => {
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

  window.triggerEvent = () => {};

  it('should not show sale timer', () => {
    let wrapper = mount(
      <SaleTimer
        priceRevealData={priceRevealData}
        saleBannerData={saleBannerData}
        enabled={true}
      />
    );
    expect(wrapper.html()).to.equal(null);
  });

  it('should show sale timer', () => {
    saleBannerData.enddate = date;
    let wrapper = mount(
      <SaleTimer
        priceRevealData={priceRevealData}
        saleBannerData={saleBannerData}
        enabled={true}
      />
    );
    expect(wrapper.find('.label').text()).to.contain('SALE ENDS IN');
    expect(wrapper.find(Timer)).to.have.lengthOf(1);
  });
});
