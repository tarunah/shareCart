import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';

import SaveCardConsent from './index';

describe('Save Card Consent', () => {
  const cardType = 'VISA';
  const toggleShowConsentFn = sinon.spy();
  const showSaveCardConsent = true;
  const saveCardConsentClickFn = sinon.spy();
  const mockData = {
    allowedCards: {
      VISA: true,
      MASTERCARD: true
    },
    button: {
      consentGiven: 'Secure & Pay Swapnil',
      consentNotGiven: 'No, Ask me later'
    },
    header: 'Secure Your Card With <cardType>',
    caption:
      'As per RBI guidelines we need to add an additional layer to secure your card. Agreeing to this means:',
    bulletin: [
      'Securing your card and avoiding unauthorised use',
      'Avoiding entering card details everytime you transact on Myntra using your card'
    ],
    faq: {
      text: 'Faq',
      link: {
        text: 'FAQs',
        url: 'blabla/bla/bla'
      }
    },
    tnc: {
      text: 'tnc',
      link: {
        text: 'Terms & Conditions',
        url: '/bal/bla/bla'
      }
    }
  };
  beforeEach(() => {
    window.triggerEvent = sinon.spy();
    window._checkout_ = {
      __myx_kvpairs__: {
        savedCardConsent: mockData
      }
    };
  });
  it('should show imageContainer', () => {
    const wrapper = mount(
      <SaveCardConsent
        cardType={cardType}
        toggleShowConsentFn={toggleShowConsentFn}
        showConsent={showSaveCardConsent}
        onConsentClickFn={saveCardConsentClickFn}
      />
    );
    expect(wrapper.find('.imageContainer').exists()).toBe(true);
  });

  it('should show header', () => {
    const wrapper = mount(
      <SaveCardConsent
        cardType={cardType}
        toggleShowConsentFn={toggleShowConsentFn}
        showConsent={showSaveCardConsent}
        onConsentClickFn={saveCardConsentClickFn}
      />
    );
    expect(wrapper.find('.header').exists()).toBe(true);
  });

  it('should show caption', () => {
    const wrapper = mount(
      <SaveCardConsent
        cardType={cardType}
        toggleShowConsentFn={toggleShowConsentFn}
        showConsent={showSaveCardConsent}
        onConsentClickFn={saveCardConsentClickFn}
      />
    );
    expect(wrapper.find('.caption').exists()).toBe(true);
  });

  it('should show bulletinList', () => {
    const wrapper = mount(
      <SaveCardConsent
        cardType={cardType}
        toggleShowConsentFn={toggleShowConsentFn}
        showConsent={showSaveCardConsent}
        onConsentClickFn={saveCardConsentClickFn}
      />
    );
    expect(wrapper.find('.bulletinList').exists()).toBe(true);
  });

  it('should show Faq', () => {
    const wrapper = mount(
      <SaveCardConsent
        cardType={cardType}
        toggleShowConsentFn={toggleShowConsentFn}
        showConsent={showSaveCardConsent}
        onConsentClickFn={saveCardConsentClickFn}
      />
    );
    expect(wrapper.find('.faq').exists()).toBe(true);
  });

  it('should show tnc', () => {
    const wrapper = mount(
      <SaveCardConsent
        cardType={cardType}
        toggleShowConsentFn={toggleShowConsentFn}
        showConsent={showSaveCardConsent}
        onConsentClickFn={saveCardConsentClickFn}
      />
    );
    expect(wrapper.find('.tnc').exists()).toBe(true);
  });
});
