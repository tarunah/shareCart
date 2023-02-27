import React from 'react';
import FeedbackSurveyWidget from '.';
import data from './mockData';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('FeedbackSurveyWidget Comp tested with RTL', () => {
  it('should render feedback widget', () => {
    render(<FeedbackSurveyWidget dataState={data} />);
    expect(screen.getByTestId('FeedbackSurveyWidget'));
    expect(
      screen.getByText(
        'Based on your experience on the Myntra Platform, how likely are you to recommend Myntra to your friends and family?'
      )
    );
  });

  it('should click on rating in feedback widget', () => {
    render(<FeedbackSurveyWidget dataState={data} />);
    userEvent.click(screen.getByText('3'));
  });
});
