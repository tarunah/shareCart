import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import Styles from './cartFillerProduct.base.css';

// Common Components
import { ItemImage } from '../../../common/ItemComponents';
import ProductQuickView from '../ProductQuickView';
import { getProgressiveImage } from 'commonBrowserUtils/imageUtils';
import { isApp } from 'commonBrowserUtils/Helper';
import sanitize from 'commonUtils/Sanitize';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

import { CartFillerSizeDialog } from '../../Dialogs';
import {
  triggerRecoHalfCardClose,
  triggerOnSKUSelector
} from '../../WishlistCarousalV2/wishlistEventUtils';

import RupeeBold from 'iconComp/RupeeBold.jsx';
import RupeeStriked from 'iconComp/RupeeStriked.jsx';

const IMAGE_SIZE = {
  width: 148,
  height: 197
};
const CART_FILLER_HASH = '#cart-filler';

class CartFillerProduct extends React.Component {
  constructor(props) {
    super(props);
    // Functional Binds.
    [
      'toggleSizeSelector',
      'toggleProductQuickView',
      'addSizeToCart',
      'addToURLHash',
      'goBack',
      'checkURLHashOnBack'
    ].forEach(method => (this[method] = this[method].bind(this)));

    const { product } = this.props;
    const availableSizeData = get(product, 'availableSizeData');
    const oneSizeProductSkuId =
      availableSizeData.toLowerCase().indexOf('onesize') > -1
        ? product.inventoryInfo[0].skuId
        : false;

    this.state = {
      sizeSelector: false,
      productQuickView: false,
      oneSizeProductSkuId
    };
  }

  toggleProductQuickView() {
    if (!this.props.isDisablePopup) {
      document.body.style.overflow = this.state.productQuickView
        ? 'auto'
        : 'hidden';
      this.setState(
        {
          productQuickView: !this.state.productQuickView
        },
        () => {
          if (this.state.productQuickView) {
            this.addToURLHash();
          } else {
            this.goBack();
          }
        }
      );
    }
  }

  toggleSizeSelector() {
    if (this.state.oneSizeProductSkuId) {
      this.addSizeToCart({
        currentTarget: { id: this.state.oneSizeProductSkuId }
      });
    } else if (this.props.handleSizeSelector) {
      this.props.handleSizeSelector(this.props.product, this.props.index);
    } else {
      document.body.style.overflow = this.state.sizeSelector
        ? 'auto'
        : 'hidden';

      isApp() &&
        (this.state.sizeSelector
          ? triggerRecoHalfCardClose(this.props.product)
          : triggerOnSKUSelector(this.props.product));

      this.setState(({ sizeSelector }) => ({
        sizeSelector: !sizeSelector
      }));
    }
  }

  addSizeToCart(eventObject = { currentTarget: { id: '' } }) {
    const skuId = eventObject.currentTarget.id;
    const { product, index } = this.props;
    const { inventoryInfo = [] } = product;
    const skuSize = inventoryInfo.find(size => size.skuId === skuId);
    const data = [
      {
        id: get(product, 'id'),
        skuId: get(skuSize, 'skuId'),
        quantity: 1
      }
    ];
    this.setState(
      {
        sizeSelector: false,
        productQuickView: false
      },
      () => {
        document.body.style.overflow = 'auto';
        this.props.addToCart(data, index);
      }
    );
  }

  checkURLHashOnBack() {
    const hash = get(this.props, 'history.location.hash') || '';
    if (!hash.includes(CART_FILLER_HASH) && this.state.productQuickView) {
      document.body.style.overflow = 'auto';
      this.setState({
        productQuickView: false
      });
    }
  }

  addToURLHash() {
    const push = get(this.props, 'history.push', () => {});
    push(CART_FILLER_HASH);
  }

  goBack() {
    const goBack = get(this.props, 'history.goBack', () => {});
    goBack();
  }

