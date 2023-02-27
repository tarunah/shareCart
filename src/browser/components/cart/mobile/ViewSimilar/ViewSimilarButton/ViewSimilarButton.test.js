import React from 'react';
import { mount } from 'enzyme';
import { screen } from '@testing-library/react';
import ViewSimilarButton from '.';

describe('<ViewSimilarButton />', () => {
  const handleOnClick = jest.fn();

  it('should show content', () => {
    const wrapper = mount(<ViewSimilarButton onClick={handleOnClick} />);
    expect(wrapper.find('.button').text()).toContain('VIEW SIMILAR');
  });
  it('should call onClickHandler', () => {
    const wrapper = mount(<ViewSimilarButton onClick={handleOnClick} />);
    wrapper.find('.button').simulate('click');
    expect(handleOnClick).toHaveBeenCalledTimes(1);
  });
});
