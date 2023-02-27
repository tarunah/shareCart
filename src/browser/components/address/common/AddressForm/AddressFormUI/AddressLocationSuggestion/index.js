import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import AddressManager from 'commonBrowserUtils/AddressManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { getKVPairValue } from 'commonUtils/KVPairManager';

import { validateObject } from 'commonBrowserUtils/Helper';
import Modal from 'commonComp/Modal';
import Loader from 'commonComp/Loader';

import AddressSuggestionHalfCard from './AddressSuggestionHalfCard';

import Style from './addressSuggestion.css';

import LocationIcon from 'iconComp/Location.jsx';

const CUSTOM_ERROR_CODE = 4;

class AddressLocationSuggestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressSuggestion: {},
      selectedLocality: '',
      options: [],
      showAddressSuggestion: false,
      selectGeoSourcedLocality: false,
      loading: false
    };
    [
      'onButtonClick',
      'getAddressSuggestion',
      'selectLocality',
      'onAddressSuggestionSuccess',
      'onAddressSuggestionError',
      'closeModal',
      'onGeoLocationError',
      'confirmSelection'
    ].forEach(method => (this[method] = this[method].bind(this)));
  }

  selectLocality(e) {
    const selectedLocality = e;
    this.setState({ selectedLocality });
  }

  closeModal() {
    const { setLocalityDetails } = this.props;
    const { options } = this.state;
    setLocalityDetails({}, options);
    this.setState({ showAddressSuggestion: false });
  }

  showSnackBar(message) {
    const styleOverrides = {
      notifyMainDiv: 'bottom: 72px;',
      notifyTextDiv:
        'width: auto;min-height:40px;font-size:14px;text-align:left;font-weight:400'
    };
    SHELL.alert('info', { message, styleOverrides });
  }

  confirmSelection() {
    const { addressSuggestion, selectedLocality } = this.state;
    const { setLocalityDetails } = this.props;

    const state = get(addressSuggestion, 'pincodeSourced.state', {});
    const city = get(addressSuggestion, 'pincodeSourced.city', '');
    const pincode = get(addressSuggestion, 'pincodeSourced.pincode', '');

    triggerEvent('SUGGESTED_LOCALITY', {
      custom: {
        custom: {
          v1: selectedLocality,
          v2: pincode
        }
      }
    });
    const addressInfo = {
      state,
      city,
      locality: selectedLocality,
      pincode
    };
    setLocalityDetails && setLocalityDetails(addressInfo, []);
    this.setState({ showAddressSuggestion: false });
    this.showSnackBar(
      'Location details added, you can edit and add details and complete the address.'
    );
  }

  getAddressSuggestion(position) {
    const latitude = String(get(position, 'coords.latitude'), 0);
    const longitude = String(get(position, 'coords.longitude', 0));

    triggerEvent('USE_MY_LOCATION_ALLOWED');
    if (latitude == 0 || longitude == 0) {
      this.onGeoLocationError({ code: CUSTOM_ERROR_CODE });
    } else {
      AddressManager.getAddressSuggestion(
        { latitude, longitude },
        this.onAddressSuggestionSuccess,
        this.onAddressSuggestionError
      );
    }
  }

  onAddressSuggestionSuccess(res) {
    const { localities, ...mandotaryInfo } = get(res, 'pincodeSourced') || {};
    const selectGeoSourcedLocality =
      get(res, 'pincodeSourced.localities', []).length === 0 ||
      isFeatureEnabled('SHOW_GEO_LOCATION_ONLY');
    const options = [
      ...get(res, 'geoSourced.localities', []),
      ...get(res, 'pincodeSourced.localities', [])
    ];

    if (validateObject(mandotaryInfo) && options.length !== 0) {
      let selectedLocality = '';

      if (
        validateObject(get(res, 'geoSourced', null)) &&
        selectGeoSourcedLocality
      ) {
        selectedLocality = get(res, 'geoSourced.localities[0]', false);
      }

      this.setState({
        selectGeoSourcedLocality,
        selectedLocality,
        addressSuggestion: res,
        showAddressSuggestion: true,
        options,
        loading: false
      });
    } else {
      this.onAddressSuggestionError(res);
    }
  }

  onAddressSuggestionError(res) {
    triggerEvent('ADDRESS_SUGGESTION_ERROR', {
      custom: {
        custom: {
          v1: JSON.stringify(res)
        }
      }
    });
    this.setState({ loading: false }, () =>
      this.showSnackBar('Location can not be detected for your place.')
    );
  }

  onGeoLocationError(err) {
    this.setState({ loading: false }, () => {
      triggerEvent('USE_MY_LOCATION_DENIED', {
        custom: {
          custom: {
            v1: get(err, 'code', 'unknown error code')
          }
        }
      });

      const message =
        err.code === 1
          ? 'You denied the location permission. Location permission is required to detect your location.'
          : 'Something went wrong, please try again.';
      this.showSnackBar(message);
    });
  }

  onButtonClick() {
    const addressConfig = getKVPairValue('ADDRESS_SUGGESTION_CONFIG');
    const options = {
      enableHighAccuracy:
        get(addressConfig, 'enableHighAccuracy', '') === 'enabled',
      timeout: get(addressConfig, 'timeout', '') || 5000,
      maximumAge: get(addressConfig, 'maximumAge') || 3600000
    };

    triggerEvent('USE_MY_LOCATION_CLICK');

    this.setState({ loading: true });
    navigator.geolocation.getCurrentPosition(
      this.getAddressSuggestion,
      this.onGeoLocationError,
      options
    );
  }

  render() {
    const {
      showAddressSuggestion,
      addressSuggestion,
      selectedLocality,
      selectGeoSourcedLocality,
      options,
      loading
    } = this.state;

    const pincode = get(addressSuggestion, 'pincodeSourced.pincode');
    const city = get(addressSuggestion, 'pincodeSourced.city');
    const state = get(addressSuggestion, 'pincodeSourced.state.name');

    return (
      <React.Fragment>
        <div
          className={Style.useMyLocationButtonContainer}
          onClick={this.onButtonClick}
        >
          <LocationIcon className={Style.locationIcon} />
          <span> USE MY LOCATION</span>
        </div>
        {showAddressSuggestion && (
          <Modal
            cancelCallback={this.closeModal}
            className={Style.modal}
            cancelIconConfig={{ show: true, className: Style.modalCloseIcon }}
            halfCard={true}
          >
            <AddressSuggestionHalfCard
              confirmSelection={this.confirmSelection}
              selectLocality={this.selectLocality}
              selectedLocality={selectedLocality}
              showOneSuggestion={selectGeoSourcedLocality}
              options={options}
              pincode={pincode}
              city={city}
              state={state}
            />
          </Modal>
        )}
        <Loader backdrop={true} show={loading} />
      </React.Fragment>
    );
  }
}

AddressLocationSuggestion.propTypes = {
  setLocalityDetails: PropTypes.func.isRequired
};

export default AddressLocationSuggestion;
