import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import SuccessCard from './SuccessCard';
import { scratchCardRetentionConfig } from 'commonBrowserUtils/ConfirmationConstants';

const { DISCOUNT_TYPES } = scratchCardRetentionConfig;

describe('SuccessCard Component Tests', () => {
  let wrapper;
  const props = {
    couponDetails: {
      discountType: '',
      shortDesc: '',
      conditionMax: '',
      conditionMin: ''
    },
    onCTAPress: sinon.spy()
  };

  beforeEach(() => {
    wrapper = mount(<SuccessCard {...props} />);
  });

  it('should check if Success Card has been displayed properly', () => {
    expect(wrapper.find('.successCard').exists()).toEqual(true);
  });

  it('should check if Success Card has been displayed properly with discountType as percentage', () => {
    props.couponDetails.discountType = DISCOUNT_TYPES.PERCENTAGE;
    wrapper = mount(<SuccessCard {...props} />);
    expect(wrapper.find('.successCard').exists()).toEqual(true);
  });

  it('should check if onClick cb is being called on primary CTA', () => {
    wrapper.find('div.primary').simulate('click');
    expect(props.onCTAPress.callCount).toEqual(1);
  });

  it('should check if onClick cb is being called on secondary CTA', () => {
    wrapper.find('div.secondary').simulate('click');
    expect(props.onCTAPress.callCount).toEqual(2);
  });
});
