import sinon from 'sinon';
import { getProgressiveImage, addAdditionalAttributesToPImage } from './';

describe('Image Utils Functionality', () => {
  it('getProgressiveImage - return a height, crop type and quality adjusted image', () => {
    const imageQualityBasedOnNetwork = sinon.stub().returns(100);
    const IMAGE_SIZE = {
      width: 172,
      height: 100
    };
    const CROP_TYPE = 'limit';
    const searchImageURL =
      'https://assets.myntassets.com/assets/images/7246342/2018/8/29/cdd927b6-d10b-40eb-a5bc-06ff8f963ae21535551514454-na-8901535551514368-1.jpg';

    /*Result
      https://assets.myntassets.com/q_100,w_172,h_100,c_limit,fl_progressive/assets/images/7246342/2018/8/29/cdd927b6-d10b-40eb-a5bc-06ff8f963ae21535551514454-na-8901535551514368-1.jpg
     */
    let transformedImage = getProgressiveImage(searchImageURL, {
      q: imageQualityBasedOnNetwork(),
      w: IMAGE_SIZE.width,
      h: IMAGE_SIZE.height,
      c: CROP_TYPE
    });

    expect(transformedImage.indexOf('q_100')).not.toBe(-1);
    expect(transformedImage.indexOf('w_172')).not.toBe(-1);
    expect(transformedImage.indexOf('h_100')).not.toBe(-1);
    expect(transformedImage.indexOf('c_limit')).not.toBe(-1);
    expect(transformedImage.indexOf('fl_progressive')).not.toBe(-1);

    transformedImage = getProgressiveImage(searchImageURL, {
      w: '',
      h: ''
    });

    expect(transformedImage).toEqual(
      'https://assets.myntassets.com/q_auto,c_limit,fl_progressive/assets/images/7246342/2018/8/29/cdd927b6-d10b-40eb-a5bc-06ff8f963ae21535551514454-na-8901535551514368-1.jpg'
    );
  });

  it('addAdditionalAttributesToPImage - adds additional attributes to already progressive image', () => {
    const imageUrl =
      'https://assets.myntassets.com/q_auto,c_limit,fl_progressive/assets/images/7246342/2018/8/29/cdd927b6-d10b-40eb-a5bc-06ff8f963ae21535551514454-na-8901535551514368-1.jpg';
    const attr = {
      f: 'webp'
    };
    let transformedImage = addAdditionalAttributesToPImage(imageUrl, attr);

    expect(transformedImage).toEqual(
      'https://assets.myntassets.com/q_auto,c_limit,f_webp,fl_progressive/assets/images/7246342/2018/8/29/cdd927b6-d10b-40eb-a5bc-06ff8f963ae21535551514454-na-8901535551514368-1.jpg'
    );
  });

  it('addAdditionalAttributesToPImage - adds additional attributes to already progressive image > 1', () => {
    const imageUrl =
      'https://assets.myntassets.com/q_auto,c_limit,fl_progressive/assets/images/7246342/2018/8/29/cdd927b6-d10b-40eb-a5bc-06ff8f963ae21535551514454-na-8901535551514368-1.jpg';
    const attr = {
      f: 'webp',
      p: 'test'
    };
    let transformedImage = addAdditionalAttributesToPImage(imageUrl, attr);

    expect(transformedImage).toEqual(
      'https://assets.myntassets.com/q_auto,c_limit,f_webp,p_test,fl_progressive/assets/images/7246342/2018/8/29/cdd927b6-d10b-40eb-a5bc-06ff8f963ae21535551514454-na-8901535551514368-1.jpg'
    );
  });

  it('addAdditionalAttributesToPImage - adds additional attributes to already progressive image - not already present', () => {
    const imageUrl =
      'https://assets.myntassets.com/f_webp,q_auto,c_limit,fl_progressive/assets/images/7246342/2018/8/29/cdd927b6-d10b-40eb-a5bc-06ff8f963ae21535551514454-na-8901535551514368-1.jpg';
    const attr = {
      f: 'webp1',
      p: 'test'
    };
    let transformedImage = addAdditionalAttributesToPImage(imageUrl, attr);

    expect(transformedImage).toEqual(
      'https://assets.myntassets.com/f_webp,q_auto,c_limit,p_test,fl_progressive/assets/images/7246342/2018/8/29/cdd927b6-d10b-40eb-a5bc-06ff8f963ae21535551514454-na-8901535551514368-1.jpg'
    );
  });

  it('addAdditionalAttributesToPImage - return same url if not progressive already', () => {
    const imageUrl =
      'https://assets.myntassets.com/q_auto,c_limit/assets/images/7246342/2018/8/29/cdd927b6-d10b-40eb-a5bc-06ff8f963ae21535551514454-na-8901535551514368-1.jpg';
    const attr = {
      f: 'webp'
    };
    let transformedImage = addAdditionalAttributesToPImage(imageUrl, attr);

    expect(transformedImage).toEqual(imageUrl);
  });

  it('addAdditionalAttributesToPImage - adds additional attributes to already progressive image - empty', () => {
    const imageUrl =
      'https://assets.myntassets.com/q_auto,c_limit,fl_progressive/assets/images/7246342/2018/8/29/cdd927b6-d10b-40eb-a5bc-06ff8f963ae21535551514454-na-8901535551514368-1.jpg';
    const attr = {};
    let transformedImage = addAdditionalAttributesToPImage(imageUrl, attr);

    expect(transformedImage).toEqual(imageUrl);
  });
});
