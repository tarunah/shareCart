import React from 'react';
import PropTypes from 'prop-types';

const Tip = ({ message, show, styles }) =>
  show &&
  message && (
    <div className={styles.tip}>
      <span className={styles.tipHead}>Tip:</span> {message}
    </div>
  );

Tip.defaultProps = {
  show: true
};

Tip.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
  styles: PropTypes.object
};

export default Tip;
