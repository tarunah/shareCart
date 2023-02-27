import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import InlineButton from '.';

export default {
  title: 'CommonComp/InlineButtonV3',
  component: InlineButton,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6'
    }
  }
};

const Template = args => <InlineButton {...args} />;

export const MobileInlineButton = Template.bind({});
MobileInlineButton.args = {
  buttons: [
    {
      text: 'Close',
      type: 'secondary',
      clickHandler: () => {
        console.log('Close clicked');
      }
    },
    {
      text: 'Apply',
      clickHandler: () => {
        console.log('Apply clicked');
      }
    }
  ]
};
