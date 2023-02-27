import React from 'react';

import { RadioGroup, RadioButton } from 'commonComp/Radio';
import Input from 'commonComp/InputV2';
import Buttons from 'commonComp/InlineButtonV2';
import Modal from 'commonComp/Modal';

class LocalityMobileOptionsClass extends React.Component {
  constructor(props) {
    super(props);

    ['setOptionGroupRef'].forEach(
      method => (this[method] = this[method].bind(this))
    );
  }

  componentDidMount() {
    this.optionsGroupRef && this.optionsGroupRef.setFocus();
  }

  setOptionGroupRef(node) {
    this.optionsGroupRef = node;
  }

  render() {
    const {
      options,
      showOption,
      loading,
      optionValue,
      customValue,
      Style,
      changeOption,
      handleChangeText,
      handleCancelClick,
      handleSaveClick,
      error
    } = this.props;

    return (
      <Modal
        halfCard={true}
        className={Style.mobileBlockContainer}
        cancelCallback={handleCancelClick}
      >
        {onCancel => (
          <React.Fragment>
            <div className={Style.headerMobile}>Select Locality</div>
            <RadioGroup
              className={Style.optionsContainer}
              name="localityOption"
              onChange={changeOption}
              value={optionValue}
              ref={this.setOptionGroupRef}
              scrollSelectedInView={true}
            >
              {options.map((locality, index) => (
                <RadioButton
                  value={locality}
                  classes={{
                    selected: Style.selectedLabel
                  }}
                >
                  {locality}
                </RadioButton>
              ))}
              <RadioButton
                key={`locality-custom-field`}
                id={`locality-custom-field`}
                className={Style.customOptionInput}
                classes={{ icon: Style.customRadioBtn }}
                value="customLocalityValueSelcted"
              >
                <Input
                  id="optionTextField"
                  type="text"
                  value={customValue}
                  onChange={handleChangeText}
                  placeholder="Other"
                  errorMessage={error}
                />
              </RadioButton>
            </RadioGroup>

            <Buttons
              containerClassName={Style.btnContainer}
              btnClassName={Style.itemButtons}
              button1={{
                text: 'cancel',
                clickHandler: onCancel
              }}
              button2={{
                text: 'done',
                className: Style.btnDone,
                clickHandler: handleSaveClick
              }}
            />
          </React.Fragment>
        )}
      </Modal>
    );
  }
}

export default function MobileClass(props) {
  const { options, showOption, loading, Style, handleCancelClick } = props;

  if (showOption) {
    if (loading) {
      return (
        <Modal
          halfCard={true}
          className={Style.mobileBlockContainer}
          cancelCallback={handleCancelClick}
        >
          <div className={Style.loadingOptions}>Loading Localities...</div>
        </Modal>
      );
    }

    if (options.length) {
      return <LocalityMobileOptionsClass {...props} />;
    }
  }

  return null;
}
