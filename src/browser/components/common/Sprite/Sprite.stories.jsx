import React from 'react';

import Sprite from './';

export default {
  title: 'CommonComp/Sprite',
  component: Sprite
};

const Template = args => <Sprite {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  name: 'oos'
};
