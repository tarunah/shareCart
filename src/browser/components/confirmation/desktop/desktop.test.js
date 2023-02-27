import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import ConfirmationComponent from './index';
import {
  OrderConfirmedDesktop,
  PromoOfferDesktop,
  SuccessCTA
} from '../common/CardComponents';
import productData from 'testUtils/confirmationMockData';

describe('New confirmation page test in desktop', () => {
  window.scroll = sinon.spy();

  const props = {
    actionHandlers: {
      showLoader: sinon.spy()
    },
    dataState: {
      data: {
        bountyOrder: {
          storeOrderId: '110807198142022836802'
        },
        profiles: [],
        productData
      },
      confirmationModal: { show: false, params: {} },
      error: null,
      loading: false
    }
  };

  window._checkout_ = {
    ...window._checkout_,
    __myx_deviceData__: { isApp: true }
  };
  window.SHELL = {
    setActivePage: () => {}
  };

  it('if New confirmation comp is loaded properly', () => {
    const wrapper = mount(<ConfirmationComponent {...props} />);

    expect(wrapper.find('.tfc-order-notify').exists()).toEqual(true);
    expect(wrapper.find('.container').exists()).toEqual(true);
    expect(wrapper.find('.cardLayout').exists()).toEqual(true);
    expect(wrapper.find('.cardContainer').exists()).toEqual(true);
    expect(wrapper.find('.confirmationCardContainer').exists()).toEqual(true);
    expect(
      wrapper.find('.confirmationCardContainer').children().length
    ).toEqual(4);
    expect(
      wrapper
        .find('.confirmationCardContainer')
        .children()
        .at(0)
        .type()
    ).toEqual(OrderConfirmedDesktop);
    expect(
      wrapper
        .find('.confirmationCardContainer')
        .children()
        .at(2)
        .type()
    ).toEqual(PromoOfferDesktop);
    expect(
      wrapper
        .find('.confirmationCardContainer')
        .children()
        .at(3)
        .type()
    ).toEqual(SuccessCTA);
  });
});
