import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { isLoggedIn, isPWA, navigateTo } from 'commonBrowserUtils/Helper';

import Modal from 'commonComp/Modal';
import AddressForm from '../../address/common/AddressForm';
import CheckDeliveryModalV2 from './CheckDeliveryModalV2';
import { StickyHeaderContainer } from 'commonComp/Animation';

import Styles from './addressStripV2.base.css';
import { checkoutPage, windowEvents } from 'commonUtils/constants';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

const CHECK_DELIVERY_MODAL = 'checkdelivery';
const ADD_ADDRESS_MODAL = 'addaddressmodal';
const EDIT_ADDRESS_MODAL = 'editaddressmodal';

const getIdFromHash = () => {
  const hash = (window.location.hash || '').substring(1);
  if (hash === '' || Number.isNaN(Number(hash))) return '';
  return Number(hash);
};

class AddressStripV2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: '',
      isModalOpen: false
    };
    this.hashId = null;
    this.isPWA = isPWA();
    [
      'getdeliveryInfo',
      'openCheckDeliveryModal',
      'handleAddNewAddressClick',
      'hideModal',
      'handleEditAddressClick',
      'handleDeleteAddress',
      'onBackClick',
      'showDeliveryModal'
    ].forEach(method => (this[method] = this[method].bind(this)));
  }

  componentDidMount() {
    !!getIdFromHash() && this.openCheckDeliveryModal();
    isFeatureEnabled('ORDER_REVIEW') &&
      this.props?.isOrderReview &&
      triggerEvent('ADDRESS_WIDGET_LOAD');
  }

  async openCheckDeliveryModal() {
    const { addressData, handleAddressAction, page } = this.props;
    if (page === checkoutPage.PAYMENT && this.props.mode === 'mobile') {
      triggerEvent('CHANGE_ADDRESS_BTN_CLICK_PAYMENT');
      triggerEvent('ADDRESS_WIDGET_CLICK');
      navigateTo('/checkout/address/list?referer=payment', true);
      return;
    }

    triggerEvent('CHANGE_ADDRESS_BTN_CLICK_CART');

    if (!getIdFromHash()) {
      const addressId = get(this, 'props.addressInfo.id') || '';
      window.ckrrhistory.push(`#${addressId}`);
    }

    try {
      if (isLoggedIn() && (!addressData || !addressData.length)) {
        await handleAddressAction('getAllAddress');
      }
    } catch (err) {
      console.log(err);
    } finally {
      this.setState({
        modalType: CHECK_DELIVERY_MODAL,
        isModalOpen: true
      });
    }
  }

  handleEditAddressClick(e) {
    triggerEvent('EDIT_ADDRESS_BTN_CLICK');
    const element = e.currentTarget.getAttribute('data-addressid');
    if (this.props.mode === 'mobile' && this.props.history) {
      setTimeout(() => {
        this.props.history.push(`/checkout/cart/address/edit/${element}`);
      }, 100);
    } else {
      this.setState({
        modalType: EDIT_ADDRESS_MODAL
      });
    }
  }

  async handleDeleteAddress(unifiedAddressId) {
    triggerEvent('DELETE_ADDRESS_BTN_CLICK');
    await this.props.handleAddressAction('removeAddress', unifiedAddressId);
  }

  handleAddNewAddressClick(e) {
    const node = get(e, 'currentTarget');
    const isTopButton = node.getAttribute('data-position') === 'top';
    triggerEvent(
      isTopButton ? 'ADD_ADDRESS_TOP_BTN_CLICK' : 'ADD_ADDRESS_BOTTOM_BTN_CLICK'
    );

    if (this.props.mode === 'mobile' && this.props.history) {
      this.props.history.goBack();
      setTimeout(() => {
        this.props.history.push('/checkout/cart/address/add');
      }, 100);
    } else {
      this.setState({
        modalType: ADD_ADDRESS_MODAL
      });
    }
  }

  hideModal() {
    this.setState({
      modalType: '',
      isModalOpen: false
    });
  }

  onBackClick() {
    this.setState({
      modalType: CHECK_DELIVERY_MODAL
    });
  }

  showDeliveryModal() {
    this.setState({
      modalType: CHECK_DELIVERY_MODAL
    });
  }

  getDisplayAddressData() {
    const pincode =
      get(this, 'props.addressInfo.pincode') ||
      get(this, 'props.pincode') ||
      '';
    const name = get(this, 'props.addressInfo.user.name') || '';
    const streetAddress = get(this, 'props.addressInfo.streetAddress') || '';
    const locality = get(this, 'props.addressInfo.locality') || '';
    const city = get(this, 'props.addressInfo.city') || '';
    const isAddressAvailable =
      (name && streetAddress && locality && city) || pincode;

    return { pincode, name, streetAddress, locality, city, isAddressAvailable };
  }

  getdeliveryInfo() {
    const {
      pincode,
      name,
      streetAddress,
      locality,
      city
    } = this.getDisplayAddressData();

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
    const topPadding = get(this, 'props.topPadding', 0);
    const page = get(this, 'props.page') || '';
    const { isAddressAvailable } = this.getDisplayAddressData();
    const isNewUser = get(this, 'props.isNewUser', false);
    const stickyClass = `${Styles.sticky} ${
      this.isPWA ? Styles.stickyPwa : ''
    }`;

    const { isModalOpen, modalType } = this.state;

    const btnText = pincode
      ? isDesktop
        ? 'CHANGE ADDRESS'
        : 'CHANGE'
      : 'ENTER PIN CODE';

    return (
      <React.Fragment>
        <StickyHeaderContainer
          overRideTransition={!isAddressAvailable}
          stickyClassName={stickyClass}
          className={`${
            isDesktop ? Styles.desktopContainer : Styles.mobileContainer
          }`}
          disable={isDesktop || isFeatureEnabled('ORDER_REVIEW')}
          slideOutOfViewEventName={windowEvents.SLIDE_OUT_OF_VIEW_EVENT_NAME}
          slideIntoViewEventName={windowEvents.SLIDE_INTO_VIEW_EVENT_NAME}
          topPadding={topPadding}
          page={page}
        >
          <div onClick={this.openCheckDeliveryModal}>
            {this.getdeliveryInfo()}
            <div
              className={`${Styles.changeBtn} ${
                isDesktop ? Styles.changeBtnDesktop : ''
              }`}
            >
              {btnText}
            </div>
          </div>
        </StickyHeaderContainer>

        {isModalOpen && (
          <Modal
            halfCard={!isDesktop}
            className={`${
              isDesktop
                ? Styles.desktopModalContainer
                : Styles.mobileModalContainer
            } ${
              [ADD_ADDRESS_MODAL, EDIT_ADDRESS_MODAL].indexOf(modalType) > -1
                ? Styles.addressModal
                : ''
            }`}
            cancelCallback={this.hideModal}
            cancelIconConfig={{
              show: true
            }}
            disableBackdropClick={true}
          >
            {modalType === CHECK_DELIVERY_MODAL && (
              <CheckDeliveryModalV2
                pincode={pincode}
                addressId={addressId}
                addressData={addressData}
                hashId={getIdFromHash()}
                hideModal={this.hideModal}
                updateUserSelectedLocation={
                  this.props.updateUserSelectedLocation
                }
                handleAddressAction={this.props.handleAddressAction}
                handleDeleteAddress={this.handleDeleteAddress}
                handleEditAddressClick={this.handleEditAddressClick}
                handleAddNewAddressClick={this.handleAddNewAddressClick}
              />
            )}
            {modalType === ADD_ADDRESS_MODAL && (
              <AddressForm
                handleAddressAction={this.props.handleAddressAction}
                successCallback={this.hideModal}
                showBack={isDesktop}
                onBack={this.onBackClick}
                showHeader={true}
                formClass={Styles.removeMargin}
                isNewUser={isNewUser}
              />
            )}
            {modalType === EDIT_ADDRESS_MODAL && (
              <AddressForm
                handleAddressAction={this.props.handleAddressAction}
                successCallback={this.showDeliveryModal}
                showHeader={true}
                showBack={isDesktop}
                onBack={this.onBackClick}
                formClass={Styles.removeMargin}
                addressInfo={addressData.find(
                  address => get(address, 'id') === getIdFromHash()
                )}
              />
            )}
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

AddressStripV2.propTypes = {
  pincode: PropTypes.string,
  addressInfo: PropTypes.object,
  addressData: PropTypes.array,
  mode: PropTypes.string,
  history: PropTypes.object,
  updateUserSelectedLocation: PropTypes.func,
  handleAddressAction: PropTypes.func,
  stickyAddressConfig: PropTypes.object,
  topPadding: PropTypes.number
};

export default AddressStripV2;
