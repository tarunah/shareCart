import React from 'react';

// Styles
import Style from './addressDesktop.base.css';

// Components
import AddressForm from '../common/AddressForm';
import AddressList from './AddressList';
import Button from 'commonComp/Button';
import DeliveryOptions from '../common/DeliveryOptions';
import ErrorPage from 'commonComp/ErrorPage';
import Loader from 'commonComp/Loader';
import MFU from 'commonComp/MFU/Desktop';
import PriceBlock from 'commonComp/PriceBlock';
import ReturnAbuser from 'commonComp/ReturnAbuserV2';
import SaleTimer from 'commonComp/SaleTimer/Desktop';
import Servicebaility from '../common/Serviceability';
import SpecialOffer from '../common/SpecialOffer';
import TryAndBuy from 'commonComp/TryAndBuy';
import NotServiceableHeader from '../common/NotServiceableHeader';
import PrivacyPolicy from 'commonComp/PrivacyPolicy';
import SavingsFomo from 'commonComp/SavingsFomo';

// Utils
import get from 'lodash/get';
import { getAddressFields } from 'commonBrowserUtils/priceBreakupFields';
import { getTotal } from 'commonBrowserUtils/transformPriceDetails';
import AddressConstants from 'commonBrowserUtils/AddressConstants';
import DiscountUtil from 'commonBrowserUtils/DiscountUtil';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { checkoutPage } from 'commonUtils/constants';
import { getProductDeliveryInfo } from 'commonBrowserUtils/AddressHelper';
import {
  getTryAndBuyOpted,
  getSelectedProducts,
  getSelectedProductsCount
} from 'commonBrowserUtils/Helper';
import { CheckoutConsumerHOC } from '@context/CheckoutContext';

class AddressComponent extends React.Component {
  constructor(props) {
    super(props);
    this.onClickHandler = this.onClickHandler.bind(this);
    if (window.location.search === '?referer=payment')
      triggerEvent('ADDRESS_PAGE_LOAD');
  }

