import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import DeliveryAddress from './DeliveryAddress';

describe('Test DeliveryAddress Components', () => {
  const deliveryData = {
    id: 6158952,
    isDefault: true,
    score: 'VALID',
    addressType: 'HOME',
    notAvailableDays: [],
    streetAddress: 'Myntra Design Pvt. Ltd, 7th Mile',
    locality: 'Bommanahalli  (Bangalore)',
    city: 'Bangalore',
    pincode: '560068',
    state: { code: 'KA', name: 'Karnataka' },
    country: { code: 'IN', name: 'India' },
    user: {
      uidx: 'automation-69d75c32.b0a4.4b37.aeb2.d8f9ac947d458BasSP7QKW',
      name: 'Sandeep',
      email: 'stagexxx@gmail.com',
      mobile: '9999999999'
    }
  };

  it('should test if the component is rendered properly', () => {
    const toggleDetails = sinon.spy();
    const wrapper = shallow(
      <DeliveryAddress data={deliveryData} showDetails={toggleDetails} />
    );

    expect(wrapper.find('MiniHeaderNav').exists()).toBe(true);
    expect(wrapper.find('.deliveryAddressWrapper').length).toBe(1);
    expect(wrapper.find('.addressContent').length).toBe(1);
    expect(wrapper.find('.nameAndType').length).toBe(1);
    expect(wrapper.find('.fullname').length).toBe(1);
    expect(wrapper.find('.fullname').text()).toBe(deliveryData.user.name);
    expect(wrapper.find('.addressType').length).toBe(1);
    expect(wrapper.find('.addressType').text()).toBe(deliveryData.addressType);
    expect(wrapper.find('.address').length).toBe(1);
    expect(wrapper.find('.address').text()).toBe(
      `${deliveryData.streetAddress}, ${deliveryData.locality}, ${deliveryData.city}-${deliveryData.pincode}`
    );
    expect(wrapper.find('.mobile').length).toBe(1);
    expect(wrapper.find('.mobile').text()).toBe(deliveryData.user.mobile);
  });
});
