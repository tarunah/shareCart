import { useRef } from 'react';

export default (callback = () => {}) => {
  const hasBeenCalled = useRef(false);

  if (hasBeenCalled.current) return;

  callback();

  hasBeenCalled.current = true;
};
