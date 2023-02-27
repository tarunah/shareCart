import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { throttle } from 'commonBrowserUtils/Helper';

import Style from './animation.css';
import { checkoutPage } from 'commonUtils/constants';

export const FadeInAndOut = ({
  children,
  display,
  fadeInDirection = 'INPLACE',
  fadeOutDirection = 'INPLACE',
  customClass = ''
}) => {
  const [shouldRender, render] = useState(display);

  useEffect(() => {
    if (display) {
      render(true);
    }
  }, [display]);

  const onAnimationEnd = () => {
    if (!display) {
      render(false);
    }
  };

  let className = '';

  if (display) {
    switch (fadeInDirection) {
      case 'UP':
        className = Style.up;
        break;
      case 'INPLACE':
        className = Style.fadeIn;
    }
  } else {
    switch (fadeOutDirection) {
      case 'DOWN':
        className = Style.down;
        break;
      case 'INPLACE':
        className = Style.fadeOut;
    }
  }
  return shouldRender ? (
    <div
      className={`${className} ${customClass}`}
      onAnimationEnd={onAnimationEnd}
    >
      {children}
    </div>
  ) : null;
};

export const DelayedRender = ({ children, delay }) => {
  const [shouldRender, setRender] = useState(false);

  useEffect(() => {
    window.setTimeout(() => setRender(true), delay);
  }, []);

  return shouldRender ? children : null;
};

export const StickyHeaderContainer = ({
  children,
  overRideTransition,
  className,
  topPadding = 0,
  stickyClassName,
  disable,
  slideOutOfViewEventName,
  slideIntoViewEventName,
  page = ''
}) => {
  const [reachedTop, setReachedTop] = useState(false);
  const [containerStyle, setContainerStyle] = useState({});
  const containerRef = useRef(null);
  const stickyContainerRef = useRef(null);
  const contextRef = useRef();

  const scrollListener = () => {
    if (!get(contextRef, 'current.nodeOffsetTop', false)) return;
    const hasReachedTop = contextRef.current.nodeOffsetTop < window.scrollY;

    if (hasReachedTop) {
      setReachedTop(true);
    } else {
      setReachedTop(false);
    }
  };

  const slideOutOfView = e => {
    if (stickyContainerRef && contextRef.current.inView) {
      setContainerStyle({
        position: 'absolute',
        top: e.detail.topBorder
      });
      contextRef.current.inView = false;
    }
  };

  const slideIntoView = () => {
    if (stickyContainerRef && !contextRef.current.inView) {
      setContainerStyle({});
      contextRef.current.inView = true;
    }
  };

  useEffect(() => {
    const throttledScroll = throttle(scrollListener, 5);
    window.addEventListener('scroll', throttledScroll);
    window.addEventListener(slideOutOfViewEventName, slideOutOfView);
    window.addEventListener(slideIntoViewEventName, slideIntoView);

    const node = containerRef.current;
    // setting node offset for AOC variant3 to be sticky in cart.
    contextRef.current = {
      nodeOffsetTop:
        page === checkoutPage.CART ? 1 : node.offsetTop - topPadding,
      inView: true
    };

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener(slideOutOfViewEventName, slideOutOfView);
      window.removeEventListener(slideIntoViewEventName, slideIntoView);
    };
  }, []);

  const isSticky = !disable && reachedTop;
  return (
    <React.Fragment>
      {React.cloneElement(children, {
        className,
        ref: containerRef
      })}
      {isSticky &&
        React.cloneElement(children, {
          className: `${className} ${stickyClassName} ${Style.cloneSticky}`,
          style: overRideTransition ? {} : containerStyle
        })}
    </React.Fragment>
  );
};

FadeInAndOut.PropTypes = {
  children: PropTypes.node.isRequired,
  display: PropTypes.bool.isRequired,
  fadeInDirection: PropTypes.string,
  fadeOutDirection: PropTypes.string,
  customClass: PropTypes.string
};

DelayedRender.PropTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number.isRequired
};

StickyHeaderContainer.PropTypes = {
  children: PropTypes.node.isRequired,
  overRideTransition: PropTypes.bool,
  className: PropTypes.string,
  stickyClassName: PropTypes.string
};