  componentDidMount() {
    SHELL.setActivePage('ADDRESS');
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
          if (res) {
            updateCheckoutState({
              cartData: res,
              selectedAddress
            });
          }
          SHELL.redirectTo('/checkout/payment');
        },
        null,
        { keepPreviousState: true }
      );
  }

  render() {
    let {
      cartData,
      addressData,
      selectedAddressId,
      handleAddressAction,
      handleCartAction,
      error,
      analytics,
      updateDeliveryEstimates
    } = this.props;

    if (cartData && addressData && addressData.length) {
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
      const serviceabilityFlags = get(
        serviceability,
        'serviceabilityFlags',
        {}
      );
      const pincode = get(serviceability, 'addressInfo.pincode');
      const serviceable = get(serviceabilityFlags, 'pincode.value');
      const valueShippingEnabled = get(
        serviceabilityFlags,
        'valueShipping.value'
      );
      const productDeliveryInfo = getProductDeliveryInfo(selectedProducts);

      const total = getTotal(DiscountUtil.getPrice(price), getAddressFields());
      const { value: loyaltypoints } = instruments.find(
        obj => obj.name === 'loyaltypoints'
      );
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
      const validAddress =
        selectedAddressId &&
        (
          addressData.find(
            address => get(address, 'id') === selectedAddressId
          ) || {}
        ).checkoutAllowed;

      const isAllEssentialItemsServiceable = !productDeliveryInfo.find(
        ({ serviceable, isEssential }) => isEssential && !serviceable
      );

      return (
        <div>
          <Loader show={this.props.loading} backdrop={true} />
          <SaleTimer
            saleBannerData={getKVPairValue('SALE_BANNER_DATA')}
            priceRevealData={getKVPairValue('PRICE_REVEAL_DATA')}
            enabled={isFeatureEnabled('SALE_TIMER', { type: 'address' })}
          />
          <div className={Style.addressLayout}>
            <div className={Style.left}>
              {!serviceable && (
                <div className={Style.headerContainer}>
                  <NotServiceableHeader
                    isAllEssentialItemsServiceable={
                      isAllEssentialItemsServiceable
                    }
                    pincode={pincode}
                    className={Style.notServiceableHeader}
                  />
                </div>
              )}
              <ReturnAbuser {...userDetails} shippingCharge={shippingCharge} />
              <SpecialOffer
                show={
                  isFeatureEnabled('VALUE_SHIPPING') && valueShippingEnabled
                }
                className={Style.specialOffer}
              />
              <AddressList
                addressData={addressData}
                handleAddressAction={handleAddressAction}
                selectedAddressId={selectedAddressId}
                selectedShippingData={selectedShippingData}
                serviceabilityFlags={serviceabilityFlags}
                serviceable={serviceable}
                flags={flags}
                isNewUser={userDetails.isFirstTimeCustomer}
              />
            </div>
            <SavingsFomo
              price={price}
              products={selectedProducts}
              currentPage={checkoutPage.ADDRESS}
            />
            <div className={Style.center} />
            <div className={Style.right}>
              {serviceable && (
                <div>
                  <div>
                    <TryAndBuy
                      {...flags}
                      pageSource={checkoutPage.ADDRESS}
                      selectedShippingData={selectedShippingData}
                      count={count}
                      products={selectedProducts}
                      handleCartAction={handleCartAction}
                      isNewUser={userDetails.isFirstTimeCustomer}
                      headerClassName={Style.headerClass}
                    />
                    <div className={Style.divider} />
                  </div>
                  <div>
                    <DeliveryOptions
                      {...serviceability}
                      productDeliveryInfo={productDeliveryInfo}
                      products={selectedProducts}
                      shippingCharge={shippingCharge}
                      shippingData={shippingData}
                      handleCartAction={handleCartAction}
                      className={Style.marginLeft}
                      headerClassName={Style.headerClass}
                      canHide={true}
                    />
                    <div className={Style.divider} />
                  </div>
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
                headerClassName={Style.headerClass}
                tryNBuyApplicable={flags.tryNBuyApplicable.value}
                isAllEssentialItemsServiceable={isAllEssentialItemsServiceable}
                updateDeliveryEstimates={updateDeliveryEstimates}
              />
              <div className={Style.divider} />
              <PriceBlock
                className={Style.priceBlock}
                price={price}
                count={count}
                flags={flags}
                getFields={getAddressFields}
                shippingData={shippingData}
                coverFeeOpted={coverFeeOpted}
                coverFeeApplicableCharge={coverFeeApplicableCharge}
                tryAndBuyOpted={getTryAndBuyOpted(selectedProducts)}
                total={total}
                userDetails={userDetails}
              />
              <div className={Style.marginLeft}>
                <MFU payable={total} points={loyaltypoints} />
                <Button
                  id="placeOrderButton"
                  disabled={!validAddress || !serviceable}
                  className={
                    !validAddress || !serviceable
                      ? Style.disabledBtn
                      : Style.continueBtn
                  }
                  onClick={this.onClickHandler}
                >
                  continue
                </Button>
                {(!validAddress || !serviceable) && (
                  <div className={Style.notServiceableTip}>
                    {(addressData.length > 1 && (
                      <div>Please choose a delivery address to continue.</div>
                    )) || (
                      <div>Please enter a delivery address to continue.</div>
                    )}
                  </div>
                )}
                <PrivacyPolicy
                  page={checkoutPage.ADDRESS}
                  analytics={analytics}
                  total={total}
                />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (addressData && !addressData.length && cartData) {
      const { price, shippingData, products, userDetails } = cartData;
      const isNewUser = get(cartData, 'userDetails.isFirstTimeCustomer', false);
      const selectedProducts = getSelectedProducts(products);
      const count = selectedProducts.length;
      return (
        <div>
          <Loader show={this.props.loading} backdrop={true} />
          <SaleTimer
            saleBannerData={getKVPairValue('SALE_BANNER_DATA')}
            priceRevealData={getKVPairValue('PRICE_REVEAL_DATA')}
            enabled={isFeatureEnabled('SALE_TIMER', { type: 'address' })}
          />
          <div className={Style.addressLayout}>
            <div className={Style.left}>
              <div className={Style.addAddressContainer}>
                <AddressForm
                  isNewUser={isNewUser}
                  handleAddressAction={handleAddressAction}
                  formClass={Style.removeMargin}
                  mode="desktop"
                />
              </div>
            </div>
            <div className={Style.right}>
              <PriceBlock
                price={price}
                count={count}
                getFields={getAddressFields}
                shippingData={shippingData}
                userDetails={userDetails}
              />
            </div>
          </div>
        </div>
      );
    } else if (error) {
      return <ErrorPage reload />;
    }
    return <Loader show={this.props.loading} backdrop={true} />;
  }
}

export default CheckoutConsumerHOC(AddressComponent);
