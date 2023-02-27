import React from 'react';
import { mount } from 'enzyme';
import MKWStrip from './';
import sinon from 'sinon';

describe('MKWStrip', () => {
  window.triggerEvent = sinon.spy();

  it('should display MWK strip if it is present in switch', () => {
    const wrapper = mount(
      <MKWStrip
        shopMorePillsData={[
          {
            id: 1,
            tag: 'Men',
            link: '/shop/men'
          }
        ]}
      />
    );
    expect(wrapper.find('.shopMore').length).toBe(1);
  });

  it('should display the correct tag in MWK strip', () => {
    const wrapper = mount(
      <MKWStrip
        shopMorePillsData={[
          {
            id: 1,
            tag: 'Men',
            link: '/shop/men'
          }
        ]}
      />
    );
    expect(wrapper.text()).toBe('Men');
  });

  it('should display Continue Shopping button if MWK strip is absent in switch', () => {
    const wrapper = mount(<MKWStrip shopMorePillsData={[]} />);
    expect(wrapper.find('.continueButton').length).toBe(1);
  });
});
