import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import AddressDetails from '.';

describe('Address details for address', () => {
  const addressInfo = {
    isDefault: true,
    addressType: 'HOME',
    streetAddress: 'AECS LAYOUT, KUDLU',
    locality: 'singasandra',
    city: 'Bangalore',
    pincode: '560068',
    state: {
      code: 'KA',
      name: 'Karnataka'
    },
    country: {
      code: 'IN',
      name: 'India'
    },
    user: {
      name: 'dxczcxzc',
      mobile: '9999999999'
    }
  };

  it('should show name with default', () => {
    const wrapper = mount(<AddressDetails addressInfo={addressInfo} />);
    expect(wrapper.find('.name').text()).to.contain('dxczcxzc');
  });

  it('should not show default', () => {
    addressInfo.isDefault = false;
    const wrapper = mount(<AddressDetails addressInfo={addressInfo} />);
    expect(wrapper.find('.name').text()).to.not.contain('(Default)');
  });

  it('should show all address fields', () => {
    const wrapper = mount(<AddressDetails addressInfo={addressInfo} />);
    expect(wrapper.find('.addressField').text()).to.contain(
      'AECS LAYOUT, KUDLU'
    );
    expect(wrapper.text()).to.contain('singasandra');
    expect(wrapper.find('.addressType').text()).to.contain('HOME');
    expect(wrapper.text()).to.contain('Bangalore, Karnataka 560068');
    expect(wrapper.text()).to.contain('Mobile: 9999999999');
  });

  it('should not show address type', () => {
    addressInfo.addressType = '';
    const wrapper = mount(<AddressDetails addressInfo={addressInfo} />);
    expect(wrapper.find('.addressType')).to.have.lengthOf(0);
  });
});
