import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Link } from 'react-router-dom';

import { isLoggedIn } from 'commonBrowserUtils/Helper';

import Modal from 'commonComp/Modal';
import Button from 'vision/components/Button';
import AddressForm from '../../../address/common/AddressForm';
import CheckDelivery from './CheckDelivery';

import Styles from './addressStrip.base.css';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

const CHECK_DELIVERY_MODAL = 'checkdelivery';
const ADDRESS_MODAL = 'addressmodal';

class AddressStrip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalType: '',
      isModalOpen: false
    };

    [
      'getdeliveryInfo',
      'openCheckDeliveryModal',
      'handleAddNewAddressClick',
      'hideModal'
    ].forEach(method => (this[method] = this[method].bind(this)));
  }

  componentDidMount() {
    isFeatureEnabled('ORDER_REVIEW') &&
      get(this, 'props.isPaymentPage', false) &&
      triggerEvent('ADDRESS_WIDGET_LOAD');
  }

  async openCheckDeliveryModal() {
    const { addressData, handleAddressAction } = this.props;
    triggerEvent('CHANGE_ADDRESS_BTN_CLICK');
    try {
      if (isLoggedIn() && (!addressData || !addressData.length)) {
        await handleAddressAction('getAllAddress');
      }
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({
        modalType: CHECK_DELIVERY_MODAL,
        isModalOpen: true
      });
    }
  }

  handleAddNewAddressClick() {
    if (this.props.mode === 'mobile' && this.props.history) {
      this.props.history.goBack();
      setTimeout(() => {
        this.props.history.push('/checkout/cart/address/add');
      }, 100);
    } else {
      this.setState({
        modalType: ADDRESS_MODAL
      });
    }
  }

  hideModal() {
    this.setState({
      modalType: '',
      isModalOpen: false
    });
  }

  getdeliveryInfo() {
    const pincode =
      get(this, 'props.addressInfo.pincode') ||
      get(this, 'props.pincode') ||
      '';
    const name = get(this, 'props.addressInfo.user.name') || '';
    const streetAddress = get(this, 'props.addressInfo.streetAddress') || '';
    const locality = get(this, 'props.addressInfo.locality') || '';
    const city = get(this, 'props.addressInfo.city') || '';

    if (name && streetAddress && locality && city) {
      return (
        <div className={Styles.title}>
          <div className={Styles.addressName}>
            {`Deliver to: `}
            <span className={Styles.highlight}>{name}</span>
            <div className={Styles.highlight}>{`, ${pincode}`}</div>
          </div>
          <div className={Styles.subText}>
            {`${streetAddress}, ${locality}, ${city}`}
          </div>
        </div>
      );
    } else if (pincode) {
      return (
        <div className={Styles.title}>
          Deliver to:
          <span className={Styles.highlight}>{` ${pincode}`}</span>
        </div>
      );
    }

    return (
      <div className={Styles.highlight}>Check delivery time & services</div>
    );
  }

  render() {
    const pincode = get(this, 'props.pincode') || '';
    const addressId = get(this, 'props.addressInfo.id') || '';
    const addressData = get(this, 'props.addressData') || [];
    const isDesktop = get(this, 'props.mode') === 'desktop';
    const isNewUser = get(this, 'props.isNewUser', false);
    const isPaymentPage = get(this, 'props.isPaymentPage', false);
    const { isModalOpen, modalType } = this.state;

    const btnText = pincode
      ? isDesktop
        ? 'CHANGE ADDRESS'
        : 'CHANGE'
      : 'ENTER PIN CODE';
    return (
      <React.Fragment>
        <div
          className={`${
            isDesktop ? Styles.desktopContainer : Styles.mobileContainer
          } ${isPaymentPage ? Styles.paymentContainer : ''}`}
          onClick={!isPaymentPage && this.openCheckDeliveryModal}
        >
          {this.getdeliveryInfo()}

          {isDesktop ? (
            isFeatureEnabled('ORDER_REVIEW') && isPaymentPage ? (
              <Link to="/checkout/address?referer=payment">
                <Button
                  variant="outlined"
                  pt={4}
                  pb={4}
                  fontSize="body3"
                  onClick={() => triggerEvent('ADDRESS_WIDGET_CLICK')}
                >
                  {btnText}
                </Button>
              </Link>
            ) : (
              <Button variant="outlined" pt={4} pb={4} fontSize="body3">
                {btnText}
              </Button>
            )
          ) : (
            <Button variant="text" fontSize="body3" mr={2}>
              {btnText}
            </Button>
          )}
        </div>

        {isModalOpen && (
          <Modal
            halfCard={!isDesktop}
            className={`${
              isDesktop
                ? Styles.desktopModalContainer
                : Styles.mobileModalContainer
            } ${modalType === ADDRESS_MODAL ? Styles.addressModal : ''}`}
            cancelCallback={this.hideModal}
            cancelIconConfig={{
              show: true
            }}
            disableBackdropClick={true}
          >
            {modalType === CHECK_DELIVERY_MODAL && (
              <CheckDelivery
                pincode={pincode}
                addressId={addressId}
                addressData={addressData}
                hideModal={this.hideModal}
                updateUserSelectedLocation={
                  this.props.updateUserSelectedLocation
                }
                handleAddNewAddressClick={this.handleAddNewAddressClick}
              />
            )}
            {modalType === ADDRESS_MODAL && (
              <AddressForm
                handleAddressAction={this.props.handleAddressAction}
                successCallback={this.hideModal}
                showHeader={true}
                formClass={Styles.removeMargin}
                isNewUser={isNewUser}
              />
            )}
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

AddressStrip.propTypes = {
  pincode: PropTypes.string,
  addressInfo: PropTypes.object,
  addressData: PropTypes.array,
  mode: PropTypes.string,
  history: PropTypes.object,
  updateUserSelectedLocation: PropTypes.func,
  handleAddressAction: PropTypes.func
};

export default AddressStrip;
