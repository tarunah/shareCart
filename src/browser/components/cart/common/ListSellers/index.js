import React from 'react';
import PropTypes from 'prop-types';

import ButtonV2 from 'commonComp/ButtonV2';
import { SellerPriceComponent } from '../InlinePriceComponent';
import Style from './listSeller.base.css';
import CheckboxActive from 'iconComp/CheckboxActive.jsx';
import RadioActive from 'iconComp/RadioActive.jsx';
import RadioInActive from 'iconComp/RadioInactive.jsx';

const SelectButton = props => {
  const { checked, onClick, value } = props;
  return (
    <div className={Style.button}>
      {checked ? (
        <div className={Style.checkedButton}>
          <CheckboxActive className={Style.selectedCheckboxIcon} />
          <span className={Style.selectedText}>SELECTED</span>
        </div>
      ) : (
        <ButtonV2
          classname={Style.unCheckedButton}
          onClick={onClick}
          id={value}
          text="SELECT"
        />
      )}
    </div>
  );
};

const SellerInfo = props => {
  const {
    seller: { name },
    price: { mrp, subTotal, discountText = '' },
    checked,
    onClick,
    value,
    isMobile
  } = props;
  const sellerPriceClassNameConfig = {
    containerClass: Style.priceContainer
  };

  const seller = (
    <div className={Style.sellerBox}>
      <div className={Style.selectedText}>{name}</div>
      <SellerPriceComponent
        subTotal={subTotal}
        mrp={mrp}
        discountText={discountText}
        classNameConfig={sellerPriceClassNameConfig}
      />
      {isMobile && (
        <SelectButton checked={checked} onClick={onClick} value={value} />
      )}
    </div>
  );
  return isMobile ? (
    seller
  ) : (
    <div
      className={Style.radioButtonSeller}
      onClick={onClick}
      id={value}
      data-testid={`sellerinfo-${value}`}
    >
      {checked ? (
        <RadioActive className={`${Style.radioIcon} ${Style.selectedRadio}`} />
      ) : (
        <RadioInActive
          className={`${Style.radioIcon} ${Style.uncheckedRadio}`}
        />
      )}
      <div className={Style.seller}>{seller}</div>
    </div>
  );
};

const ListSellers = props => {
  const {
    availableSeller,
    selectedSellerId,
    onChange,
    deviceMode,
    className = '',
    wrapper: Wrapper = 'div'
  } = props;
  const isMobile = deviceMode !== 'desktop';
  //First seller is the BuyButtonWinner, Should preSelect BuyButtonWinner
  //for other sizes not selected by the user in desktop.
  const selectedPartnerID =
    selectedSellerId || (isMobile ? null : availableSeller[0].seller.partnerId);

  return (
    <Wrapper
      value={selectedPartnerID}
      onChange={onChange}
      className={className}
    >
      {availableSeller.map((seller, index) => (
        <SellerInfo
          {...seller}
          isMobile={isMobile}
          value={seller.seller.partnerId}
          id={seller.seller.partnerId}
          key={`${index}-seller.name`}
          checked={selectedPartnerID === seller.seller.partnerId}
          onClick={onChange}
        />
      ))}
    </Wrapper>
  );
};

export default ListSellers;

ListSellers.propTypes = {
  availableSeller: PropTypes.array.isRequired,
  selectedPartnerID: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  deviceMode: PropTypes.string.isRequired,
  className: PropTypes.string,
  wrapper: PropTypes.element.isRequired
};
