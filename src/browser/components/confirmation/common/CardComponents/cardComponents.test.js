import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import ScratchCardPopup from '../RewardsModule/index';
import ScratchCardBanner from './components/ScratchCardBanner';
import {
  ContinueShopping,
  MoreBelow,
  Rating,
  PromoOffer,
  FitAssist,
  TrackOrders,
  viewOrdersTriggerEvent,
  InsiderSuperCoinWidget,
  OrderConfirmedDesktop,
  OrderPlacedAsPOD,
  ItemsPaid,
  WaitingForPayment,
  PaymentPendingNote,
  PaymentSuccessful,
  TotalPayable,
  UpdatesSent,
  SuccessCTA,
  PayAtConvenience,
  ViewOrder
} from '.';

import BannerConfigManager from 'commonUtils/BannerConfigManager';
import { confirmationScreenTypes as screenTypes } from 'commonUtils/constants';
import FeaturesManager from 'commonUtils/FeaturesManager';

import { waitFor, render } from '@testing-library/react';
import Confetti from 'commonComp/Confetti/index';

describe('Card Components Tests', () => {
  it('should check if Morebelow is displayed properly', () => {
    const props = {
      moreBelowClickHandler: sinon.spy()
    };
    const wrapper = shallow(<MoreBelow {...props} />);
    expect(wrapper.find('.seeMoreContainer').exists()).toEqual(true);
    wrapper.find('.seeMoreContainer').simulate('click');
    expect(props.moreBelowClickHandler.callCount).toEqual(1);
  });

  it('should test continueShopping', () => {
    const wrapper = shallow(<ContinueShopping />);
    expect(wrapper.find('.continueShoppingContainer').exists()).toEqual(true);
    expect(wrapper.find('.continueShoppingCaption').exists()).toEqual(true);
    expect(wrapper.find('.continueShoppingCaption').text()).toEqual(
      'Keep creating your wardrobe'
    );
    expect(wrapper.find('.continueShoppingButton').exists()).toEqual(true);
    expect(
      wrapper
        .find('.continueShoppingButton')
        .childAt(0)
        .text()
    ).toEqual('CONTINUE SHOPPING');
  });

  it('should test if PromoOffer is displayed properly', () => {
    window.triggerEvent = sinon.spy();
    const props = {
      showLoader: () => {},
      styleClass: 'styleClass'
    };
    const getKVPairValueStub = sinon.stub(
      BannerConfigManager,
      'getBannerConfigValue'
    );

    getKVPairValueStub.callsFake(() => {
      return {
        enable: true,
        offers: [
          { image: 'image1.png', url: '/url1' },
          { image: 'image2.png', url: '/url2' }
        ]
      };
    });
    const wrapper = shallow(<PromoOffer {...props} />);
    expect(wrapper.find('.styleClass').exists()).toEqual(true);
    expect(wrapper.find('.promoOffer').length).toEqual(2);
    expect(wrapper.find('.promoOfferImage').length).toEqual(2);
    expect(wrapper.find('#promoOffer-0 img').props().src).toEqual('image1.png');
    expect(wrapper.find('#promoOffer-1 img').props().src).toEqual('image2.png');
    expect(wrapper.find('#promoOffer-0 a').props().href).toEqual('/url1');
    expect(wrapper.find('#promoOffer-1 a').props().href).toEqual('/url2');

    wrapper.find('#promoOffer-1').simulate('click');
    expect(window.triggerEvent.callCount).toEqual(1);
  });

  it('should test TrackOrders is displayed properly', async () => {
    window.triggerEvent = sinon.spy();
    const props = {
      styleClass: 'styleClass',
      dataState: {
        data: {
          bountyOrder: {
            storeOrderId: '1234'
          }
        }
      }
    };
    const wrapper = render(<TrackOrders {...props} />);
    await waitFor(() => wrapper.getByText('View Orders'));
    expect(wrapper.getByText('View Orders').getAttribute('href')).toMatch(
      /1234/i
    );
  });

  it('should test viewOrdersTriggerEvent', () => {
    window.triggerEvent = sinon.spy();
    viewOrdersTriggerEvent();
    expect(window.triggerEvent.callCount).toEqual(1);
  });

  it('should test Rating is displayed properly', async () => {
    FeaturesManager.isFeatureEnabled = () => false;
    const props = {
      styleClass: 'styleClass',
      dataState: {
        data: {
          bountyOrder: {
            storeOrderId: '1234'
          }
        }
      }
    };
    const wrapper = render(<Rating {...props} />);
    await waitFor(() =>
      wrapper.getByText('Would you like to spread some love?')
    );
  });

  it('should test FitAssist', () => {
    const props = {
      renderFitAssist: true,
      animateStyleInfoCard: sinon.spy(),
      styleClass: 'styleClass',
      actionHandlers: {
        handleConfirmationAction: sinon.spy()
      },
      dataState: {
        data: {
          productData: {
            skus: [],
            taggableProductsCount: 0,
            styles: []
          },
          bountyOrder: {
            storeOrderId: '1234'
          }
        }
      }
    };
    const wrapper = shallow(<FitAssist {...props} />);
    expect(wrapper.text()).toEqual('<FitAssistModule />');
  });

  it('should test InsiderSuperCoinWidget', () => {
    FeaturesManager.isFeatureEnabled = () => true;
    const wrapper = shallow(<InsiderSuperCoinWidget />);
    expect(wrapper.text()).toEqual('<InsiderSuperCoinWidget />');
  });

  it('should test OrderConfirmedDesktop', () => {
    const wrapper = shallow(<OrderConfirmedDesktop />);
    expect(wrapper.find('.desktopStatusCardContainer').length).toEqual(1);
    expect(wrapper.find('.confirmTick').length).toEqual(1);
    expect(wrapper.find('.desktopStatusCardHeading').text()).toEqual(
      'Order confirmed'
    );
    expect(wrapper.find('.desktopStatusCardDesc').text()).toEqual(
      'Your order is confirmed. You will receive an order confirmation email/SMS shortly with the expected delivery date for your items.'
    );
  });

  it('should test ItemsPaid', async () => {
    const props = {
      dataState: {
        data: {
          bountyOrder: { storeOrderId: '123' },
          productData: {
            styles: [
              {
                brandName: 'Nike',
                productDisplayName: 'Shoes'
              },
              {
                brandName: 'HRX',
                productDisplayName: 'Shirt'
              }
            ]
          }
        }
      }
    };
    window.SHELL = { alert: () => {} };
    const wrapper = render(<ItemsPaid {...props} />);
    await waitFor(() =>
      expect(
        wrapper.getByTestId('confirmation-itemspaid').getAttribute('class')
      ).toContain('subcardContainer')
    );
    wrapper.getByText('Paid of 2 items');
    wrapper.getByText('Order ID # 123');
    expect(wrapper.queryAllByTestId('confirmation-itemsList').length).toEqual(
      2
    );
  });

  it('should test WaitingForPayment', async () => {
    const wrapper = render(<WaitingForPayment />);
    await waitFor(() =>
      expect(wrapper.getByTestId('waitingForPaymentContainer')).toBeTruthy()
    );
    wrapper.getByText('Waiting for payment confirmation');
    wrapper.getByText(
      'We are confirming payment status with your bank. It may take upto 20 minutes. In case you were not able to complete the payment, you can retry the payment now.'
    );
    wrapper.getByText('CANCEL ORDER');
    wrapper.getByText('RETRY PAYMENT');
  });

  it('should test PaymentPendingNote', async () => {
    const wrapper = render(<PaymentPendingNote />);
    await waitFor(() =>
      expect(
        wrapper.getByTestId('paymentPendingNote').getAttribute('class')
      ).toContain('subcardContainer')
    );
    wrapper.getByText('Please Note');
    wrapper.getByText(
      'If your payment fails, your order will be placed as pay on delivery. You can pay online using Pay Now option from orders or you can pay at the time of delivery through cash or UPI app.'
    );
  });

  it('should test OrderPlacedAsPOD', async () => {
    const props = {
      actionHandlers: {
        retryPayment: () => {}
      }
    };
    FeaturesManager.isFeatureEnabled = () => false;

    const wrapper = render(<OrderPlacedAsPOD {...props} />);
    await waitFor(() =>
      expect(
        wrapper.getByTestId('orderPlacedAsPOD').getAttribute('class')
      ).toContain('statusCardContainer')
    );
    wrapper.getByText('Order placed as');
    wrapper.getByText('Pay On Delivery');

    wrapper.getByText(
      'You can also pay online anytime before the items are out for delivery.'
    );
    wrapper.getByText('CANCEL ORDER');
    wrapper.getByText('RETRY PAYMENT');
  });

  it('should test PaymentSuccessful', async () => {
    window.history.pushState(
      {},
      'mock params',
      '/confirm?orderid=123&type=6&amount=170'
    );
    const props = {
      dataState: {
        data: {
          bountyOrder: { storeOrderId: '123', payments: { amount: 17000 } }
        }
      }
    };
    const wrapper = render(<PaymentSuccessful {...props} />);
    await waitFor(() =>
      expect(
        wrapper.getByTestId('paymentSuccessful').getAttribute('class')
      ).toContain('statusCardContainer')
    );
    wrapper.getByText('Payment successful');
    wrapper.getByText('We have received a payment');
    wrapper.getByText('Rs. 170');
    wrapper.getByText(
      'for your order. You will shortly get a email confirmation for this payment.'
    );
  });

  it('should test TotalPayable', async () => {
    const props = {
      dataState: {
        data: {
          bountyOrder: { storeOrderId: '123', payments: { amount: 17000 } },
          productData: {
            styles: [
              {
                brandName: 'Nike',
                productDisplayName: 'Shoes'
              },
              {
                brandName: 'HRX',
                productDisplayName: 'Shirt'
              }
            ]
          }
        }
      }
    };
    const wrapper = render(<TotalPayable {...props} />);
    await waitFor(() =>
      expect(
        wrapper.getByTestId('totalPayable').getAttribute('class')
      ).toContain('subcardContainer')
    );
    wrapper.getByText('Paying for 2 items');
    wrapper.getByText('₹170');
    expect(wrapper.queryAllByTestId('confirmation-itemsList').length).toEqual(
      2
    );
  });

  it('should test PayAtConvenience', async () => {
    const props = {
      screenType: screenTypes.orderSuccess,
      dataState: {
        data: {
          bountyOrder: {
            payments: {
              method: 'Cash On Delivery'
            }
          }
        }
      }
    };
    window._checkout_ = {
      __myx_features__: {
        'checkout.dope': true
      }
    };
    const wrapper = render(<PayAtConvenience {...props} />);
    await waitFor(() => wrapper.getByText('Now pay at your convenience'));
    wrapper.getByText(
      'Now you can pay online using Pay Now option from orders or you can Pay on Delivery (Cash/UPI).'
    );
  });

  it('should test ViewOrder', async () => {
    const props = {
      dataState: {
        data: {
          productData: {
            styles: []
          },
          bountyOrder: {
            payments: { amount: 10000, aggregateOrderAmount: 11000 }
          }
        }
      }
    };

    const wrapper = render(<ViewOrder {...props} />);
    await waitFor(() => wrapper.getByText('Amount Payable'));
    wrapper.getByText('₹110');
    wrapper.getByText(
      'You can pay online using Pay Now option from orders or you can Pay on Delivery (Cash/UPI).'
    );
  });

  // change
  it('should test UpdatesSent', async () => {
    window._checkout_ = {
      __myx_profile__: {
        mobile: '9090909090',
        email: 'abc@myntra.com'
      }
    };
    const wrapper = render(<UpdatesSent />);
    await waitFor(() =>
      expect(
        wrapper.getByTestId('updatesSent').getAttribute('class')
      ).toContain('subcardContainer')
    );
    wrapper.getByText('Updates sent to');
    wrapper.getByText('9090909090');
    wrapper.getByText('abc@myntra.com');
  });

  it('should test SuccessCTA', () => {
    const wrapper = mount(<SuccessCTA />);
    expect(wrapper.find('.subcardContainer').length).toEqual(1);
    expect(wrapper.find('div.button').length).toEqual(2);
    expect(
      wrapper
        .find('div.button')
        .children()
        .at(0)
        .text()
    ).toEqual('CONTINUE SHOPPING');
    expect(
      wrapper
        .find('div.button')
        .children()
        .at(1)
        .text()
    ).toEqual('VIEW ORDER');
  });

  beforeEach(() => {
    FeaturesManager.isFeatureEnabled = () => true;
    window._checkout_ = {
      __myx_growthhack__: {
        scratchCardRetentionConfig: {}
      }
    };
    window.triggerEvent = sinon.spy();
  });

  let scratchCardBannerProps = {
    isEligibleForCard: { isEligible: true, scratchCardId: 1 },
    eligibilityAPILoaded: true,
    actionHandlers: {
      claimReward: () => {}
    }
  };

  it('should check if ScratchCardBanner is displayed properly', () => {
    FeaturesManager.isFeatureEnabled = () => true;
    const wrapper = mount(<ScratchCardBanner {...scratchCardBannerProps} />);
    expect(wrapper.find('.scratchCardBanner').exists()).toEqual(true);
  });

  it('should check if ScratchCardPopup is visible after clicking on the banner', () => {
    FeaturesManager.isFeatureEnabled = () => true;
    const wrapper = mount(<ScratchCardBanner {...scratchCardBannerProps} />);
    wrapper.find('.scratchCardBanner img').simulate('click');
    expect(wrapper.find(ScratchCardPopup).exists()).toEqual(true);
  });

  it('should check if ScratchCardBanner is not displayed when feature is disabled', () => {
    FeaturesManager.isFeatureEnabled = () => false;
    const wrapper = mount(<ScratchCardBanner {...scratchCardBannerProps} />);
    expect(wrapper.find('.scratchCardBanner').exists()).toEqual(false);
  });

  it('should check if ScratchCardBanner is not displayed when user is not eligible', () => {
    scratchCardBannerProps = {
      ...scratchCardBannerProps,
      isEligibleForCard: { isEligible: false, scratchCardId: null },
      eligibilityAPILoaded: true
    };
    const wrapper = shallow(<ScratchCardBanner {...scratchCardBannerProps} />);
    expect(wrapper.find('.scratchCardBanner').exists()).toEqual(false);
  });

  it('should check Confetti functionality', async () => {
    jest.useFakeTimers();
    const wrapper = mount(<ScratchCardBanner {...scratchCardBannerProps} />);
    setTimeout(() => {
      expect(wrapper.find(Confetti).exists()).toEqual(true);
    }, 2500);
    setTimeout(() => {
      expect(wrapper.find(Confetti).exists()).toEqual(false);
    }, 5500);
  });

  it('should check if ScratchCardPopup is visible initially', () => {
    jest.useFakeTimers();
    const wrapper = shallow(<ScratchCardBanner {...scratchCardBannerProps} />);
    setTimeout(() => {
      expect(wrapper.find(ScratchCardPopup).exists()).toEqual(true);
    }, 4000);
  });
});
