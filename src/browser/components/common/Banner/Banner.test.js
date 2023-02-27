import React from 'react';
import { shallow } from 'enzyme';
import Banner from './';
import Image from 'commonComp/Image';

describe('Banner', () => {
  const bannerURL =
    'https://assets.myntassets.com/assets/images/retaillabs/2019/4/23/3142f2de-d6a5-48dc-b727-38d71aa6f8881556029257430-delivery_date.jpg';
  it('should display Banner component', () => {
    const wrapper = shallow(<Banner bannerURL={bannerURL} />);
    expect(
      wrapper.contains(
        <Image
          src={bannerURL}
          height="auto"
          width="auto"
          nonCloudinary={true}
        />
      )
    ).toBe(true);
  });

  it('should not display Banner component when URL is not passed', () => {
    const wrapper = shallow(<Banner bannerURL="" height="auto" width="auto" />);
    expect(wrapper.contains(<Image />)).toBe(false);
  });
});
