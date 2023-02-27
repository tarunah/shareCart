import React from 'react';
import get from 'lodash/get';

import Styles from './footer.base.css';

const Footer = props => {
  let appImageBase = 'https://constant.myntassets.com/checkout/assets/img/';
  let imageSrc, link;

  if (/iphone|ipad/i.test(navigator.userAgent)) {
    imageSrc = `${appImageBase}badge_ios.png`;
    link =
      'http://ad.apsalar.com/api/v1/ad?re=0&a=myntra&i=com.myntra.Myntra&ca=Mobile+site+-+iOS+%28order+confirmation%29&an=mobile+site&p=iOS&pl=site&h=2a66c78cc888950a6babff75a34296838f2dee85';
  } else {
    imageSrc = `${appImageBase}badge_android.png`;
    link =
      'http://ad.apsalar.com/api/v1/ad?re=0&a=myntra&i=com.myntra.android&ca=Mobile+site+-+Android+%28order+confirmation%29&an=mobile+site&p=Android&pl=site&h=91da8af429b4a75c11cbd10e6092c1f0102c7e6b';
  }

  return get(window, '_checkout_.__myx_deviceData__.deviceChannel') ===
    'mobile' ? (
    <div className={`${Styles.footerContainer} ${props.styleClass}`}>
      <div className={Styles.heading}>Get the Myntra mobile app</div>
      <div className={Styles.desc}>
        A faster and more convenient way to shop
      </div>
      <a href={link}>
        <img className={Styles.image} src={imageSrc} />
      </a>
    </div>
  ) : null;
};

export default Footer;
