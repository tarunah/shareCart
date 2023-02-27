import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import Styles from './headerComponents.base.css';

import ImageBanner from 'commonComp/ImageBanner';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
import {
  currencyValue,
  isFreeEarlyAccess,
  getUidx
} from 'commonBrowserUtils/Helper';
import { toggleOosCartHc } from 'commonBrowserUtils/CartHelper';
import CartCountHandler from 'commonBrowserUtils/CartCountHandler';
import UserLocationDetailsUtil from 'commonUtils/UserLocationDetailsUtil';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { invalidItemsReason } from 'commonBrowserUtils/CartConstants';
import SavingFeedback from 'iconComp/SavingsFeedback.jsx';
import SellerChange from 'iconComp/SellerChange.jsx';
import Warning from 'iconComp/Warning.jsx';
import PiggyBank from 'iconComp/PiggyBank.jsx';
import sanitize from 'commonUtils/Sanitize';

export class PriceChange extends React.Component {
  getPriceIncreaseStatus() {
    const { products } = this.props;
    let priceIncreaseStatus = false;
    /* priceIncreaseStatus = true, when one or more items price is increased in cart.
     * priceIncreaseStatus = false, when there is decrease in price of some items in cart and there is no
     * item in cart with increase in price.
     */
    if (products)
      products.forEach(product => {
        let oldPrice = get(product, 'conflict.price.oldPrice', 0);
        let qty = get(product, 'quantity');
        let newPrice = qty !== 0 ? get(product, 'price.subTotal') / qty : 0;
        if (
          get(product, 'conflict.price.state') === 'CONFLICTED' &&
          oldPrice < newPrice
        )
          priceIncreaseStatus = true;
      });
    return priceIncreaseStatus;
  }

  getSellerChangeStatus() {
    const { products } = this.props;
    let sellerChangeStatus = false;
    if (products) {
      products.forEach(product => {
        get(product, 'conflict.seller.state') === 'CONFLICTED' &&
          (sellerChangeStatus = true);
      });
    }
    return sellerChangeStatus;
  }

  getPriceDrop() {
    return (
      <div className={Styles.container}>
        <ImageBanner name="price-drop" className={Styles.priceDropIcon} />
        <div className={Styles.header}>Prices Have Dropped</div>
        <div>
          The price of one or more items in your bag has dropped. Buy them now!
        </div>
      </div>
    );
  }

  getPriceDropWithSellerChange() {
    return (
      <div className={Styles.container}>
        <ImageBanner name="price-drop" className={Styles.priceDropIcon} />
        <div className={Styles.header}>Prices Have Dropped</div>
        <div>
          The price and seller of one or more items in your bag has changed. Buy
          them now!{' '}
        </div>
      </div>
    );
  }

  getPriceIncreaseWithSellerChange() {
    return (
      <div className={Styles.container}>
        <SellerChange className={Styles.priceDropIcon} />
        <div className={Styles.header}>Seller has changed</div>
        <div>
          Seller of one or more items in your bag has changed. Please review
          them before proceeding.
        </div>
      </div>
    );
  }

  getPriceConflict() {
    const { products } = this.props;
    return products.reduce(
      (isPriceConflicted, product) =>
        get(product, 'conflict.price.state') === 'CONFLICTED' ||
        isPriceConflicted,
      false
    );
  }

  render() {
    const isPriceConflicted = this.getPriceConflict();
    const priceIncreaseStatus = this.getPriceIncreaseStatus();
    const sellerChange = this.getSellerChangeStatus();
    if (priceIncreaseStatus || !isPriceConflicted) {
      if (sellerChange) return this.getPriceIncreaseWithSellerChange();
    } else {
      if (sellerChange) return this.getPriceDropWithSellerChange();
      else return this.getPriceDrop();
    }
    return null;
  }
}

