import { useState } from 'react';

export default (initialState = false) => {
  const [isModalShown, setVisibility] = useState(initialState);

  const toggle = () => setVisibility(!isModalShown);

  return [isModalShown, toggle];
};
