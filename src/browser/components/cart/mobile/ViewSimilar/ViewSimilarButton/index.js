import React, { useCallback } from 'react';
import Style from './viewSimilarButton.base.css';
import SimilarIcon from 'iconComp/Similar.jsx';

const ViewSimilarButton = props => {
  return (
    <button className={Style.button} onClick={props.onClick}>
      <SimilarIcon className={Style.similarIcon} />
      VIEW SIMILAR
    </button>
  );
};

export default ViewSimilarButton;
