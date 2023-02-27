import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

// Common components
import Image from 'commonComp/Image';

// Styles
import Styles from './gridCard.base.css';

// always make sure to have equal width as per screen size
const windowWidth = Math.floor((window.innerWidth - 5 * 12) / 4);

const GridCard = ({ cardData = {}, triggerClickEvent, getSecureUrl }) => {
  return (
    <div className={Styles.cardContents}>
      {get(cardData, 'props.grid', []).map((data, index) => {
        let clickEventData = {
          vPos: index % 4,
          hPos: Math.floor(index / 4),
          data,
          contentType: cardData.contentType,
          cardType: cardData.type,
          entityName: data.link,
          entityId: data.id
        };
        return (
          data.src &&
          data.link && (
            <a
              href={data.link}
              key={data.link}
              onClick={triggerClickEvent.bind(null, clickEventData)}
            >
              <div className={Styles.productContainer}>
                <Image
                  src={getSecureUrl(
                    get(data, 'src', ''),
                    2 * windowWidth,
                    2 * windowWidth,
                    'fill'
                  )}
                  width={windowWidth}
                  height={windowWidth}
                  showBackgroundColor={false}
                />
              </div>
            </a>
          )
        );
      })}
    </div>
  );
};

GridCard.propTypes = {
  cardData: PropTypes.object,
  triggerClickEvent: PropTypes.func,
  getSecureUrl: PropTypes.func
};
export default GridCard;
