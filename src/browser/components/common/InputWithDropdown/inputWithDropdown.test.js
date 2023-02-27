import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import InputWithDropdown from './';

describe('InputWithDropdown', () => {
  const inputWithDropdownProps = {
    entries: ['Entry1', 'Entry2', 'Entry3', 'Entry4'],
    selectedEntry: 'Entry1',
    placeholder: 'Enter text',
    onChange: () => {},
    value: ''
  };
  it('should render input with dropdown', () => {
    const toggleEntriesSpy = sinon.spy();
    const selectEntrySpy = sinon.spy();
    const wrapper = mount(
      <InputWithDropdown
        withDropdown={true}
        deviceMode="desktop"
        toggleEntries={toggleEntriesSpy}
        selectEntry={selectEntrySpy}
        entriesShown={false}
        {...inputWithDropdownProps}
      />
    );

    expect(wrapper.find('.inputWithDropdownContainer').length).toBe(1);
    expect(wrapper.find('.inputWithDropdown').length).toBe(1);
    expect(wrapper.find('.entriesDropdown').length).toBe(1);
    wrapper.find('.entriesDropdown').simulate('click');
    expect(toggleEntriesSpy).toHaveProperty('callCount', 1);
    expect(wrapper.find('.entryName').text()).toEqual('Entry1');
    expect(wrapper.find('DropDown.dropdownIcon').length).toBe(1);
  });

  it('should render input without dropdown', () => {
    const toggleEntriesSpy = sinon.spy();
    const selectEntrySpy = sinon.spy();
    const wrapper = mount(
      <InputWithDropdown
        withDropdown={false}
        deviceMode="desktop"
        toggleEntries={toggleEntriesSpy}
        selectEntry={selectEntrySpy}
        entriesShown={false}
        {...inputWithDropdownProps}
      />
    );

    expect(wrapper.find('.inputWithDropdownContainer').length).toBe(0);
    expect(wrapper.find('.input').length).toBe(1);
  });

  it('should render entries in desktop', () => {
    const toggleEntriesSpy = sinon.spy();
    const selectEntrySpy = sinon.spy();
    const wrapper = mount(
      <InputWithDropdown
        withDropdown={true}
        deviceMode="desktop"
        toggleEntries={toggleEntriesSpy}
        selectEntry={selectEntrySpy}
        entriesShown={true}
        {...inputWithDropdownProps}
      />
    );

    expect(wrapper.find('.dropDownShimmer').length).toBe(1);
    expect(wrapper.find('div.dropDown').length).toBe(1);
    wrapper.find('.dropDownShimmer').simulate('click');
    expect(toggleEntriesSpy).toHaveProperty('callCount', 1);
    expect(wrapper.find('.dropdownEntry').length).toBe(4);
    wrapper
      .find('.dropdownEntry')
      .first()
      .simulate('click');
    expect(selectEntrySpy).toHaveProperty('callCount', 1);
  });

  it('should render entries in mobile', () => {
    const toggleEntriesSpy = sinon.spy();
    const selectEntrySpy = sinon.spy();
    const wrapper = mount(
      <InputWithDropdown
        withDropdown={true}
        deviceMode="mobile"
        toggleEntries={toggleEntriesSpy}
        selectEntry={selectEntrySpy}
        entriesShown={true}
        {...inputWithDropdownProps}
      />
    );
    expect(wrapper.find('div.modal').length).toBe(1);
    expect(wrapper.find('.modalEntry').length).toBe(4);
    expect(wrapper.find('RadioActive.entryRadioIcon').length).toBe(1);
    expect(wrapper.find('RadioInActive.entryRadioIcon').length).toBe(3);
    wrapper
      .find('.modalEntry')
      .first()
      .simulate('click');
    expect(selectEntrySpy).toHaveProperty('callCount', 1);
  });
});
