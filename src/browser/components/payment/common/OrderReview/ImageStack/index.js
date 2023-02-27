import React from 'react';
import Image from 'commonComp/Image';
import Styles from './icon.base.css';

const ICON_SIZE = {
  height: 40,
  width: 30
};

export const ImageStack = ({ cartProducts = [] }) => {
  const products = cartProducts.slice(0, 3).reverse();
  return products.map((product, index) => (
    <div className={Styles[`Image${products.length - index}`]}>
      <Image
        src={product.images[0]?.secureSrc}
        height={ICON_SIZE.height}
        width={ICON_SIZE.width}
      />
    </div>
  ));
};
