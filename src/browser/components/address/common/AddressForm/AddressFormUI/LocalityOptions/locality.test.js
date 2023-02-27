import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import LocalityOptions from '.';
import addressData from 'testUtils/addressMockData';
import AddressManager from 'commonBrowserUtils/AddressManager';
let onChange;

describe('Locality options component', () => {
  describe('locality options for mobile', () => {
    beforeEach(() => {
      onChange = sinon.spy();
    });

    it('should display the value in optionBlock', () => {
      const wrapper = mount(
        <LocalityOptions
          value="Bangalore"
          loading={false}
          options={['Silkboad']}
          onChange={onChange}
          mode="mobile"
        />
      );
      wrapper.find('.localityBlock').simulate('focus');
      expect(
        wrapper.find('input[id~="optionTextField"]').props().value
      ).to.equal('Bangalore');
    });

    it('should load all the options as radio buttons with the passed value', () => {
      const wrapper = mount(
        <LocalityOptions
          value="Ma"
          loading={false}
          options={['Silkboad', 'Singasandra', 'Madiwala']}
          onChange={onChange}
          mode="mobile"
        />
      );
      wrapper.find('.localityBlock').simulate('focus');
      expect(wrapper.find('RadioButton').length).to.equal(4);
    });

    it('onChange function should be called after changing the locality and clicking on done', () => {
      const wrapper = mount(
        <LocalityOptions
          value="Bangalore"
          loading={false}
          options={['Silkboad', 'Singasandra']}
          onChange={onChange}
          mode="mobile"
        />
      );
      wrapper.find('.localityBlock').simulate('focus');
      wrapper.find('RadioButton[children~="Singasandra"]').simulate('click');
      wrapper.find('.btnDone').simulate('click');
      expect(onChange.calledOnce).to.equal(true);
    });
  });

  describe('locality options for desktop', () => {
    beforeEach(() => {
      window._checkout_ = {
        __myx_deviceData__: { isMobile: false }
      };
      onChange = sinon.spy();
    });

    it('should render loading if it is true in props', () => {
      const wrapper = mount(
        <LocalityOptions loading={true} options={[]} onChange={onChange} />
      );
      wrapper.find('.localityBlock').simulate('focus');
      expect(wrapper.find('.loadingOptions')).to.have.lengthOf(1);
    });

    it('should load the option after clicking on the locality inputbox with all values', () => {
      const wrapper = mount(
        <LocalityOptions
          value=""
          loading={false}
          options={['Silkboad', 'Singasandra']}
          onChange={onChange}
        />
      );
      wrapper.find('.localityBlock').simulate('focus');
      expect(wrapper.find('div[id~="locality-0"]').text()).to.equal('Silkboad');
      expect(wrapper.find('div[id~="locality-1"]').text()).to.equal(
        'Singasandra'
      );
    });

    it('should load only the options matching the value if the value is not empty', () => {
      const wrapper = mount(
        <LocalityOptions
          value="Ma"
          loading={false}
          options={['Silkboad', 'Singasandra', 'Madiwala']}
          onChange={onChange}
        />
      );
      wrapper.find('.localityBlock').simulate('focus');
      expect(wrapper.find('div[id~="locality-2"]').text()).to.equal('Madiwala');
    });

    it('modal should onBlur over the locality options', () => {
      const wrapper = mount(
        <LocalityOptions
          value="Ma"
          loading={false}
          options={['Silkboad', 'Singasandra', 'Madiwala']}
          onChange={onChange}
        />
      );
      wrapper.find('.localityBlock').simulate('focus');
      expect(wrapper.state().showDesktopOption).to.equal(true);
      wrapper.find('.localityBlock').simulate('blur');
      expect(wrapper.state().showDesktopOption).to.equal(false);
    });
  });
});
