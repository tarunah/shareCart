import React from 'react';
import { shallow } from 'enzyme';
import PayableAmount from './PayableAmount';
import ExpressConstants from './expressConstants';
const { PAYABLE_TXT } = ExpressConstants;

describe('Test ItemArrivalInfo Components', () => {
  it('should test if the component is rendered properly', () => {
    let wrapper = shallow(
      <PayableAmount finalAmount={1000} showPayable={true} />
    );

    expect(wrapper.find('.finalAmount').length).toBe(1);
    expect(wrapper.find('.finalAmount').text()).toBe(
      `${PAYABLE_TXT}: <RuppeBold />1,000 (Inc. of Tax)`
    );
  }),
    it('should not show final amount if showPayable is false', () => {
      let wrapper = shallow(
        <PayableAmount finalAmount={1000} showPayable={false} />
      );
      expect(wrapper.find('.finalAmount').length).toBe(0);
    });
});
