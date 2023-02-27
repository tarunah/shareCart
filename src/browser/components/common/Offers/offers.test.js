import React from 'react';
import { mount } from 'enzyme';
import Offers from '.';

const data = {
  title: 'Test Title',
  messages: [
    {
      message:
        'Get Rs 100 discount on HDFC Bank Credit/Debit cards on minimum purchase of Rs 3000',
      minThreshold: 3000,
      highlightedText: 'Rs 100 off',
      personalizedMessage:
        'Shop for {threshold} more to get {highlightedText} Instant Discount on HDFC Bank Credit/Debit cards. TCA'
    },
    {
      message: '10% SuperCash on MobiKwik wallet. TCA'
    },
    {
      message: 'Flat Rs 200 Cashback on Airtel Payments Bank. TCA'
    }
  ],
  enabled: true,
  defaultMessageCount: 1
};

describe('<Offers /> common component:', () => {
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
    expect(wrapper.find('ChevronDown').exists()).toBe(true);
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
    expect(wrapper.find('ChevronUp').exists()).toBe(true);
  });

  it('not enabled component', () => {
    const wrapper = mount(<Offers messages={data.messages} enabled={false} />);
    expect(wrapper.find('.container').length).toBe(0);
  });
});
