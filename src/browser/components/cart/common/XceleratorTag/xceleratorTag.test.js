import React from 'react';
import { mount } from 'enzyme';
import XceleratorTag from './';

describe('XceleratorTags', () => {
  it('should show xcelerator tag when show is true', () => {
    const sysAttributes = [
      { attribute: 'SA_XT_Pricing_Percent', value: '10% off Today' },
      { attribute: 'SA_XT_Best_Price', value: 'Best Price' }
    ];
    const xceleratorTagsPriorityList = [
      'SA_XT_Best_Price',
      'SA_XT_Pricing_Percent'
    ];
    let wrapper = mount(
      <XceleratorTag
        xceleratorTagsPriorityList={xceleratorTagsPriorityList}
        sysAttributes={sysAttributes}
      />
    );
    expect(wrapper.find('.xceleratorTag').length).toBe(1);
  });

  it('should pick highest priority xcelerator tag from config', () => {
    const sysAttributes = [
      { attribute: 'SA_XT_Pricing_Percent', value: '10% off Today' },
      { attribute: 'SA_XT_Best_Price', value: 'Best Price' }
    ];
    const xceleratorTagsPriorityList = [
      'SA_XT_Best_Price',
      'SA_XT_Pricing_Percent'
    ];

    let wrapper = mount(
      <XceleratorTag
        xceleratorTagsPriorityList={xceleratorTagsPriorityList}
        sysAttributes={sysAttributes}
      />
    );
    expect(wrapper.find('.xceleratorTag').text()).toContain('Best Price');
  });

  it('should not show xcelerator tag if none present in config', () => {
    const sysAttributes = [
      { attribute: 'SA_XT_Pricing_Percent', value: '10% off Today' },
      { attribute: 'SA_XT_Best_Price', value: 'Best Price' }
    ];
    const xceleratorTagsPriorityList = ['SA_XT_New'];

    let wrapper = mount(
      <XceleratorTag
        xceleratorTagsPriorityList={xceleratorTagsPriorityList}
        sysAttributes={sysAttributes}
      />
    );
    expect(wrapper.find('.xceleratorTag').length).toBe(0);
  });
});
