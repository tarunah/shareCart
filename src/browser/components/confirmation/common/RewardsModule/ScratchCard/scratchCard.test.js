import React from 'react';
import { shallow } from 'enzyme';
import Loader from 'commonComp/Loader';
import ScratchCard from './index';
import ScratchSVG from '../ScratchSVG/index';

describe('ScratchCard Component Tests', () => {
  it('should check if scratch card is displayed properly', () => {
    const wrapper = shallow(
      <ScratchCard scratchImage="https://assets.myntassets.com/assets/images/2022/3/11/d797b8a5-e708-4c4c-9c3d-8bb4c95ed5a31646997301271-sc_theme_1.png" />
    );
    expect(wrapper.find('.scratchWrapper').exists()).toEqual(true);
  });
  it('should check if loader is displayed when isLoading prop is true', () => {
    const wrapper = shallow(<ScratchCard isLoading />);
    expect(wrapper.find(Loader).exists()).toEqual(true);
  });
  it('should check if ScratchSVG is displayed after 3200 ms', () => {
    jest.useFakeTimers();
    const wrapper = shallow(<ScratchCard />);
    setTimeout(() => {
      expect(wrapper.find(ScratchSVG).exists()).toEqual(true);
    }, 3200);
  });
});
