import React, { useEffect, useRef } from 'react';

/**
 * Lazy Load Sensor Component
 */
const IntersectionObserverComponent = ({
  id = 'data-sensor',
  options = {},
  triggerAction
}) => {
  const ref = useRef(null);
  const trigger = useRef(triggerAction);
  const isTriggered = useRef(false);
  const { root = null, rootMargin = '0px', threshold = 0.1 } = options;

  if (!'IntersectionObserver' in window) return;

  useEffect(() => {
    trigger.current = triggerAction;
  }, [triggerAction]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isTriggered.current) {
          isTriggered.current = true;
          trigger.current();
        }
      },
      {
        root,
        rootMargin,
        threshold
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref]);

  return <div ref={ref} id={id}></div>;
};

export default IntersectionObserverComponent;
