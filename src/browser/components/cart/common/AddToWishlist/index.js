import React from 'react';

// Styles
import Style from './addToWishlist.base.css';

import Wishlist from 'iconComp/Wishlist.jsx';
import ChevronRight from 'iconComp/ChevronRight.jsx';

const AddToWishlist = () => (
  <a href="/wishlist">
    <div className={Style.mainBlock}>
      <div className={Style.wishlistBlock}>
        <Wishlist />
        <div className={Style.wishlistText}>Add More From Wishlist</div>
        <ChevronRight className={Style.wishlistChevron} />
      </div>
    </div>
  </a>
);

export default AddToWishlist;
