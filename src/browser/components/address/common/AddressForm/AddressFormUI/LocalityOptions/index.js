import React from 'react';
import PropTypes from 'prop-types';

import Input from 'commonComp/InputV2';

import DesktopOption from './DesktopOption';
import MobileOption from './MobileOption';

// Styles
import Style from './localityOptions.base.css';

class LocalityOptionsClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      customValue: '',
      showDesktopOption: false,
      showMobileOption: false,
      optionValue: '',
      error: ''
    };

    [
      'toggleDisplayOption',
      'handleBlur',
      'changeOption',
      'handleChangeText',
      'handleCancelClick',
      'handleSaveClick',
      'handleOnChange'
    ].forEach(method => (this[method] = this[method].bind(this)));
  }

  componentDidUpdate(prevProps, prevState) {
    const { mode, loading } = this.props;

    if (mode === 'mobile') {
      if (loading && !prevProps.loading) {
        this.setState({ customValue: '', optionValue: '' });
      }
    }
  }

  toggleDisplayOption(e) {
    e.stopPropagation();
    const { mode, options, value } = this.props;
    let obj = {};

    if (mode === 'mobile') {
      if (this.state.showMobileOption) {
        return;
      }
      if (value) {
        const isPresent = options.find(val => val === value);
        obj = {
          optionValue: isPresent ? value : 'customLocalityValueSelcted',
          customValue: isPresent ? '' : value
        };
      }
    }

    this.setState({
      showDesktopOption: true,
      showMobileOption: true,
      ...obj
    });
  }

  handleBlur(e) {
    e.stopPropagation();
    this.setState({ showDesktopOption: false });
  }

  changeOption(value) {
    this.setState({ optionValue: value, error: '' });
  }

  handleChangeText(e) {
    this.setState({ customValue: e.target.value, error: '' }, () => {
      this.changeOption('customLocalityValueSelcted');
    });
  }

  handleCancelClick() {
    this.setState({ showMobileOption: false });
  }

  handleSaveClick() {
    const { optionValue, customValue } = this.state;
    const { onChange } = this.props;
    const valueToSend =
      optionValue === 'customLocalityValueSelcted' ? customValue : optionValue;

    if (valueToSend && valueToSend.trim()) {
      this.setState({ error: '' });
      onChange({ target: { id: 'locality', value: valueToSend.trim() } });
      this.handleCancelClick();
    } else {
      this.setState({ error: 'Please select/enter locality' });
    }
  }

  handleOnChange(e) {
    const { onChange } = this.props;
    this.setState({ showDesktopOption: false });
    onChange(e);
  }

  render() {
    const { value, errorMessage, onChange, mode } = this.props;

    return (
      <div
        className={Style.localityBlock}
        onBlur={this.handleBlur}
        tabIndex={-1}
        onFocus={this.toggleDisplayOption}
      >
        <Input
          label="Locality / Town*"
          id="locality"
          type="text"
          value={value}
          errorMessage={errorMessage}
          onChange={onChange}
          onClick={this.toggleDisplayOption}
          onBlur={this.handleBlur}
        />
        {mode === 'mobile' ? (
          <MobileOption
            {...this.props}
            showOption={this.state.showMobileOption}
            {...this.state}
            Style={Style}
            changeOption={this.changeOption}
            handleChangeText={this.handleChangeText}
            handleCancelClick={this.handleCancelClick}
            handleSaveClick={this.handleSaveClick}
          />
        ) : (
          <DesktopOption
            {...this.props}
            Style={Style}
            showOption={this.state.showDesktopOption}
            handleOnChange={this.handleOnChange}
          />
        )}
      </div>
    );
  }
}

LocalityOptionsClass.propTypes = {
  value: PropTypes.string,
  errorMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.object
  ]),
  onChange: PropTypes.func,
  loading: PropTypes.bool,
  options: PropTypes.array,
  mode: PropTypes.string
};

export default LocalityOptionsClass;
