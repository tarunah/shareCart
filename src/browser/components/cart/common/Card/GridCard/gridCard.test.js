import React from 'react';
import { emptyStateData } from 'testUtils/cartMockData';
import GridCard from './';
import { shallow } from 'enzyme';
import sinon from 'sinon';

const gridMockData =
  emptyStateData.cards[0].children &&
  emptyStateData.cards[0].children.find(child => child.type === 'GRID');

describe('Grid Card for empty cart and its content length', () => {
  const triggerClickEvent = sinon.spy();
  const getSecureUrl = sinon.spy();
  const wrapper = shallow(
    <GridCard
      cardData={gridMockData}
      triggerClickEvent={triggerClickEvent}
      getSecureUrl={getSecureUrl}
    />
  );

  it('should return a text of favourite brands', () => {
    expect(wrapper.find('.cardContents').children().length).toBe(8);
  });

  it('should check if all links must be having href', () => {
    wrapper.find('a').forEach(node => {
      expect(node.props('href')).not.toEqual('');
    });
  });
});
