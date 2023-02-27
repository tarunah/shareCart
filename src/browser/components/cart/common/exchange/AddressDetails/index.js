import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import { getUidx } from 'commonBrowserUtils/Helper';

import Modal from 'commonComp/Modal';
import Button from 'commonComp/Button';

// Style
import Style from './exchangeAddressDetails.base.css';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import Info from 'iconComp/Info.jsx';

class ExchangeAddressDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.isDesktop = props.mode === 'desktop';
    this.addressMessage =
      get(getKVPairValue('STYLE_EXCHANGE'), 'address') || [];
  }

  toggleModal() {
    this.setState(oldState => {
      if (!oldState.isModalOpen) {
        const {
          addressInfo: { id, pincode }
        } = this.props;
        triggerEvent('STYLE_EXCHANGE_KNOW_MORE_CLICK', {
          custom: {
            custom: {
              v1: pincode,
              v2: id,
              v3: getUidx()
            },
            widget: {
              name: 'style_exchange_know_more_click',
              type: 'button'
            }
          }
        });
      }
      return {
        isModalOpen: !oldState.isModalOpen
      };
    });
  }

  renderModal() {
    if (this.state.isModalOpen) {
      return (
        <Modal
          className={`${Style.modalContainer} ${
            this.isDesktop ? Style.desktopModal : ''
          }`}
          cancelCallback={this.toggleModal}
          cancelIconConfig={{ show: true }}
          halfCard={!this.isDesktop}
        >
          <div>
            <div className={Style.modalHeader}>Address cannot be changed</div>
            <div className={Style.modalBody}>
              {this.addressMessage.map(text => (
                <div>{text || `\n`}</div>
              ))}
            </div>
            <div className={Style.modalFooter}>
              <Button className={Style.buttonStyle} onClick={this.toggleModal}>
                OKAY
              </Button>
            </div>
          </div>
        </Modal>
      );
    }

    return null;
  }

  render() {
    if (!get(this, 'props.addressInfo.id')) {
      return null;
    }

    const {
      addressInfo: {
        user: { name, mobile },
        streetAddress,
        locality,
        landmark,
        city,
        pincode
      }
    } = this.props;

    const isLandmarkEnabled =
      isFeatureEnabled('ADDRESS_LANDMARK') && landmark && landmark.trim();

    return (
      <div
        className={`${Style.container} ${
          this.isDesktop ? Style.desktopContainer : ''
        }`}
      >
        <div className={Style.header}>
          <div className={Style.title}>Exchange address</div>
          Pickup and delivery will happen at the same address
        </div>

        <div className={Style.body}>
          <div className={Style.nameContainer}>
            <div className={Style.name}>{name}</div>
            {mobile}
          </div>
          <div>{`${streetAddress}, ${locality},`}</div>
          {isLandmarkEnabled ? (
            <div className={Style.landmark}>{landmark}</div>
          ) : (
            ''
          )}
          <div>{`${city} - ${pincode}`}</div>
        </div>

        <div className={Style.footer}>
          <Info className={Style.infoIcon} fill="#ff5722" />
          Want to change exchange address?
          <div className={Style.knowMore} onClick={this.toggleModal}>
            Know More
          </div>
        </div>
        {this.renderModal()}
      </div>
    );
  }
}

export default ExchangeAddressDetails;
