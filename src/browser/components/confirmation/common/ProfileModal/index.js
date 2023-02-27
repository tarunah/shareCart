import React from 'react';
import PropTypes from 'prop-types';
import capitalize from 'lodash/capitalize';

import Modal from 'commonComp/Modal';

import ModalButtons from 'commonComp/InlineButton';
import { genderMap, buttons } from 'commonBrowserUtils/ConfirmationConstants';

import Styles from './profileModal.base.css';

import RadioActive from 'iconComp/RadioActive.jsx';
import RadioInActive from 'iconComp/RadioInactive.jsx';

const GenderButtons = ({ currentProduct, gender, onGenderClick }) => {
  return (
    <div>
      {currentProduct.gender === 'Unisex' ? (
        // TODO: rename g
        [genderMap.Men, genderMap.Women].map(g => {
          const SVGIcon =
            g === gender ? (
              <RadioActive
                className={`${Styles.radioButton} ${Styles.selectedButton}`}
              />
            ) : (
              <RadioInActive className={Styles.radioButton} />
            );
          return (
            <label
              id={g}
              className={Styles.genderLabel}
              onClick={onGenderClick}
              key={g}
            >
              {SVGIcon}
              <span className={Styles.radioText}>{capitalize(g)}</span>
            </label>
          );
        })
      ) : (
        <div className={Styles.autoSelectGender}>
          {capitalize(gender)}
          <span className={Styles.autoSelectText}>
            (Auto selected based on product)
          </span>
        </div>
      )}
    </div>
  );
};

class ProfileModal extends React.Component {
  render() {
    const {
      props: {
        closeProfileModal,
        saveProfile,
        onProfileNameChange,
        onGenderClick,
        currentProduct,
        saveInProgress,
        profileModalDetails: { name, gender },
        profileModalError
      }
    } = this;
    return (
      <Modal
        halfCard={true}
        className={Styles.modal}
        cancelCallback={closeProfileModal}
      >
        {onCancel => (
          <div>
            <div className={Styles.mainContent}>
              <div className={Styles.modalTitle}>Add Details</div>
              <input
                className={Styles.textInput}
                placeholder="Enter profile name"
                onChange={onProfileNameChange}
                value={name || ''}
              />
              {profileModalError && (
                <div className={Styles.error}>{profileModalError}</div>
              )}
              <div className={Styles.genderHeader}>Gender</div>
              <GenderButtons
                currentProduct={currentProduct}
                gender={gender}
                onGenderClick={onGenderClick}
              />
            </div>
            <ModalButtons
              button1={{
                text: buttons.cancel,
                clickHandler: onCancel
              }}
              button2={{
                text: saveInProgress ? buttons.saving : buttons.save,
                clickHandler: saveProfile,
                className: Styles.save
              }}
              btnClassName={Styles.modalButton}
              containerClassName={Styles.buttons}
            />
          </div>
        )}
      </Modal>
    );
  }
}

ProfileModal.propTypes = {
  closeProfileModal: PropTypes.func,
  saveProfile: PropTypes.func,
  onProfileNameChange: PropTypes.func,
  onGenderClick: PropTypes.func,
  currentProduct: PropTypes.object,
  profileModalDetails: PropTypes.object,
  saveInProgress: PropTypes.bool,
  profileModalError: PropTypes.string
};

export default ProfileModal;
