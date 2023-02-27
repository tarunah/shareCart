import React from 'react';
import PropTypes from 'prop-types';

import Button from 'vision/components/Button';

import Style from './sizeSelector.base.css';
import { Amount, SellerPriceComponent } from '../InlinePriceComponent';
import {
  getMinPriceAndSellerCount,
  isPriceConstantAcrossSelectedSellerAndBBW,
  getSizesList,
  getDisplaySeller
} from 'commonBrowserUtils/CartHelper';
import { scrollIntoView } from 'commonBrowserUtils/Helper';
import get from 'lodash/get';

const Seller = ({ seller = '', className = '' }) => (
  <div className={`${Style.seller} ${className}`}>
    <span>Seller: </span>
    <span className={Style.bold}>{seller}</span>
  </div>
);

const SizeLabel = props => {
  const {
    display,
    id,
    available,
    onClick,
    checked,
    sameBuyButtonWinnerPrice,
    price
  } = props;
  return (
    <div
      id={id}
      data-testid={`sizelabel-${id}`}
      className={`${Style.item} ${!available ? Style.disabled : null} ${
        checked ? Style.selected : null
      }  ${!sameBuyButtonWinnerPrice ? Style.itemWithPrice : null}`}
      onClick={available ? onClick : null}
    >
      <div className={Style.display}>
        {display}
        {!sameBuyButtonWinnerPrice && (
          <Amount
            className={Style.price}
            value={price}
            iconClass={`${Style.iconClass} ${
              checked ? Style.checkedIcon : null
            } ${!available ? Style.disabledIcon : null}`}
          />
        )}
      </div>
      {!available && <div className={Style.strike} />}
    </div>
  );
};

class SizeSelector extends React.PureComponent {
  constructor(props) {
    super(props);
    this.sameBuyButtonWinnerPrice = isPriceConstantAcrossSelectedSellerAndBBW(
      props
    );
  }

  componentDidMount() {
    const field = document.getElementById(this.props.selected);
    scrollIntoView(field, { behavior: 'smooth' });
  }

  render() {
    const {
      props: {
        id,
        header,
        onCancel,
        deviceMode,
        renderMoreSeller,
        selectedSeller,
        sizes,
        selectedSkuId,
        onChange,
        onDone,
        skuInResponse,
        selectedPartnerId,
        flags
      },
      sameBuyButtonWinnerPrice
    } = this;
    const isMobile = deviceMode === 'mobile';
    const selectedPartnerIdInResponse = (selectedSeller || {}).partnerId;
    const sizeList = getSizesList(
      sizes,
      selectedPartnerIdInResponse,
      skuInResponse
    );

    flags.freeItem &&
      sizes.forEach((size, ind) => {
        //freeGift item will always have sellerPartnerId
        const mainItemSeller = size.sellers.find(
          ({ seller }) => seller.partnerId === selectedPartnerIdInResponse
        ) || { seller: {} };
        sizes[ind].sellers = [mainItemSeller];
        sizes[ind].available = get(mainItemSeller, 'seller.inventory', 0) > 0;
      });

    const selectedSize = sizes.find(({ skuId }) => skuId === selectedSkuId) || {
      sellers: [{}]
    };

    const showBuyButtonWinnerPrice = selectedSize.skuId !== skuInResponse;
    const { minPrice, sellerCount } = getMinPriceAndSellerCount(
      selectedSize.sellers,
      selectedPartnerIdInResponse,
      showBuyButtonWinnerPrice
    );

    const displaySeller = getDisplaySeller(selectedPartnerId, selectedSize);
    const { mrp, subTotal, discountText } = displaySeller.price;

    const sellerPriceClassNameConfig = {
      containerClass: Style.priceComponent,
      amountClass: Style.amount,
      strikedAmountClass: Style.strikedAmount,
      discountTextClass: Style.discountText
    };
    return (
      <div>
        <div
          className={`${Style.header} ${
            !isMobile ? Style.desktopHeader : null
          }`}
        >
          {header}
        </div>
        <div className={`${isMobile ? Style.mobileList : null}`}>
          {sizeList.map(({ id, ...props }) => (
            <SizeLabel
              {...props}
              key={id}
              id={id}
              onClick={onChange}
              checked={id === selectedSkuId}
              sameBuyButtonWinnerPrice={sameBuyButtonWinnerPrice}
            />
          ))}
        </div>
        {isMobile && displaySeller.price && (
          <SellerPriceComponent
            subTotal={subTotal}
            mrp={mrp}
            discountText={discountText}
            classNameConfig={sellerPriceClassNameConfig}
          />
        )}
        <Seller
          seller={displaySeller.seller.name}
          className={isMobile ? Style.mobileSeller : null}
        />
        {sellerCount > 0 &&
          renderMoreSeller(sellerCount, minPrice, id, selectedSize.skuId)}
        <Button
          variant="contained"
          width="100%"
          letterSpacing="1px"
          mt={isMobile ? 7 : '24px'}
          borderRadius={isMobile ? 0 : 'small'}
          onClick={onDone.bind(null, onCancel)}
        >
          DONE
        </Button>
      </div>
    );
  }
}

export default SizeSelector;

SizeSelector.propTypes = {
  id: PropTypes.number,
  header: PropTypes.string,
  list: PropTypes.array,
  onCancel: PropTypes.func,
  deviceMode: PropTypes.string,
  renderMoreSeller: PropTypes.func,
  selectedSeller: PropTypes.object,
  sizes: PropTypes.array,
  selectedSkuId: PropTypes.number,
  onChange: PropTypes.func,
  onDone: PropTypes.func,
  selectedPartnerId: PropTypes.number
};
