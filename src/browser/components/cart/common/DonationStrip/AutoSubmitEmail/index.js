import React, { useState } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import Input from 'commonComp/InputV2';
import { isValidEmail } from 'commonBrowserUtils/Helper';
import CartManager from 'commonBrowserUtils/CartManager';

import Style from './autoSubmitEmail.base.css';

const AutoSubmitEmail = props => {
  const { className, titleText } = props;

  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const onChange = e => {
    const value = get(e, 'currentTarget.value', '');
    setValue(value);
  };

  const onBlur = e => {
    if (isValidEmail(value)) {
      setError('');
      submitEmail(value);
    } else {
      setError('Please enter a valid email address.');
    }
  };

  const successCallBack = res => {
    if (get(res, 'twoFactorAuthRequired', false)) {
      triggerEvent('PROFILE_EMAIL_SAVE_FAILED');
      setError(
        'Unable to verify your email id, we will send your donation receipt in an SMS.'
      );
      return;
    }
    triggerEvent('PROFILE_EMAIL_SAVED');
  };

  const errorCallBack = err => {
    triggerEvent('PROFILE_EMAIL_SAVE_FAILED');
  };

  const submitEmail = emailId =>
    CartManager.editEmail({ emailId }, successCallBack, errorCallBack);

  return (
    <div className={className}>
      {titleText}
      <Input
        placeHolder="Enter your email"
        isValid={isValidEmail}
        onValidation={submitEmail}
        styleOverrides={{ inputClass: Style.inputClass }}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div className={Style.error}>{error}</div>}
    </div>
  );
};

AutoSubmitEmail.propTypes = {
  className: PropTypes.string
};

export default AutoSubmitEmail;
