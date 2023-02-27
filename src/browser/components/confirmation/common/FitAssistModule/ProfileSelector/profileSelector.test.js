import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import ProfileSelector from '.';

describe('Profile Selector', () => {
  const currentProduct = {
    id: '1531-3831',
    gender: 'male',
    articleType: 'Tshirts'
  };

  const profileSelectorProps = {
    profiles: [],
    selectedProfile: null,
    selectProfile: () => {},
    getCurrentProductIndex: () => 0,
    currentProduct,
    showAllTaggedMessage: false,
    blankSlide: false,
    taggableProductsCount: 1,
    openSizeInfo: () => {}
  };

  it('should display profile selector', () => {
    const wrapper = mount(<ProfileSelector {...profileSelectorProps} />);

    expect(wrapper.find('.arrowLine').length).toBe(1);
    expect(wrapper.find('.profileButton').length).toBe(2);
  });

  it('should not display profile selector with all tagged', () => {
    const wrapper = mount(
      <ProfileSelector {...profileSelectorProps} showAllTaggedMessage={true} />
    );
    expect(wrapper.find('.profileButton').length).toBe(2);
  });

  it('should not display profile selector with blank slide', () => {
    const wrapper = mount(
      <ProfileSelector {...profileSelectorProps} blankSlide={true} />
    );

    expect(wrapper.find('.profileButton').length).toBe(0);
  });

  it('should not display profile selector for non-taggable', () => {
    const wrapper = mount(
      <ProfileSelector
        {...profileSelectorProps}
        getCurrentProductIndex={() => 1}
      />
    );

    expect(wrapper.find('.profileButton').length).toBe(0);
  });

  it('selector should function properly', () => {
    const callback = sinon.spy();
    const wrapper = mount(
      <ProfileSelector
        {...profileSelectorProps}
        selectProfile={callback}
        selectedProfile={'myself'}
      />
    );

    wrapper.find('.profileButton.selected').simulate('click');
    expect(callback).toHaveProperty('callCount', 1);
  });
});
