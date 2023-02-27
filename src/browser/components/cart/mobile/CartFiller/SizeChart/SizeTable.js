import React from 'react';
import get from 'lodash/get';

// Style Related imports.
import Styles from './sizeChart.base.css';

const getSizeTableHeader = sizes => {
  const sizesList = get(sizes, '0.allSizesList') || [];
  const measurements = get(sizes, '0.measurements');
  if (measurements && measurements.length) {
    return (
      <thead>
        <tr>
          {sizesList.map((item, key) => (
            <th key={key}>{get(item, 'prefix') || get(item, 'size')}</th>
          ))}
          {measurements.map((item, key) => (
            <th key={key}>{item.name}</th>
          ))}
        </tr>
      </thead>
    );
  }
  return null;
};

const getSizeTableBody = sizes => {
  if (sizes && sizes.length) {
    return (
      <tbody>
        {sizes.map((item, key) => {
          const measurements = item.measurements || [];
          if (measurements.length) {
            return (
              <tr key={key}>
                {item.allSizesList.map(size => (
                  <td>{size.sizeValue}</td>
                ))}
                {measurements.map(measurement => (
                  <td>{measurement.value}</td>
                ))}
              </tr>
            );
          }
          return null;
        })}
      </tbody>
    );
  }
  return null;
};

const SizeTable = props => {
  const sizes = get(props, 'product.sizes') || [];
  const sizesList = get(sizes, '0.allSizesList') || [];
  const measurements = get(sizes, '0.measurements') || [];

  if (sizesList.length && measurements.length) {
    return (
      <div className={Styles.tableContainer}>
        <table>
          {getSizeTableHeader(sizes)}
          {getSizeTableBody(sizes)}
        </table>
      </div>
    );
  }
  return null;
};

export default SizeTable;
