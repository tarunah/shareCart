import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import StickyButton from '.';

export default {
  title: 'CommonComp/Button',
  component: StickyButton,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6'
    }
  }
};

const Template = args => <StickyButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  isCTAEnabled: true,
  total: 500,
  text: 'Next',
  points: 300,
  enabled: true,
  currentPage: 'payment'
};
