import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import ItemArrivalInfo from './ItemArrivalInfo';
import { formatDateFromEpoch } from './util';

describe('Test ItemArrivalInfo Components', () => {
  const showDetails = sinon.spy();
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

  it('should test if the component is rendered properly', () => {
    const date = formatDateFromEpoch(
      serviceabilityData[0].shippingEstimates.find(
        entry => entry.shippingMethod === 'NORMAL'
      ).promiseDate
    );
    const wrapper = shallow(
      <ItemArrivalInfo
        serviceabilityData={serviceabilityData}
        showDetails={showDetails}
      />
    );

    const hasMultipleItems = serviceabilityData.length > 1;
    const singleItemInfo = 'Get it by';
    const multipleItemsInfo = 'Items will start arriving from';
    const arrivalInfoTxt = hasMultipleItems
      ? multipleItemsInfo
      : singleItemInfo;
    const finalTxt = `${arrivalInfoTxt} ${date}`;
    expect(wrapper.find('MiniHeaderNav').exists()).toBe(true);
    expect(wrapper.find('.arrivalInfoWrapper').length).toBe(1);
    wrapper.find('.arrivalInfoWrapper').simulate('click');
    expect(showDetails.callCount).toBe(1);
    expect(wrapper.find('.arrivalInfo').length).toBe(1);
    expect(
      wrapper
        .find('.arrivalInfo')
        .childAt(0)
        .text()
    ).toBe(finalTxt);
    expect(wrapper.find('.rightArrow').length).toBe(1);
  });
});
