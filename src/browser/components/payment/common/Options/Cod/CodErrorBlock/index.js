import React from 'react';
import PropTypes from 'prop-types';

import Style from './codErrorBlock.base.css';

import PaymentOptionError from '../../PaymentOptionError';

import { ReturnAbuserModal } from 'commonComp/ReturnAbuserV2';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';

const KnowMore = ({ onClick }) => (
  <span className={Style.knowMore} onClick={onClick}>
    Know more
  </span>
);

class CodErrorBlock extends React.Component {
  constructor() {
    super();
    this.state = { showReturnAbuserModal: false };
    this.toggleReturnAbuserModal = this.toggleReturnAbuserModal.bind(this);
  }

  toggleReturnAbuserModal() {
    this.setState({ showReturnAbuserModal: !this.state.showReturnAbuserModal });
  }

  render() {
    const { code, paymentInstrumentDetails, updateStickyButton } = this.props;
    if (code === PaymentConstants.RETURN_ABUSER_CODE) {
      return (
        <div>
          <PaymentOptionError
            option="Pay on delivery"
            code={code}
            updateStickyButton={updateStickyButton}
          >
            <KnowMore onClick={this.toggleReturnAbuserModal} />
          </PaymentOptionError>
          {this.state.showReturnAbuserModal && (
            <ReturnAbuserModal
              type="noCod"
              cancelCallback={this.toggleReturnAbuserModal}
            />
          )}
        </div>
      );
    } else {
      return (
        <PaymentOptionError
          option="Pay on delivery"
          code={code}
          paymentInstrumentDetails={paymentInstrumentDetails}
          updateStickyButton={updateStickyButton}
        />
      );
    }
  }
}

CodErrorBlock.propTypes = {
  code: PropTypes.number.isRequired,
  paymentInstrumentDetails: PropTypes.object
};

export default CodErrorBlock;
