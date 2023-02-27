import React from 'react';

import GiftWrap from './';

export default {
  title: 'Desktop/GiftWrap',
  component: GiftWrap
};

const Template = args => (
  <div style={{ maxWidth: 300 }}>
    <GiftWrap {...args} />
  </div>
);

export const UnAppliedGiftCard = Template.bind({});
UnAppliedGiftCard.args = {
  storybookConfig: {
    componentName: 'GiftWrapUnApplied'
  },
  active: false,
  data: null,
  selectedProductsCount: 2,
  handleCartAction: {}
};

export const AppliedGiftCard = Template.bind({});
AppliedGiftCard.args = {
  storybookConfig: {
    componentName: 'GiftWrapApplied'
  },
  active: true,
  data: {
    message: 'Hey how are you? ',
    recipient: 'Recipient',
    sender: 'Its me'
  },
  selectedProductsCount: 2,
  handleCartAction: {}
};
