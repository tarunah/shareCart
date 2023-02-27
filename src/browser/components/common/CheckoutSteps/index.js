import React from 'react';
import { string, bool, arrayOf } from 'prop-types';

import Sprite from 'commonComp/Sprite';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import Styles from './checkoutSteps.base.css';

export const CHECKOUT_STATES = {
  ACTIVE: 'active',
  COMPLETED: 'completed',
  INACTIVE: 'inactive'
};

const stateMap = {
  Bag: [
    CHECKOUT_STATES.ACTIVE,
    CHECKOUT_STATES.INACTIVE,
    CHECKOUT_STATES.INACTIVE
  ],
  Address: [
    CHECKOUT_STATES.COMPLETED,
    CHECKOUT_STATES.ACTIVE,
    CHECKOUT_STATES.INACTIVE
  ],
  Payment: [
    CHECKOUT_STATES.COMPLETED,
    CHECKOUT_STATES.COMPLETED,
    CHECKOUT_STATES.ACTIVE
  ]
};

const stepLabels = Object.keys(stateMap);

const StepsV2 = ({ currentPage, customStates, customLabels }) => {
  const states = customStates || stateMap[currentPage];
  const labels = customLabels || stepLabels;
  return (
    <div className={`${Styles.stepsContainer} ${Styles.stepsContainerV2}`}>
      {states.map((state, index) => (
        <div
          key={`content${index}`}
          className={`${Styles.stepsContentV2} ${Styles[state] || ''}`}
        >
          <div className={Styles.stepsLineV2}>
            {state === CHECKOUT_STATES.ACTIVE && (
              <div className={Styles.lineProgress} />
            )}
          </div>
          {state === CHECKOUT_STATES.COMPLETED && (
            <div className={Styles.completedIcon}>
              <div className={Styles.tickIcon}>L</div>
            </div>
          )}
          {state === CHECKOUT_STATES.ACTIVE && (
            <div className={Styles.outerActiveCircle}>
              <div
                className={`${Styles.stepsCircleV2} ${Styles.innerActiveCircle}`}
              />
            </div>
          )}
          {state === CHECKOUT_STATES.INACTIVE && (
            <div className={Styles.stepsCircleV2} />
          )}
          <div className={Styles.stepsTextV2}> {labels[index]} </div>
        </div>
      ))}
    </div>
  );
};

const CheckoutSteps = ({
  currentPage,
  hideSteps,
  customStates,
  customLabels,
  showV2
}) => {
  if (hideSteps) {
    return null;
  }
  const canShowSteps =
    (isFeatureEnabled('CHECKOUT_STEPS') &&
      stepLabels.indexOf(currentPage) !== -1) ||
    showV2 ||
    (isFeatureEnabled('CHECKOUT_STEPS_MWEB') &&
      stepLabels.indexOf(currentPage) !== -1);
  if (canShowSteps) {
    return (
      <StepsV2
        currentPage={currentPage}
        customStates={customStates}
        customLabels={customLabels}
      />
    );
  }
  return null;
};

CheckoutSteps.propTypes = {
  currentPage: string.isRequired,
  hideSteps: bool,
  customStates: arrayOf(string),
  customLabels: arrayOf(string),
  showV2: bool
};

CheckoutSteps.defaultProps = {
  currentPage: '',
  showV2: false
};

export default CheckoutSteps;
