import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import RetryBackConfirmationModal from './';

describe('RetryBackConfirmationModal', () => {
  it('should render RetryBackConfirmationModal in desktop', () => {
    const wrapper = mount(
      <RetryBackConfirmationModal
        mode="desktop"
        show={true}
        stayHere={() => {}}
        tryLater={() => {}}
      />
    );

    expect(wrapper.find('div.desktopModalContainer').length).toEqual(1);
    expect(wrapper.find('.modalHeader').text()).toEqual(
      "Don't want to pay now ?"
    );
    expect(wrapper.find('.modalDesc').text()).toEqual(
      'No worries, you can pay online using PayNow option from orders, till the order is out for delivery or you can pay at the time of delivery through Cash/UPI.'
    );
    expect(wrapper.find('div.button').length).toEqual(2);
    expect(wrapper.find('div.button').get(0).props.children).toEqual(
      'I WILL TRY LATER'
    );
    expect(wrapper.find('div.button').get(1).props.children).toEqual(
      'STAY HERE'
    );
  });

  it('should render RetryBackConfirmationModal in mobile', () => {
    const wrapper = mount(
      <RetryBackConfirmationModal
        mode="mobile"
        show={true}
        stayHere={() => {}}
        tryLater={() => {}}
      />
    );

    expect(wrapper.find('div.mobileModalContainer').length).toEqual(1);
    expect(wrapper.find('.modalHeader').text()).toEqual(
      "Don't want to pay now ?"
    );
    expect(wrapper.find('.modalDesc').text()).toEqual(
      'No worries, you can pay online using PayNow option from orders, till the order is out for delivery or you can pay at the time of delivery through Cash/UPI.'
    );
    expect(wrapper.find('div.button').length).toEqual(2);
    expect(wrapper.find('div.button').get(0).props.children).toEqual(
      'I WILL TRY LATER'
    );
    expect(wrapper.find('div.button').get(1).props.children).toEqual(
      'STAY HERE'
    );
  });

  it('tryLater should work properly', () => {
    const stayHere = sinon.spy();
    const tryLater = sinon.spy();
    const wrapper = mount(
      <RetryBackConfirmationModal
        mode="mobile"
        show={true}
        stayHere={stayHere}
        tryLater={tryLater}
      />
    );

    wrapper
      .find('div.button')
      .at(0)
      .simulate('click');
    expect(tryLater).toHaveProperty('callCount', 1);
  });
});
