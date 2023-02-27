import React from 'react';
import PropTypes from 'prop-types';

import { padZeros } from 'commonBrowserUtils/Helper';

import Styles from './timer.base.css';

const getExpandedDisplay = ({ minutes, seconds }) =>
  `${padZeros(minutes)} min ${padZeros(seconds)} sec`;

const getBasicDisplay = ({ minutes, seconds }) =>
  `${padZeros(minutes)}:${padZeros(seconds)}`;

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: props.seconds,
      minutes: props.minutes
    };
  }

  componentDidMount() {
    this.setupTimer();
  }

  setupTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.timer = setInterval(() => {
      const {
        state: { seconds, minutes }
      } = this;
      if (seconds === 0 && minutes === 0) {
        this.stopTimer();
      } else if (seconds === 0) {
        this.setState({
          seconds: 59,
          minutes: minutes - 1
        });
      } else {
        this.setState({
          seconds: seconds - 1
        });
      }
    }, 1000);
  }

  disableTimer() {
    clearInterval(this.timer);
  }

  enableTimer() {
    this.setupTimer();
  }

  stopTimer() {
    clearInterval(this.timer);
    this.props.stopCallback();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.disabled !== this.props.disabled) {
      if (this.props.disabled) {
        this.disableTimer();
      } else {
        this.enableTimer();
      }
    }
  }

  render() {
    const {
      state: { seconds, minutes },
      props: { className = '', expanded }
    } = this;
    return (
      <div className={`${Styles.timer} ${className}`}>
        {expanded
          ? getExpandedDisplay({ minutes, seconds })
          : getBasicDisplay({ minutes, seconds })}
      </div>
    );
  }
}

Timer.propTypes = {
  seconds: PropTypes.number,
  minutes: PropTypes.number,
  stopCallback: PropTypes.func,
  disabled: PropTypes.bool
};

Timer.defaultProps = {
  disabled: false,
  expanded: false
};

export default Timer;
