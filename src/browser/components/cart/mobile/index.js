import React from 'react';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

//Common Components
import Loader from 'commonComp/Loader';
import SaleTimer from 'commonComp/SaleTimer/Mobile';
import ReturnAbuser from 'commonComp/ReturnAbuserV2';
import ShippingTip from 'commonComp/ShippingTip';
import CheckoutSteps from 'commonComp/CheckoutSteps';
import BankOffers from 'commonComp/BankOffers';
import PrivacyPolicy from 'commonComp/PrivacyPolicy';
import Loadable from 'commonComp/Loadable';
import Offers from 'commonComp/OffersV2';
import MyntraValuesStrip from 'commonComp/MyntraValuesStrip';
import ShimmerPlaceholder from 'commonComp/ShimmerPlaceholder';

// Cart Common Components
import CartModal from '../common/CartModal';
import CartFillerContainer from '../common/CartFillerContainer';
import {
  OutOfStock,
  ProductsUnavailable,
  VBHeader,
  CoverFeeHeader,
  TaxBanner,
  NonServiceable,
  SavingsFeedback,
  SellerChangeNotification
} from '../common/HeaderComponents';
import EmptyCart from '../common/EmptyCart';
import AddressStrip from '../common/AddressStrip';
import MessageContainer from '../common/MessageContainer';

import ItemsBlock from './ItemsBlock';
import OptionsBlock from './OptionsBlock';
import PriceBlock from './PriceBlock';
import PlaceOrder from './PlaceOrder';
import CreditsBlock from './CreditsBlock';
import PriceChangeContainer from './PriceDropAlert';
import WishlistCarousalV2 from './WishlistCarousalV2';

// Utils
import { getTotal } from 'commonBrowserUtils/transformPriceDetails';
import { getCartFields } from 'commonBrowserUtils/priceBreakupFields';
import {
  getOOSItems,
  getUnavailableItems,
  goToWishlist,
  getCartItemsReturnInfo,
  getPriceChangeInfo,
  getTotalItemsCount,
  getNonServiceableItems,
  triggerExpressCheckoutFlag,
  isPriorityCheckoutEnabled
} from 'commonBrowserUtils/CartHelper';
import {
  bool,
  setDocTitleInMobile,
  gotoHomePage,
  getSelectedProducts,
  getSelectedProductsCount,
  getTotalQuantityInCart,
  scrollIntoView,
  errorNotification,
  isLoggedIn
} from 'commonBrowserUtils/Helper';
import DiscountUtil from 'commonBrowserUtils/DiscountUtil';
import Strings from 'commonBrowserUtils/Strings';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
import {
  isFeatureEnabled,
  isVariantEnabled
} from 'commonUtils/FeaturesManager';
import { getAbtest } from 'commonUtils/abtestManager';
import loadComponent from 'commonUtils/loadComponent';
import EmptyStateBlock from './EmptyStateBlock';
import Styles from './mobile.base.css';
let ExpressCheckoutContainer = null;
import { checkoutPage, pageMode } from 'commonUtils/constants';
import BulkActionStrip from '../common/BulkActionStrip';
import ExchangeItemDetails from '../common/exchange/ItemDetails';
import ExchangeAddressDetails from '../common/exchange/AddressDetails';
import LoginNudge from 'commonComp/LoginNudge';
import LoginShippingText from 'commonComp/LoginShippingText';
import CanceledOrderModal from '../common/CanceledOrderModal';
import StyleCappingModal from '../common/StyleCappingModal';
import TrustNSafetyMarker from '../common/TrustNSafety';

import { SnackBarButton } from 'commonComp/SnackBar';
import AddressStripV2 from 'commonComp/AddressStripV2';
import PositiveReinforcement from './PositiveReinforcement';

import ArrowDown from 'iconComp/ArrowDown.jsx';
import flatten from 'lodash/flatten';

const PLACE_ORDER_TEXT = 'PLACE ORDER';
const EXCHANGE_TEXT = 'EXCHANGE';

