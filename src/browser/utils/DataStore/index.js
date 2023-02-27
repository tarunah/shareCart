import { keys, timeouts, validityConfig } from './config';

const DataStore = (function() {
  const data = {},
    timeoutIds = {};

  const initStore = () =>
    Object.keys(keys).forEach(key => {
      data[keys[key]] = null;
      timeoutIds[keys[key]] = null;
    });

  const setDataExpiry = key => {
    clearTimeout(timeoutIds[key]);

    timeoutIds[key] = setTimeout(() => {
      data[key] = null;
    }, timeouts[key]);
  };

  const isValidData = key => {
    return validityConfig[key](data);
  };

  const getData = key => (isValidData(key) ? data[key] : null);

  const getCartData = () => getData(keys.CART_PAGE);

  const getAddressData = () => getData(keys.ADDRESS_PAGE);

  const getPaymentData = () => getData(keys.PAYMENT_PAGE);

  const getInsiderData = () => getData(keys.INSIDER_DATA);

  const setCartData = newData => {
    data[keys.CART_PAGE] = newData;
  };

  const setAddressData = newData => {
    data[keys.ADDRESS_PAGE] = newData;
    setDataExpiry(keys.ADDRESS_PAGE);
  };

  const setPaymentData = newData => {
    data[keys.PAYMENT_PAGE] = newData;
  };

  const setInsiderData = newData => {
    data[keys.INSIDER_DATA] = newData;
  };

  initStore();
  return {
    getCartData,
    getAddressData,
    getPaymentData,
    setCartData,
    setAddressData,
    setPaymentData,
    getInsiderData,
    setInsiderData
  };
})();

const setAddressData = DataStore.setAddressData;
const getAddressData = DataStore.getAddressData;
const getInsiderData = DataStore.getInsiderData;
const setInsiderData = DataStore.setInsiderData;

export default DataStore;

export { setAddressData, getAddressData, setInsiderData, getInsiderData };
