import React from 'react';
import get from 'lodash/get';

// Style related imports.
import Styles from './sizeChart.base.css';

// React Component Imports.
import SizeTable from './SizeTable';
import SizeImage from './SizeImage';

import Close from 'iconComp/Close.jsx';

const SizeChart = props => {
  const { product = {} } = props;

  return (
    <div className={Styles.sizeChart}>
      <Close className={Styles.crossIcon} onClick={props.toggleSizeChart} />
      <div className={Styles.header}>
        <h6 className={Styles.cardTitle}> {get(product, 'name')} </h6>
        <h4> Size Options: </h4>
      </div>
      <SizeTable product={product} />
      <SizeImage product={product} />
    </div>
  );
};

export default SizeChart;
