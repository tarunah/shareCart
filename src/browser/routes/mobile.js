import React from 'react';
import { Route } from 'react-router-dom';
import get from 'lodash/get';

import Page from 'commonComp/Page';
import loadComponent from 'commonUtils/loadComponent';

import CartPageHoc from '../components/cart/common/CartPageHoc';
import Cart from '../components/cart/mobile';

const components = {
  coupons: () =>
    import(
      /* webpackChunkName: "couponsPage",
      webpackPrefetch: true */
      '../components/cart/mobile/OptionsBlock/Coupons/CouponsPage'
    ),
  giftwrap: () =>
    import(
      /* webpackChunkName: "giftwrapPage",
      webpackPrefetch: true */
      '../components/cart/mobile/OptionsBlock/GiftWrap/GiftWrapPage'
    ),
  sellers: () =>
    import(
      /* webpackChunkName: "checkoutSellers",
      webpackPrefetch: true */
      '../components/cart/mobile/Sellers'
    ),
  cartAddressForm: () =>
    import(
      /* webpackChunkName: "cartAddressFormPage",
      webpackPrefetch: true */
      '../components/cart/mobile/AddressFormPage'
    ),
  addressPage: () =>
    import(
      /* webpackChunkName: "addressMobile",
      webpackPrefetch: true */
      '../components/address/common/AddressPage'
    ),
  address: () =>
    import(
      /* webpackChunkName: "addressMobile",
      webpackPrefetch: true */
      '../components/address/mobile'
    ),
  addressList: () =>
    import(
      /* webpackChunkName: "addressListMobile",
      webpackPrefetch: true */
      '../components/address/mobile/AddressList'
    ),
  addressForm: () =>
    import(
      /* webpackChunkName: "addressFormMobile",
      webpackPrefetch: true */
      '../components/address/mobile/AddressFormPage'
    ),
  paymentPage: () =>
    import(
      /* webpackChunkName: "paymentsMobile",
          webpackPrefetch: true */
      '../components/payment/common/PaymentPage'
    ),
  payment: () =>
    import(
      /* webpackChunkName: "paymentsMobile",
          webpackPrefetch: true */
      '../components/payment/mobile'
    ),
  paymentOTP: () =>
    import(
      /* webpackChunkName: "paymentsMobile",
          webpackPrefetch: true */
      '../components/payment/mobile/PaymentOTP'
    ),
  otpPage: () =>
    import(
      /* webpackChunkName: "paymentsMobile",
          webpackPrefetch: true */
      '../components/payment/common/OtpPage'
    ),
  confirmationPage: () =>
    import(
      /* webpackChunkName: "confirmationMobile",
      webpackPrefetch: true */
      '../components/confirmation/common/ConfirmationPage'
    ),
  confirmation: () =>
    import(
      /* webpackChunkName: "confirmationMobile",
      webpackPrefetch: true */
      '../components/confirmation/mobile'
    ),
  tncPage: () =>
    import(
      /* webpackChunkName: "tncPage",
      webpackPrefetch: true */
      '../components/payment/common/Options/BNPL/TNCPage'
    )
};

function loadComponentWithKey(key) {
  return loadComponent({ loader: components[key] });
}

const Coupons = loadComponentWithKey('coupons');
const GiftWrap = loadComponentWithKey('giftwrap');
const Sellers = loadComponentWithKey('sellers');
const CartAddressForm = loadComponentWithKey('cartAddressForm');
const AddressPage = loadComponentWithKey('addressPage');
const Address = loadComponentWithKey('address');
const AddressForm = loadComponentWithKey('addressForm');
const AddressList = loadComponentWithKey('addressList');
const PaymentPage = loadComponentWithKey('paymentPage');
const Payment = loadComponentWithKey('payment');
const PaymentOTP = loadComponentWithKey('paymentOTP');
const OtpPage = loadComponentWithKey('otpPage');
const ConfirmationPage = loadComponentWithKey('confirmationPage');
const Confirmation = loadComponentWithKey('confirmation');
const TNCPage = loadComponentWithKey('tncPage');

