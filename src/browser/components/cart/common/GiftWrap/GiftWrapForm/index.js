import React from 'react';

import Button from 'vision/components/Button';

import GiftWrapContainer from '../GiftWrapHandler';

import Styles from './giftWrapForm.base.css';

const Input = ({ selected, label, errorMessage, ...attributes }) => (
  <div className={Styles.inputContainer}>
    <div
      className={`${Styles.inputRow}
        ${attributes.value || selected ? Styles.top : ''}
        ${selected ? Styles.selected : ''}
        ${errorMessage ? Styles.error : ''}`}
    >
      <label htmlFor={attributes.id} className={Styles.label}>
        {label}
      </label>
      <input {...attributes} className={Styles.input} />
    </div>
    {errorMessage && (
      <div data-testid="gw-error-input" className={Styles.errorMessage}>
        {errorMessage}
      </div>
    )}
  </div>
);

const TextArea = ({ selected, label, errorMessage, ...attributes }) => {
  return (
    <div className={Styles.inputContainer}>
      <div
        className={`${Styles.inputRow}
        ${attributes.value || selected ? Styles.top : ''}
        ${selected ? Styles.selected : ''}
        ${errorMessage ? Styles.error : ''}`}
      >
        <label htmlFor={attributes.id} className={Styles.label}>
          {label}
        </label>
        <textarea {...attributes} className={Styles.textarea} />
      </div>
      {errorMessage && (
        <div data-testid="gw-error-text" className={Styles.errorMessage}>
          {errorMessage}
        </div>
      )}
      <div className={Styles.charCount}>
        {attributes.maxLength - attributes.value.length}/{attributes.maxLength}
      </div>
    </div>
  );
};

const GiftWrapFormUI = props => (
  <div>
    <div>
      <div className={Styles.header1}>Gift Wrapping</div>
      <div className={Styles.header2}>Make It Special</div>
    </div>
    <Input
      label="Recipient Name"
      id="recipientName"
      data-testid="gw-recipientName"
      maxLength="60"
      onChange={props.setValue}
      onFocus={props.onFocusHandler}
      onBlur={props.onBlurHandler}
      value={props.recipientName.value}
      errorMessage={props.recipientName.errorMessage}
      selected={props.selectedField === 'recipientName'}
    />
    <TextArea
      label="Message"
      id="message"
      data-testid="gw-message"
      maxLength="200"
      rows={3}
      onChange={props.onTextAreaChange}
      onFocus={props.onFocusHandler}
      onBlur={props.onBlurHandler}
      value={props.message.value}
      errorMessage={props.message.errorMessage}
      selected={props.selectedField === 'message'}
    />
    <Input
      label="Sender Name"
      id="senderName"
      data-testid="gw-senderName"
      maxLength="60"
      onChange={props.setValue}
      onFocus={props.onFocusHandler}
      onBlur={props.onBlurHandler}
      value={props.senderName.value}
      errorMessage={props.senderName.errorMessage}
      selected={props.selectedField === 'senderName'}
    />
    <div className={Styles.note}>
      <span className={Styles.noteLabel}>Please Note: </span>
      <span>Gift wrapping is not available for Pay on Delivery orders.</span>
    </div>
    <Button
      variant="contained"
      letterSpacing="1px"
      width="100%"
      onClick={props.applyGiftwrap}
    >
      APPLY GIFT WRAP
    </Button>
  </div>
);

const GiftWrapForm = props => (
  <GiftWrapContainer
    {...props}
    render={({ state, ...handlers }) => (
      <GiftWrapFormUI {...state} {...handlers} goBack={props.goBack} />
    )}
  />
);

export default GiftWrapForm;
