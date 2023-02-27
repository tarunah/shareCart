import React from 'react';
import PropTypes from 'prop-types';
import Styles from './timer.base.css';

/*
 * generic timer takes endDate and starts a timer
 * <Timer endDate={deadline} onTimerExpiry={() => {console.log('timer expired')}}/>
 */

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: {}
    };
    this.updateClock = this.updateClock.bind(this);
  }

  componentDidMount() {
    // running immediately once to avoid delay
    this.updateClock();
    this.timerId = setInterval(this.updateClock, 1000);
  }

  updateClock() {
    const timer = this.getTimeRemaining(this.props.endDate);
    if (timer.total <= 0) {
      clearInterval(this.timerId);
      this.setState({
        timer: {}
      });
      this.props.onTimerExpiry && this.props.onTimerExpiry();
    } else {
      this.setState({
        timer
      });
    }
  }

  getTimeRemaining(endTime) {
    const t = parseInt(endTime, 10) - new Date().getTime();
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      total: t,
      days,
      hours,
      minutes,
      seconds
    };
  }

  render() {
    if (!this.state.timer.total) {
      return null;
    }
    const timer = this.state.timer;
    const { labelStyle, digitStyle, width, separator, unit } = this.props;
    return (
      <div className={Styles.timerContainer}>
        {timer.days > 0 && (
          <span>
            <span className={Styles.timer} style={digitStyle}>
              {timer.days < 10 && '0'}
              {timer.days}
            </span>
            {unit && (
              <span style={labelStyle}>
                {timer.days > 1 ? ' Days' : ' Day'}{' '}
              </span>
            )}
            {separator && <span> : </span>}
          </span>
        )}
        <span className={Styles.timer} style={digitStyle}>
          {timer.hours < 10 && '0'}
          {timer.hours}
        </span>
        {unit && <span style={labelStyle}> Hrs </span>}
        {separator && <span> : </span>}
        <span className={Styles.timer} style={digitStyle}>
          {timer.minutes < 10 && '0'}
          {timer.minutes}
        </span>
        {unit && <span style={labelStyle}> Min </span>}
        {separator && <span> : </span>}
        <span className={Styles.timer} style={digitStyle}>
          {timer.seconds < 10 && '0'}
          {timer.seconds}
        </span>
        {unit && <span style={labelStyle}> Sec </span>}
      </div>
    );
  }
}

Timer.propTypes = {
  endDate: PropTypes.number.isRequired,
  onTimerExpiry: PropTypes.func
};

Timer.defaultProps = {
  endDate: new Date(),
  unit: true,
  separator: true
};

export default Timer;
