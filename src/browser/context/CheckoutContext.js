import React, { useCallback, useMemo, useState } from 'react';

const initialState = {
  cartData: null,
  selectedAddress: null
};

export const CheckoutContext = React.createContext(initialState);

export const CheckoutProviderHOC = Component => {
  return props => {
    const [checkoutState, setCheckoutState] = useState(initialState);

    const updateCheckoutState = useCallback(
      newState => {
        setCheckoutState({ ...checkoutState, ...newState });
      },
      [checkoutState, setCheckoutState]
    );

    const updateCheckoutStateOnKey = useCallback(
      (key, newKeyState) => {
        setCheckoutState({
          ...checkoutState,
          [key]: { ...checkoutState[key], ...newKeyState }
        });
      },
      [checkoutState, setCheckoutState]
    );

    const value = useMemo(() => {
      return {
        ...checkoutState,
        updateCheckoutState,
        updateCheckoutStateOnKey
      };
    }, [checkoutState, updateCheckoutState, updateCheckoutStateOnKey]);
    return (
      <CheckoutContext.Provider value={value}>
        <Component {...props} />
      </CheckoutContext.Provider>
    );
  };
};

export const CheckoutProvider = ({ children }) => {
  const [checkoutState, setCheckoutState] = useState(initialState);

  const updateCheckoutState = useCallback(
    newState => {
      for (let key in newState) {
        checkoutState[key] = newState[key];
      }
      setCheckoutState({ ...checkoutState });
    },
    [checkoutState, setCheckoutState]
  );

  const updateCheckoutStateOnKey = useCallback(
    (key, newKeyState) => {
      setCheckoutState({
        ...checkoutState,
        [key]: { ...checkoutState[key], ...newKeyState }
      });
    },
    [checkoutState, setCheckoutState]
  );

  const value = useMemo(() => {
    return { ...checkoutState, updateCheckoutState, updateCheckoutStateOnKey };
  }, [checkoutState, updateCheckoutState, updateCheckoutStateOnKey]);

  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const CheckoutConsumerHOC = Component => {
  return props => (
    <CheckoutContext.Consumer>
      {value => <Component {...value} {...props} />}
    </CheckoutContext.Consumer>
  );
};
