import React from 'react';
import { mount } from 'enzyme';
import OptionsContainer from './';
import sinon from 'sinon';

describe('Options Container', () => {
  it('should render its children with render prop', () => {
    const testFunc = sinon.spy();

    mount(<OptionsContainer render={testFunc} />);

    expect(testFunc.called).toBe(true);
  });
});
