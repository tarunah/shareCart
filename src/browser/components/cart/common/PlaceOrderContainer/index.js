import React from 'react';
import PropTypes from 'prop-types';
import pick from 'lodash/pick';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

const boundFuncs = [
  'togglePCModal',
  'togglePCModalDisplay',
  'onPCConfirm',
  'onPCAgreeCheck'
];

const triggerCoverFeeEvent = operation => {
  triggerEvent('COVER_FEE', {
    maData: {
      entity_type: 'CoverFee',
      entity_id: ''
    },
    custom: {
      custom: {
        v1: operation
      }
    }
  });
};
class PlaceOrderContainer extends React.Component {
  constructor(props) {
    super(props);

    this.pcConfig = getKVPairValue('PRIORITY_CHECKOUT');

    boundFuncs.forEach(method => (this[method] = this[method].bind(this)));

    // State:
    // showPcModal -> If mobile, this will be true if coverFee is opted. Modal will be there, but minimised. If desktop, false by default.
    // pcDisplay -> If coverFee is opted, modal will be minimised in mobile. Not used in desktop
    // pcConfirmed -> If coverFee is opted, true otherwise false.
    this.state = {
      showPCModal: props.type === 'mobile' && props.coverFeeOpted,
      pcDisplay: !props.coverFeeOpted,
      pcConfirmed: props.coverFeeOpted
    };
  }

  // Toggles priority checkout modal
  togglePCModal() {
    this.setState(prevState => ({
      showPCModal: !prevState.showPCModal
    }));
  }

  // Toggles priority checkout modal display state. Used in mobile view.
  // Modal is minimised if pcDisplay is false.
  togglePCModalDisplay() {
    this.setState(prevState => ({
      pcDisplay: !prevState.pcDisplay
    }));
  }

  // Function that makes the call for applying or removing coverFee.
  // In desktop, it is called when confirm button is clicked in 'Early Checkout' section, after clicking 'agree checkbox'.
  // In mobile, it is called when 'agree checkbox' is clicked.
  onPCConfirm() {
    const {
      state: { pcConfirmed }
    } = this;
    this.props.handleCartAction(
      pcConfirmed ? 'coverFeeRemove' : 'coverFeeApply',
      null,
      () => {
        triggerCoverFeeEvent(
          pcConfirmed ? 'REMOVE_COVERFEE' : 'APPLY_COVERFEE'
        );
        this.setState(prevState => ({
          pcConfirmed: !prevState.pcConfirmed
        }));
      }
    );
  }

  // Function is called when 'agree checkbox' below 'place order' button is deselected.
  // Only called in desktop.
  onPCAgreeCheck() {
    this.props.handleCartAction('coverFeeRemove', null, () => {
      triggerCoverFeeEvent('REMOVE_COVERFEE');
      this.setState({
        pcConfirmed: false
      });
    });
  }

  render() {
    const {
      state,
      props: { render },
      pcConfig
    } = this;

    return render(state, pcConfig, pick(this, boundFuncs));
  }
}

PlaceOrderContainer.propTypes = {
  render: PropTypes.func,
  handleCartAction: PropTypes.func,
  coverFeeOpted: PropTypes.bool,
  type: PropTypes.string
};

export default PlaceOrderContainer;
