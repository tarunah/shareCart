import React from 'react';

import CartComponent from '.';
import CartMockData from 'testUtils/StorybookMockData/cartData';
import AddressMockData from 'testUtils/StorybookMockData/addressData';

export default {
  title: 'Page/Desktop/CartComponent',
  component: CartComponent
};

const Template = args => <CartComponent {...args} />;

export const DesktopCart = Template.bind({});
DesktopCart.args = {
  data: CartMockData.normalCart,
  addressData: AddressMockData.addressData,
  storybookConfig: {
    componentName: 'DesktopCartPage'
  },
  ...CartMockData.commonCartArgs
};

export const DesktopOOSCart = Template.bind({});
DesktopOOSCart.args = {
  data: CartMockData.oosCart,
  addressData: AddressMockData.addressData,
  storybookConfig: {
    componentName: 'DesktopOOSCartPage'
  },
  ...CartMockData.commonCartArgs
};
