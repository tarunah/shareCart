import React from 'react';
import get from 'lodash/get';

import ItemContainer from './ItemContainer';

// Cart Common Components
import AddToWishlist from '../../common/AddToWishlist';
import CartItemList from '../../common/CartItemList';
import {
  OutOfStock,
  ProductsUnavailable,
  PriceChange,
  VBHeader,
  CoverFeeHeader,
  NonServiceable
} from '../../common/HeaderComponents';
import AddressStrip from '../../common/AddressStrip';
import BulkActionStrip from '../../common/BulkActionStrip';
import AddressStripV2 from 'commonComp/AddressStripV2';
import ExchangeItemDetails from '../../common/exchange/ItemDetails';
import ExchangeAddressDetails from '../../common/exchange/AddressDetails';
import MessageContainer from '../../common/MessageContainer';

// Common Components
import ReturnAbuser from 'commonComp/ReturnAbuserV2';
import ShippingTip from 'commonComp/ShippingTip';
import BankOffers from 'commonComp/BankOffers';
import Offers from 'commonComp/OffersV2';
import LoginNudge from 'commonComp/LoginNudge';
import LoginShippingText from 'commonComp/LoginShippingText';

// Utilities
import {
  getUnavailableItems,
  getNonServiceableItems
} from 'commonBrowserUtils/CartHelper';
import { bool, isLoggedIn } from 'commonBrowserUtils/Helper';
import { getFreeShipLostData } from 'commonBrowserUtils/FreeShipLostUtil';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { getAbtest } from 'commonUtils/abtestManager';
import { checkoutPage } from 'commonUtils/constants';

// Styles
import Style from './itemBlock.base.css';

class ItemsBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mexpressVisible: false,
      mexpressPlusVisible: false
    };
    this.setMexpressVisibility = this.setMexpressVisibility.bind(this);
    this.setMexpressPlusVisibility = this.setMexpressPlusVisibility.bind(this);

    this.cartMesagingRevamp = isFeatureEnabled('CART_MESSAGING_REVAMP');
  }

  getOfferCard(total) {
    const config = getKVPairValue('CART_OFFER_MESSAGES');
    const messages = get(config, 'cart.messages', []);
    if (get(config, 'cart.enabled', false)) {
      if (isFeatureEnabled('VISUAL_OFFER')) {
        return (
          <BankOffers
            className={this.props.isExchangeCart ? Styles.offerContainer : ''}
            messages={messages}
            currentPage={checkoutPage.CART}
            total={total}
            mode="desktop"
            titleInCaptital={false}
            bankOfferTitleStyle={Style.bankOfferTitle}
          />
        );
      }
      return (
        <Offers
          title={'Available Offers'}
          messages={messages}
          defaultMessageCount={1}
          enabled={
            bool(get(config, 'cart.enabled', false)) && messages.length > 0
          }
        />
      );
    }
    return null;
  }

  setMexpressVisibility(callback) {
    this.setState(prevState => {
      if (!prevState.mexpressVisible) {
        callback && callback();
      }
      return {
        mexpressVisible: true,
        mexpressPlusVisible: prevState.mexpressVisible
      };
    });
  }

  setMexpressPlusVisibility(callback) {
    this.setState(prevState => {
      if (!prevState.mexpressPlusVisible) {
        callback && callback();
      }
      return {
        mexpressVisible: prevState.mexpressVisible,
        mexpressPlusVisible: true
      };
    });
  }

  render() {
    const {
      data: cartData,
      total,
      handleCartAction,
      userSelectedLocation,
      addressData,
      updateUserSelectedLocation,
      handleAddAddressAction,
      totalItemsCount,
      selectedProductCount,
      analytics,
      updateDynamicStyles,
      dynamicStyles,
      toggleCartModal,
      oosItems,
      isExchangeCart,
      totalQuantity,
      updateDeliveryEstimates,
      fineJwellerySteps
    } = this.props;

    const { mexpressVisible, mexpressPlusVisible } = this.state;

    if (cartData) {
      const {
        conflict,
        products,
        virtualBundleConflict,
        userDetails,
        price: { totalSavings, charges: { data: charges = [] } = {} },
        flags,
        coverFeeOpted,
        shippingData,
        exchangeProductDetail
      } = cartData;
      const unavailableItems = getUnavailableItems(products);
      const freeShipLostData = getFreeShipLostData(cartData);

      const shippingCharge =
        (charges.find(field => field.name === 'shipping') || {}).value || 0;

      const nonServiceableItems = getNonServiceableItems(
        products,
        isExchangeCart
      );

      return (
        <div className={Style.leftBlock}>
          {isExchangeCart && (
            <ExchangeItemDetails
              {...exchangeProductDetail}
              mode="desktop"
              flags={flags}
              count={totalQuantity}
              handleCartAction={handleCartAction}
              {...userSelectedLocation}
            />
          )}

          {!isExchangeCart &&
            isFeatureEnabled('ADDRESS_ON_CART_V2') &&
            (getAbtest('CHECKOUT_ADDRESS_ON_CART_V2') === 'variant1' ? (
              <AddressStrip
                mode="desktop"
                {...userSelectedLocation}
                addressData={addressData}
                updateUserSelectedLocation={updateUserSelectedLocation}
                handleAddressAction={this.props.handleAddressAction}
                isNewUser={userDetails.isFirstTimeCustomer}
              />
            ) : (
              <AddressStripV2
                mode="desktop"
                {...userSelectedLocation}
                addressData={addressData}
                updateUserSelectedLocation={updateUserSelectedLocation}
                history={history}
                handleAddressAction={this.props.handleAddressAction}
                isNewUser={userDetails.isFirstTimeCustomer}
              />
            ))}

          <CoverFeeHeader
            totalSavings={totalSavings}
            coverFeeApplicable={get(flags, 'coverFeeApplicable.value')}
            coverFeeApplicableRemark={get(flags, 'coverFeeApplicable.remark')}
            coverFeeOpted={coverFeeOpted}
          />

          {this.cartMesagingRevamp ? (
            <MessageContainer
              {...cartData}
              isExchangeCart={isExchangeCart}
              handleCartAction={handleCartAction}
              displayCartModal={toggleCartModal}
              mode="desktop"
              shippingData={shippingData}
              analytics={analytics}
              bankOffertitleInCaptital={false}
              bankOfferTitleStyle={Style.bankOfferTitle}
            />
          ) : (
            <React.Fragment>
              {!isExchangeCart && this.getOfferCard()}
              <LoginShippingText
                shippingData={shippingData}
                selectedProductCount={selectedProductCount}
                analytics={analytics}
              />
              {selectedProductCount > 0 &&
                isFeatureEnabled('CART_SHIPPING_TIP_VISIBLE') && (
                  <ShippingTip
                    {...userDetails}
                    shippingData={shippingData}
                    charges={charges}
                    total={total}
                    analytics={analytics}
                  />
                )}
              {conflict && conflict.state === 'CONFLICTED' && (
                <PriceChange
                  handleCartAction={handleCartAction}
                  products={products}
                />
              )}
              {oosItems.length > 0 && (
                <OutOfStock
                  handleCartAction={handleCartAction}
                  oosItems={oosItems}
                  analytics={analytics}
                  displayCartModal={toggleCartModal}
                />
              )}
              {nonServiceableItems && nonServiceableItems.length > 0 && (
                <NonServiceable displayCartModal={toggleCartModal} />
              )}
            </React.Fragment>
          )}

          {!get(flags, 'checkoutReady.value') &&
            unavailableItems.length > 0 && (
              <ProductsUnavailable
                handleCartAction={handleCartAction}
                unavailableItems={unavailableItems}
              />
            )}

          {!this.cartMesagingRevamp && (
            <ReturnAbuser {...userDetails} shippingCharge={shippingCharge} />
          )}

          {virtualBundleConflict && !this.cartMesagingRevamp && <VBHeader />}

          <BulkActionStrip
            totalItemsCount={totalItemsCount}
            selectedProductCount={selectedProductCount}
            mode="desktop"
            products={products}
            handleCartAction={handleCartAction}
          />

          <CartItemList
            data={cartData}
            handleCartAction={this.props.handleCartAction}
            render={(
              cartItemsGroup,
              options,
              handleCartAction,
              lazyloadImage
            ) => (
              <ItemContainer
                itemGroup={cartItemsGroup}
                handleCartAction={handleCartAction}
                options={options}
                freeShipLostData={freeShipLostData}
                cartLevelFlags={flags}
                updateDynamicStyles={updateDynamicStyles}
                dynamicStyles={dynamicStyles}
                isExchangeCart={isExchangeCart}
                updateDeliveryEstimates={updateDeliveryEstimates}
                mexpressVisible={mexpressVisible}
                mexpressPlusVisible={mexpressPlusVisible}
                setMexpressPlusVisibility={this.setMexpressPlusVisibility}
                setMexpressVisibility={this.setMexpressVisibility}
                fineJwellerySteps={fineJwellerySteps}
                lazyloadImage={lazyloadImage}
              />
            )}
          />
          {!isLoggedIn() ? (
            <LoginNudge analytics={analytics} />
          ) : (
            <AddToWishlist />
          )}

          {isExchangeCart && this.getOfferCard()}

          {isExchangeCart && (
            <ExchangeAddressDetails mode="desktop" {...userSelectedLocation} />
          )}
        </div>
      );
    }
    return null;
  }
}

export default ItemsBlock;
