import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import BannerComponent from '.';

export default {
  title: 'CommonComp/Banner',
  component: BannerComponent,
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

const Template = args => <BannerComponent {...args} />;

export const Banner = Template.bind({});
Banner.args = {
  bannerURL:
    'https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/9/24/0865ed21-71d1-4682-81ec-57b7bd7e9bfe1632495455934-Men-Casual_Desk.jpg'
};

Banner.parameters = {
  docs: {
    source: {
      code: `<Banner
  bannerURL = 'https://assets.myntassets.com/f_webp,w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2021/9/24/0865ed21-71d1-4682-81ec-57b7bd7e9bfe1632495455934-Men-Casual_Desk.jpg'
/>;`
    }
  }
};
