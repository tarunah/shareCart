import React, { Component } from 'react';
import get from 'lodash/get';

// Local Components
import PlainCard from '../../common/Card/PlainCard';
import TilesCard from '../../common/Card/TilesCard';
import GridCard from '../../common/Card/GridCard';

// Utilities
import securify from 'commonBrowserUtils/securify';
import { getProgressiveImage } from 'commonBrowserUtils/imageUtils';
import CartManager from 'commonBrowserUtils/CartManager';

// Styles
import Styles from '../../common/Card/card.base.css';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
import MWKStrip from './MWKStrip';

const cardConfig = {
  GRID: GridCard,
  PRODUCT_RACK: PlainCard,
  LINK_TILES: TilesCard
};

const secure = securify();

const TITLE_TEXT = 'TITLE_TEXT';

export const triggerClickEvent = eventParams => {
  triggerEvent('EMPTY_CART_WIDGET_CLICK', {
    maData: {
      entity_type: 'card',
      entity_name: eventParams.contentType + '_click',
      entity_id: eventParams.entityId
    },
    custom: {
      custom: { v1: 'empty' },
      widget: {
        name: eventParams.contentType,
        type: 'card'
      },
      widget_items: {
        name: eventParams.contentType + '_click',
        type: 'carousel',
        v_position: eventParams.vPos,
        h_position: eventParams.hPos,
        data_set: {
          data: [
            {
              entity_type: 'product',
              entity_name: eventParams.entityName,
              entity_id: eventParams.entityId
            }
          ]
        }
      }
    },
    mynacoAttributes: {
      category: 'Cart Page',
      action: eventParams.contentType + ' widget click'
    }
  });
};

export const triggerWidgetLoadEvent = contentType => {
  triggerEvent('EMPTY_CART_WIDGET_LOAD', {
    maData: {
      entity_type: 'card',
      entity_name: contentType
    },
    custom: {
      custom: { v1: 'empty' },
      widget: {
        name: contentType,
        type: 'card'
      }
    },
    mynacoAttributes: {
      category: 'Cart Page',
      action: contentType + ' widget load'
    }
  });
};

export const getSecureUrl = (url, w, h, c) => {
  const secureUrl = secure(url, w, h);
  const attr = {};
  if (w) attr.w = w;
  if (h) attr.h = h;
  if (c) attr.c = c;
  return getProgressiveImage(secureUrl, attr);
};

export const CardBuilder = ({ cards = [] }) => {
  const componentCards = [];
  cards.forEach((card, index) => {
    if (card.children) {
      const headerObj = card.children.find(child => child.type === TITLE_TEXT);
      const cardProductsObj = card.children.find(child => {
        return Object.keys(cardConfig).indexOf(child.type) > -1;
      });
      // case:- if the product list is empty, then don't render the header as well
      let products = [];
      if (cardProductsObj) {
        const tilesProduct = get(cardProductsObj, 'props.tiles');
        const gridProduct = get(cardProductsObj, 'props.grid');
        const rackProduct = get(cardProductsObj, 'props.products');
        products = tilesProduct || gridProduct || rackProduct || [];
      }
      products.length &&
        card.children.forEach(childData => {
          childData.contentType = card.props.meta.contentType;
          const CardComponent = cardConfig[childData.type];
          if (CardComponent) {
            triggerWidgetLoadEvent(get(card, 'props.meta.contentType', ''));
            componentCards.push(
              <div className={Styles.card} key={index}>
                <div className={Styles.cardHeader}>
                  {get(headerObj, 'props.text', '')}
                </div>
                <CardComponent
                  cardData={childData}
                  index={index}
                  getSecureUrl={getSecureUrl}
                  triggerClickEvent={triggerClickEvent}
                />
              </div>
            );
          }
        });
    }
  });
  return (
    componentCards.length > 0 && (
      <div className={Styles.cardContainer}>{componentCards}</div>
    )
  );
};

class EmptyStateBlock extends Component {
  constructor(props) {
    super(props);
    this.shopMoreCarouselConfig = getGrowthHackConfigValue(
      'SHOP_MORE_CAROUSEL'
    );
    this.state = {
      cards: []
    };
  }

  componentDidMount() {
    CartManager.getLgp((response = {}) => {
      this.setState({
        cards: response.cards || []
      });
    });
  }

  render() {
    const { cards } = this.state;
    return (
      <div>
        <CardBuilder cards={cards} />
        {cards.length > 0 ? (
          <MWKStrip shopMorePillsData={this.shopMoreCarouselConfig} />
        ) : null}
      </div>
    );
  }
}

export default EmptyStateBlock;
