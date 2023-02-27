import React from 'react';
import PropTypes from 'prop-types';

// Styles
import Styles from './input.base.css';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: false };
    this.onFocusHandler = this.onFocusHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
  }

  onFocusHandler(e) {
    this.props.onFocus && this.props.onFocus(e);
    this.setState({ selected: true });
  }

  onBlurHandler(e) {
    this.props.onBlur && this.props.onBlur(e);
    this.setState({ selected: false });
  }

  render() {
    const {
      className,
      label,
      errorMessage,
      onBlur,
      onFocus,
      inputClass = '',
      labelClass = '',
      errorClass = '',
      ...attributes
    } = this.props;
    return (
      <span>
        <div
          className={`${Styles.inputRow} ${className} ${
            this.state.selected ? Styles.selected : ''
          } ${attributes.value || this.state.selected ? Styles.top : ''}`}
        >
          <label
            htmlFor={attributes.id}
            className={`${Styles.label} ${labelClass}`}
          >
            {label}
          </label>
          <input
            onFocus={this.onFocusHandler}
            onBlur={this.onBlurHandler}
            className={`${Styles.input} ${inputClass}`}
            {...attributes}
          />
          {errorMessage && (
            <div className={`${Styles.errorMessage} ${errorClass}`}>
              {errorMessage}
            </div>
          )}
        </div>
      </span>
    );
  }
}

Input.propTypes = {
  className: PropTypes.string,
  errorMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Input.defaultProps = {
  className: '',
  value: ''
};

export default Input;
