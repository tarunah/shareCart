import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'commonComp/Modal';
import DropDown from 'commonComp/DropDown';

import Styles from './inputWithDropdown.base.css';

import DropDownIcon from 'iconComp/DropDown.jsx';
import RadioActive from 'iconComp/RadioActive.jsx';
import RadioInActive from 'iconComp/RadioInactive.jsx';

const InputWithDropdownWrapper = ({
  withDropdown,
  entries,
  selectedEntry,
  entriesShown,
  toggleEntries,
  selectEntry,
  deviceMode,
  error,
  inputContainerClass,
  ...inputProps
}) => {
  return withDropdown ? (
    <InputWithDropdown
      entries={entries}
      selectedEntry={selectedEntry}
      entriesShown={entriesShown}
      toggleEntries={toggleEntries}
      selectEntry={selectEntry}
      deviceMode={deviceMode}
      error={error}
      className={inputContainerClass}
      {...inputProps}
    />
  ) : (
    <div className={inputContainerClass}>
      <input
        className={`${Styles.input} ${Styles.inputFull} ${
          !!error ? Styles.inputError : ''
        }`}
        {...inputProps}
      />
      {error && <div className={Styles.error}>{error}</div>}
    </div>
  );
};

const InputWithDropdown = ({
  entries,
  selectedEntry,
  entriesShown,
  toggleEntries,
  selectEntry,
  deviceMode,
  error,
  className = '',
  ...inputProps
}) => (
  <div className={`${Styles.inputWithDropdownContainer} ${className}`}>
    <input
      className={`${Styles.inputWithDropdown} ${Styles.input} ${
        !!error ? Styles.inputError : ''
      }`}
      {...inputProps}
    />
    <div
      className={`${Styles.entriesDropdown} ${
        !!error ? Styles.inputError : ''
      }`}
      onClick={toggleEntries}
    >
      <span className={Styles.entryName}>{selectedEntry}</span>
      <DropDownIcon className={Styles.dropdownIcon} />
    </div>
    {error && <div className={Styles.error}>{error}</div>}
    {deviceMode === 'mobile' ? (
      entriesShown && (
        <Modal
          cancelCallback={toggleEntries}
          cancelIconConfig={{ show: true, className: Styles.closeIcon }}
          halfCard={true}
          className={Styles.modal}
        >
          {getEntries({ entries, selectEntry, selectedEntry, mode: 'modal' })}
        </Modal>
      )
    ) : (
      <DropDown
        show={entriesShown}
        cancelCallback={toggleEntries}
        className={Styles.dropDown}
      >
        {getEntries({
          entries,
          selectEntry,
          selectedEntry,
          mode: 'dropdown'
        })}
      </DropDown>
    )}
  </div>
);

const getEntries = ({ entries, selectEntry, selectedEntry, mode }) =>
  entries.map(entry => {
    const isSelected = selectedEntry === entry;
    return (
      <div
        id={`entry-${entry}`}
        key={`entry-${entry}`}
        className={`${
          mode === 'modal' ? Styles.modalEntry : Styles.dropdownEntry
        } ${isSelected ? Styles.selectedEntry : ''}`}
        onClick={selectEntry}
      >
        {mode === 'modal' ? (
          isSelected ? (
            <RadioActive
              className={`${Styles.entryRadioIcon} ${Styles.radioIconSelected}`}
            />
          ) : (
            <RadioInActive className={Styles.entryRadioIcon} />
          )
        ) : null}
        {entry}
      </div>
    );
  });

InputWithDropdownWrapper.propTypes = {
  withDropdown: PropTypes.bool,
  entries: PropTypes.array,
  selectedEntry: PropTypes.string,
  entriesShown: PropTypes.bool,
  toggleEntries: PropTypes.func,
  selectEntry: PropTypes.func,
  deviceMode: PropTypes.string,
  error: PropTypes.bool,
  inputContainerClass: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string
};

InputWithDropdownWrapper.defaultProps = {
  withDropdown: false
};

export default InputWithDropdownWrapper;
