import get from 'lodash/get';
import { getImageUrl } from 'commonBrowserUtils/Helper';
import { getCloudinaryImage } from 'commonBrowserUtils/imageUtils';

const IMG_WIDTH = 180;
const IMG_HEIGHT = IMG_WIDTH * (4 / 3);
const ICON_IMAGE_WIDTH = 48;
const ICON_IMAGE_HEIGHT = 64;
const GIFT_CARD = 'GIFT_CARDS';
const E_GIFT_CARD = 'e-gift-cards';

const getSecurePath = style =>
  get(
    style,
    'styleImages.default.securedDomain',
    'https://assets.myntassets.com/'
  ) + get(style, 'styleImages.default.relativePath', '');

const getOrderObj = style => ({
  id: style.id,
  image: getCloudinaryImage(
    getSecurePath(style),
    ICON_IMAGE_HEIGHT,
    ICON_IMAGE_WIDTH
  ),
  name: style.name
});

const getRecommendationObj = (styles = []) => {
  return styles.map(
    ({
      brand,
      name,
      price: { discount, discounted, mrp } = {},
      defaultImage = {},
      id
    }) => {
      return {
        brand: get(brand, 'name'),
        name,
        mrp,
        discount: get(discount, 'label'),
        discounted,
        img: getImageUrl(defaultImage.secureSrc, IMG_HEIGHT, IMG_WIDTH),
        id
      };
    }
  );
};

const fillWithDummyOrders = length => new Array(length).fill({ isDummy: true });

const EventsObj = {
  triggerLoadEvent: function() {
    triggerEvent('CONFIRMATION_RECOMMENDATIONS_LOAD', {
      custom: {
        widget: {
          name: 'reco_widget_load',
          type: 'list'
        }
      }
    });
  },

  triggerOrderedStyleClick: function(style) {
    triggerEvent('CONFIRMATION_ORDER_STYLE_CLICK', {
      custom: {
        widget: {
          name: 'reco_style_pill_click',
          type: 'list-item',
          data_set: {
            data: [
              {
                entity_type: 'product',
                entity_id: style.id,
                entity_name: style.name
              }
            ]
          }
        }
      }
    });
  },

  triggerRecommendedStyleClick: function(style) {
    triggerEvent('CONFIRMATION_RECOMMENDATIONS_STYLE_CLICK', {
      custom: {
        widget: {
          name: 'reco_style_click',
          type: 'list-item',
          data_set: {
            data: [
              {
                entity_type: 'product',
                entity_id: style.id,
                entity_name: style.name
              }
            ]
          }
        }
      }
    });
  },

  triggerViewMoreEvent: function() {
    triggerEvent('CONFIRMATION_RECOMMENDATIONS_VIEW_MORE', {
      custom: {
        widget: {
          name: 'reco_view_more_click',
          type: 'button'
        }
      }
    });
  }
};

const redirectToPDP = style => {
  EventsObj.triggerRecommendedStyleClick(style);
  window.location = `/${style.id}`;
};

const filterGiftCard = style =>
  get(style, 'masterCategory.typeCode') !== GIFT_CARD;

const filterRecommendations = (recommendations = []) =>
  recommendations.filter(
    recommendation => recommendation.articleType !== E_GIFT_CARD
  );

export {
  getRecommendationObj,
  getOrderObj,
  IMG_WIDTH,
  EventsObj,
  IMG_HEIGHT,
  fillWithDummyOrders,
  redirectToPDP,
  filterGiftCard,
  filterRecommendations
};
