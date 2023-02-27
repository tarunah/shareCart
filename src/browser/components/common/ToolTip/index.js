import React from 'react';
import Styles from './toolTip.base.css';
import PropTypes from 'prop-types';

class ToolTip extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { showMessage: props.isShownDefault };
    this.setReference = this.setReference.bind(this);
    this.showToolTip = this.showToolTip.bind(this);
    this.hideToolTip = this.hideToolTip.bind(this);
    this.id = this.getId();
  }

  getId() {
    let count = window.toolTipCount ? window.toolTipCount + 1 : 1;
    window.toolTipCount = count;
    return 'toolTip-' + count;
  }

  componentDidMount() {
    document.body.addEventListener('click', this.hideToolTip);
    document.body.addEventListener('touchend', this.hideToolTip);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.hideToolTip);
    document.body.removeEventListener('touchend', this.hideToolTip);
  }

  hideToolTip(e) {
    this.reference &&
      !this.reference.contains(e.target) &&
      this.setState({ showMessage: false });
  }

  showToolTip(e) {
    this.setState({ showMessage: true });
  }

  setReference(node) {
    this.reference = node;
  }

  render() {
    let {
      style,
      className = '',
      containerClass = '',
      children,
      elem,
      toolTipRefClass = '',
      tipStyle = {},
      tipClass = ''
    } = this.props;
    return (
      <div className={`${Styles.container} ${containerClass}`}>
        <div
          ref={this.setReference}
          onClick={this.showToolTip}
          className={`${Styles.toolTip} ${toolTipRefClass}`}
          id={this.id}
        >
          {elem}
        </div>
        {this.state.showMessage && (
          <div>
            <div className={`${Styles.message} ${className}`} style={style}>
              {children}
            </div>
            <div style={tipStyle} className={tipClass} />
          </div>
        )}
      </div>
    );
  }
}

ToolTip.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  key: PropTypes.string,
  isShownDefault: PropTypes.bool // set default isShown property
};

ToolTip.defaultProps = {
  isShownDefault: false
};

export default ToolTip;
