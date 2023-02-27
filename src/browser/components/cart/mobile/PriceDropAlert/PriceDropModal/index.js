import React from 'react';
import Styles from '../priceDropAlert.base.css';
import PropTypes from 'prop-types';
import Modal from 'commonComp/Modal';
import Image from 'commonComp/Image';

import { priceChangeTypes } from 'commonUtils/constants';
import Rupee from 'iconComp/Rupee.jsx';
import PriceDrop from 'iconComp/PriceDrop.jsx';

const { INCREASED } = priceChangeTypes;

const PriceChangeMsg = ({ amount, isInc }) => (
  <div className={Styles.priceChangeMsg}>
    Price {isInc ? 'increased' : 'dropped'} by{' '}
    <PriceDrop className={isInc ? Styles.priceIncIcon : Styles.priceDropIcon} />{' '}
    <b>
      <Rupee className={Styles.rupeeIcon} />
      {amount}
    </b>
  </div>
);

PriceChangeMsg.propTypes = {
  amount: PropTypes.number,
  isInc: PropTypes.bool
};

const ProductPriceAlert = ({ image, brand, diff, type, id }) => (
  <div className={Styles.productPriceAlert} key={id}>
    <div className={Styles.imgWrapper}>
      <Image src={image} width={111} height={148} visible="true" />
    </div>
    <div className={Styles.productInfo}>
      <h4>{brand}</h4>
      <p>
        <PriceChangeMsg amount={Math.abs(diff)} isInc={type === INCREASED} />
      </p>
    </div>
  </div>
);

const PriceDropModal = ({
  products,
  totalDrop,
  cancelModal,
  priceChangeTxt
}) => (
  <Modal
    cancelCallback={cancelModal}
    halfCard={true}
    cancelIconConfig={{ show: true, className: Styles.cancel }}
    className={Styles.priceDropModal}
  >
    <div className={Styles.priceDropAlertContainer}>
      <h4>
        Bag price dropped by{' '}
        <b>
          <Rupee className={Styles.rupeeIcon} />
          {totalDrop}
        </b>
      </h4>
      <p>{priceChangeTxt}</p>
      <div className={Styles.priceChangedProducts}>
        {products.map(product => (
          <ProductPriceAlert {...product} />
        ))}
      </div>
    </div>
  </Modal>
);

PriceChangeMsg.propTypes = {
  totalDrop: PropTypes.number,
  products: PropTypes.array,
  cancelModal: PropTypes.func,
  priceChangeTxt: PropTypes.string
};

export default PriceDropModal;
