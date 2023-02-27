import React from 'react';
import PropTypes from 'prop-types';

import get from 'lodash/get';
import noop from 'lodash/noop';

// Utils
import AddressManager from 'commonBrowserUtils/AddressManager';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import UserLocationDetailsUtil from 'commonUtils/UserLocationDetailsUtil';
import {
  scrollIntoView,
  getProfileMobile,
  getUserFullName
} from 'commonBrowserUtils/Helper';

// Components
import AddressFormUI from './AddressFormUI';
import { getAbtest } from 'commonUtils/abtestManager';

const fieldRules = {
  name: {
    id: 'name',
    pattern: '^[a-zA-Z\\d\\s_\\.]+$',
    patternError: 'Only alphabets, digits, _ and . are allowed',
    maxLength: 255
  },
  mobile: {
    id: 'mobile',
    pattern: '^[6-9][0-9]+$',
    patternError: 'Please enter a valid 10 digit mobile number',
    minLength: 10,
    maxLength: 10
  },
  pincode: {
    id: 'pincode',
    pattern: '^[0-9]+$',
    patternError: 'Only numbers are allowed',
    minLength: 6,
    maxLength: 6
  },
  streetAddress: {
    id: 'streetAddress',
    pattern:
      "^[a-zA-Z\\’\\'\\;\\:\\°\\@\\_\\(\\)\\&\\d\\s\\-\\,\\#\\.\\+\\/]+$",
    patternError:
      "Special characters allowed are & / . ’ ( ) - , ' # ; : ° @ - _",
    maxLength: 255,
    error: 'Please enter address details'
  },
  locality: {
    id: 'locality',
    pattern:
      "^[a-zA-Z0-9\\'\\’\\;\\:\\°\\@\\_\\(\\)\\&\\d\\s\\-\\,\\#\\.\\+\\/]+$",
    patternError:
      "Special characters allowed are & / . ’ ( ) - , ' # ; : ° @ - _",
    maxLength: 255
  },
  city: {
    id: 'city'
  },
  addressType: {
    id: 'addressType',
    error: 'Please tag your address'
  },
  landmark: {
    id: 'landmark',
    pattern:
      "^[a-zA-Z\\’\\'\\;\\:\\°\\@\\_\\(\\)\\&\\d\\s\\-\\,\\#\\.\\+\\/]+$",
    patternError:
      "Special characters allowed are & / . ’ ( ) - , ' # ; : ° @ - _",
    maxLength: 255,
    optional: true
  }
};

class AddressForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addressInfo: this.deriveStateFromData(
        this.props.addressInfo || this.getProfileNamePhone()
      ),
      serviceabilityError: '',
      localityOptions: [],
      addressSuggestion: {},
      errorInfo: { id: '', message: '' },
      loading: false,
      socialProofingData: null
    };

    this.disableSaveAction = false;

    [
      'getLocality',
      'getPincodeValidity',
      'onLocalitySuccess',
      'onLocalityError',
      'onSocialProofingSuccess',
      'onServiceabilitySuccess',
      'saveHandler',
      'validationHandler',
      'onSaveSuccess',
      'setValue',
      'setAddressType',
      'onSaveError',
      'onError',
      'setLocalityDetails',
      'getServiceability',
      'getProfileNamePhone'
    ].forEach(method => (this[method] = this[method].bind(this)));
  }

  componentDidMount() {
    const { addressInfo } = this.props;
    const {
      addressInfo: { pincode }
    } = this.state;
    pincode && this.getLocality(pincode);
    if (addressInfo && addressInfo.id) {
      triggerEvent('EDIT_ADDRESS_INITIALIZE', {
        mynacoLabel: {
          id: addressInfo.id,
          name: addressInfo.user.name,
          pincode: addressInfo.pincode,
          address: addressInfo.streetAddress,
          locality: addressInfo.locality,
          landmark: addressInfo.landmark,
          city: addressInfo.city,
          state: addressInfo.state.name,
          stateCode: addressInfo.state.code,
          mobile: addressInfo.user.mobile,
          defaultAddress: addressInfo.isDefault,
          addressType: addressInfo.addressType,
          notAvailableDays: addressInfo.notAvailableDays
        }
      });
    } else {
      triggerEvent('ADD_ADDRESS_INITIALIZE');
    }
  }

  deriveStateFromData({
    user: { name, mobile, uidx: userId },
    state,
    country = { code: 'IN', name: 'India' },
    id,
    addressType = 'HOME',
    ...rest
  }) {
    if (isFeatureEnabled('ADDRESS_ON_CART_V2') && !id) {
      const { addressId, pincode } = UserLocationDetailsUtil.getLocation();
      if (!addressId) {
        rest.pincode = pincode;
      }
    }
    return {
      name,
      mobile,
      userId,
      state: state || {},
      country,
      id: id && `${id}`,
      addressType,
      ...rest
    };
  }

  getProfileNamePhone() {
    const { isNewUser = false } = this.props;
    const isAutoFillFgEnable = isFeatureEnabled(
      'FIRST_TIME_USER_ADDRESS_AUTOFILL'
    );
    if (isNewUser && isAutoFillFgEnable) {
      return {
        user: { name: getUserFullName(), mobile: getProfileMobile() }
      };
    }

    return { user: {} };
  }

  saveHandler() {
    if (this.disableSaveAction) {
      return;
    }
    this.disableSaveAction = true;
    this.validateAllFields(this.validationHandler);
  }

  validationHandler({ valid, errorInfo }) {
    if (valid) {
      const operation = this.state.addressInfo.id
        ? 'editAddress'
        : 'addAddress';
      this.props.handleAddressAction(
        operation,
        this.state.addressInfo,
        this.onSaveSuccess,
        this.onSaveError
      );
    } else {
      this.setState({ errorInfo });
      this.scrollIntoField(errorInfo.id);
      this.disableSaveAction = false;
    }
  }

  scrollIntoField(id) {
    const field = document.querySelector(`#${id}`);
    scrollIntoView(field, { behavior: 'smooth', block: 'center' });
  }

  validateField({
    id,
    maxLength,
    minLength,
    pattern,
    error,
    patternError,
    optional = false
  }) {
    const regExp = new RegExp(pattern, 'im');
    let value = this.state.addressInfo[id];
    let errorMessage;
    let valid = true;

    value = value || '';

    if ((!value || !value.trim()) && !optional) {
      errorMessage = error || 'This is a mandatory field';
      valid = false;
    } else if (value.length > maxLength) {
      errorMessage = 'Maximum length is ' + maxLength;
      valid = false;
    } else if (value.length < minLength) {
      errorMessage = 'Minimum length is ' + minLength;
      valid = false;
    } else if (value && !regExp.test(value)) {
      errorMessage = patternError || 'Invalid characters';
      valid = false;
    }

    return {
      valid,
      errorInfo: { id, message: errorMessage }
    };
  }

  validateAllFields(validationHandler) {
    for (const key in fieldRules) {
      const validationResult = this.validateField(fieldRules[key]);
      if (!validationResult.valid) {
        validationHandler(validationResult);
        return;
      }
    }
    validationHandler({ valid: true });
  }

  validateAddress(onSuccess, onError) {
    const data = { addressLine: this.state.addressInfo.streetAddress };

    AddressManager.validateAddress(data, onSuccess, onError);
  }

  onSaveSuccess(res) {
    triggerEvent(
      this.state.addressInfo.id
        ? 'EDIT_ADDRESS_SUCCESS'
        : 'ADD_ADDRESS_SUCCESS',
      {
        gaLabel: this.state.addressInfo.pincode,
        custom: {
          custom: {
            v1: get(this, 'state.addressInfo.streetAddress'),
            v2: get(this, 'state.addressInfo.locality'),
            v3: get(this, 'state.addressInfo.pincode'),
            v4: get(this, 'state.addressInfo.city')
          }
        }
      }
    );
    isFeatureEnabled('ADDRESS_LOCATION_SUGGESTION') &&
      triggerEvent('SAVED_LOCALITY', {
        custom: {
          custom: {
            v1: get(this, 'state.addressInfo.locality'),
            v2: get(this, 'state.addressInfo.pincode')
          }
        }
      });
    this.disableSaveAction = false;
    this.props.successCallback && this.props.successCallback();
  }

  onSaveError(err) {
    const errorCode = get(err, 'status', '');
    const errorMessage = get(err, 'message', '');
    const pincode = get(this, 'state.addressInfo.pincode', '');
    const userId = get(this, 'state.addressInfo.userId', '');
    triggerEvent(
      this.state.addressInfo.id
        ? 'EDIT_ADDRESS_FAILURE'
        : 'ADD_ADDRESS_FAILURE',
      {
        gaLabel: `${errorCode}|${pincode}|${userId}`,
        custom: {
          custom: {
            v1: `${errorCode}|${errorMessage}|${get(
              this,
              'state.addressInfo.streetAddress'
            )}`,
            v2: get(this, 'state.addressInfo.locality'),
            v3: pincode,
            v4: get(this, 'state.addressInfo.city')
          }
        }
      }
    );
    this.disableSaveAction = false;
  }

  onError(err) {
    triggerEvent('ADDRESS_ERROR', { gaLabel: err });
    this.setState({
      loading: false,
      serviceabilityError: 'Could not check the deliverability to this Pincode'
    });
  }

  getPincodeValidity(e) {
    const pincode = e.target.value;
    const id = e.target.id;
    const validationResult = this.validateField(fieldRules[id]);
    this.setState({
      localityOptions: [],
      serviceabilityError: '',
      addressInfo: {
        ...this.state.addressInfo,
        locality: '',
        city: '',
        state: ''
      }
    });
    if (pincode && validationResult.valid) {
      this.setState(prevState =>
        prevState.errorInfo.id === 'pincode'
          ? {
              errorInfo: { id: '', message: '' },
              loading: true
            }
          : {
              loading: true
            }
      );
      this.getLocality(pincode);
    } else {
      this.validationHandler(validationResult);
    }
  }

  onServiceabilitySuccess(res) {
    const serviceable = get(
      res,
      'serviceability.serviceabilityFlags.pincode.value'
    );

    !serviceable &&
      this.setState({
        serviceabilityError: getKVPairValue('NON_SERVICEABLE_ADDRESS_ERROR')
      });
  }

  getLocality(pincode) {
    const { isNewUser = false } = this.props;
    AddressManager.getLocallity(
      pincode,
      this.onLocalitySuccess,
      this.onLocalityError
    );
    if (isNewUser && isFeatureEnabled('CART_SOCIAL_PROOFING')) {
      if (getAbtest('CART_SOCIAL_PROOFING') === 'enabled') {
        AddressManager.getSocialProofing(
          pincode,
          res => {
            this.onSocialProofingSuccess(res, pincode);
          },
          noop
        );
      }
      triggerEvent('CART_SOCIAL_PROOFING_FLAG', {
        custom: {
          custom: { v1: pincode },
          widget: {
            name: 'address_social_proofing_flag'
          }
        }
      });
    }
  }

  setLocalityDetails(addressInfo, localityOptions) {
    this.setState(prevState => {
      const { addressInfo: prevAddressInfo, ...rest } = prevState;
      return {
        addressInfo: {
          ...prevAddressInfo,
          ...addressInfo
        },
        ...rest,
        localityOptions,
        loading: false
      };
    });
    addressInfo.pincode && this.getServiceability(addressInfo.pincode);
  }

  getServiceability(pincode) {
    AddressManager.getServiceability(
      pincode,
      this.onServiceabilitySuccess,
      this.onError
    );
  }

  onLocalitySuccess(res) {
    const addressInfo = {
      city: get(res, 'cities[0]'),
      state: get(res, 'state')
    };
    const localityOptions = get(res, 'locality', []);
    this.setLocalityDetails(addressInfo, localityOptions);
  }

  onLocalityError(err) {
    triggerEvent('ADDRESS_ERROR', { gaLabel: err });
    this.setState({
      loading: false,
      serviceabilityError: 'Invalid Pincode, please enter a valid pincode.'
    });
  }

  onSocialProofingSuccess(res, pincode) {
    this.setState(prevState => {
      const { city, count } = res;
      if (count > 0) {
        triggerEvent('CART_SOCIAL_PROOFING_LOAD', {
          custom: {
            custom: { v1: pincode, v2: count },
            widget: {
              name: 'address_social_proofing'
            }
          }
        });
        return {
          ...prevState,
          socialProofingData: {
            city: city,
            count: count.toLocaleString('en-IN')
          }
        };
      } else {
        return {
          ...prevState,
          socialProofingData: null
        };
      }
    });
  }

  setAddressType(event) {
    let id = event.currentTarget.id.split('-')[0];
    let value = event.currentTarget.getAttribute('data-value') || '';
    let data = [];
    if (id === 'addressType') {
      data.push({ id, value });
      value === 'HOME'
        ? data.push({ id: 'notAvailableDays', value: undefined })
        : data.push({ id: 'notAvailableDays', value: ['SATURDAY', 'SUNDAY'] });
      triggerEvent(value + '_ADDRESS');
    } else {
      let isActive = value === 'false';
      let day = event.currentTarget.id.split('-')[1];
      let notAvailableDays = [...(this.state.addressInfo[id] || [])];

      if (isActive) {
        let index = notAvailableDays.indexOf(day);
        index !== -1 && notAvailableDays.splice(index, 1);

        triggerEvent('ADDRESS_SUB_TYPE_SELECTION', {
          gaLabel:
            (day === 'SATURDAY' ? 'checkbox-sat-type' : 'checkbox-sun-type') +
            ' check'
        });
      } else {
        let index = notAvailableDays.indexOf(day);
        index === -1 && notAvailableDays.push(day);

        triggerEvent('ADDRESS_SUB_TYPE_SELECTION', {
          gaLabel:
            day === 'SATURDAY' ? 'checkbox-sat-type' : 'checkbox-sun-type'
        });
      }

      data.push({ id, value: notAvailableDays });
    }
    this.updateState(data);
  }

  setValue(event) {
    let id = (event.target.id || event.currentTarget.id).split('-')[0];
    if (id) {
      let value =
        event.target.value ||
        event.target.getAttribute('data-value') ||
        event.currentTarget.getAttribute('data-value') ||
        '';
      id === 'isDefault' && (value = value === 'false');
      this.updateState([{ id, value }]);
    }
  }

  updateState(fields) {
    let addressInfo = { ...this.state.addressInfo };
    fields.forEach(field => {
      addressInfo[field.id] = field.value;
    });
    this.setState({ addressInfo });
  }

  render() {
    const {
      state: { addressInfo, socialProofingData, ...data },
      props: { showHeader, formClass, mode, showBack, onBack },
      getPincodeValidity,
      saveHandler,
      setValue,
      setAddressType
    } = this;

    return (
      <AddressFormUI
        {...data}
        showBack={showBack}
        onBack={onBack}
        addressInfo={addressInfo}
        getPincodeValidity={getPincodeValidity}
        saveHandler={saveHandler}
        setValue={setValue}
        setAddressType={setAddressType}
        showHeader={showHeader}
        formClass={formClass}
        mode={mode}
        setLocalityDetails={this.setLocalityDetails}
        socialProofingData={socialProofingData}
      />
    );
  }
}

AddressForm.propTypes = {
  addressInfo: PropTypes.object,
  successCallback: PropTypes.func,
  handleAddressAction: PropTypes.func,
  mode: PropTypes.string
};

export default AddressForm;
