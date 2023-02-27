import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import Image from 'commonComp/Image';
import Modal from 'commonComp/Modal';
import Button from 'commonComp/Button';
import Captcha from 'commonComp/Captcha';
import { resetPaymentRetrySession } from 'commonBrowserUtils/PaymentHelper';

import { formatDateFromEpoch, getProductDeliveryDate } from '../util';
import ExpressConstants from '../expressConstants';
import Style from '../expresscheckout.base.css';

const { SUBMIT, CAPTCHA_REQUIRED } = ExpressConstants;
const IMAGE_SIZE = { width: 111, height: 148 };

const ArrivalDetails = ({ list }) => {
  return (
    <div className={Style.arrivalList}>
      {list.map(item => (
        <div className={Style.arrivalItem} key={item.id}>
          <div className={Style.itemImg}>
            <Image
              src={get(item, 'image.secureSrc')}
              width={IMAGE_SIZE.width}
              height={IMAGE_SIZE.height}
              visible="true"
            />
          </div>
          Estimated Delivery:&nbsp;
          <b>
            {formatDateFromEpoch(
              getProductDeliveryDate(item.shippingEstimates)
            )}
          </b>
        </div>
      ))}
    </div>
  );
};

ArrivalDetails.propTypes = {
  list: PropTypes.array
};

class MiniHeaderNav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.slideOut = this.slideOut.bind(this);
  }

  slideOut() {
    const { action, section } = this.props;
    if (typeof action === 'function') {
      resetPaymentRetrySession();
      action(section);
    }
  }

  render() {
    const { header, link } = this.props;
    return (
      <div className={Style.headerNav}>
        <div>{header}</div>
        <div className={Style.actionLink} onClick={this.slideOut}>
          {link}
        </div>
      </div>
    );
  }
}

const CaptchaVerification = ({
  onClose,
  setCaptchaRef,
  setLoader,
  setCaptchaDetails,
  submit
}) => (
  <Modal
    className={Style.captchaModal}
    cancelCallback={onClose}
    halfCard={true}
    cancelIconConfig={{
      show: true,
      className: Style.closeXpress
    }}
    stopBackgroundScroll={true}
  >
    <div className={Style.captchaHeader}>{CAPTCHA_REQUIRED}</div>

    <Captcha
      ref={setCaptchaRef}
      setLoader={setLoader}
      setCaptchaDetails={setCaptchaDetails}
    />
    <Button className={Style.captchaSubmit} onClick={submit}>
      {SUBMIT}
    </Button>
  </Modal>
);

MiniHeaderNav.propTypes = {
  header: PropTypes.string,
  link: PropTypes.string,
  action: PropTypes.func,
  section: PropTypes.string
};

MiniHeaderNav.defaultProps = {
  action: () => {}
};

export { MiniHeaderNav, ArrivalDetails, CaptchaVerification };
