import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

// Style Related Imports.
import Styles from './cartFillerProduct.base.css';

// Common Components
import { ItemImage } from '../../../common/ItemComponents';
import { getProgressiveImage } from 'commonBrowserUtils/imageUtils';

import sanitize from 'commonUtils/Sanitize';

import Close from 'iconComp/Close.jsx';
import Rupee from 'iconComp/Rupee.jsx';

const IMAGE_SIZE = {
  width: 172
};

class CartFillerProduct extends React.Component {
  constructor(props) {
    super(props);

    [
      'renderSizes',
      'toggleSizeSelector',
      'addSizeToCart',
      'triggerProductClickEvent'
    ].forEach(method => (this[method] = this[method].bind(this)));

    this.state = {
      sizeSelector: false
    };
  }

  toggleSizeSelector() {
    const { product } = this.props;
    const availableSizeData = get(product, 'availableSizeData');

    if (availableSizeData.toLowerCase().indexOf('onesize') > -1) {
      this.addSizeToCart(availableSizeData);
    } else {
      this.setState({
        sizeSelector: !this.state.sizeSelector
      });
    }
  }

  addSizeToCart(selectedSize) {
    const { product, index } = this.props;
    const { inventoryInfo = [] } = product;
    const skuSize = inventoryInfo.find(size => size.label === selectedSize);
    const data = [
      {
        id: get(product, 'id'),
        skuId: get(skuSize, 'skuId'),
        quantity: 1
      }
    ];

    this.setState(
      {
        sizeSelector: false
      },
      () => this.props.addToCart(data, index)
    );
  }

  triggerProductClickEvent() {
    const { product, index } = this.props;
    triggerEvent('CART_FILLER_MINI_PDP', {
      maData: {
        entity_type: 'product',
        entity_name: 'cart-filler',
        entity_id: get(product, 'id')
      },
      custom: {
        widget: {
          name: 'cart-filler',
          type: 'cart-filler',
          data_set: {
            data: [
              {
                entity_type: 'cart',
                enitity_id: get(product, 'id')
              }
            ]
          }
        },
        widget_items: {
          data_set: {
            data: [
              {
                entity_type: 'product',
                entity_name: get(product, 'name'),
                entity_id: get(product, 'id'),
                entity_optional_attribute: {
                  h_position: index,
                  v_position: 0
                }
              }
            ]
          }
        }
      }
    });
  }

  renderSizes(sizes) {
    sizes = sizes.filter(({ inventory }) => inventory > 0);
    return sizes.map(size => {
      return (
        <div
          key={get(size, 'skuId')}
          className={Styles.size}
          onClick={() => {
            this.addSizeToCart(size.label.toString());
          }}
        >
          {size.label}
        </div>
      );
    });
  }

  render() {
    const { product } = this.props;
    const sizes = get(product, 'inventoryInfo') || [];
    const image = get(product, 'defaultImage.secureSrc') || '';
    return (
      <div className={Styles.cartFillerProduct}>
        <div className={Styles.imageWrapper}>
          <div
            className={`${Styles.imageShimmer} ${
              this.state.sizeSelector ? Styles.imageVisible : ''
            }`}
          />
          <div onClick={this.triggerProductClickEvent}>
            <ItemImage
              itemUrl={`/${get(product, 'id')}`}
              itemImage={getProgressiveImage(image, {
                q: 95,
                w: IMAGE_SIZE.width
              })}
              flags={false}
              imageSize={IMAGE_SIZE}
              options={{
                newTabRedirection: true
              }}
            />
          </div>
          <div
            className={`${Styles.sizeSelector} ${
              this.state.sizeSelector ? Styles.visible : ''
            }`}
          >
            <div className={Styles.header}>
              <span> Select a size </span>
              <Close
                className={Styles.closeIcon}
                onClick={this.toggleSizeSelector}
              />
            </div>
            <div className={Styles.sizeWrapper}>{this.renderSizes(sizes)}</div>
          </div>
        </div>
        <div className={Styles.info}>
          <div className={Styles.brandName}> {get(product, 'brandName')} </div>
          <div className={Styles.productDescription}>
            {' '}
            {get(product, 'name')}{' '}
          </div>
          <div className={Styles.priceInfo}>
            <span className={Styles.boldtext}>
              <Rupee className={Styles.rupeeIcon} />
              {get(product, 'price')}
            </span>
            {get(product, 'discountDisplayLabel') ? (
              <span>
                <span className={Styles.originalPrice}>
                  <Rupee className={Styles.rupeeIcon} />
                  {get(product, 'mrp')}
                </span>
                <span
                  className={Styles.discountLabel}
                  dangerouslySetInnerHTML={{
                    __html: sanitize(get(product, 'discountDisplayLabel'))
                  }}
                />
              </span>
            ) : null}
          </div>
          <div
            className={Styles.button}
            onClick={() => {
              if (!this.state.sizeSelector) {
                this.toggleSizeSelector();
              }
            }}
          >
            Add To Bag
          </div>
        </div>
      </div>
    );
  }
}

CartFillerProduct.propTypes = {
  index: PropTypes.number,
  product: PropTypes.object,
  addToCart: PropTypes.func
};

export default CartFillerProduct;
