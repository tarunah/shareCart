import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import PlaceOrderContainer from './';

describe('Place Order Container', () => {
  it('should toggle state showPCModal', () => {
    let wrapper = mount(
      <PlaceOrderContainer
        render={() => {
          return null;
        }}
      />
    );
    wrapper.instance().togglePCModal();
    expect(wrapper.state().showPCModal).to.equal(true);
  });

  it('should toggle state pcDisplay', () => {
    let wrapper = mount(
      <PlaceOrderContainer
        render={() => {
          return null;
        }}
      />
    );
    wrapper.instance().togglePCModalDisplay();
    expect(wrapper.state().pcDisplay).to.equal(false);
  });

  it('should call handleCartAction', () => {
    const handleCartAction = sinon.spy();
    let wrapper = mount(
      <PlaceOrderContainer
        render={() => {
          return null;
        }}
        handleCartAction={handleCartAction}
      />
    );
    wrapper.instance().onPCConfirm();
    wrapper.instance().onPCAgreeCheck();
    expect(handleCartAction).to.have.property('callCount', 2);
  });
});
