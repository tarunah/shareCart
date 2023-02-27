import React from 'react';
import get from 'lodash/get';

import { FEEDBACK_SURVEY as string } from 'commonBrowserUtils/Strings';

import Styles from './feedbackSurveyWidget.base.css';

import Check from 'iconComp/Check.jsx';

export const Rating = props => {
  const { ratingList, selectedRating, updateState } = props;

  const renderList = ratingList.map((list, key) => {
    const isSelected = selectedRating && selectedRating.id === list.id;
    let className = `${Styles.rattingBtn} ${Styles[`rating${key + 1}`]}`;
    className += isSelected ? ` ${Styles.selectedRating}` : '';

    const onClickHandler = () => {
      if (isSelected) {
        return;
      }
      updateState('selectedRating', list);
      updateState('selectedReview', {});
    };

    return (
      <div key={`rating_${key}`} className={className} onClick={onClickHandler}>
        {list.optionValue}
      </div>
    );
  });

  return (
    <div className={Styles.ratingContainer}>
      <div className={Styles.ratingBtnContainer}>{renderList}</div>
      <div className={Styles.ratingFooter}>
        <div>{string.LOW_RATING}</div>
        <div>{string.HIGH_RATING}</div>
      </div>
    </div>
  );
};

const Section = props => {
  const type = get(props, 'data.questionType');
  const question = get(props, 'data.question');
  const { updateState, selectedReview } = props;

  switch (type) {
    case 'TEXT': {
      const questionId = get(props, 'data.surveyOptionList.0.questionId');
      const optionId = get(props, 'data.surveyOptionList.0.id');
      if (!optionId) {
        return null;
      }
      const value = get(selectedReview, `${optionId}.answer`) || '';
      const maxLength = 250;

      const onChangeHandler = e => {
        const value = get(e, 'target.value');
        const answer = value.slice(0, maxLength);
        if (answer && answer.trim()) {
          selectedReview[optionId] = {
            questionId,
            optionId,
            answer,
            channel: 3578
          };
        } else {
          delete selectedReview[optionId];
        }
        updateState('selectedReview', selectedReview);
      };

      return (
        <textarea
          className={Styles.textarea}
          placeholder={question}
          onChange={onChangeHandler}
          value={value}
          maxLength={maxLength}
        />
      );
    }
    default: {
      const options = get(props, 'data.surveyOptionList') || [];

      if (!options.length) {
        return null;
      }

      const renderOptions = options.map((option, i) => {
        const questionId = get(option, 'questionId');
        const optionId = get(option, 'id');
        const answer = get(option, 'optionValue');
        const isSelected = !!selectedReview[optionId];
        const onClickHandler = () => {
          if (isSelected) {
            delete selectedReview[optionId];
          } else {
            selectedReview[optionId] = {
              questionId,
              optionId,
              answer,
              channel: 3578
            };
          }
          updateState('selectedReview', selectedReview);
        };

        return (
          <div
            key={`review_${i}`}
            className={`${Styles.option} ${
              isSelected ? Styles.selectedOption : ''
            }`}
            onClick={onClickHandler}
          >
            {isSelected ? (
              <Check className={Styles.optionIcon} />
            ) : (
              <div className={Styles.optionIcon}>+</div>
            )}
            {answer}
          </div>
        );
      });

      return (
        <div>
          <div className={Styles.header}>{question}</div>
          <div className={Styles.optionContainer}>{renderOptions}</div>
        </div>
      );
    }
  }
};

export const Review = props => {
  const surveyQuestionList =
    get(props, 'selectedRating.surveyQuestionList') || [];
  if (!surveyQuestionList.length) {
    return null;
  }

  return (
    <div className={Styles.reviewContainer}>
      {surveyQuestionList.map((list, key) => (
        <Section {...props} data={list} key={key} />
      ))}
    </div>
  );
};
