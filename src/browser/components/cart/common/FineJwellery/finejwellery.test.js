import React from 'react';
import { shallow } from 'enzyme';
import FineJwellery from '.';
import sinon from 'sinon';

const returnSteps = {
  title: 'How Return Works',
  points: [
    {
      imageUrl:
        'https://assets.myntassets.com/assets/images/retaillabs/2022/9/27/555cf64f-33f8-45fe-a692-64b1f22309641664284405849-return-im.jpg',
      title: 'Raise Return Request',
      description: 'Go to Orders page and click on Return Item.'
    },
    {
      imageUrl:
        'https://assets.myntassets.com/assets/images/retaillabs/2022/9/27/33ba17bc-bffa-4a6d-9769-bb32e848b9011664284405837-upload-im.jpg',
      title: 'Upload the 2 videos',
      description:
        'Upload your video unpacking the item and also a video repacking it.',
      video_title: 'How to record videos',
      video_link: '#'
    }
  ]
};

describe('FineJwellery component', () => {
  beforeEach(() => {
    window.triggerEvent = sinon.spy();
  });
  it('should not display half card', () => {
    const wrapper = shallow(
      <FineJwellery
        mode="desktop"
        returnPeriod={2}
        subCategoryTypeName={'Jewellery'}
        fineJwellerySteps={returnSteps}
      />
    );
    expect(wrapper.find('.jwelleryItem').length).toBe(0);
  });
  it('should display half card', () => {
    const wrapper = shallow(
      <FineJwellery
        mode="desktop"
        returnPeriod={2}
        subCategoryTypeName={'Precious Jewellery'}
        fineJwellerySteps={returnSteps}
      />
    );
    expect(wrapper.find('.jwelleryItem').length).toBe(1);
    expect(wrapper.find('.returnInfoIcon').length).toBe(1);
    wrapper.find('.returnInfoIcon').simulate('click');
    expect(wrapper.find('.hcContainer').length).toBe(1);
    expect(wrapper.find('.hcTitle').length).toBe(1);
    expect(wrapper.find('.heading').text()).toEqual(returnSteps.title);
    expect(wrapper.find('.step').length).toBe(returnSteps.points.length);
  });
});
