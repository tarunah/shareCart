import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Lazy from 'react-lazy-load';

import {
  getCloudinaryImage,
  getRandomBackgroundColors,
  getProgressiveImage,
  addAdditionalAttributesToPImage,
  getDPR,
  getSourceSet
} from 'commonBrowserUtils/imageUtils';

import { isIE } from 'commonBrowserUtils/Helper';

import Styles from './image.base.css';

class Image extends PureComponent {
  getAdditionalAttributes() {
    const attributes = {};
    if (!isIE()) {
      attributes.f = 'webp';
    }
    return attributes;
  }

  getImageSrc() {
    const { src, height, width, useCachedImage = false } = this.props;

    const cloudinarySrc = getCloudinaryImage(src, width, height); // replaces placeholders with their values

    let imageSrc, imageSrcWebp;
    if (cloudinarySrc && cloudinarySrc.indexOf('fl_progressive') === -1) {
      // check if already progressive
      imageSrc = getProgressiveImage(cloudinarySrc, {
        w: isNaN(width) ? '' : width,
        h: isNaN(height) ? '' : height,
        dpr: getDPR()
      });
      if (!isIE()) {
        imageSrcWebp = useCachedImage
          ? getSourceSet(src)
          : getProgressiveImage(cloudinarySrc, {
              f: 'webp',
              w: isNaN(width) ? '' : width,
              h: isNaN(height) ? '' : height,
              dpr: getDPR()
            });
      }
    } else {
      imageSrc = cloudinarySrc;
      imageSrcWebp = addAdditionalAttributesToPImage(
        cloudinarySrc,
        this.getAdditionalAttributes()
      );
    }

    return { imageSrc, imageSrcWebp };
  }

  getNonCloudinarySrc() {
    const { src, webpSrc = '' } = this.props;
    let imageSrc = src,
      imageSrcWebp = webpSrc;
    return { imageSrc, imageSrcWebp };
  }

  render() {
    const {
      height,
      width,
      showBackgroundColor,
      className = '',
      nonCloudinary,
      lazyLoad
    } = this.props;
    const { imageSrc, imageSrcWebp } = nonCloudinary
      ? this.getNonCloudinarySrc()
      : this.getImageSrc();

    const baseImage = (
      <div
        style={{
          background: showBackgroundColor
            ? getRandomBackgroundColors()
            : 'none',
          height: isNaN(height) ? height : `${height}px`,
          width: isNaN(width) ? width : `${width}px`
        }}
        className={className}
      >
        {lazyLoad ? (
          <Lazy
            height={height}
            offsetVertical={300}
            width={width}
            debounce={false}
            once={true}
          >
            <picture className={Styles.imgResponsive} style={{ width: '100%' }}>
              <source srcSet={imageSrcWebp || imageSrc} type="image/webp" />
              <img
                src={imageSrc}
                className={Styles.imgResponsive}
                alt="image"
                style={{ width: '100%' }}
              />
            </picture>
          </Lazy>
        ) : (
          <picture className={Styles.imgResponsive} style={{ width: '100%' }}>
            <source srcSet={imageSrcWebp || imageSrc} type="image/webp" />
            <img
              src={imageSrc}
              className={Styles.imgResponsive}
              alt="image"
              style={{ width: '100%' }}
            />
          </picture>
        )}
      </div>
    );
    return baseImage;
  }
}

Image.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  src: PropTypes.string,
  webpSrc: PropTypes.string
};

Image.defaultProps = {
  showBackgroundColor: true,
  nonCloudinary: false,
  lazyLoad: true
};

export default Image;
