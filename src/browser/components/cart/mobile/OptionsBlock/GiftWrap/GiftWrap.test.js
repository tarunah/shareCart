import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { BrowserRouter as Router } from 'react-router-dom';
import GiftWrap from '.';

describe('GiftWrap Block for mobile', () => {
  it('should display Gift Wrap block', () => {
    const wrapper = mount(
      <Router>
        <GiftWrap />
      </Router>
    );
    expect(wrapper.find('.header').text()).to.contain(
      'GIFTING & PERSONALISATION'
    );
    expect(wrapper.find('.title').text()).to.contain('Buying for a loved one?');
    expect(wrapper.text()).to.contain(
      'Gift wrap and personalised message on card'
    );
    expect(wrapper.find('.price').text()).to.contain('Only for 25');
  });

  it('should display gift wrap applied block', () => {
    const handleCartAction = sinon.spy();
    const wrapper = mount(
      <Router>
        <GiftWrap active={true} handleCartAction={handleCartAction} />
      </Router>
    );
    expect(wrapper.find('.title').text()).to.contain(
      'Yay! Gift Wrapping applied'
    );
    expect(wrapper.find('.message').text()).to.contain(
      'Your order will be gift wrapped with message'
    );
    expect(wrapper.find('Link.edit').text()).to.contain('EDIT MESSAGE');
    expect(wrapper.find('Close.closeIcon').length).to.equal(1);
    wrapper.find('Close.closeIcon').simulate('click');
    expect(handleCartAction).to.have.property('callCount', 1);
  });
});
