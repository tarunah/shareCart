import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import ExchangePriceDetailsInfoComponent from '.';

export default {
  title: 'CommonComp/Exchange Price Details Info',
  component: ExchangePriceDetailsInfoComponent,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12'
    }
  },
  decorators: [
    Story => (
      <div style={{ margin: '2em' }}>
        <Story />
      </div>
    )
  ]
};

export const ExchangePriceDetailsInfo = args => (
  <ExchangePriceDetailsInfoComponent {...args} />
);

ExchangePriceDetailsInfo.parameters = {
  docs: {
    source: {
      code: `<ExchangePriceDetailsInfo />;`
    }
  }
};
