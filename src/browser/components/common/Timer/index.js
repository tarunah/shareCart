/*
 * New common Timer. Existing Payment common timer usage should migrate to this one.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { padZeros } from 'commonBrowserUtils/Helper';

import Styles from './timerCommon.base.css';

const getExpandedDisplay = ({ hours, minutes, seconds, units }) =>
  units
    ? `${padZeros(hours)} hr ${padZeros(minutes)} min ${padZeros(seconds)} sec`
    : `${padZeros(hours)}:${padZeros(minutes)}:${padZeros(seconds)}`;

const getBasicDisplay = ({ hours, minutes, seconds, units }) => {
  if (hours === 0) {
    return units
      ? `${padZeros(minutes)} min ${padZeros(seconds)} sec`
      : `${padZeros(minutes)}:${padZeros(seconds)}`;
  } else {
    return units
      ? `${padZeros(hours)} hr ${padZeros(minutes)} min`
      : `${padZeros(hours)}:${padZeros(minutes)}`;
  }
};

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: props.seconds,
      minutes: props.minutes,
      hours: props.hours
    };
  }

  componentDidMount() {
    if (!this.props.disabled) this.setupTimer();
  }

  setupTimer() {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.timer = setInterval(() => {
      const {
        state: { seconds, minutes, hours }
      } = this;
      if (seconds === 0 && minutes === 0 && hours === 0) {
        this.stopTimer();
      } else if (seconds === 0 && minutes === 0) {
        this.setState({
          seconds: 59,
          minutes: 59,
          hours: hours - 1
        });
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
    this.props.stopCallback && this.props.stopCallback();
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
      state: { seconds, minutes, hours },
      props: { className = '', expanded, units }
    } = this;
    return (
      <div className={`${Styles.timer} ${className}`}>
        {expanded
          ? getExpandedDisplay({ hours, minutes, seconds, units })
          : getBasicDisplay({ hours, minutes, seconds, units })}
      </div>
    );
  }
}

Timer.propTypes = {
  seconds: PropTypes.number,
  minutes: PropTypes.number,
  hours: PropTypes.number,
  stopCallback: PropTypes.func,
  disabled: PropTypes.bool
};

Timer.defaultProps = {
  disabled: false,
  expanded: false,
  units: true
};

export default Timer;