const oosFuncs = [
  'removeItems',
  'triggerWidgetClickEvent',
  'triggerWidgetLoadEvent',
  'onViewButtonClick'
];

export class OutOfStock extends React.Component {
  constructor(props) {
    super(props);

    this.oosWishlistConfig = getGrowthHackConfigValue('CART_OOS_BULK_WISHLIST');
    this.userUidx = getUidx();
    oosFuncs.forEach(method => (this[method] = this[method].bind(this)));
  }

  componentDidMount() {
    this.triggerWidgetLoadEvent();
  }

  triggerWidgetLoadEvent() {
    triggerEvent('CART_OOS_LOAD_WIDGET', {
      custom: {
        custom: {
          v1: this.userUidx,
          v2: '0_1'
        },
        widget: {
          name: 'cart_oos_widget',
          type: 'banner'
        },
        event_type: 'widgetLoad',
        event_category: 'Cart page - oos widget load'
      }
    });
  }

  triggerWidgetClickEvent() {
    triggerEvent('CART_OOS_CLICK_WIDGET', {
      custom: {
        custom: {
          v1: this.userUidx
        },
        widget: {
          name: 'cart_oos_widget',
          type: 'banner'
        },
        event_type: 'widgetClick',
        event_category: 'Cart page - oos widget click'
      }
    });
  }

  removeItems() {
    const {
      props: { handleCartAction, oosItems },
      triggerWidgetClickEvent
    } = this;
    triggerEvent('CLICK_REMOVE_OOS');
    triggerWidgetClickEvent();

    handleCartAction(
      'removeItems',
      oosItems.map(item => ({ itemId: item.itemId })),
      CartCountHandler.updateState
    );
  }

  onViewButtonClick() {
    this.triggerWidgetClickEvent();
    toggleOosCartHc(this.props.displayCartModal);
  }

  render() {
    return (
      <div className={Styles.container}>
        <ImageBanner name="oos" className={Styles.oosIcon} />
        <div className={Styles.header}>
          {this.oosWishlistConfig.stripCopy}
          <div className={Styles.viewButton} onClick={this.onViewButtonClick}>
            VIEW
          </div>
        </div>
      </div>
    );
  }
}

export class ProductsUnavailable extends React.Component {
  constructor(props) {
    super(props);
    this.removeItems = this.removeItems.bind(this);
  }

  removeItems() {
    const {
      props: { handleCartAction, unavailableItems }
    } = this;

    handleCartAction(
      'removeItems',
      unavailableItems.map(item => ({ itemId: item.itemId }))
    );
  }

  render() {
    return (
      <div className={Styles.container}>
        <Warning className={Styles.warningIcon} />
        <div className={Styles.header}>Item(s) unavailable</div>
        <div>{getKVPairValue('PRELAUNCH_MESSAGE')}</div>
        <div className={Styles.button} onClick={this.removeItems}>
          REMOVE UNAVAILABLE ITEM(S)
        </div>
      </div>
    );
  }
}

export const NewItemsInCart = () => (
  <div className={Styles.container}>
    <div className={Styles.header}>New Items In Your Cart</div>
    <div>
      We have included item(s) in your cart that you had selected previously.
    </div>
  </div>
);

export const VBHeader = () => (
  <div className={Styles.vb}>
    <div className={Styles.header}>Items Repeated In Your Bag</div>
    <div>
      Same items in your bag are already present as a pack. Please remove either
      the pack or the item to proceed.
    </div>
  </div>
);

