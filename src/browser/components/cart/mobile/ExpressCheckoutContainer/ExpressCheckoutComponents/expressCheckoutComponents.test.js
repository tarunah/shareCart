import sinon from 'sinon';
import { shallow } from 'enzyme';
import React from 'react';
import { ArrivalDetails, DetailedComponent, MiniHeaderNav } from './index';
import { formatDateFromEpoch } from '../util';

describe('Test Express Checkout Components', () => {
  const serviceabilityData = [
    {
      id: 1640043330,
      image: {
        src:
          'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/6832903/2018/11/7/f211f29f-1794-4031-b6f3-127d4e2315ef1541585286989-WROGN-Men-Sweatshirts-4241541585286863-1.jpg',
        secureSrc:
          'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/6832903/2018/11/7/f211f29f-1794-4031-b6f3-127d4e2315ef1541585286989-WROGN-Men-Sweatshirts-4241541585286863-1.jpg'
      },
      tryNBuyInfo: {
        enabled: true,
        opted: false,
        serviceable: true
      },
      shippingEstimates: [
        {
          shippingMethod: 'NORMAL',
          promiseDate: '1640385000000',
          orderBy: '1640174400000'
        }
      ]
    }
  ];

  it('should check ArrivalDetails component', () => {
    const wrapper = shallow(<ArrivalDetails list={serviceabilityData} />);
    const date = formatDateFromEpoch(
      serviceabilityData[0].shippingEstimates.find(
        entry => entry.shippingMethod === 'NORMAL'
      ).promiseDate
    );
    expect(wrapper.find('.arrivalList').length).toBe(1);
    expect(wrapper.find('.arrivalItem').length).toBe(1);
    expect(wrapper.find('.itemImg').length).toBe(1);
    expect(wrapper.find('.arrivalItem').text()).toContain(
      `Estimated Delivery: ${date}`
    );
    expect(wrapper.find('Image').prop('src')).toEqual(
      serviceabilityData[0].image.secureSrc
    );
  });

  it('should check MiniHeaderNav', () => {
    const action = sinon.spy();
    const wrapper = shallow(
      <MiniHeaderNav header={'Address'} link={'Edit'} action={action} />
    );

    expect(wrapper.find('.headerNav').length).toBe(1);
    expect(
      wrapper
        .find('.headerNav')
        .childAt(0)
        .text()
    ).toBe('Address');
    expect(wrapper.find('.actionLink').length).toBe(1);
    expect(wrapper.find('.actionLink').text()).toBe('Edit');
    wrapper.find('.actionLink').simulate('click');
    expect(action.callCount).toBe(1);
  });
});
