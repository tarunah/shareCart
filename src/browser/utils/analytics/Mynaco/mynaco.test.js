import getGenericMynacoData from '.';

describe('getGenericMynacoData', () => {
  it('should follow the generic payload structure for ga events', () => {
    const gaData = {
      eventType: 'event',
      category: 'ecommerce',
      action: 'ecommerce',
      label: 'ecommerce'
    };

    const result = getGenericMynacoData({
      gaData,
      screen: 'cart',
      category: 'ecommerce'
    });
    expect(result).toEqual({
      appsflyerPayload: {},
      mynacoPayload: {
        type: 'event',
        label: 'ecommerce',
        url: null,
        isPersistent: true,
        nonInteraction: null,
        nonInteractive: false,
        payload: {
          action: '',
          category: 'ecommerce',
          eventName: '',
          eventType: '',
          label: ''
        },
        category: 'ecommerce',
        action: 'ecommerce',
        screen: {
          data_set: {
            entity_optional_attributes: {}
          },
          name: 'Checkout-cart',
          referer: {},
          variant: 'native'
        },
        referer: {},
        screenName: 'Checkout-cart',
        screen_name: 'Checkout-cart'
      }
    });
  });

  it('should follow the generic payload structure for appsflyers events', () => {
    const mynacoV3Data = {
      customEvents: {
        events: [
          {
            eventType: 'Acquisition',
            category: 'acquisition',
            eventValues: [
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
                value: [
                  'Nike Navy Blue Brasilia 6 Large    Training  Duffle Bag'
                ]
              }
            ]
          }
        ]
      }
    };

    const result = getGenericMynacoData({ mynacoV3Data, screen: 'cart' });
    expect(result).toEqual({
      appsflyerPayload: {
        events: [
          {
            eventType: 'Acquisition',
            category: 'acquisition',
            eventValues: [
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
                value: [
                  'Nike Navy Blue Brasilia 6 Large    Training  Duffle Bag'
                ]
              }
            ]
          }
        ]
      },
      mynacoPayload: {
        action: '',
        category: 'cart',
        isPersistent: true,
        label: '',
        nonInteractive: false,
        payload: {
          action: '',
          category: 'cart',
          eventName: '',
          eventType: '',
          label: ''
        },
        screen: {
          data_set: {
            entity_optional_attributes: {}
          },
          name: 'Checkout-cart',
          variant: 'native',
          referer: {}
        },
        referer: {},
        screenName: 'Checkout-cart',
        screen_name: 'Checkout-cart',
        type: ''
      }
    });
  });

  describe('events testing', () => {
    it('CART_SCREEN_LOAD', () => {
      const props = {
        mynacoV3Data: {
          templateData: {
            widget_items: {
              data_set: {
                data: [
                  {
                    entity_id: 678056,
                    entity_type: 'product',
                    entity_name:
                      'Nike Women Neon Pink AS Gym DFK Sleeveless Training T-shirt',
                    entity_optional_attributes: {
                      inv_count: 10,
                      price: 2495,
                      qty: 1,
                      name:
                        'Nike Women Neon Pink AS Gym DFK Sleeveless Training T-shirt',
                      mrp: 2495,
                      disc: 0,
                      brand: 'Nike',
                      skuId: 4003937
                    }
                  }
                ]
              }
            },
            ecommerce: {
              checkout: {
                options: 'Cart-Load',
                step: 1
              },
              firstOrder: false,
              productListName: '',
              type: 'checkout',
              mProductList: [
                {
                  brand: 'Nike',
                  id: 678056,
                  mrp: 2495,
                  name:
                    'Nike Women Neon Pink AS Gym DFK Sleeveless Training T-shirt',
                  position: -1,
                  price: 2495,
                  quantity: 1,
                  size: {
                    availableQuantity: 10
                  },
                  skuId: 4003937,
                  type: 90
                }
              ],
              storeFrontId: '',
              transaction: ''
            }
          }
        },
        screen: 'checkoutv2-cart',
        type: 'ecommerce-screen-load',
        event: 'ECOMMERCE_SCREEN_LOAD'
      };
      expect(getGenericMynacoData(props)).toEqual({
        appsflyerPayload: {},
        mynacoPayload: {
          contentGroups: [
            {
              '&cg1': 'Checkout'
            }
          ],

          customDimensions: [
            {
              '11': 'LoggedIn'
            },
            {
              '14': 'FeedSession'
            },
            {
              '29': '1.0.0'
            }
          ],
          ecommerce: {
            checkout: {
              options: 'Cart-Load',
              step: 1
            },
            firstOrder: false,
            mProductList: [
              {
                brand: 'Nike',
                id: 678056,
                mrp: 2495,
                name:
                  'Nike Women Neon Pink AS Gym DFK Sleeveless Training T-shirt',
                position: -1,
                price: 2495,
                quantity: 1,
                size: {
                  availableQuantity: 10
                },
                skuId: 4003937,
                type: 90
              }
            ],
            transaction: '',
            storeFrontId: '',
            productListName: '',
            type: 'checkout'
          },
          nonInteractive: false,
          isPersistent: true,
          payload: {
            eventName: 'ScreenLoad',
            eventType: 'screen_load_event'
          },
          screen: {
            data_set: {
              entity_optional_attributes: {},
              entity_id: '',
              entity_type: ''
            },
            referer: {},
            name: 'Checkout-checkoutv2-cart',
            type: '',
            variant: 'native'
          },
          referer: {},
          screenName: 'Checkout-checkoutv2-cart',
          screen_name: 'Checkout-checkoutv2-cart',
          type: 'ecommerce-screen-load',
          widget_items: {
            data_set: {
              data: [
                {
                  entity_optional_attributes: {
                    inv_count: 10,
                    price: 2495,
                    qty: 1,
                    name:
                      'Nike Women Neon Pink AS Gym DFK Sleeveless Training T-shirt',
                    mrp: 2495,
                    disc: 0,
                    brand: 'Nike',
                    skuId: 4003937
                  },
                  entity_id: 678056,
                  entity_name:
                    'Nike Women Neon Pink AS Gym DFK Sleeveless Training T-shirt',
                  entity_type: 'product'
                }
              ]
            }
          }
        }
      });
    });

    it('ADDRESS_SELECTED', () => {
      const props = {
        mynacoV3Data: {
          templateData: {
            id: '6147266',
            isDefault: true,
            checkoutAllowed: true,
            addressType: 'HOME',
            notAvailableDays: [],
            streetAddress:
              'Cumins Estate Genesis, E-407, Survey no 505/1 and 505/2 Kalkare Village, K R Puram Hobli',
            locality: 'Horamavu',
            city: 'Bengaluru',
            pincode: '560043',
            state: {
              code: 'KA',
              name: 'Karnataka'
            },
            country: {
              code: 'IN',
              name: 'India'
            },
            user: {
              uidx: 'automation-857d1765.e26e.4d3f.8d73.1c506feeb243crWfrswZgU',
              name: 'abc',
              email: '',
              mobile: '9971128586'
            }
          },
          gaLabel: '560068'
        },
        gaData: {
          eventType: 'event',
          category: 'address',
          action: 'address-select',
          label: '560068'
        },
        screen: 'address',
        type: 'address-select',
        event: 'ADDRESS_SELECTED'
      };
      expect(getGenericMynacoData(props)).toEqual({
        appsflyerPayload: {},
        mynacoPayload: {
          nonInteraction: null,
          action: 'address-select', //changed
          category: 'address',
          isPersistent: true,
          label: '560068',
          payload: {
            pincode: '560043',
            city: 'Bengaluru',
            addressType: 'HOME',
            locality: 'Horamavu',
            eventType: 'address-select',
            isDefault: true,
            streetAddress:
              'Cumins Estate Genesis, E-407, Survey no 505/1 and 505/2 Kalkare Village, K R Puram Hobli',
            eventName: 'address-select',
            id: {
              value: '6147266'
            },
            checkoutAllowed: true
          },
          screen: {
            data_set: {
              entity_optional_attributes: {}
            },
            name: 'Checkout-address',
            referer: {},
            variant: 'native'
          },
          referer: {},
          screenName: 'Checkout-address',
          screen_name: 'Checkout-address',
          type: 'address-select',
          url: null
        }
      });
    });

    it('CART_FILLER_ADD_TO_CART', () => {
      const props = {
        mynacoV3Data: {
          templateData: {
            category: 'shopping',
            action: 'addToCart',
            label: 1880882,
            quantity: 1
          }
        },
        screen: 'checkoutv2-cart',
        type: 'addToCart',
        event: 'CART_FILLER_ADD_TO_CART'
      };
      const result = {
        appsflyerPayload: {},
        mynacoPayload: {
          action: 'addToCart',
          category: 'shopping',
          isPersistent: true,
          label: 1880882,
          nonInteractive: false,
          payload: {
            quantity: {
              value: 1
            },
            action: 'addToCart',
            eventName: 'addToCart',
            label: {
              value: 1880882
            },
            eventType: 'addToCart',
            category: 'shopping'
          },
          screen: {
            data_set: {
              entity_optional_attributes: {}
            },
            name: 'Checkout-checkoutv2-cart',
            referer: {},
            variant: 'native'
          },
          screen_name: 'Checkout-checkoutv2-cart',
          type: 'addToCart',
          referer: {},
          screenName: 'Checkout-checkoutv2-cart'
        }
      };

      expect(getGenericMynacoData(props)).toEqual(result);
    });

    it('BEGIN_CHECKOUT', () => {
      const props = {
        mynacoV3Data: {
          templateData: {
            label: 'coupon: undefined | value: 3044'
          }
        },
        screen: 'checkoutv2-cart',
        type: 'begin_checkout',
        event: 'BEGIN_CHECKOUT'
      };
      const result = {
        appsflyerPayload: {},
        mynacoPayload: {
          action: 'begin_checkout',
          category: 'checkoutv2-cart',
          isPersistent: true,
          label: 'coupon: undefined | value: 3044',
          nonInteractive: false,
          payload: {
            action: 'begin_checkout',
            eventName: 'begin_checkout',
            label: 'coupon: undefined | value: 3044',
            eventType: 'begin_checkout',
            category: 'checkoutv2-cart'
          },
          screen: {
            data_set: {
              entity_optional_attributes: {}
            },
            name: 'Checkout-checkoutv2-cart',
            referer: {},
            variant: 'native'
          },
          screen_name: 'Checkout-checkoutv2-cart',
          screenName: 'Checkout-checkoutv2-cart',
          type: 'begin_checkout',
          referer: {}
        }
      };
      expect(getGenericMynacoData(props)).toEqual(result);
    });

    it('CAPTCHA_ENTRY', () => {
      const props = {
        gaData: {
          eventType: 'event',
          category: 'payment',
          action: 'captcha entry',
          label: ''
        },
        screen: 'payment',
        type: 'captcha entry',
        event: 'CAPTCHA_ENTRY',
        category: 'checkout'
      };
      const result = {
        appsflyerPayload: {},
        mynacoPayload: {
          action: 'captcha entry',
          category: 'checkout',
          isPersistent: true,
          label: '',
          nonInteractive: false,
          nonInteraction: null,
          payload: {
            action: 'captcha entry',
            eventName: 'captcha entry',
            label: '',
            eventType: 'captcha entry',
            category: 'checkout'
          },
          screen: {
            data_set: {
              entity_optional_attributes: {}
            },
            name: 'Checkout-payment',
            referer: {},
            variant: 'native'
          },
          referer: {},
          screenName: 'Checkout-payment',
          screen_name: 'Checkout-payment',
          type: 'captcha entry',
          url: null
        }
      };
      expect(getGenericMynacoData(props)).toEqual(result);
    });

    it('CAPTCHA_SUCCESS', () => {
      const props = {
        mynacoV3Data: {
          templateData: { label: '42342' }
        },
        gaData: {
          eventType: 'event',
          category: 'payment',
          action: 'captcha success',
          label: '42342'
        },
        screen: 'payment',
        type: 'captcha success',
        event: 'CAPTCHA_SUCCESS',
        category: 'payment'
      };
      const result = {
        appsflyerPayload: {},
        mynacoPayload: {
          action: 'captcha success',
          category: 'payment',
          isPersistent: true,
          label: '42342',
          nonInteractive: false,
          nonInteraction: null,
          payload: {
            action: 'captcha success',
            eventName: 'captcha success',
            label: '42342',
            eventType: 'captcha success',
            category: 'payment'
          },
          referer: {},
          screen: {
            data_set: {
              entity_optional_attributes: {}
            },
            name: 'Checkout-payment',
            referer: {},
            variant: 'native'
          },
          screen_name: 'Checkout-payment',
          screenName: 'Checkout-payment',
          type: 'captcha success',
          url: null
        }
      };
      expect(getGenericMynacoData(props)).toEqual(result);
    });

    it('CAPTCHA_LOAD', () => {
      const props = {
        mynacoV3Data: {
          templateData: {
            label: 'cod'
          }
        },
        gaData: {
          eventType: 'event',
          category: 'payment',
          action: 'captcha widget load',
          label: 'cod'
        },
        screen: 'payment',
        type: 'captcha widget load',
        event: 'CAPTCHA_LOAD'
      };
      const result = {
        appsflyerPayload: {},
        mynacoPayload: {
          action: 'captcha widget load',
          category: 'payment',
          isPersistent: true,
          label: 'cod',
          nonInteractive: false,
          nonInteraction: null,
          payload: {
            action: 'captcha widget load',
            eventName: 'captcha widget load',
            label: 'cod',
            eventType: 'captcha widget load',
            category: 'payment'
          },
          referer: {},
          screen: {
            data_set: {
              entity_optional_attributes: {}
            },
            name: 'Checkout-payment',
            referer: {},
            variant: 'native'
          },
          screenName: 'Checkout-payment',
          screen_name: 'Checkout-payment',
          type: 'captcha widget load',
          url: null
        }
      };
      expect(getGenericMynacoData(props)).toEqual(result);
    });

    it('CLOSE_SAVED_CARDS', () => {
      const props = {
        gaData: {
          eventType: 'event',
          category: 'payment',
          action: 'card-save-optedout',
          label: ''
        },
        action: 'Card Save Opted-Out',
        screen: 'payment',
        type: 'card-save-optedout',
        event: 'CLOSE_SAVED_CARDS',
        category: 'Checkout'
      };
      const result = {
        appsflyerPayload: {},
        mynacoPayload: {
          action: 'Card Save Opted-Out',
          category: 'Checkout',
          isPersistent: true,
          label: '',
          nonInteractive: false,
          nonInteraction: null,
          payload: {
            action: 'card-save-optedout',
            category: 'Checkout',
            eventName: 'card-save-optedout',
            eventType: 'card-save-optedout',
            label: ''
          },
          referer: {},
          screen: {
            data_set: {
              entity_optional_attributes: {}
            },
            name: 'Checkout-payment',
            referer: {},
            variant: 'native'
          },
          screenName: 'Checkout-payment',
          screen_name: 'Checkout-payment',
          type: 'card-save-optedout',
          url: null
        }
      };
      expect(getGenericMynacoData(props)).toEqual(result);
    });

    it('COD_SUCCESS', () => {
      const props = {
        gaData: {
          eventType: 'event',
          category: 'payment',
          action: 'cod-success',
          label: ''
        },
        action: 'COD Success',
        screen: 'payment',
        type: 'cod-success',
        event: 'COD_SUCCESS',
        category: 'Checkout'
      };
      const result = {
        appsflyerPayload: {},
        mynacoPayload: {
          action: 'COD Success',
          category: 'Checkout',
          isPersistent: true,
          label: '',
          nonInteractive: false,
          nonInteraction: null,
          payload: {
            action: 'cod-success',
            category: 'Checkout',
            eventName: 'cod-success',
            eventType: 'cod-success',
            label: ''
          },
          referer: {},
          screen: {
            data_set: {
              entity_optional_attributes: {}
            },
            name: 'Checkout-payment',
            referer: {},
            variant: 'native'
          },
          screenName: 'Checkout-payment',
          screen_name: 'Checkout-payment',
          type: 'cod-success',
          url: null
        }
      };
      expect(getGenericMynacoData(props)).toEqual(result);
    });

    it('CARD_SUBMIT', () => {
      const props = {
        gaData: {
          eventType: 'event',
          category: 'payment',
          action: 'creditcard-submit',
          label: ''
        },
        action: 'Add Credit Card Redirect',
        screen: 'payment',
        type: 'creditcard-submit',
        event: 'CARD_SUBMIT',
        category: 'Checkout'
      };
      const result = {
        appsflyerPayload: {},
        mynacoPayload: {
          action: 'Add Credit Card Redirect',
          category: 'Checkout',
          isPersistent: true,
          label: '',
          nonInteractive: false,
          nonInteraction: null,
          payload: {
            action: 'creditcard-submit',
            category: 'Checkout',
            eventName: 'creditcard-submit',
            eventType: 'creditcard-submit',
            label: ''
          },
          referer: {},
          screen: {
            data_set: {
              entity_optional_attributes: {}
            },
            name: 'Checkout-payment',
            referer: {},
            variant: 'native'
          },
          screenName: 'Checkout-payment',
          screen_name: 'Checkout-payment',
          type: 'creditcard-submit',
          url: null
        }
      };
      expect(getGenericMynacoData(props)).toEqual(result);
    });

    it('CONFIRMATION_SCREEN_LOAD', () => {
      const props = {
        mynacoV3Data: {
          templateData: {
            ecommerce: {
              transaction: {
                couponCode: '',
                id: '1100810-9262300-2118301',
                revenue: 22.63,
                shipping: 0,
                tax: 0
              },
              firstOrder: false,
              storeFrontId: '',
              productListName: '',
              mProductList: [
                {
                  id: 355130,
                  name:
                    'Nike Navy Blue Brasilia 6 Large    Training  Duffle Bag',
                  brand: 'Nike',
                  quantity: 2,
                  type: 'Duffel Bag',
                  category: 'Accessories',
                  skuId: 1184006,
                  price: 22.384,
                  mrp: 0,
                  gender: 'Unisex',
                  position: -1,
                  variant: 'Onesize'
                }
              ],
              type: 'purchase',
              checkout: {
                step: 0
              }
            },
            widget_items: {
              data_set: {
                data: [
                  {
                    entity_optional_attributes: {
                      size: 'Onesize',
                      inv_count: -1,
                      price: 22.384,
                      qty: 2,
                      name:
                        'Nike Navy Blue Brasilia 6 Large    Training  Duffle Bag',
                      mrp: 0,
                      disc: 0,
                      category: 'Accessories',
                      brand: 'Nike',
                      skuId: 1184006
                    },
                    entity_id: 355130,
                    entity_name:
                      'Nike Navy Blue Brasilia 6 Large    Training  Duffle Bag',
                    entity_type: 'Apparels'
                  }
                ]
              }
            },
            entity_id: '123123',
            entity_type: 'order',
            type: 'Checkout',
            variant: 'react'
          }
        },
        gaData: {
          eventType: 'pageView'
        },
        screen: 'confirmation',
        type: 'ecommerce-screen-load',
        event: 'ECOMMERCE_SCREEN_LOAD'
      };
      const result = {
        appsflyerPayload: {},
        mynacoPayload: {
          contentGroups: [
            {
              '&cg1': 'Checkout'
            }
          ],
          customDimensions: [
            {
              '11': 'LoggedIn'
            },
            {
              '14': 'FeedSession'
            },
            {
              '29': '1.0.0'
            }
          ],
          ecommerce: {
            checkout: {
              step: 0
            },
            firstOrder: false,
            mProductList: [
              {
                brand: 'Nike',
                category: 'Accessories',
                gender: 'Unisex',
                id: 355130,
                mrp: 0,
                name: 'Nike Navy Blue Brasilia 6 Large    Training  Duffle Bag',
                position: -1,
                price: 22.384,
                quantity: 2,
                skuId: 1184006,
                type: 'Duffel Bag',
                variant: 'Onesize'
              }
            ],
            productListName: '',
            storeFrontId: '',
            transaction: {
              couponCode: '',
              id: '1100810-9262300-2118301',
              revenue: 22.63,
              shipping: 0,
              tax: 0
            },
            type: 'purchase'
          },
          isPersistent: true,
          nonInteractive: false,
          nonInteraction: null,
          payload: {
            eventName: 'ScreenLoad',
            eventType: 'screen_load_event'
          },
          referer: {},
          screen: {
            data_set: {
              entity_optional_attributes: {},
              entity_id: '123123',
              entity_type: 'order'
            },
            name: 'Checkout-confirmation',
            referer: {},
            type: 'Checkout',
            variant: 'react'
          },
          screenName: 'Checkout-confirmation',
          screen_name: 'Checkout-confirmation',
          type: 'ecommerce-screen-load',
          url: null,
          widget_items: {
            data_set: {
              data: [
                {
                  entity_optional_attributes: {
                    size: 'Onesize',
                    inv_count: -1,
                    price: 22.384,
                    qty: 2,
                    name:
                      'Nike Navy Blue Brasilia 6 Large    Training  Duffle Bag',
                    mrp: 0,
                    disc: 0,
                    category: 'Accessories',
                    brand: 'Nike',
                    skuId: 1184006
                  },
                  entity_id: 355130,
                  entity_name:
                    'Nike Navy Blue Brasilia 6 Large    Training  Duffle Bag',
                  entity_type: 'Apparels'
                }
              ]
            }
          }
        }
      };
      expect(getGenericMynacoData(props)).toEqual(result);
    });
  });
});
