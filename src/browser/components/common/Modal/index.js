import React from 'react';
import PropTypes from 'prop-types';

import Styles from './modal.base.css';

import Close from 'iconComp/Close.jsx';

import { getAppVersionBasedConfig } from 'commonBrowserUtils/Helper';

const stopBodyScrolling = (stopScrolling = false) => {
  if (stopScrolling) {
    document.body.classList.add(`${Styles.stopScroll}`);
  } else {
    document.body.classList.remove(`${Styles.stopScroll}`);
  }
};

// TODO: Fix it properly by making Modal more extensible
const checkForHash = () =>
  window.location.hash.includes('#') &&
  !window.location.href.includes('#payment') &&
  !window.location.href.includes('#disableBack');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    ['setReference', 'handleClick'].forEach(
      method => (this[method] = this[method].bind(this))
    );
  }

  componentDidMount() {
    if (this.props.stopBackgroundScroll) {
      stopBodyScrolling(true);
    }
    if (this.props.closeOnBack && this.props.enableBackButton) {
      window.addEventListener('popstate', this.props.cancelCallback, false);
      !checkForHash() && this.addToURLHash();
    }
  }

  componentWillUnmount() {
    stopBodyScrolling(false);
    if (this.props.closeOnBack && this.props.enableBackButton) {
      window.removeEventListener('popstate', this.props.cancelCallback, false);
      if (checkForHash()) {
        this.removeURLHash();
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.cancelCallback !== this.props.cancelCallback &&
      this.props.closeOnBack &&
      this.props.enableBackButton
    ) {
      window.removeEventListener('popstate', prevProps.cancelCallback, false);
      window.addEventListener('popstate', this.props.cancelCallback, false);
    }
  }

  addToURLHash() {
    window.ckrrhistory && window.ckrrhistory.push('#modal');
  }

  removeURLHash() {
    window.ckrrhistory && window.ckrrhistory.goBack();
  }

  handleClick(e) {
    if (this.props.disableBackdropClick) {
      return;
    }
    if (
      this.reference &&
      e.currentTarget.contains(e.target) &&
      !this.reference.contains(e.target)
    ) {
      this.props.goBackOnClose
        ? this.removeURLHash()
        : this.props.cancelCallback(e);
    }
  }

  setReference(node) {
    this.reference = node;
  }

  render() {
    const {
      style,
      className = '',
      cancelIconConfig = {},
      children,
      halfCard,
      show,
      goBackOnClose,
      id = ''
    } = this.props;

    return (
      <div
        id={id}
        role="dialog"
        className={`${Styles.container} ${show ? '' : Styles.hide}`}
        onClick={this.handleClick}
      >
        <div
          className={
            halfCard
              ? `${Styles.halfCard} ${
                  getAppVersionBasedConfig('ignoreIosBottomBar')
                    ? ''
                    : Styles.iosHalfCard
                } ${className}`
              : `${Styles.modal} ${className}`
          }
          style={style}
          ref={this.setReference}
        >
          {cancelIconConfig.show && (
            <Close
              data-testid="modal-close"
              className={`${Styles.cancelIcon} ${cancelIconConfig.className ||
                ''}`}
              fill={cancelIconConfig.color}
              onClick={
                goBackOnClose ? this.removeURLHash : this.props.cancelCallback
              }
            />
          )}
          {typeof children === 'function'
            ? children(this.removeURLHash)
            : children}
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  halfCard: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
  id: PropTypes.string,
  cancelCallback: PropTypes.func,
  hide: PropTypes.bool,
  disableBackdropClick: PropTypes.bool,
  stopBackgroundScroll: PropTypes.bool
};

Modal.defaultProps = {
  halfCard: false,
  show: true,
  disableBackdropClick: false,
  closeOnBack: true,
  enableBackButton: true,
  stopBackgroundScroll: false
};

export default Modal;
