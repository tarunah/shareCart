import React from 'react';

export default styles => (Component, props = {}) => (
  <Component styles={styles} {...props} />
);
