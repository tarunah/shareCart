import React from 'react';
import { Route } from 'react-router-dom';

import Page from 'commonComp/Page';
import Loader from 'commonComp/Loader';
import Loadable from 'commonComp/Loadable';

import Cart from '../components/cart/desktop';
import ImportCart from '../components/cart/desktop/importCart.js'

import CartPageHoc from '../components/cart/common/CartPageHoc';
import AddressPage from '../components/address/common/AddressPage';
import PaymentPage from '../components/payment/common/PaymentPage';
import OtpPage from '../components/payment/common/OtpPage';
import PaymentOTP from '../components/payment/desktop/PaymentOTP';
import ConfirmationPage from '../components/confirmation/common/ConfirmationPage';

import { errorNotification } from 'commonBrowserUtils/Helper';
import Strings from 'commonBrowserUtils/Strings';

const components = {
  address: () =>
    import(
      /* webpackChunkName: "apd",
      webpackPrefetch: true */
      '../components/address/desktop'
    ),
  payment: () =>
    import(
      /* webpackChunkName: "apd",
        webpackPrefetch: true */
      '../components/payment/desktop'
    ),
  confirmation: () =>
    import(
      /* webpackChunkName: "confirmationDesktop",
      webpackPrefetch: true */
      '../components/confirmation/desktop'
    )
};

function loadComponent(key) {
  return Loadable({
    loader: components[key],
    loading: (props = {}) => <Loader show={true} backdrop={true} {...props} />,
    errorCallback: () =>
      errorNotification({ message: Strings.BUNDLE_LOAD_ERROR })
  });
}

const Address = loadComponent('address');
const Payment = loadComponent('payment');
const Confirmation = loadComponent('confirmation');
const CartPage = CartPageHoc(Cart);
const ImportCartPage = CartPageHoc(ImportCart)

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
          path="/checkout/sharedCart"
          render={() => (
            <ImportCartPage
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
              render={props => <Address {...props} />}
            />
          )}
        />
        <Route
          path="/checkout/confirm/"
          render={({ history }) => (
            <ConfirmationPage
              analytics={analytics}
              history={history}
              render={props => <Confirmation {...props} />}
            />
          )}
        />
        <Route
          exact
          path="/checkout/payment"
          render={({ history }) => (
            <PaymentPage
              analytics={analytics}
              history={history}
              getCartStoreData={DataStore.getCartData}
              setCartStoreData={DataStore.setCartData}
              getAddressStoreData={DataStore.getAddressData}
              getPaymentStoreData={DataStore.getPaymentData}
              render={props => <Payment {...props} />}
            />
          )}
        />
        <Route
          path="/checkout/otp"
          render={() => <OtpPage deviceMode="desktop" analytics={analytics} />}
        />
        <Route
          path="/checkout/payment/otp"
          render={({ history }) => (
            <PaymentOTP
              deviceMode="desktop"
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
