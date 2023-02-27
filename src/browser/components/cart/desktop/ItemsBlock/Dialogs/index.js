import React, { useState } from 'react';
import get from 'lodash/get';

// Styles
import Style from './dialogs.base.css';

import RadioGroup from 'commonComp/Radio/RadioGroup';
import Modal from 'commonComp/Modal';
import Image from 'commonComp/Image';
import Button from 'vision/components/Button';
import ImageBanner from 'commonComp/ImageBanner';
import ListSellers from '../../../common/ListSellers';

import {
  getSizesList,
  getQuantityList,
  getItemName,
  getAttachedProductItemOffer
} from 'commonBrowserUtils/CartHelper';
import SizeSelector from '../../../common/SizeSelector';
import InlinePriceComponent from '../../../common/InlinePriceComponent';
import { Amount } from '../../../common/ItemComponents';
import { currencyValue, getArraySumWithRange } from 'commonBrowserUtils/Helper';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import ChevronUp from 'iconComp/ChevronUp.jsx';
import ChevronDown from 'iconComp/ChevronDown.jsx';

const SelectedProductDisplay = props => {
  const WIDTH = 60,
    HEIGHT = 80;
  const { images, name, brand, offerData, price, discount, offerId } = props;
  const itemName = getItemName(brand, name);
  return (
    <div className={Style.productRow}>
      <div className={Style.productImage}>
        <Image
          src={images[0].secureSrc}
          width={WIDTH}
          height={HEIGHT}
          visible="true"
        />
      </div>
      <div className={Style.productDetails}>
        <div className={Style.brandName}> {brand} </div>
        <div className={Style.productName}> {itemName} </div>
        <InlinePriceComponent
          offerId={offerId}
          offerData={offerData}
          price={price}
          discount={discount}
          className={Style.price}
          strikedAmountClass={Style.strikedAmount}
          comboDiscountClass={Style.comboDiscount}
        />
      </div>
    </div>
  );
};

const MoreSellerDesktop = props => {
  const { sellerCount, minPrice, onClick, showSellerList } = props;
  const sellerCountMessage = `${sellerCount} more ${
    sellerCount > 1 ? 'sellers' : 'seller'
  }`;

  return (
    <div
      className={Style.moreSeller}
      onClick={onClick}
      data-testid="more-sellers"
    >
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
      {showSellerList ? (
        <ChevronUp className={Style.chevronIcon} height={9} width={12} />
      ) : (
        <ChevronDown className={Style.chevronIcon} height={9} width={12} />
      )}
    </div>
  );
};

export class SizeDialog extends React.Component {
  constructor(props) {
    super(props);
    //Decision: state of selectedPartnerId is an object
    //Reason: Should maintain the state of user selected seller for all sku
    this.state = {
      showSellerList: false,
      selectedSkuId: props.skuId,
      selectedPartnerId: {
        [props.skuId]: (props.selectedSeller || {}).partnerId
      }
    };
    ['toggleSellerList', 'onSellerChange', 'onSizeChange', 'onDone'].forEach(
      method => (this[method] = this[method].bind(this))
    );
  }

  toggleSellerList() {
    this.setState(prevState => ({
      showSellerList: !prevState.showSellerList
    }));
  }

  onSizeChange(e) {
    const { sizes } = this.props;
    const selectedSkuId = +e.currentTarget.id;
    const selectedSkuSellers = (
      sizes.find(size => size.skuId === selectedSkuId) || {}
    ).sellers || [{ seller: {} }];
    const buyButtonWinner = (
      selectedSkuSellers.find(({ seller }) => seller.inventory > 0) || {}
    ).seller;
    this.setState(prevState => {
      const selectedSellerPartnerId =
        prevState.selectedPartnerId[selectedSkuId] ||
        (buyButtonWinner || {}).partnerId;
      const selectedPartnerId = {
        ...prevState.selectedPartnerId,
        [selectedSkuId]: selectedSellerPartnerId
      };
      return {
        selectedSkuId,
        selectedPartnerId
      };
    });
  }

  onSellerChange(e) {
    // It is put outsize of setState. Because events in enzyme has unexpected behaviour.
    // https://github.com/airbnb/enzyme/issues/218
    const partnerId = +e.currentTarget.id;
    this.setState(prevState => {
      const selectedPartnerId = { ...prevState.selectedPartnerId };
      selectedPartnerId[prevState.selectedSkuId] = partnerId;
      return { selectedPartnerId };
    });
  }

