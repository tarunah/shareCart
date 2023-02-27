import React from 'react';
import Style from './expresscheckout.base.css';
import PropTypes from 'prop-types';
import { MiniHeaderNav } from './ExpressCheckoutComponents';
import ExpressConstants from './expressConstants';
const { CHANGE, ADDRESS_LIST } = ExpressConstants;

const DeliveryAddress = ({ data = {}, showDetails }) => {
  const {
    addressType,
    user: { name, mobile } = {},
    streetAddress,
    locality,
    city,
    pincode
  } = data;
  const addressDetails = [streetAddress];
  if (locality) {
    addressDetails.push(`, ${locality}`);
  }
  if (city) {
    addressDetails.push(`, ${city}`);
  }
  if (pincode) {
    addressDetails.push(`-${pincode}`);
  }
  const fullAddress = addressDetails.join('');
  return (
    <div className={Style.deliveryAddressWrapper}>
      <MiniHeaderNav
        header={'Address'}
        link={CHANGE}
        action={showDetails}
        section={ADDRESS_LIST}
      />
      <div className={Style.addressContent}>
        <div className={Style.nameAndType}>
          <div className={Style.fullname}>{name}</div>
          <div className={Style.addressType}>{addressType}</div>
        </div>
        <div className={Style.address}>{fullAddress}</div>
        {mobile && <div className={Style.mobile}>{mobile}</div>}
      </div>
    </div>
  );
};

DeliveryAddress.propTypes = {
  data: PropTypes.object,
  showDetails: PropTypes.func
};

DeliveryAddress.defaultProps = {
  showDetails: () => void 0
};

export default DeliveryAddress;
