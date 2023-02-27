import React from 'react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import withMock from 'storybook-addon-mock';

import CartComponent from '.';
import CartMockData from 'testUtils/StorybookMockData/cartData';
import AddressMockData from 'testUtils/StorybookMockData/addressData';
import InsiderMockData from 'testUtils/StorybookMockData/insiderData';
import { products } from 'testUtils/StorybookMockData/wishlistData';

export default {
  title: 'Page/Mobile/CartComponent',
  component: CartComponent,
  decorators: [withMock],
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone6'
    }
  }
};

const Template = args => <CartComponent {...args} />;

export const MobileCart = Template.bind({});
MobileCart.args = {
  data: CartMockData.normalCart,
  addressData: AddressMockData.addressData,
  storybookConfig: {
    componentName: 'MobileCartPage'
  },
  ...CartMockData.commonCartArgs
};

export const MobileOOSCart = Template.bind({});
MobileOOSCart.args = {
  data: CartMockData.oosCart,
  addressData: AddressMockData.addressData,
  storybookConfig: {
    componentName: 'MobileOOSCartPage'
  },
  ...CartMockData.commonCartArgs
};

export const MobileFRG = Template.bind({});
MobileFRG.args = {
  data: CartMockData.frgCart,
  addressData: AddressMockData.addressData,
  storybookConfig: {
    componentName: 'MobileFRG'
  },
  ...CartMockData.commonCartArgs
};

export const MobileAocV2 = Template.bind({});
MobileAocV2.args = {
  data: CartMockData.normalCart,
  addressData: AddressMockData.addressData,
  ...CartMockData.commonCartArgs,
  userSelectedLocation: {
    pincode: AddressMockData.addressData[0].pincodes,
    addressInfo: AddressMockData.addressData[0]
  },
  storybookConfig: {
    componentName: 'MobileAocV2Page',
    featureGate: {
      'checkout.addressOnCartV2.enabled': true
    },
    profileData: {
      uidx: 'dummyUidx'
    },
    deviceData: {
      isApp: true
    },
    abtest: {
      'cart.addressoncartv2': 'variant3'
    },
    cookieString: 'ilgim=true;'
  }
};
MobileAocV2.parameters = {
  mockData: [
    {
      url: 'https://knuth.stage.myntra.com/v2/addresses',
      method: 'POST',
      status: 200,
      response: AddressMockData.addressData
    }
  ]
};

export const MobileCartWithInsider = Template.bind({});
MobileCartWithInsider.args = {
  data: CartMockData.normalCart,
  addressData: AddressMockData.addressData,
  ...CartMockData.commonCartArgs,
  storybookConfig: {
    componentName: 'MobileCartWithInsiderPage',
    featureGate: {
      'checkout.insiderPoints.enable': true
    },
    profileData: {
      uidx: 'dummyUidx'
    },
    deviceData: {
      isApp: true
    },
    cookieString: 'ilgim=true;'
  }
};
MobileCartWithInsider.parameters = {
  mockData: [
    {
      url: '/checkoutproxy/insiderData',
      method: 'POST',
      status: 200,
      response: InsiderMockData.insiderWithTwoStyles
    }
  ]
};

const SliceProducts = args => (
  <Template
    {...args}
    wishlistProducts={args.wishlistProducts.slice(0, args.wishlistLimit)}
    totalWishlistProductCount={args.wishlistProducts.length}
  />
);

export const MobileCartWithPriceDropWishlist = SliceProducts.bind({});
MobileCartWithPriceDropWishlist.args = {
  wishlistLimit: 2,
  wishlistProducts: products,
  data: CartMockData.normalCart,
  addressData: AddressMockData.addressData,
  ...CartMockData.commonCartArgs,
  storybookConfig: {
    componentName: 'MobileCartWithPriceDropWishlist',
    featureGate: {
      'checkout.cart.wishlist': true
    },
    abtest: {
      'cart.wishlist.priceDropped': 'enabled'
    },
    profileData: {
      uidx: 'dummyUidx'
    },
    deviceData: {
      isApp: true
    },
    cookieString: 'ilgim=true;'
  }
};
MobileCartWithPriceDropWishlist.parameters = {
  viewport: {
    viewports: {
      snapshotConfig: {
        name: 'Snapshot Config',
        styles: {
          width: '360px',
          height: '1720px'
        }
      }
    }
  }
};
