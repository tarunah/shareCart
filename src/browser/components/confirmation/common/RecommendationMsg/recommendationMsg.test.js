import React from 'react';
import { shallow } from 'enzyme';
import RecommendationMsg from '.';
import { getKVPairValue } from 'commonUtils/KVPairManager';

describe('Recommendation Section in mobile', () => {
  it('if recommendation message is displayed properly', () => {
    const msgHeading = getKVPairValue('CONFIRMATION_PROFILE_TAGGING')
      .recommendationMsgHeading;
    const msgSubText = getKVPairValue('CONFIRMATION_PROFILE_TAGGING')
      .recommendationMsgSubText;
    const wrapper = shallow(<RecommendationMsg showAllTaggedMessage={true} />);

    expect(wrapper.find('.allTaggedBlock').length).toBe(1);
    expect(wrapper.find('.mfaLogo').length).toBe(1);
    expect(wrapper.find('.thanksMessage').text()).toEqual(msgHeading);
    expect(wrapper.find('.thanksSubText').text()).toEqual(msgSubText);
  });

  it('if recommendation message is hidden after tagging', () => {
    const wrapper = shallow(<RecommendationMsg showAllTaggedMessage={false} />);
    expect(wrapper.find('.hidden').length).toBe(1);
  });
});
