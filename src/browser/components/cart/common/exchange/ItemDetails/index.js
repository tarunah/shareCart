import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import { cookieKeys } from 'commonUtils/constants';
import {
  formatDate,
  getUidx,
  currencyValue,
  getDateDiff,
  setCookie,
  getCookie,
  pluralizeText,
  errorNotification
} from 'commonBrowserUtils/Helper';
import { getSnackBarStyleOverrides } from 'commonBrowserUtils/CartHelper';

import Image from 'commonComp/Image';
import Modal from 'commonComp/Modal';
import Button from 'commonComp/Button';
import FormatString from 'commonComp/FormatString';

// Styles
import Style from './exchangeItemDetails.base.css';

import Rupee from 'iconComp/Rupee.jsx';
import Check from 'iconComp/Check.jsx';
import RupeeBold from 'iconComp/RupeeBold.jsx';

const SIZE = 'Size';
const ACTIONS = {
  ADDRESS_ERROR_CANCEL_EXCHANGE: 'cancel-exchange',
  ADDRESS_ERROR_REINITIATE_EXCHANGE: 'reinitiate-exchange',
  HOW_IT_WORKS: 'HOW_IT_WORKS',
  CANCEL_EXCHANGE: 'CANCEL_EXCHANGE',
  EXPIRING_SOON: 'EXPIRING_SOON',
  ADDRESS_ERROR: 'ADDRESS_ERROR'
};

class ExchangeItemDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalType: '',
      selectedCard: '',
      expiryIn: 0
    };

    ['openModal', 'closeModal', 'toggleCards', 'cancelExchange'].forEach(
      method => (this[method] = this[method].bind(this))
    );

    this.isDesktop = props.mode === 'desktop';
    this.styleExchangeConfig = getKVPairValue('STYLE_EXCHANGE');
  }

  componentDidMount() {
    const {
      parentOrderDetail: { orderLineId, storeOrderId, exchangeDateValidityInMs }
    } = this.props;
    const expiryIn = getDateDiff(null, Number(exchangeDateValidityInMs));
    const { threshold = 2 } = get(this.styleExchangeConfig, 'expiry') || {};

    if (
      expiryIn <= threshold &&
      getCookie(cookieKeys.EXCHANGE_EXPIRY_MESSAGE_HIDE) !== storeOrderId
    ) {
      setCookie(cookieKeys.EXCHANGE_EXPIRY_MESSAGE_HIDE, storeOrderId);
      this.setState({ modalType: ACTIONS.EXPIRING_SOON, expiryIn });
    }

    triggerEvent('STYLE_EXCHANGE_BANNER_LOAD', {
      custom: {
        custom: {
          v1: orderLineId,
          v2: storeOrderId,
          v3: getUidx()
        },
        widget: {
          name: 'style_exchange_card_load',
          type: 'card'
        }
      }
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.addressNotFound !== this.props.addressNotFound &&
      this.props.addressNotFound
    ) {
      this.setState({
        modalType: ACTIONS.ADDRESS_ERROR
      });
    }
  }

  cancelExchange(e) {
    const {
      parentOrderDetail: { orderLineId, storeOrderId },
      mode
    } = this.props;

    const dataToSend = {
      exchangeProductDetail: {
        parentOrderDetail: {
          orderLineId,
          storeOrderId
        }
      }
    };
    const payload = {
      custom: {
        custom: {
          v1: get(this.props, 'product.id'),
          v2: get(this.props, 'addressId'),
          v3: get(this.props, 'unifiedAddressId')
        }
      }
    };
    const elementId = e.currentTarget.getAttribute('data-id');
    const isReinitiateExchange =
      elementId === ACTIONS.ADDRESS_ERROR_REINITIATE_EXCHANGE;
    const isAddressErrorCancelExchange =
      elementId === ACTIONS.ADDRESS_ERROR_CANCEL_EXCHANGE;
    this.props.handleCartAction(
      'cancelExchange',
      dataToSend,
      res => {
        this.closeModal();
        SHELL.alert('info', {
          message: 'Exchange successfully cancelled.',
          styleOverrides: getSnackBarStyleOverrides(mode)
        });

        triggerEvent('STYLE_EXCHANGE_CANCEL_EXCHANGE_CONFIRM', {
          custom: {
            custom: {
              v1: orderLineId,
              v2: storeOrderId,
              v3: getUidx()
            },
            widget: {
              name: 'style_exchange_cancel_exchange_confirm',
              type: 'button'
            }
          }
        });
        setCookie(cookieKeys.EXCHANGE_EXPIRY_MESSAGE_HIDE, storeOrderId, 0);
        if (isAddressErrorCancelExchange) {
          triggerEvent('STYLE_EXCHANGE_ADDRESS_ERROR_EXCHANGE_CANCEL', payload);
        } else if (isReinitiateExchange) {
          triggerEvent(
            'STYLE_EXCHANGE_ADDRESS_ERROR_EXCHANGE_REINITIATE',
            payload
          );
          setTimeout(() => {
            SHELL.redirectTo('/my/orders');
          }, 1);
        }
      },
      err => {
        const message =
          get(err, 'message') || 'Something went wrong. Please try again';
        errorNotification({
          message
        });
      }
    );
  }

  openModal(e) {
    const type = e.currentTarget.dataset['type'];
    if (type) {
      const {
        parentOrderDetail: { orderLineId, storeOrderId }
      } = this.props;

      const eventName = `STYLE_EXCHANGE_${type}_CLICK`;

      triggerEvent(eventName, {
        custom: {
          custom: {
            v1: orderLineId,
            v2: storeOrderId,
            v3: getUidx()
          },
          widget: {
            name: eventName.toLowerCase(),
            type: 'button'
          }
        }
      });

      this.setState({
        modalType: type
      });
    }
  }

  closeModal() {
    this.setState({
      modalType: ''
    });
  }

  toggleCards(e) {
    const type = e.currentTarget.id;
    this.setState(state => ({
      selectedCard: state.selectedCard === type ? '' : type
    }));
  }

  getHIWorksBody() {
    const { bannerImage = '', steps = [], faqs = [] } =
      get(this.styleExchangeConfig, 'howItWorks') || {};

    const renderSteps = steps.map((stepObj, index) => (
      <div key={`step_${index}`} className={Style.stepCard}>
        <div className={Style.stepCount}>{index + 1}</div>
        <div>
          <div className={Style.bold}>{stepObj.title}</div>
          <div>{stepObj.text}</div>
        </div>
      </div>
    ));

    const renderFaqs = faqs.map((faqObj, index) => (
      <div
        className={Style.faqCard}
        key={`faqs_${index}`}
        id={`faqs_${index}`}
        onClick={this.toggleCards}
      >
        <div>{faqObj.question}</div>
        {this.state.selectedCard === `faqs_${index}` && (
          <div>{faqObj.answer}</div>
        )}
      </div>
    ));

    return (
      <div>
        <div className={this.isDesktop ? Style.howContainer : ''}>
          <img className={Style.bannerImage} src={bannerImage} />
          {renderSteps.length > 0 && (
            <div className={Style.stepsContainer}>{renderSteps}</div>
          )}
        </div>
        {renderFaqs.length > 0 && (
          <div className={Style.faqsContainer}>
            <div className={Style.faqsHeader}>More Questions?</div>
            {renderFaqs}
          </div>
        )}
      </div>
    );
  }

  getCancelExchangeBody() {
    const {
      product: {
        images: [{ secureSrc }],
        name,
        brand,
        sizes,
        skuId
      },
      parentOrderDetail: { exchangeDateValidityInMs }
    } = this.props;
    const { message = [], note = '' } =
      get(this.styleExchangeConfig, 'cancel') || {};

    const { label = '' } =
      (sizes || []).find(item => item.skuId === skuId) || {};

    return (
      <div className={Style.cancelExchangeContainer}>
        {!this.isDesktop && (
          <div className={Style.itemDetailInModal}>
            <Image src={secureSrc} width={50} height={65} visible="true" />
            <div className={Style.titleInModal}>
              <div className={Style.bold}>{brand}</div>
              {name.replace(`${brand} `, '')}
              {!!label && <div>{`${SIZE}: ${label}`}</div>}
            </div>
          </div>
        )}
        <div className={Style.cancelMsg}>
          {message.map(text => (
            <div>{text || `\n`}</div>
          ))}
        </div>
        <div className={Style.note}>
          <b className={Style.bold}>Note: </b>
          {note.replace('%date%', formatDate(Number(exchangeDateValidityInMs)))}
        </div>
      </div>
    );
  }

  renderModal() {
    const { modalType, expiryIn } = this.state;
    if (modalType) {
      let header = '';
      let body = '';
      let footer = '';
      const addressNotFound = this.props.addressNotFound;
      switch (modalType) {
        case ACTIONS.HOW_IT_WORKS: {
          header = `Here's how it works`;
          body = this.getHIWorksBody();
          footer = (
            <Button className={Style.buttonStyle} onClick={this.closeModal}>
              OKAY, GOT IT
            </Button>
          );
          break;
        }
        case ACTIONS.CANCEL_EXCHANGE: {
          header = 'Cancel Exchange?';
          body = this.getCancelExchangeBody();
          footer = (
            <div className={Style.actionBtnContainer}>
              <Button className={Style.btnNo} onClick={this.closeModal}>
                No
              </Button>
              <Button className={Style.btnYes} onClick={this.cancelExchange}>
                Yes
              </Button>
            </div>
          );
          break;
        }
        case ACTIONS.EXPIRING_SOON: {
          const {
            parentOrderDetail: { exchangeDateValidityInMs }
          } = this.props;
          const expiryDate = formatDate(Number(exchangeDateValidityInMs));
          const { expirySoon, expired } =
            get(this.styleExchangeConfig, 'expiry') || {};
          let message = expirySoon;

          if (expiryIn === 0) {
            header = `Exchange expiring today`;
          } else if (expiryIn > 0) {
            header = `Exchange expiring in ${expiryIn} ${pluralizeText(
              expiryIn,
              'day'
            )}`;
          } else {
            header = `Exchange expired on ${expiryDate}`;
            message = expired;
          }

          body = (
            <div className={Style.cancelExchangeContainer}>
              {message.replace('%date%', expiryDate)}
            </div>
          );
          footer = (
            <Button className={Style.buttonStyle} onClick={this.closeModal}>
              OKAY
            </Button>
          );
          break;
        }
        case ACTIONS.ADDRESS_ERROR: {
          const errorConfig = get(this.styleExchangeConfig, 'addressNotFound');
          const description = get(errorConfig, 'description') || '';
          const highlightedText = get(errorConfig, 'highlightedText') || '';
          const cta1Text = get(errorConfig, 'cta.cta1') || '';
          const cta2Text = get(errorConfig, 'cta.cta2') || '';
          header = get(errorConfig, 'header') || '';
          body = (
            <div className={Style.addressErrorDescription}>
              {description.split(' ').map((msg, idx) => {
                return (
                  <span key={idx}>
                    <FormatString
                      highlightedText={highlightedText}
                      messageString={msg}
                      className={Style.highlightedText}
                    />{' '}
                  </span>
                );
              })}
            </div>
          );
          footer = (
            <div className={Style.addressErrorCta}>
              <Button
                data-id={ACTIONS.ADDRESS_ERROR_REINITIATE_EXCHANGE}
                className={Style.cta1}
                onClick={this.cancelExchange}
              >
                {cta1Text}
              </Button>
              <Button
                data-id={ACTIONS.ADDRESS_ERROR_CANCEL_EXCHANGE}
                className={Style.cta2}
                onClick={this.cancelExchange}
              >
                {cta2Text}
              </Button>
            </div>
          );
          break;
        }
        default:
      }

      return (
        <Modal
          className={`${Style.modalContainer} ${
            this.isDesktop ? Style.desktopModal : ''
          }`}
          cancelCallback={this.closeModal}
          cancelIconConfig={{ show: !addressNotFound }}
          halfCard={!this.isDesktop}
          disableBackdropClick={addressNotFound}
          closeOnBack={!addressNotFound}
        >
          <div>
            <div className={Style.modalHeader}> {header} </div>
            <div className={Style.modalBody}> {body} </div>
            <div className={Style.modalFooter}> {footer} </div>
          </div>
        </Modal>
      );
    }

    return null;
  }

  render() {
    const {
      product: {
        images: [{ secureSrc }],
        name
      },
      parentOrderDetail: { exchangeDateValidityInMs, orderAmount },
      flags = {},
      count
    } = this.props;

    const checkoutNotReady =
      get(flags, 'checkoutReady.value') === false &&
      get(flags, 'checkoutReady.remark') ===
        'TOO_MANY_PRODUCT_SELECTED_FOR_EXCHANGE';

    const message =
      count > 1
        ? 'Please select only one item.'
        : 'Please select one item to continue.';

    return (
      <div
        className={`${Style.container} ${
          this.isDesktop ? Style.desktopContainer : ''
        }`}
      >
        <div className={Style.itemContainer}>
          <div className={Style.itemDetails}>
            <Image src={secureSrc} width={50} height={65} visible="true" />
            <div className={Style.details}>
              Ready for exchange!
              <div className={Style.title}>
                {name}
                <div>
                  Worth <Rupee className={Style.rupeeIcon} />
                  {currencyValue(orderAmount)}
                </div>
              </div>
            </div>
          </div>

          <div className={Style.btnContainer}>
            <div
              className={Style.actionBtn}
              data-type={ACTIONS.HOW_IT_WORKS}
              onClick={this.openModal}
            >
              <span className={Style.actionIcon}>?</span>
              HOW IT WORKS
            </div>

            <div
              className={Style.actionBtn}
              data-type={ACTIONS.CANCEL_EXCHANGE}
              onClick={this.openModal}
            >
              <span className={Style.actionIcon}>X</span>
              CANCEL EXCHANGE
            </div>
          </div>
        </div>

        <div className={Style.infoContainer}>
          <div className={Style.infoMessage}>
            <Check className={Style.checkIcon} />
            Purchase a new item by
            <b className={Style.bold}>
              {' '}
              {formatDate(Number(exchangeDateValidityInMs))}.
            </b>
          </div>
          <div className={Style.infoMessage}>
            <Check className={Style.checkIcon} />
            <RupeeBold />
            <b className={Style.bold}>{currencyValue(orderAmount)} </b>
            Exchange credit can be used for purchase.
          </div>
        </div>

        {(checkoutNotReady || count > 1 || count === 0) && (
          <div className={Style.errorInfo}>
            {`You can order `}
            <b className={Style.bold}>only 1</b>
            {` new replacement item for this exchange. `}
            <b className={Style.bold}>{message}</b>
          </div>
        )}
        {count === 1 ? (
          <div className={Style.itemInfoMessage}>
            {
              'Please select only 1 new item in exchange for the item you are returning.'
            }
          </div>
        ) : (
          ''
        )}
        {this.renderModal()}
      </div>
    );
  }
}

ExchangeItemDetails.propTypes = {
  handleCartAction: PropTypes.func
};

export default ExchangeItemDetails;
