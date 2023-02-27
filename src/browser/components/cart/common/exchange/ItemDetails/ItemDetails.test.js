import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import ItemDetails from '.';
import { ExchangeProductDetail } from 'testUtils/cartMockData';

describe('Exchange Item Details block shown', () => {
  let propsToPass = {};

  beforeEach(() => {
    window.triggerEvent = () => {};
    window.SHELL = { alert: sinon.spy() };
    propsToPass = {
      ...ExchangeProductDetail,
      flags: {},
      count: 1,
      handleCartAction: sinon.spy()
    };
  });

  it('should render component', () => {
    const wrapper = mount(<ItemDetails {...propsToPass} />);
    expect(wrapper.find('.details').text()).to.contain('Ready for exchange!');
    expect(wrapper.find('.title').text()).to.contain(
      ExchangeProductDetail.product.name
    );
    expect(wrapper.find('.actionBtn')).to.have.lengthOf(2);
  });

  it('should open cancel exchange modal and call cancel exchange', () => {
    propsToPass.handleCartAction = (name, data, scb) => scb();

    const wrapper = mount(<ItemDetails {...propsToPass} />);

    wrapper.find('[data-type="CANCEL_EXCHANGE"]').simulate('click');
    expect(wrapper.state().modalType).to.equal('CANCEL_EXCHANGE');
    wrapper
      .find('.actionBtnContainer .btnYes')
      .at(0)
      .simulate('click');
    expect(window.SHELL.alert.called).to.equal(true);
    expect(wrapper.state().modalType).to.equal('');
  });

  it('should open HOW IT WORKS modal', () => {
    const wrapper = mount(<ItemDetails {...propsToPass} />);

    wrapper.find('[data-type="HOW_IT_WORKS"]').simulate('click');
    expect(wrapper.state().modalType).to.equal('HOW_IT_WORKS');
  });

  it('should show message for multiple Items', () => {
    propsToPass.count = 2;
    const wrapper = mount(<ItemDetails {...propsToPass} />);

    expect(wrapper.find('.errorInfo')).to.have.lengthOf(1);
  });
});
