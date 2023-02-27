import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

// Styles
import Styles from './tilesCard.base.css';

const TILE_IMAGE_WIDTH = 40;
const TILE_IMAGE_HEIGHT = 40;

const TilesCard = ({ cardData = {}, triggerClickEvent, getSecureUrl }) => {
  return (
    <div className={Styles.cardContents}>
      {get(cardData, 'props.tiles', []).map((data, index) => {
        let clickEventData = {
          vPos: 0,
          hPos: index,
          data,
          contentType: cardData.contentType,
          cardType: cardData.type,
          entityName: data.title,
          entityId: data.id
        };
        return (
          get(data, 'image.src') &&
          data.link && (
            <a
              href={data.link}
              onClick={triggerClickEvent.bind(null, clickEventData)}
              className={Styles.tileContents}
              key={data.link}
            >
              <div
                className={`${Styles.tileImage} ${Styles.tileBg}`}
                style={{
                  backgroundImage: `url(${getSecureUrl(
                    data.image.src,
                    TILE_IMAGE_WIDTH,
                    TILE_IMAGE_HEIGHT,
                    'fill'
                  )})`
                }}
              />
              <div className={Styles.tileItem}>
                <div className={Styles.tileItemHeader}>{data.description}</div>
                <div className={Styles.tileItemSubHeader}>{data.title}</div>
              </div>
              <div className={Styles.arrow}>
                {/* <Icon name="Chevron" className={Styles.arrowIcon} /> */}
              </div>
            </a>
          )
        );
      })}
    </div>
  );
};

TilesCard.propTypes = {
  cardData: PropTypes.object,
  triggerClickEvent: PropTypes.func,
  getSecureUrl: PropTypes.func
};

export default TilesCard;
