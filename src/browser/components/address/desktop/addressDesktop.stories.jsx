import React from 'react';

import AddressComponent from '.';
import CartMockData from 'testUtils/StorybookMockData/cartData';
import AddressMockData from 'testUtils/StorybookMockData/addressData';

export default {
  title: 'Page/Desktop/AddressComponent',
  component: AddressComponent
};

const Template = args => <AddressComponent {...args} />;

export const DesktopAddress = Template.bind({});
DesktopAddress.args = {
  cartData: CartMockData.normalCart,
  addressData: AddressMockData.addressData,
  storybookConfig: {
    componentName: 'DesktopAddressPage'
  },
  handleCartAction: {},
  selectedAddressId: AddressMockData.addressData[0].id
};
