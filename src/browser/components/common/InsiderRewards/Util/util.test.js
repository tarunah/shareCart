import React from 'react';

import { getToolTipText } from '../Util';

let insiderConfig = {
  toolTipTextInsider: 'insider',
  toolTipTextSuperCoin: 'supercoin'
};

describe('Insider Rewards Utils', () => {
  it('should return tool tip text correctly', () => {
    let toolTipText = getToolTipText(true, insiderConfig);
    expect(toolTipText).toEqual(insiderConfig.toolTipTextInsider);

    toolTipText = getToolTipText(true, insiderConfig, true);
    expect(toolTipText).toEqual(insiderConfig.toolTipTextSuperCoin);

    toolTipText = getToolTipText(false, insiderConfig);
    expect(toolTipText).toEqual('');
  });
});
