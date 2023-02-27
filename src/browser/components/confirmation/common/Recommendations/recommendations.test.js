import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import {
  recommendations,
  recommendations3
} from 'testUtils/recommendationsMockData';
import productData, { bountyOrder } from 'testUtils/confirmationMockData';
import ConfirmationManager from 'commonBrowserUtils/ConfirmationManager';
import Recommendations from './';
import { OrderedStyles, RecommendedStyles } from './recommendationComponents';

describe('Recommendation Carousel Tests', () => {
  window.triggerEvent = sinon.spy();
  const recommendationProps = {
    dataState: {
      data: {
        bountyOrder,
        productData
      }
    },
    analytics: () => sinon.spy()
  };
  ConfirmationManager.getRecommendations = (styleId, scb, ecb) => {
    scb(recommendations);
  };
  it('should show the ordered product images, main title and description when the count is greater than 1', () => {
    const wrapper = mount(<Recommendations {...recommendationProps} />);
    expect(wrapper.find('.styleCircle').length).toBe(3);
    expect(wrapper.find('.title').text()).toEqual(
      'Recomendations for your next order'
    );
    expect(wrapper.find('.desc').text()).toEqual(
      'Pair your purchased item with these curated items'
    );
  });

  it('Should have some recommended products in the carousel', () => {
    const wrapper = mount(<Recommendations {...recommendationProps} />);
    wrapper.setState({
      recommendations: recommendations3.related[0].products,
      loading: false
    });
    expect(wrapper.find('.styleCard').length > 0).toBeTruthy();
  });

  it('Do not show any content if the recommendation is empty', () => {
    const wrapper = mount(<Recommendations {...recommendationProps} />);
    wrapper.setState({
      hasRecommendations: false
    });
    expect(wrapper.find('.recommendationsWrapper').length).toBe(0);
  });

  it('Click on the ordered product, should call crossell API', () => {
    const showRecommendations = sinon.spy();
    const wrapper = mount(
      <OrderedStyles
        styles={productData.styles}
        showRecommendation={showRecommendations}
        selectedStyle={1531}
      />
    );
    wrapper
      .find('.styleCircle')
      .at(0)
      .simulate('click');
    expect(showRecommendations.called).toEqual(true);
  });

  it('Should show the necessary details such as image, product title, desc and mrp and view more link', () => {
    const goToPDP = sinon.spy();
    const viewMore = sinon.spy();
    const wrapper = mount(
      <RecommendedStyles
        styles={recommendations.related[0].products}
        goToPDP={goToPDP}
        viewMore={viewMore}
      />
    );
    const firstProduct = wrapper.find('.styleCard').at(0);
    expect(wrapper.find('.viewMore').length).toBe(1);
    expect(firstProduct.find('.brand').text()).toEqual('Moda Rapido');
    expect(firstProduct.find('.productTitle').text()).toEqual(
      'Moda Rapido Men Red & Grey Slim Fit Striped Casual Shirt'
    );
    expect(firstProduct.find('.finalPrice').text()).toEqual('1119');
  });

  it('Test the click functionality on the view more and style click', () => {
    const goToPDP = sinon.spy();
    const viewMore = sinon.spy();
    const wrapper = mount(
      <RecommendedStyles
        styles={recommendations.related[0].products}
        goToPDP={goToPDP}
        viewMore={viewMore}
      />
    );

    wrapper
      .find('.styleCard')
      .at(0)
      .simulate('click');
    wrapper.find('.viewMore').simulate('click');
    expect(goToPDP.called).toEqual(true);
    expect(viewMore.called).toEqual(true);
  });
});
