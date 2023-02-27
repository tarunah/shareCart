import React from 'react';
import { mount } from 'enzyme';
import TabBar, { Tab } from './';

describe('Tab bar', () => {
  it('Tab bar displays contents properly', () => {
    const CreditContent = () => <div>Credit Card</div>;
    const CODContent = () => <div>Cash On Delivery</div>;
    const wrapper = mount(
      <TabBar defaultSelect={true} mode="desktop" className="tabBarBlock">
        <Tab
          id="cod"
          display="COD"
          content={<CODContent />}
          show={true}
          instrumentData={{ code: '3000' }}
        />
        <Tab
          id="card"
          display="CREDIT/DEBIT CARD"
          content={<CreditContent />}
          show={true}
        />
      </TabBar>
    );

    expect(wrapper.find('.tabBarBlock').length).toBe(2);
    expect(wrapper.find('#cod').text()).toBe('COD');
    expect(wrapper.find('#card').text()).toBe('CREDIT/DEBIT CARD');
    expect(wrapper.find('.contentBlock').text()).toBe('Cash On Delivery');

    wrapper.find('#card').simulate('click');

    expect(wrapper.find('.contentBlock').text()).toBe('Credit Card');
  });

  it('Tab bar should not display tab if show is false', () => {
    const CreditContent = () => <div>Credit Card</div>;
    const CODContent = () => <div>Cash On Delivery</div>;
    const wrapper = mount(
      <TabBar defaultSelect={true} mode="desktop" className="tabBarBlock">
        <Tab id="cod" display="COD" content={<CODContent />} show={false} />
        <Tab
          id="card"
          display="CREDIT/DEBIT CARD"
          content={<CreditContent />}
          show={true}
        />
      </TabBar>
    );
    expect(wrapper.find('#cod').length).toBe(0);
    expect(wrapper.find('#card').length).toBe(1);
    expect(wrapper.find('.contentBlock').text()).toBe('Credit Card');
  });
});
