import { isMyntAppEnabled, isWebkitEnabled } from 'commonBrowserUtils/Helper';

const CartCountHandler = (() => {
  let countUpdated = false;

  const updateState = () => {
    countUpdated = true;
  };

  const triggerUpdate = page => {
    if (countUpdated) {
      // Handling android count update
      // const updateMethod =
      //   page === 'confirmation' ? 'clearCartCount' : 'updateCartCount';
      // if (isMyntAppEnabled(['getAppVersion', updateMethod])) {
      //   if (
      //     MyntApp.getAppVersion()
      //       .toString()
      //       .slice(-6) >= 110166
      //   ) {
      //     MyntApp[updateMethod]();
      //   }
      // }
      // Handling ios count update
      // if (isWebkitEnabled(['updateCartCount'])) {
      //   webkit.messageHandlers.updateCartCount.postMessage();
      // }
    }
  };

  return { updateState, triggerUpdate };
})();

export default CartCountHandler;
