import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import get from 'lodash/get';

import { checkoutPage } from 'commonUtils/constants';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import CartManager from 'commonBrowserUtils/CartManager';
import { getSubTotal } from 'commonBrowserUtils/CartHelper';
import { isReturnAbuser } from 'commonBrowserUtils/Helper';

import {
  InsiderToolTip,
  InsiderRewardsText,
  InsiderRewardsTextV2,
  EarlyAccessText,
  InsiderTrialUserProgress
} from './Components';

import {
  getToolTipText,
  getCachedInsiderData,
  cacheInsiderData,
  triggerInViewPort
} from 'commonComp/InsiderRewards/Util';

import InsiderLogoNew from 'iconComp/InsiderLogoNew.jsx';

import Styles from './insiderRewards.base.css';
import InsiderTierProgress from './InsiderTierProgress';

const methods = ['getInsiderDetails', 'getInsiderData', 'setReference'];

class InsiderRewards extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      orderPointsData: null,
      insiderDetails: {}
    };

    methods.forEach(method => {
      this[method] = this[method].bind(this);
    });

    const _isReturnAbuser = isReturnAbuser(
      get(this.props.cartData, 'userDetails.returnAbuser')
    );

    this.myntraInsiderConfig = getKVPairValue('MYNTRA_INSIDER');
    this.insiderProgressEnabled =
      !_isReturnAbuser && isFeatureEnabled('CART_INSIDER_PROGRESS');
    this.isAcceleratedEarningsEnabled = isFeatureEnabled(
      'CART_INSIDER_ACCELERATED_EARNINGS'
    );
    this.insiderTrialsEnabled = isFeatureEnabled('CHECKOUT_INSIDER_TRIAL');
  }

  componentDidMount() {
    this.getInsiderData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.cartData.modifiedAt !== prevProps.cartData.modifiedAt) {
      this.getInsiderData();
    }
  }

  getInsiderPayloadData() {
    const selectedProducts = get(this.props, 'selectedProducts', []);

    return {
      itemEntries: selectedProducts.map(product => ({
        styleId: product.id,
        skuId: product.skuId || '',
        amount: getSubTotal(product)
      }))
    };
  }

  getInsiderData() {
    const productEntries = this.getInsiderPayloadData();
    const cachedData = getCachedInsiderData(productEntries);
    const shouldRequestInsiderDetailsData =
      (this.insiderTrialsEnabled || this.insiderProgressEnabled) &&
      Object.keys(this.state.insiderDetails || {}).length <= 0;

    if (cachedData) {
      this.getInsiderDetails(cachedData, true);
    } else {
      const promises = [
        new Promise((resolve, reject) =>
          CartManager.getPointsForItems(productEntries, resolve, reject)
        ),
        shouldRequestInsiderDetailsData
          ? new Promise((resolve, reject) =>
              CartManager.getInsiderDetails(resolve, reject)
            )
          : Promise.resolve(this.state.insiderDetails)
      ];
      Promise.all(promises)
        .then(data => ({
          orderPointsData: data[0],
          insiderDetails: data[1]
        }))
        .then(this.getInsiderDetails)
        .catch(() => {});
    }
  }

  getInsiderDetails(data, fromCache = false) {
    if (!fromCache) {
      const productEntries = this.getInsiderPayloadData();
      cacheInsiderData(productEntries, data);
    }
    const { orderPointsData, insiderDetails } = data || {};
    const {
      enrolmentStatus,
      totalPoints = 0,
      isSupercoinEnabled,
      tierName,
      supercoinsMultiplier
    } = orderPointsData || {};
    const isInsider = enrolmentStatus === 'ENROLLED';
    const showInsiderRewards = totalPoints > 0 && isInsider;
    this.setState({
      orderPointsData: {
        isInsider,
        insiderPoints: totalPoints,
        showInsiderRewards,
        isSupercoinEnabled,
        tierName,
        supercoinsMultiplier
      },
      insiderDetails
    });
    showInsiderRewards &&
      triggerEvent('INSIDER_REWARDS_WIDGET_LOAD', {
        custom: {
          custom: {
            v1: isInsider
          },
          widget: { name: 'insider widget' },
          widget_items: { name: totalPoints }
        }
      });
  }

  setReference(node) {
    if (!window.IntersectionObserver) return;

    const observer = new window.IntersectionObserver(
      (entries, observer) => {
        const entry = entries[0];
        if (entry.isIntersecting && entry.intersectionRatio === 1) {
          const mrp = get(this.props.cartData, 'price.mrp');
          triggerInViewPort(this.state.orderPointsData, mrp);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px 0px -80px 0px',
        // 80px because of sticky place order button
        threshold: 1
      }
    );
    node && observer.observe(node);
  }

  render() {
    const { orderPointsData, insiderDetails } = this.state;

    const {
      isInsider,
      isSupercoinEnabled,
      insiderPoints,
      showInsiderRewards = false,
      tierName,
      supercoinsMultiplier
    } = orderPointsData || {};

    const toolTipText = getToolTipText(
      isInsider,
      this.myntraInsiderConfig,
      isSupercoinEnabled
    );

    const mrp = get(this.props.cartData, 'price.mrp');
    const isTrialInsider =
      this.insiderTrialsEnabled &&
      get(insiderDetails, 'data.tierProgressInfo.isTrialUser', false);
    const showInsiderProgress =
      this.insiderProgressEnabled &&
      this.props.page === checkoutPage.CART &&
      !isTrialInsider;

    return (
      showInsiderRewards && (
        <div
          data-testid="insiderrewards"
          ref={
            this.props.page === checkoutPage.CART &&
            !this.insiderProgressEnabled
              ? this.setReference
              : // to fire events for the control bucket
                () => {}
          }
        >
          {this.isAcceleratedEarningsEnabled ? (
            <div
              className={`${Styles.insiderRewardsText} ${
                tierName === 'Icon' ? Styles.iconRewards : ''
              }`}
            >
              <InsiderRewardsTextV2
                points={insiderPoints}
                tooltip={
                  <InsiderToolTip
                    isInsider={isInsider}
                    toolTipText={toolTipText}
                    shouldTriggerEvent
                    tierName={tierName}
                    points={insiderPoints}
                  />
                }
                tierName={tierName}
                coinMultiplier={supercoinsMultiplier}
              />
              <EarlyAccessText cartData={this.props.cartData} />
              {isTrialInsider && (
                <InsiderTrialUserProgress
                  insiderDetails={insiderDetails}
                  cartData={this.props.cartData}
                />
              )}
            </div>
          ) : (
            <div className={Styles.borderContainer}>
              <div className={Styles.rewardsContainer}>
                <InsiderLogoNew className={Styles.insiderCrown} />
                <InsiderRewardsText
                  {...this.props}
                  points={insiderPoints}
                  isSupercoinEnabled={isSupercoinEnabled}
                  tooltip={
                    <InsiderToolTip
                      isInsider={isInsider}
                      toolTipText={toolTipText}
                    />
                  }
                />
              </div>
              {isTrialInsider && (
                <InsiderTrialUserProgress
                  insiderDetails={insiderDetails}
                  cartData={this.props.cartData}
                />
              )}
            </div>
          )}
          {showInsiderProgress && (
            <InsiderTierProgress
              selectedProducts={this.props.selectedProducts}
              insiderDetails={insiderDetails}
              points={insiderPoints}
              mrp={mrp}
            />
          )}
        </div>
      )
    );
  }
}

InsiderRewards.propTypes = {
  cartData: PropTypes.object,
  selectedProducts: PropTypes.array,
  page: PropTypes.string
};

export default InsiderRewards;
