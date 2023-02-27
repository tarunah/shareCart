import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import PopupModal from '.';
import { POPUP_MODAL_WRAPPER } from './index';
import ScratchCard from './ScratchCard';

const props = {
  onPopupDismiss: sinon.spy(),
  rewardDetails: {
    id: 1,
    status: 'UNSCRATCHED',
    expiryDate: 1655505635,
    couponBrandImg:
      'https://assets.myntassets.com/assets/images/2022/3/11/12def365-0cab-4cc0-8c1c-e3ca8a3ad1c81646997461429-sc_hrx_logo.png',
    couponTitle: 'Extra 20% off',
    featureTag: 'BAU',
    couponCode: 'MBSHRX500',
    shortDesc: 'Extra 20% off',
    conditionMin: '₹2499',
    conditionMax: '₹500',
    discountType: 'PERCENTAGE'
  }
};

describe('Card Components Tests', () => {
  let wrapper;

  beforeEach(() => {
    window._checkout_ = {
      __myx_growthhack__: {
        scratchCardRetentionConfig: {
          themes: [
            'https://assets.myntassets.com/assets/images/2022/3/11/d797b8a5-e708-4c4c-9c3d-8bb4c95ed5a31646997301271-sc_theme_1.png',
            'https://assets.myntassets.com/assets/images/2022/3/11/0fbe01fa-5000-4dce-bbfa-5124f66231061646997342052-sc_theme_4.png',
            'https://assets.myntassets.com/assets/images/2022/3/11/389704cc-abd7-4c50-9ecd-6e7c5d86ddea1646997342045-sc_theme_3.png',
            'https://assets.myntassets.com/assets/images/2022/3/11/bc35c9e6-75a0-48a4-9cb0-de947400b0441646997342038-sc_theme_2.png'
          ]
        }
      }
    };
    wrapper = mount(<PopupModal {...props} />);
  });

  it('should check if PopupModal is displayed properly', () => {
    expect(wrapper.find(`#${POPUP_MODAL_WRAPPER}`).exists()).toEqual(true);
    expect(wrapper.find(`.crossIcon`).exists()).toEqual(true);
    expect(wrapper.find(ScratchCard).exists()).toEqual(true);
  });

  it('should check if onPopupDismiss is being triggered after clicking on close button', () => {
    wrapper.find(`#${POPUP_MODAL_WRAPPER} > .crossIcon`).simulate('click');
    expect(props.onPopupDismiss.callCount).toEqual(1);
  });
});
