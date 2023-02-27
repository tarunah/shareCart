/*
 * Carousel Library.
 * ------Usage-------
 * import CarouselLib from 'CarouselLib';
 * const props = {
 *   currentSlide: <current slide number>
 *   afterSlide: <func to call after slide>
 *   config: {
 *     threshold: <minimum distance for slide update>,
 *     loop: <should carousel be in loop>,
 *     perPage: <items to show per page>
 *   }
 * };
 * <div id='carousel'>
 *   <Carousel {...props}>
 *     {items.map(item => <div>item</div>)}
 *   </Carousel>
 * </div>
 * -------------------
 */

import React from 'react';
import PropTypes from 'prop-types';

class CarouselLib extends React.Component {
  constructor(props) {
    super(props);

    this.pointerDown = false;
    this.drag = {
      startX: 0,
      endX: 0,
      startY: 0,
      letItGo: null
    };
    this.config = {
      threshold: 20,
      loop: false,
      perPage: 1,
      ...props.config
    };
    const bodyWidth = document.body.offsetWidth;
    this.selectorWidth = bodyWidth - 0.3 * bodyWidth;
    this.count = React.Children.count(props.children);
    this.currentSlide = props.currentSlide;
    this.state = {
      sliderFrameStyles: {
        marginLeft: '16px',
        width: `${(this.selectorWidth / this.config.perPage) * this.count}px`,
        transition: 'all 200ms ease-out',
        transform: `translate3d(-${(props.currentSlide * this.selectorWidth) /
          this.config.perPage}px, 0, 0)`
      }
    };
  }

  componentDidMount() {
    const carousel = document.getElementById(
      `${this.props.id || 'baseCarousel'}_carousel`
    );
    this.sliderFrame = document.getElementById('carousel_sliderFrame');

    if (carousel) {
      // Touch events
      carousel.addEventListener(
        'touchstart',
        this.touchstartHandler.bind(this),
        {
          passive: true
        }
      );
      carousel.addEventListener('touchend', this.touchendHandler.bind(this));
      carousel.addEventListener('touchmove', this.touchmoveHandler.bind(this), {
        passive: true
      });
    }
  }

  touchstartHandler(e) {
    e.stopPropagation();
    this.pointerDown = true;
    this.drag.startX = e.touches[0].pageX;
    this.drag.startY = e.touches[0].pageY;
  }

  touchmoveHandler(e) {
    e.stopPropagation();
    const {
      drag,
      sliderFrame,
      config: { perPage },
      selectorWidth,
      currentSlide
    } = this;

    if (drag.letItGo === null) {
      drag.letItGo =
        Math.abs(drag.startY - e.touches[0].pageY) <
        Math.abs(drag.startX - e.touches[0].pageX);
    }

    if (this.pointerDown && drag.letItGo) {
      drag.endX = e.touches[0].pageX;
      sliderFrame.style.transform = `translate3d(${(currentSlide *
        (selectorWidth / perPage) +
        (drag.startX - drag.endX)) *
        -1}px, 0, 0)`;
    }
  }

  touchendHandler(e) {
    e.stopPropagation();

    this.pointerDown = false;
    if (this.drag.endX) {
      this.updateAfterDrag();
    }
    this.clearDrag();
  }

  updateAfterDrag() {
    const {
      config: { perPage, threshold },
      count,
      selectorWidth
    } = this;
    const movement = this.drag.endX - this.drag.startX;
    const movementDistance = Math.abs(movement);
    const howManySliderToSlide = Math.ceil(
      movementDistance / (selectorWidth / perPage)
    );

    if (movement > 0 && movementDistance > threshold && count >= perPage) {
      this.prev(howManySliderToSlide);
    } else if (
      movement < 0 &&
      movementDistance > threshold &&
      count >= perPage
    ) {
      this.next(howManySliderToSlide);
    }
    this.slideToCurrent();
  }

  clearDrag() {
    this.drag = {
      startX: 0,
      endX: 0,
      startY: 0,
      letItGo: null
    };
  }

  prev(howManySlides) {
    howManySlides = howManySlides || 1;
    const {
      config: { perPage, loop },
      count
    } = this;
    if (count < perPage) {
      return;
    }
    const beforeChange = this.currentSlide;
    if (this.currentSlide === 0 && loop) {
      this.currentSlide = count - perPage;
    } else {
      this.currentSlide = Math.max(this.currentSlide - howManySlides, 0);
    }
    if (beforeChange !== this.currentSlide) {
      this.slideToCurrent();
    }
  }

  next(howManySlides) {
    howManySlides = howManySlides || 1;
    const {
      config: { perPage, loop },
      count
    } = this;
    if (count < perPage) {
      return;
    }
    var beforeChange = this.currentSlide;
    if (this.currentSlide === count - perPage && loop) {
      this.currentSlide = 0;
    } else if (this.currentSlide + 1 + howManySlides > count) {
      this.currentSlide = beforeChange;
    } else {
      this.currentSlide = this.currentSlide + howManySlides;
    }
    if (beforeChange !== this.currentSlide) {
      this.slideToCurrent();
    }
  }

  slideToCurrent() {
    const {
      props: { afterSlide },
      state: { sliderFrameStyles },
      currentSlide,
      selectorWidth,
      config: { perPage },
      sliderFrame
    } = this;

    const transformStyle = `translate3d(-${(currentSlide * selectorWidth) /
      perPage}px, 0, 0)`;

    sliderFrame.style.transform = transformStyle;
    this.setState(
      {
        sliderFrameStyles: {
          ...sliderFrameStyles,
          transform: transformStyle
        }
      },
      () => {
        afterSlide(currentSlide, 'carousel');
      }
    );
  }

  render() {
    const {
      props: {
        children,
        id = 'baseCarousel',
        carouselContainerClass,
        sliderFrameClass,
        keepSame
      },
      state: { sliderFrameStyles },
      count
    } = this;
    if (this.props.currentSlide !== this.currentSlide) {
      this.currentSlide = this.props.currentSlide;
      this.slideToCurrent();
    }

    return (
      <div id={`${id}_carousel`} className={carouselContainerClass}>
        <div
          id="carousel_sliderFrame"
          className={sliderFrameClass}
          style={sliderFrameStyles}
        >
          {React.Children.map(children, (child, index) => {
            const isSelected = index === this.currentSlide;

            const childStyle = {
              float: 'left',
              width: `${100 / count}%`,
              transition: 'all 200ms ease-out',
              transform: 'scale(0.8)',
              opacity: '0.4'
            };

            if (isSelected || keepSame) {
              childStyle.transform = 'scale(1)';
              childStyle.opacity = '1';
            }
            return (
              <div
                className={`elementContainer ${
                  isSelected ? 'selectedItem' : ''
                }`}
                style={childStyle}
              >
                {child}
              </div>
            );
          })}
          <div style={{ clear: 'both' }} />
        </div>
      </div>
    );
  }
}

CarouselLib.propTypes = {
  currentSlide: PropTypes.number,
  afterSlide: PropTypes.func,
  config: PropTypes.object
};

export default CarouselLib;
