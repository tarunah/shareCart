import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import sinon from 'sinon';

import { BrowserRouter as Router } from 'react-router-dom';
import AddressList from './AddressList';
import AddressListWithContext from '.';
import { AddressBlock } from '../AddressBlocks';
import * as commonBrowserUtils from 'commonBrowserUtils/Helper';
import addressData from 'testUtils/addressMockData';
import cartData from 'testUtils/serviceabilityMockData';
import { CheckoutProvider } from '@context/CheckoutContext';

describe('Address List for mobile', () => {
  let handleAddressAction;
  let handleCartAction;
  let setToContainerState;

  beforeEach(() => {
    window.triggerEvent = () => {};
    window.SHELL = {
      setActivePage: () => {}
    };
    window.scroll = sinon.spy();
    handleAddressAction = sinon.spy();
    handleCartAction = sinon.spy();
    setToContainerState = sinon.spy();
  });

  it('should show header', () => {
    const wrapper = shallow(
      <AddressList
        addressData={addressData}
        selectedAddressId={6140886}
        cartData={cartData}
        handleAddressAction={handleAddressAction}
        setToContainerState={setToContainerState}
      />
    );
    expect(wrapper.find('.title')).to.have.lengthOf(2);
  });

  it('should have 2 address blocks', () => {
    const wrapper = shallow(
      <AddressList
        addressData={addressData}
        selectedAddressId={6140886}
        cartData={cartData}
        handleAddressAction={handleAddressAction}
        setToContainerState={setToContainerState}
      />
    );
    expect(wrapper.find(AddressBlock)).to.have.lengthOf(2);
  });

  it('should call handleAddressAction', () => {
    const wrapper = shallow(
      <AddressList
        addressData={addressData}
        selectedAddressId={6140886}
        cartData={cartData}
        handleAddressAction={handleAddressAction}
        handleCartAction={handleCartAction}
        setToContainerState={setToContainerState}
      />
    );
    wrapper.instance().onClickHandler({
      target: {
        getAttribute() {
          return '';
        }
      },
      currentTarget: { id: 234 }
    });
    expect(wrapper.state().selectedAddressId).to.equal(6140886);
  });

  it('should call successCallback', () => {
    const successCallback = sinon.spy();
    const wrapper = shallow(
      <AddressList
        addressData={addressData}
        selectedAddressId={6140886}
        cartData={cartData}
        handleAddressAction={handleAddressAction}
        successCallback={successCallback}
        setToContainerState={setToContainerState}
      />
    );
    wrapper.instance().setState({ selectedAddressId: 6140886 });
    wrapper.instance().onClickConfirmHandler();
    expect(setToContainerState).to.have.property('callCount', 2);
  });

  it('should redirect to add address page', () => {
    const push = sinon.spy();
    const wrapper = shallow(
      <AddressList
        addressData={[]}
        cartData={cartData}
        selectedAddressId={6140886}
        handleAddressAction={handleAddressAction}
        history={{ push }}
        setToContainerState={setToContainerState}
      />
    );
    expect(push).to.have.property('callCount', 1);
  });

  it('should disable button for invalid address', () => {
    const address = addressData[1];
    address.score = 'Invalid';

    const wrapper = mount(
      <Router>
        <AddressList
          addressData={[address]}
          cartData={cartData}
          handleAddressAction={handleAddressAction}
          selectedAddressId={6140886}
          setToContainerState={setToContainerState}
        />
      </Router>
    );

    expect(wrapper.find('div.stickyButton').text()).to.equal(
      'Please choose another address'
    );
  });

  describe('AocV2 variant3', () => {
    it('if no address is present, should navigate to payments page on click on confirm', () => {
      window._checkout_ = {
        __myx_deviceData__: { isApp: true, isMobile: true },
        __myx_ab__: { 'cart.addressoncartv2': 'variant3' },
        __myx_features__: { 'checkout.addressOnCartV2.enabled': true }
      };

      const spyFunc = sinon.spy();
      handleAddressAction = sinon.spy((action, data, scb, ecb) => scb());
      handleCartAction = sinon.spy((action, data, scb, ecb) => scb());
      setToContainerState = sinon.spy((obj, cb) => {
        cb && cb();
      });
      addressData[1].score = 'VALID';
      const navigateTo = sinon.spy();
      commonBrowserUtils.navigateTo = navigateTo;

      render(
        <Router>
          <CheckoutProvider>
            <AddressListWithContext
              addressData={addressData}
              cartData={cartData}
              handleAddressAction={handleAddressAction}
              setToContainerState={setToContainerState}
              handleCartAction={handleCartAction}
              successCallback={spyFunc}
            />
          </CheckoutProvider>
        </Router>
      );
      userEvent.click(screen.getByText('sdfsf sdfdfs'));

      userEvent.click(screen.getByText('CONFIRM'));
      expect(navigateTo.calledOnce).equal(true);
    });
  });
});
