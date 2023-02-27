import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import AddSizePreferences from './';

describe('Add Size Preferences', () => {
  const product = {
    image: '',
    subCategory: 'Topwear',
    articleType: 'tshirt',
    gender: 'Men',
    productName: 'RedCasualShirt',
    styleId: 10409956
  };

  const profile = {
    profileId: '1234',
    profileName: 'NewProfile'
  };

  window.SHELL = { redirectTo: () => {} };

  it('should render AddSizePreferences component', () => {
    const wrapper = mount(
      <AddSizePreferences product={product} profile={profile} />
    );

    expect(wrapper.find('.container').length).toEqual(1);
    expect(wrapper.find('.textContainer').length).toEqual(1);
    expect(wrapper.find('.textHeading').text()).toEqual(
      'Add Topwear Size Preferences'
    );
    expect(wrapper.find('.textDesc').text()).toEqual(
      'To recommend the right size on your next purchase'
    );
  });

  it('should redirect to correct url on CTA click', () => {
    const spy = sinon.spy();
    window.SHELL.redirectTo = spy;

    const wrapper = mount(
      <AddSizePreferences product={product} profile={profile} />
    );

    wrapper.find('.updateButton').simulate('click');
    expect(
      spy.calledOnceWith(
        '/size-finder?parent=ORDER_CONFIRMATION&sizeFinderRoute=cart&articleType=tshirt&gender=male&productName=RedCasualShirt&styleId=10409956&subCategory=Topwear&pidx=1234&editProfile=NewProfile'
      )
    ).toEqual(true);
  });
});
