import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import ProfileModal from './';

describe('Profile Modal', () => {
  it('should display profile modal', () => {
    const wrapper = mount(
      <ProfileModal
        closeProfileModal={() => {}}
        saveProfile={() => {}}
        onGenderClick={() => {}}
        currentProduct={{
          gender: 'male'
        }}
        profileModalError={''}
        saveInProgress={false}
        profileModalDetails={{
          name: '',
          gender: 'male'
        }}
      />
    );

    expect(wrapper.find('.modalTitle').text()).toEqual('Add Details');
    expect(wrapper.find('.genderHeader').text()).toEqual('Gender');
    expect(wrapper.find('.error').length).toEqual(0);
    expect(wrapper.find('.autoSelectText').length).not.toBe(0);
    expect(wrapper.find('.buttons').length).not.toBe(0);
  });

  it('modal functionality should work properly', () => {
    const save = sinon.spy();
    const genderClick = sinon.spy();
    const wrapper = mount(
      <ProfileModal
        closeProfileModal={() => {}}
        saveProfile={save}
        onGenderClick={genderClick}
        currentProduct={{
          gender: 'Unisex'
        }}
        profileModalError={'Profile name cannot be empty'}
        saveInProgress={false}
        profileModalDetails={{
          name: '',
          gender: 'male'
        }}
      />
    );

    expect(wrapper.find('.radioText').length).toEqual(2);
    wrapper.find('.save').simulate('click');
    expect(save).toHaveProperty('callCount', 1);
  });
});
