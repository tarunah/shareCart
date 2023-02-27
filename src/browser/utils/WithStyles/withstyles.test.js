import React from 'react';
import { shallow } from 'enzyme';
import WithStyles from './';

describe('WithStyles HOC', () => {
  it('should apply styles to the component', () => {
    const mockStyles = { div: 'div' };
    const Component = ({ styles }) => <div className={styles.div} />;
    const ComponentWithStyles = WithStyles(mockStyles)(Component);

    const wrapper = shallow(ComponentWithStyles);

    expect(wrapper.find('.div')).toHaveLength(1);
  });
});