const CartRoutes = props => (
  <div>
    <Route
      exact
      path="/checkout/cart"
      render={({ history }) => <Cart {...props} history={history} />}
    />
    <Route
      exact
      path="/checkout/cart/giftwrap"
      render={({ history }) => <GiftWrap {...props} goBack={history.goBack} />}
    />
    <Route
      exact
      path="/checkout/cart/coupons"
      render={({ history }) => <Coupons {...props} goBack={history.goBack} />}
    />
    <Route
      exact
      path="/checkout/cart/sellers"
      render={({ history, location }) => (
        <Sellers {...props} goBack={history.goBack} location={location} />
      )}
    />
    <Route
      exact
      path="/checkout/cart/address/add"
      render={({ history, location }) => (
        <CartAddressForm
          title="ADD NEW ADDRESS"
          goBack={history.go}
          history={history}
          location={location}
          {...props}
        />
      )}
    />
    <Route
      exact
      path="/checkout/cart/address/edit/:id"
      render={({ history, location, match }) => (
        <CartAddressForm
          title="EDIT ADDRESS"
          goBack={history.go}
          history={history}
          location={location}
          addressInfo={props.addressData.find(address => {
            return get(address, 'id') === Number(match.params.id);
          })}
          {...props}
        />
      )}
    />
  </div>
);

const AddressRoutes = props => {
  return (
    <div>
      <Route
        exact
        path="/checkout/address"
        render={({ history }) => <Address {...props} history={history} />}
      />
      <Route
        exact
        path="/checkout/address/list"
        render={({ history }) => (
          <AddressList
            {...props}
            history={history}
            successCallback={history.goBack}
          />
        )}
      />
      <Route
        exact
        path="/checkout/address/add"
        render={({ history }) => (
          <AddressForm history={history} goBack={history.go} {...props} />
        )}
      />
      <Route
        exact
        path="/checkout/address/edit"
        render={({ history }) => (
          <AddressForm
            goBack={history.go}
            history={history}
            addressInfo={props.addressData.find(
              address =>
                get(address, 'id') ===
                (props.tempAddressId || props.selectedAddressId)
            )}
            {...props}
          />
        )}
      />
    </div>
  );
};

const PaymentRoutes = props => (
  <div>
    <Route
      exact
      path="/checkout/payment"
      render={({ history }) => <Payment {...props} history={history} />}
    />
    <Route
      exact
      path="/checkout/payment/bnpl/tnc"
      render={({ history }) => <TNCPage {...props} goBack={history.goBack} />}
    />
  </div>
);

const CartPage = CartPageHoc(CartRoutes);

const routes = (
  <Page
    render={({ analytics, DataStore }) => (
      <div>
        <Route
          path="/checkout/cart"
          render={() => (
            <CartPage
              analytics={analytics}
              getCartStoreData={DataStore.getCartData}
              getAddressStoreData={DataStore.getAddressData}
              setCartStoreData={DataStore.setCartData}
              setAddressStoreData={DataStore.setAddressData}
              setPaymentStoreData={DataStore.setPaymentData}
            />
          )}
        />
        <Route
          path="/checkout/address"
          render={({ history }) => (
            <AddressPage
              analytics={analytics}
              history={history}
              getCartStoreData={DataStore.getCartData}
              getAddressStoreData={DataStore.getAddressData}
              setCartStoreData={DataStore.setCartData}
              setAddressStoreData={DataStore.setAddressData}
              getCartOnNoAddress={true}
              render={props => <AddressRoutes {...props} />}
            />
          )}
        />
        <Route
          path="/checkout/confirm"
          render={({ history }) => (
            <ConfirmationPage
              analytics={analytics}
              history={history}
              render={props => <Confirmation {...props} />}
            />
          )}
        />
        <Route
          path="/checkout/payment"
          render={({ history }) => (
            <PaymentPage
              analytics={analytics}
              history={history}
              getCartStoreData={DataStore.getCartData}
              setCartStoreData={DataStore.setCartData}
              getAddressStoreData={DataStore.getAddressData}
              getPaymentStoreData={DataStore.getPaymentData}
              render={props => <PaymentRoutes {...props} />}
            />
          )}
        />
        <Route
          path="/checkout/otp"
          render={() => <OtpPage deviceMode="mobile" analytics={analytics} />}
        />
        <Route
          exact
          path="/checkout/payment/otp"
          render={({ history }) => (
            <PaymentOTP
              deviceMode="mobile"
              analytics={analytics}
              history={history}
            />
          )}
        />
      </div>
    )}
  />
);

export default routes;
