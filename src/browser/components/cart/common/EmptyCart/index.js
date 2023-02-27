import React from 'react';
import ImageBanner from 'commonComp/ImageBanner';
import Styles from './emptyCart.base.css';
import Button from 'commonComp/Button';
import PropTypes from 'prop-types';

const EmptyCart = ({ isFeedEnabled, gotoHomePage, goToWishlist }) => (
  <div className={Styles.mainContainer}>
    <div
      className={`${Styles.subContainer} ${isFeedEnabled && Styles.marginTop}`}
    >
      <ImageBanner name="empty-bag" className={Styles.emptyBagImage} />
      <div className={Styles.emptyText}>Hey, it feels so light!</div>
      <div className={Styles.emptyDesc}>
        There is nothing in your bag. Let's add some items.
      </div>
      <div className={Styles.addFromWishlist}>
        {isFeedEnabled ? (
          <Button
            className={Styles.continueShoppingButton}
            onClick={gotoHomePage}
          >
            CONTINUE SHOPPING
          </Button>
        ) : (
          <Button className={Styles.wishlistButton} onClick={goToWishlist}>
            ADD ITEMS FROM WISHLIST
          </Button>
        )}
      </div>
    </div>
  </div>
);

EmptyCart.propTypes = {
  goToWishlist: PropTypes.func,
  gotoHomePage: PropTypes.func,
  isFeedEnabled: PropTypes.bool
};

export default EmptyCart;
