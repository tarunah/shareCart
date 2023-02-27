import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import CashbackMsg from './CashbackMsg';

describe('Cashback Msg test ', () => {
  it('if it renders properly', () => {
    const data = {
      data: {
        state: {
          currentRetryCount: 0,
          icb: {
            code: null,
            message: 'icb msg',
            show: false,
            error: null
          },
          deff: {
            show: true,
            message: 'deff msg'
          }
        },
        icbRetryCount: 0,
        onClickEligibility: sinon.spy()
      }
    };
    let wrapper = shallow(<CashbackMsg data={data} />);
    expect(wrapper.find('.cashbackMessage').length).toBe(1);
    expect(wrapper.find('.cashbackMessage').text()).toBe('deff msg');

    data.data.state.icb.show = true;
    data.data.state.icb.code = '123';

    wrapper = shallow(<CashbackMsg data={data} />);
    expect(wrapper.find('.cashbackInfo').length).toBe(1);

    data.data.state.icb.code = '';
    wrapper = shallow(<CashbackMsg data={data} />);
    expect(wrapper.find('.cashbackMessage').length).toBe(1);
    expect(wrapper.find('.cashbackMessage').text()).toBe('icb msg');

    data.data.state.icb.error = true;

    wrapper = shallow(<CashbackMsg data={data} />);
    expect(wrapper.find('.cashbackError').length).toBe(1);
    expect(
      wrapper
        .find('.cashbackError')
        .childAt(0)
        .text()
    ).toBe(
      'Could not check the discount amount for this card. Please check again.'
    );

    expect(wrapper.find('.retryBtn').length).toBe(1);
    expect(
      wrapper
        .find('.retryBtn')
        .childAt(0)
        .text()
    ).toBe(' Check Offer Eligibility');
    wrapper.find('.retryBtn').simulate('click');
    expect(data.data.onClickEligibility.callCount).toBe(1);

    data.data.state.currentRetryCount = 10;
    wrapper = shallow(<CashbackMsg data={data} />);

    expect(wrapper.text()).toBe(
      'Can not check for bank discount eligibility, please retry after 30 minutes. T&C Apply'
    );
  });
});
