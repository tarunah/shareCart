import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import GiftCardModal from './';

describe('GiftCard option', () => {
  window.SHELL = {
    alert: () => {}
  };
  window.triggerEvent = () => {};
  it('displays the giftcard form', () => {
    const wrapper = mount(
      <GiftCardModal
        mode="desktop"
        instrumentData={{ code: 3000 }}
        handlePaymentAction={() => {}}
        refreshPageData={() => {}}
        updateStickyButton={() => {}}
      />
    );

    expect(wrapper.find('.heading').text()).toEqual('Apply Gift Card');
    expect(wrapper.find('input#gcNumber').length).toBe(1);
    expect(wrapper.find('input#gcPin').length).toBe(1);
    expect(wrapper.find('div.addButton').length).toBe(1);
  });

  it('should display error messages', () => {
    const handlePaymentActionMock = sinon.spy();
    const refreshPageDataMock = sinon.spy();
    const wrapper = mount(
      <GiftCardModal
        mode="desktop"
        instrumentData={{ code: 3000 }}
        handlePaymentAction={handlePaymentActionMock}
        refreshPageData={refreshPageDataMock}
        updateStickyButton={() => {}}
      />
    );

    wrapper.find('div.addButton').simulate('click');
    expect(wrapper.find('.errorMessage').length).toBe(2);
  });

  it('should not display error messages and handlePaymentAction is called', () => {
    const handlePaymentActionMock = sinon.spy();
    const refreshPageDataMock = sinon.spy();
    const wrapper = mount(
      <GiftCardModal
        mode="desktop"
        instrumentData={{ code: 3000 }}
        handlePaymentAction={handlePaymentActionMock}
        refreshPageData={refreshPageDataMock}
        updateStickyButton={() => {}}
      />
    );

    wrapper
      .find('input#gcNumber')
      .get(0)
      .props.onChange({
        currentTarget: { id: 'gcNumber', value: '6001227890123456' }
      });
    wrapper
      .find('input#gcPin')
      .get(0)
      .props.onChange({ currentTarget: { id: 'gcPin', value: '123456' } });

    wrapper.find('div.addButton').simulate('click');
    expect(wrapper.find('.errorMessage').length).toBe(0);

    expect(handlePaymentActionMock).toHaveProperty('callCount', 1);
  });

  it('refreshPageData is called', () => {
    const handlePaymentActionMock = (action, data, options, scb) => {
      scb();
    };
    const refreshPageDataMock = sinon.spy();
    const wrapper = mount(
      <GiftCardModal
        mode="desktop"
        instrumentData={{ code: 3000 }}
        handlePaymentAction={handlePaymentActionMock}
        refreshPageData={refreshPageDataMock}
        updateStickyButton={() => {}}
        cancelCallback={() => {}}
      />
    );

    wrapper
      .find('input#gcNumber')
      .get(0)
      .props.onChange({
        currentTarget: { id: 'gcNumber', value: '6001227890123456' }
      });
    wrapper
      .find('input#gcPin')
      .get(0)
      .props.onChange({ currentTarget: { id: 'gcPin', value: '123456' } });

    wrapper.find('div.addButton').simulate('click');

    expect(refreshPageDataMock).toHaveProperty('callCount', 1);
  });

  it('should render the error message for giftcard payment option', () => {
    window._checkout_ = {
      __myx_kvpairs__: {
        'payment.options.error': {
          3015: 'Gift Card not applicable for {sellers}'
        }
      }
    };

    const wrapper = mount(
      <GiftCardModal
        mode="desktop"
        instrumentData={{
          code: 3015,
          paymentInstrumentDetails: { data: [{ sellers: 'TITAN, BlueStone' }] }
        }}
        handlePaymentAction={() => {}}
        refreshPageData={() => {}}
        updateStickyButton={() => {}}
      />
    );

    expect(wrapper.find('.errorBlock .desc').text()).toBe(
      'Gift Card not applicable for TITAN, BlueStone'
    );
  });

  it('should display error messages when gc Number prefix is wrong', () => {
    const handlePaymentActionMock = sinon.spy();
    const refreshPageDataMock = sinon.spy();
    const wrapper = mount(
      <GiftCardModal
        mode="desktop"
        instrumentData={{ code: 3000 }}
        handlePaymentAction={handlePaymentActionMock}
        refreshPageData={refreshPageDataMock}
        updateStickyButton={() => {}}
      />
    );

    wrapper
      .find('input#gcNumber')
      .get(0)
      .props.onChange({
        currentTarget: { id: 'gcNumber', value: '1234567890123456' }
      });
    wrapper
      .find('input#gcPin')
      .get(0)
      .props.onChange({ currentTarget: { id: 'gcPin', value: '123456' } });

    wrapper.find('div.addButton').simulate('click');
    expect(wrapper.find('.errorMessage').length).toBe(1);
  });
});
