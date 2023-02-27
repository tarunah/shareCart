import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

// Style and React Component imports.
import Styles from './cartFiller.base.css';
import CartFillerProduct from './CartFillerProduct';
import { PillView } from '../../common/PillView';
import Loader from 'commonComp/Loader';
import ShoppingBag from 'iconComp/ShoppingBag.jsx';

const CartFiller = props => {
  const {
    products = [],
    addToCart,
    className = '',
    isEnableHighlight = false,
    customCartFillerProduct = '',
    handleSizeSelector,
    isDisablePopup = false,
    heading,
    history,
    customHeader,
    articleList = [],
    currentArticle,
    onPillClick,
    loading
  } = props;

  const [highlightedProductId, setHighlightedProductId] = useState(undefined);

  const handleSizePicker = useCallback(
    (product, index) => {
      setHighlightedProductId(product.id);
      handleSizeSelector && handleSizeSelector(product, index);
    },
    [handleSizeSelector]
  );

  let cartFillerComponent = null;
  if (products.length || articleList.length) {
    cartFillerComponent = (
      <div className={`${Styles.cartFiller} ${className}`}>
        {!customHeader && (
          <div className={Styles.header}>
            <ShoppingBag width="19" height="24" />
            <div className={Styles.cartFillerHeading}> {heading} </div>
          </div>
        )}
        <PillView
          mode="mobile"
          articleList={articleList}
          currentArticle={currentArticle}
          onPillClick={onPillClick}
        />
        <Loader show={loading} backdrop={true} />
        <div className={Styles.productWrapper}>
          {products.map((product, index) => {
            let pContainerClass = '';
            if (isEnableHighlight && highlightedProductId) {
              if (highlightedProductId === product.id) {
                pContainerClass = Styles.productHighlight;
              } else {
                pContainerClass = Styles.blur;
              }
            }
            return (
              <CartFillerProduct
                key={product.id}
                isDisablePopup={isDisablePopup}
                index={index}
                history={history}
                product={product}
                addToCart={addToCart}
                handleSizeSelector={
                  handleSizeSelector ? handleSizePicker : null
                }
                customize={{
                  classes: {
                    customCartFillerProduct: `${customCartFillerProduct} ${pContainerClass}`
                  }
                }}
                customHeader={customHeader}
              />
            );
          })}
        </div>
      </div>
    );
  }
  return cartFillerComponent;
};

CartFiller.propTypes = {
  customHeader: PropTypes.string,
  heading: PropTypes.string,
  products: PropTypes.array,
  addToCart: PropTypes.func,
  isEnableHighlight: PropTypes.bool,
  handleSizeSelector: PropTypes.func,
  isDisablePopup: PropTypes.bool
};

CartFiller.defaultProps = {
  customHeader: ''
};

export default CartFiller;