  onDone(cancelCallback) {
    const { selectedSkuId, selectedPartnerId } = this.state;
    this.props.skuId !== selectedSkuId ||
    !this.props.selectedSeller ||
    this.props.selectedSeller.partnerId !== selectedPartnerId[selectedSkuId]
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
      offerId,
      className,
      sizes,
      toggleSizeDialog,
      name,
      brand,
      images,
      selectedSize,
      selectedSeller,
      id,
      offerData,
      price,
      discount,
      skuId: skuInResponse,
      flags
    } = this.props;
    const { showSellerList, selectedSkuId, selectedPartnerId } = this.state;
    const sellers =
      (sizes.find(size => size.skuId === this.state.selectedSkuId) || {})
        .sellers || [];
    const availableSeller = sellers.filter(
      ({ seller }) => seller.inventory > 0
    );
    return (
      <Modal
        className={Style.container}
        cancelCallback={toggleSizeDialog}
        cancelIconConfig={{ show: true }}
      >
        {onCancel => (
          <div>
            <SelectedProductDisplay
              offerId={offerId}
              images={images}
              name={name}
              brand={brand}
              selectedSize={selectedSize}
              offerData={offerData}
              price={price}
              discount={discount}
            />
            <SizeSelector
              id={id}
              className={className}
              sizes={sizes}
              selectedSkuId={selectedSkuId}
              selectedPartnerId={selectedPartnerId[selectedSkuId]}
              onChange={this.onSizeChange}
              onCancel={onCancel}
              header="Select Size"
              selectedSeller={selectedSeller}
              deviceMode={'desktop'}
              onDone={this.onDone}
              skuInResponse={skuInResponse}
              flags={flags}
              renderMoreSeller={(sellerCount, minPrice) => (
                <div>
                  <MoreSellerDesktop
                    sellerCount={sellerCount}
                    minPrice={minPrice}
                    onClick={this.toggleSellerList}
                    showSellerList={showSellerList}
                  />
                  {showSellerList && (
                    <ListSellers
                      deviceMode={'desktop'}
                      availableSeller={availableSeller}
                      selectedSellerId={selectedPartnerId[selectedSkuId]}
                      onChange={this.onSellerChange}
                      wrapper={RadioGroup}
                      className={Style.ListSellerContainer}
                    />
                  )}
                </div>
              )}
            />
          </div>
        )}
      </Modal>
    );
  }
}

export const QtyDialog = props => {
  const {
    selectedSeller,
    quantity,
    toggleQuantityDialog,
    changeQuantity
  } = props;
  const [showWarning, setShowWarning] = useState(false);
  const [offerAmount, setOfferAmount] = useState(0);
  const [selectedQty, setSelectedQty] = useState(quantity);

  const itemOffers = getAttachedProductItemOffer(get(props, 'appliedCoupons'));
  const offerAmounts = get(itemOffers, 'offerAmounts');
  const isCatalogX = get(itemOffers, 'catalogueType') === 'attached_base';
  const pairUpCount = isCatalogX ? get(itemOffers, 'offerAmounts').length : 0;

  const select = e => {
    setSelectedQty(parseInt(e.currentTarget.id));
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
      setOfferAmount(nudgeAmount);
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  };

  const done = () => {
    triggerEvent('ITEM_QUANTITY_CHANGE', {
      custom: {
        custom: {
          v1: props.id,
          v2: selectedQty
        }
      }
    });
    changeQuantity({
      currentTarget: { id: selectedQty }
    });
  };
  const inventory = (selectedSeller || {}).inventory;
  const list = inventory && getQuantityList(inventory);

  return inventory ? (
    <Modal
      className={Style.quantityContainer}
      cancelCallback={toggleQuantityDialog}
      cancelIconConfig={{ show: true, className: Style.cancelIcon }}
    >
      <div className={Style.header}>Select Quantity</div>
      <div className={Style.qtyList}>
        {list.map(({ display, id, available }) => (
          <div
            id={id}
            className={`${Style.item} ${!available ? Style.disabled : null} ${
              selectedQty === id ? Style.selected : null
            }`}
            onClick={available && selectedQty !== id ? select : null}
          >
            <div className={Style.display}>{display}</div>
            {!available && <div className={Style.strike} />}
          </div>
        ))}
      </div>
      {showWarning && (
        <div className={Style.warningContainer}>
          <ImageBanner
            name="additional-offer"
            className={Style.warningIcon}
            width={45}
          />
          <div className={Style.warningContent}>
            You will lose
            <span className={Style.warningAmount}>
              {' '}
              &#8377;{currencyValue(offerAmount)}{' '}
            </span>
            Offer if you reduce quantity of this item.
          </div>
        </div>
      )}
      <Button
        variant="contained"
        width="100%"
        letterSpacing="1px"
        mt={8}
        mb={8}
        onClick={done}
      >
        DONE
      </Button>
    </Modal>
  ) : null;
};
