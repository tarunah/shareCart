import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AddressStrip from './';

import addressData from 'testUtils/addressMockData';

describe('Address on Cart', () => {
  let handleAddressAction,
    updateUserSelectedLocation,
    handleAddAddressAction,
    history;
  window.triggerEvent = () => {};

  beforeEach(() => {
    handleAddressAction = sinon.spy();
    updateUserSelectedLocation = sinon.spy();
    handleAddAddressAction = sinon.spy();
    history = {
      goBack: sinon.spy(),
      push: sinon.spy()
    };
    document.cookie = 'ilgim=true';
  });

  it('should render the AddressStrip for desktop', () => {
    const wrapper = mount(<AddressStrip mode="desktop" />);
    expect(wrapper.find('.desktopContainer')).toHaveLength(1);
  });

  it('should render the AddressStrip for mobile', () => {
    const wrapper = mount(<AddressStrip mode="mobile" />);
    expect(wrapper.find('.mobileContainer')).toHaveLength(1);
  });

  it('should call handleAddressAction', async () => {
    render(<AddressStrip handleAddressAction={handleAddressAction} />);
    screen.getByText('Check delivery time & services');
    expect(screen.getByRole('button').textContent).toEqual('ENTER PIN CODE');
    userEvent.click(screen.getByRole('button'));
    expect(handleAddressAction).toHaveProperty('callCount', 1);
  });

  it('should open modal for checkdelivery', async () => {
    render(
      <AddressStrip
        addressData={addressData}
        handleAddressAction={handleAddressAction}
      />
    );
    userEvent.click(screen.getByRole('button'));
    await screen.findByRole('dialog');

    screen.getByText('CHECK');
  });

  it('should render addressInfo', () => {
    render(
      <AddressStrip
        addressData={addressData}
        addressInfo={addressData[0]}
        pincode="560068"
        handleAddressAction={handleAddressAction}
      />
    );
    screen.getByText('asdas sadad');
  });

  it('should open modal for Add Address', async () => {
    render(
      <AddressStrip
        mode="desktop"
        addressData={addressData}
        handleAddressAction={handleAddressAction}
      />
    );
    userEvent.click(screen.getByRole('button'));
    await screen.findByRole('dialog');
    userEvent.click(screen.getByText('Add New Address'));
    screen.getByText('CONTACT DETAILS');
  });

  it('should call hideModal', async () => {
    render(
      <AddressStrip
        addressData={addressData}
        handleAddressAction={handleAddressAction}
        history={history}
        mode="mobile"
      />
    );
    userEvent.click(screen.getByRole('button'));
    await screen.findByRole('dialog');
    userEvent.click(screen.getByTestId('modal-close'));
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
