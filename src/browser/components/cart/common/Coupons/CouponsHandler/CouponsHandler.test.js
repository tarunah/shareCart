import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import CouponsHandler from './';
import CartManager from 'commonBrowserUtils/CartManager';

describe('Coupons Handler', () => {
  beforeEach(() => {
    //cartManager.applyAndGetCoupons is called in component did mount
    CartManager.applyAndGetCoupons = jest.fn(() => {});
    window.triggerEvent = () => {};
    window.isFeatureEnabled = () => true;
  });

  it('should set state couponApplied to true and invoke goBack to move to cart on success and should call SHELL.alert', () => {
    let goBackSpy = sinon.spy();
    let alertSpy = sinon.spy();
    window.SHELL = { alert: alertSpy };
    let wrapper = mount(
      <CouponsHandler
        cartId="123"
        render={() => {
          return null;
        }}
        goBack={goBackSpy}
      />
    );
    wrapper.instance().onApplyAllCouponsSuccess({
      coupons: [
        {
          type: 'coupon',
          status: 'SUCCESS'
        }
      ],
      price: {
        discounts: {
          data: [
            {
              name: 'coupon',
              effectiveDiscountValue: 20,
              value: 20
            }
          ]
        }
      }
    });
    expect(wrapper.state().couponApplied).to.equal(true);
    expect(goBackSpy).to.have.property('callCount', 1);
    expect(alertSpy).to.have.property('callCount', 1);
  });

  it('should set state errorMessage on service failure', () => {
    let wrapper = mount(
      <CouponsHandler
        cartId="123"
        render={() => {
          return null;
        }}
      />
    );
    wrapper.instance().applyCouponsErrorCallback({});
    expect(wrapper.state().errorMessage).to.equal('Something went wrong.');
  });

  it('should set coupon code on input', () => {
    window.triggerEvent = jest.fn(() => {});
    let wrapper = mount(
      <CouponsHandler
        cartId="123"
        render={() => {
          return null;
        }}
      />
    );
    wrapper.instance().setCouponCode({ currentTarget: { value: 'xyz' } });
    expect(wrapper.state().couponInput).to.equal('xyz');
  });

  it('should show number of coupons applied along with the money saved with the final apply', () => {
    const handleCartAction = (functionName, coupons, successCB, errorCB) => {
      successCB({
        price: {
          discounts: {
            data: [{ name: 'coupon', effectiveDiscountValue: 20, value: 20 }]
          }
        },
        coupons: [
          {
            code: 'abcd',
            status: 'SUCCESS'
          }
        ]
      });
    };

    const wrapper = mount(
      <CouponsHandler
        cartId="123"
        showNotification={true}
        handleCartAction={handleCartAction}
        render={() => {
          return null;
        }}
      />
    );
    const SHELL = { alert: jest.fn(() => {}) };
    sinon.spy(SHELL, 'alert');
    window.SHELL = SHELL;

    const e = {
      currentTarget: {
        getAttribute: () => ''
      }
    };

    wrapper.setState({ couponSelectionStatus: { abcd: true } });
    wrapper.instance().applyCoupon(e);

    expect(SHELL.alert.calledOnce).to.equal(true);
    expect(SHELL.alert.mock.calls[0][1].message).to.equal(
      '<b> Yay! You saved </b><span "style="font-size: 14px; font-weight: 400;">&#8377</span> 20 <b> with one coupon. </b>'
    );
  });

  it('should show number of coupons applied along with the money saved and expired coupons', () => {
    const wrapper = mount(
      <CouponsHandler
        cartId="123"
        showNotification={true}
        render={() => {
          return null;
        }}
      />
    );
    const SHELL = { alert: jest.fn(() => {}) };
    sinon.spy(SHELL, 'alert');
    window.SHELL = SHELL;

    wrapper.instance().onApplyAllCouponsSuccess({
      price: {
        discounts: {
          data: [{ name: 'coupon', effectiveDiscountValue: 20, value: 20 }]
        }
      },
      coupons: [
        {
          code: 'abcd',
          status: 'SUCCESS'
        },
        {
          code: 'abc',
          status: 'ERROR',
          message: 'Sorry, this coupon has expired.',
          statusCode: 0
        }
      ]
    });

    expect(SHELL.alert.calledOnce).to.equal(true);
    expect(SHELL.alert.mock.calls[0][1].message).to.equal(
      '<b>One of the coupons just got expired but you saved </b><span style="font-size: 14px; font-weight: 400;">&#8377</span> 20 <b> with one coupon. </b>'
    );
  });

  it('should not display coupons if the statusCode is 999999 if there is no inputCoupon', () => {
    CartManager.applyAndGetCoupons = jest.fn((coupons, successCB, errorCB) => {
      successCB({
        coupons: [
          {
            code: 'abcd',
            status: 'ERROR',
            statusCode: 999999,
            message: 'Oops! Something went wrong.'
          }
        ],
        applicableCoupons: []
      });
    });
    const wrapper = mount(<CouponsHandler cartId="123" render={() => null} />);
    expect(wrapper.state('coupons').length).to.equal(0);
  });

  it('should display set retry as true if statusCode in response of coupons is 999999', () => {
    const handleCartAction = jest.fn(
      (functionName, coupons, successCB, errorCB) => {
        successCB({
          coupons: [
            {
              code: 'abcd',
              status: 'ERROR',
              statusCode: 999999,
              message: 'Oops! Something went wrong.'
            }
          ],
          applicableCoupons: []
        });
      }
    );
    const wrapper = mount(
      <CouponsHandler
        cartId="123"
        render={() => null}
        handleCartAction={handleCartAction}
      />
    );
    wrapper.instance().applyAndGetCoupons({ code: 'abcd', type: 'coupon' });
    expect(wrapper.state().retry).to.equal(true);
  });

  it('should check the coupons by default and display maximum savings on opening the modal', () => {
    const mockCoupons = [
      {
        code: 'abcd',
        status: 'SUCCESS',
        statusCode: 0,
        discountUnits: [{ unit: 'RUPEE', value: 40 }]
      },
      {
        code: 'abc',
        status: 'SUCCESS',
        statusCode: 0,
        discountUnits: [{ unit: 'RUPEE', value: 40 }]
      }
    ];

    CartManager.applyAndGetCoupons = jest.fn((coupons, successCB, erroCB) => {
      successCB({
        coupons: mockCoupons,
        applicableCoupons: []
      });
    });

    const mockHandleCartAction = (method, data, successCB, errorCB) => {
      CartManager.applyAndGetCoupons(data, successCB, errorCB);
    };

    const wrapper = mount(
      <CouponsHandler
        cartId="123"
        handleCartAction={mockHandleCartAction}
        render={() => {
          return null;
        }}
      />
    );

    for (const { code } of mockCoupons) {
      expect(wrapper.state('couponSelectionStatus')[code]).to.equal(true);
    }
    expect(wrapper.state('maximumSavings')).to.equal(80);
  });

  describe('Form input', () => {
    it('should set error in state if the inputCoupon is already applied', () => {
      const e = {
        currentTarget: {
          getAttribute: () => 'couponInputApply'
        }
      };

      const wrapper = mount(
        <CouponsHandler
          cartId="123"
          render={() => {
            return null;
          }}
        />
      );

      wrapper.setState({
        couponSelectionStatus: { abcd: true },
        couponInput: 'abcd'
      });
      wrapper.instance().applyCoupon(e);
      expect(wrapper.state('errorMessage')).to.equal(
        'This coupon is already applied.'
      );
    });

    it('should set error in state if the inputCoupon is not valid and should not show taglink', () => {
      const handleCartAction = jest.fn(
        (functionName, coupons, successCB, erroCB) => {
          successCB({
            coupons: [
              {
                code: 'abcd',
                status: 'ERROR',
                statusCode: 0,
                message: 'Sorry, this coupon is not valid.',
                tagLink: '',
                showTagLink: false
              }
            ],
            applicableCoupons: []
          });
        }
      );

      const e = {
        currentTarget: {
          getAttribute: () => 'couponInputApply'
        }
      };

      const wrapper = mount(
        <CouponsHandler
          cartId="123"
          handleCartAction={handleCartAction}
          render={() => {
            return null;
          }}
        />
      );

      wrapper.setState({ couponInput: 'abcd' });
      wrapper.instance().applyCoupon(e);
      expect(wrapper.state('errorMessage')).to.equal(
        'Sorry, this coupon is not valid.'
      );
    });

    it('should set error in state if the inputCoupon is not valid for current cart and should show taglink', () => {
      const handleCartAction = jest.fn(
        (functionName, coupons, successCB, erroCB) => {
          successCB({
            coupons: [
              {
                code: 'abcd',
                status: 'ERROR',
                statusCode: 0,
                message:
                  'The total value of cart items applicable for this coupon should be more than Rs. 2500.',
                tagLink: 'https://www.myntra.com/myntra?f=Coupons:EMP25',
                showTagLink: true
              }
            ],
            applicableCoupons: []
          });
        }
      );

      const e = {
        currentTarget: {
          getAttribute: () => 'couponInputApply'
        }
      };

      const wrapper = mount(
        <CouponsHandler
          cartId="123"
          handleCartAction={handleCartAction}
          render={() => {
            return null;
          }}
        />
      );

      wrapper.setState({ couponInput: 'abcd' });
      wrapper.instance().applyCoupon(e);
      expect(wrapper.state('errorMessage')).to.equal(
        'The total value of cart items applicable for this coupon should be more than Rs. 2500.'
      );
      expect(wrapper.state('tagLink')).to.equal(
        'https://www.myntra.com/myntra?f=Coupons:EMP25'
      );
    });

    it('should call SHELL notificaiton when inputCoupon is successfully applied', () => {
      const handleCartAction = jest.fn(
        (functionName, coupons, successCB, erroCB) => {
          coupons.length > 0 &&
            successCB({
              data: {
                price: {
                  discounts: {
                    data: [{ name: 'coupon', value: 20 }]
                  }
                }
              },
              coupons: [
                {
                  code: 'abcd',
                  status: 'SUCCESS',
                  message: 'Applied successfully',
                  discountUnits: [
                    {
                      unit: 'RUPEE',
                      value: 10
                    }
                  ]
                }
              ],
              applicableCoupons: []
            });
        }
      );
      const SHELL = { alert: jest.fn(() => {}) };
      sinon.spy(SHELL, 'alert');
      window.SHELL = SHELL;

      const e = {
        currentTarget: {
          getAttribute: () => 'couponInputApply'
        }
      };

      const wrapper = mount(
        <CouponsHandler
          cartId="123"
          render={() => {
            return null;
          }}
          handleCartAction={handleCartAction}
        />
      );

      wrapper.setState({ couponInput: 'abcd' });
      wrapper.instance().applyCoupon(e);

      expect(SHELL.alert.calledOnce).to.equal(true);
    });
  });
});
