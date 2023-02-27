import React from 'react';
import PropTypes from 'prop-types';

import ImageBanner from 'commonComp/ImageBanner';

import Styles from './errorPage.base.css';

const onReload = () => window.location.reload();

const ErrorPage = ({ message, reload = false }) => (
  <div data-testid="errorpage" className={Styles.mainContainer}>
    <div className={Styles.subContainer}>
      <ImageBanner name="error" />
      <div className={Styles.errorText}>{message}</div>
      {reload && (
        <div className={Styles.reload} onClick={onReload}>
          Reload
        </div>
      )}
    </div>
  </div>
);

ErrorPage.defaultProps = {
  message: 'Something went wrong! Please reload.',
  reload: false
};

ErrorPage.propTypes = {
  message: PropTypes.string,
  reload: PropTypes.bool
};

export default ErrorPage;
