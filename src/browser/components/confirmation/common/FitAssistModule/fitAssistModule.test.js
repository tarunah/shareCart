import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import FitAssistModule from '.';
import Carousel from './Carousel';
import ProfileSelector from './ProfileSelector';

import productData, { profiles } from 'testUtils/confirmationMockData';
import { getKVPairValue } from 'commonUtils/KVPairManager';

describe('Fit Assist Module in mobile', () => {
  beforeEach(() => {
    window.SHELL = {
      alert: sinon.spy()
    };
    window.location = '';
  });
  const props = {
    actionHandlers: {
      handleConfirmationAction: function(p1, p2, cb) {
        cb();
      }
    },
    dataState: {
      data: {
        bountyOrder: {
          storeOrderId: '1234'
        },
        profiles,
        productData
      }
    },
    animateStyleInfoCard: sinon.spy()
  };
  it('if FitAssistModule in mobile is displayed properly', () => {
    const wrapper = shallow(<FitAssistModule {...props} />);
    expect(wrapper.find('.opacityNone').length).toBe(0);
    expect(wrapper.find(Carousel).length).toBe(1);
    expect(wrapper.find(ProfileSelector).length).toBe(1);
  });

  it('should test afterCarouselSlide', () => {
    const wrapper = shallow(<FitAssistModule {...props} />);
    wrapper.instance().selectProduct = sinon.spy();
    wrapper.instance().afterCarouselSlide(0);

    expect(wrapper.instance().selectProduct.callCount).toBe(1);
    expect(wrapper.instance().allTaggedMessageShown).toBe(undefined);
    wrapper.instance().setState({
      showAllTaggedMessage: true
    });
    wrapper.instance().afterCarouselSlide(0);
  });

  it('should test selectProduct', () => {
    let wrapper = shallow(<FitAssistModule {...props} />);
    wrapper.instance().allTaggedMessageShown = true;
    wrapper.instance().getIdFromIndex = sinon.stub().returns('1531');
    wrapper.instance().selectProduct(0);
    wrapper.instance().setState = sinon.stub().returns({});
    expect(wrapper.instance().getIdFromIndex.callCount).toBe(3);
    expect(wrapper.instance().state.currentProduct.id).toBe('1531');
    expect(wrapper.instance().state.currentProduct.articleType).toBe('Tshirts');
    expect(wrapper.instance().state.currentProduct.gender).toBe('Men');

    // test when target id is blank
    const e = {
      currentTarget: {
        id: 'blank-blank'
      }
    };
    wrapper = shallow(<FitAssistModule {...props} />);
    wrapper.instance().setState({
      showAllTaggedMessage: true
    });
    wrapper.instance().allTaggedMessageShown = true;
    wrapper.instance().selectProduct(e);
    expect(wrapper.instance().state.currentProduct.id).toBe('blank-blank');
    expect(wrapper.instance().state.currentProduct.articleType).toBe('Tshirts');
    expect(wrapper.instance().state.currentProduct.gender).toBe('Men');
    expect(wrapper.instance().state.selectedProfile).toBe(null);
  });

  it('should test selectNextProductAfterTag', () => {
    jest.useFakeTimers();
    const wrapper = shallow(<FitAssistModule {...props} />);
    wrapper.instance().getCurrentProductIndex = sinon.stub().returns(0);
    wrapper.instance().selectProduct = sinon.spy();
    wrapper.instance().selectNextProductAfterTag();
    jest.runAllTimers();
    expect(wrapper.instance().state.resetSelectorBlock).toBe(false);
    expect(wrapper.instance().getCurrentProductIndex.callCount).toBe(3);
    expect(wrapper.instance().selectProduct.callCount).toBe(1);
  });

  it('should test selectProfile', () => {
    const e = {
      currentTarget: {
        id: '66323cef-5e2f-4d05-8e19-894e41f80ed9'
      }
    };
    const wrapper = shallow(<FitAssistModule {...props} />);
    wrapper.instance().tagProfile = sinon.spy();
    wrapper.instance().selectNextProductAfterTag = sinon.spy();
    wrapper.instance().selectProfile(e);
    expect(wrapper.instance().tagProfile.callCount).toBe(1);
    expect(wrapper.instance().selectNextProductAfterTag.callCount).toBe(1);

    e.currentTarget.id = 'myself';
    wrapper.instance().selectProfile(e);
    expect(wrapper.instance().state.selectedProfile).toBe(e.currentTarget.id);
    expect(wrapper.instance().state.profileModal).toBe(true);
  });

  it('should test isTagged', () => {
    const wrapper = shallow(<FitAssistModule {...props} />);
    wrapper.setState({
      taggedItemsMap: {
        id: '1234'
      }
    });
    const key = wrapper.instance().isTagged('id');
    expect(key).toBe('id');
  });

  it('should test getCurrentProductIndex', () => {
    const wrapper = shallow(<FitAssistModule {...props} />);
    wrapper.setState({
      currentProduct: { id: '1531-3831', gender: 'Men', articleType: 'Tshirts' }
    });
    const index = wrapper.instance().getCurrentProductIndex();
    expect(index).toBe(0);
  });

  it('should test getIdFromIndex', () => {
    const wrapper = shallow(<FitAssistModule {...props} />);
    const id = wrapper.instance().getIdFromIndex(0);
    expect(id).toBe('1531-3831');
  });

  it('should test tagProfile', () => {
    window.triggerEvent = sinon.spy();
    const wrapper = shallow(<FitAssistModule {...props} />);
    wrapper.instance().tagProfile(profiles[0].pidx);
    expect(wrapper.instance().state.taggedItemsMap).toEqual({
      '1531-3831': '66323cef-5e2f-4d05-8e19-894e41f80ed9'
    });
    expect(window.triggerEvent.callCount).toBe(1);
  });

  it('should test closeProfileModal', () => {
    const wrapper = shallow(<FitAssistModule {...props} />);
    wrapper.setState = sinon.spy();
    wrapper.instance().closeProfileModal();
    expect(wrapper.setState.callCount).toBe(1);
  });

  it('should test onProfileNameChange', () => {
    const wrapper = shallow(<FitAssistModule {...props} />);
    wrapper
      .instance()
      .onProfileNameChange({ currentTarget: { value: 'swapnil' } });
    expect(wrapper.instance().state.profileModalDetails.name).toBe('swapnil');
  });

  it('should test onGenderClick', () => {
    const wrapper = shallow(<FitAssistModule {...props} />);
    wrapper.instance().onGenderClick({ currentTarget: { id: 'female' } });
    expect(wrapper.instance().state.profileModalDetails.gender).toBe('female');
  });

  it('should test openSizeInfo', () => {
    window.triggerEvent = sinon.spy();
    const wrapper = shallow(<FitAssistModule {...props} />);
    wrapper.instance().openSizeInfo();
    expect(window.triggerEvent.callCount).toBe(1);
  });

  it('should test saveProfile', () => {
    window.triggerEvent = sinon.spy();
    const wrapper = shallow(<FitAssistModule {...props} />);
    wrapper.instance().saveProfile();
    expect(wrapper.instance().state.profileModalError).toBe(
      'Profile name cannot be empty'
    );
    wrapper.setState({
      profileModalDetails: {
        name: 'Pot'
      }
    });
    wrapper.instance().saveProfile();
    expect(window.triggerEvent.callCount).toBe(2);
    expect(wrapper.instance().state.saveInProgress).toBe(false);
    expect(wrapper.instance().state.profileModal).toBe(false);
    expect(wrapper.instance().state.profileModalDetails).toEqual({
      name: 'Pot'
    });
    expect(wrapper.instance().state.selectedProfile).toEqual(undefined);
  });
});
