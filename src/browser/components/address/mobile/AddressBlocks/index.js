import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Link } from 'react-router-dom';
import AddressDetails from 'commonComp/AddressDetails';

// Styles
import Style from './addressBlocks.base.css';

import { getKVPairValue } from 'commonUtils/KVPairManager';

import RadioActive from 'iconComp/RadioActive.jsx';
import RadioInactive from 'iconComp/RadioInactive.jsx';

const onNewAddressClick = () => {
  triggerEvent('ADD_NEW_ADDRESS_CLICK');
};

const onEditAddressClick = () => {
  triggerEvent('EDIT_ADDRESS_CLICK');
};

export const SelectedAddressBlock = ({ addressInfo }) => (
  <div className={Style.finalAddress}>
    <AddressDetails addressInfo={addressInfo} showDefaultTag={true} />

    <Link className={Style.changeOrAddBtn} to="/checkout/address/list">
      CHANGE OR ADD ADDRESS
    </Link>
  </div>
);

SelectedAddressBlock.propTypes = {
  addressInfo: PropTypes.object.isRequired
};

export const AddressBlock = ({
  addressInfo,
  selected,
  onClickHandler,
  serviceable
}) => {
  const valid = serviceable && addressInfo.checkoutAllowed;
  let errorMsg = '';
  if (!serviceable) {
    errorMsg = getKVPairValue('NON_SERVICEABLE_ADDRESS_ERROR');
  } else if (!addressInfo.checkoutAllowed) {
    errorMsg =
      'Please add house, street and locality details to improve your address or ensure mobile number is valid, before proceeding further.';
  }
  return selected ? (
    <div
      className={`${Style.block}
      ${valid ? Style.serviceable : Style.notServiceable}`}
      onClick={onClickHandler}
      id={addressInfo.id}
    >
      <RadioActive className={Style.radioIcon} />
      <div className={Style.details}>
        <AddressDetails
          className={Style.addressDetail}
          addressInfo={addressInfo}
          notServiceable={!!errorMsg}
        />
        {errorMsg && <div className={Style.error}>{errorMsg}</div>}
      </div>
      <div className={Style.btns}>
        <button className={Style.remove} data-action="remove">
          Remove
        </button>
        <Link
          to="/checkout/address/edit"
          className={Style.edit}
          onClick={onEditAddressClick}
          data-action="edit"
        >
          Edit
        </Link>
      </div>
    </div>
  ) : (
    <div className={Style.block} onClick={onClickHandler} id={addressInfo.id}>
      <RadioInactive className={Style.radioIcon} />
      <div className={Style.details}>
        <AddressDetails
          className={Style.addressDetail}
          addressInfo={addressInfo}
          minimize={true}
        />
      </div>
    </div>
  );
};

AddressBlock.propTypes = {
  addressInfo: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired
};

AddressBlock.defaultProps = {
  selected: false
};

export const AddAddressBlock = () => (
  <div className={Style.addBlockDiv}>
    <Link
      to="/checkout/address/add"
      className={Style.addBlockAnchor}
      onClick={onNewAddressClick}
    >
      Add New Address
    </Link>
  </div>
);
