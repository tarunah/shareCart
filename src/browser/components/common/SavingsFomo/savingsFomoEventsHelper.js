import { checkoutPage } from 'commonUtils/constants';

export const eventsObj = {
  triggerSavingsFomoLoad: function(
    currentPage,
    userUidx,
    totalSavings,
    subTotal
  ) {
    triggerEvent('SAVINGS_FOMO_LOAD', {
      custom: {
        custom: {
          v1: userUidx,
          v2: totalSavings,
          v3: subTotal
        },
        widget: {
          name: 'savings_halfcard',
          type: 'card'
        },
        event_type: 'widgetLoad',
        event_category: `${
          currentPage === checkoutPage.PAYMENT ? 'Payment' : 'Address'
        } Page - savings_halfcard_load`
      }
    });
  },

  defaultSavingsFomo: function(currentPage, userUidx, totalSavings, subTotal) {
    triggerEvent('DEFAULT_SAVINGS_FOMO', {
      custom: {
        custom: {
          v1: userUidx,
          v2: totalSavings,
          v3: subTotal
        },
        widget: {
          name: 'savings_back_button_click',
          type: 'button'
        },
        event_type: 'other',
        event_category: `${
          currentPage === checkoutPage.PAYMENT ? 'Payment' : 'Address'
        } Page - savings_back_button_click`
      }
    });
  },

  goBackSavingsFomoClick: function(currentPage, userUidx) {
    triggerEvent('GO_BACK_SAVINGS_FOMO_CLICK', {
      custom: {
        custom: {
          v1: userUidx
        },
        widget: {
          name: 'savings_halfcard',
          type: 'card'
        },
        widget_items: {
          name: 'go_back_click',
          type: 'button'
        },
        event_type: 'widgetItemClick',
        event_category: `${
          currentPage === checkoutPage.PAYMENT ? 'Payment' : 'Address'
        } Page - fomo_halfcard_click`
      }
    });
  },

  staySavingsFomoClick: function(currentPage, userUidx) {
    triggerEvent('STAY_SAVINGS_FOMO_CLICK', {
      custom: {
        custom: {
          v1: userUidx
        },
        widget: {
          name: 'savings_halfcard',
          type: 'card'
        },
        widget_items: {
          name: 'stay_on_page_click',
          type: 'button'
        },
        event_type: 'widgetItemClick',
        event_category: `${
          currentPage === checkoutPage.PAYMENT ? 'Payment' : 'Address'
        } Page - fomo_halfcard_click`
      }
    });
  },

  triggerNudgeClick: function(userUidx, showNudge, currentPage) {
    triggerEvent('SAVINGS_FOMO_NUDGE_CLICK', {
      custom: {
        custom: {
          v1: userUidx,
          v2: showNudge
        },
        widget: {
          name: 'savings_halfcard',
          type: 'card'
        },
        widget_items: {
          name: 'checkbox_click',
          type: 'button'
        },
        event_type: 'widgetItemClick',
        event_category: `${
          currentPage === checkoutPage.PAYMENT ? 'Payment' : 'Address'
        } Page - fomo_halfcard_click`
      }
    });
  },

  closingModalUsingIcon: function(currentPage) {
    triggerEvent('SAVINGS_FOMO_CLOSE_ICON_CLICK', {
      custom: {
        widget: {
          name: 'savings_halfcard',
          type: 'card'
        },
        widget_items: {
          name: 'close_click',
          type: 'button'
        },
        event_type: 'widgetItemClick',
        event_category: `${
          currentPage === checkoutPage.PAYMENT ? 'Payment' : 'Address'
        } Page - fomo_halfcard_click`
      }
    });
  }
};
