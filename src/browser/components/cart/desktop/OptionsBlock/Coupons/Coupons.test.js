import React from 'react';
import { mount, shallow } from 'enzyme';
import Coupons from '.';
import sinon from 'sinon';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

jest.mock('commonBrowserUtils/CartManager', () => ({
  ...jest.requireActual('commonBrowserUtils/CartManager'),
  applyAndGetCoupons: () => {}
}));

describe('Coupons Block for desktop', () => {
  window._checkout_ = {
    __myx_env__: {
      cookie: { prefix: '' }
    }
  };

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should display Coupons label', () => {
    const wrapper = mount(<Coupons />);
    expect(wrapper.text()).toContain('Coupons');
  });

  it('should display Offer heading when attached product offer is available', () => {
    window._checkout_ = {
      __myx_features__: {
        'checkout.attachedProducts.enabled': true
      }
    };
    const attachedProductOffers = {
      appliedOffers: [
        {
          offerText: '10% off',
          offerDescription: 'Buy from selected catalogue to get additional off',
          tagLink: 'https://www.myntra.com/myntra?f=Coupons:WINTER_BASE'
        }
      ],
      totalOfferAmount: 100
    };
    const wrapper = mount(
      <Coupons attachedProductOffers={attachedProductOffers} />
    );
    expect(wrapper.find('.header').text()).toContain('OFFERS & COUPONS');
  });

  it('should display coupon count when coupon is already applied', () => {
    const wrapper = mount(<Coupons discount={20} count={2} />);
    expect(wrapper.text()).toContain('2 Coupons applied');
  });

  it('should display discount info when coupon is applied', () => {
    const wrapper = mount(<Coupons discount={2000} />);
    expect(wrapper.text()).toContain('You saved additional 2,000');
  });

  it('should display edit button when coupon is applied', () => {
    const wrapper = mount(<Coupons discount={20} />);
    expect(wrapper.text()).toContain('EDIT');
  });

  it('should display apply button when coupon is not applied', () => {
    const wrapper = mount(<Coupons discount={0} />);
    expect(wrapper.text()).toContain('APPLY');
  });

  it('should display Login info when user is not logged in', () => {
    const wrapper = mount(<Coupons discount={0} />);
    expect(wrapper.find('.couponMessage')).toHaveLength(1);
  });

  it('should display disabled coupon message', () => {
    const wrapper = mount(<Coupons disable={true} />);
    expect(wrapper.find('.disabledCouponMessage')).toHaveLength(1);
  });

  it('should set showModal to true after clicking apply', async () => {
    window.triggerEvent = () => {};
    render(<Coupons />);
    userEvent.click(screen.getByRole('button'));
    await screen.findByRole('dialog');
  });

  it('should call shell.alert if selectedProductsCount is zero', () => {
    const alert = sinon.spy();
    window.SHELL = { alert };
    render(<Coupons selectedProductsCount={0} />);
    userEvent.click(screen.getByRole('button'));
    expect(alert.getCall(0).args[1].message).toEqual(
      'Select at least one item in bag to apply coupons. '
    );
  });

  it('should set showModal to true', async () => {
    const triggerSpy = sinon.spy();
    window.triggerEvent = triggerSpy;
    render(<Coupons discount={20} count={2} />);
    userEvent.click(screen.getByRole('button'));
    await screen.findByRole('dialog');
  });

  it('should set showModal to false on invoking hideModal', async () => {
    render(<Coupons />);
    userEvent.click(screen.getByRole('button'));
    await screen.findByRole('dialog');
    userEvent.click(screen.getByTestId('modal-close'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
