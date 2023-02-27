import React from 'react';

// Utils
import get from 'lodash/get';
import { getTotal } from 'commonBrowserUtils/transformPriceDetails';
import { getAddressFields } from 'commonBrowserUtils/priceBreakupFields';
import DiscountUtil from 'commonBrowserUtils/DiscountUtil';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
import { cookieKeys, checkoutPage, numbers } from 'commonUtils/constants';
import loadComponent from 'commonUtils/loadComponent';

import {
  isApp,
  navigateTo,
  setCookie,
  setDocTitleInMobile,
  getTryAndBuyOpted,
  getSelectedProducts,
  getSelectedProductsCount,
  getDateDiff
} from 'commonBrowserUtils/Helper';
import {
  getShowCreditConfig,
  isPriorityCheckoutEnabled
} from 'commonBrowserUtils/CartHelper';
import AddressConstants from 'commonBrowserUtils/AddressConstants';
import { getAbtest } from 'commonUtils/abtestManager';
import {
  getProductDeliveryInfo,
  showLandmarkNudge,
  setLandmarkCookie
} from 'commonBrowserUtils/AddressHelper';
import Strings from 'commonBrowserUtils/Strings';

// Components
import Loader from 'commonComp/Loader';
import ReturnAbuser from 'commonComp/ReturnAbuserV2';
import SaleTimer from 'commonComp/SaleTimer/Mobile';
import CheckoutSteps from 'commonComp/CheckoutSteps';
import PriceBlock from 'commonComp/PriceBlock';
import PrivacyPolicy from 'commonComp/PrivacyPolicy';

import DeliveryPreference from './DeliveryPreference';
import { SelectedAddressBlock } from './AddressBlocks';
import DeliveryOptions from '../common/DeliveryOptions';
import Servicebaility from '../common/Serviceability';
import SpecialOffer from '../common/SpecialOffer';
import StickyButton from 'commonComp/StickyButton';
import TryAndBuy from 'commonComp/TryAndBuy';
import NotServiceableHeader from '../common/NotServiceableHeader';
import SavingsFomo from 'commonComp/SavingsFomo';

const InsiderRewards = loadComponent({
  loader: () =>
    import(
      /* webpackChunkName: "insiderRewards" */
      'commonComp/InsiderRewards'
    )
});

const ErrorPage = loadComponent({
  loader: () =>
    import(
      /* webpackChunkName: "errorPage" */
      'commonComp/ErrorPage'
    )
});

const { NudgeBannerWithCTA } = loadComponent({
  loader: () =>
    import(
      /* webpackChunkName: "nudgeBanner" */
      'commonComp/NudgeBanner'
    ),
  loaderProperties: { backdrop: false }
});

// Styles
import Style from './addressMobile.base.css';

const DELIVERY_PREFERENCE_COOKIE_EXPIRY = 3600 * 24 * 180 * 1000;

class AddressComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDeliveryPreference: ''
    };
    this.onClickHandler = this.onClickHandler.bind(this);
    this.selectDeliveryPreference = this.selectDeliveryPreference.bind(this);

    this.hasExpressCheckoutAB = isFeatureEnabled('EXPRESS_CHECKOUT');
    this.deliveryPreferenceEnabled = isFeatureEnabled('DELIVERY_PREFERENCE');
    this.deliveryPreferenceEnabled &&
      setCookie(cookieKeys.DELIVERY_PREFERENCE_COOKIE, '', 0);

    const expressDeliveryConfig = getGrowthHackConfigValue('EXPRESS_DELIVERY');
    this.expressDeliveryPincodes = expressDeliveryConfig.pincodes || {};
    this.expressDeliveryThreshold = expressDeliveryConfig.threshold || 0;
    this.expressDeliveryAvailable = false;
    this.skipPincodeCheck = expressDeliveryConfig.skipPincodeCheck;

    this.expressDeliveryEventSent = false;
    this.isApp = isApp();
    const { addressCTAText } = getGrowthHackConfigValue('CHECKOUT_CTA');
    this.isCTAEnabled = isFeatureEnabled('CHECKOUT_CTA_TEXT');
    this.goToPaymentPageText =
      this.isCTAEnabled && addressCTAText
        ? addressCTAText.toUpperCase()
        : 'CONTINUE';
    this.tryNBuyPositionABValue =
      isFeatureEnabled('TRY_N_BUY_POSITION') && getAbtest('TRY_N_BUY_POSITION');
    this.showSavingsStrip =
      isFeatureEnabled('SAVINGS_PRICE_BLOCK') &&
      get(
        getGrowthHackConfigValue('SAVINGS_STRIP_CONFIG'),
        `visibility.${checkoutPage.ADDRESS}`,
        false
      );
  }

  selectDeliveryPreference(dataMethod) {
    // Deselect if selected earlier
    const selectedMethod =
      dataMethod === this.state.selectedDeliveryPreference ? '' : dataMethod;
    this.setState({
      selectedDeliveryPreference: selectedMethod
    });
  }

  componentDidMount() {
    /**
     * Handle the dispatch of express delivery event for navigation
     * from any of the following screens:
     *  - Edit/Change Address
     *  - Add New Address
     */
    this.props.tempAddressId &&
      this.props.setToContainerState({ tempAddressId: null });
    this.handleExpressDeliveryEvent();
    setDocTitleInMobile('ADDRESS', {
      hideStepNumber: isFeatureEnabled('CHECKOUT_STEPS_MWEB')
    });
    isFeatureEnabled('ADDRESS_LANDMARK') && setLandmarkCookie(numbers.ZERO);
  }

  componentDidUpdate() {
    /**
     * Handle the dispatch of express delivery event for the
     * following events:
     *  - Navigation from cart page
     *  - Change in shipping method
     *
     * The 'expressDeliveryEventSent' check ensures that duplicate events
     * are not sent when component updates due to unrelated actions (such as
     * tapping on the 'Try-n-Buy' checkbox)
     */
    this.handleExpressDeliveryEvent();
  }

  handleExpressDeliveryEvent() {
    if (
      !this.isApp || // Dispatching events only from app as currently (March 2019) Mynaco doesn't support custom events
      !this.expressDeliveryAvailable ||
      this.expressDeliveryEventSent ||
      !this.props.cartData ||
      !this.props.cartData.serviceability
    ) {
      return;
    }

    const {
      id: cartId,
      products,
      shippingData: { method } = {}
    } = this.props.cartData;

    /**
     * A cart is considered eligible for express delivery when at least one item
     * has a delivery period of less than or equal to the specified threshold
     */
    const selectedProducts = getSelectedProducts(products);
    const productDeliveryInfo = getProductDeliveryInfo(selectedProducts);
    const expressDeliveryEligible = productDeliveryInfo.some(
      ({ shippingEstimates }) => {
        const estimate = shippingEstimates.find(
          entry => entry.shippingMethod === method
        );
        if (estimate) {
          const currentDate = new Date();
          const estimateInDays = getDateDiff(
            currentDate,
            get(estimate, 'promiseDate')
          );
          return estimateInDays <= this.expressDeliveryThreshold;
        }
        return false;
      }
    );
    triggerEvent('EXPRESS_DELIVERY_ELIGIBILITY', {
      custom: {
        custom: { v1: expressDeliveryEligible ? 'eligible' : 'not_eligible' },
        widget: {
          name: 'Express_Delivery',
          type: 'card',
          data_set: {
            data: {
              entity_type: 'cart',
              entity_id: cartId
            }
          }
        },
        event_type: 'widgetLoad'
      }
    });
    this.expressDeliveryEventSent = true;
  }

  onClickHandler() {
    const {
      cartData,
      addressData,
      selectedAddressId,
      handleCartAction,
      updateCheckoutState
    } = this.props;
    const selectedAddress =
      addressData.find(address => get(address, 'id') === selectedAddressId) ||
      {};
    const valid =
      get(
        cartData,
        'serviceability.serviceabilityFlags.pincode.value',
        false
      ) && selectedAddress.checkoutAllowed;

    valid &&
      handleCartAction(
        'setOrderAddress',
        {
          unifiedAddressId: selectedAddress.unifiedId,
          addressId: selectedAddressId
        },
        res => {
          triggerEvent('CHECKOUT_CONVERSATION');
          triggerEvent('BTN_CONTINUE_CLICK');
          updateCheckoutState({
            cartData: res,
            selectedAddress
          });

          if (this.deliveryPreferenceEnabled) {
            const { selectedDeliveryPreference } = this.state;
            // Save deliery preference in cookies. To be removed on order confirmation.
            setCookie(
              cookieKeys.DELIVERY_PREFERENCE_COOKIE,
              selectedDeliveryPreference,
              DELIVERY_PREFERENCE_COOKIE_EXPIRY
            );
            triggerEvent('DELIVERY_PREFERENCE_ADDRESS', {
              maData: {
                entity_type: 'cart',
                entity_name: selectedDeliveryPreference,
                entity_id: this.props.cartData.id
              }
            });
          }
          navigateTo('/checkout/payment');
        },
        null,
        { keepPreviousState: true }
      );
  }

  redirectBasedOnAction(path) {
    if (this.isBeingRedirected) {
      return;
    }
    this.isBeingRedirected = true;
    this.props.action === 'back'
      ? this.props.history.goBack()
      : this.props.history.push(path);
  }

  onLandmarkClick(e) {
    triggerEvent('ADD_LANDMARK_CLICK');
  }

  render() {
    const {
      cartData,
      addressData,
      handleCartAction,
      selectedAddressId,
      error,
      dynamicStyles,
      updateDynamicStyles,
      loading,
      analytics,
      updateDeliveryEstimates
    } = this.props;

    if (cartData && addressData && addressData.length && selectedAddressId) {
      const {
        products,
        price,
        price: {
          instruments: { data: instruments }
        },
        flags,
        shippingData,
        serviceability,
        userDetails,
        coverFeeOpted,
        coverFeeApplicableCharge
      } = cartData;

      const selectedProducts = getSelectedProducts(products);
      const count = getSelectedProductsCount(selectedProducts);
      const pincode = get(serviceability, 'addressInfo.pincode');
      const tryNBuyEnabled = get(
        serviceability,
        'flags.tryNBuyApplicable.value'
      );
      const serviceable = get(
        serviceability,
        'serviceabilityFlags.pincode.value'
      );
      const standardShippingEnabled = get(
        serviceability,
        'serviceabilityFlags.standardShipping.value'
      );
      const valueShippingEnabled = get(
        serviceability,
        'serviceabilityFlags.valueShipping.value'
      );
      const sddShippingEnabled = get(
        serviceability,
        'serviceabilityFlags.sddShipping.value'
      );
      const expressShippingEnabled = get(
        serviceability,
        'serviceabilityFlags.expressShipping.value'
      );
      const eligibileShippingAttribute = `_${
        valueShippingEnabled ? 'val_' : ''
      }${standardShippingEnabled ? 'sta_' : ''}${
        sddShippingEnabled ? 'sdd_' : ''
      }${expressShippingEnabled ? 'exp_' : ''}`;
      const productDeliveryInfo = getProductDeliveryInfo(selectedProducts);
      const showPriceBlock =
        expressShippingEnabled +
          sddShippingEnabled +
          valueShippingEnabled +
          standardShippingEnabled !==
          1 || tryNBuyEnabled;

      this.expressDeliveryAvailable =
        !!this.expressDeliveryPincodes[pincode] &&
        shippingData.method === 'NORMAL';

      const validAddress = (
        addressData.find(address => get(address, 'id') === selectedAddressId) ||
        {}
      ).checkoutAllowed;

      !validAddress && this.redirectBasedOnAction('/checkout/address/list');

      const selectedAddressInfo = addressData.find(
        address => get(address, 'id') === selectedAddressId
      );
      const { value: loyaltypoints } = instruments.find(
        obj => obj.name === 'loyaltypoints'
      );
      const total = getTotal(DiscountUtil.getPrice(price), getAddressFields());
      const shippingCharge =
        (
          get(price, 'charges.data', []).find(
            field => field.name === 'shipping'
          ) || {}
        ).value || 0;

      const selectedShippingData = get(
        serviceability,
        AddressConstants.shippingMethodInfoFromKey[shippingData.method]
      );

      // Deliver preference feature should show up
      // only if productDeliveryInfo is atleast 2
      this.deliveryPreferenceEnabled &= productDeliveryInfo.length > 1;

      const {
        showGC: showUsedGCinMRP,
        showLP: showUsedLPinMRP
      } = getShowCreditConfig();

      const isAllEssentialItemsServiceable = !productDeliveryInfo.find(
        ({ serviceable, isEssential }) => isEssential && !serviceable
      );

      if (typeof this.isPriorityCheckoutEnabled === 'undefined') {
        this.isPriorityCheckoutEnabled = isPriorityCheckoutEnabled(cartData);
      }

      if (typeof this.isExpressCheckoutEnabled === 'undefined') {
        this.isExpressCheckoutEnabled =
          this.hasExpressCheckoutAB && !this.isPriorityCheckoutEnabled;
      }

      const showNudgeBanner =
        isFeatureEnabled('ADDRESS_LANDMARK') &&
        serviceable &&
        !selectedAddressInfo.landmark &&
        showLandmarkNudge(numbers.ZERO);

      return validAddress ? (
        <div className={Style.mobileContainer}>
          <CheckoutSteps
            currentPage={'Address'}
            hideSteps={this.isExpressCheckoutEnabled}
          />
          <SaleTimer
            saleBannerData={getKVPairValue('SALE_BANNER_DATA')}
            priceRevealData={getKVPairValue('PRICE_REVEAL_DATA')}
            enabled={isFeatureEnabled('SALE_TIMER', { type: 'address' })}
          />
          <div className={Style.mobile}>
            {!serviceable && (
              <div className={Style.headerContainer}>
                <NotServiceableHeader
                  isAllEssentialItemsServiceable={
                    isAllEssentialItemsServiceable
                  }
                  pincode={pincode}
                />
              </div>
            )}
            <ReturnAbuser {...userDetails} shippingCharge={shippingCharge} />
            <SpecialOffer
              show={isFeatureEnabled('VALUE_SHIPPING') && valueShippingEnabled}
              className={Style.specialOffer}
            />
            {showNudgeBanner && (
              <NudgeBannerWithCTA
                message={Strings.LANDMARK_MAIN_NUDGE}
                className={Style.nudgeContainer}
                cta={Strings.LANDMARK_CTA}
                onFieldClick={this.onLandmarkClick}
                redirect="/checkout/address/edit"
              />
            )}
            <SelectedAddressBlock addressInfo={selectedAddressInfo} />

            {serviceable && (
              <div>
                {!this.tryNBuyPositionABValue && (
                  <TryAndBuy
                    pageSource={checkoutPage.ADDRESS}
                    {...flags}
                    products={selectedProducts}
                    handleCartAction={handleCartAction}
                    productDeliveryInfo={productDeliveryInfo}
                    isNewUser={userDetails.isFirstTimeCustomer}
                  />
                )}
                <DeliveryOptions
                  {...serviceability}
                  productDeliveryInfo={productDeliveryInfo}
                  products={selectedProducts}
                  shippingCharge={shippingCharge}
                  shippingData={shippingData}
                  handleCartAction={handleCartAction}
                  canHide={true}
                />
                <DeliveryPreference
                  show={!!this.deliveryPreferenceEnabled}
                  selectDeliveryPreference={this.selectDeliveryPreference}
                  selectedDeliveryPreference={
                    this.state.selectedDeliveryPreference
                  }
                />
              </div>
            )}
            <Servicebaility
              productDeliveryInfo={productDeliveryInfo}
              addressInfo={get(serviceability, 'addressInfo') || {}}
              shippingData={shippingData}
              tryNBuyServiceable={get(
                selectedShippingData,
                'flags.tryNBuy.value'
              )}
              expressDeliveryAvailable={this.expressDeliveryAvailable}
              expressDeliveryThreshold={this.expressDeliveryThreshold}
              tryNBuyApplicable={flags.tryNBuyApplicable.value}
              isAllEssentialItemsServiceable={isAllEssentialItemsServiceable}
              eligibileShippingAttribute={eligibileShippingAttribute}
              updateDeliveryEstimates={updateDeliveryEstimates}
            />
            {this.tryNBuyPositionABValue === 'abovepricing' && serviceable && (
              <TryAndBuy
                {...flags}
                pageSource={checkoutPage.ADDRESS}
                selectedShippingData={selectedShippingData}
                count={count}
                products={selectedProducts}
                handleCartAction={handleCartAction}
                productDeliveryInfo={productDeliveryInfo}
                isNewUser={userDetails.isFirstTimeCustomer}
              />
            )}
            {showPriceBlock && (
              <PriceBlock
                count={count}
                price={price}
                flags={flags}
                getFields={getAddressFields}
                shippingData={shippingData}
                coverFeeOpted={coverFeeOpted}
                coverFeeApplicableCharge={coverFeeApplicableCharge}
                dynamicStyles={dynamicStyles}
                className={Style.priceBlock}
                tryAndBuyOpted={getTryAndBuyOpted(selectedProducts)}
                total={total}
                userDetails={userDetails}
              />
            )}
            {this.tryNBuyPositionABValue === 'belowpricing' && (
              <TryAndBuy
                {...flags}
                pageSource={checkoutPage.ADDRESS}
                count={count}
                products={selectedProducts}
                handleCartAction={handleCartAction}
                productDeliveryInfo={productDeliveryInfo}
                isNewUser={userDetails.isFirstTimeCustomer}
              />
            )}

            {isFeatureEnabled('CHECKOUT_INSIDER') && (
              <InsiderRewards
                cartData={cartData}
                selectedProducts={selectedProducts}
              />
            )}
            {!this.isExpressCheckoutEnabled && (
              <PrivacyPolicy
                page={checkoutPage.ADDRESS}
                analytics={analytics}
                total={total}
              />
            )}
            <StickyButton
              isCTAEnabled={this.isCTAEnabled}
              total={total}
              text={this.goToPaymentPageText}
              clickHandler={this.onClickHandler}
              points={loyaltypoints}
              updateDynamicStyles={updateDynamicStyles}
              enabled={serviceable}
              currentPage={checkoutPage.ADDRESS}
            />
          </div>
          <Loader show={loading} backdrop={true} />
          <SavingsFomo
            price={price}
            products={selectedProducts}
            currentPage={checkoutPage.ADDRESS}
          />
        </div>
      ) : (
        <Loader show={true} backdrop={true} />
      );
    } else if (
      !loading &&
      (!addressData || !addressData.length || !selectedAddressId)
    ) {
      this.redirectBasedOnAction('/checkout/address/list');
      return <Loader show={true} backdrop={true} />;
    } else if (error) {
      return <ErrorPage />;
    }
    return <Loader show={loading} backdrop={true} />;
  }
}

export default AddressComponent;
