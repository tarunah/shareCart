import React from 'react';
import { emptyStateData } from 'testUtils/cartMockData';
import CardCarousal from './';
import { mount, render, shallow } from 'enzyme';
import get from 'lodash/get';

describe('Card Carousal with background', () => {
  const coverCardMockData =
    emptyStateData.cards[5].children &&
    emptyStateData.cards[5].children.find(
      child => child.type === 'PRODUCT_RACK'
    );

  const carousalProps = {
    coverImg: get(coverCardMockData, "props['cover-image-url']", ''),
    title: get(coverCardMockData, "props['cover-title']", ''),
    subTitle: get(coverCardMockData, "props['cover-subtitle']", ''),
    opacityFactor: true
  };
  const wrapper = shallow(<CardCarousal {...carousalProps} />);

  it('should return its content length', () => {
    expect(wrapper.find('.coverCardContainer').length).toBe(1);
  });

  it('should have title and sub title block', () => {
    expect(wrapper.find('.coverTitle').length).toBe(1);
  });

  it('should have a div of white background', () => {
    expect(wrapper.find('.whiteBg').length).toBe(1);
  });

  it('should have a title of Popular Picks', () => {
    expect(wrapper.find('.coverTitleHeader').text()).toEqual('Check Now');
  });

  it('should have a sub title of Popular Picks', () => {
    expect(wrapper.find('.coverSubTitle').text()).toEqual('Popular Picks');
  });
});

describe('Card Carousal with no background', () => {
  const coverCardMockData =
    emptyStateData.cards[1].children &&
    emptyStateData.cards[1].children.find(
      child => child.type === 'PRODUCT_RACK'
    );

  const carousalProps = {
    coverImg: get(coverCardMockData, "props['cover-image-url']", ''),
    title: get(coverCardMockData, "props['cover-title']", ''),
    subTitle: get(coverCardMockData, "props['cover-subtitle']", ''),
    opacityFactor: false
  };
  const wrapper = shallow(<CardCarousal {...carousalProps} />);

  it('should return its content length', () => {
    expect(wrapper.find('.cardContents').length).toBe(2);
  });

  it('should not have title and sub title block', () => {
    expect(wrapper.find('.coverTitle').length).toBe(0);
  });

  it('should not have a div of white background', () => {
    expect(wrapper.find('.whiteBg').length).toBe(0);
  });
});
