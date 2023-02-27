import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import ButtonV2 from '.';

export default {
  title: 'CommonComp/ButtonV2',
  component: ButtonV2,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6'
    }
  }
};

const Template = args => <ButtonV2 {...args} />;

export const MobileButton = Template.bind({});
MobileButton.args = {
  text: 'Button',
  isLoading: false
};
