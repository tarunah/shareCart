import React from 'react';
import PropTypes from 'prop-types';

import {
  CardNumber,
  CardName,
  ExpiryMonthYear,
  ExpiryCVVInfo,
  CVV,
  SaveCard
} from './CardInputs/index';

const CardForm = props => (
  <div>
    <CardNumber {...props} />
    <CardName {...props} />
    <ExpiryMonthYear {...props} />
    <CVV {...props} />
    <ExpiryCVVInfo {...props} />
    <SaveCard {...props} />
  </div>
);

CardForm.propTypes = {
  form: PropTypes.object,
  errorInfo: PropTypes.object,
  setValue: PropTypes.func,
  checkValue: PropTypes.func,
  onFocus: PropTypes.func
};

export default CardForm;
