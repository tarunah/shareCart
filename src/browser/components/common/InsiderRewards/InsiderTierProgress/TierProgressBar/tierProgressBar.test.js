import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';

import { SCENARIOS } from '../utils';
import TierProgressBar from './index';

describe('should test upgrade and close to upgrade scenarios', () => {
  describe('should test upgrade scenario', () => {
    let props;
    beforeEach(() => {
      props = {
        upgradeTierIndex: 1,
        tierNames: ['Select', 'Elite', 'Icon'],
        scenario: SCENARIOS.UPGRADE,
        currentProgressPercent: 20,
        purchaseProgressPercent: 30,
        upgradeAmount: 1000
      };
    });

    it('upgrade to elite', () => {
      const wrapper = mount(<TierProgressBar {...props} />);
      const progressContainer = wrapper.find(
        'TierProgressBar .progressContainer'
      );
      expect(progressContainer.isEmptyRender()).to.equal(false);

      const curProgBar = progressContainer.find('.currentProgressBar');
      expect(curProgBar.isEmptyRender()).to.equal(false);
      expect(curProgBar.prop('style')).to.have.property('width', '20%');

      const purchaseProgBar = progressContainer.find('.purchaseProgressBar');
      expect(purchaseProgBar.isEmptyRender()).to.equal(false);
      expect(purchaseProgBar.prop('style')).to.have.property('width', '30%');

      expect(wrapper.find('TierProgressBar TierDetails')).to.have.lengthOf(3);

      const firstTier = wrapper.find('TierDetails').at(0);
      expect(firstTier.find('.tierName.checkedTierName').text()).to.equal(
        'Select'
      );
      expect(firstTier.find('TierCheck').isEmptyRender()).to.equal(false);

      const secondTier = wrapper.find('TierDetails').at(1);
      expect(
        secondTier.find('.tierName.checkedTierName.upgradeTierName').text()
      ).to.equal('Elite');
      expect(
        secondTier.find('.upgradedTier TierCheck').isEmptyRender()
      ).to.equal(false);

      const thirdTier = wrapper.find('TierDetails').at(2);
      expect(thirdTier.find('.tierName').text()).to.equal('Icon');
      expect(thirdTier.find('.uncheckedTier').isEmptyRender()).to.equal(false);
      expect(thirdTier.find('InsiderLogoNew').isEmptyRender()).to.equal(false);
      expect(
        thirdTier.find('InsiderLogoNew .insiderLogo').isEmptyRender()
      ).to.equal(false);
    });

    it('upgrade to icon', () => {
      props.upgradeTierIndex = 2;
      props.currentProgressPercent = 60;
      props.purchaseProgressPercent = 40;

      const wrapper = mount(<TierProgressBar {...props} />);
      const progressContainer = wrapper.find(
        'TierProgressBar .progressContainer'
      );
      expect(progressContainer.isEmptyRender()).to.equal(false);

      const curProgBar = progressContainer.find('.currentProgressBar');
      expect(curProgBar.isEmptyRender()).to.equal(false);
      expect(curProgBar.prop('style')).to.have.property('width', '60%');

      const purchaseProgBar = progressContainer.find('.purchaseProgressBar');
      expect(purchaseProgBar.isEmptyRender()).to.equal(false);
      expect(purchaseProgBar.prop('style')).to.have.property('width', '40%');

      expect(wrapper.find('TierProgressBar TierDetails')).to.have.lengthOf(3);

      const firstTier = wrapper.find('TierDetails').at(0);
      expect(firstTier.find('.tierName.checkedTierName').text()).to.equal(
        'Select'
      );
      expect(firstTier.find('TierCheck').isEmptyRender()).to.equal(false);

      const secondTier = wrapper.find('TierDetails').at(1);
      expect(secondTier.find('.tierName.checkedTierName').text()).to.equal(
        'Elite'
      );
      expect(secondTier.find('TierCheck').isEmptyRender()).to.equal(false);

      const thirdTier = wrapper.find('TierDetails').at(2);
      expect(
        thirdTier.find('.tierName.checkedTierName.upgradeTierName').text()
      ).to.equal('Icon');
      expect(
        thirdTier.find('.upgradedTier TierCheck').isEmptyRender()
      ).to.equal(false);
      expect(thirdTier.find('InsiderLogoNew').isEmptyRender()).to.equal(false);
      expect(thirdTier.find('InsiderLogoNew .insiderLogo').exists()).to.equal(
        false
      );
    });
  });

  describe('should test close to upgrade scenario', () => {
    let props;
    beforeEach(() => {
      props = {
        upgradeTierIndex: 1,
        tierNames: ['Select', 'Elite', 'Icon'],
        scenario: SCENARIOS.CLOSE_TO_UPGRADE,
        currentProgressPercent: 20,
        purchaseProgressPercent: 10,
        upgradeAmount: 1000
      };
    });

    it('close to upgrade to elite', () => {
      const wrapper = mount(<TierProgressBar {...props} />);
      const progressContainer = wrapper.find(
        'TierProgressBar .progressContainer'
      );
      expect(progressContainer.isEmptyRender()).to.equal(false);

      const curProgBar = progressContainer.find('.currentProgressBar');
      expect(curProgBar.isEmptyRender()).to.equal(false);
      expect(curProgBar.prop('style')).to.have.property('width', '20%');

      const purchaseProgBar = progressContainer.find('.purchaseProgressBar');
      expect(purchaseProgBar.isEmptyRender()).to.equal(false);
      expect(purchaseProgBar.prop('style')).to.have.property('width', '10%');

      expect(wrapper.find('TierProgressBar TierDetails')).to.have.lengthOf(3);

      const firstTier = wrapper.find('TierDetails').at(0);
      expect(firstTier.find('.tierName.checkedTierName').text()).to.equal(
        'Select'
      );
      expect(firstTier.find('TierCheck').isEmptyRender()).to.equal(false);

      const secondTier = wrapper.find('TierDetails').at(1);
      expect(secondTier.find('.tierName.upgradeTierName').text()).to.equal(
        'Elite'
      );
      expect(secondTier.find('.uncheckedTier').isEmptyRender()).to.equal(false);
      expect(secondTier.find('.upgradeAmtText').text()).to.equal(
        'Shop for1000 more'
      );

      const thirdTier = wrapper.find('TierDetails').at(2);
      expect(thirdTier.find('.tierName').text()).to.equal('Icon');
      expect(thirdTier.find('.uncheckedTier').isEmptyRender()).to.equal(false);
      expect(thirdTier.find('InsiderLogoNew').isEmptyRender()).to.equal(false);
      expect(
        thirdTier.find('InsiderLogoNew .insiderLogo').isEmptyRender()
      ).to.equal(false);
    });

    it('close to upgrade to icon', () => {
      props.upgradeTierIndex = 2;
      props.currentProgressPercent = 60;
      props.purchaseProgressPercent = 30;

      const wrapper = mount(<TierProgressBar {...props} />);
      const progressContainer = wrapper.find(
        'TierProgressBar .progressContainer'
      );
      expect(progressContainer.isEmptyRender()).to.equal(false);

      const curProgBar = progressContainer.find('.currentProgressBar');
      expect(curProgBar.isEmptyRender()).to.equal(false);
      expect(curProgBar.prop('style')).to.have.property('width', '60%');

      const purchaseProgBar = progressContainer.find('.purchaseProgressBar');
      expect(purchaseProgBar.isEmptyRender()).to.equal(false);
      expect(purchaseProgBar.prop('style')).to.have.property('width', '30%');

      expect(wrapper.find('TierProgressBar TierDetails')).to.have.lengthOf(3);

      const firstTier = wrapper.find('TierDetails').at(0);
      expect(firstTier.find('.tierName.checkedTierName').text()).to.equal(
        'Select'
      );
      expect(firstTier.find('TierCheck').isEmptyRender()).to.equal(false);

      const secondTier = wrapper.find('TierDetails').at(1);
      expect(secondTier.find('.tierName.checkedTierName').text()).to.equal(
        'Elite'
      );
      expect(secondTier.find('TierCheck').isEmptyRender()).to.equal(false);

      const thirdTier = wrapper.find('TierDetails').at(2);
      expect(thirdTier.find('.tierName.upgradeTierName').text()).to.equal(
        'Icon'
      );
      expect(thirdTier.find('.uncheckedTier').isEmptyRender()).to.equal(false);
      expect(thirdTier.find('InsiderLogoNew').isEmptyRender()).to.equal(false);
      expect(thirdTier.find('InsiderLogoNew .insiderLogo').exists()).to.equal(
        false
      );
      expect(thirdTier.find('.upgradeAmtText').text()).to.equal(
        'Shop for1000 more'
      );
    });
  });
});
