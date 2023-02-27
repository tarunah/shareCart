import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import ConfirmOrCancelModal from '.';

describe('Cart Modal', () => {
  it('should render the cart level modal', () => {
    const b1Callback = sinon.spy();
    const b2Callback = sinon.spy();
    let wrapper = mount(
      <ConfirmOrCancelModal
        showModal={true}
        modalConfig={{
          cancelIconConfig: { show: true }
        }}
        button1Config={{
          text: 'REMOVE',
          clickHandler: b1Callback
        }}
        button2Config={{
          text: 'MOVE TO WISHLIST',
          clickHandler: b2Callback
        }}
      >
        <div className={'removeDialogTitle'}>Remove Item</div>
        <div> Are you sure you want to remove Item(s).</div>
      </ConfirmOrCancelModal>
    );

    expect(wrapper.find('ConfirmOrCancelModal').exists()).toBe(true);
    expect(wrapper.find('.removeDialogTitle').text()).toEqual('Remove Item');
    expect(wrapper.find('ConfirmOrCancelModal').text()).toContain(
      'Are you sure you want to remove Item(s).'
    );

    wrapper
      .find('button')
      .at(0)
      .simulate('click');
    expect(b1Callback.calledOnce).toBe(true);

    wrapper
      .find('button')
      .at(1)
      .simulate('click');
    expect(b2Callback.calledOnce).toBe(true);
  });
});
