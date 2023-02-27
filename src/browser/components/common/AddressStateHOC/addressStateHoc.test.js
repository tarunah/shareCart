import React from 'react';

import { mount } from 'enzyme';
import sinon from 'sinon';

import { AddressManagerV2 } from 'commonBrowserUtils/AddressManager';
import addressData from 'testUtils/addressMockData';

import AddressStateHOC from './';

const DummyComponent = ({ spyFunc, ...props }) => {
  spyFunc && spyFunc(props);
  return null;
};

const TestingComponent = AddressStateHOC(DummyComponent);

describe('AddressStateHoc', () => {
  window.triggerEvent = () => {};
  window.SHELL = {
    alert: () => {}
  };
  window._checkout_ = {
    __myx_data__: {
      addressInfo: addressData[0],
      pincode: '560068'
    },
    __myx_features__: {
      'checkout.addressOnCartV2.enabled': true
    },
    __myx_ab__: { 'cart.addressoncartv2': 'variant2' }
  };

  it('should read the state from window object and set in state', () => {
    const wrapper = mount(<TestingComponent />);

    expect(wrapper.state('userSelectedLocation')).toEqual({
      pincode: '560068',
      addressInfo: addressData[0],
      addressNotFound: false
    });
  });

  it('getAllAddress should get all the address and set it in the state with the selected address', async () => {
    const wrapper = mount(<TestingComponent />);
    AddressManagerV2.getAllAddress = sinon.spy(() => ({
      addresses: addressData
    }));

    await wrapper.find('DummyComponent').prop('handleAddressAction')(
      'getAllAddress',
      ''
    );

    expect(wrapper.state('addressData')).toEqual(addressData);
    expect(wrapper.state('selectedAddressId')).toEqual(6140886);
  });

  it('editAddress should get add the new address and set it in the state with the selected address', async () => {
    const wrapper = mount(<TestingComponent />);
    AddressManagerV2.getAllAddress = sinon.spy(() => ({
      addresses: addressData
    }));
    AddressManagerV2.editAddress = sinon.spy(data => {
      return data;
    });

    await wrapper.find('DummyComponent').prop('handleAddressAction')(
      'getAllAddress',
      ''
    );
    await wrapper.find('DummyComponent').prop('handleAddressAction')(
      'editAddress',
      {
        ...addressData[0],
        id: 6140887,
        unifiedId: '6140887:2'
      }
    );

    expect(wrapper.state('addressData')).toEqual([
      {
        ...addressData[0],
        id: 6140887,
        unifiedId: '6140887:2'
      },
      addressData[1]
    ]);
  });

  it('removeAddress should remove and select the default address', async () => {
    const wrapper = mount(<TestingComponent />);
    AddressManagerV2.getAllAddress = sinon.spy(() => ({
      addresses: addressData
    }));
    AddressManagerV2.removeAddress = sinon.spy(() => {});

    await wrapper.find('DummyComponent').prop('handleAddressAction')(
      'getAllAddress',
      ''
    );
    await wrapper.find('DummyComponent').prop('handleAddressAction')(
      'removeAddress',
      '6140887:1'
    );

    expect(wrapper.state('addressData')).toEqual([addressData[1]]);
    expect(wrapper.state('selectedAddressId')).toEqual(6140886);
  });

  it('addAddress and select the adderss', async () => {
    const updateServiceability = (data, scb) => scb();
    const wrapper = mount(
      <TestingComponent updateServiceability={updateServiceability} />
    );
    AddressManagerV2.getAllAddress = sinon.spy(() => ({
      addresses: addressData
    }));
    AddressManagerV2.addAddress = sinon.spy(data => data);

    await wrapper.find('DummyComponent').prop('handleAddressAction')(
      'getAllAddress',
      ''
    );
    await wrapper.find('DummyComponent').prop('handleAddressAction')(
      'addAddress',
      {
        ...addressData[0],
        id: 6140888,
        unifiedId: '6140888:1'
      }
    );

    expect(wrapper.state('addressData')).toEqual([
      ...addressData,
      {
        ...addressData[0],
        id: 6140888,
        unifiedId: '6140888:1'
      }
    ]);

    expect(wrapper.state('selectedAddressId')).toEqual(6140888);
  });

  it('getAddressByUnifiedId should get address and select that address', async () => {
    const updateServiceability = (data, scb) => scb();
    const wrapper = mount(
      <TestingComponent updateServiceability={updateServiceability} />
    );
    AddressManagerV2.getAllAddress = sinon.spy(() => ({
      addresses: addressData
    }));
    AddressManagerV2.getAddressByUnifiedId = sinon.spy(() => {
      return addressData[0];
    });

    await wrapper.find('DummyComponent').prop('handleAddressAction')(
      'getAllAddress',
      ''
    );
    await wrapper.find('DummyComponent').prop('handleAddressAction')(
      'getAddressByUnifiedId',
      '6140887:1'
    );

    expect(wrapper.state()).toEqual({
      addressData: addressData,
      selectedAddressId: 6140887,
      userSelectedLocation: {
        addressInfo: addressData[0],
        addressNotFound: false,
        pincode: addressData[0].pincode
      }
    });
  });
});
