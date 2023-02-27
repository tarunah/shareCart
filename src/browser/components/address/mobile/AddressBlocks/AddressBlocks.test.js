import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { BrowserRouter as Router } from 'react-router-dom';
import { AddressBlock, SelectedAddressBlock, AddAddressBlock } from '.';
import AddressDetails from 'commonComp/AddressDetails';

import addressData from 'testUtils/addressMockData';

describe('Address Block for mobile', () => {
  let onClickHandler;

  beforeEach(() => {
    window.triggerEvent = () => {};
    onClickHandler = sinon.spy();
  });

  it('should show remove and edit button when selected', () => {
    const wrapper = mount(
      <Router>
        <AddressBlock
          addressInfo={addressData[0]}
          selected={true}
          serviceable={true}
          onClickHandler={onClickHandler}
        />
      </Router>
    );
    expect(wrapper.find('.remove').text()).to.equal('Remove');
    expect(wrapper.text()).to.contain('Edit');
    expect(wrapper.find('.serviceable')).to.have.lengthOf(1);

    wrapper.find('.block .btns a.edit').simulate('click');
  });

  it('should not show remove and edit button', () => {
    const wrapper = mount(
      <Router>
        <AddressBlock
          addressInfo={addressData[0]}
          onClickHandler={onClickHandler}
        />
      </Router>
    );
    expect(wrapper.find('.remove')).to.have.lengthOf(0);
    expect(wrapper.find('.edit')).to.have.lengthOf(0);
  });

  it('should have prop minimize true', () => {
    const wrapper = mount(
      <Router>
        <AddressBlock
          addressInfo={addressData[0]}
          onClickHandler={onClickHandler}
        />
      </Router>
    );
    expect(wrapper.find(AddressDetails).props().minimize).to.equal(true);
  });

  it('should show error for invalid address', () => {
    const addressInfo = addressData[1];

    const wrapper = mount(
      <Router>
        <AddressBlock
          addressInfo={addressInfo}
          serviceable={true}
          selected={true}
          onClickHandler={onClickHandler}
        />
      </Router>
    );

    expect(wrapper.find('div.error').text()).to.equal(
      'Please add house, street and locality details to improve your address or ensure mobile number is valid, before proceeding further.'
    );

    expect(wrapper.find('.notServiceable')).to.have.lengthOf(2);
  });

  it('should show error for unserviceable address', () => {
    const addressInfo = addressData[0];

    const wrapper = mount(
      <Router>
        <AddressBlock
          addressInfo={addressInfo}
          serviceable={false}
          selected={true}
          onClickHandler={onClickHandler}
        />
      </Router>
    );

    expect(wrapper.find('div.error').text()).to.equal(
      'Sorry! This order cannot be delivered to this pin code.'
    );
  });

  it('should show change or add address button', () => {
    const wrapper = mount(
      <Router>
        <SelectedAddressBlock addressInfo={addressData[0]} />
      </Router>
    );
    expect(wrapper.text()).to.contain('CHANGE OR ADD ADDRESS');
    wrapper.find('.finalAddress a.changeOrAddBtn').simulate('click');
  });

  it('should show add new address button', () => {
    const wrapper = mount(
      <Router>
        <AddAddressBlock />
      </Router>
    );
    expect(wrapper.text()).to.contain('Add New Address');
    wrapper.find('a.addBlockAnchor').simulate('click');
  });
});
