import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import ConfirmationComponent from './index';
import {
  ContinueShopping,
  FitAssist,
  A2HS,
  PromoOffer,
  ExchangeInfoWidget,
  Footer,
  DeliveryDetailsWidget,
  NotifWidget,
  PayAtConvenience
} from '../common/CardComponents';
import SuccessAnimation from '../common/SuccessAnimation';
import productData from 'testUtils/confirmationMockData';
import { ScratchCardBanner } from '../common/CardComponents';

describe('New confirmation page test in mobile', () => {
  window.scroll = sinon.spy();

  const props = {
    actionHandlers: {
      showLoader: sinon.spy(),
      createScratchCard: sinon.spy()
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
    __myx_ab__: { 'confirmation.redesign': 'modularscratch' },
    __myx_deviceData__: { isApp: true }
  };

  it('if New confirmation comp is loaded properly', () => {
    const wrapper = mount(<ConfirmationComponent {...props} />);

    expect(wrapper.contains(<SuccessAnimation />)).toEqual(true);
    expect(wrapper.find('.tfc-order-notify').exists()).toEqual(true);
    expect(wrapper.find('.confirmationCardContainer').exists()).toEqual(true);
    expect(wrapper.find('.confirmationCard').exists()).toEqual(true);
    expect(
      wrapper.find('.confirmationCardContainer').children().length
    ).toEqual(11);
    expect(
      wrapper
        .find('.confirmationCardContainer')
        .children()
        .at(0)
        .type()
    ).toEqual(ScratchCardBanner);
    expect(
      wrapper
        .find('.confirmationCardContainer')
        .children()
        .at(1)
        .type()
    ).toEqual(PromoOffer);
    expect(
      wrapper
        .find('.confirmationCardContainer')
        .children()
        .at(2)
        .type()
    ).toEqual(DeliveryDetailsWidget);
    expect(
      wrapper
        .find('.confirmationCardContainer')
        .children()
        .at(7)
        .type()
    ).toEqual(NotifWidget);
    expect(
      wrapper
        .find('.confirmationCardContainer')
        .children()
        .at(3)
        .type()
    ).toEqual(FitAssist);
    expect(
      wrapper
        .find('.confirmationCardContainer')
        .children()
        .at(4)
        .type()
    ).toEqual(ExchangeInfoWidget);
    expect(
      wrapper
        .find('.confirmationCardContainer')
        .children()
        .at(8)
        .type()
    ).toEqual(A2HS);
    expect(
      wrapper
        .find('.confirmationCardContainer')
        .children()
        .at(9)
        .type()
    ).toEqual(ContinueShopping);
    expect(
      wrapper
        .find('.confirmationCardContainer')
        .children()
        .at(10)
        .type()
    ).toEqual(Footer);
  });

  it('should test moreBelowClickHandler', () => {
    window.scroll = sinon.spy();
    const wrapper = shallow(<ConfirmationComponent {...props} />);
    wrapper.instance().moreBelowClickHandler();
    expect(window.scroll.callCount).toEqual(2);
    expect(wrapper.state()).toEqual({
      showMoreBelow: false
    });
  });
});
