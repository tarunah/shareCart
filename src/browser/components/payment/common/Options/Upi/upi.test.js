import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import Upi from '.';
import PaymentsManager from 'commonBrowserUtils/PaymentsManager';

const props = {
  paymentOptions: {
    csrfToken: 'testToken'
  },
  cartData: {
    id: 'testCartId1'
  },
  instrumentData: {
    type: 'upi',
    message: 'Instrument is Eligible',
    code: 3000,
    paymentInstrumentDetails: {
      lowSROptions: null,
      paymentUrl:
        'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow',
      data: [
        {
          id: 67,
          bankCode: 'PhonePe',
          name: 'PhonePe',
          defaultBank: false,
          popular: true,
          lowSuccessRate: true
        },
        {
          id: 68,
          bankCode: 'OtherUPI',
          name: 'Other UPI',
          defaultBank: false,
          popular: true,
          lowSuccessRate: false
        }
      ]
    }
  },
  updateBankDiscount(bankDiscount) {}
};

describe('UPI payment option', () => {
  beforeEach(() => {
    window._checkout_ = {
      __myx_profile__: {
        uidx: 'testUser1'
      }
    };
  });
  window.triggerEvent = () => {};

  it('should render UPI option - desktop', () => {
    const wrapper = mount(
      <Upi {...props} deviceMode="desktop" setLoader={sinon.spy()} />
    );

    expect(wrapper.find('.heading').text()).toEqual('Pay using UPI');
    expect(wrapper.find('.radioContainer').length).toEqual(2);
    expect(wrapper.find('RadioInActive.radioIcon').length).toBe(2);
    expect(wrapper.find('.sprite-logo-phonepe').length).toBe(1);
    expect(wrapper.find('.sprite-logo-otherupi').length).toBe(1);
    expect(wrapper.find('.radioContainer#upiApp-67').text()).toContain(
      'PhonePe'
    );
    expect(wrapper.find('.radioContainer#upiApp-68').text()).toContain(
      'Other UPI'
    );

    wrapper.find('.radioContainer#upiApp-68').simulate('click');

    expect(wrapper.find('VPAField').length).toEqual(1);
    expect(wrapper.find('.vpaField .error').length).toEqual(0);
    expect(wrapper.find('.saveUpiBlock').length).toEqual(0);
  });

  it('should render UPI option - mobile', () => {
    const wrapper = mount(
      <Upi {...props} deviceMode="mobile" setLoader={sinon.spy()} />
    );

    expect(wrapper.find('.radioContainer').length).toEqual(2);
    expect(wrapper.find('RadioInActive.radioIcon').length).toBe(2);
    expect(wrapper.find('.sprite-logo-phonepe').length).toBe(1);
    expect(wrapper.find('.sprite-logo-otherupi').length).toBe(1);
    expect(wrapper.find('.radioContainer#upiApp-67').text()).toContain(
      'PhonePe'
    );
    expect(wrapper.find('.radioContainer#upiApp-68').text()).toContain(
      'Other UPI'
    );

    wrapper.find('.radioContainer#upiApp-68').simulate('click');

    expect(wrapper.find('VPAField').length).toEqual(1);
    expect(wrapper.find('.vpaField .error').length).toEqual(0);
    expect(wrapper.find('.saveUpiBlock').length).toEqual(0);
  });

  it('should call validateVPA', () => {
    const setLoader = (loading, callback) => callback && callback();
    const wrapper = mount(
      <Upi {...props} setLoader={setLoader} updateStickyButton={() => {}} />
    );

    const validateVPA = sinon.spy();
    PaymentsManager.validateVPA = validateVPA;
    expect(wrapper.instance().getValidity().message).toBe(
      'Select a payment option to place order.'
    );
    wrapper.instance().selectApp('upiApp-68');
    wrapper.instance().onInputChange({ currentTarget: { value: 'abc' } });

    wrapper.instance().toggleCheckbox();
    expect(wrapper.state().saveCheck).toBe(false);
    wrapper.find('button[id="action-upi"]').simulate('click');

    expect(validateVPA).toHaveProperty('callCount', 1);
  });

  it('should show error when validateVPA fails', () => {
    const setLoader = (loading, callback) => callback && callback();
    const wrapper = mount(
      <Upi {...props} setLoader={setLoader} updateStickyButton={() => {}} />
    );

    PaymentsManager.validateVPA = (vpa, scb, ecb) =>
      ecb({ message: 'Invalid UPI' });
    wrapper.instance().selectApp('upiApp-68');
    wrapper.instance().toggleSaveInfo();
    wrapper.instance().toggleHandles();
    wrapper.instance().onInputChange({ currentTarget: { value: '' } });
    wrapper.find('button[id="action-upi"]').simulate('click');
    expect(wrapper.state().error).toEqual('Please enter UPI ID');

    wrapper.instance().selectApp('upiApp-68');
    wrapper.instance().toggleSaveInfo();
    wrapper.instance().toggleHandles();
    wrapper.instance().onInputChange({ currentTarget: { value: 'abc' } });
    wrapper.find('button[id="action-upi"]').simulate('click');
    expect(wrapper.state().error).toEqual('Invalid UPI');
  });

  describe('PaynowAjax ', () => {
    beforeEach(() => {
      window._checkout_ = {
        __myx_profile__: {
          uidx: 'testUser1'
        }
      };
    });

    it('should select upi app', () => {
      const wrapper = mount(
        <Upi {...props} deviceMode="mobile" setLoader={() => {}} />
      );
      wrapper.find('.radioContainer#upiApp-67').simulate('click');
      const payNowObject = wrapper
        .find('PayNowAjax')
        .instance()
        .getPayload();
      expect(payNowObject['paymentProviderId']).toEqual('67');
    });

    it('when phonpeupi is selected, pm should be upi', () => {
      const wrapper = mount(
        <Upi {...props} deviceMode="mobile" setLoader={() => {}} />
      );

      wrapper.find('.radioContainer#upiApp-67').simulate('click');
      const payNowObject = wrapper
        .find('PayNowAjax')
        .instance()
        .getPayload();
      expect(payNowObject['paymentMethods']).toEqual('upi');
    });

    it('should submit the pay now data with right attributes', () => {
      const wrapper = mount(<Upi {...props} setLoader={() => {}} />);

      const payNowObject = wrapper
        .find('PayNowAjax')
        .instance()
        .getPayload();
      expect(payNowObject['csrf']).toEqual('testToken');
      expect(payNowObject['cartContext']).toEqual('default');
      expect(payNowObject['cartId']).toEqual('testCartId1');
      expect(payNowObject['clientContext']).toEqual('responsive');
      expect(payNowObject['paymentMethods']).toEqual('upi');
      expect(payNowObject['profile']).toEqual('localhost');

      expect(payNowObject['xMetaApp']).toEqual('deviceID=');
    });
  });

  it('should show lowSR messageV2 when lowSuccessRate is true, it is selecteda and disable is false', () => {
    window._checkout_ = {
      __myx_kvpairs__: {
        'checkout.lowSR.messages': {
          lowSuccessRate: 'is currently facing low success rate.',
          highFailureRate: 'is currently facing high failure rate.'
        }
      }
    };
    const wrapper = mount(
      <Upi {...props} deviceMode="mobile" setLoader={() => {}} />
    );
    expect(wrapper.find('LowSRMessage .lowSRMessage').exists()).toBeFalsy();
    wrapper.find('.radioContainer#upiApp-67').simulate('click');
    expect(wrapper.find('LowSRMessage .lowSRMessage').text()).toEqual(
      `PhonePe is currently facing low success rate.`
    );
    //enabled
    expect(wrapper.find('[className~="disabledName"]').length).toEqual(0);
  });

  it('should show lowSR messageV2 and disable when disable is true(irrespective of selection) lowSuccessRate should be true', () => {
    window._checkout_ = {
      __myx_kvpairs__: {
        'checkout.lowSR.messages': {
          lowSuccessRate: 'is currently facing low success rate.',
          highFailureRate: 'is currently facing high failure rate.'
        }
      }
    };
    props.instrumentData.paymentInstrumentDetails.data[0].disable = true;
    const wrapper = mount(
      <Upi {...props} deviceMode="mobile" setLoader={() => {}} />
    );

    expect(wrapper.find('LowSRMessage .lowSRMessage').text()).toEqual(
      `PhonePe is currently facing high failure rate.`
    );

    //disabled
    expect(wrapper.find('[className~="disabledName"]').length).toEqual(1);
  });
});
