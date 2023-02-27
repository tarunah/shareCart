import React from 'react';
import PropTypes from 'prop-types';

// Styles
import Styles from './radioGroup.base.css';

class RadioGroup extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.isSelected = this.isSelected.bind(this);
  }

  handleChange(...args) {
    if (this.props.onChange) {
      this.props.onChange(...args);
    }
  }

  isSelected(value) {
    const { value: propsValue } = this.props;
    return value === propsValue;
  }

  setFocus() {
    this.radioGroupRef && this.radioGroupRef.focus();
  }

  render() {
    const { className = '', children, name } = this.props;

    return (
      <div
        tabIndex={-1}
        className={`${Styles.container} ${className}`}
        ref={node => {
          this.radioGroupRef = node;
        }}
      >
        {React.Children.map(children, (child, i) => {
          if (!React.isValidElement(child)) {
            return null;
          }

          return React.cloneElement(child, {
            ...child.props,
            id: child.props.id || `${name}Button${i}`,
            key: child.key || `${name}Button${i}`,
            checked: this.isSelected(child.props.value),
            onClick: this.handleChange,
            scrollSelectedInView: this.props.scrollSelectedInView
          });
        })}
      </div>
    );
  }
}

RadioGroup.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool
  ]).isRequired,
  children: PropTypes.node,
  name: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func
};

RadioGroup.defaultProps = {
  className: '',
  value: ''
};

export default RadioGroup;
