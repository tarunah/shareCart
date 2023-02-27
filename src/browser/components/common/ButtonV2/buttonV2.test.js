import React from 'react';
import { shallow } from 'enzyme';

import sinon from 'sinon';

import ButtonV2 from './';

import Styles from './buttonV2.base.css';

describe('Button With Loader Component', () => {
  let onClickFunc, stopPropagation;
  beforeEach(() => {
    onClickFunc = sinon.spy();
    stopPropagation = () => {};
  });

  it('should render the text and perform click action if isLoading is false', () => {
    const wrapper = shallow(
      <ButtonV2 isLoading={false} onClick={onClickFunc} text={'text'} />
    );
    const button = wrapper.find(`.${Styles.button}`);
    expect(button.text()).toBe('text');
    expect(wrapper.find(`.${Styles.loading}`)).toHaveLength(0);
    expect(wrapper.find(`.${Styles.loader}`)).toHaveLength(0);
    button.simulate('click', {
      stopPropagation: stopPropagation
    });
    expect(onClickFunc).toHaveProperty('callCount', 1);
  });

  it('should not render the text and not perform click action if isLoading is true', () => {
    const wrapper = shallow(
      <ButtonV2 isLoading onClick={onClickFunc} text={'text'} />
    );
    const button = wrapper.find(`.${Styles.button}`);
    expect(button.text()).toBe('');
    expect(wrapper.find(`.${Styles.loading}`)).toHaveLength(1);
    expect(wrapper.find(`.${Styles.loader}`)).toHaveLength(1);
    button.simulate('click', {
      stopPropagation: stopPropagation
    });
    expect(onClickFunc).toHaveProperty('callCount', 0);
  });
});
