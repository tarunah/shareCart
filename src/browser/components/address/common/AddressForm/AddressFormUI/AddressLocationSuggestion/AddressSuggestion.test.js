import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';

import AddressManager from 'commonBrowserUtils/AddressManager';

import AddressLocationButton from './index';

const LAT_LONG = { latitude: '123', longitude: '23' };
const SUGGESTION_RES = {
  pincodeSourced: {
    pincode: '600122',
    state: { code: 'TN', name: 'TAMILNADU' },
    city: 'Chennai',
    localities: []
  },
  geoSourced: {
    pincode: '600122',
    latitude: '13.037580',
    longitude: '80.113997',
    localities: ['Kamatchi Amman Nagar, Mangadu']
  }
};

describe('Address suggestion UI', () => {
  delete window.navigator;
  window.triggerEvent = () => {};

  it('should display the Address location button with use my location text', () => {
    window.navigator = { geolocation: { getCurrentPosition: () => {} } };
    const wrapper = mount(<AddressLocationButton />);

    expect(wrapper.find('div').text()).toEqual(' USE MY LOCATION');
  });

  it('on click of use my location should call window.navigator,', () => {
    const getCurrentPosition = sinon.spy(() => {});
    window.navigator = { geolocation: { getCurrentPosition } };
    const wrapper = mount(<AddressLocationButton />);

    expect(wrapper.find('div').text()).toEqual(' USE MY LOCATION');
    wrapper.find('div').simulate('click');

    expect(getCurrentPosition.calledOnce).toEqual(true);
  });

  it('on user denying error should show a shell alert', () => {
    const getCurrentPosition = sinon.spy((scb, ecb, _) => {
      ecb({ code: 3 });
    });
    const alert = sinon.spy();

    window.navigator = { geolocation: { getCurrentPosition } };
    window.SHELL = { alert };

    const wrapper = mount(<AddressLocationButton />);

    expect(wrapper.find('div').text()).toEqual(' USE MY LOCATION');
    wrapper.find('div').simulate('click');

    expect(getCurrentPosition.calledOnce).toEqual(true);
    expect(alert.args[0][1].message).toEqual(
      'Something went wrong, please try again.'
    );
  });

  it('on user proving the location permission should call getAddressSuggestion and set loader to true', () => {
    const getCurrentPosition = sinon.spy((scb, ecb, _) => {
      scb({ coords: LAT_LONG });
    });
    const getAddressSuggestion = sinon.spy();

    window.navigator = { geolocation: { getCurrentPosition } };
    AddressManager.getAddressSuggestion = getAddressSuggestion;

    const wrapper = mount(<AddressLocationButton />);

    expect(wrapper.state('loading')).toEqual(false);
    expect(wrapper.find('div').text()).toEqual(' USE MY LOCATION');
    wrapper.find('div').simulate('click');

    expect(getAddressSuggestion.calledOnce).toEqual(true);
    expect(wrapper.state('loading')).toEqual(true);
    expect(getAddressSuggestion.args[0][0]).toEqual(LAT_LONG);
  });

  it('on address suggestion error, should show an alert and set loader to false', () => {
    const getAddressSuggestion = sinon.spy((_, scb, ecb) => {
      ecb();
    });
    const alert = sinon.spy();

    window.SHELL = { alert };
    AddressManager.getAddressSuggestion = getAddressSuggestion;

    const wrapper = mount(<AddressLocationButton />);

    wrapper.setState({ loading: true });
    wrapper.instance().getAddressSuggestion({ coords: LAT_LONG });

    expect(wrapper.state('loading')).toEqual(false);
    expect(alert.args[0][1].message).toEqual(
      'Location can not be detected for your place.'
    );
  });

  describe('address suggestion success', () => {
    describe('Resp with one geo location (locality)', () => {
      beforeEach(() => {
        SUGGESTION_RES.pincodeSourced.localities = [];
      });

      it('on address  success, should show the address popup with one location only, set loader to false and display button should be enabled', () => {
        const getAddressSuggestion = sinon.spy((_, scb, ecb) => {
          scb(SUGGESTION_RES);
        });
        AddressManager.getAddressSuggestion = getAddressSuggestion;

        const wrapper = mount(<AddressLocationButton />);

        wrapper.setState({ loading: true });
        wrapper.instance().getAddressSuggestion({ coords: LAT_LONG });
        wrapper.update();

        expect(wrapper.state('loading')).toEqual(false);

        const AddressSuggestionHalfCard = wrapper.find(
          'AddressSuggestionHalfCard'
        );
        expect(AddressSuggestionHalfCard.exists()).toEqual(true);

        //title
        expect(
          AddressSuggestionHalfCard.find('.locationDetailTitle').text()
        ).toEqual('Current location details');

        //Address
        expect(AddressSuggestionHalfCard.find('Address').text()).toEqual(
          'Kamatchi Amman Nagar, MangaduChennai, TAMILNADU. 600122'
        );

        //User instruction
        expect(
          AddressSuggestionHalfCard.find('.userInstruction').text()
        ).toEqual('You can edit or add details later');

        //Add location button
        expect(AddressSuggestionHalfCard.find('ButtonV2').text()).toEqual(
          'ADD LOCATION DETAILS'
        );
      });

      it('in AddressSuggesstionHalfcard with only one geolocation, add location should call setLocalityDetails and show an alert', () => {
        const getAddressSuggestion = sinon.spy((_, scb, ecb) => {
          scb(SUGGESTION_RES);
        });
        const setLocalityDetails = sinon.spy();
        const alert = sinon.spy();
        window.SHELL = { alert };
        AddressManager.getAddressSuggestion = getAddressSuggestion;

        const wrapper = mount(
          <AddressLocationButton setLocalityDetails={setLocalityDetails} />
        );

        wrapper.setState({ loading: true });
        wrapper.instance().getAddressSuggestion({ coords: LAT_LONG });
        wrapper.update();

        expect(wrapper.state('loading')).toEqual(false);

        const AddressSuggestionHalfCard = wrapper.find(
          'AddressSuggestionHalfCard'
        );
        expect(AddressSuggestionHalfCard.exists()).toEqual(true);

        //title
        expect(
          AddressSuggestionHalfCard.find('.locationDetailTitle').text()
        ).toEqual('Current location details');

        //Address
        expect(AddressSuggestionHalfCard.find('Address').text()).toEqual(
          'Kamatchi Amman Nagar, MangaduChennai, TAMILNADU. 600122'
        );

        //User instruction
        expect(
          AddressSuggestionHalfCard.find('.userInstruction').text()
        ).toEqual('You can edit or add details later');

        //Add location button
        expect(AddressSuggestionHalfCard.find('ButtonV2').text()).toEqual(
          'ADD LOCATION DETAILS'
        );

        AddressSuggestionHalfCard.find('ButtonV2 .button').simulate('click');

        expect(setLocalityDetails.calledOnce).toEqual(true);
        expect(setLocalityDetails.args[0][0]).toEqual({
          city: 'Chennai',
          locality: 'Kamatchi Amman Nagar, Mangadu',
          pincode: '600122',
          state: { code: 'TN', name: 'TAMILNADU' }
        });

        expect(alert.args[0][1].message).toEqual(
          'Location details added, you can edit and add details and complete the address.'
        );
      });

      it('in AddressSuggesstionHalfcard with only one geolocation and close button should call setLocalityDetails', () => {
        const getAddressSuggestion = sinon.spy((_, scb, ecb) => {
          scb(SUGGESTION_RES);
        });
        const setLocalityDetails = sinon.spy();
        const alert = sinon.spy();
        window.SHELL = { alert };
        AddressManager.getAddressSuggestion = getAddressSuggestion;

        const wrapper = mount(
          <AddressLocationButton setLocalityDetails={setLocalityDetails} />
        );

        wrapper.setState({ loading: true });
        wrapper.instance().getAddressSuggestion({ coords: LAT_LONG });
        wrapper.update();

        expect(wrapper.state('loading')).toEqual(false);

        const Modal = wrapper.find('Modal');
        Modal.find('Close').simulate('click');

        expect(setLocalityDetails.calledOnce).toEqual(true);
        expect(setLocalityDetails.args[0][1]).toEqual([
          'Kamatchi Amman Nagar, Mangadu'
        ]);
      });

      it('on address success, should show the address popup with one location only, when SHOW_GEO_LOCATION_ONLY is on and has multiple locality', () => {
        window._checkout_ = {
          __myx_features__: {
            'checkout.address.suggestionGeoOnly': true
          }
        };

        SUGGESTION_RES.pincodeSourced.localities = [
          'Kondapur',
          'Kothaguda  (K.V.Rangareddy)'
        ];

        const getAddressSuggestion = sinon.spy((_, scb, ecb) => {
          scb(SUGGESTION_RES);
        });
        AddressManager.getAddressSuggestion = getAddressSuggestion;

        const wrapper = mount(<AddressLocationButton />);

        wrapper.setState({ loading: true });
        wrapper.instance().getAddressSuggestion({ coords: LAT_LONG });
        wrapper.update();

        expect(wrapper.state('loading')).toEqual(false);

        const AddressSuggestionHalfCard = wrapper.find(
          'AddressSuggestionHalfCard'
        );
        expect(AddressSuggestionHalfCard.exists()).toEqual(true);

        //title
        expect(
          AddressSuggestionHalfCard.find('.locationDetailTitle').text()
        ).toEqual('Current location details');

        //Address
        expect(AddressSuggestionHalfCard.find('Address').text()).toEqual(
          'Kamatchi Amman Nagar, MangaduChennai, TAMILNADU. 600122'
        );

        //User instruction
        expect(
          AddressSuggestionHalfCard.find('.userInstruction').text()
        ).toEqual('You can edit or add details later');

        //Add location button
        expect(AddressSuggestionHalfCard.find('ButtonV2').text()).toEqual(
          'ADD LOCATION DETAILS'
        );
      });
    });

    describe('Resp with Many geo location (locality) and SHOW_GEO_LOCATION_ONLY is off', () => {
      beforeEach(() => {
        window._checkout_ = {
          __myx_features__: {
            'checkout.address.suggestionGeoOnly': false
          }
        };
        SUGGESTION_RES.pincodeSourced.localities = [
          'Kondapur',
          'Kothaguda  (K.V.Rangareddy)'
        ];
      });

      it('on address  success, should show the address popup with one location only, set loader to false and display button should be enabled', () => {
        const getAddressSuggestion = sinon.spy((_, scb, ecb) => {
          scb(SUGGESTION_RES);
        });
        AddressManager.getAddressSuggestion = getAddressSuggestion;

        const wrapper = mount(<AddressLocationButton />);

        wrapper.setState({ loading: true });
        wrapper.instance().getAddressSuggestion({ coords: LAT_LONG });
        wrapper.update();

        expect(wrapper.state('loading')).toEqual(false);

        const AddressSuggestionHalfCard = wrapper.find(
          'AddressSuggestionHalfCard'
        );
        expect(AddressSuggestionHalfCard.exists()).toEqual(true);

        //title
        expect(
          AddressSuggestionHalfCard.find('.locationDetailTitle').text()
        ).toEqual('Current location details');

        //Address
        expect(AddressSuggestionHalfCard.find('AddressList').length).toEqual(1);
        expect(
          AddressSuggestionHalfCard.find('Address')
            .at(0)
            .text()
        ).toEqual('Kamatchi Amman Nagar, MangaduChennai, TAMILNADU. 600122');
        expect(
          AddressSuggestionHalfCard.find('Address')
            .at(1)
            .text()
        ).toEqual('KondapurChennai, TAMILNADU. 600122');
        expect(
          AddressSuggestionHalfCard.find('Address')
            .at(2)
            .text()
        ).toEqual('Kothaguda  (K.V.Rangareddy)Chennai, TAMILNADU. 600122');

        //No Address is selected
        expect(AddressSuggestionHalfCard.find('RadioActive').exists()).toEqual(
          false
        );

        //User instruction
        expect(
          AddressSuggestionHalfCard.find('.userInstruction').text()
        ).toEqual('You can edit or add details later');

        //Add location button
        expect(AddressSuggestionHalfCard.find('ButtonV2').text()).toEqual(
          'ADD LOCATION DETAILS'
        );
      });

      it('in AddressSuggesstionHalfcard after the address is selected, add location should call setLocalityDetails and show an alert', () => {
        const getAddressSuggestion = sinon.spy((_, scb, ecb) => {
          scb(SUGGESTION_RES);
        });
        const setLocalityDetails = sinon.spy();
        const alert = sinon.spy();
        window.SHELL = { alert };
        AddressManager.getAddressSuggestion = getAddressSuggestion;

        const wrapper = mount(
          <AddressLocationButton setLocalityDetails={setLocalityDetails} />
        );

        wrapper.setState({ loading: true });
        wrapper.instance().getAddressSuggestion({ coords: LAT_LONG });
        wrapper.update();

        expect(wrapper.state('loading')).toEqual(false);

        expect(wrapper.find('AddressSuggestionHalfCard').exists()).toEqual(
          true
        );

        //title
        expect(
          wrapper.find('AddressSuggestionHalfCard .locationDetailTitle').text()
        ).toEqual('Current location details');

        //click on second address
        wrapper
          .find('AddressSuggestionHalfCard Address')
          .at(1)
          .simulate('click');
        expect(
          wrapper.find('AddressSuggestionHalfCard RadioActive').exists()
        ).toEqual(true);

        //Add location button
        expect(
          wrapper.find('AddressSuggestionHalfCard ButtonV2').text()
        ).toEqual('ADD LOCATION DETAILS');
        wrapper
          .find('AddressSuggestionHalfCard')
          .find('ButtonV2 .button')
          .simulate('click');

        expect(setLocalityDetails.calledOnce).toEqual(true);
        expect(setLocalityDetails.args[0][0]).toEqual({
          city: 'Chennai',
          locality: 'Kondapur',
          pincode: '600122',
          state: { code: 'TN', name: 'TAMILNADU' }
        });

        expect(alert.args[0][1].message).toEqual(
          'Location details added, you can edit and add details and complete the address.'
        );
      });
    });
  });
});
