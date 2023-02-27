import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import BankOffers from '.';
import { checkoutPage } from 'commonUtils/constants';

const singleOffer = [
  {
    message:
      '10% Discount upto Rs 500 on a minimum spend of Rs 1,000 with Phonepe. TCA',
    pillMsg: '10% Discount on Phonepe upto Rs. 1000',
    hcMsg: 'Sample halfcard message',
    offerName: 'Phonepe',
    iconName: 'upi-phonepe'
  }
];

const multipleOffers = [
  {
    message:
      '10% Discount upto Rs 500 on a minimum spend of Rs 1,000 with Phonepe. TCA',
    pillMsg: '10% Discount on Phonepe upto Rs. 1000',
    hcMsg: 'Sample halfcard message',
    offerName: 'Phonepe',
    iconName: 'upi-phonepe'
  },
  {
    message:
      '20% Discount upto Rs 200 on a minimum spend of Rs 500 with Paytm. TCA',
    pillMsg: '20% Discount on Paytm upto Rs. 500',
    hcMsg: 'Sample halfcard message',
    offerName: 'Paytm',
    iconName: 'wallet-Paytm'
  }
];

describe('Visual Bank Offers component', () => {
  beforeEach(() => {
    window.triggerEvent = sinon.spy();
  });
  const modes = ['mobile', 'desktop'];
  for (let mode in modes) {
    it('should show strip if 1 offer is available', () => {
      const wrapper = shallow(
        <BankOffers
          messages={singleOffer}
          currentPage={checkoutPage.CART}
          total={1500}
          mode={modes[mode]}
        />
      );
      expect(wrapper.find('.offersContainer').length).toBe(1);
      expect(wrapper.find('.offerContent').length).toBe(1);
      expect(wrapper.find('.pillMsg').text()).toEqual(singleOffer[0].pillMsg);
    });
    it('should open halfcard on clicking the pill', () => {
      const sampleOffer = singleOffer[0];
      const wrapper = shallow(
        <BankOffers
          messages={singleOffer}
          currentPage={checkoutPage.CART}
          total={1500}
          mode={modes[mode]}
        />
      );
      wrapper.find('.offerContent').simulate('click');
      expect(wrapper.find('.offersContainer').length).toBe(1);
      expect(wrapper.find('.offerContent').length).toBe(1);
      expect(wrapper.find('.pillMsg').text()).toEqual(sampleOffer.pillMsg);
      expect(wrapper.find('.hcContainer').length).toBe(1);
      expect(wrapper.find('.hcTitle').length).toBe(1);
      expect(wrapper.find('.heading').text()).toEqual(
        `${sampleOffer.offerName} Offer`
      );
      expect(wrapper.find('.hcBody').text()).toEqual(`${sampleOffer.message}`);
    });

    it('should show pills if multiple offers are available', () => {
      const wrapper = shallow(
        <BankOffers
          messages={multipleOffers}
          currentPage={checkoutPage.CART}
          total={1500}
          mode={modes[mode]}
        />
      );
      expect(wrapper.find('.offersContainer').length).toBe(1);
      expect(wrapper.find('.offerContent').length).toBe(2);
      expect(wrapper.find('.pillMsg').length).toBe(2);
    });
  }
});
