import React from 'react';
import { render, mount } from 'enzyme';
import sinon from 'sinon';
import ConfirmationPage, { getCustomEvents } from './';
import productData, { bountyOrder } from 'testUtils/confirmationMockData';
import ConfirmationManager from 'commonBrowserUtils/ConfirmationManager';
import { localStorageKeys } from 'commonUtils/constants';

describe('Confirmation Page', () => {
  const history = {
    push: () => {},
    back: () => {},
    location: { path: '', search: '' }
  };
  beforeEach(() => {
    window.SHELL = { setActivePage: () => {}, alert: () => {} };
    window._checkout_ = {
      __myx_ab__: {},
      __myx_deviceData__: {},
      __myx_data__: null,
      __myx_growthhack__: {
        scratchCardRetentionConfig: {}
      }
    };
  });

  it('should render the confirmation page ', async () => {
    window._checkout_.__myx_data__ = {
      productData,
      bountyOrder,
      profiles: [],
      httpStatus: 200
    };
    const triggerSpy = sinon.spy();
    window.triggerEvent = triggerSpy;
    const analyticsFunc = () => sinon.spy();
    const renderFunc = sinon.spy();
    const getProfile = Promise.resolve({ httpStatus: 200 });
    ConfirmationManager.getProfile = jest.fn(() => getProfile);

    mount(
      <ConfirmationPage
        analytics={analyticsFunc}
        render={renderFunc}
        history={history}
      />
    );

    setTimeout(() => {
      expect(triggerSpy).toHaveProperty('callCount', 3);
      expect(renderFunc).toHaveProperty('callCount', 3);
      expect(renderFunc.getCall(0).args[0].dataState.error).toEqual(null);
      expect(renderFunc.getCall(0).args[0].dataState.data).toEqual(null);
      expect(renderFunc.getCall(0).args[0].dataState.loading).toEqual(false);
      expect(renderFunc.getCall(1).args[0].dataState.error).toEqual(null);
      expect(renderFunc.getCall(2).args[0].dataState.data).toEqual({
        productData,
        bountyOrder,
        profiles: [],
        httpStatus: 200
      });
      expect(renderFunc.getCall(2).args[0].dataState.loading).toEqual(false);
    }, 0);
  });

  it('should render the confirmation page - client call - success', async () => {
    const getPageData = Promise.resolve({
      productData,
      bountyOrder,
      profiles: [],
      httpStatus: 200
    });
    ConfirmationManager.getPageData = jest.fn(() => getPageData);

    const getProfile = Promise.resolve({ httpStatus: 200 });
    ConfirmationManager.getProfile = jest.fn(() => getProfile);
    const triggerSpy = sinon.spy();
    window.triggerEvent = triggerSpy;
    const analyticsFunc = () => sinon.spy();
    const renderFunc = sinon.spy();
    mount(
      <ConfirmationPage
        analytics={analyticsFunc}
        render={renderFunc}
        history={history}
      />
    );

    setTimeout(() => {
      expect(triggerSpy).toHaveProperty('callCount', 3);
      expect(renderFunc).toHaveProperty('callCount', 3);
      expect(renderFunc.getCall(0).args[0].dataState.error).toEqual(null);
      expect(renderFunc.getCall(0).args[0].dataState.data).toEqual(null);
      expect(renderFunc.getCall(0).args[0].dataState.loading).toEqual(false);
      expect(renderFunc.getCall(1).args[0].dataState.error).toEqual(null);
      expect(renderFunc.getCall(2).args[0].dataState.data).toEqual({
        productData,
        bountyOrder,
        profiles: [],
        httpStatus: 200
      });
      expect(renderFunc.getCall(2).args[0].dataState.loading).toEqual(false);
    }, 0);
  });

  it('should render the cart page - client call - error', async () => {
    const getPageData = Promise.reject({ httpStatus: 500, message: 'Error' });
    ConfirmationManager.getPageData = jest.fn(() => getPageData);

    const getProfile = Promise.reject({ httpStatus: 500, message: 'Error' });
    ConfirmationManager.getProfile = jest.fn(() => getProfile);
    const triggerSpy = sinon.spy();
    window.triggerEvent = triggerSpy;
    const analyticsFunc = () => sinon.spy();
    const renderFunc = sinon.spy();
    mount(
      <ConfirmationPage
        analytics={analyticsFunc}
        render={renderFunc}
        history={history}
      />
    );

    setTimeout(() => {
      expect(triggerSpy).toHaveProperty('callCount', 0);
      expect(renderFunc).toHaveProperty('callCount', 3);
      expect(renderFunc.getCall(0).args[0].dataState.error).toEqual(null);
      expect(renderFunc.getCall(0).args[0].dataState.data).toEqual(null);
      expect(renderFunc.getCall(0).args[0].dataState.loading).toEqual(false);
      expect(renderFunc.getCall(2).args[0].dataState.error.message).toEqual(
        'Error'
      );
      expect(renderFunc.getCall(2).args[0].dataState.data).toEqual(null);
      expect(renderFunc.getCall(2).args[0].dataState.loading).toEqual(false);
    }, 0);
  });

  it('should return custom events', () => {
    window._checkout_.__myx_data__ = {
      productData,
      bountyOrder,
      httpStatus: 200
    };
    window.MyntApp = {
      mynacoSendEventV1: () => {}
    };

    const customEvents = {
      events: [
        'Acquisition',
        'af_purchase',
        'af_acquisition_men',
        'af_acquisition_women'
      ]
    };
    const customEventsWithValues = {
      events: [
        {
          eventType: 'Acquisition',
          category: 'acquisition',
          eventValues: [
            { key: 'af_content_type', value: 'product' },
            {
              key: 'af_content',
              value: JSON.stringify([{ id: 355130, quantity: 2 }])
            },
            { key: 'af_user_name', value: '' },
            { key: 'af_first_name', value: '' },
            { key: 'af_product_gender', value: ['Unisex'] },
            { key: 'af_order_id', value: '' },
            { key: 'af_revenue', value: 22.384 },
            { key: 'af_content_id_list', value: [355130] },
            { key: 'af_content_list', value: ['Nike'] },
            { key: 'af_quantity_list', value: [2] },
            { key: 'af_cust_id', value: '' },
            { key: 'af_receipt_id', value: '' },
            { key: 'af_revenue_list', value: [22.384] },
            { key: 'af_content_type_list', value: ['Accessories'] },
            {
              key: 'af_product_info_list',
              value: ['Nike Navy Blue Brasilia 6 Large    Training  Duffle Bag']
            }
          ]
        },
        {
          eventType: 'af_purchase',
          category: 'purchase',
          eventValues: [
            { key: 'af_content_type', value: 'product' },
            {
              key: 'af_content',
              value: JSON.stringify([{ id: 355130, quantity: 2 }])
            },
            { key: 'af_user_name', value: '' },
            { key: 'af_first_name', value: '' },
            { key: 'af_product_gender', value: ['Unisex'] },
            { key: 'af_order_id', value: '' },
            { key: 'af_revenue', value: 22.384 },
            { key: 'af_content_id_list', value: [355130] },
            { key: 'af_content_list', value: ['Nike'] },
            { key: 'af_quantity_list', value: [2] },
            { key: 'af_cust_id', value: '' },
            { key: 'af_receipt_id', value: '' },
            { key: 'af_revenue_list', value: [22.384] },
            { key: 'af_content_type_list', value: ['Accessories'] },
            {
              key: 'af_product_info_list',
              value: ['Nike Navy Blue Brasilia 6 Large    Training  Duffle Bag']
            }
          ]
        },
        {
          eventType: 'af_acquisition_men',
          category: 'acquisition',
          eventValues: [
            { key: 'af_content_type', value: 'product' },
            {
              key: 'af_content',
              value: JSON.stringify([{ id: 355130, quantity: 2 }])
            },
            { key: 'af_user_name', value: '' },
            { key: 'af_first_name', value: '' },
            { key: 'af_product_gender', value: ['Unisex'] },
            { key: 'af_order_id', value: '' },
            { key: 'af_revenue', value: 22.384 },
            { key: 'af_content_id_list', value: [355130] },
            { key: 'af_content_list', value: ['Nike'] },
            { key: 'af_quantity_list', value: [2] },
            { key: 'af_cust_id', value: '' },
            { key: 'af_receipt_id', value: '' },
            { key: 'af_revenue_list', value: [22.384] },
            { key: 'af_content_type_list', value: ['Accessories'] },
            {
              key: 'af_product_info_list',
              value: ['Nike Navy Blue Brasilia 6 Large    Training  Duffle Bag']
            }
          ]
        },
        {
          eventType: 'af_acquisition_women',
          category: 'acquisition',
          eventValues: [
            { key: 'af_content_type', value: 'product' },
            {
              key: 'af_content',
              value: JSON.stringify([{ id: 355130, quantity: 2 }])
            },
            { key: 'af_user_name', value: '' },
            { key: 'af_first_name', value: '' },
            { key: 'af_product_gender', value: ['Unisex'] },
            { key: 'af_order_id', value: '' },
            { key: 'af_revenue', value: 22.384 },
            { key: 'af_content_id_list', value: [355130] },
            { key: 'af_content_list', value: ['Nike'] },
            { key: 'af_quantity_list', value: [2] },
            { key: 'af_cust_id', value: '' },
            { key: 'af_receipt_id', value: '' },
            { key: 'af_revenue_list', value: [22.384] },
            { key: 'af_content_type_list', value: ['Accessories'] },
            {
              key: 'af_product_info_list',
              value: ['Nike Navy Blue Brasilia 6 Large    Training  Duffle Bag']
            }
          ]
        }
      ]
    };

    expect(getCustomEvents({ productData, bountyOrder })).toEqual(customEvents);

    window.MyntApp.mynacoSendEventV2 = () => {};

    expect(getCustomEvents({ productData, bountyOrder })).toEqual(
      customEventsWithValues
    );

    window.MyntApp = undefined;
    window.webkit = {
      messageHandlers: {
        mynacoSendEventV1: {
          postMessage: () => {}
        }
      }
    };

    expect(getCustomEvents({ productData, bountyOrder })).toEqual(customEvents);

    window.webkit.messageHandlers.mynacoSendEventV2 = { postMessage: () => {} };

    expect(getCustomEvents({ productData, bountyOrder })).toEqual(
      customEventsWithValues
    );
  });

  it('should reset local storage keys "payment_tried_count" and "payment_mode_attributes" if payment failure feature is enabled', () => {
    const triggerSpy = sinon.spy();
    window.triggerEvent = triggerSpy;
    const analyticsFunc = () => sinon.spy();
    const renderFunc = sinon.spy();
    window._checkout_.__myx_ab__['payment.failure'] = 'enabled';
    window._checkout_.__myx_deviceData__ = {
      isApp: true
    };
    localStorage.setItem(localStorageKeys.PAYMENT_TRIED_COUNT, '1');
    localStorage.setItem(
      localStorageKeys.PAYMENT_MODE_ATTRIBUTES,
      '{"paymentMode":"netbanking","paymentModeName":"netbanking","modeAttributes":{"paymentProviderId":1}}'
    );

    mount(<ConfirmationPage analytics={analyticsFunc} render={renderFunc} />);

    const cachedPaymentCount = +localStorage.getItem(
      localStorageKeys.PAYMENT_TRIED_COUNT
    );
    const cachedModeAttributes = localStorage.getItem(
      localStorageKeys.PAYMENT_MODE_ATTRIBUTES
    );
    expect(cachedPaymentCount).toEqual(0);
    expect(cachedModeAttributes).toEqual(null);
  });
});
