import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

import { scrollIntoView } from 'commonBrowserUtils/Helper';
import { ImmobilizedIcon } from 'commonComp/ImmobilizeComponent';
import { isVariantEnabled } from 'commonUtils/FeaturesManager';

// Styles
import Styles from './radioButton.base.css';

import RadioActive from 'iconComp/RadioActive.jsx';
import RadioInActive from 'iconComp/RadioInactive.jsx';

class RadioButton extends React.Component {
  constructor(props) {
    super(props);

    const handleClick =
      !props.disabled && props.onClick
        ? props.onClick.bind(this, props.value || props.id, props.onClickParams)
        : null;
    this.setRef = this.setRef.bind(this);

    this.state = {
      handleClick
    };
  }

  componentDidMount() {
    const { rank = '' } = get(this, 'props.onClickParams') || {};
    const idPrefix = (this.props.id || '').substring(4, 0);
    if (
      (isVariantEnabled('RECOMMENDED_OPTIONS_VARIANT2') ||
        isVariantEnabled('RECOMMENDED_OPTIONS_VARIANT4')) &&
      rank === 1 &&
      idPrefix === 'reco'
    ) {
      //auto selecting first option
      this.state.handleClick();
    }
    if (this.props.scrollSelectedInView) {
      scrollIntoView(this.selectedRadioButtonRef, { block: 'end' });
    }
  }

  setRef(node) {
    if (this.props.checked) {
      this.selectedRadioButtonRef = node;
    }
  }

  haveHandleClickPropsChanged(prevProps) {
    const { props } = this;
    const prevValue = prevProps.value || prevProps.id;
    const value = props.value || props.id;

    return (
      !isEqual(prevProps.onClickParams, props.onClickParams) ||
      prevValue !== value
    );
  }

  componentDidUpdate(prevProps) {
    const { props } = this;
    if (
      (this.haveHandleClickPropsChanged(prevProps) &&
        !props.disabled &&
        props.onClick) ||
      prevProps.disabled !== props.disabled
    ) {
      const handleClick = props.onClick.bind(
        this,
        props.value || props.id,
        props.onClickParams
      );
      this.setState({
        handleClick
      });
    }
  }

  render() {
    const {
      className = '',
      value,
      children,
      checked,
      onClick,
      classes: {
        root: rootClass,
        icon: iconClass,
        label: labelClass,
        selected: selectedClass
      },
      disabled,
      ...otherProps
    } = this.props;

    let containerClassNames = `${Styles.container} ${rootClass} ${className}`;
    let labelClassName = `${Styles.labelContainer} ${labelClass}`;

    if (checked) {
      containerClassNames += ` ${Styles.selected}`;
      labelClassName += ` ${selectedClass}`;
    }

    return (
      <div
        className={containerClassNames}
        onClick={this.state.handleClick}
        {...otherProps}
        ref={this.setRef}
      >
        <ImmobilizedIcon
          className={`${Styles.radioIcon} ${iconClass}`}
          disableClassName={Styles.disabledIcon}
          disabled={disabled}
          name={checked ? RadioActive : RadioInActive}
        />

        <div className={labelClassName}>{children}</div>
      </div>
    );
  }
}

RadioButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object
  ]),
  classes: PropTypes.shape({
    root: PropTypes.string,
    icon: PropTypes.string,
    label: PropTypes.string,
    selcted: PropTypes.string
  }),
  className: PropTypes.string,
  name: PropTypes.string,
  checked: PropTypes.bool,
  onClick: PropTypes.func
};

RadioButton.defaultProps = {
  className: '',
  value: '',
  classes: {
    root: '',
    icon: '',
    label: '',
    selcted: ''
  }
};

export default RadioButton;
