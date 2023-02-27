import React from 'react';

import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import DonationStripBlock from './';

export default {
  title: 'CommonComp/DonationStrip',
  component: DonationStripBlock
};

const Template = args => <DonationStripBlock {...args} />;

export const MobileDonationBlock = Template.bind({});
MobileDonationBlock.args = {
  storybookConfig: {
    componentName: 'MobileDonationBlock'
  },
  donationAmount: 50,
  mode: 'mobile',
  handleCartAction: {}
};
MobileDonationBlock.parameters = {
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone6'
  }
};

export const DesktopDonationBlock = Template.bind({});
DesktopDonationBlock.args = {
  storybookConfig: {
    componentName: 'DesktopDonationBlock'
  },
  donationAmount: 50,
  mode: 'desktop',
  handleCartAction: {}
};
