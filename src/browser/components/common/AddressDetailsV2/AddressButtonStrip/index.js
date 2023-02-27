import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ButtonV2 from 'commonComp/ButtonV2';
import Strings from 'commonBrowserUtils/Strings';
import Delete from 'iconComp/Delete.jsx';
import { FadeInAndOut } from 'commonComp/Animation';

import Style from './addressButtonStrip.base.css';

const DeliverButton = ({ isDeliveringHere, onClick }) => {
  return (
    <ButtonV2
      text={isDeliveringHere ? Strings.DELIVERING_HERE : Strings.DELIVER_HERE}
      classname={`${Style.button} ${
        isDeliveringHere ? Style.disabledButton : ''
      }`}
      containerClassname={Style.buttonContainer}
      onClick={isDeliveringHere ? () => {} : onClick}
    />
  );
};

const DeleteButton = ({
  handleDeleteAddressClick,
  deleteOnClickListener,
  showConfirmation
}) => {
  return (
    <ButtonV2
      classname={`${Style.button} ${Style.deleteButton} ${
        showConfirmation ? Style.confirmDelete : Style.secondary
      }`}
      containerClassname={`${Style.deleteButtonContainer} ${
        showConfirmation ? Style.grow : Style.shrink
      }`}
      onClick={
        showConfirmation ? handleDeleteAddressClick : deleteOnClickListener
      }
    >
      {showConfirmation ? (
        <div className={Style.confirmTextContainer}>
          <Delete className={Style.deleteIcon} />
          <div className={Style.buttonText}>{Strings.REMOVE_CONFIRMATION}</div>
        </div>
      ) : (
        <Delete role="deleteIcon" />
      )}
    </ButtonV2>
  );
};

const FadingButtonComponent = ({
  cancelOnClickListener,
  isDeliveringHere,
  onAddressConfirmation,
  handleEditAddressClick,
  id,
  direction,
  showCancelButton
}) => {
  return (
    <React.Fragment>
      <FadeInAndOut
        display={showCancelButton}
        fadeInDirection={direction}
        fadeOutDirection={direction}
        customClass={Style.fadeInContainer}
      >
        <ButtonV2
          text={Strings.CANCEL}
          classname={`${Style.button} ${Style.secondary}`}
          onClick={cancelOnClickListener}
        />
      </FadeInAndOut>
      <FadeInAndOut
        display={!showCancelButton}
        fadeInDirection={direction}
        fadeOutDirection={direction}
        customClass={Style.fadeInContainer}
      >
        <div className={Style.fadedContainer}>
          <DeliverButton
            isDeliveringHere={isDeliveringHere}
            onClick={onAddressConfirmation}
          />
          <ButtonV2
            onClick={handleEditAddressClick}
            data-addressid={id}
            text={Strings.EDIT}
            classname={`${Style.button} ${Style.secondary} `}
          />
        </div>
      </FadeInAndOut>
    </React.Fragment>
  );
};

const AddressButtonStrip = ({
  isDeliveringHere,
  onAddressConfirmation,
  handleEditAddressClick,
  handleDeleteAddressClick,
  id
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [direction, setDirection] = useState('NONE');

  const deleteOnClickListener = () => {
    setDirection('INPLACE');
    setShowConfirmation(true);
  };

  const cancelOnClickListener = () => {
    setShowConfirmation(false);
  };

  return (
    <div className={Style.container}>
      <FadingButtonComponent
        showCancelButton={showConfirmation}
        direction={direction}
        deleteOnClickListener={deleteOnClickListener}
        isDeliveringHere={isDeliveringHere}
        onAddressConfirmation={onAddressConfirmation}
        handleEditAddressClick={handleEditAddressClick}
        cancelOnClickListener={cancelOnClickListener}
        id={id}
      />
      <DeleteButton
        handleDeleteAddressClick={handleDeleteAddressClick}
        deleteOnClickListener={deleteOnClickListener}
        showConfirmation={showConfirmation}
      />
    </div>
  );
};

AddressButtonStrip.propTypes = {
  isDeliveringHere: PropTypes.bool.isRequired,
  onAddressConfirmation: PropTypes.func.isRequired,
  handleEditAddressClick: PropTypes.func.isRequired,
  handleDeleteAddressClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
};

export default AddressButtonStrip;
