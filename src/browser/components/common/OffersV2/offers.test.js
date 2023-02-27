import React from 'react';
import { mount } from 'enzyme';
import Offers from '.';

const data = {
  title: 'Test Title',
  messages: [
    {
      message: '10% SuperCash on MobiKwik wallet. TCA',
      tnc: { text: 'T&C', url: 'https://www.myntra.com' }
    },
    {
      message: 'Flat Rs 200 Cashback on Airtel Payments Bank. TCA'
    },
    {
      message: 'Flat Rs 200 Cashback on Paytm Payments Bank. TCA'
    }
  ],
  enabled: true,
  defaultMessageCount: 1
};

describe('<Offers /> common component:', () => {
  window.triggerEvent = () => {};
  it('should load properly', () => {
    const wrapper = mount(
      <Offers
        title={data.title}
        messages={data.messages}
        enabled={data.enabled}
        defaultMessageCount={data.defaultMessageCount}
      />
    );

    expect(wrapper.find('.title').text()).toBe(data.title);
    expect(wrapper.find('.message').length).toBe(data.defaultMessageCount);
    expect(wrapper.state().expanded).toBeFalsy;
    expect(wrapper.find('.more').text()).toBe('Show More');
    expect(wrapper.find('ChevronDown.arrowIcon').exists()).toBe(true);
  });

  it('should show message count text in plural when showMessageCount=true and more than 2 offers are present', () => {
    const wrapper = mount(
      <Offers
        title={data.title}
        messages={data.messages}
        enabled={data.enabled}
        defaultMessageCount={data.defaultMessageCount}
        showMessageCount={true}
      />
    );

    expect(wrapper.find('.title').text()).toBe(data.title);
    expect(wrapper.find('.message').length).toBe(data.defaultMessageCount);
    expect(wrapper.state().expanded).toBeFalsy;
    expect(wrapper.find('.more').text()).toBe(
      `+${data.messages.length - data.defaultMessageCount} More Offers`
    );
    expect(wrapper.find('ChevronDown.arrowIcon').exists()).toBe(true);
  });

  it('should show message count text in singular when showMessageCount=true and 2 offers are present', () => {
    const wrapper = mount(
      <Offers
        title={data.title}
        messages={data.messages.slice(0, 2)}
        enabled={data.enabled}
        defaultMessageCount={data.defaultMessageCount}
        showMessageCount={true}
      />
    );

    expect(wrapper.find('.title').text()).toBe(data.title);
    expect(wrapper.find('.message').length).toBe(data.defaultMessageCount);
    expect(wrapper.state().expanded).toBeFalsy;
    expect(wrapper.find('.more').text()).toBe('+1 More Offer');
    expect(wrapper.find('ChevronDown.arrowIcon').exists()).toBe(true);
  });

  it('show the expanded view onToggle', () => {
    const wrapper = mount(
      <Offers
        title={data.title}
        messages={data.messages}
        enabled={data.enabled}
        defaultMessageCount={data.defaultMessageCount}
      />
    );

    expect(wrapper.find('.message').length).toBe(data.defaultMessageCount);
    const toggleText = wrapper.find('.more');
    toggleText.first().simulate('click');
    expect(wrapper.state().expanded).toBeTruthy;
    expect(wrapper.find('.message').length).toBe(data.messages.length);
    expect(wrapper.find('ChevronUp.arrowIcon').exists()).toBe(true);
  });

  it('show the expanded view onToggle', () => {
    const wrapper = mount(
      <Offers
        title={data.title}
        messages={data.messages}
        enabled={data.enabled}
        defaultMessageCount={data.defaultMessageCount}
      />
    );

    expect(wrapper.find('.message').length).toBe(data.defaultMessageCount);
    const toggleText = wrapper.find('.more');
    toggleText.first().simulate('click');
    expect(wrapper.state().expanded).toBeTruthy;
    expect(wrapper.find('.message').length).toBe(data.messages.length);
    expect(wrapper.find('ChevronUp.arrowIcon').exists()).toBe(true);
  });

  it('show the tnc text and open modal', () => {
    const wrapper = mount(
      <Offers
        title={data.title}
        messages={data.messages}
        enabled={data.enabled}
        defaultMessageCount={data.defaultMessageCount}
      />
    );

    expect(wrapper.find('.tncText').length).toBe(1);
    wrapper.find('.tncText').simulate('click');
    expect(wrapper.find('iframe').length).toBe(1);
    expect(wrapper.find('iframe').props().src).toBe('https://www.myntra.com');
  });

  it('not enabled component', () => {
    const wrapper = mount(<Offers messages={data.messages} enabled={false} />);
    expect(wrapper.find('.container').length).toBe(0);
  });

  it('should apply style overrides if passed in', () => {
    const wrapper = mount(
      <Offers
        {...data}
        styleOverrides={{
          defaultMessageStyle: 'test'
        }}
      />
    );

    expect(wrapper.find('li.message.test').length).toBe(1);
    wrapper.find('.more').simulate('click');
    expect(wrapper.find('li.message.test').length).toBe(0);
    expect(wrapper.find('li.message').length).toBe(data.messages.length);
  });
});
