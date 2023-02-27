import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import GiftWrap from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('GiftWrap Block for desktop', () => {
  it('should display Gift Wrap block', () => {
    render(<GiftWrap />);
    screen.getByText('GIFTING & PERSONALISATION');
    const title = screen.getByText('Buying for a loved one?');
    expect(title.nextSibling.textContent).toEqual(
      'Gift wrap and personalised message on card, Only for 25'
    );
    expect(screen.getByRole('button').textContent).toEqual('ADD GIFT WRAP');
  });

  it('should set showModal state to true on clicking add giftwrap', async () => {
    render(<GiftWrap />);
    userEvent.click(screen.getByText('ADD GIFT WRAP'));
    await screen.findByRole('dialog');
  });

  it('should display gift wrap applied block', () => {
    const handleCartAction = sinon.spy();
    render(<GiftWrap active={true} handleCartAction={handleCartAction} />);

    const title = screen.getByText('Yay! Gift Wrapping applied');
    expect(title.nextSibling.textContent).toEqual(
      'Your order will be gift wrapped with your personalised message'
    );
    screen.getByText('EDIT MESSAGE');
    userEvent.click(screen.getByText('REMOVE'));
    expect(handleCartAction).toHaveProperty('callCount', 1);
  });

  it('should set showModal state to true on clicking edit message', async () => {
    render(<GiftWrap active={true} />);
    userEvent.click(screen.getByText('EDIT MESSAGE'));
    await screen.findByRole('dialog');
  });
});
