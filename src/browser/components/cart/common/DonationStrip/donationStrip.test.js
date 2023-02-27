import React from 'react';
import { mount } from 'enzyme';

import DonationStripBlock from './';
import Sinon from 'sinon';

describe('Donation Strip', () => {
  beforeEach(() => {
    window.triggerEvent = () => {};
    window.document.cookie = 'ilgim=true;';
    window._checkout_ = {
      __myx_kvpairs__: {
        ['checkout.donation.values']: {
          bannerTitle: 'Support transformative social work in India',
          modalConfig: {
            title: 'Support transformative social work in India',
            imgSource:
              'https://myntraweb.blob.core.windows.net/checkout/assets/img/donationBanner.webp',
            linkAndDescription: [
              {
                desc: 'Donation amount is being collected on behalf of',
                link: '/giveindia',
                linkText: 'GiveIndia'
              },
              {
                desc: 'Donation amount is non-refundable.'
              },
              {
                desc: 'Have a question? check',
                link: '/faq',
                linkText: 'FAQs'
              }
            ],
            footer: {
              desc: 'For further information, refer to our',
              link: '/TOU',
              linkText: 'Terms of Use'
            }
          },
          values: [10, 50, 100, 'other'],
          maximumDonation: 10000
        }
      }
    };
  });

  describe('Visual', () => {
    describe('withtout other field', () => {
      it('Displays the donation Strip in desktop with the given donation amount in kvpair', () => {
        window._checkout_.__myx_kvpairs__['checkout.donation.values'].values = [
          1000,
          12312,
          12
        ];
        const wrapper = mount(
          <DonationStripBlock handleCartAction={() => {}} mode="desktop" />
        );

        expect(wrapper.find('.desktopHeader').text()).toEqual(
          'Support transformative social work in India'
        );
        expect(wrapper.find('.titleContainer CheckboxInactive').exists()).toBe(
          true
        );
        expect(wrapper.find('.titleContainer').text()).toEqual(
          'Support transformative social work in India'
        );
        expect(wrapper.find('Pill').length).toEqual(3);
        expect(
          wrapper
            .find('Pill .textStyle')
            .at(0)
            .text()
        ).toEqual('₹1,000');
        expect(
          wrapper
            .find('Pill .textStyle')
            .at(1)
            .text()
        ).toEqual('₹12,312');
        expect(
          wrapper
            .find('Pill .textStyle')
            .at(2)
            .text()
        ).toEqual('₹12');
        expect(wrapper.find('KnowMore').text()).toEqual('Know More');
      });

      it('Displays the donation Strip in mobile with the given donation amount in kvpair', () => {
        window._checkout_.__myx_kvpairs__['checkout.donation.values'].values = [
          1000,
          12312,
          12
        ];

        const wrapper = mount(
          <DonationStripBlock handleCartAction={() => {}} mode="mobile" />
        );

        expect(wrapper.find('.mobileHeader').text()).toEqual(
          'Support transformative social work in India'
        );
        expect(wrapper.find('.titleContainer CheckboxInactive').exists()).toBe(
          true
        );

        expect(wrapper.find('.titleContainer').text()).toEqual(
          'Support transformative social work in IndiaKnow More'
        );
        expect(wrapper.find('Pill').length).toEqual(3);
        expect(
          wrapper
            .find('Pill .textStyle')
            .at(0)
            .text()
        ).toEqual('₹1,000');
        expect(
          wrapper
            .find('Pill .textStyle')
            .at(1)
            .text()
        ).toEqual('₹12,312');
        expect(
          wrapper
            .find('Pill .textStyle')
            .at(2)
            .text()
        ).toEqual('₹12');
      });
    });

    describe('with other field', () => {
      it('Displays the donation Strip in desktop with the given donation amount in kvpair', () => {
        window._checkout_.__myx_kvpairs__['checkout.donation.values'].values = [
          1000,
          12312,
          12,
          'other'
        ];

        const wrapper = mount(
          <DonationStripBlock handleCartAction={() => {}} mode="desktop" />
        );

        expect(wrapper.find('.desktopHeader').text()).toEqual(
          'Support transformative social work in India'
        );
        expect(wrapper.find('.titleContainer CheckboxInactive').exists()).toBe(
          true
        );
        expect(wrapper.find('.titleContainer').text()).toEqual(
          'Support transformative social work in India'
        );
        expect(wrapper.find('Pill').length).toEqual(4);
        expect(
          wrapper
            .find('Pill .textStyle')
            .at(0)
            .text()
        ).toEqual('₹1,000');
        expect(
          wrapper
            .find('Pill .textStyle')
            .at(1)
            .text()
        ).toEqual('₹12,312');
        expect(
          wrapper
            .find('Pill .textStyle')
            .at(2)
            .text()
        ).toEqual('₹12');
        expect(
          wrapper
            .find('Pill .textStyle')
            .at(3)
            .find('input')
            .prop('placeholder')
        ).toEqual('Other');
        expect(wrapper.find('KnowMore').text()).toEqual('Know More');
      });

      it('Displays the donation Strip in mobile with the given donation amount in kvpair', () => {
        window._checkout_.__myx_kvpairs__['checkout.donation.values'].values = [
          1000,
          12312,
          12,
          'other'
        ];

        const wrapper = mount(
          <DonationStripBlock handleCartAction={() => {}} mode="mobile" />
        );

        expect(wrapper.find('.mobileHeader').text()).toEqual(
          'Support transformative social work in India'
        );
        expect(wrapper.find('.titleContainer CheckboxInactive').exists()).toBe(
          true
        );

        expect(wrapper.find('.titleContainer').text()).toEqual(
          'Support transformative social work in IndiaKnow More'
        );
        expect(wrapper.find('Pill').length).toEqual(4);
        expect(
          wrapper
            .find('Pill .textStyle')
            .at(0)
            .text()
        ).toEqual('₹1,000');
        expect(
          wrapper
            .find('Pill .textStyle')
            .at(1)
            .text()
        ).toEqual('₹12,312');
        expect(
          wrapper
            .find('Pill .textStyle')
            .at(2)
            .text()
        ).toEqual('₹12');
        expect(
          wrapper
            .find('Pill .textStyle')
            .at(3)
            .find('input')
            .prop('placeholder')
        ).toEqual('Enter Amount');
      });
    });

    describe('should select the donationamount', () => {
      it('without other tab', () => {
        window._checkout_.__myx_kvpairs__['checkout.donation.values'].values = [
          1000,
          12312,
          12
        ];
        const wrapper = mount(
          <DonationStripBlock
            handleCartAction={() => {}}
            donationAmount={12312}
            mode="mobile"
          />
        );

        expect(
          wrapper
            .find('Pill')
            .at(1)
            .find('.activePill')
            .exists()
        ).toEqual(true);
      });

      it('with other tab, amount not in list should be in other', () => {
        window._checkout_.__myx_kvpairs__['checkout.donation.values'].values = [
          1000,
          12312,
          12,
          'other'
        ];
        const wrapper = mount(
          <DonationStripBlock
            handleCartAction={() => {}}
            donationAmount={123}
            mode="mobile"
          />
        );

        expect(
          wrapper
            .find('Pill')
            .at(3)
            .find('.activePill')
            .exists()
        ).toEqual(true);
      });
    });

    describe('EmailInput', () => {
      it('should show email input if profile email is not present and donation is selected', () => {
        const wrapper = mount(
          <DonationStripBlock
            handleCartAction={() => {}}
            donationAmount={132}
            mode="desktop"
          />
        );
        expect(wrapper.find('AutoSubmitEmail').exists()).toEqual(true);
      });

      it('should not show email input if profile email  is present and donation is selected', () => {
        window._checkout_ = { __myx_profile__: { email: 'agg2@myntra.com' } };
        const wrapper = mount(
          <DonationStripBlock
            handleCartAction={() => {}}
            donationAmount={132}
            mode="desktop"
          />
        );
        expect(wrapper.find('AutoSubmitEmail').exists()).toEqual(false);
      });

      it('should not show email input if profile email  is not present and donation is not selected', () => {
        window._checkout_ = { __myx_profile__: { email: 'agg2@myntra.com' } };
        const wrapper = mount(
          <DonationStripBlock handleCartAction={() => {}} mode="desktop" />
        );
        expect(wrapper.find('AutoSubmitEmail').exists()).toEqual(false);
      });
    });
  });

  describe('functional', () => {
    it('should call handleCart when a pill is clicked', () => {
      const spy = Sinon.spy();
      const wrapper = mount(
        <DonationStripBlock handleCartAction={spy} mode="desktop" />
      );

      wrapper
        .find('Pill')
        .at(0)
        .simulate('click');
      wrapper
        .find('Pill')
        .at(1)
        .simulate('click');

      expect(spy.args[0]).toEqual(['applyDonation', { amount: 10 }]);
      expect(spy.args[1]).toEqual(['applyDonation', { amount: 50 }]);
    });

    it('should open the halfcard when clicked on knowMore', () => {
      const wrapper = mount(
        <DonationStripBlock handleCartAction={() => {}} mode="desktop" />
      );

      expect(wrapper.find('Modal').exists()).toEqual(false);
      wrapper.find('KnowMore').simulate('click');
      expect(wrapper.find('Modal').exists()).toEqual(true);
    });

    describe('otherField', () => {
      it('should select the other field if clicked on it', () => {
        const wrapper = mount(
          <DonationStripBlock handleCartAction={() => {}} mode="desktop" />
        );
        wrapper.find('input').prop('onFocus')();
        wrapper.update();
        expect(
          wrapper
            .find('input')
            .find('.selectedInput')
            .exists()
        ).toEqual(true);
      });

      it('should cap the amount entered in other field to maxAmount in kvpair', () => {
        const spy = Sinon.spy((f, data, scb) => scb());
        const alert = Sinon.spy();
        window.SHELL = { alert };
        const wrapper = mount(
          <DonationStripBlock handleCartAction={spy} mode="desktop" />
        );
        wrapper.find('input').prop('onChange')({
          currentTarget: { value: '11,123' }
        });
        wrapper.update();
        wrapper.find('input').prop('onBlur')();
        wrapper.update();
        expect(spy.args[0][0]).toEqual('applyDonation');
        expect(spy.args[0][1]).toEqual({ amount: 10000 });
        expect(alert.args[0][1].message).toEqual(
          'You can donate maximum Rs. 10,000 on this order.'
        );
      });
    });
  });
});
