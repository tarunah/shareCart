import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount, render } from 'enzyme';
import PriceDetail from '.';
import LoginShippingText from 'commonComp/LoginShippingText';

describe('PriceDetail Component', () => {
  window.triggerEvent = () => {};

  it('should render normal div for prop type normal', () => {
    let wrapper = mount(
      <PriceDetail
        name="Bag Total"
        displayValue="8,995"
        type="normal"
        show={true}
      />
    );
    expect(wrapper.text()).to.contain('Bag Total');
    expect(wrapper.text()).to.contain('8,995');
    expect(wrapper.find('.discount')).to.have.lengthOf(0);
    expect(wrapper.find('.total')).to.have.lengthOf(0);
  });

  it('should render total div for prop type total', () => {
    let wrapper = mount(
      <PriceDetail name="Total" displayValue="8,995" type="total" show={true} />
    );
    expect(wrapper.text()).to.contain('Total');
    expect(wrapper.text()).to.contain('8,995');
    expect(wrapper.find('.discount')).to.have.lengthOf(0);
    expect(wrapper.find('.total')).to.have.lengthOf(1);
  });

  it('should render discount div for prop type discount', () => {
    let wrapper = mount(
      <PriceDetail
        name="Bag Discount"
        displayValue="8,995"
        type="discount"
        show={true}
      />
    );
    expect(wrapper.text()).to.contain('Bag Discount');
    expect(wrapper.text()).to.contain('8,995');
    expect(wrapper.find('.discount')).to.have.lengthOf(1);
    expect(wrapper.find('.total')).to.have.lengthOf(0);
  });

  it('should render discount div for prop type freeShipping', () => {
    let wrapper = mount(
      <PriceDetail
        name="Shipping"
        displayText="FREE"
        type="shipping"
        shippingApplicableCharge={149}
        show={true}
      />
    );
    expect(wrapper.text()).to.contain('Shipping');
    expect(wrapper.text()).to.contain('FREE');
    expect(wrapper.find('.discount')).to.have.lengthOf(1);
    expect(wrapper.find('.total')).to.have.lengthOf(0);

    const strikedDiv = wrapper.find('.striked');
    expect(strikedDiv).to.have.lengthOf(1);
    expect(strikedDiv.text()).to.contain('149');
  });

  it('should show correct striked price prop type shipping', () => {
    let wrapper = mount(
      <PriceDetail
        name="Shipping"
        value={99}
        displayValue="99"
        type="shipping"
        shippingApplicableCharge={149}
        show={true}
      />
    );
    expect(wrapper.text()).to.contain('Shipping');
    expect(wrapper.text()).to.contain('99');

    const strikedDiv = wrapper.find('.striked');
    expect(strikedDiv).to.have.lengthOf(1);
    expect(strikedDiv.text()).to.contain('149');
    expect(wrapper.find('.total')).to.have.lengthOf(0);
  });

  it('should render action div for prop type action', () => {
    const onButtonClick = sinon.spy();
    let wrapper = mount(
      <PriceDetail
        name="Coupon Discount"
        displayText="Apply Coupon"
        type="action"
        callback={onButtonClick}
        show={true}
      />
    );
    expect(wrapper.text()).to.contain('Coupon Discount');
    expect(wrapper.text()).to.contain('Apply Coupon');
    wrapper.find('.action').simulate('click');
    expect(onButtonClick).to.have.property('callCount', 1);
  });

  it('should render info icon when coupons are applied', () => {
    const wrapper = mount(
      <PriceDetail
        name="Coupon Discount"
        displayValue="50"
        value={50}
        appliedCoupons={[
          {
            code: 'TSTBOTIWBYT',
            expiry: 1669829789000,
            description: ' 50%  off',
            status: 'SUCCESS',
            discountUnits: [
              {
                unit: 'RUPEE',
                value: 50
              }
            ]
          }
        ]}
        type="couponDiscount"
        show={true}
      />
    );
    expect(wrapper.text()).to.contain('Coupon Discount');
    expect(wrapper.text()).to.contain('50');
  });

  it('on clicking on info icon should display coupon and discount', () => {
    const wrapper = mount(
      <PriceDetail
        name="Coupon Discount"
        displayValue="50"
        value={50}
        appliedCoupons={[
          {
            code: 'TSTBOTIWBYT',
            expiry: 1669829789000,
            description: ' 50%  off',
            status: 'SUCCESS',
            discountUnits: [
              {
                unit: 'RUPEE',
                value: 50
              }
            ]
          }
        ]}
        type="couponDiscount"
        show={true}
      />
    );
    wrapper.find('.infoIcon .infoIcon').simulate('click');
    expect(wrapper.find('.couponRow').text()).to.contain('TSTBOTIWBYT');
    expect(wrapper.find('.couponRow').text()).to.contain('50');
  });

  it('should render info icon when attached product offer is applied', () => {
    const wrapper = mount(
      <PriceDetail
        name="Coupon Discount"
        displayValue="50"
        value={50}
        attachedProductDiscount={50}
        type="couponDiscount"
        show={true}
      />
    );
    expect(wrapper.text()).to.contain('Coupon Discount');
    expect(wrapper.text()).to.contain('50');
  });

  it('on clicking on info icon should display applied attached product offer discount', () => {
    const wrapper = mount(
      <PriceDetail
        name="Coupon Discount"
        displayValue="50"
        value={50}
        attachedProductDiscount={50}
        type="couponDiscount"
        show={true}
      />
    );
    wrapper.find('.infoIcon .infoIcon').simulate('click');
    expect(wrapper.find('.couponRow').text()).to.contain('Offer Applied');
    expect(wrapper.find('.couponRow').text()).to.contain('50');
  });

  it('should render hide-action div for prop type hide-action', () => {
    const onButtonClick = sinon.spy();
    let wrapper = mount(
      <PriceDetail
        name="Total"
        displayValue="8,995"
        type="hide-action"
        actionName="View Details"
        callback={onButtonClick}
        show={true}
      />
    );
    expect(wrapper.text()).to.contain('Total');
    expect(wrapper.text()).to.contain('8,995');
    wrapper.find('.action').simulate('click');
    expect(onButtonClick).to.have.property('callCount', 1);
  });

  it('should not show for prop show false', () => {
    let wrapper = render(<PriceDetail show={false} />);
    expect(wrapper.text()).to.equal('');
  });

  it('should render tax block for prop type tax', () => {
    let wrapper = mount(
      <PriceDetail
        name="Tax"
        displayValue="8,995"
        type="tax"
        show={true}
        taxByProduct={[{ name: 'xyz', tax: 12 }]}
        totalTax={12}
      />
    );
    expect(wrapper.text()).to.contain('Tax');
    expect(wrapper.text()).to.contain('8,995');
    expect(wrapper.find('Info.infoIcon')).to.have.lengthOf(1);
    wrapper.find('Info.infoIcon').simulate('click');
    expect(wrapper.find('.taxTitle').text()).to.equal('Tax Breakup');
    expect(wrapper.find('.taxHeader').text()).to.contain('Total tax');
    expect(wrapper.find('.taxHeader').text()).to.contain('12');
    expect(wrapper.find('.taxByProduct').text()).to.contain('xyz');
    expect(wrapper.find('.taxByProduct').text()).to.contain('12');
  });
});
