import React, { useState } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

// Common components
import { ItemImage } from '../../common/ItemComponents';
import { getProgressiveImage } from 'commonBrowserUtils/imageUtils';
import { SellerPriceComponent } from '../../common/InlinePriceComponent';
import { CartFillerSizeDialog } from '../Dialogs';
import ButtonV2 from 'commonComp/ButtonV2';
import WishlistBag from 'iconComp/WishlistBag.jsx';
import { PRICE_DROPPED_WISHLIST as Strings } from 'commonBrowserUtils/Strings';

// Utilities
import { onEnteringViewport } from 'commonBrowserUtils/Helper';

// Styles
import Styles from './wishlistCarousalV2.base.css';
import {
  triggerWishListInViewPort,
  triggerRecoHalfCardClose,
  triggerOnSKUSelector,
  triggerWishlistOnProductClick,
  triggerAddToBag
} from './wishlistEventUtils';

const URGENCY_TYPE = {
  PRICE_DROPPED: 'priceDropped',
  FEW_LEFT: 'fewLeft'
};
const URGENCY_CONFIG = {
  [URGENCY_TYPE.PRICE_DROPPED]: {
    text: Strings.URGENCY_TYPE1,
    className: Styles.priceDropped
  },
  [URGENCY_TYPE.FEW_LEFT]: {
    text: Strings.URGENCY_TYPE2,
    className: Styles.fewLeft
  }
};
const IMAGE_SIZE = {
  width: 60,
  height: 80
};

const customize = {
  eventTrigger: {
    fireCartFillerMiniPDPEvents: '' //triggerWishListCarousalClickEvent
  }
};

const Header = () => {
  return (
    <div className={Styles.headerContainer}>
      <WishlistBag className={Styles.iconFill} />
      <span className={Styles.headerText}>{Strings.HEADER}</span>
    </div>
  );
};

const UrgencyText = ({ type }) => {
  return URGENCY_CONFIG[type] ? (
    <div className={`${Styles.urgencyText} ${URGENCY_CONFIG[type].className}`}>
      {URGENCY_CONFIG[type].text}
    </div>
  ) : null;
};

const ItemDetails = ({
  brandName,
  name,
  price,
  mrp,
  discountDisplayLabel,
  urgencyType = URGENCY_TYPE.PRICE_DROPPED
}) => {
  return (
    <div className={Styles.itemDetailsContainer}>
      <div className={Styles.brandName}>{brandName}</div>
      <div className={Styles.productName}>{name}</div>
      <SellerPriceComponent
        subTotal={price}
        mrp={mrp}
        discountText={discountDisplayLabel}
        classNameConfig={{ containerClass: Styles.priceComponent }}
      />
      <UrgencyText type={urgencyType} />
    </div>
  );
};

const ProductCard = props => {
  const [showSizeSelector, setSizeSelector] = useState(false);
  const product = get(props, 'product');
  const itemUrl = getProgressiveImage(get(product, 'styleImages.0.secureSrc'), {
    q: 95,
    w: IMAGE_SIZE.width
  });
  const oneSizeProductSkuId =
    get(product, 'availableSizeData', '')
      .toLowerCase()
      .indexOf('onesize') > -1
      ? product.inventoryInfo[0].skuId
      : false;

  const toggleSizeDialog = () => {
    if (!!oneSizeProductSkuId) {
      addProductToBag({
        currentTarget: { id: oneSizeProductSkuId }
      });
    } else {
      showSizeSelector
        ? triggerRecoHalfCardClose(product)
        : triggerOnSKUSelector(product);
      setSizeSelector(!showSizeSelector);
    }
  };

  const onItemImageClick = () => {
    triggerWishlistOnProductClick(product);
  };

  const addProductToBag = e => {
    const skuId = e.currentTarget.id;
    const { inventoryInfo = [] } = product;
    const skuSize = inventoryInfo.find(size => size.skuId === skuId);
    const data = [
      {
        id: get(product, 'id'),
        skuId: get(skuSize, 'skuId'),
        quantity: 1
      }
    ];
    props.addToCart(data);
  };

  return (
    <div className={Styles.product}>
      <div className={Styles.productWrapper}>
        <ItemImage
          itemImage={itemUrl}
          flags={false}
          imageSize={IMAGE_SIZE}
          itemUrl={`/${product.id}`}
          onImageClick={onItemImageClick}
        />
        <ItemDetails {...product} />
      </div>
      <ButtonV2
        classname={Styles.button}
        containerClassname={Styles.buttonContainer}
        onClick={toggleSizeDialog}
        text={Strings.ADD_TO_BAG}
      />
      <CartFillerSizeDialog
        show={showSizeSelector}
        changeSize={addProductToBag}
        sizes={product.inventoryInfo}
        toggleSizeDialog={toggleSizeDialog}
      />
    </div>
  );
};

class WishlistCarousalV2 extends React.Component {
  constructor(props) {
    super(props);

    ['addToCart', 'setReference'].forEach(
      method => (this[method] = this[method].bind(this))
    );
  }

  setReference(node) {
    try {
      const observer = new IntersectionObserver(
        (entries, observer) => {
          const entry = entries[0];
          if (entry.isIntersecting && entry.intersectionRatio === 1) {
            triggerWishListInViewPort(
              get(this, 'props.totalWishlistProductCount', 0)
            );
            observer.unobserve(entry.target);
          }
        },
        {
          threshold: 1
        }
      );
      node && observer.observe(node);
    } catch (e) {
      node &&
        document.addEventListener(
          'scroll',
          onEnteringViewport(node, () =>
            triggerWishListInViewPort(
              get(this, 'props.totalWishlistProductCount', 0)
            )
          )
        );
    }
  }

  addToCart(data, index) {
    const itemToAdd = {
      styleId: data[0].styleId || data[0].id,
      skuId: data[0].skuId
    };
    const successCB = () => {
      try {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      } catch (e) {
        window.scroll(0, 0);
      }
      const eventData = this.props.wishlistProducts.find(
        product => product.id === itemToAdd.styleId
      );
      triggerAddToBag(eventData);
      this.props.handleCartAction('get');
      this.props.refreshWishlistProducts();
    };
    this.props.handleCartAction('addToCartWishlistItem', itemToAdd, successCB);
  }

  render() {
    const wishlistProducts = get(this, 'props.wishlistProducts', []);
    return (
      wishlistProducts.length > 0 && (
        <div className={Styles.container} ref={this.setReference}>
          <Header />
          <div className={Styles.productContainer}>
            {wishlistProducts.map((item, index) => {
              return (
                <ProductCard
                  index={index}
                  product={item}
                  addToCart={this.addToCart}
                  key={item.id}
                  customize={customize}
                />
              );
            })}
          </div>
        </div>
      )
    );
  }
}

WishlistCarousalV2.propTypes = {
  handleCartAction: PropTypes.func,
  errorCB: PropTypes.func,
  successCB: PropTypes.func,
  wishlistProducts: PropTypes.array.isRequired
};

WishlistCarousalV2.defaultProps = {
  errorCB: () => {},
  successCB: () => {}
};

export default WishlistCarousalV2;