const CartFiller = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "cartFillerMobile" */
      './CartFiller'
    ),
  loading: (props = {}) => <Loader show={false} backdrop={false} {...props} />,
  errorCallback: () => errorNotification({ message: Strings.BUNDLE_LOAD_ERROR })
});

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

class CartComponent extends React.Component {
  constructor(props) {
    super(props);
    this.isCartWishlistFGEnabled = isFeatureEnabled('CART_WISHLIST');
    this.state = {
      expressCheckoutLoaded: false,
      showPriceDetailsSnackBarButton: false,
      showAutoApplyNudge: false
    };
    this.hasExpressCheckoutAB = isFeatureEnabled('EXPRESS_CHECKOUT');

    const { threshold = 0 } = getKVPairValue('CART_PRICE_CHANGE_CONFIG');

    this.isCTAEnabled = isFeatureEnabled('CHECKOUT_CTA_TEXT');
    this.priceChangeThreshold = threshold;
    this.savingsFeedbackConfig = getGrowthHackConfigValue('SAVINGS_FEEDBACK');

    this.cartMesagingRevamp = isFeatureEnabled('CART_MESSAGING_REVAMP');
    this.isAddressOnCartV2Enabled = isFeatureEnabled('ADDRESS_ON_CART_V2');
    this.isSavingsFeedbackEnabled = isFeatureEnabled('SAVINGS_FEEDBACK');
    this.isReinforcementEnabled = isFeatureEnabled(
      'CART_POSITIVE_REINFORCEMENT'
    );
    this.isCartShowCouponEnabled = isFeatureEnabled('CART_SHOW_COUPON');

    this.isAocV2Variant3Enabled = isVariantEnabled('AOC_V2_VARIANT3');
    [
      'togglePriceDetailsSnackBar',
      'scrollToPriceBlock',
      'triggerExpressCheckoutEvent'
    ].forEach(method => (this[method] = this[method].bind(this)));

    this.priceBlockRef = React.createRef();
  }

  componentDidMount() {
    setDocTitleInMobile('SHOPPING BAG', {
      hideStepNumber:
        this.props.isExchangeCart ||
        this.isAocV2Variant3Enabled ||
        isFeatureEnabled('CHECKOUT_STEPS_MWEB')
    });

    const shouldDynamicLoadExpress =
      this.hasExpressCheckoutAB && !ExpressCheckoutContainer;
    if (shouldDynamicLoadExpress) {
      import(
        /* webpackChunkName: "expressCheckoutMobile" */ './ExpressCheckoutContainer'
      )
        .then(module => {
          ExpressCheckoutContainer = module.default;
          this.setState({ expressCheckoutLoaded: true });
        })
        .catch(e => console.error('could not load xpresscheckout', e));
    }
  }

  togglePriceDetailsSnackBar() {
    this.setState(prevState => ({
      showPriceDetailsSnackBarButton: !prevState.showPriceDetailsSnackBarButton,
      showAutoApplyNudge: this.shouldShowAutoApplyNudge
        ? !prevState.showAutoApplyNudge
        : this.shouldShowAutoApplyNudge
    }));
  }

  scrollToPriceBlock(e, couponType = '') {
    const source =
      e.currentTarget && e.currentTarget.getAttribute('data-source');
    const priceBlock = get(this, 'priceBlockRef.current.base');
    scrollIntoView(priceBlock, { behavior: 'smooth', block: 'center' });

    if (this.shouldShowAutoApplyNudge) {
      triggerEvent('AUTO_APPLY_NUDGE_CLICKED');
      return;
    }

    if (this.shouldShowCouponNudge) {
      triggerEvent('COUPON_NUDGES_CLICKED', {
        custom: {
          custom: {
            v1: couponType
          }
        }
      });
      return;
    }

    const eventName =
      source === 'ClickableCartTotal'
        ? 'TOTAL_AMOUNT_CLICK'
        : 'PRICE_DETAIL_CLICK';
    triggerEvent(eventName);
  }

