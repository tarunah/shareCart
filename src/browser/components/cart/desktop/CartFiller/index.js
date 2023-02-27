import React from 'react';
import PropTypes from 'prop-types';

// Style Related Imports.
import Styles from './cartFiller.base.css';

// React Component Imports.
import CartFillerProduct from './CartFillerProduct';
import { PillView } from '../../common/PillView';
import Loader from 'commonComp/Loader';

const CartFiller = props => {
  const {
    products = [],
    addToCart,
    heading,
    articleList = [],
    currentArticle,
    onPillClick,
    loading
  } = props;
  let cartFillerCompnent = null;

  if (products.length || articleList.length) {
    cartFillerCompnent = (
      <div className={Styles.cartFiller}>
        <div className={Styles.cartFillerHeading}> {heading} </div>
        <PillView
          mode="desktop"
          articleList={articleList}
          currentArticle={currentArticle}
          onPillClick={onPillClick}
        />
        <Loader show={loading} backdrop={true} />
        {products.map((product, index) => (
          <CartFillerProduct
            index={index}
            key={product.id}
            addToCart={addToCart}
            product={product}
          />
        ))}
      </div>
    );
  }
  return cartFillerCompnent;
};

CartFiller.propTypes = {
  heading: PropTypes.string,
  products: PropTypes.array,
  addToCart: PropTypes.func
};

export default CartFiller;
