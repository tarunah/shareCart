import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'commonComp/Modal';

// Style Related import.
import Style from './offersV2.base.css';

import OfferIcon from 'iconComp/Offers.jsx';
import ChevronUp from 'iconComp/ChevronUp.jsx';
import ChevronDown from 'iconComp/ChevronDown.jsx';

class Offers extends React.Component {
  constructor(props) {
    super(props);
    // Method Binds.
    ['toggleInfo', 'onTncClick', 'hideTncModal'].forEach(
      method => (this[method] = this[method].bind(this))
    );

    this.state = {
      expanded: false,
      tncModal: { show: false, url: '' }
    };
  }

  onTncClick(e) {
    const url = e.target.getAttribute('data-url');
    this.setState({ tncModal: { show: true, url } });
  }

  hideTncModal() {
    this.setState({ tncModal: { show: false, url: '' } });
  }

  toggleInfo() {
    this.setState(prevState => {
      if (!prevState.expanded) {
        triggerEvent('SHOW_MORE_OFFER_BTN_CLICK');
      }
      return {
        expanded: !prevState.expanded
      };
    });
  }

  getMoreLessText(expanded, showMessageCount, moreCount) {
    if (expanded) {
      return 'Show Less';
    }

    if (!expanded && showMessageCount) {
      return `+${moreCount} More ${moreCount > 1 ? 'Offers' : 'Offer'}`;
    }

    return 'Show More';
  }

  render() {
    const {
      title,
      messages,
      defaultMessageCount,
      enabled,
      showMessageCount,
      styleOverrides
    } = this.props;
    const { expanded } = this.state;

    const length = expanded
      ? messages.length
      : Math.min(defaultMessageCount, messages.length);
    const displayedMessages = messages.slice(0, length);

    return enabled ? (
      <div
        className={`
          ${Style.container}
          ${styleOverrides.container}
        `}
      >
        <OfferIcon className={Style.discountIcon} />
        <div className={Style.title}>{title}</div>
        <div>
          {displayedMessages.map((messageObject, key) => (
            <li
              key={`offerMessages${key}`}
              className={`${Style.message} ${
                !expanded ? styleOverrides.defaultMessageStyle : ''
              }`}
            >
              <span>{messageObject.message}</span>
              {messageObject.tnc ? (
                <span
                  onClick={this.onTncClick}
                  data-url={messageObject.tnc.url}
                  className={Style.tncText}
                >
                  {messageObject.tnc.text}
                </span>
              ) : null}
              {messageObject.link ? (
                <span
                  className={Style.link}
                  onClick={messageObject.link.onClick}
                >
                  {messageObject.link.text}
                </span>
              ) : null}
            </li>
          ))}
          {defaultMessageCount !== messages.length && (
            <div onClick={this.toggleInfo} className={Style.more}>
              {this.getMoreLessText(
                expanded,
                showMessageCount,
                messages.length - defaultMessageCount
              )}
              {expanded ? (
                <ChevronUp className={Style.arrowIcon} />
              ) : (
                <ChevronDown className={Style.arrowIcon} />
              )}
            </div>
          )}
          {this.state.tncModal.show && (
            <Modal
              className={Style.tncModal}
              cancelCallback={this.hideTncModal}
              cancelIconConfig={{ show: true }}
            >
              <iframe
                className={Style.iframe}
                src={this.state.tncModal.url}
                sandbox
              />
            </Modal>
          )}
        </div>
      </div>
    ) : null;
  }
}

Offers.propTypes = {
  title: PropTypes.string,
  messages: PropTypes.array,
  enabled: PropTypes.bool,
  defaultMessageCount: PropTypes.number,
  showMessageCount: PropTypes.bool,
  styleOverrides: PropTypes.object
};

Offers.defaultProps = {
  styleOverrides: {
    defaultMessageStyle: '',
    container: ''
  }
};

export default Offers;
