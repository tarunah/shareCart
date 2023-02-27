import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import ErrorPageComponent from '.';

export default {
  title: 'CommonComp/Error Page',
  component: ErrorPageComponent,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12'
    },
    docs: {
      source: {
        type: 'auto'
      }
    }
  }
};

const Template = args => <ErrorPageComponent {...args} />;

export const ErrorPage = Template.bind({});
ErrorPage.args = {
  message: 'Something went wrong! Please reload.',
  reload: false
};

ErrorPage.parameters = {
  docs: {
    source: {
      code: `<ErrorPage
  message = 'Something went wrong! Please reload.'
  reload = {false}
/>;`
    }
  }
};
