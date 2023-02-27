import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';

const boundFuncs = ['selectBlock', 'selectCheckoutOption'];

class PriorityCheckoutModalContainer extends React.Component {
  constructor(props) {
    super(props);

    // State:
    // selected -> id of current block selected
    // checkoutOptionSelected -> true if 'agree checkbox' is selected in 'Early Checkout' section.
    this.state = {
      selected: props.coverFeeOpted ? 'earlyCheckout' : '',
      checkoutOptionSelected: props.coverFeeOpted
    };

    boundFuncs.forEach(method => (this[method] = this[method].bind(this)));
  }

  // Selects 'Early Checkout' section or 'Wait for Sale' section
  selectBlock(e) {
    this.setState({
      selected: e.currentTarget.id
    });

    if (e.currentTarget.id === 'waitForSale' && this.props.closeModal) {
      setTimeout(() => {
        this.props.closeModal();
      }, 600);
    }
  }

  // Selects 'agree checkbox' in 'Early Checkout' section
  selectCheckoutOption() {
    this.setState(prevState => ({
      checkoutOptionSelected: !prevState.checkoutOptionSelected
    }));
  }

  render() {
    const {
      state,
      props: { render }
    } = this;

    return render(state, pick(this, boundFuncs));
  }
}

PriorityCheckoutModalContainer.propTypes = {
  render: PropTypes.func,
  coverFeeOpted: PropTypes.bool,
  closeModal: PropTypes.func
};

export default PriorityCheckoutModalContainer;
