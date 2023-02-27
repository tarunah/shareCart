import React, { useEffect, useRef } from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import Styles from './slickCarousel.base.css';
import COLORS from 'commonResources/colors';
import { isDesktop } from 'commonBrowserUtils/Helper';
const isBrowser = typeof window !== 'undefined';

let isTouchMoveCalled = false,
  isTouchEndCalled = false,
  fireSreenLoadEvent = true;

const offerViewEvent = (viewed, total) => {
  triggerEvent('INLINE_OFFER_OFFER_VIEW', {
    custom: {
      custom: {
        v1: viewed,
        v2: total
      }
    }
  });
};

const SlickCarousel = props => {
  const children =
    props.children.length > 1
      ? [
          props.children[props.children.length - 1],
          ...props.children,
          ...props.children,
          props.children[0]
        ]
      : props.children;
  let direction = 'right';

  const slideRef = useRef(null);
  const dotsRef = useRef(null);
  let translateX = useRef(0);
  let currTouchPos = useRef(0);
  let intervalId = useRef(0);
  let animationId = useRef(0);
  let currentIndex = useRef(1);
  const isPaymentPage = get(props, 'isPaymentPage', false);
  const getPositionX = event => {
    return event.type.includes('mouse') || event.type.includes('click')
      ? event.pageX
      : event.touches[0].pageX;
  };

  const onTouchStart = event => {
    clearInterval(intervalId.current);
    window.cancelAnimationFrame(animationId.current);
    currTouchPos.current = getPositionX(event);
    isDesktop() &&
      slideRef.current.addEventListener('mousemove', onTouchMove, false);
  };

  const onTouchMove = event => {
    let pageX = getPositionX(event);
    if (pageX < 0) {
      pageX = 0;
    }
    const translateTo = Math.round(
      currTouchPos.current -
        pageX +
        slideRef.current.offsetWidth * currentIndex.current
    );
    if (pageX > currTouchPos.current) {
      direction = 'right';
      translateX.current = Math.abs(translateTo) * -1;
    } else {
      direction = 'left';
      translateX.current = translateTo * -1;
    }
    animateSlide(translateX.current, 'none');
    isTouchMoveCalled = true;
  };

  const setAutoScroll = () => {
    intervalId.current = setInterval(() => {
      if (currentIndex.current < children.length - 1) {
        currentIndex.current = currentIndex.current + 1;
        animationId.current = animateSlide(
          -slideRef.current.offsetWidth * currentIndex.current
        );
      }
    }, props.slideInterval);
  };

  const onTouchEnd = event => {
    !isPaymentPage && setAutoScroll();
    slideRef.current.removeEventListener('mousemove', onTouchMove, false);
    isTouchEndCalled = true;
    let translateTo;
    if (direction === 'right') {
      currentIndex.current -= 1;
      translateTo = slideRef.current.offsetWidth * currentIndex.current * -1;
    } else {
      const tempCurrIndex =
        currentIndex.current === children.length ? 0 : currentIndex.current + 1;
      translateTo = slideRef.current.offsetWidth * tempCurrIndex * -1;
      currentIndex.current += 1;
    }
    if (isTouchMoveCalled) {
      animateSlide(translateTo);
      isTouchMoveCalled = false;
    } else {
      if (fireSreenLoadEvent) {
        fireSreenLoadEvent = false;
        offerViewEvent(currentIndex.current + 1, props.children.length);
      }
    }
  };

  const animate = (translateTo, transition) => {
    slideRef.current.style.transition = transition
      ? transition
      : 'transform ease-out 500ms';
    slideRef.current.style.transform = `translate(${translateTo}px)`;

    // color circle
    let childIdx =
      (currentIndex.current % (dotsRef.current.children.length + 1)) - 1;
    childIdx = childIdx < 0 ? 0 : childIdx;
    for (let i = 0; i < dotsRef.current.children.length; i++) {
      dotsRef.current.children[i].style.background = 'none';
    }
    dotsRef.current.children[childIdx].style.background = isPaymentPage
      ? COLORS.grey_50
      : COLORS.watermelon_10;
    if (
      fireSreenLoadEvent &&
      (isTouchEndCalled || childIdx === props.children.length - 1)
    ) {
      fireSreenLoadEvent = false;
      isTouchEndCalled = false;
      offerViewEvent(childIdx + 1, props.children.length);
    }
  };

  const animateSlide = (translateTo, transition) => {
    return isBrowser
      ? window.requestAnimationFrame(() => animate(translateTo, transition))
      : animate(translateTo, transition);
  };

  const onTransitionEnd = () => {
    if (currentIndex.current === children.length - 1) {
      currentIndex.current = 1;
      const translateTo = -slideRef.current.offsetWidth;
      animateSlide(translateTo, 'none');
    } else if (currentIndex.current === 0) {
      currentIndex.current = children.length - 2;
      const translateTo = -slideRef.current.offsetWidth * currentIndex.current;
      animateSlide(translateTo, 'none');
    }
  };

  useEffect(() => {
    if (props.children.length > 1) {
      setAutoScroll();
      //These below event Listener creating issue on iOS navigation links
      // slideRef.current.addEventListener('mousedown', onTouchStart, false);
      // slideRef.current.addEventListener('mousemove', onTouchMove, false);
      // slideRef.current.addEventListener('mouseup', onTouchEnd, false);
      slideRef.current.addEventListener('touchstart', onTouchStart, false);
      slideRef.current.addEventListener('touchmove', onTouchMove, false);
      slideRef.current.addEventListener('touchend', onTouchEnd, false);
      slideRef.current.addEventListener(
        'transitionend',
        onTransitionEnd,
        false
      );
      if (isPaymentPage && isDesktop()) {
        slideRef.current.addEventListener('mousedown', onTouchStart, false);
        slideRef.current.addEventListener('mouseup', onTouchEnd, false);
      }
    } else {
      slideRef.current.style.transform = `none`;
    }
  }, []);

  return (
    <div className={isPaymentPage ? Styles.paymentConatiner : Styles.container}>
      <div ref={slideRef} className={Styles.slides}>
        {children}
      </div>
      {props.showDots && props.children.length > 1 ? (
        <div className={Styles.dots} ref={dotsRef}>
          {props.children.map((item, index) => (
            <div
              key={index}
              className={`${Styles.circle} ${
                isPaymentPage ? Styles.circlePayment : Styles.circleOCP
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

SlickCarousel.propTypes = {
  showDots: PropTypes.bool,
  slideInterval: PropTypes.number
};
SlickCarousel.defaultProps = {
  showDots: true,
  slideInterval: 2000
};
export default SlickCarousel;
