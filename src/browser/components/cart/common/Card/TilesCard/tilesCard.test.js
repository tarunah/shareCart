import React from 'react';
import { emptyStateData } from 'testUtils/cartMockData';
import TilesCard from './';
import { shallow } from 'enzyme';
import sinon from 'sinon';

const tilesMockData =
  emptyStateData.cards[2].children &&
  emptyStateData.cards[2].children.find(child => child.type === 'LINK_TILES');

describe('Tiles Card for empty cart', () => {
  const triggerClickEvent = sinon.spy();
  const getSecureUrl = sinon.spy();
  const wrapper = shallow(
    <TilesCard
      cardData={tilesMockData}
      triggerClickEvent={triggerClickEvent}
      getSecureUrl={getSecureUrl}
    />
  );
  it('should return its content length', () => {
    expect(wrapper.find('.cardContents').children().length).toBe(4);
  });

  it('should check if all links must be having href', () => {
    wrapper.find('a').forEach(node => {
      expect(node.props('href')).not.toEqual('');
    });
  });
});
