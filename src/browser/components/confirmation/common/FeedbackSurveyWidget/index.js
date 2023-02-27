import React, { useState } from 'react';
import get from 'lodash/get';

// utils
import { getKVPairValue } from 'commonUtils/KVPairManager';

import { cookieKeys } from 'commonUtils/constants';
import { setCookie, errorNotification } from 'commonBrowserUtils/Helper';
import { FEEDBACK_SURVEY as string } from 'commonBrowserUtils/Strings';
import ConfirmationManager from 'commonBrowserUtils/ConfirmationManager';

import Button from 'commonComp/Button';
import ImageBanner from 'commonComp/ImageBanner';

import { Rating, Review } from './component';

import Styles from './feedbackSurveyWidget.base.css';

const FeedbackSurveyWidget = props => {
  const [state, setState] = useState({
    data: get(props, 'dataState.data.feedbackSurvey'),
    selectedRating: null,
    selectedReview: {},
    isSubmitted: false
  });
  const updateState = (key, val) =>
    setState(prevState => ({
      ...prevState,
      [key]: val
    }));

  const { data, selectedRating, selectedReview, isSubmitted } = state;

  if (!data) {
    return null;
  }

  const styleClass = get(props, 'styleClass') || '';
  const question = get(data, 'list.question');
  const ratingList = get(data, 'list.surveyOptionList') || [];

  const onClickHandler = () => {
    const surveyResponseList = [];
    if (selectedRating) {
      surveyResponseList.push({
        questionId: get(selectedRating, 'questionId'),
        optionId: get(selectedRating, 'id'),
        answer: get(selectedRating, 'optionValue'),
        channel: 3578
      });
    }

    for (const key in selectedReview) {
      const obj = selectedReview[key] || {};
      if (obj && obj.answer && obj.answer.trim()) {
        surveyResponseList.push(obj);
      }
    }
    const successCB = () => {
      const storeOrderId = get(
        props,
        'dataState.data.bountyOrder.storeOrderId'
      );
      setCookie(
        `${cookieKeys.FEEDBACK_SURVEY_ON_ORDER_ID}_${storeOrderId}`,
        true
      );
      updateState('isSubmitted', true);
      setTimeout(() => {
        updateState('data', null);
      }, 3000);
    };

    ConfirmationManager.submitRating(
      {
        id: `${get(data, 'id')}`,
        authenticationKey: get(data, 'authenticationKey'),
        surveyResponseList
      },
      successCB,
      err => {
        if (
          get(err, 'error.status.statusMessage') === 'RESPONSE_ALREADY_EXISTS'
        ) {
          successCB();
        } else {
          errorNotification(err);
        }
      }
    );
  };

  if (isSubmitted) {
    return (
      <div
        className={`${styleClass} ${Styles.successBanner}`}
        data-testid="FeedbackSurveyThankyou"
      >
        <div className={Styles.header}>{string.SUCCESS_MESSAGE}</div>
        <ImageBanner name="positive-vote" className={Styles.thumbsupIcon} />
      </div>
    );
  }

  return (
    <div
      className={`${styleClass} ${Styles.container}`}
      data-testid="FeedbackSurveyWidget"
    >
      <div className={Styles.header}>{string.HEADER}</div>
      <div className={Styles.title}>{question}</div>
      <Rating
        ratingList={ratingList}
        selectedRating={selectedRating}
        updateState={updateState}
      />
      <Review {...state} updateState={updateState} />
      {!!selectedRating && (
        <Button className={Styles.submitBtn} onClick={onClickHandler}>
          {string.BUTTON_TEXT}
        </Button>
      )}
    </div>
  );
};

export default FeedbackSurveyWidget;
