import React from 'react';

import { mount } from 'enzyme';

import Slider from './';
import { Slide } from './';

import Styles from './slider.base.css';

const Component1 = ({ slideToLeft, slideToRight }) => {
  return (
    <div>
      <div className="slideToLeft" onClick={() => slideToLeft()} />
      <div className="slideToRight" onClick={() => slideToRight()} />
    </div>
  );
};

const Component2 = ({ slideToLeft, slideToRight }) => {
  return (
    <div>
      <div className="slideToLeft" onClick={() => slideToLeft()} />
      <div className="slideToRight" onClick={() => slideToRight()} />
    </div>
  );
};

const Component3 = ({ slideToRight, slideToLeft }) => {
  return (
    <div>
      <div className="slideToLeft" onClick={() => slideToLeft()} />
      <div className="slideToRight" onClick={() => slideToRight()} />
    </div>
  );
};

describe('Sliding Component', () => {
  it('should slide left and right', () => {
    const wrapper = mount(
      <Slider>
        <Slide
          render={(slideToLeft, slideToRight) => (
            <Component1 slideToLeft={slideToLeft} slideToRight={slideToRight} />
          )}
        />

        <Slide
          render={(slideToLeft, slideToRight) => (
            <Component2 slideToLeft={slideToLeft} slideToRight={slideToRight} />
          )}
        />

        <Slide
          render={(slideToLeft, slideToRight) => (
            <Component3 slideToRight={slideToRight} slideToLeft={slideToLeft} />
          )}
        />
      </Slider>
    );

    // only one slide rendered for the first time
    let slide = wrapper.find('Slide');
    expect(slide).toHaveLength(1);
    expect(wrapper.find(`.${Styles.view}`)).toHaveLength(1);
    expect(wrapper.find(`.${Styles.viewLeft}`)).toHaveLength(0);
    expect(wrapper.find(`.${Styles.viewRight}`)).toHaveLength(0);

    slide
      .find('Component1')
      .find('.slideToLeft')
      .simulate('click');
    // two slides rendered
    slide = wrapper.find('Slide');
    expect(slide).toHaveLength(2);
    expect(wrapper.find(`.${Styles.view}`)).toHaveLength(1);
    expect(wrapper.find(`.${Styles.viewLeft}`)).toHaveLength(1);
    expect(wrapper.find(`.${Styles.viewRight}`)).toHaveLength(0);

    slide
      .find('Component2')
      .find('.slideToLeft')
      .simulate('click');
    // three slides rendered
    slide = wrapper.find('Slide');
    expect(slide).toHaveLength(3);
    expect(wrapper.find(`.${Styles.view}`)).toHaveLength(1);
    expect(wrapper.find(`.${Styles.viewLeft}`)).toHaveLength(2);
    expect(wrapper.find(`.${Styles.viewRight}`)).toHaveLength(0);

    slide
      .find('Component3')
      .find('.slideToLeft')
      .simulate('click');
    // no change in state on calling slideToLeft from last slide on the right
    slide = wrapper.find('Slide');
    expect(slide).toHaveLength(3);
    expect(wrapper.find(`.${Styles.view}`)).toHaveLength(1);
    expect(wrapper.find(`.${Styles.viewLeft}`)).toHaveLength(2);
    expect(wrapper.find(`.${Styles.viewRight}`)).toHaveLength(0);

    slide
      .find('Component3')
      .find('.slideToRight')
      .simulate('click');
    // slides rendered are not unmounted
    slide = wrapper.find('Slide');
    expect(slide).toHaveLength(3);
    expect(wrapper.find(`.${Styles.view}`)).toHaveLength(1);
    expect(wrapper.find(`.${Styles.viewLeft}`)).toHaveLength(1);
    expect(wrapper.find(`.${Styles.viewRight}`)).toHaveLength(1);
  });
});
