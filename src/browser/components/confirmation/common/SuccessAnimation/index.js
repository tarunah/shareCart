import React from 'react';

// Style Related Imports.
import Styles from './successAnimation.base.css';
import Check from 'iconComp/Check.jsx';
import ConfirmCircle from 'iconComp/ConfirmCircle.jsx';

class SuccessAnimation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animationDone: false
    };
  }

  componentDidMount() {
    const tick = document.getElementById('successAnimCircle');
    tick &&
      tick.addEventListener('animationend', () => {
        this.setState({
          animationDone: true
        });
      });
  }

  render() {
    const {
      state: { animationDone }
    } = this;
    return (
      <div className={Styles.parent}>
        <div className={Styles.circle} id="successAnimCircle" />
        <div
          className={`${
            animationDone ? Styles.iconContainer : Styles.displayNone
          } `}
        >
          <div className={Styles.iconBlock}>
            <Check className={Styles.circleTick} id="successAnimCircleTick" />
            <ConfirmCircle className={Styles.successCircle} />
          </div>
          <div className={Styles.orderSuccessful}>Order Successful</div>
        </div>
      </div>
    );
  }
}

export default SuccessAnimation;
