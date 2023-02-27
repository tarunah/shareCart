import React from 'react';
import get from 'lodash/get';

import { Link } from 'react-router-dom';

// Styles
import Style from './dialogs.base.css';

import ImageBanner from 'commonComp/ImageBanner';
import Button from 'vision/components/Button';
import Modal from 'commonComp/Modal';

import {
  getSizesList,
  getQuantityList,
  getAttachedProductItemOffer
} from 'commonBrowserUtils/CartHelper';
import {
  scrollIntoView,
  currencyValue,
  getArraySumWithRange
} from 'commonBrowserUtils/Helper';
import SizeSelector from '../../common/SizeSelector';
import { Amount } from '../../common/ItemComponents';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
class QtyDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.quantity,
      showQtyChangeWarning: false
    };
    this.select = this.select.bind(this);
    this.done = this.done.bind(this);
    this.offerAmount = 0;
  }

  componentDidMount() {
    const field = document.getElementById(this.props.quantity);
    scrollIntoView(field, { behavior: 'smooth' });
  }

  select(e) {
    this.setState({ selected: +e.currentTarget.id });
    const itemOffers = getAttachedProductItemOffer(this.props.appliedCoupons);
    const offerAmounts = get(itemOffers, 'offerAmounts');
    const isCatalogX = get(itemOffers, 'catalogueType') === 'attached_base';
    const pairUpCount = isCatalogX ? get(itemOffers, 'offerAmounts').length : 0;
    const showReduceAttachedProductWarning =
      isFeatureEnabled('ATTACHED_PRODUCTS') &&
      isCatalogX &&
      pairUpCount &&
      e.currentTarget.id < pairUpCount;
    if (showReduceAttachedProductWarning) {
      const nudgeAmount = getArraySumWithRange(
        offerAmounts,
        0,
        pairUpCount - e.currentTarget.id
      );
      this.offerAmount = nudgeAmount;
      this.setState({ showQtyChangeWarning: true });
    } else {
      this.setState({ showQtyChangeWarning: false });
    }
  }

  done() {
    this.props.quantity !== this.state.selected
      ? this.props.changeQuantity({
          currentTarget: { id: this.state.selected }
        })
      : this.props.toggleQuantityDialog();
  }

  render() {
    const { toggleQuantityDialog, selectedSeller = {} } = this.props;
    const inventory = (selectedSeller || {}).inventory;
    const list = inventory && getQuantityList(inventory);

    return inventory ? (
      <Modal
        className={Style.container}
        cancelCallback={toggleQuantityDialog}
        halfCard={true}
        cancelIconConfig={{ show: true, className: Style.closeIcon }}
      >
        <div className={Style.header}>Select Quantity</div>
        <div className={Style.list}>
          {list.map(({ display, id, available }) => (
            <div
              key={id}
              id={id}
              className={`${Style.item} ${!available ? Style.disabled : ''} ${
                this.state.selected === id ? Style.selected : ''
              }`}
              onClick={available ? this.select : null}
            >
              <div className={Style.display}>{display}</div>
              {!available && <div className={Style.strike} />}
            </div>
          ))}
        </div>
        {this.state.showQtyChangeWarning && (
          <div className={Style.warningContainer}>
            <ImageBanner
              name="additional-offer"
              className={Style.warningIcon}
              width={40}
            />
            <div className={Style.warningContent}>
              You will lose
              <span className={Style.warningAmount}>
                {' '}
                &#8377;{currencyValue(this.offerAmount)}{' '}
              </span>
              Offer if you reduce quantity of this item.
            </div>
          </div>
        )}
        <Button
          variant="contained"
          width="100%"
          letterSpacing="1px"
          onClick={this.done}
        >
          DONE
        </Button>
      </Modal>
    ) : null;
  }
}

const MoreSellerMobile = props => {
  const { sellerCount, minPrice, linkData } = props;
  const sellerCountMessage = `${sellerCount} more ${
    sellerCount > 1 ? 'sellers' : 'seller'
  }`;
  return (
    <Link to={linkData}>
      <div className={Style.moreSeller}>
        <span className={Style.sellerCount}>{sellerCountMessage}</span>
        <span>
          {' '}
          available{' '}
          {minPrice && (
            <span>
              from <Amount value={minPrice} bold={false} />
            </span>
          )}
        </span>
      </div>
    </Link>
  );
};

class SizeDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSkuId: props.skuId,
      selectedPartnerId: {
        [props.skuId]: (props.selectedSeller || {}).partnerId
      }
    };
    ['onSizeChange', 'onDone'].forEach(
      method => (this[method] = this[method].bind(this))
    );
  }

  onSizeChange(e) {
    const selectedSkuId = +e.currentTarget.id;
    const { sizes } = this.props;
    const selectedSkuSellers =
      (sizes.find(size => size.skuId === selectedSkuId) || {}).sellers || [];
    const buyButtonWinner =
      (selectedSkuSellers.find(({ seller }) => seller.inventory > 0) || {})
        .seller || {};
    this.setState(prevState => {
      const currentPartnerId =
        prevState.selectedPartnerId[selectedSkuId] ||
        (buyButtonWinner || {}).partnerId;
      const selectedPartnerId = {
        ...prevState.selectedPartnerId,
        [selectedSkuId]: currentPartnerId
      };
      return {
        selectedPartnerId,
        selectedSkuId
      };
    });
  }

  onDone(cancelCallback) {
    const { selectedSkuId, selectedPartnerId } = this.state;
    this.props.skuId !== selectedSkuId
      ? this.props.changeSizeAndSeller({
          currentTarget: {
            skuId: selectedSkuId,
            sellerPartnerId: selectedPartnerId[selectedSkuId]
          }
        })
      : cancelCallback();
  }

  render() {
    const {
      className,
      sizes,
      toggleSizeDialog,
      id,
      skuId: skuInResponse,
      flags,
      ...rest
    } = this.props;
    const { selectedSkuId, selectedPartnerId } = this.state;
    const linkData = {
      pathname: '/checkout/cart/sellers',
      state: {
        productId: id,
        skuId: selectedSkuId
      }
    };
    return (
      <Modal
        className={Style.container}
        cancelCallback={toggleSizeDialog}
        halfCard={true}
        cancelIconConfig={{ show: true, className: Style.closeIcon }}
      >
        {onCancel => (
          <SizeSelector
            id={id}
            className={className}
            sizes={sizes}
            selectedSkuId={selectedSkuId}
            selectedPartnerId={selectedPartnerId[selectedSkuId]}
            onChange={this.onSizeChange}
            onDone={this.onDone}
            header="Select Size"
            deviceMode="mobile"
            onCancel={onCancel}
            skuInResponse={skuInResponse}
            flags={flags}
            renderMoreSeller={(sellerCount, minPrice) => (
              <MoreSellerMobile
                sellerCount={sellerCount}
                minPrice={minPrice}
                linkData={linkData}
              />
            )}
            {...rest}
          />
        )}
      </Modal>
    );
  }
}

class CartFillerSizeDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: props.skuId };

    this.select = this.select.bind(this);
    this.done = this.done.bind(this);
  }

  componentDidMount() {
    const field = document.getElementById(this.props.selected);
    scrollIntoView(field, { behavior: 'smooth' });
  }

  select(e) {
    this.setState({ selected: +e.currentTarget.id });
  }

  done() {
    this.props.selected !== this.state.selected
      ? this.props.changeSize({ currentTarget: { id: this.state.selected } })
      : this.props.toggleSizeDialog();
  }

  render() {
    const { show, sizes = [], toggleSizeDialog } = this.props;
    const list = sizes.map(({ label, skuId, available }) => ({
      display: label,
      id: skuId,
      available
    }));
    return show ? (
      <Modal
        className={Style.container}
        cancelCallback={toggleSizeDialog}
        halfCard={true}
        cancelIconConfig={{ show: true, className: Style.closeIcon }}
      >
        <div className={Style.header}>Select Size</div>
        <div className={Style.list}>
          {list.map(({ display, id, available }) => (
            <div
              key={id}
              id={id}
              className={`${Style.item} ${!available ? Style.disabled : ''} ${
                this.state.selected === id ? Style.selected : ''
              }`}
              onClick={available ? this.select : null}
            >
              <div className={Style.display}>{display}</div>
              {!available && <div className={Style.strike} />}
            </div>
          ))}
        </div>
        <Button
          variant="contained"
          width="100%"
          letterSpacing="1px"
          onClick={this.done}
        >
          DONE
        </Button>
      </Modal>
    ) : null;
  }
}

export { QtyDialog, SizeDialog, CartFillerSizeDialog };
