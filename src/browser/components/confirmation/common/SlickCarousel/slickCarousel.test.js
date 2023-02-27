import React from 'react';
import { shallow } from 'enzyme';
import Styles from '../CardComponents/cardComponents.base.css';
import SlickCarousel from './index';

describe('Slider Carousel Test', () => {
  const promoOffers = [
    {
      image:
        'https://assets.myntassets.com/assets/images/2021/9/16/8862651e-a08d-442d-9de4-addde20a7cf31631777027653-image001--5---1-.png',
      url:
        'https://assets.myntassets.com/assets/images/2021/9/16/8862651e-a08d-442d-9de4-addde20a7cf31631777027653-image001--5---1-.png'
    },
    {
      image:
        'https://assets.myntassets.com/assets/images/2021/10/5/3d6e5a8d-1fe4-4c8e-a9db-5defcd2980e61633435383686-min-2000.gif',
      url:
        'https://assets.myntassets.com/assets/images/2021/10/5/3d6e5a8d-1fe4-4c8e-a9db-5defcd2980e61633435383686-min-2000.gif'
    }
  ];

  it('should display carousel', () => {
    let wrapper = shallow(
      <SlickCarousel>
        {promoOffers.map(({ image, url }, index) => (
          <div id={`promoOffer-${index}`} key={`promoOffer-${index}`}>
            <a href={url}>
              <img className={Styles.promoOfferImage} src={image} />
            </a>
          </div>
        ))}
      </SlickCarousel>
    );
    expect(wrapper.find('.slides')).toHaveLength(1);
    expect(wrapper.find('.slides').children().length).toBe(6);
    expect(wrapper.find('.dots').children().length).toBe(promoOffers.length);
  });
});