  componentDidUpdate() {
    setDocTitleInMobile('SHOPPING BAG', {
      hideStepNumber:
        this.props.isExchangeCart ||
        this.isAocV2Variant3Enabled ||
        isFeatureEnabled('CHECKOUT_STEPS_MWEB')
    });
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    this.shouldShowAutoApplyNudge =
      !isLoggedIn() &&
      isFeatureEnabled('COUPON_AWARENESS') &&
      (nextProps.data?.coupons?.length > 0 ||
        nextProps.data?.applicableCoupons?.length > 0);

    this.shouldShowCouponNudge =
      isFeatureEnabled('COUPON_NUDGES') &&
      (nextProps.data?.coupons?.filter(coupon => coupon?.status === 'SUCCESS')
        .length > 0 ||
        nextProps.data?.applicableCoupons?.length > 0 ||
        nextProps.data?.potentialCoupons?.length > 0);

    nextProps.data?.applicableCoupons?.length > 0 &&
      triggerEvent(
        this.showAutoApplyNudge
          ? 'AUTO_APPLY_COUPON_AVAILABLE'
          : 'COUPON_NUDGES_COUPON_AVAILABLE',
        {
          custom: {
            custom: {
              v1: nextProps.data?.applicableCoupons
                ?.map(coupon => coupon?.code)
                ?.toString(),
              v2: flatten(
                nextProps.data?.applicableCoupons?.map(
                  coupon => coupon.discountUnits
                )
              )?.reduce(
                (totalDiscount, discount) => discount.value + totalDiscount,
                0
              )
            }
          }
        }
      );

    nextProps.data?.applicableCoupons?.length > 0 &&
      triggerEvent('APPLICABLE_COUPON_AVAILABLE', {
        custom: {
          custom: {
            v1: nextProps.data?.applicableCoupons
              ?.map(coupon => coupon?.code)
              ?.toString(),
            v2: flatten(
              nextProps.data?.applicableCoupons?.map(
                coupon => coupon.discountUnits
              )
            )?.reduce(
              (totalDiscount, discount) => discount.value + totalDiscount,
              0
            ),
            v3: nextProps.data?.price?.total,
            v4: nextProps.data?.userDetails?.isFirstTimeCustomer
          }
        }
      });

    if (this.shouldShowAutoApplyNudge && !this.sentEventForNudgeShown) {
      this.sentEventForNudgeShown = true;
      triggerEvent('AUTO_APPLY_NUDGE_SHOWN');
    }
    if (this.shouldShowCouponNudge) {
      let couponType =
        nextProps.data?.coupons?.filter(coupon => coupon?.status === 'SUCCESS')
          .length > 0
          ? 'APPLIED COUPON'
          : nextProps.data?.applicableCoupons?.length > 0
          ? 'APPLICABLE COUPON'
          : 'POTENTIAL COUPON';
      triggerEvent('COUPON_NUDGES_SHOWN', {
        custom: {
          custom: {
            v1: couponType
          }
        }
      });
    }
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
            mode="mobile"
            titleInCaptital={true}
            bankOfferTitleStyle={Styles.bankOfferTitle}
            bankOfferPillContainerStyle={Styles.bankOfferPillContainer}
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
  }

  triggerExpressCheckoutEvent() {
    const selectedAddress = get(this, 'props.userSelectedLocation.addressInfo');
    const cartData = this.props.data;
    triggerExpressCheckoutFlag(cartData, !isEmpty(selectedAddress));
  }

