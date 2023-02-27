import React from 'react';
import PropTypes from 'prop-types';

import Image from 'commonComp/Image';
import Styles from './recommendations.base.css';

import {
  getRecommendationObj,
  IMG_WIDTH,
  IMG_HEIGHT
} from './recommendationUtil';
import sanitize from 'commonUtils/Sanitize';

import Rupee from 'iconComp/Rupee.jsx';
import ChevronRight from 'iconComp/ChevronRight.jsx';

const StyleCard = ({
  brand,
  discount,
  img,
  mrp,
  name,
  discounted,
  redirectToPDP
}) => {
  return (
    <div className={Styles.styleCard} onClick={redirectToPDP}>
      <div className={Styles.imgWrapper} style={{ height: `${IMG_HEIGHT}px` }}>
        <Image src={img} visible="true" />
      </div>
      <div className={Styles.productInfo} style={{ width: `${IMG_WIDTH}px` }}>
        <div className={Styles.brand}>{brand}</div>
        <div
          className={Styles.productTitle}
          dangerouslySetInnerHTML={{
            __html: sanitize(name)
          }}
        ></div>
        <div className={Styles.price}>
          <div className={Styles.finalPrice}>
            <Rupee className={Styles.rupeeIcon} />
            <span>{discounted}</span>
          </div>
          {discount && (
            <div className={Styles.discountInfo}>
              <div className={Styles.originalPrice}>
                <Rupee className={Styles.rupeeIcon} />
                {mrp}
              </div>
              <div className={Styles.discount}>{discount}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

StyleCard.propTypes = {
  brand: PropTypes.string,
  discount: PropTypes.string,
  img: PropTypes.string,
  mrp: PropTypes.number,
  name: PropTypes.string,
  discounted: PropTypes.number,
  redirectToPDP: PropTypes.func
};

const CardLoader = ({ className, count }) => {
  return new Array(count).fill(0).map(() => {
    return <div className={className}></div>;
  });
};

const ViewMore = ({ viewMore }) => {
  return (
    <div className={Styles.viewMore} onClick={viewMore}>
      <span>View More</span>
      <ChevronRight className={Styles.nextArrow} />
    </div>
  );
};

ViewMore.propTypes = {
  viewMore: PropTypes.func
};

const RecommendedStyles = ({ styles, goToPDP, viewMore, loading }) => {
  return (
    <div className={Styles.recommendedList}>
      <div className={Styles.innerWrapper}>
        {loading === 'first' ? (
          <CardLoader count={10} className={Styles.cardLoader} />
        ) : (
          getRecommendationObj(styles).map(data => {
            return <StyleCard {...data} redirectToPDP={() => goToPDP(data)} />;
          })
        )}
        {loading !== 'first' && <ViewMore viewMore={viewMore} />}
      </div>
    </div>
  );
};

RecommendedStyles.propTypes = {
  styles: PropTypes.array,
  goToPDP: PropTypes.func,
  viewMore: PropTypes.func,
  loading: PropTypes.string
};

const EmptyCircle = () => <div className={Styles.emptyCircle}></div>;

const OrderedStyles = ({ styles = [], showRecommendation, selectedStyle }) => {
  return (
    <div className={Styles.orderedStyles}>
      <div className={Styles.innerWrapper}>
        {styles.map(style => {
          return (
            <div
              onClick={() => showRecommendation(style)}
              className={`${Styles.styleCircle} ${
                selectedStyle === style.id ? Styles.selectedStyle : null
              } ${style.isDummy ? Styles.noBorder : null}`}
            >
              {style.isDummy ? (
                <EmptyCircle />
              ) : (
                <Image src={style.image} visible="true" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

OrderedStyles.propTypes = {
  styles: PropTypes.array,
  showRecommendation: PropTypes.func,
  selectedStyle: PropTypes.string
};

export { OrderedStyles, RecommendedStyles };
