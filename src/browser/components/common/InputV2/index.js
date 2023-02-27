import React from 'react';
import PropTypes from 'prop-types';

// Styles
import Styles from './inputV2.base.css';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: false };
    ['onFocusHandler', 'onBlurHandler', 'setFocus', 'removeFocus'].forEach(
      method => (this[method] = this[method].bind(this))
    );
  }

  onFocusHandler(e) {
    this.props.onFocus && this.props.onFocus(e);
    this.setState({ selected: true });
  }

  onBlurHandler(e) {
    this.props.onBlur && this.props.onBlur(e);
    this.setState({ selected: false });
  }

  setFocus() {
    this.inputFieldRef && this.inputFieldRef.focus();
  }

  removeFocus() {
    this.inputFieldRef && this.inputFieldRef.blur();
  }

  render() {
    const {
      className = '',
      label,
      errorMessage,
      onBlur,
      onFocus,
      styleOverrides: { errorClass = '', inputClass = '' },
      loader = null,
      tagConfig: { containerClassName = '', text, textClassName = '', showTag },
      ...attributes
    } = this.props;
    let inputClassNames = `${Styles.inputRow} ${className}`;
    if (this.state.selected) {
      inputClassNames += ` ${Styles.selected}`;
    }
    if (attributes.value || this.state.selected) {
      inputClassNames += ` ${Styles.top}`;
    }

    return (
      <div className={inputClassNames}>
        {!label || (attributes.disabled && attributes.value) ? (
          ''
        ) : (
          <label htmlFor={attributes.id} className={Styles.label}>
            {label}
          </label>
        )}
        <input
          ref={node => {
            this.inputFieldRef = node;
          }}
          onFocus={this.onFocusHandler}
          onBlur={this.onBlurHandler}
          className={`${Styles.input} ${inputClass}`}
          {...attributes}
        />
        {showTag && (
          <div
            className={
              this.state.selected
                ? `${Styles.nudgeLabel} ${containerClassName}`
                : containerClassName
            }
          >
            <span className={textClassName}>{text}</span>
          </div>
        )}
        {loader}
        {errorMessage && (
          <div className={`${Styles.errorMessage} ${errorClass}`}>
            {errorMessage}
          </div>
        )}
      </div>
    );
  }
}

Input.propTypes = {
  className: PropTypes.string,
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  label: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Input.defaultProps = {
  className: '',
  value: '',
  styleOverrides: {},
  tagConfig: { containerClassName: '', showTag: false }
};

export default Input;
