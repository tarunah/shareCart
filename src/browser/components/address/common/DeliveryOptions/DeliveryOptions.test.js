import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import DeliveryOptions from '.';
import serviceabilityMockData from 'testUtils/serviceabilityMockData';
import FeaturesManager from 'commonUtils/FeaturesManager';

describe('Delivery Options for address', () => {
  const { serviceability, shippingData } = serviceabilityMockData;
  window.triggerEvent = () => {};

  it('should call handleCartAction on clicking shipping option', () => {
    const handleCartAction = sinon.spy();
    const wrapper = mount(
      <DeliveryOptions
        {...serviceability}
        shippingData={shippingData}
        handleCartAction={handleCartAction}
      />
    );
    wrapper.instance().selectShippingMethod(
      'VALUE_SHIPPING',
      {},
      {
        currentTarget: {
          getAttribute() {
            return 'NORMAL';
          },
          querySelector() {
            return;
          }
        }
      }
    );
    expect(handleCartAction).to.have.property('callCount', 1);
  });

  it('should return null', () => {
    FeaturesManager.isFeatureEnabled = () => false;
    const wrapper = shallow(
      <DeliveryOptions
        {...serviceability}
        shippingData={shippingData}
        canHide={true}
      />
    );
    expect(wrapper.type()).to.equal(null);
  });

  it('should show header', () => {
    FeaturesManager.isFeatureEnabled = () => true;
    serviceability.expressShippingInfo.deliveryPromise.maxDays = 2;
    const wrapper = mount(
      <DeliveryOptions {...serviceability} shippingData={shippingData} />
    );
    expect(wrapper.text()).to.contain('CHOOSE DELIVERY SPEED');
  });
});
