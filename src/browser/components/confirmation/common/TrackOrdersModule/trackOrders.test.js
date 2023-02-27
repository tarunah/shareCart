import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import TrackOrdersModule from './';

describe('Track Orders Section in mobile', () => {
  const storeOrderId = '110807198142022836802';
  it('if track orders message is displayed properly', () => {
    const wrapper = shallow(<TrackOrdersModule storeOrderId={storeOrderId} />);
    expect(wrapper.find('.bagContainer').length).toBe(1);
    expect(wrapper.find('.myntraBagIcon').length).toBe(1);
    expect(wrapper.find('.subText').length).toBe(1);
    expect(
      wrapper.find('.subText').contains('Track & manage your orders easily')
    ).toBe(true);
    expect(wrapper.find('.viewOrdersButton').length).toBe(1);
    expect(wrapper.find('.viewOrdersButton').text()).toEqual('View Orders');
  });

  it('if events are triggered or not', () => {
    const viewOrdersTriggerEvent = sinon.spy();
    const wrapper = shallow(
      <TrackOrdersModule
        viewOrdersTriggerEvent={viewOrdersTriggerEvent}
        storeOrderId={storeOrderId}
      />
    );
    wrapper.find('.viewOrdersButton').simulate('click');
    expect(viewOrdersTriggerEvent).toHaveProperty('callCount', 1);
  });
});
