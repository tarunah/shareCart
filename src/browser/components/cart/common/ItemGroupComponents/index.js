import React from 'react';
import Styles from './itemGroupComponents.base.css';
import PropTypes from 'prop-types';

export const ItemGroupHeader = ({ itemCount, header }) => (
  <div className={Styles.header}>
    {header} ({itemCount})
  </div>
);

ItemGroupHeader.propTypes = {
  itemCount: PropTypes.number,
  header: PropTypes.string
};
