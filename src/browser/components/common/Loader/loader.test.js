import React from 'react';
import { shallow } from 'enzyme';
import Loader from './';

describe('Loader', () => {
  it('should display Loader Component', () => {
    const wrapper = shallow(<Loader show={true} backdrop={true} />);

    expect(wrapper.find('.backdrop')).toHaveLength(1);
    expect(wrapper.find('.spinner')).toHaveLength(1);
  });

  it('should not display Loader Component', () => {
    const wrapper = shallow(<Loader show={false} backdrop={true} />);

    expect(wrapper.find('.backdrop')).toHaveLength(0);
    expect(wrapper.find('.spinner')).toHaveLength(0);
  });
});
