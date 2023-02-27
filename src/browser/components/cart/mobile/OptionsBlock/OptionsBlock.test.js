import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { OptionsUI } from '.';
import Coupons from './Coupons';
import GiftWrap from './GiftWrap';
import featureManager from 'commonUtils/FeaturesManager';

describe('Options Block for mobile', () => {
  let data;
  beforeEach(() => {
    data = {
      id: '123',
      coupons: [
        {
          type: 'coupon',
          status: 'SUCCESS'
        }
      ],
      flags: {
        giftwrapApplicable: { value: true },
        'myntApplicable.value': 1
      },
      price: {
        discounts: {
          data: [
            {
              key: 'coupon',
              value: 20
            }
          ]
        }
      },
      userDetails: { isFirstTimeCustomer: false }
    };
    window._checkout_ = {
      __myx_ab__: {}
    };
  });
  it('should show coupon, giftwrap blocks', () => {
    let wrapper = shallow(<OptionsUI data={data} />);
    expect(wrapper.find(Coupons)).to.have.lengthOf(1);
    expect(wrapper.find(GiftWrap)).to.have.lengthOf(1);
  });

  it('should not show giftwrap when flag is false', () => {
    data.flags.giftwrapApplicable = false;
    let wrapper = shallow(<OptionsUI data={data} />);
    expect(wrapper.find(GiftWrap)).to.have.lengthOf(0);
  });

  describe('Donation Strip', () => {
    it('should not show the donation strip when featureGate is off', () => {
      featureManager.isFeatureEnabled = () => false;
      let wrapper = shallow(<OptionsUI data={data} isExchangeCart={false} />);
      expect(wrapper.find('DonationStripBlock').exists()).to.be.false;

      featureManager.isFeatureEnabled = () => true;
      wrapper = shallow(<OptionsUI data={data} isExchangeCart={true} />);
      expect(wrapper.find('DonationStripBlock').exists()).to.be.false;
    });

    it('should show the donation strip when featureGate is on and not in exchange cart', () => {
      featureManager.isFeatureEnabled = () => true;
      const wrapper = shallow(<OptionsUI data={data} isExchangeCart={false} />);
      expect(wrapper.find('DonationStripBlock').exists()).to.be.true;
    });
  });

  describe('tryNbuy for AOCv2', () => {
    it('should not show the tryNbuy for AOCv2 variant2', () => {
      featureManager.isFeatureEnabled = () => true;
      window._checkout_.__myx_ab__['cart.addressoncartv2'] = 'variant2';
      const wrapper = shallow(<OptionsUI data={data} isExchangeCart={false} />);
      expect(wrapper.find('TryAndBuy').exists()).to.be.false;
    });

    it('should show the tryNbuy for AOCv2 variant3', () => {
      featureManager.isVariantEnabled = () => true;
      const wrapper = shallow(<OptionsUI data={data} isExchangeCart={false} />);
      expect(wrapper.find('TryAndBuy').exists()).to.be.true;
    });
  });
});
