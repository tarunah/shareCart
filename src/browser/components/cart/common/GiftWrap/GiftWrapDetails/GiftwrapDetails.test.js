import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import GiftWrapDetails from '.';

describe('GiftWrap Details block', () => {
  it('should show title', () => {
    const wrapper = mount(<GiftWrapDetails />);
    expect(wrapper.find('.header .title').text()).to.contain(
      'HOW DOES IT WORK?'
    );
  });

  it('should show content', () => {
    const wrapper = mount(<GiftWrapDetails />);

    expect(
      wrapper
        .find('.row')
        .at(0)
        .find('.title')
        .text()
    ).to.contain('Personalised card');
    expect(
      wrapper
        .find('.row')
        .at(0)
        .find('.info')
        .text()
    ).to.contain(
      'Your message will be printed on a card placed inside the package.'
    );
    expect(
      wrapper
        .find('.row')
        .at(0)
        .find('ImageBanner')
        .prop('name')
    ).to.equal('giftwrap-card');

    expect(
      wrapper
        .find('.row')
        .at(1)
        .find('.title')
        .text()
    ).to.contain('Invoice will be included');
    expect(
      wrapper
        .find('.row')
        .at(1)
        .find('.info')
        .text()
    ).to.contain(
      'The receiver will get an invoice showing the amount you pay or the discount applied'
    );
    expect(
      wrapper
        .find('.row')
        .at(1)
        .find('ImageBanner')
        .prop('name')
    ).to.equal('giftwrap-invoice');

    expect(
      wrapper
        .find('.row')
        .at(2)
        .find('.title')
        .text()
    ).to.contain('Original product tags will be retained');
    expect(
      wrapper
        .find('.row')
        .at(2)
        .find('.info')
        .text()
    ).to.contain(
      'Original product tags with MRP will be left intact in-case you’d like to exchange for a different size.'
    );
    expect(
      wrapper
        .find('.row')
        .at(2)
        .find('ImageBanner')
        .prop('name')
    ).to.equal('giftwrap-tag');
  });
});
