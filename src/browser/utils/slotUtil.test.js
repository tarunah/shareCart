import { expect } from 'chai';
import { getSelectedSlotDateTime } from './slotUtil';

describe('Slot util', () => {
  const stp = "{ 'sl': { 'st': 1535353692700, 'et': 1535360913116 } }";
  window._checkout_ = {
    __myx_env__: { cookie: { prefix: '' } }
  };

  it('should not show slot', () => {
    document.cookie = '';
    const slotDetails = getSelectedSlotDateTime();
    expect(slotDetails).to.equal('');
  });

  it('should show slot', () => {
    document.cookie = `stp="${stp}"`;
    const slotDetails = getSelectedSlotDateTime();
    expect(slotDetails).to.equal('12:38PM-2:38PM on 27 Aug');
  });
});
