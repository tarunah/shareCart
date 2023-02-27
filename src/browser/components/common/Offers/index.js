import React from 'react';
import PropTypes from 'prop-types';

// Style Related import.
import Style from './offers.base.css';

import ChevronUp from 'iconComp/ChevronUp.jsx';
import ChevronDown from 'iconComp/ChevronDown.jsx';

class Offers extends React.PureComponent {
  constructor(props) {
    super(props);
    // Method Binds.
    ['toggleInfo'].forEach(method => (this[method] = this[method].bind(this)));

    this.state = {
      expanded: false
    };
  }

  toggleInfo() {
    this.setState(prevState => {
      return {
        expanded: !prevState.expanded
      };
    });
  }

  render() {
    const { title, messages, defaultMessageCount, enabled } = this.props;
    const { expanded } = this.state;

    const length = expanded
      ? messages.length
      : Math.min(defaultMessageCount, messages.length);
    const displayedMessages = messages.slice(0, length);

    return enabled ? (
      <div className={Style.container}>
        <div className={Style.title}>{title}</div>
        <div>
          {displayedMessages.map((messageObject, key) => (
            <li key={`offerMessages${key}`} className={Style.message}>
              <span>{messageObject.message}</span>
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
              {expanded ? 'Show Less' : 'Show More'}
              {expanded ? (
                <ChevronUp className={Style.arrowIcon} />
              ) : (
                <ChevronDown className={Style.arrowIcon} />
              )}
            </div>
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
  defaultMessageCount: PropTypes.number
};

export default Offers;
