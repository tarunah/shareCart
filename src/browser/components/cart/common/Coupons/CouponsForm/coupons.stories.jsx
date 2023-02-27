import React from 'react';

import { CouponsForm } from '.';

export default {
  title: 'CommonComp/CouponsForm',
  component: CouponsForm
};

const Template = args => <CouponsForm {...args} />;

export const CouponsFormInitialLoadWithViewRelevantProducts = Template.bind({});
CouponsFormInitialLoadWithViewRelevantProducts.args = {
  setCouponCode: () => {},
  couponInput: 'Stage12',
  errorMessage: 'Oops! Something went wrong. Please try after some time.',
  applyCoupon: () => {},
  loading: false,
  coupons: [],
  potentialCoupons: [],
  maximumSavings: 0,
  renderBannerFG: false,
  tagLink: 'https://www.myntra.com/emp25',
  storybookConfig: {
    componentName: 'CouponsForm',
    featureGate: {
      'checkout.coupons.relevantproduct': true
    }
  }
};
