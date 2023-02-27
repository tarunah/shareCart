import get from 'lodash/get';

const templateConfig = {
  ECOMMERCE_SCREEN_LOAD: data => ({
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
    payload: {
      eventName: 'ScreenLoad',
      eventType: 'screen_load_event'
    },
    nonInteractive: false,
    widget_items: get(data, 'templateData.widget_items'),
    isPersistent: true,
    screen: {
      data_set: {
        entity_optional_attributes: {},
        entity_id: get(data, 'templateData.entity_id', ''),
        entity_type: get(data, 'templateData.entity_type', '')
      },
      name: `Checkout-${get(data, 'screen')}`,
      type: get(data, 'templateData.type', ''),
      variant: get(data, 'templateData.variant', 'native'),
      referer: {}
    },
    ecommerce: get(data, 'templateData.ecommerce', {}),
    screen_name: `Checkout-${get(data, 'screen')}`,
    type: 'ecommerce-screen-load'
  }),
  ADDRESS_SELECTED: data => ({
    isPersistent: true,
    payload: {
      pincode: get(data, 'templateData.pincode'),
      city: get(data, 'templateData.city'),
      addressType: get(data, 'templateData.addressType'),
      locality: get(data, 'templateData.locality'),
      eventType: get(data, 'type'),
      isDefault: get(data, 'templateData.isDefault'),
      streetAddress: get(data, 'templateData.streetAddress'),
      eventName: get(data, 'type'),
      id: {
        value: get(data, 'templateData.id')
      },
      checkoutAllowed: get(data, 'templateData.checkoutAllowed')
    },
    screen: {
      data_set: {
        entity_optional_attributes: {}
      },
      name: 'Checkout-address',
      variant: 'native',
      referer: {}
    },
    type: get(data, 'type'),
    screen_name: 'Checkout-address'
  }),
  CART_FILLER_ADD_TO_CART: data => ({
    action: get(data, 'type'),
    category: get(data, 'templateData.category'),
    isPersistent: true,
    label: get(data, 'templateData.label'),
    nonInteractive: false,
    payload: {
      quantity: {
        value: get(data, 'templateData.quantity')
      },
      action: get(data, 'type'),
      eventName: get(data, 'type'),
      label: {
        value: get(data, 'templateData.label')
      },
      eventType: get(data, 'type'),
      category: get(data, 'templateData.category')
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
    type: get(data, 'type')
  }),
  DEFAULT: data => ({
    action: get(data, 'action', get(data, 'type', '')),
    category: get(data, 'category', get(data, 'screen', '')),
    isPersistent: true,
    label: get(data, 'templateData.label', ''),
    nonInteractive: false,
    payload: {
      action: get(data, 'type', ''),
      eventName: get(data, 'type', ''),
      label: get(data, 'templateData.label', ''),
      eventType: get(data, 'type', ''),
      category: get(data, 'category', get(data, 'screen', ''))
    },
    screen: {
      data_set: {
        entity_optional_attributes: {}
      },
      name: `Checkout-${get(data, 'screen')}`,
      referer: {},
      variant: 'native'
    },
    screen_name: `Checkout-${get(data, 'screen')}`,
    type: get(data, 'type', '')
  })
};

const getTemplateData = (eventName, data) => {
  const config = get(templateConfig, eventName, null) || templateConfig.DEFAULT;
  return config(data);
};

export default getTemplateData;
