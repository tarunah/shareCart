import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import { CART_INSIDER_REWARDS as Strings } from 'commonBrowserUtils/Strings';

import InsiderTierProgress from './index.js';

describe('should test upgrade and close to upgrade scenarios', () => {
  window.triggerEvent = () => {};
  describe('should test upgrade scenario', () => {
    let selectedProducts, insiderDetails;
    beforeEach(() => {
      selectedProducts = [{ price: { mrp: 3000 } }, { price: { mrp: 7000 } }];
      insiderDetails = {
        data: {
          tierProgressInfo: {
            tierName: 'Select',
            tierProgressPercent: 10,
            requiredAmountToUpgradeToElite: 9000,
            requiredAmountToUpgradeToIcon: 34000
          }
        }
      };
    });

    it('select -> elite', () => {
      const wrapper = mount(
        <InsiderTierProgress
          selectedProducts={selectedProducts}
          insiderDetails={insiderDetails}
        />
      );
      expect(wrapper.find('Confetti').isEmptyRender()).to.equal(false);

      const upgradeMsg = Strings.UPGRADE_MSG.replace('<tier>', 'ELITE');
      expect(wrapper.find('.upgradeMsg').text()).to.equal(upgradeMsg);

      expect(wrapper.find('TierProgressBar').isEmptyRender()).to.equal(false);

      expect(wrapper.find('.viewBenefits').text()).to.equal('View Benefits');

      const modalTitle = Strings.BENEFITS_MODAL_TITLE.replace(
        '<tier>',
        'ELITE'
      );
      expect(wrapper.find('BenefitsModal').isEmptyRender()).to.equal(true);
      wrapper.find('.viewBenefits').simulate('click');
      expect(wrapper.find('BenefitsModal .title').text()).to.equal(modalTitle);
      wrapper
        .find('BenefitsModal')
        .find('.closeIcon')
        .at(0)
        .simulate('click');
      expect(wrapper.find('BenefitsModal').isEmptyRender()).to.equal(true);
    });

    it('elite -> icon', () => {
      insiderDetails.data.tierProgressInfo = {
        tierName: 'Elite',
        tierProgressPercent: 10,
        requiredAmountToUpgradeToElite: 0,
        requiredAmountToUpgradeToIcon: 10000
      };

      const wrapper = mount(
        <InsiderTierProgress
          selectedProducts={selectedProducts}
          insiderDetails={insiderDetails}
        />
      );
      expect(wrapper.find('Confetti').isEmptyRender()).to.equal(false);

      const upgradeMsg = Strings.UPGRADE_MSG.replace('<tier>', 'ICON');
      expect(wrapper.find('.upgradeMsg').text()).to.equal(upgradeMsg);

      expect(wrapper.find('TierProgressBar').isEmptyRender()).to.equal(false);

      expect(wrapper.find('.viewBenefits').text()).to.equal('View Benefits');

      const modalTitle = Strings.BENEFITS_MODAL_TITLE.replace('<tier>', 'ICON');
      expect(wrapper.find('BenefitsModal').isEmptyRender()).to.equal(true);
      wrapper.find('.viewBenefits').simulate('click');
      expect(wrapper.find('BenefitsModal .title').text()).to.equal(modalTitle);
      wrapper
        .find('BenefitsModal')
        .find('.closeIcon')
        .at(0)
        .simulate('click');
      expect(wrapper.find('BenefitsModal').isEmptyRender()).to.equal(true);
    });

    it('select -> icon', () => {
      insiderDetails.data.tierProgressInfo = {
        tierName: 'Select',
        tierProgressPercent: 10,
        requiredAmountToUpgradeToElite: 0,
        requiredAmountToUpgradeToIcon: 10000
      };

      const wrapper = mount(
        <InsiderTierProgress
          selectedProducts={selectedProducts}
          insiderDetails={insiderDetails}
        />
      );
      expect(wrapper.find('Confetti').isEmptyRender()).to.equal(false);

      const upgradeMsg = Strings.UPGRADE_MSG.replace('<tier>', 'ICON');
      expect(wrapper.find('.upgradeMsg').text()).to.equal(upgradeMsg);

      expect(wrapper.find('TierProgressBar').isEmptyRender()).to.equal(false);

      expect(wrapper.find('.viewBenefits').text()).to.equal('View Benefits');

      const modalTitle = Strings.BENEFITS_MODAL_TITLE.replace('<tier>', 'ICON');
      expect(wrapper.find('BenefitsModal').isEmptyRender()).to.equal(true);
      wrapper.find('.viewBenefits').simulate('click');
      expect(wrapper.find('BenefitsModal .title').text()).to.equal(modalTitle);
      wrapper
        .find('BenefitsModal')
        .find('.closeIcon')
        .at(0)
        .simulate('click');
      expect(wrapper.find('BenefitsModal').isEmptyRender()).to.equal(true);
    });
  });

  describe('should test close to upgrade scenario', () => {
    let selectedProducts, insiderDetails;
    beforeEach(() => {
      selectedProducts = [{ price: { mrp: 3000 } }, { price: { mrp: 7000 } }];
      insiderDetails = {
        data: {
          tierProgressInfo: {
            tierName: 'Select',
            tierProgressPercent: 10,
            requiredAmountToUpgradeToElite: 11000,
            requiredAmountToUpgradeToIcon: 34000
          }
        }
      };
    });

    it('select -> elite', () => {
      const wrapper = mount(
        <InsiderTierProgress
          selectedProducts={selectedProducts}
          insiderDetails={insiderDetails}
        />
      );
      expect(wrapper.find('Confetti').exists()).to.equal(false);

      const upgradeMsg = Strings.CLOSE_TO_UPGRADE_MSG;
      expect(wrapper.find('.upgradeMsg').text()).to.equal(upgradeMsg);

      expect(wrapper.find('TierProgressBar').isEmptyRender()).to.equal(false);

      expect(wrapper.find('.viewBenefits').text()).to.equal('View Benefits');

      const modalTitle = Strings.BENEFITS_MODAL_TITLE.replace(
        '<tier>',
        'ELITE'
      );
      expect(wrapper.find('BenefitsModal').isEmptyRender()).to.equal(true);
      wrapper.find('.viewBenefits').simulate('click');
      expect(wrapper.find('BenefitsModal .title').text()).to.equal(modalTitle);
      wrapper
        .find('BenefitsModal')
        .find('.closeIcon')
        .at(0)
        .simulate('click');
      expect(wrapper.find('BenefitsModal').isEmptyRender()).to.equal(true);
    });

    it('elite -> icon', () => {
      insiderDetails.data.tierProgressInfo = {
        tierName: 'Elite',
        tierProgressPercent: 10,
        requiredAmountToUpgradeToElite: 0,
        requiredAmountToUpgradeToIcon: 11000
      };

      const wrapper = mount(
        <InsiderTierProgress
          selectedProducts={selectedProducts}
          insiderDetails={insiderDetails}
        />
      );
      expect(wrapper.find('Confetti').exists()).to.equal(false);

      const upgradeMsg = Strings.CLOSE_TO_UPGRADE_MSG;
      expect(wrapper.find('.upgradeMsg').text()).to.equal(upgradeMsg);

      expect(wrapper.find('TierProgressBar').isEmptyRender()).to.equal(false);

      expect(wrapper.find('.viewBenefits').text()).to.equal('View Benefits');

      const modalTitle = Strings.BENEFITS_MODAL_TITLE.replace('<tier>', 'ICON');
      expect(wrapper.find('BenefitsModal').isEmptyRender()).to.equal(true);
      wrapper.find('.viewBenefits').simulate('click');
      expect(wrapper.find('BenefitsModal .title').text()).to.equal(modalTitle);
      wrapper
        .find('BenefitsModal')
        .find('.closeIcon')
        .at(0)
        .simulate('click');
      expect(wrapper.find('BenefitsModal').isEmptyRender()).to.equal(true);
    });
  });
});
