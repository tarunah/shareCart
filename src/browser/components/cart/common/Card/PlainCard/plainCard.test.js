import React from 'react';
import { emptyStateData } from 'testUtils/cartMockData';
import PlainCard from './';
import { mount } from 'enzyme';
import sinon from 'sinon';

describe('Plain Card for empty cart without BG', () => {
  const plainCardMockData =
    emptyStateData.cards[1].children &&
    emptyStateData.cards[1].children.find(
      child => child.type === 'PRODUCT_RACK'
    );
  const triggerClickEvent = sinon.spy();
  const getSecureUrl = sinon.spy();
  const wrapper = mount(
    <PlainCard
      cardData={plainCardMockData}
      triggerClickEvent={triggerClickEvent}
      getSecureUrl={getSecureUrl}
    />
  );
  it('should return its content length', () => {
    expect(wrapper.find('.cardContents .contents').children().length).toBe(6);
  });

  it('should check if all links must be having href', () => {
    wrapper.find('a').forEach(node => {
      expect(node.props('href')).not.toEqual('');
    });
  });
});

describe('Plain Card for empty cart with BG', () => {
  const plainCardMockData =
    emptyStateData.cards[5].children &&
    emptyStateData.cards[5].children.find(
      child => child.type === 'PRODUCT_RACK'
    );
  const triggerClickEvent = sinon.spy();
  const getSecureUrl = sinon.spy();
  const wrapper = mount(
    <PlainCard
      cardData={plainCardMockData}
      triggerClickEvent={triggerClickEvent}
      getSecureUrl={getSecureUrl}
    />
  );

  it('should return a text of cover sub title', () => {
    expect(wrapper.find('.coverSubTitle').text()).toBe('Popular Picks');
  });

  it('should return a text of cover title header', () => {
    expect(wrapper.find('.coverTitleHeader').text()).toBe('Check Now');
  });

  it('should return its content length', () => {
    expect(wrapper.find('.coverCardContents .contents').children().length).toBe(
      7
    );
  });

  it('should check if all links must be having href', () => {
    wrapper.find('a').forEach(node => {
      expect(node.props('href')).not.toEqual('');
    });
  });
});

describe('Plain Card data price show', () => {
  const plainCardMockData1 =
    emptyStateData.cards[1].children &&
    emptyStateData.cards[1].children.find(
      child => child.type === 'PRODUCT_RACK'
    ).props.products[3];
  const triggerClickEvent = sinon.spy();
  const getSecureUrl = sinon.spy();

  it("should not strike item price if it's not discounted", () => {
    const wrapper = mount(
      <PlainCard
        cardData={plainCardMockData1}
        triggerClickEvent={triggerClickEvent}
        getSecureUrl={getSecureUrl}
      />
    );
    expect(wrapper.find('.originalPrice').length).toBe(0);
  });
});
