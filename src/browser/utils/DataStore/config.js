import get from 'lodash/get';
import { isValidCart } from '../CartHelper';

const keys = {
  CART_PAGE: 'cartPage',
  ADDRESS_PAGE: 'addressPage',
  PAYMENT_PAGE: 'paymentPage',
  INSIDER_DATA: 'insiderData'
};

const timeouts = {
  [keys.CART_PAGE]: 10 * 60 * 1000,
  [keys.ADDRESS_PAGE]: 10 * 60 * 1000,
  [keys.PAYMENT_PAGE]: 10 * 60 * 1000,
  [keys.INSIDER_DATA]: 10 * 60 * 1000
};

const validityConfig = {
  [keys.CART_PAGE]: storeData => {
    let valid = true;
    const cartData = storeData[keys.CART_PAGE];
    if (cartData) {
      valid = isValidCart(cartData);
    }

    return valid;
  },
  [keys.ADDRESS_PAGE]: storeData => {
    let valid = true;
    const cart = storeData[keys.CART_PAGE];
    const address = storeData[keys.ADDRESS_PAGE];
    if (cart && address) {
      valid = cart.createdBy === get(address, 'addressData.0.user.uidx');
    }

    return valid;
  },
  [keys.PAYMENT_PAGE]: () => true,
  [keys.INSIDER_DATA]: () => true
};

export { keys, timeouts, validityConfig };
