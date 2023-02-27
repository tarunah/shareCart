import React from 'react';
import { shallow } from 'enzyme';
import SuperCoinRewards from '.';

const componentProps = {
  analyticsData: {},
  carouselHeight: 'auto',
  rewardsList: [
    {
      imageUrl:
        'https://assets.myntassets.com/assets/images/retaillabs/2021/9/3/74e9ae39-2302-42e7-ad8c-917e51b2206c1630656211389-Get-Myntra-Voucher-worth-Rs.500.jpg',
      title: 'Get Myntra Voucher worth Rs.500'
    },
    {
      imageUrl:
        'https://assets.myntassets.com/assets/images/retaillabs/2021/9/3/4ef867c9-1129-4e3c-98c8-b67711845e421630656211382-Get-Leivs-Voucher-worth-Rs.-500.jpg',
      title: "Get Levi's Voucher worth Rs. 500"
    },
    {
      imageUrl:
        'https://assets.myntassets.com/assets/images/retaillabs/2021/9/3/935ad8e3-121b-41d1-abd1-1200ad4dda531630656211396-Get-SonyLiv-Premium-1-Month-Subscription.jpg',
      title: 'Get SonyLiv Premium 1 Month Subscription'
    },
    {
      imageUrl:
        'https://assets.myntassets.com/assets/images/retaillabs/2021/9/3/ad73203d-eadf-4539-afff-8d9de0f121d61630656211403-Get-Tokyo-Talkies-Voucher-worth-Rs.400.jpg',
      title: 'Get Tokyo Talkies Voucher worth Rs.400'
    },
    {
      imageUrl:
        'https://assets.myntassets.com/assets/images/retaillabs/2021/9/3/258492c4-99f1-4a49-a416-c6e26303d82c1630656211377-Get-FLAT-12--OFF-on-Flipkart-Flight--Bookings.jpg',
      title: 'Get FLAT 12% OFF on Flipkart Flight  Bookings'
    }
  ],
  rewardItemCtaLink: 'https://www.myntra.com/myntrainsider/offers',
  setCarouselHeight: () => {},
  superCoinRewardsTitle: 'Use your SuperCoins to get exciting Rewards!',
  showProgressBar: false
};

describe('SuperCoinRewards renders', () => {
  it('should render the SuperCoinRewards', () => {
    const wrapper = shallow(<SuperCoinRewards {...componentProps} />);
    expect(wrapper.find('.superCoinRewardsContainer').length).toBe(1);
    expect(wrapper.find('.superCoinRewardsTitle').length).toBe(1);
    expect(wrapper.find('.superCoinRewardsCarouselWrapper').length).toBe(1);
  });

  it('should render the title from config SuperCoinRewards', () => {
    const wrapper = shallow(<SuperCoinRewards {...componentProps} />);
    expect(wrapper.find('.superCoinRewardsTitle').text()).toBe(
      'Use your SuperCoins to get exciting Rewards!'
    );
  });

  it('should render the rewards from config for SuperCoinRewards', () => {
    const wrapper = shallow(<SuperCoinRewards {...componentProps} />);
    expect(wrapper.find('.superCoinRewardsCarousel').length).toBe(1);
    expect(wrapper.find('RewardItem').length).toBe(5);
  });
});
