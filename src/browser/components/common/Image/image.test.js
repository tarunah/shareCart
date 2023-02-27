import React from 'react';
import { mount } from 'enzyme';
import Image from './';

describe('Image', () => {
  it('should render the Image with by changing the src to progressive src', () => {
    const src =
      'https://assets.myntassets.com/assets/images/7246342/2018/8/29/cdd927b6-d10b-40eb-a5bc-06ff8f963ae21535551514454-na-8901535551514368-1.jpg';
    const progressiveImageSrc =
      'https://assets.myntassets.com/f_webp,w_10,h_10,dpr_1,q_auto,c_limit,fl_progressive/assets/images/7246342/2018/8/29/cdd927b6-d10b-40eb-a5bc-06ff8f963ae21535551514454-na-8901535551514368-1.jpg';
    const wrapper = mount(<Image height={10} width={10} src={src} />);

    const { imageSrcWebp } = wrapper.instance().getImageSrc();
    expect(imageSrcWebp).toEqual(progressiveImageSrc);
  });

  it('should render the Image with by replacing the src placeholders and making it progressive', () => {
    const src =
      'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/image/style/properties/795275/Crocs-Women-Brown--Black-Animal-Print-Flats_1_aab051caca2c6c0874a132622a3e4d1b.jpg';
    const progressiveImageSrc =
      'https://assets.myntassets.com/f_webp,w_10,h_10,dpr_1,q_auto,c_limit,fl_progressive/h_10,q_auto,w_10/v1/image/style/properties/795275/Crocs-Women-Brown--Black-Animal-Print-Flats_1_aab051caca2c6c0874a132622a3e4d1b.jpg';
    const wrapper = mount(<Image height={10} width={10} src={src} />);

    const { imageSrcWebp } = wrapper.instance().getImageSrc();
    expect(imageSrcWebp).toEqual(progressiveImageSrc);
  });

  it('should render the Image with by already passed progressive image', () => {
    const src =
      'https://assets.myntassets.com/f_webp,w_10,h_10,dpr_1,q_auto,c_limit,fl_progressive/h_10,q_auto,w_10/v1/image/style/properties/795275/Crocs-Women-Brown--Black-Animal-Print-Flats_1_aab051caca2c6c0874a132622a3e4d1b.jpg';
    const wrapper = mount(<Image height={10} width={10} src={src} />);

    const { imageSrc } = wrapper.instance().getImageSrc();
    expect(imageSrc).toEqual(src);
  });

  it('should render the Image with by different DPR', () => {
    window.devicePixelRatio = 2;
    const src =
      'https://assets.myntassets.com/f_webp,w_10,h_10,dpr_2,q_auto,c_limit,fl_progressive/h_10,q_auto,w_10/v1/image/style/properties/795275/Crocs-Women-Brown--Black-Animal-Print-Flats_1_aab051caca2c6c0874a132622a3e4d1b.jpg';
    const wrapper = mount(<Image height={10} width={10} src={src} />);

    const { imageSrc } = wrapper.instance().getImageSrc();
    expect(imageSrc).toEqual(src);
  });
});
