import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import GiftWrapHandler from './';

describe('GiftWrap Handler', () => {
  window.triggerEvent = () => {};
  it('should set state giftWrapApplied to true and invoke goBack to move to cart on success', () => {
    let goBackSpy = sinon.spy();
    let wrapper = mount(
      <GiftWrapHandler
        render={() => {
          return null;
        }}
        goBack={goBackSpy}
      />
    );
    wrapper.instance().onSuccess();
    expect(wrapper.state().giftWrapApplied).to.equal(true);
    expect(goBackSpy).to.have.property('callCount', 1);
  });

  it('should set state error on service failure', () => {
    let wrapper = mount(
      <GiftWrapHandler
        render={() => {
          return null;
        }}
      />
    );
    wrapper.instance().onError({});
    expect(wrapper.state().error).to.equal('Ooops, Something went wrong');
  });

  it('should set state on input', () => {
    let wrapper = mount(
      <GiftWrapHandler
        render={() => {
          return null;
        }}
      />
    );
    wrapper
      .instance()
      .setValue({ target: { id: 'recipientName', value: 'xyz' } });
    expect(wrapper.state().recipientName.value).to.equal('xyz');
  });

  it('should call handleCartAction', () => {
    const handleCartAction = sinon.spy();
    let wrapper = mount(
      <GiftWrapHandler
        render={() => {
          return null;
        }}
        handleCartAction={handleCartAction}
      />
    );
    wrapper.setState({
      recipientName: { value: 'sda' },
      message: { value: 'sda' },
      senderName: { value: 'sda' }
    });
    wrapper.instance().applyGiftwrap();
    expect(handleCartAction).to.have.property('callCount', 1);
  });

  it('should show error on applying if field is empty', () => {
    let wrapper = mount(
      <GiftWrapHandler
        render={() => {
          return null;
        }}
      />
    );
    wrapper.instance().applyGiftwrap();
    expect(wrapper.state().recipientName.errorMessage).to.equal(
      'Please enter a name'
    );
  });
});
