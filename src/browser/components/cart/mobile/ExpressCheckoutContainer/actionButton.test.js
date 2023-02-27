import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import ActionButton from './ActionButton';

describe('Test Action Button ', () => {
  const makePayment = sinon.spy();
  let paymentType = 'cod';
  const expressCheckoutData = {
    finalAmount: 100
  };
  it('should test if the component is rendered properly', () => {
    const setRef = sinon.stub(ActionButton.prototype, 'setRef');

    let wrapper = mount(
      <ActionButton
        expressCheckoutData={expressCheckoutData}
        payNow={makePayment}
        paymentType={paymentType}
      />
    );
    expect(wrapper.find('.payNow').exists()).toBe(true);
    expect(wrapper.find('.actionButton').exists()).toBe(true);
    expect(wrapper.find('.arrowWrapper').exists()).toBe(true);
    expect(wrapper.find('Arrows').exists()).toBe(true);
    expect(wrapper.find('Arrow').exists()).toBe(true);
    expect(wrapper.find('.arrow').length).toBe(3);
    expect(wrapper.find('ActionTxt').exists()).toBe(true);
    expect(
      wrapper
        .find('.actionButton')
        .find('span')
        .at(0)
        .text()
    ).toBe('SWIPE TO PLACE ORDER');
    wrapper.find('.actionButton').simulate('click');
    expect(makePayment.callCount).toBe(0);
    expect(setRef.callCount).toBe(1);

    wrapper.unmount();

    paymentType = 'savedcard';
    expressCheckoutData.finalAmount = 0;
    wrapper = mount(
      <ActionButton
        expressCheckoutData={expressCheckoutData}
        payNow={makePayment}
        paymentType={paymentType}
      />
    );
    expect(
      wrapper
        .find('.actionButton')
        .find('span')
        .at(0)
        .text()
    ).toBe('SWIPE TO PLACE ORDER');
    wrapper.find('.actionButton').simulate('click');
    expect(makePayment.callCount).toBe(0);

    wrapper.unmount();
  });

  it('should test functions', () => {
    const touchMoveEvent = {
      changedTouches: [
        {
          pageX: 0,
          clientX: 0
        }
      ]
    };

    const touchStartEvent = {
      preventDefault: sinon.spy(),
      changedTouches: [
        {
          pageX: 0,
          clientX: 0
        }
      ]
    };
    const wrapper = shallow(
      <ActionButton
        expressCheckoutData={expressCheckoutData}
        payNow={makePayment}
        paymentType={paymentType}
      />
    );

    wrapper.instance().onTouchStart(touchStartEvent, 0);
    expect(wrapper.state().showAnim).toBe(false);

    wrapper.instance().arrows = {
      style: {
        opacity: 0
      }
    };
    wrapper.instance().btnLength = 100;

    wrapper.instance().onTouchMove(touchMoveEvent);
    expect(wrapper.state().showAnim).toBe(false);
    expect(makePayment.callCount).toBe(0);

    wrapper.instance().onTouchMove(touchMoveEvent);
    expect(makePayment.callCount).toBe(0);

    touchMoveEvent.changedTouches[0].clientX = 70;
    wrapper.instance().onTouchMove(touchMoveEvent);
    expect(makePayment.callCount).toBe(1);

    touchMoveEvent.changedTouches[0].pageX = 70;
    wrapper.instance().onTouchMove(touchMoveEvent);
    expect(makePayment.callCount).toBe(1);
  });
});
