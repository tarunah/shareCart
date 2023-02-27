import React from 'react';
import PropTypes from 'prop-types';
import ConfirmationManager from 'commonBrowserUtils/ConfirmationManager';
import get from 'lodash/get';
import Styles from './recommendations.base.css';
import { OrderedStyles, RecommendedStyles } from './recommendationComponents';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
import {
  EventsObj,
  getOrderObj,
  fillWithDummyOrders,
  redirectToPDP,
  filterGiftCard,
  filterRecommendations
} from './recommendationUtil';

const recommendationMethods = [
  'showRecommendation',
  'viewMore',
  'getOrderList',
  'updateRecommendationForStyle',
  'fetchAllRecommendations',
  'getAllRecommendations',
  'clearDummyOrders'
];

class Recommendations extends React.Component {
  constructor(props) {
    super(props);
    const dummyOrders = fillWithDummyOrders(3); // These are needed to show 3 empty circles during lazy load
    this.state = {
      recommendations: [],
      selectedStyle: null,
      loading: 'none', // -> 'first' -> 'remaining' -> 'resolved'
      allRecommendations: {},
      hasRecommendations: true,
      allOrders: [...dummyOrders] // These dummy values will eventaully get replaced with orders that have recommmendations
    };
    const { title, desc } = getGrowthHackConfigValue(
      'CONFIRMATION_CROSS_SELL_CONFIG'
    );
    recommendationMethods.forEach(
      method => (this[method] = this[method].bind(this))
    );
    this.title = title;
    this.desc = desc;
    this.orderList = this.getOrderList() || [];
  }

  componentDidMount() {
    this.orderList.length && this.getAllRecommendations(this.orderList);
  }

  getRecommendation(styleId) {
    return new Promise((resolve, reject) => {
      ConfirmationManager.getRecommendations(
        styleId,
        ({ related }) => {
          const products = (related[0] && related[0].products) || [];
          resolve({ id: styleId, products });
        },
        reject
      );
    }).catch(() => {
      return { id: styleId, products: [] }; // Allows promise.all to resolve
    });
  }

  getOrderList() {
    return get(this.props, 'dataState.data.productData.styles', []).filter(
      filterGiftCard
    );
  }

  updateRecommendationForStyle(styleId, recommendation, count) {
    const matchingOrder = this.orderList.filter(order => order.id === styleId);
    const orderObj = getOrderObj(matchingOrder[0]);
    this.setState(prevState => {
      let {
        allRecommendations,
        allOrders,
        recommendations,
        selectedStyle,
        loading
      } = prevState;
      const filteredRecommendation = filterRecommendations(recommendation);
      allRecommendations[styleId] = filteredRecommendation;
      if (!count) {
        EventsObj.triggerLoadEvent();
        loading = 'remaining';
      }
      allOrders[count] = orderObj; // Replaces dummyOrders with the right ones as API resolves
      return {
        ...prevState,
        recommendations: !count ? filteredRecommendation : recommendations,
        selectedStyle: !count ? styleId : selectedStyle,
        allRecommendations,
        allOrders,
        loading
      };
    });
  }

  clearDummyOrders() {
    this.setState(prevState => ({
      ...prevState,
      allOrders: prevState.allOrders.filter(order => !order.isDummy),
      hasRecommendations: prevState.recommendations.length ? true : false,
      loading: 'resolved'
    }));
  }

  fetchAllRecommendations(styleList = []) {
    let count = styleList.length;
    let resolvedCount = 0;
    if (!count) {
      this.clearDummyOrders();
    }
    styleList.forEach(style =>
      this.getRecommendation(style.id).then(data => {
        count--;
        if (data.products.length) {
          this.updateRecommendationForStyle(
            style.id,
            data.products,
            resolvedCount
          );
          resolvedCount++;
        }
        if (!count) {
          this.clearDummyOrders();
        }
      })
    );
  }

  getAllRecommendations(orderList) {
    this.setState(
      {
        loading: 'first'
      },
      () => this.fetchAllRecommendations(orderList)
    );
  }

  showRecommendation(style) {
    EventsObj.triggerOrderedStyleClick(style);
    const { allRecommendations } = this.state;
    this.setState({
      selectedStyle: style.id,
      recommendations: allRecommendations[style.id]
    });
  }

  viewMore() {
    const storeOrderId = get(
      this.props,
      'dataState.data.bountyOrder.storeOrderId'
    );
    const viewMoreUrl = `/my/item/details?storeOrderId=${storeOrderId}`;
    EventsObj.triggerViewMoreEvent();
    window.location = viewMoreUrl;
  }

  render() {
    const {
      recommendations,
      selectedStyle,
      loading,
      allOrders,
      hasRecommendations
    } = this.state;
    return hasRecommendations ? (
      <div className={Styles.recommendationsWrapper}>
        <h5 className={Styles.title}>{this.title}</h5>
        <p className={Styles.desc}>{this.desc}</p>
        <OrderedStyles
          selectedStyle={selectedStyle}
          styles={allOrders}
          showRecommendation={this.showRecommendation}
        />
        <RecommendedStyles
          styles={recommendations}
          viewMore={this.viewMore}
          goToPDP={redirectToPDP}
          loading={loading}
        />
      </div>
    ) : null;
  }
}

Recommendations.propTyes = {
  orderList: PropTypes.object
};

export default Recommendations;
