import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import AddressStrip from './';
import CheckDelivery from './CheckDeliveryModalV2';

import addressData from 'testUtils/addressMockData';

jest.mock('commonBrowserUtils/AddressManager', () => ({
  ...jest.requireActual('commonBrowserUtils/AddressManager'),
  getLocallity: () => {}
}));

describe('AocV2', () => {
  let handleAddressAction,
    updateUserSelectedLocation,
    handleAddAddressAction,
    history;
  window.triggerEvent = () => {};

  beforeEach(() => {
    handleAddressAction = sinon.spy();
    updateUserSelectedLocation = sinon.spy();
    handleAddAddressAction = sinon.spy();
    window.ckrrhistory = {
      push: hash => {
        window.location.hash = hash;
      },
      replace: hash => {
        window.location.hash = hash;
      },
      goBack: sinon.spy()
    };
    history = {
      goBack: sinon.spy(),
      push: sinon.spy()
    };
    document.cookie = 'ilgim=true';
  });

  afterAll(() => {
    jest.clearAllMocks();
  })

  describe('desktop', () => {
    it('should render the AddressStrip for desktop', () => {
      const wrapper = mount(<AddressStrip mode="desktop" handleAddressAction={handleAddressAction} />);

      expect(wrapper.find('.desktopContainer')).toHaveLength(2);
    });

    it('should open modal for Add Address', () => {
      const wrapper = mount(
        <AddressStrip
          mode="desktop"
          addressData={addressData}
          handleAddressAction={handleAddressAction}
        />
      );
      wrapper.find('.changeBtn').simulate('click');
      wrapper.find('.addBlockAnchor').simulate('click');
      expect(wrapper.state().modalType).toEqual('addaddressmodal');
    });

    it('should open edit address form in the same modal on click of edit', () => {
      render(
        <AddressStrip
          mode="desktop"
          addressData={addressData}
          handleAddressAction={handleAddressAction}
        />
      );

      userEvent.click(screen.getByText('ENTER PIN CODE'));
      userEvent.click(screen.getByText(addressData[0].user.name));
      userEvent.click(screen.getByText('EDIT'));

      expect(
        screen.queryByDisplayValue(addressData[0].user.name)
      ).toBeInTheDocument();
      expect(
        screen.queryByDisplayValue(addressData[0].user.mobile)
      ).toBeInTheDocument();
      expect(
        screen.queryByDisplayValue(addressData[0].pincode)
      ).toBeInTheDocument();
      expect(
        screen.queryByDisplayValue(addressData[0].streetAddress)
      ).toBeInTheDocument();
      expect(
        screen.queryByDisplayValue(addressData[0].locality)
      ).toBeInTheDocument();
      expect(
        screen.queryByDisplayValue(addressData[0].city)
      ).toBeInTheDocument();
      expect(screen.queryByText('SAVE ADDRESS')).toBeInTheDocument();
    });
  });

  describe('mobile', () => {
    it('should render the AddressStrip for mobile', () => {
      const wrapper = mount(<AddressStrip mode="mobile" handleAddressAction={handleAddressAction} />);
      expect(wrapper.find('.mobileContainer')).toHaveLength(2);
    });

    it('should open page for Add Address', () => {
      const wrapper = mount(
        <AddressStrip
          addressData={addressData}
          handleAddressAction={handleAddressAction}
          history={history}
          mode="mobile"
        />
      );
      wrapper.find('.changeBtn').simulate('click');
      wrapper.find('.addBlockAnchor').simulate('click');
      expect(history.goBack.called).toEqual(true);
      setTimeout(() => {
        expect(history.push.called).toEqual(true);
      }, 100);
    });

    it('should open edit address form in the same modal on click of edit', () => {
      render(
        <AddressStrip
          mode="mobile"
          addressData={addressData}
          handleAddressAction={handleAddressAction}
        />
      );

      userEvent.click(screen.getByText('ENTER PIN CODE'));
      userEvent.click(screen.getByText(addressData[0].user.name));
      userEvent.click(screen.getByText('EDIT'));
      setTimeout(() => {
        expect(ckrrhistory.push.called).toEqual(true);
      }, 100);
    });
  });

  it('should call handleAddressAction', async () => {
    let wrapper = mount(
      <AddressStrip handleAddressAction={handleAddressAction} />
    );
    expect(wrapper.find('.highlight').text()).toEqual(
      'Check delivery time & services'
    );
    expect(wrapper.find('.changeBtn').text()).toEqual('ENTER PIN CODE');
    wrapper.find('.changeBtn').simulate('click');
    expect(handleAddressAction.called).toEqual(true);

    await new Promise((res, rej) => {
      handleAddressAction = () => res({});
      wrapper = mount(
        <AddressStrip handleAddressAction={handleAddressAction} />
      );
      wrapper.find('.changeBtn').simulate('click');
    });
    expect(wrapper.state().isModalOpen).toEqual(true);

    document.cookie = 'ilgim=false';
    wrapper = mount(<AddressStrip handleAddressAction={handleAddressAction} />);
    wrapper.find('.changeBtn').simulate('click');
    expect(wrapper.state().isModalOpen).toEqual(true);
  });

  it('should open the modal even when there is some network error', async () => {
    let wrapper;
    try {
      await new Promise((res, rej) => {
        handleAddressAction = () => rej();
        wrapper = mount(
          <AddressStrip handleAddressAction={handleAddressAction} />
        );
        wrapper.find('.changeBtn').simulate('click');
      });
    } catch (err) {
      expect(wrapper.state().isModalOpen).toEqual(true);
    }
  });

  it('should open modal for checkdelivery', () => {
    const wrapper = mount(
      <AddressStrip
        addressData={addressData}
        handleAddressAction={handleAddressAction}
      />
    );
    wrapper.find('.changeBtn').simulate('click');
    expect(wrapper.state().isModalOpen).toEqual(true);
    expect(wrapper.state().modalType).toEqual('checkdelivery');
    expect(wrapper.find(CheckDelivery)).toHaveLength(1);
    expect(wrapper.find('.mobileModalContainer')).toHaveLength(2);
  });

  it('should render addressInfo', () => {
    const wrapper = mount(
      <AddressStrip
        addressData={addressData}
        addressInfo={addressData[0]}
        pincode="560068"
        handleAddressAction={handleAddressAction}
      />
    );
    expect(wrapper.find('.title').text()).toContain('asdas sadad');
  });

  it('should call hideModal', () => {
    const wrapper = mount(
      <AddressStrip
        addressData={addressData}
        handleAddressAction={handleAddressAction}
        history={history}
        mode="mobile"
      />
    );
    wrapper.find('.changeBtn').simulate('click');
    wrapper.instance().hideModal();
    expect(wrapper.state().isModalOpen).toEqual(false);
    expect(wrapper.state().modalType).toEqual('');
  });
});
