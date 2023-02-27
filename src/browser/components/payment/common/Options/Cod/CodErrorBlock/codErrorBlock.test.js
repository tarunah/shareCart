import React from 'react';
import { mount } from 'enzyme';

import CodErrorBlock from './';
import { ReturnAbuserModal } from 'commonComp/ReturnAbuser';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import { props } from 'testUtils/paymentMockData';

describe('COD Error Block', () => {
  const codInstrument = props.paymentOptions.paymentInstrumentDetails.find(
    instrument => instrument.type === 'cod'
  );
  window._checkout_ = {
    __myx_kvpairs__: {
      'payment.options.error': {
        3009: 'We do not offer Cash on delivery',
        3001: 'Instrument not eligible'
      }
    }
  };
  window.triggerEvent = () => {};
  it('should display COD Error with return abuser', () => {
    const wrapper = mount(
      <CodErrorBlock
        code={PaymentConstants.RETURN_ABUSER_CODE}
        paymentInstrumentDetails={codInstrument.paymentInstrumentDetails}
        updateStickyButton={() => {}}
      />
    );

    expect(wrapper.find('.errorBlock .desc').text()).toEqual(
      'We do not offer Cash on delivery'
    );
    expect(wrapper.find('.knowMore').text()).toEqual('Know more');
    expect(wrapper.find(ReturnAbuserModal)).toHaveLength(0);

    const instance = wrapper.instance();
    instance.toggleReturnAbuserModal();
    expect(instance.state.showReturnAbuserModal).toEqual(true);
  });

  it('should display COD Error without return abuser', () => {
    const wrapper = mount(
      <CodErrorBlock
        code={PaymentConstants.INSTRUMENT_NOT_ELIGIBLE_CODE}
        paymentInstrumentDetails={codInstrument.paymentInstrumentDetails}
        updateStickyButton={() => {}}
      />
    );

    expect(wrapper.find('.errorBlock .desc').text()).toEqual(
      'Instrument not eligible'
    );
    expect(wrapper.find('.whyLink').length).toEqual(0);
  });
});