export const CoverFeeHeader = ({
  coverFeeApplicable,
  coverFeeApplicableRemark,
  coverFeeOpted,
  totalSavings,
  className
}) => {
  const pcConfig = getKVPairValue('PRIORITY_CHECKOUT');
  let totalSavingsFormatted = currencyValue(totalSavings);
  const freeEarlyAccess = isFreeEarlyAccess(coverFeeApplicableRemark);

  if (freeEarlyAccess) {
    totalSavingsFormatted = currencyValue(totalSavings + pcConfig.charges);
  }

  return (coverFeeApplicable || freeEarlyAccess) &&
    totalSavingsFormatted !== '0' ? (
    <div className={`${Styles.cfContainer} ${className}`}>
      <PiggyBank className={Styles.cfIcon} />
      <div>
        <div className={Styles.cfMainText}>
          {pcConfig.mainText.replace('%s', totalSavingsFormatted)}
        </div>
        <div className={Styles.cfInfo}>
          {(freeEarlyAccess && pcConfig.freeHeaderSubLine) ||
            pcConfig.headerSubLine}
        </div>
      </div>
    </div>
  ) : null;
};

PriceChange.propTypes = {
  handleCartAction: PropTypes.func
};

OutOfStock.propTypes = {
  handleCartAction: PropTypes.func,
  oosItems: PropTypes.array
};

export const TaxBanner = () => {
  const taxBannerData = getKVPairValue('TAX_BANNER').checkout || {};
  return taxBannerData.enable ? (
    <div className={Styles.ufp}>{taxBannerData.info}</div>
  ) : null;
};

export const NonServiceable = ({ displayCartModal }) => {
  const { pincode } = UserLocationDetailsUtil.getLocation();
  const notServiceableMsg = getKVPairValue('NON_SERVICEABLE_CART_ERROR');

  const cartModal = getKVPairValue('CART_MODAL_CONTENT');
  const showCartModal = () =>
    displayCartModal({
      ...cartModal.nonServiceable,
      context: invalidItemsReason.NON_SERVICEABLE
    });

  return (
    <div className={Styles.nonServiceableContainer}>
      <ImageBanner name="ship-charge" className={Styles.nonServiceableIcon} />
      <div className={Styles.nonServiceableHeader}>
        {(get(notServiceableMsg, 'header') || '').replace('%pincode%', pincode)}
      </div>
      <div className={Styles.nonServiceableButton} onClick={showCartModal}>
        VIEW
      </div>
    </div>
  );
};

export const SellerChangeNotification = props => {
  const { products } = props;
  let sellerChangeStatus = false;
  if (products) {
    sellerChangeStatus = products.reduce(
      (isSellerStateConflicted, product) =>
        get(product, 'conflict.seller.state') === 'CONFLICTED' ||
        isSellerStateConflicted,
      false
    );
  }

  return sellerChangeStatus ? (
    <div className={Styles.container}>
      <SellerChange className={Styles.sellerChange} />
      <div className={Styles.header}>Seller has changed</div>
      <div>
        Seller of one or more items in your bag has changed. Please review them
        before proceeding.
      </div>
    </div>
  ) : null;
};

const fireEvent = price => {
  const { total, totalSavings } = price;
  triggerEvent('SAVINGS_FEEDBACK_WIDGET_LOAD', {
    maData: {
      entity_optional_attributes: total
    },
    custom: {
      custom: {
        v1: getUidx(),
        v2: totalSavings
      },
      widget: {
        name: 'savings_widget',
        type: 'card'
      }
    }
  });
};

export const SavingsFeedback = ({ savingsFeedbackConfig, price }) => {
  const { totalSavings } = price;
  const { savingsCTA } = savingsFeedbackConfig;
  const infoText = savingsCTA.split('${amount}');
  infoText.splice(
    1,
    0,
    `<b class=${Styles.amount}> ₹${currencyValue(totalSavings)} </b>`
  );

  useEffect(() => {
    fireEvent(price);
  }, [price]);

  return Math.round(totalSavings) > 0 ? (
    <div className={Styles.savingsStrip}>
      <SavingFeedback className={Styles.savingsFeedbackIcon} />
      {infoText.map((item, index) => (
        <span
          key={index}
          dangerouslySetInnerHTML={{ __html: sanitize(item) }}
        />
      ))}
    </div>
  ) : null;
};
