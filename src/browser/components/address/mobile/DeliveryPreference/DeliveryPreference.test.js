import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import DeliveryPreference from '.';

describe('Delivery preference for user', () => {
  it('component should be present when feature is enabled', () => {
    const wrapper = shallow(
      <DeliveryPreference
        show={true}
        selectDeliveryPreference={() => {}}
        selectedDeliveryPreference={''}
      />
    );
    expect(wrapper.find('.deliveryPreferenceTitle').text()).to.contain(
      'Choose delivery preference'
    );
  });

  it('component should not be present when feature is disabled', () => {
    const wrapper = shallow(
      <DeliveryPreference
        show={false}
        selectDeliveryPreference={() => {}}
        selectedDeliveryPreference={''}
      />
    );
    expect(wrapper.type()).to.equal(null);
  });

  it('should have two preferences when feature is enabled', () => {
    const expectedTextGroupShipments =
      'Group items into as few shipments as possible';
    const expectedTextSpeedShipments =
      'Ship my items as soon as they become available';

    const wrapper = mount(
      <DeliveryPreference
        show={true}
        selectDeliveryPreference={() => {}}
        selectedDeliveryPreference={''}
      />
    );
    const preferenceOptionMessages = wrapper.find('.preferenceOptionMessage');

    expect(preferenceOptionMessages).to.have.lengthOf(2);
    expect(preferenceOptionMessages.at(0).text()).to.equal(
      expectedTextGroupShipments
    );
    expect(preferenceOptionMessages.at(1).text()).to.equal(
      expectedTextSpeedShipments
    );
  });

  it('should call handler with appropriate argument on selecting delivery preference option', () => {
    const selectDeliveryPreferenceSpy = sinon.spy();
    const wrapper = mount(
      <DeliveryPreference
        show={true}
        selectDeliveryPreference={selectDeliveryPreferenceSpy}
        selectedDeliveryPreference={'group_shipments'}
      />
    );
    // expect(wrapper.find('.selectedRadioIcon')).to.have.lengthOf(2);

    const preferenceOptions = wrapper.find('.preferenceOption');
    expect(preferenceOptions).to.have.lengthOf(2);

    // Click on group shipments
    preferenceOptions.at(0).simulate('click');
    expect(selectDeliveryPreferenceSpy.callCount).to.equal(1);
    const groupShipmentClickArguments = selectDeliveryPreferenceSpy.args[0];
    expect(groupShipmentClickArguments[0]).to.equal('group_shipments');

    // Click on speed shipments
    preferenceOptions.at(1).simulate('click');
    expect(selectDeliveryPreferenceSpy.callCount).to.equal(2);
    const speedShipmentClickArguments = selectDeliveryPreferenceSpy.args[1];
    expect(speedShipmentClickArguments[0]).to.equal('speed_shipments');
  });
});
