import PropTypes from 'prop-types';
import React from 'react';

import Image from '../Image';
import getBannerConfig from './bannerConfig';
import Style from './imageBanner.base.css';

const ImageBanner = ({ name, className, ...rest }) => {
  const config = getBannerConfig(name);
  return (
    <Image
      src={`https://constant.myntassets.com/checkout/assets/img/${name}.png`}
      webpSrc={`https://constant.myntassets.com/checkout/assets/img/${name}.webp`}
      className={`${Style.container} ${className}`}
      nonCloudinary={true}
      showBackgroundColor={false}
      lazyLoad={false}
      {...config}
      {...rest}
    />
  );
};

ImageBanner.propTypes = {
  name: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  onClick: PropTypes.func
};

export default ImageBanner;
