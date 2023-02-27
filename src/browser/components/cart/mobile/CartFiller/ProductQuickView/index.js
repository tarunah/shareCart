import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

// Style Imports.
import Styles from './productQuickView.base.css';

// React Component Imports.
import { CartFillerSizeDialog } from '../../Dialogs';
import { ItemImage } from '../../../common/ItemComponents';
import { getProgressiveImage } from 'commonBrowserUtils/imageUtils';
import sanitize from 'commonUtils/Sanitize';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

import RupeeBold from 'iconComp/RupeeBold.jsx';
import RupeeStriked from 'iconComp/RupeeStriked.jsx';
import Close from 'iconComp/Close.jsx';

const IMAGE_SIZE = {
  width: '100%',
  height: 'auto'
};

const fireDefaultMiniPDPEvent = (product, index, customHeader) =>
  triggerEvent('CART_FILLER_MINI_PDP', {
    maData: {
      entity_type: 'product',
      entity_name: 'cart-filler',
      entity_id: get(product, 'id')
    },
    custom: {
      custom: { v1: customHeader },
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

class ProductQuickView extends React.Component {
  constructor(props) {
    super(props);

    ['toggleSizeSelector', 'changeSizeAndGoBack'].forEach(
      method => (this[method] = this[method].bind(this))
    );

    this.state = {
      sizeSelector: false
    };
  }

  componentDidMount() {
    const { product = {}, index, fireCustomEvents, customHeader } = this.props;
    /**
     * Madalytics Events.
     */

    fireCustomEvents
      ? fireCustomEvents(product, index)
      : fireDefaultMiniPDPEvent(product, index, customHeader);
  }

  toggleSizeSelector() {
    if (this.props.oneSizeProductSkuId) {
      this.props.addSizeToCart({
        currentTarget: { id: this.props.oneSizeProductSkuId }
      });
      this.props.goBack && this.props.goBack();
    } else {
      this.setState({
        sizeSelector: !this.state.sizeSelector
      });
    }
  }

  changeSizeAndGoBack(e) {
    const { addSizeToCart, goBack } = this.props;
    addSizeToCart(e);
    goBack && goBack();
  }

  render() {
    const { product = {} } = this.props;
    const styleImages = product.styleImages || [];
    const defaultImageSet = styleImages.map(image => get(image, 'secureSrc'));

    const isCartStrikeOffMRP = isFeatureEnabled('CART_STRIKE_OFF_MRP');

    const Price = (
      <span className={Styles.price}>
        <RupeeBold className={Styles.rupeeIcon} />
        {get(product, 'price')}
      </span>
    );
    const MRP = get(product, 'discountDisplayLabel') && (
      <span className={Styles.mrp}>
        <RupeeStriked className={Styles.rupeeIcon} />
        {get(product, 'mrp')}{' '}
      </span>
    );

    return (
      <div className={Styles.productQuickView}>
        <div
          className={Styles.shimmer}
          onClick={this.props.toggleProductQuickView}
        />
        <div className={Styles.productView}>
          <div className={Styles.iconWrapper}>
            <Close
              className={Styles.crossIcon}
              onClick={this.props.toggleProductQuickView}
            />
          </div>
          <div className={Styles.imageComponent}>
            {defaultImageSet.map((image, key) =>
              image !== '' ? (
                <div className={Styles.thumbnail} key={key}>
                  <ItemImage
                    itemUrl={`/${get(product, 'id')}`}
                    itemImage={getProgressiveImage(image, {
                      q: 85,
                      w: 400
                    })}
                    flags={false}
                    imageSize={IMAGE_SIZE}
                    onImageClick={this.props.toggleProductQuickView}
                  />
                </div>
              ) : null
            )}
          </div>
          <div className={Styles.info}>
            <div className={Styles.brandName}>
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
            <div className={Styles.button} onClick={this.toggleSizeSelector}>
              {' '}
              Add to Bag{' '}
            </div>
          </div>
        </div>
        <CartFillerSizeDialog
          show={this.state.sizeSelector}
          changeSize={this.changeSizeAndGoBack}
          sizes={product.inventoryInfo}
          toggleSizeDialog={this.toggleSizeSelector}
        />
      </div>
    );
  }
}

ProductQuickView.propTypes = {
  index: PropTypes.number,
  product: PropTypes.object,
  oneSizeProductSkuId: PropTypes.object,
  addSizeToCart: PropTypes.func,
  toggleProductQuickView: PropTypes.func,
  fireCustomEvents: PropTypes.func,
  customHeader: PropTypes.string
};

ProductQuickView.defaultProps = {
  addSizeToCart: () => {},
  toggleProductQuickView: () => {},
  customHeader: ''
};

export default ProductQuickView;
