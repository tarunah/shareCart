import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { mount } from 'enzyme';
import GiftWrapForm from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('GiftWrap Form', () => {
  window.triggerEvent = () => {};
  window.SHELL = { setActivePage: () => {} };

  it('should show Recipient Name field', () => {
    let wrapper = mount(<GiftWrapForm />);

    expect(wrapper.find('input[id="recipientName"]').length).to.equal(1);
    wrapper
      .find('input[id="recipientName"]')
      .simulate('change', { target: { id: 'recipientName', value: 'aaa' } });
    expect(wrapper.find('input[id="recipientName"]').props().value).to.equal(
      'aaa'
    );
  });

  it('should show Message field', () => {
    let wrapper = mount(<GiftWrapForm />);

    expect(wrapper.find('textarea[id="message"]').length).to.equal(1);
    wrapper
      .find('textarea[id="message"]')
      .simulate('change', { target: { id: 'message', value: 'bbb' } });
    expect(wrapper.find('textarea[id="message"]').props().value).to.equal(
      'bbb'
    );
  });

  it('should show Sender Name field', () => {
    let wrapper = mount(<GiftWrapForm />);

    expect(wrapper.find('input[id="senderName"]').length).to.equal(1);
    wrapper
      .find('input[id="senderName"]')
      .simulate('change', { target: { id: 'senderName', value: 'ccc' } });
    expect(wrapper.find('input[id="senderName"]').props().value).to.equal(
      'ccc'
    );
  });

  it('should show apply button and it should validate', () => {
    const handleCartAction = sinon.spy();
    render(<GiftWrapForm handleCartAction={handleCartAction} />);

    expect(screen.getByRole('button').textContent).to.equal('APPLY GIFT WRAP');
    screen.getByTestId('gw-senderName');
    userEvent.type(screen.getByTestId('gw-senderName'), 'ccc');

    userEvent.click(screen.getByRole('button'));

    screen.getByTestId('gw-error-input');
    screen.getByTestId('gw-error-text');

    userEvent.type(screen.getByTestId('gw-recipientName'), 'ccc');
    userEvent.type(screen.getByTestId('gw-message'), 'ccc');

    userEvent.click(screen.getByRole('button'));

    expect(handleCartAction).to.have.property('callCount', 1);
  });
});
