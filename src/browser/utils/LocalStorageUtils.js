export const setItem = (key, value) => {
  try {
    window.localStorage.setItem(key, value);
  } catch (e) {
    console.error(`Error writing into LocalStorage for "${key}"!. Error: ${e}`);
  }
};

export const getItem = (key, parse = false) => {
  let result, item;
  try {
    result = window.localStorage.getItem(key);
    item = parse ? JSON.parse(result) : result;
  } catch (e) {
    console.error(
      `Some problems getting data from LocalStorage ${typeof data}, ${key}. Error: ${e}`
    );
  }
  return item;
};

export const clear = () => {
  try {
    window.localStorage.clear();
  } catch (e) {
    console.error(`Error clearing LocalStorage, Error: ${e}`);
  }
};

export const removeItem = key => {
  try {
    window.localStorage.removeItem(key);
  } catch (e) {
    console.error(`Error removing ${key} from LocalStorage, Error: ${e}`);
  }
};
