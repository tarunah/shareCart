import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

// Common Components
import Image from 'commonComp/Image';

// Local Components
import CardCarousal from './CardCarousal';

// Styles
import Styles from './plainCard.base.css';

import Rupee from 'iconComp/Rupee.jsx';
import RupeeStriked from 'iconComp/RupeeStriked.jsx';

const IMAGE_WIDTH = 150;
const IMAGE_HEIGHT = 200;

const ProductBlock = ({ cardData = {}, triggerClickEvent, getSecureUrl }) => {
  return (
    <div className={Styles.contents}>
      {get(cardData, 'props.products', []).map((data, index) => {
        const discountedPrice = get(data, 'discounted_price');
        const price = get(data, 'price');
        let clickEventData = {
          vPos: index,
          hPos: 0,
          data,
          contentType: cardData.contentType,
          cardType: cardData.type,
          entityName: data.stylename,
          entityId: data.styleid
        };
        return (
          data.styleid &&
          get(data, 'image.src') && (
            <a
              href={'/' + data.styleid}
              onClick={triggerClickEvent.bind(null, clickEventData)}
              key={data.styleid}
            >
              <div className={Styles.productContainer}>
                <Image
                  src={getSecureUrl(get(data, 'image.src'), IMAGE_WIDTH)}
                  width={IMAGE_WIDTH}
                  height={IMAGE_HEIGHT}
                  showBackgroundColor="true"
                />
                <div className={Styles.productData}>
                  <h3 className={Styles.brandName}>
                    {get(data, 'brands_facet')}
                  </h3>
                  <h4 className={Styles.productName}>
                    {get(data, 'stylename')}
                  </h4>
                  <div className={Styles.priceContainer}>
                    <span className={Styles.price}>
                      <Rupee className={Styles.rupeeIcon} />
                      <span>{discountedPrice}</span>
                    </span>
                    {discountedPrice !== price ? (
                      <span className={Styles.originalPrice}>
                        <RupeeStriked className={Styles.rupeeIconOriginal} />
                        <span>{price}</span>
                      </span>
                    ) : (
                      ''
                    )}
                    {data.discount ? (
                      <span className={Styles.discPercent}>
                        {get(data, 'discount_label')}
                      </span>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </a>
          )
        );
      })}
    </div>
  );
};

const PlainCard = ({ cardData = {}, triggerClickEvent, getSecureUrl }) => {
  const coverImg = get(cardData, "props['cover-image-url']", '');
  const carousalProps = {
    coverImg,
    title: get(cardData, "props['cover-title']", ''),
    subTitle: get(cardData, "props['cover-subtitle']", ''),
    opacityFactor: !!coverImg
  };

  return (
    <CardCarousal {...carousalProps}>
      <ProductBlock
        cardData={cardData}
        triggerClickEvent={triggerClickEvent}
        getSecureUrl={getSecureUrl}
      />
    </CardCarousal>
  );
};

PlainCard.propTypes = {
  cardData: PropTypes.object,
  triggerClickEvent: PropTypes.func,
  getSecureUrl: PropTypes.func
};
export default PlainCard;
