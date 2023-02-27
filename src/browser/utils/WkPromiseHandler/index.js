import { isWebkitEnabled } from 'commonBrowserUtils/Helper';
// object for storing references to our promise-objects
const promises = {};

// generates a unique id, not obligator a UUID
const generateUUID = () => {
  let date = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, char => {
    const rand = (date + Math.random() * 16) % 16 | 0;
    date = Math.floor(date / 16);
    return (char === 'x' ? rand : (rand & 0x3) | 0x8).toString(16);
  });
};

// this function is called by native methods
// @param promiseId - id of the promise stored in global variable promises
window.resolveWKPromise = (promiseId, data, error) => {
  const promise = promiseId && promises[promiseId];
  if (error) {
    promise && promise.reject(new Error(error));
  } else {
    promise && promise.resolve(data);
  }
  // remove reference to stored promise
  delete promises[promiseId];
};

/*
    usage:-
    import { callWKHandler } from 'commonBrowserUtils/WkPromiseHandler';

    callWKHandler(['anyHandlerName'], { a, b })
    .then((data) => {
      // hurray! play with data
    });
    .catch((error) => {
      // sad life
    })
*/

const callWKHandler = (handler = [''], message = {}) =>
  new Promise((resolve, reject) => {
    // we generate a unique id to reference the promise later
    // from native function
    const promiseId = wkPromiseHandler.generateUUID();
    // save reference to promise in the global variable
    promises[promiseId] = { resolve, reject };

    // call native IOS function
    if (isWebkitEnabled(handler)) {
      webkit.messageHandlers[handler[0]].postMessage({
        promiseId,
        ...message
      });
    } else {
      delete promises[promiseId];
      reject(new Error('Webkit Handler not found'));
    }
  });

const wkPromiseHandler = {
  callWKHandler,
  generateUUID
};

export default wkPromiseHandler;
