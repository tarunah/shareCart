import React from 'react';
import { emptyStateData } from 'testUtils/cartMockData';
import EmptyStateBlock from './';
import { mount } from 'enzyme';
import sinon from 'sinon';
import CartManager from 'commonBrowserUtils/CartManager';

describe('Empty State Block for mobile', () => {
  window.triggerEvent = sinon.spy();
  CartManager.getLgp = resolve => resolve({});

  it('should return null if the data is absent for recommendations', () => {
    const wrapper = mount(<EmptyStateBlock />);
    wrapper.setState({ cards: [] });
    expect(wrapper.find('.cardContainer').exists()).toBe(false);
  });

  it('should not break if LGP response is null', () => {
    const wrapper = mount(<EmptyStateBlock />);
    expect(wrapper.find('.cardContainer').exists()).toBe(false);
  });

  it('should have class if the data is present for recommendations', () => {
    const wrapper = mount(<EmptyStateBlock />);
    wrapper.setState({ cards: emptyStateData.cards });
    expect(wrapper.find('.cardContainer').exists()).toBe(true);
  });

  it('should have 7 children', () => {
    const wrapper = mount(<EmptyStateBlock />);
    wrapper.setState({ cards: emptyStateData.cards });
    expect(wrapper.find('.cardContainer').children().length).toBe(7);
  });

  it('should have 6 children, if one of the card has no products', () => {
    const wrapper = mount(<EmptyStateBlock />);
    emptyStateData.cards[1].children[1].props.products = [];
    wrapper.setState({ cards: emptyStateData.cards });
    expect(wrapper.find('.cardContainer').children().length).toBe(6);
  });

  it('should not display MWK strip if the LGP response have no cards', () => {
    const wrapper = mount(<EmptyStateBlock />);
    emptyStateData.cards = [];
    wrapper.setState({ cards: emptyStateData.cards });
    expect(wrapper.find('MWKStrip').length).toBe(0);
  });
});
