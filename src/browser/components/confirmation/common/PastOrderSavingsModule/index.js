import React from 'react';
import get from 'lodash/get';

import ConfirmationManager from 'commonBrowserUtils/ConfirmationManager';
import { getUidx, currencyValue } from 'commonBrowserUtils/Helper';
import { getConfirmationTotalSavings } from 'commonBrowserUtils/transformPriceDetails';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';

import Styles from './pastOrderSavingsModule.base.css';
import SavingsPiggyBank from 'iconComp/SavingsPiggyBank.jsx';
import RupeeBold from 'iconComp/RupeeBold.jsx';

const cancelOrderStatus = {
  IC: true,
  RTO: true,
  L: true,
  DEC: true
};

const addInstrumentSavings = {
  bankCashback: true,
  cashback: true,
  loyaltyPoints: true
};

const addItemSavings = payment => {
  let itemSavings = getConfirmationTotalSavings(payment.discounts);
  if (payment.instruments) {
    Object.entries(payment.instruments).forEach(instrumentArray => {
      if (
        get(addInstrumentSavings, `${instrumentArray[0]}`, false) &&
        instrumentArray[1]
      ) {
        itemSavings += instrumentArray[1] / 100;
      }
    });
  }
  return itemSavings;
};

const getSavingsDuration = (orders = []) => {
  let savingsDuration = new Date(
    orders[0].createdOn - orders[orders.length - 1].createdOn
  ).getMonth();
  savingsDuration =
    isNaN(savingsDuration) || savingsDuration <= 0 ? 0 : savingsDuration;
  return savingsDuration;
};

class PastOrderSavingsModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalSavings: 0,
      duration: 0
    };
    this.totalSavingsWidgetThreshold = get(
      getGrowthHackConfigValue('SAVINGS_WIDGET'),
      'totalSavingsThreshold',
      50
    );
    ['getPastOrdersSuccessCallBack', 'getPastOrdersErrorCallback'].forEach(
      method => (this[method] = this[method].bind(this))
    );
  }

  componentDidMount() {
    /*
    For the purpose of calculating past order savings, I need the following:
    1. "page": 1 --> For getting recent orders in the first fold
    2. "getPayments": true --> For getting payment instruments used to make the purchase
    3. "getReturn": true --> For understanding whether the product is still with the user or it is returned
    */

    ConfirmationManager.getPastOrders(
      {
        page: 1,
        getPayments: 'true',
        getReturn: 'true'
      },
      this.getPastOrdersSuccessCallBack,
      this.getPastOrdersErrorCallback
    );
  }

  getPastOrdersSavings(res) {
    let pastOrderSavings = 0,
      savingsDuration = 0;
    const filteredOrders = res.orders.filter(order => {
      const filteredItems = order.items.filter(item => {
        const shouldAddItemSavings = !(
          item.return || get(cancelOrderStatus, `${item.status.code}`, false)
        );
        if (shouldAddItemSavings) {
          const currentItemSavings = addItemSavings(item.payments);
          if (currentItemSavings) {
            pastOrderSavings += currentItemSavings;
            return true;
          }
        }
        return false;
      });
      return filteredItems.length;
    });
    if (pastOrderSavings) {
      savingsDuration = getSavingsDuration(filteredOrders) + 1;
    }

    return { pastOrderSavings, savingsDuration };
  }

  getCurrentOrderSavings() {
    return getConfirmationTotalSavings(
      get(this.props, 'dataState.data.bountyOrder.payments.discounts', {})
    );
  }

  getPastOrdersSuccessCallBack(res) {
    const { pastOrderSavings, savingsDuration } = this.getPastOrdersSavings(
      res
    );
    this.setOrderSavings(pastOrderSavings, savingsDuration);
  }

  getPastOrdersErrorCallback() {
    const currentOrderSavings = this.getCurrentOrderSavings() || 0;
    this.setOrderSavings(currentOrderSavings, 0);
  }

  setOrderSavings(totalSavings = 0, duration = 0) {
    if (totalSavings > this.totalSavingsWidgetThreshold) {
      triggerEvent('CONFIRMATION_TOTAL_SAVINGS_WIDGET_LOAD', {
        custom: {
          custom: {
            v1: getUidx(),
            v2: totalSavings,
            v3: duration
          },
          widget: {
            name: 'order_savings_till_date',
            type: 'banner'
          },
          event_type: 'widgetLoad',
          event_category:
            'Order Confirmation Page - savings_till_date_widget_load'
        }
      });
    }
    this.setState({
      totalSavings,
      duration
    });
  }

  render() {
    const { totalSavings, duration } = this.state;
    return totalSavings > this.totalSavingsWidgetThreshold ? (
      <div className={Styles.totalSavingsContainer}>
        <div className={Styles.greenBackground}>
          <SavingsPiggyBank />
          <div className={Styles.messageContainer}>
            <div className={Styles.savingsMessage}>
              Total Savings in{' '}
              {duration === 0
                ? 'this order'
                : `less than ${duration} ${
                    duration === 1 ? 'month' : 'months'
                  }`}
            </div>
            <div className={Styles.savingsValuePlaceholder}>
              <RupeeBold />
              {currencyValue(totalSavings)}
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default PastOrderSavingsModule;
