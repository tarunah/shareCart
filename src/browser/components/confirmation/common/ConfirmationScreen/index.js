import React from 'react';

import { Screen } from './confirmationScreenComponents';

import { cardsGetter, fallbackCardsGetter } from './confirmationScreenConfig';

const ConfirmationScreen = props => {
  const getCards = cardsGetter(props.type);
  const getFallbackCards = fallbackCardsGetter(props.type);

  return (
    <Screen
      cards={getCards(props.mode)}
      fallbackCards={getFallbackCards(props.mode)}
      {...props}
    />
  );
};

export default ConfirmationScreen;