  componentDidMount() {
    window.addEventListener('popstate', this.checkURLHashOnBack, false);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.checkURLHashOnBack, false);
  }

  render() {
    const {
      product,
      index,
      customize: { classes = {}, customImageSize = {}, eventTrigger = {} } = {},
      isDisablePopup = false,
      customHeader
    } = this.props;
    const image = get(product, 'defaultImage.secureSrc') || '';

    const isCartStrikeOffMRP = isFeatureEnabled('CART_STRIKE_OFF_MRP');

    const Price = (
      <span className={Styles.price}>
        <RupeeBold className={Styles.priceRupeeIcon} />
        {get(product, 'price')}
      </span>
    );
    const MRP = get(product, 'discountDisplayLabel') && (
      <span className={Styles.mrp}>
        <RupeeStriked className={Styles.mrpRupeeIcon} />
        {get(product, 'mrp')}{' '}
      </span>
    );

    return (
      <div
        className={`${Styles.cartFillerProduct} ${get(
          classes,
          'customCartFillerProduct',
          ''
        )}`}
      >
        <div
          className={`${Styles.thumbnail} ${get(
            classes,
            'customCartFillerThumbnail',
            ''
          )}`}
          onClick={this.toggleProductQuickView}
        >
          <ItemImage
            itemImage={getProgressiveImage(image, {
              q: 95,
              w: customImageSize.cloudinaryWidth || IMAGE_SIZE.width
            })}
            flags={false}
            imageSize={{
              width: customImageSize.width || IMAGE_SIZE.width,
              height: customImageSize.height || IMAGE_SIZE.height
            }}
          />
        </div>
        <div className={Styles.info}>
          <div
            className={Styles.clickableInfo}
            onClick={this.toggleProductQuickView}
          >
            <div
              className={`${Styles.brandName} ${get(
                classes,
                'customCartFillerBrandName',
                ''
              )}`}
            >
              {' '}
              {get(product, 'brandName')}{' '}
            </div>
            <div className={Styles.productDescription}>
              {' '}
              {get(product, 'name')}{' '}
            </div>
            <div className={Styles.priceInfo}>
              {isCartStrikeOffMRP ? [MRP, Price] : [Price, MRP]}
              {get(product, 'discountDisplayLabel') ? (
                <span
                  className={Styles.discountLabel}
                  dangerouslySetInnerHTML={{
                    __html: sanitize(get(product, 'discountDisplayLabel'))
                  }}
                />
              ) : null}
            </div>
          </div>
          <div
            className={`${Styles.button} ${get(
              classes,
              'customCartFillerButton'
            )}`}
            onClick={this.toggleSizeSelector}
          >
            {' '}
            Add To Bag{' '}
          </div>
        </div>
        <CartFillerSizeDialog
          show={this.state.sizeSelector}
          changeSize={this.addSizeToCart}
          sizes={product.inventoryInfo}
          toggleSizeDialog={this.toggleSizeSelector}
        />
        {this.state.productQuickView ? (
          <ProductQuickView
            goBack={this.goBack}
            index={index}
            product={product}
            oneSizeProductSkuId={this.state.oneSizeProductSkuId}
            addSizeToCart={this.addSizeToCart}
            toggleProductQuickView={this.toggleProductQuickView}
            fireCustomEvents={eventTrigger.fireCartFillerMiniPDPEvents}
            customHeader={customHeader}
          />
        ) : null}
      </div>
    );
  }
}

CartFillerProduct.propType = {
  index: PropTypes.number,
  product: PropTypes.object,
  history: PropTypes.object,
  addToCart: PropTypes.func,
  customize: PropTypes.object,
  customHeader: PropTypes.string,
  isDisablePopup: PropTypes.bool
};

CartFillerProduct.defaultProps = {
  addToCart: () => {},
  customize: {},
  customHeader: '',
  isDisablePopup: false
};

export default CartFillerProduct;
