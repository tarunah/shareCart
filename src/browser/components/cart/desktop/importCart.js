import React from 'react';
import get from 'lodash/get';

// Common Components
import MFU from 'commonComp/MFU/Desktop';
import SaleTimer from 'commonComp/SaleTimer/Desktop';
import Loader from 'commonComp/Loader';
import ErrorPage from 'commonComp/ErrorPage';
import PrivacyPolicy from 'commonComp/PrivacyPolicy';
import Loadable from 'commonComp/Loadable';
import ShimmerPlaceholder from 'commonComp/ShimmerPlaceholder';

// Common Cart Components
import CartModal from '../common/CartModal';
import CartFillerContainer from '../common/CartFillerContainer';
import EmptyCart from '../common/EmptyCart';
import ExchangeItemDetails from '../common/exchange/ItemDetails';
import TrustNSafetyMarker from '../common/TrustNSafety';
import CanceledOrderModal from '../common/CanceledOrderModal';
import StyleCappingModal from '../common/StyleCappingModal';

import NewItemsBlock from './ItemsBlock/newItemsBlock.js';
import OptionsBlock from './OptionsBlock';
import PriceBlock from './PriceBlock';
import PlaceOrder from './PlaceOrder';
import { TaxBanner } from '../common/HeaderComponents';

// Utils
import { getTotal } from 'commonBrowserUtils/transformPriceDetails';
import { getCartFields } from 'commonBrowserUtils/priceBreakupFields';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { checkoutPage } from 'commonUtils/constants';
import {
  getOOSItems,
  goToWishlist,
  getTotalItemsCount,
  getNonServiceableItems
} from 'commonBrowserUtils/CartHelper';
import DiscountUtil from 'commonBrowserUtils/DiscountUtil';
import {
  getSelectedProducts,
  getSelectedProductsCount,
  getTotalQuantityInCart,
  errorNotification
} from 'commonBrowserUtils/Helper';

import Strings from 'commonBrowserUtils/Strings';

// Styles
import Styles from './desktop.base.css';

const CartFiller = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "cartFillerDesktop" */
      './CartFiller'
    ),
  loading: (props = {}) => <Loader show={false} backdrop={false} {...props} />,
  errorCallback: () => errorNotification({ message: Strings.BUNDLE_LOAD_ERROR })
});

class ImportCartComponent extends React.Component {
  componentDidMount() {
    // SHELL.setActivePage('SHOPPING BAG', {
    //   hideStepNumber: this.props.isExchangeCart
    // });
  }

  componentDidUpdate() {
    // SHELL.setActivePage('SHOPPING BAG', {
    //   hideStepNumber: this.props.isExchangeCart
    // });
  }

