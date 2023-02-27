import React from 'react';
import { mount } from 'enzyme';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Strings from 'commonBrowserUtils/Strings';

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
    expect(wrapper.find('.name').text()).toContain('dxczcxzc');
  });

  it('should not show default', () => {
    addressInfo.isDefault = false;
    const wrapper = mount(<AddressDetails addressInfo={addressInfo} />);
    expect(wrapper.find('.name').text()).not.toContain('(Default)');
  });

  it('should show all address fields', () => {
    const wrapper = mount(<AddressDetails addressInfo={addressInfo} />);
    expect(wrapper.find('.addressField').text()).toContain(
      'AECS LAYOUT, KUDLU'
    );
    expect(wrapper.text()).toContain('singasandra');
    expect(wrapper.find('.addressType').text()).toContain('HOME');
    expect(wrapper.text()).toContain('Bangalore, Karnataka - 560068');
    expect(wrapper.text()).toContain('Mobile: 9999999999');
  });

  it('should not show address type', () => {
    addressInfo.addressType = '';
    const wrapper = mount(<AddressDetails addressInfo={addressInfo} />);
    expect(wrapper.find('.addressType').exists()).toBe(false);
  });

  it('should show the full address when minimize is false', () => {
    render(<AddressDetails addressInfo={addressInfo} minimize={false} />);

    expect(screen.queryByText('dxczcxzc')).toBeInTheDocument();
    expect(screen.queryByText('AECS LAYOUT, KUDLU')).toBeInTheDocument();
    expect(
      screen.queryByText('Bangalore, Karnataka - 560068')
    ).toBeInTheDocument();
    expect(screen.queryByText('9999999999')).toBeInTheDocument();
    expect(screen.queryByText(Strings.DELIVERING_HERE)).toBeInTheDocument();
    expect(screen.queryByText(Strings.EDIT)).toBeInTheDocument();
    expect(screen.getByRole('deleteIcon')).toBeInTheDocument();
  });

  it('should show only one line when minimize is false', () => {
    render(<AddressDetails addressInfo={addressInfo} minimize={true} />);

    expect(screen.queryByText('dxczcxzc')).toBeInTheDocument();
    expect(
      screen.queryByText('AECS LAYOUT, KUDLU, singasandra')
    ).toBeInTheDocument();

    expect(
      screen.queryByText('Bangalore, Karnataka - 560068')
    ).not.toBeInTheDocument();
    expect(screen.queryByText('9999999999')).not.toBeInTheDocument();
    expect(screen.queryByText(Strings.DELIVERING_HERE)).not.toBeInTheDocument();
    expect(screen.queryByText(Strings.EDIT)).not.toBeInTheDocument();
    expect(screen.queryByRole('deleteIcon')).not.toBeInTheDocument();
  });
});
