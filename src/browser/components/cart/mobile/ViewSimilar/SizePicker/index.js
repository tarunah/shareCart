import React, { useState } from 'react';
import Style from './sizePicker.base.css';

const SizePicker = props => {
  const { sizes = [], addSizeToCart } = props;
  const [selectedSize, setSelectedSize] = useState();

  const handleSelectSize = (eventObject = { currentTarget: { id: '' } }) => {
    const skuId = parseInt(
      eventObject.currentTarget.id?.replace('sizePicker', '')
    );
    setSelectedSize(skuId);
    addSizeToCart(skuId);
  };

  return (
    <div className={Style.list}>
      <div className={Style.selectSizeHeading}> Select Size: </div>
      <div>
        {sizes.map(({ label, skuId, available }) => (
          <div
            key={skuId}
            id={`sizePicker${skuId}`}
            className={`${Style.item} ${!available ? Style.disabled : ''} ${
              selectedSize === skuId ? Style.selected : ''
            }`}
            onClick={available ? handleSelectSize : null}
          >
            <div className={Style.label}>{label}</div>
            {!available && <div className={Style.strike} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SizePicker;
