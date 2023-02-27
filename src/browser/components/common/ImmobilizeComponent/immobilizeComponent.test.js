import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import createImmobilizedComponent from './';

describe('createImmobilizedComponent', () => {
  it('should accept a component and result in the same component which merges classes from disableClassName to the former className and prevents onClick when disable is true', () => {
    const ImmobilizedDiv = createImmobilizedComponent('div');
    const className = 'C1';
    const disableClassName = 'D1 D2';
    const onClickSpy = sinon.spy();

    const wrapperEnabled = mount(
      <ImmobilizedDiv
        className={className}
        disableClassName={disableClassName}
        onClick={onClickSpy}
        disabled={false}
      />
    );

    wrapperEnabled.find('div').simulate('click');

    expect(wrapperEnabled.find('.C1').exists()).toEqual(true);
    expect(wrapperEnabled.find('.D1').exists()).toEqual(false);
    expect(wrapperEnabled.find('.D2').exists()).toEqual(false);
    expect(onClickSpy.calledOnce).toEqual(true);

    const onClickSpy2 = sinon.spy();
    const wrapperEnabled2 = mount(
      <ImmobilizedDiv
        className={className}
        disableClassName={disableClassName}
        onClick={onClickSpy2}
        disabled={true}
      />
    );

    wrapperEnabled2.find('div').simulate('click');
    expect(wrapperEnabled2.find('.C1').exists()).toEqual(true);
    expect(wrapperEnabled2.find('.D1').exists()).toEqual(true);
    expect(wrapperEnabled2.find('.D2').exists()).toEqual(true);
    expect(onClickSpy2.calledOnce).toEqual(false);
  });
});
