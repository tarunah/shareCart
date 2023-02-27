import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import AddressForm from '.';
import addressData from 'testUtils/addressMockData';
import AddressManager from 'commonBrowserUtils/AddressManager';

describe('Address Form Comp', () => {
  window.triggerEvent = () => {};

  it('should show input field', () => {
    const wrapper = mount(<AddressForm />);
    expect(wrapper.find('input[id="name"]')).to.have.lengthOf(1);

    expect(wrapper.find('input[id="mobile"]')).to.have.lengthOf(1);

    expect(wrapper.find('input[id="pincode"]')).to.have.lengthOf(1);

    expect(wrapper.find('input[id="streetAddress"]')).to.have.lengthOf(1);

    expect(wrapper.find('input[id="locality"]')).to.have.lengthOf(1);

    expect(wrapper.find('input[id="city"]')).to.have.lengthOf(1);

    expect(wrapper.find('input[id="state"]')).to.have.lengthOf(1);
  });
  it('should show error when name is empty or invalid', () => {
    const wrapper = mount(<AddressForm />);
    wrapper.find('div.saveBtn').simulate('click');
    expect(wrapper.find('.errorMessage').text()).to.equal(
      'This is a mandatory field'
    );

    wrapper.setState({
      addressInfo: {
        name: 'n@me',
        state: {}
      }
    });
    wrapper.find('div.saveBtn').simulate('click');
    expect(wrapper.find('.errorMessage').text()).to.equal(
      'Only alphabets, digits, _ and . are allowed'
    );
  });
  it('should show error when mobile number is not 10 digit or invalid', () => {
    const wrapper = mount(<AddressForm />);
    wrapper.setState({
      addressInfo: {
        name: 'asda',
        mobile: '22',
        state: {}
      }
    });
    wrapper.find('div.saveBtn').simulate('click');
    expect(wrapper.find('.errorMessage').text()).to.equal(
      'Minimum length is 10'
    );

    wrapper.setState({
      addressInfo: {
        name: 'asda',
        mobile: '999999999q',
        state: {}
      }
    });
    wrapper.find('div.saveBtn').simulate('click');
    expect(wrapper.find('.errorMessage').text()).to.equal(
      'Please enter a valid 10 digit mobile number'
    );
  });
  it('should show error when pin code is not 6 digit or invalid', () => {
    const wrapper = mount(<AddressForm />);
    wrapper.setState({
      addressInfo: {
        name: 'asda',
        mobile: '6222222222',
        pincode: '234',
        state: {}
      }
    });
    wrapper.find('div.saveBtn').simulate('click');
    expect(wrapper.find('.errorMessage').text()).to.equal(
      'Minimum length is 6'
    );

    wrapper.setState({
      addressInfo: {
        name: 'asda',
        mobile: '6222222222',
        pincode: '234@1#',
        state: {}
      }
    });
    wrapper.find('div.saveBtn').simulate('click');
    expect(wrapper.find('.errorMessage').text()).to.equal(
      'Only numbers are allowed'
    );
  });
  it('should show error when locality is not proper', () => {
    const wrapper = mount(<AddressForm />);
    wrapper.setState({
      addressInfo: {
        name: 'asda',
        mobile: '6222222222',
        pincode: '234567',
        locality: '#@$asdsdsd',
        streetAddress: '12,fdjfg,dfgdfgv,fdgfd,fdgfdg',
        city: 'ddcds',
        state: {}
      }
    });
    wrapper.find('div.saveBtn').simulate('click');
    expect(wrapper.find('.errorMessage').text()).to.equal(
      "Special characters allowed are & / . ’ ( ) - , ' # ; : ° @ - _"
    );
  });

  it('should show error when street address is not proper', () => {
    const wrapper = mount(<AddressForm />);
    wrapper.setState({
      addressInfo: {
        name: 'asda',
        mobile: '6222222222',
        pincode: '234567',
        locality: 'asdsdsd',
        streetAddress: '!$%^~',
        state: {}
      }
    });
    wrapper.find('div.saveBtn').simulate('click');
    expect(wrapper.find('.errorMessage').text()).to.equal(
      "Special characters allowed are & / . ’ ( ) - , ' # ; : ° @ - _"
    );
  });

  it('should show error when address type is not selected', () => {
    const wrapper = mount(<AddressForm />);
    wrapper.setState({
      addressInfo: {
        name: 'asda',
        mobile: '6222222222',
        pincode: '234567',
        locality: 'asdsdsd',
        streetAddress: 'fnwjenfwefnwn',
        city: 'Bangalore',
        state: {
          code: 'KA',
          name: 'Karnataka'
        },
        country: {
          code: 'IN',
          name: 'India'
        }
      }
    });
    wrapper.find('div.saveBtn').simulate('click');
    expect(wrapper.find('.error').text()).to.equal('Please tag your address');
  });
  it('should set value for name', () => {
    const wrapper = mount(<AddressForm />);
    wrapper
      .find('input[id="name"]')
      .simulate('change', { target: { id: 'name', value: 'xyz' } });
    expect(wrapper.state().addressInfo.name).to.equal('xyz');
  });
  it('should set value for pin code', () => {
    AddressManager.getServiceability = (pincode, scb, ecb) =>
      scb({
        serviceability: {
          addressInfo: { pincode },
          serviceabilityFlags: {
            pincode: { value: true }
          }
        }
      });
    AddressManager.getLocallity = (uidx, scb, ecb) =>
      scb({
        cities: ['Bangalore'],
        locality: ['Begur', 'Bommanahalli (Bangalore)'],
        state: { code: 'KA', name: 'Karnataka' }
      });
    const wrapper = mount(<AddressForm />);

    wrapper.find('input[id="locality"]').simulate('click');
    expect(wrapper.find('div.optionBtnDesktop')).to.have.lengthOf(0);

    const pincodeWraper = wrapper.find('input[id="pincode"]');

    pincodeWraper.simulate('change', {
      target: { id: 'pincode', value: '560068' }
    });

    pincodeWraper.simulate('blur');
    expect(wrapper.state().addressInfo.pincode).to.equal('560068');
    expect(wrapper.state().localityOptions).to.have.lengthOf(2);
    expect(wrapper.state().addressInfo.city).to.equal('Bangalore');
    expect(wrapper.state().addressInfo.state).to.have.property('code', 'KA');
    expect(wrapper.state().addressInfo.country).to.have.property('code', 'IN');
    wrapper.find('input[id="locality"]').simulate('click');
    expect(wrapper.find('div.optionBtnDesktop')).to.have.lengthOf(2);

    wrapper.setState({
      addressInfo: {
        ...wrapper.state().addressInfo,
        locality: 'Begur'
      }
    });
    wrapper.find('input[id="locality"]').simulate('click');
    expect(wrapper.find('div.optionBtnDesktop')).to.have.lengthOf(1);
  });
  it('should give error for serviceability', () => {
    AddressManager.getServiceability = (pincode, scb, ecb) =>
      scb({
        serviceability: {
          addressInfo: { pincode },
          serviceabilityFlags: {
            pincode: { value: true }
          }
        }
      });
    AddressManager.getLocallity = (uidx, scb, ecb) =>
      ecb({
        message: 'locality error'
      });
    const wrapper = mount(<AddressForm />);

    const pincodeWraper = wrapper.find('input[id="pincode"]');

    pincodeWraper.simulate('change', {
      target: { id: 'pincode', value: '560068' }
    });

    pincodeWraper.simulate('blur');
  });
  it('should have a particular heading', () => {
    let wrapper = mount(<AddressForm showHeader={true} />);

    expect(wrapper.find('div.header').text()).to.contain(' ADD NEW ADDRESS');

    wrapper.setState({
      addressInfo: addressData[0]
    });

    expect(wrapper.find('div.header').text()).to.contain('EDIT ADDRESS');
  });
  it('should set addressType', () => {
    let wrapper = mount(<AddressForm />);

    wrapper.find('div#addressType-home').simulate('click');
    expect(wrapper.state().addressInfo.addressType).to.equal('HOME');

    wrapper.find('div#addressType-office').simulate('click');
    expect(wrapper.state().addressInfo.addressType).to.equal('OFFICE');

    wrapper.find('div#notAvailableDays-SATURDAY').simulate('click');
    expect(wrapper.state().addressInfo.notAvailableDays).to.have.lengthOf(1);

    wrapper.find('div#notAvailableDays-SUNDAY').simulate('click');
    expect(wrapper.state().addressInfo.notAvailableDays).to.have.lengthOf(0);

    wrapper.find('div#notAvailableDays-SUNDAY').simulate('click');
    expect(wrapper.state().addressInfo.notAvailableDays).to.have.lengthOf(1);
  });

  it('should successfully save form', () => {
    const successCallback = sinon.spy();
    const handleAddressAction = (operation, form, scb, ecb) => scb();

    AddressManager.validateAddress = (uidx, scb, ecb) =>
      scb({
        score: 'VALID'
      });

    let wrapper = mount(
      <AddressForm
        successCallback={successCallback}
        handleAddressAction={handleAddressAction}
      />
    );
    wrapper.setState({
      addressInfo: {
        name: 'asda',
        mobile: '6222222222',
        pincode: '234567',
        locality: 'asdsdsd',
        streetAddress: 'fnwjenfwefnwn',
        landmark: '',
        city: 'Bangalore',
        state: {
          code: 'KA',
          name: 'Karnataka'
        },
        country: {
          code: 'IN',
          name: 'India'
        }
      }
    });
    wrapper.find('div#addressType-home').simulate('click');
    expect(wrapper.state().addressInfo.addressType).to.equal('HOME');

    wrapper.find('div.saveBtn').simulate('click');
    expect(successCallback.called).to.equal(true);
  });
  it('should show serviceability error', () => {
    let wrapper = mount(<AddressForm />);

    wrapper.setState({
      serviceabilityError:
        'Sorry! This order cannot be delivered to this pin code.'
    });

    expect(wrapper.find('.errorMessage').text()).to.equal(
      'Sorry! This order cannot be delivered to this pin code.'
    );
  });

  it('should show Could not check deliverability for service failures occuring for valid pincodes', () => {
    AddressManager.getServiceability = (pincode, successCB, errorCB) =>
      errorCB();
    window.triggerEvent = jest.fn(() => {});
    const wrapper = mount(<AddressForm />);
    const pincodeWraper = wrapper.find('input[id="pincode"]');
    pincodeWraper.simulate('change', {
      target: { id: 'pincode', value: '000000' }
    });
    pincodeWraper.simulate('blur');

    expect(wrapper.state().loading).to.equal(false);
    expect(wrapper.state().serviceabilityError).to.equal(
      'Invalid Pincode, please enter a valid pincode.'
    );
  });

  it('should show the backicon if showBack is true and click should invoke the callback', () => {
    const spyFunc = sinon.spy();
    const wrapper = mount(
      <AddressForm showHeader={true} showBack={true} onBack={spyFunc} />
    );

    expect(wrapper.find('.header ArrowLeft').exists()).to.equal(true);

    wrapper.find('.header ArrowLeft').simulate('click');

    expect(spyFunc.calledOnce).to.equal(true);
  });

  it('should triggerEvent for Add_ADDRESS_FAILURE', () => {
    const triggerEventSpy = sinon.spy();
    window.triggerEvent = triggerEventSpy;
    const handleAddressAction = jest.fn((operation, data, successCB, errorCB) =>
      errorCB({ Error: 'Servicebility failure' })
    );
    const wrapper = mount(
      <AddressForm handleAddressAction={handleAddressAction} />
    );
    wrapper.setState({
      addressInfo: {
        name: 'asda',
        mobile: '6222222222',
        pincode: '234567',
        locality: 'asdsdsd',
        streetAddress: 'fnwjenfwefnwn',
        city: 'Bangalore',
        state: {
          code: 'KA',
          name: 'Karnataka'
        },
        country: {
          code: 'IN',
          name: 'India'
        }
      }
    });
    wrapper
      .find('.saveBtn')
      .find('Button')
      .simulate('click');
    expect(triggerEventSpy.calledOnce).to.equal(true);
  });

  describe('Address suggestion UI', () => {
    it('should not display the Address location button when ab, feature gate is on and in either pwa or android but window does not have navigator object', () => {
      window._checkout_ = {
        //pwa
        __myx_deviceData__: { deviceChannel: 'mobile' },
        //feature is on
        __myx_features__: {
          'checkout.address.suggestion': true
        },
        __myx_ab__: { 'checkout.address.suggestion': 'enabled' },
        //enabled for pwa
        __myx_kvpairs__: {
          'checkout.addressSuggestion.config': {
            pwa: 'enabled',
            android: 'enabled',
            android_version: '4.2011'
          }
        }
      };
      delete window.navigator;

      const wrapper = mount(<AddressForm />);

      expect(wrapper.find('AddressLocationSuggestion span').exists()).to.equal(
        false
      );
    });

    it('should not display the Address location button when ab, feature gate is on and not in either pwa or android', () => {
      window.navigator = { geolocation: { getCurrentPosition: () => {} } };
      window._checkout_ = {
        __myx_features__: {
          'checkout.address.suggestion': true
        },
        __myx_kvpairs__: {
          'checkout.addressSuggestion.config': {
            pwa: 'enabled',
            android: 'enabled',
            android_version: '4.2011'
          }
        },
        __myx_ab__: { 'checkout.address.suggestion': 'enabled' }
      };

      const wrapper = mount(<AddressForm />);

      expect(wrapper.find('AddressLocationSuggestion span').exists()).to.equal(
        false
      );
    });

    describe('PWA', () => {
      it('should display the Address location button when ab, feature gate is on and in pwa', () => {
        window._checkout_ = {
          __myx_deviceData__: { deviceChannel: 'mobile' },
          __myx_features__: {
            'checkout.address.suggestion': true
          },
          __myx_kvpairs__: {
            'checkout.addressSuggestion.config': {
              pwa: 'enabled'
            }
          },
          __myx_ab__: { 'checkout.address.suggestion': 'enabled' }
        };

        const wrapper = mount(<AddressForm />);

        expect(wrapper.find('AddressLocationSuggestion').text()).to.equal(
          ' USE MY LOCATION'
        );
      });

      it('should not display the Address location button when ab, feature gate is on but disabled for pwa', () => {
        window._checkout_ = {
          __myx_deviceData__: { deviceChannel: 'mobile' },
          __myx_features__: {
            'checkout.address.suggestion': true
          },
          __myx_kvpairs__: {
            'checkout.addressSuggestion.config': {
              pwa: 'disabled'
            }
          },
          __myx_ab__: { 'checkout.address.suggestion': 'enabled' }
        };

        const wrapper = mount(<AddressForm />);

        expect(wrapper.find('AddressLocationSuggestion').exists()).to.equal(
          false
        );
      });

      it('should not display the Address location button when ab on, feature gate is off  and in pwa', () => {
        window._checkout_ = {
          __myx_deviceData__: { deviceChannel: 'mobile' },
          __myx_features__: {
            'checkout.address.suggestion': false
          },
          __myx_kvpairs__: {
            'checkout.addressSuggestion.config': {
              pwa: 'enabled'
            }
          },
          __myx_ab__: { 'checkout.address.suggestion': 'enabled' }
        };

        const wrapper = mount(<AddressForm />);

        expect(wrapper.find('AddressLocationSuggestion').exists()).to.equal(
          false
        );
      });
    });

    describe('Android', () => {
      it('should display the Address location button when ab, feature gate is on and in android', () => {
        window._checkout_ = {
          __myx_deviceData__: { isAndroid: true },
          __myx_features__: {
            'checkout.address.suggestion': true
          },
          __myx_kvpairs__: {
            'checkout.addressSuggestion.config': {
              android: 'enabled',
              android_version: ''
            }
          },
          __myx_ab__: { 'checkout.address.suggestion': 'enabled' }
        };

        const wrapper = mount(<AddressForm />);

        expect(wrapper.find('AddressLocationSuggestion').text()).to.equal(
          ' USE MY LOCATION'
        );
      });

      it('should not display the Address location button when ab, feature gate is on but not for android', () => {
        window._checkout_ = {
          __myx_deviceData__: { isAndroid: true },
          __myx_features__: {
            'checkout.address.suggestion': true
          },
          __myx_kvpairs__: {
            'checkout.addressSuggestion.config': {
              android: 'disabled',
              android_version: ''
            }
          },
          __myx_ab__: { 'checkout.address.suggestion': 'enabled' }
        };

        const wrapper = mount(<AddressForm />);

        expect(wrapper.find('AddressLocationSuggestion').exists()).to.equal(
          false
        );
      });

      it('should not display the Address location button when ab, feature gate is on and androidVersion is lower than given one', () => {
        window._checkout_ = {
          __myx_deviceData__: { isAndroid: true },
          __myx_features__: {
            'checkout.address.suggestion': true
          },
          __myx_kvpairs__: {
            'checkout.addressSuggestion.config': {
              android: 'enabled',
              android_version: '4.2014'
            }
          },
          __myx_ab__: { 'checkout.address.suggestion': 'enabled' }
        };

        const wrapper = mount(<AddressForm />);

        expect(wrapper.find('AddressLocationSuggestion').exists()).to.equal(
          false
        );
      });

      it('should not display the Address location button when ab on, feature gate is off and in android', () => {
        window._checkout_ = {
          __myx_deviceData__: { deviceChannel: 'mobile' },
          __myx_features__: {
            'checkout.address.suggestion': false
          },
          __myx_kvpairs__: {
            'checkout.addressSuggestion.config': {
              android: 'enabled',
              android_version: ''
            }
          },
          __myx_ab__: { 'checkout.address.suggestion': 'enabled' }
        };

        const wrapper = mount(<AddressForm />);

        expect(wrapper.find('AddressLocationSuggestion').exists()).to.equal(
          false
        );
      });
    });
  });
});