  render() {
    let pageData = null;
    let {
      data,
      error,
      loading,
      updateDynamicStyles,
      isExchangeCart,
      handleCartAction,
      userSelectedLocation
    } = this.props;
    const selectedProducts = getSelectedProducts(get(data, 'products'));
    const exchangeProductDetail = get(this, 'props.data.exchangeProductDetail');

    if (get(data, 'count') > 0) {
      let {
        price,
        price: {
          instruments: { data: instruments }
        },
        products,
        conflict = {},
        virtualBundleConflict,
        flags,
        coverFeeOpted
      } = data;
      const totalItemsCount = getTotalItemsCount(products);
      const selectedProductCount = getSelectedProductsCount(selectedProducts);
      const selectedProductQuantity = getTotalQuantityInCart(selectedProducts);
      const oosItems = getOOSItems(selectedProducts);
      const nonServiceableItems = getNonServiceableItems(selectedProducts);
      conflict = conflict || {};
      let { value: loyaltypoints } = instruments.find(
        obj => obj.name === 'loyaltypoints'
      );
      let total = getTotal(DiscountUtil.getPrice(price), getCartFields());
      const {
        cartModal,
        toggleCartModal,
        analytics,
        cancelOrderModal,
        toggleCancelOrderModal
      } = this.props;
      const {
        isStyleCappingModalShown,
        toggleStyleCappingModal,
        styleCappingData = [],
        updateStyleViolation
      } = this.props;
      const styleViolationData = products.filter(
        product =>
          get(product, 'selectedForCheckout', false) &&
          styleCappingData.find(
            style => style.id === product.id && style.skuId === product.skuId
          )
      );

      const shippingMobileNumber = get(
        userSelectedLocation,
        'addressInfo.user.mobile',
        0
      );
      const selectedAddress = get(userSelectedLocation, 'addressInfo', {});
      const hashedMobile = get(selectedAddress, 'user.hashedMobile', 0);

      pageData = (
        <div>
          <Loader show={loading} backdrop={true} />
          <div className={Styles.cartLayout}>
            <NewItemsBlock
              {...this.props}
              totalItemsCount={totalItemsCount}
              selectedProductCount={selectedProductCount}
              total={total}
              oosItems={oosItems}
              totalQuantity={selectedProductQuantity}
              fineJwellerySteps={getKVPairValue('FINE_JWELLERY_STEPS')}
            />
            <div className={Styles.right}>
              <PlaceOrder
                flow = "IMPORT_CART"
                coverFeeOpted={coverFeeOpted}
                coverFeeApplicable={get(flags, 'coverFeeApplicable.value')}
                handleCartAction={handleCartAction}
                displayCartModal={toggleCartModal}
                products={products}
                disabled={!get(flags, 'checkoutReady.value')}
                disabledRemark={get(flags, 'checkoutReady.remark')}
                virtualBundleConflict={virtualBundleConflict}
                conflictState={conflict && conflict.state}
                total={total}
                updateDynamicStyles={updateDynamicStyles}
                selectedProductCount={selectedProductCount}
                price={price}
                isExchangeCart={isExchangeCart}
                updateStyleViolation={updateStyleViolation}
              />

              {isFeatureEnabled('CART_TRUST_AND_SAFETY_MARKER') && (
                <TrustNSafetyMarker mode="desktop" />
              )}

              {isExchangeCart && (
                <PrivacyPolicy
                  page={checkoutPage.CART}
                  analytics={analytics}
                  total={total}
                />
              )}
            </div>
            {isFeatureEnabled('CART_FILLER_DEFAULT') && (
              <CartFillerContainer
                {...this.props}
                render={props => <CartFiller {...props} />}
              />
            )}
          </div>
          {cartModal.show && (
            <CartModal
              {...cartModal.params}
              cancelCallback={toggleCartModal}
              handleCartAction={handleCartAction}
              oosItems={oosItems}
              nonServiceableItems={nonServiceableItems}
              analytics={analytics}
              mode="desktop"
            />
          )}
          {cancelOrderModal && (
            <CanceledOrderModal
              mode="desktop"
              toggle={toggleCancelOrderModal}
            />
          )}
          {isStyleCappingModalShown && (
            <StyleCappingModal
              mode="desktop"
              toggle={toggleStyleCappingModal}
              data={styleViolationData}
              shippingMobileNumber={shippingMobileNumber}
              hashedMobile={hashedMobile}
            />
          )}
        </div>
      );
    } else if (get(data, 'count') === 0) {
      pageData = (
        <div className={Styles.emptyCart}>
          {isExchangeCart && (
            <ExchangeItemDetails
              {...exchangeProductDetail}
              mode="desktop"
              handleCartAction={handleCartAction}
              {...userSelectedLocation}
            />
          )}
          <EmptyCart goToWishlist={goToWishlist} />
        </div>
      );
    } else if (error) {
      pageData = <ErrorPage message={'Something went wrong! Please reload.'} />;
    } else if (loading) {
      return <ShimmerPlaceholder type="cart" mode="desktop" />;
    }
    return pageData;
  }
}

export default ImportCartComponent;