  render() {
    const {
      data,
      handleCartAction,
      handleAddressAction,
      error,
      loading,
      toggleExpressCheckoutHalfCard,
      showExpressCheckoutHalfCard,
      updatePageData,
      setLoader,
      history,
      analytics,
      userSelectedLocation,
      addressData,
      updateUserSelectedLocation,
      updateCredits,
      creditsBalance,
      totalWishlistProductCount,
      isExchangeCart
    } = this.props;

    const selectedProducts = getSelectedProducts(get(data, 'products'));
    const exchangeProductDetail = get(this, 'props.data.exchangeProductDetail');
    const unifiedAddressId = get(
      this.props,
      'userSelectedLocation.addressInfo.unifiedId',
      ''
    );

    if (get(data, 'count') > 0) {
      const {
        userDetails,
        price,
        price: {
          instruments: { data: instruments },
          charges: { data: charges = [] } = {},
          totalSavings,
          mrp
        },
        flags,
        conflict = {},
        products,
        virtualBundleConflict,
        shippingData = {},
        coverFeeOpted,
        coupons,
        applicableCoupons
      } = data;

      const { value: loyaltypoints } = instruments.find(
        obj => obj.name === 'loyaltypoints'
      );
      const total = getTotal(DiscountUtil.getPrice(price), getCartFields());

      const totalItemsCount = getTotalItemsCount(products);
      const selectedProductCount = getSelectedProductsCount(selectedProducts);
      const selectedProductQuantity = getTotalQuantityInCart(selectedProducts);

      const oosItems = getOOSItems(products);
      const unavailableItems = getUnavailableItems(products);
      const { cartModal, toggleCartModal, updateDynamicStyles } = this.props;
      const coverFeeApplicable = get(flags, 'coverFeeApplicable.value');
      const coverFeeApplicableRemark = get(flags, 'coverFeeApplicable.remark');

      const cartItemsReturnInfo = getCartItemsReturnInfo(products);
      const shippingCharge =
        (charges.find(field => field.name === 'shipping') || {}).value || 0;

      const { cancelOrderModal, toggleCancelOrderModal } = this.props;

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

      /*
        Show return policy Info Banner if
      - AB variant is `oncard` AND
      - All products have the same return policy
      - cartCount > 1
      */
      const showReturnInfoBanner =
        isFeatureEnabled('RETURN_POLICY_ON_INFO_STRIP') &&
        get(cartItemsReturnInfo, 'sameReturnPeriod', false) &&
        get(cartItemsReturnInfo, 'cartCount') > 1 &&
        (get(cartItemsReturnInfo, 'allReturnable', false) ||
          get(cartItemsReturnInfo, 'allExchangeable', false));

      const {
        products: priceChangedProducts = [],
        netDiff
      } = getPriceChangeInfo(products);
      const absNetDiff = Math.abs(netDiff);
      const showPriceChangeAlert = netDiff < 0;
      const nonServiceableItems = getNonServiceableItems(
        selectedProducts,
        isExchangeCart
      );

      if (typeof this.isPriorityCheckoutEnabled === 'undefined') {
        this.isPriorityCheckoutEnabled = isPriorityCheckoutEnabled(data);
      }

      if (typeof this.isExpressCheckoutEnabled === 'undefined') {
        this.isExpressCheckoutEnabled =
          this.hasExpressCheckoutAB && !this.isPriorityCheckoutEnabled;
      }

      if (!this.placeOrderText) {
        const { cartCTAText } = getGrowthHackConfigValue('CHECKOUT_CTA');
        const { xpressCartCTA = 'Place Order' } =
          getGrowthHackConfigValue('XPRESS_CHECKOUT_CONFIG') || {};

        if (this.isExpressCheckoutEnabled) {
          this.placeOrderText = xpressCartCTA.toUpperCase();
        } else if (this.isCTAEnabled && cartCTAText) {
          this.placeOrderText = cartCTAText.toUpperCase();
        } else {
          this.placeOrderText = PLACE_ORDER_TEXT;
        }
      }

      const serviceabilityData = get(
        data,
        'serviceability.productDeliveryInfo',
        []
      );
      const serviceabilityFlags = get(
        data,
        'serviceability.serviceabilityFlags',
        {}
      );
      const selectedAddress = get(userSelectedLocation, 'addressInfo');
      const renderExpressCheckoutHc =
        this.isExpressCheckoutEnabled &&
        !isExchangeCart &&
        ExpressCheckoutContainer &&
        !!serviceabilityData.length &&
        !isEmpty(selectedAddress);

      const shippingMobileNumber = get(selectedAddress, 'user.mobile', 0);
      const hashedMobile = get(selectedAddress, 'user.hashedMobile', 0);

      const showPriceDroppedWishlist =
        this.isCartWishlistFGEnabled && totalWishlistProductCount > 0;

      let couponNudgeText = '';
      let couponType = '';
      if (
        (coupons || []).filter(coupon => coupon?.status === 'SUCCESS')?.length
      ) {
        couponNudgeText = 'Offer Available On Cart';
        couponType = 'APPLIED COUPON';
      } else if (applicableCoupons?.length) {
        const discount = flatten(
          applicableCoupons.map(coupon => coupon.discountUnits)
        )?.reduce(
          (totalDiscount, discount) => discount.value + totalDiscount,
          0
        );
        couponNudgeText = `Extra ₹${discount} OFF by using best coupon`;
        couponType = 'APPLICABLE COUPON';
      } else {
        couponNudgeText = 'Best coupon available';
        couponType = 'POTENTIAL COUPON';
      }

      const disableCouponLineItemInPrice =
        isFeatureEnabled('COUPON_NUDGES') &&
        (coupons || []).filter(coupon => coupon?.status === 'SUCCESS')
          ?.length === 0 &&
        applicableCoupons?.length > 0;

      return (
        <div>
          <Loader show={loading} backdrop={true} />
          <div
            className={`${Styles.mobile} ${
              showReturnInfoBanner ? Styles.returnPolicyOnStripAb : ''
            }`}
          >
            <TaxBanner />

            <CheckoutSteps
              currentPage={'Bag'}
              hideSteps={
                this.isExpressCheckoutEnabled ||
                isExchangeCart ||
                this.isAocV2Variant3Enabled
              }
            />

            {isFeatureEnabled('CART_TRUST_AND_SAFETY_MARKER') && (
              <TrustNSafetyMarker mode="mobile" />
            )}

            {isExchangeCart && (
              <ExchangeItemDetails
                {...exchangeProductDetail}
                mode={pageMode.MOBILE}
                flags={flags}
                count={selectedProductQuantity}
                handleCartAction={handleCartAction}
                {...userSelectedLocation}
              />
            )}
            {this.shouldShowAutoApplyNudge ? (
              <SnackBarButton
                icon={ArrowDown}
                data-source="coupon"
                show={this.state.showPriceDetailsSnackBarButton}
                text="Offer Available On Cart"
                onClick={this.scrollToPriceBlock}
              />
            ) : this.shouldShowCouponNudge ? (
              <SnackBarButton
                icon={ArrowDown}
                data-source="coupon"
                show={this.state.showPriceDetailsSnackBarButton}
                text={couponNudgeText}
                snackBarClass={Styles.couponNudgeSnackBar}
                containerClass={Styles.couponNudgeContainer}
                onClick={e => {
                  this.scrollToPriceBlock(e, couponType);
                }}
              />
            ) : (
              totalItemsCount > 5 && (
                <SnackBarButton
                  icon={ArrowDown}
                  show={this.state.showPriceDetailsSnackBarButton}
                  text="Price Details"
                  onClick={this.scrollToPriceBlock}
                />
              )
            )}
            <SaleTimer
              saleBannerData={getKVPairValue('SALE_BANNER_DATA')}
              priceRevealData={getKVPairValue('PRICE_REVEAL_DATA')}
              enabled={isFeatureEnabled('SALE_TIMER', { type: 'cart' })}
            />
            {!isExchangeCart &&
              this.isAddressOnCartV2Enabled &&
              (getAbtest('CHECKOUT_ADDRESS_ON_CART_V2') === 'variant1' ? (
                <AddressStrip
                  {...userSelectedLocation}
                  mode={pageMode.MOBILE}
                  addressData={addressData}
                  updateUserSelectedLocation={updateUserSelectedLocation}
                  handleAddressAction={this.props.handleAddressAction}
                  history={history}
                />
              ) : (
                <AddressStripV2
                  {...userSelectedLocation}
                  mode={pageMode.MOBILE}
                  page={checkoutPage.CART}
                  addressData={addressData}
                  updateUserSelectedLocation={updateUserSelectedLocation}
                  history={history}
                  handleAddressAction={this.props.handleAddressAction}
                />
              ))}
            <CoverFeeHeader
              totalSavings={totalSavings}
              coverFeeApplicable={coverFeeApplicable}
              coverFeeApplicableRemark={coverFeeApplicableRemark}
              coverFeeOpted={coverFeeOpted}
              className={Styles.cfHeader}
            />

            {this.cartMesagingRevamp ? (
              <MessageContainer
                {...data}
                isExchangeCart={isExchangeCart}
                handleCartAction={handleCartAction}
                displayCartModal={toggleCartModal}
                savingsFeedbackConfig={this.savingsFeedbackConfig}
                isSavingsFeedbackEnabled={this.isSavingsFeedbackEnabled}
                analytics={analytics}
                mode="mobile"
                selectedProductCount={selectedProductCount}
                bankOffertitleInCaptital={true}
                bankOfferTitleStyle={Styles.bankOfferTitle}
                bankOfferPillContainerStyle={Styles.bankOfferPillContainer}
              />
            ) : (
              <React.Fragment>
                {!isExchangeCart && this.getOfferCard(total)}
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
                {showPriceChangeAlert && (
                  <PriceChangeContainer
                    products={priceChangedProducts}
                    netDrop={absNetDiff}
                    threshold={this.priceChangeThreshold}
                  />
                )}
                {this.isSavingsFeedbackEnabled && (
                  <SavingsFeedback
                    price={price}
                    savingsFeedbackConfig={this.savingsFeedbackConfig}
                  />
                )}
                <SellerChangeNotification products={products} />
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
            {virtualBundleConflict && !this.cartMesagingRevamp && <VBHeader />}
            {!this.cartMesagingRevamp && (
              <ReturnAbuser {...userDetails} shippingCharge={shippingCharge} />
            )}
            <BulkActionStrip
              totalItemsCount={totalItemsCount}
              selectedProductCount={selectedProductCount}
              mode={pageMode.MOBILE}
              products={products}
              handleCartAction={handleCartAction}
              total={total}
              isExchangeCart={isExchangeCart}
              totalQuantity={selectedProductQuantity}
              scrollToPriceBlock={this.scrollToPriceBlock}
            />
            <ItemsBlock
              {...this.props}
              cartItemsReturnInfo={cartItemsReturnInfo}
              priceChangedList={priceChangedProducts}
              showPriceChangeAlert={showPriceChangeAlert}
              togglePriceDetailsSnackBar={this.togglePriceDetailsSnackBar}
              fineJwellerySteps={getKVPairValue('FINE_JWELLERY_STEPS')}
            />
            {!isLoggedIn() && <LoginNudge analytics={analytics} />}
            {isFeatureEnabled('CART_FILLER_DEFAULT') &&
              !showPriceDroppedWishlist && (
                <CartFillerContainer
                  {...this.props}
                  render={props => <CartFiller {...props} />}
                />
              )}
            {showPriceDroppedWishlist && <WishlistCarousalV2 {...this.props} />}

            {isExchangeCart && (
              <ExchangeAddressDetails
                mode={pageMode.MOBILE}
                {...userSelectedLocation}
              />
            )}

            <OptionsBlock
              {...this.props}
              total={total}
              isCartShowCouponEnabled={this.isCartShowCouponEnabled}
            />
            <CreditsBlock
              show={isFeatureEnabled('CART_CREDIT')}
              cartData={data}
              creditsBalance={creditsBalance}
              updatePageData={updatePageData}
              isExchangeCart={isExchangeCart}
              setLoader={setLoader}
              updateCredits={updateCredits}
            />
            {isExchangeCart && this.getOfferCard(total)}
            <PriceBlock
              {...this.props}
              count={selectedProductCount}
              total={total}
              totalQuantity={selectedProductQuantity}
              ref={this.priceBlockRef}
              disableCouponLineItemInPrice={disableCouponLineItemInPrice}
            />
            {this.isReinforcementEnabled && (
              <PositiveReinforcement cartData={data} />
            )}
            {renderExpressCheckoutHc && (
              <ExpressCheckoutContainer
                cartData={data}
                showExpressCheckoutHalfCard={showExpressCheckoutHalfCard}
                updatePageData={updatePageData}
                hideExpressCheckoutHalfCard={toggleExpressCheckoutHalfCard}
                setLoader={setLoader}
                history={history}
                serviceabilityData={serviceabilityData}
                serviceabilityFlags={serviceabilityFlags}
                addressData={selectedAddress}
                analytics={analytics}
              />
            )}
            {isFeatureEnabled('CHECKOUT_INSIDER') && (
              <InsiderRewards
                cartData={data}
                selectedProducts={selectedProducts}
                page={checkoutPage.CART}
              />
            )}
            <MyntraValuesStrip currentPage={checkoutPage.CART} />
            {(this.isExpressCheckoutEnabled || isExchangeCart) && (
              <PrivacyPolicy
                page={checkoutPage.CART}
                analytics={analytics}
                total={total}
              />
            )}
            <PlaceOrder
              coverFeeOpted={coverFeeOpted}
              coverFeeApplicable={coverFeeApplicable}
              coverFeeApplicableRemark={coverFeeApplicableRemark}
              handleCartAction={handleCartAction}
              handleAddressAction={handleAddressAction}
              unifiedAddressId={unifiedAddressId}
              displayCartModal={toggleCartModal}
              products={products}
              disabled={!get(flags, 'checkoutReady.value')}
              disabledRemark={get(flags, 'checkoutReady.remark')}
              virtualBundleConflict={virtualBundleConflict}
              updateDynamicStyles={updateDynamicStyles}
              conflictState={get(conflict, 'state')}
              total={total}
              totalSavings={totalSavings}
              mrp={mrp}
              points={loyaltypoints}
              hasExpressCheckoutAB={renderExpressCheckoutHc}
              isCTAEnabled={this.isCTAEnabled}
              toggleExpressCheckoutHalfCard={toggleExpressCheckoutHalfCard}
              cartItemsReturnInfo={cartItemsReturnInfo}
              placeOrderText={
                isExchangeCart ? EXCHANGE_TEXT : this.placeOrderText
              }
              cartId={this.props.data.id}
              showReturnInfoBanner={showReturnInfoBanner}
              analytics={analytics}
              selectedProductCount={selectedProductCount}
              currentPage={checkoutPage.CART}
              price={price}
              isExchangeCart={isExchangeCart}
              totalQuantity={selectedProductQuantity}
              selectedAddress={selectedAddress}
              triggerExpressCheckoutEvent={this.triggerExpressCheckoutEvent}
              updateStyleViolation={updateStyleViolation}
            />
          </div>
          {cartModal.show && (
            <CartModal
              {...cartModal.params}
              cancelCallback={toggleCartModal}
              handleCartAction={handleCartAction}
              oosItems={oosItems}
              nonServiceableItems={nonServiceableItems}
              analytics={analytics}
              mode={pageMode.MOBILE}
            />
          )}
          {cancelOrderModal && (
            <CanceledOrderModal mode="mobile" toggle={toggleCancelOrderModal} />
          )}
          {isStyleCappingModalShown && (
            <StyleCappingModal
              mode="mobile"
              toggle={toggleStyleCappingModal}
              data={styleViolationData}
              shippingMobileNumber={shippingMobileNumber}
              hashedMobile={hashedMobile}
            />
          )}
        </div>
      );
    } else if (get(data, 'count') === 0) {
      const cartProps = {
        gotoHomePage,
        goToWishlist,
        isFeedEnabled: isFeatureEnabled('CART_EMPTY')
      };
      return (
        <div className={Styles.mobile}>
          {isExchangeCart && (
            <ExchangeItemDetails
              {...exchangeProductDetail}
              mode={pageMode.MOBILE}
              handleCartAction={handleCartAction}
              {...userSelectedLocation}
            />
          )}
          <EmptyCart {...cartProps} />
          {cartProps.isFeedEnabled && <EmptyStateBlock />}
        </div>
      );
    } else if (error) {
      return <ErrorPage message={'Something went wrong! Please reload.'} />;
    } else if (loading) {
      return <ShimmerPlaceholder type="cart" mode="mobile" />;
    }
  }
}

export default CartComponent;
