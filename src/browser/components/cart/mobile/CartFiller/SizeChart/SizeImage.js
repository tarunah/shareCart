import React from 'react';
import get from 'lodash/get';

// Style related imports.
import Styles from './sizeChart.base.css';

// Functional Imports.
import securify from 'commonBrowserUtils/securify';
const secure = securify();

const SizeImage = props => {
  const { product = {} } = props;
  const sizeChartUrl = get(product, 'sizechart.sizeChartUrl');
  const sizeRepresentationUrl = get(product, 'sizechart.sizeRepresentationUrl');
  let imageComponent = null;

  if (sizeRepresentationUrl && sizeRepresentationUrl !== 'NA') {
    const imageStyle = {
      backgroundImage: `url('${secure(sizeRepresentationUrl)}')`
    };
    imageComponent = (
      <div style={imageStyle} className={Styles.sizeChartImage} />
    );
  } else if (sizeChartUrl && sizeChartUrl !== 'NA') {
    imageComponent = <img src={secure(sizeChartUrl)} alt="Size-Chart" />;
  }

  if (imageComponent) {
    return <div className={Styles.sizeImage}> {imageComponent} </div>;
  }
  return null;
};

export default SizeImage;
