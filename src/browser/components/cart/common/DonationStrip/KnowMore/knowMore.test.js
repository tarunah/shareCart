import React from 'react';
import { mount } from 'enzyme';

import KnowMore from '.';

describe('Visual', () => {
  window.triggerEvent = () => {};

  it('should show the content in modal', () => {
    const wrapper = mount(
      <KnowMore
        modalConfig={{
          title: 'Help India fight with COVID-19',
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
          },
          values: [10, 50, 100, 'other'],
          maximumDonation: 10000
        }}
      />
    );

    wrapper.simulate('click');

    expect(wrapper.find('ImageComponent').exists()).toEqual(true);
    expect(
      wrapper
        .find('.text')
        .at(0)
        .text()
    ).toContain('Donation amount is being collected on behalf of');
    expect(
      wrapper
        .find('a')
        .at(0)
        .text()
    ).toContain('GiveIndia');

    expect(
      wrapper
        .find('.text')
        .at(1)
        .text()
    ).toContain('Donation amount is non-refundable.');

    expect(
      wrapper
        .find('.text')
        .at(2)
        .text()
    ).toContain('Have a question? check');
    expect(
      wrapper
        .find('a')
        .at(1)
        .text()
    ).toContain('FAQs');

    expect(
      wrapper
        .find('.text')
        .at(3)
        .text()
    ).toContain('For further information, refer to our');
    expect(
      wrapper
        .find('a')
        .at(2)
        .text()
    ).toContain('Terms of Use');
  });
});
