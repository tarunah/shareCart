import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

import AddressComponent from '.';
import CartMockData from 'testUtils/StorybookMockData/cartData';
import AddressMockData from 'testUtils/StorybookMockData/addressData';

export default {
  title: 'Page/Mobile/AddressComponent',
  component: AddressComponent,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6'
    }
  }
};

const Template = args => <AddressComponent {...args} />;

export const MobileAddress = Template.bind({});
MobileAddress.args = {
  cartData: CartMockData.normalCart,
  addressData: AddressMockData.addressData,
  storybookConfig: {
    componentName: 'MobileAddressPage'
  },
  handleCartAction: {},
  selectedAddressId: AddressMockData.addressData[0].id
};
