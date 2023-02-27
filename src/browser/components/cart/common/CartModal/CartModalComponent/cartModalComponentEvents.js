export const eventsObj = {
  shellMessageLoadEvent: function(uidx, result) {
    triggerEvent('CART_OOS_SHELL_LOAD', {
      custom: {
        custom: {
          v1: uidx,
          v2: result
        },
        widget: {
          name: 'cart_oos_success_msg',
          type: 'sub-card'
        },
        event_type: 'widgetLoad',
        event_category: 'Cart page - oos success msg load'
      }
    });
  },

  oosWidgetClickEvent: function(uidx) {
    triggerEvent('CART_OOS_CLICK_WIDGET', {
      custom: {
        custom: {
          v1: uidx
        },
        widget: {
          name: 'cart_oos_widget',
          type: 'banner'
        },
        event_type: 'widgetClick',
        event_category: 'Cart page - oos widget click'
      }
    });
  },

  oosWidgetButtonClickEvent: function(uidx, action, oosItemsCount) {
    triggerEvent('CART_OOS_BUTTON_CLICK', {
      custom: {
        custom: {
          v1: uidx,
          v2: action,
          v3: oosItemsCount
        },
        widget: {
          name: 'cart_oos_select_option',
          type: 'sub-card'
        },
        event_type: 'widgetItemClick',
        event_category: 'Cart page - oos halfcard selection'
      }
    });
  }
};
