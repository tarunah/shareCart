import React from 'react';
import PropTypes from 'prop-types';

//Common Components
import Image from 'commonComp/Image';

const Banner = ({ bannerURL }) => {
  return bannerURL ? (
    <Image src={bannerURL} height="auto" width="auto" nonCloudinary={true} />
  ) : null;
};

Banner.propTypes = {
  bannerURL: PropTypes.string.isRequired
};

export default Banner;
