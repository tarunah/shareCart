import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import Styles from './priceDetail.base.css';

import ToolTip from 'commonComp/ToolTip';
import Modal from 'commonComp/Modal';
import Button from 'vision/components/Button';
import { ReturnAbuserV2 } from '../ReturnAbuserV2';
import {
  isMobile,
  getUidx,
  isReturnAbuser,
  currencyValue
} from 'commonBrowserUtils/Helper';
import useModal from 'customHooks/useModal';
import usePrevious from 'customHooks/usePrevious';

import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import Info from 'iconComp/Info.jsx';
import Rupee from 'iconComp/Rupee.jsx';
import RupeeBold from 'iconComp/RupeeBold.jsx';
import RupeeStriked from 'iconComp/RupeeStriked.jsx';

const getInfoPriceDetail = ({
  name,
  displayValue,
  displayText,
  value,
  shippingApplicableCharge,
  field,
  returnAbuser,
  payMode
}) => {
  const infoConfig =
    get(getKVPairValue('PRICE_DETAILS_TEXT'), `infoConfig.${field}`) ||
    get(getKVPairValue('PRICE_DETAILS_TEXT'), `infoText.${field}`);

  const showTnc = get(returnAbuser, 'showTnc', false);
  const _isReturnAbuser = isReturnAbuser(returnAbuser);

  let infoContainer = null;
  if (infoConfig) {
    if (get(infoConfig, 'type') === 'modal') {
      const {
        text,
        header,
        title,
        desc,
        returnAbuserDesc,
        faqLink,
        termsOfUseLink
      } = infoConfig;

      const [isModalOpen, toggleModal] = useModal(false);

      const previousModalState = usePrevious(isModalOpen);
      useEffect(() => {
        if (_isReturnAbuser && showTnc) {
          if (isModalOpen) {
            triggerEvent('RETURN_ABUSER_MODAL_OPEN', {
              custom: {
                custom: {
                  v1: getUidx(),
                  v2: get(returnAbuser, 'level'),
                  v3: displayValue || displayText
                }
              }
            });
          }
          if (!isModalOpen && isModalOpen !== previousModalState) {
            triggerEvent('RETURN_ABUSER_MODAL_CLOSE', {
              custom: {
                custom: {
                  v1: getUidx(),
                  v2: get(returnAbuser, 'level'),
                  v3: displayValue || displayText
                }
              }
            });
          }
        }
      }, [isModalOpen]);

      const modalClassName = isMobile()
        ? Styles.infoModalMobile
        : Styles.infoModalDesktop;
      const cancelIconConfig = {
        show: true,
        className: Styles.infoModalCloseIcon
      };
      const linkProps = {
        className: Styles.infoLinks
      };

      if (!isMobile()) {
        linkProps.target = '_blank';
      }

      const openModalClick = () => {
        triggerEvent('PRICE_BLOCK_KNOW_MORE_CLICK', {
          custom: {
            custom: {
              v1: getUidx(),
              v2: displayValue || displayText,
              v3: field
            }
          }
        });
        toggleModal();
      };

      const handleLinkClick = e => {
        if (isMobile()) {
          e.preventDefault();
          window.location.replace(e.currentTarget.href);
        }
      };

      infoContainer = (
        <div className={Styles.infoTextContainer}>
          <Button variant="text" ml={4} onClick={openModalClick}>
            {text}
          </Button>
          {isModalOpen && (
            <Modal
              className={showTnc ? Styles.abuserModal : modalClassName}
              halfCard={isMobile() && !showTnc}
              cancelCallback={toggleModal}
              cancelIconConfig={cancelIconConfig}
              enableBackButton={payMode !== 'retry'}
            >
              {get(returnAbuser, 'level') !== 'DEFAULT' && showTnc ? (
                <div>
                  <ReturnAbuserV2
                    returnAbuser={returnAbuser}
                    charges={displayValue || 0}
                  />
                  <div className={Styles.infoFaqsAbuser}>
                    Have a question? Refer{' '}
                    <a {...linkProps} href={faqLink} onClick={handleLinkClick}>
                      FAQ’s
                    </a>
                  </div>
                  <div className={Styles.termsofUse}>
                    For further information, refer to our{' '}
                    <a
                      {...linkProps}
                      href={termsOfUseLink}
                      onClick={handleLinkClick}
                    >
                      Terms of use
                    </a>
                  </div>
                </div>
              ) : (
                <div>
                  <div className={Styles.infoModalHeader}>{header}</div>
                  <div className={Styles.infoModalBody}>
                    <div className={Styles.infoBodyTitle}>{title}</div>
                    <div>{_isReturnAbuser ? returnAbuserDesc : desc}</div>
                    <div className={Styles.infoFaqs}>
                      Have a question? Refer{' '}
                      <a
                        {...linkProps}
                        href={faqLink}
                        onClick={handleLinkClick}
                      >
                        FAQ’s
                      </a>
                    </div>
                    <div>
                      For further information, refer to our{' '}
                      <a
                        {...linkProps}
                        href={termsOfUseLink}
                        onClick={handleLinkClick}
                      >
                        Terms of use
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </Modal>
          )}
        </div>
      );
    } else {
      /* fallback to infoConfig to support old config*/
      infoContainer = (
        <ToolTip
          className={Styles.toolTipInfo}
          elem={<Info className={Styles.infoIcon} />}
        >
          {get(infoConfig, 'text') || infoConfig}
        </ToolTip>
      );
    }
  }

  return (
    <div className={Styles.row}>
      <span>
        {name}
        {infoContainer}
      </span>
      <span className={Styles.value}>
        {(!value && shippingApplicableCharge) ||
        shippingApplicableCharge > value ? (
          <span className={`${Styles.striked} ${Styles.spaceRight}`}>
            <RupeeStriked className={Styles.icon} />
            <span>{shippingApplicableCharge}</span>
          </span>
        ) : (
          ''
        )}
        {displayValue && <Rupee className={Styles.icon} />}
        <span className={!displayValue ? Styles.discount : ''}>
          {displayValue || displayText}
        </span>
      </span>
    </div>
  );
};

const getPriceDetail = ({ name, displayValue, displayText, type, value }) => {
  return (
    <div className={type === 'total' ? Styles.total : Styles.row}>
      <span>{name}</span>
      <span
        className={`${Styles.value} ${
          type === 'discount' || value < 0 ? Styles.discount : ''
        }`}
      >
        <span>{type === 'discount' && displayValue ? '-' : ''}</span>
        {displayValue &&
          (type === 'total' ? (
            <RupeeBold className={Styles.icon} />
          ) : (
            <Rupee className={Styles.icon} />
          ))}
        <span>{displayValue || displayText}</span>
      </span>
    </div>
  );
};

const getPriceDetailWithCoverFeeInfo = ({ name, displayValue }) => {
  const priorityCheckoutConfig = getKVPairValue('PRIORITY_CHECKOUT');
  return (
    <div className={Styles.row}>
      <span>{name}</span>
      <ToolTip
        className={Styles.toolTipInfo}
        elem={<Info className={Styles.toolTipIcon} />}
      >
        <div>
          Yay! No {priorityCheckoutConfig.featureName} is charged on this order.
        </div>
      </ToolTip>
      <span className={Styles.value}>
        <span className={Styles.striked}>
          <RupeeStriked className={Styles.icon} />
          <span>{displayValue}</span>
        </span>
        <span className={Styles.discount}> FREE</span>
      </span>
    </div>
  );
};

class getPriceDetailWithTaxInfo extends React.Component {
  constructor() {
    super();
    this.state = { showTaxInfo: false };
    this.toggleTaxModal = this.toggleTaxModal.bind(this);
  }

  toggleTaxModal() {
    this.setState(prevState => ({ showTaxInfo: !prevState.showTaxInfo }));
  }

  render() {
    const { name, displayValue, taxByProduct, totalTax } = this.props;
    const { showTaxInfo } = this.state;

    return (
      <div className={Styles.row}>
        <span>{name}</span>
        {taxByProduct && (
          <Info onClick={this.toggleTaxModal} className={Styles.infoIcon} />
        )}
        {showTaxInfo && (
          <Modal
            className={Styles.taxModal}
            cancelCallback={this.toggleTaxModal}
            cancelIconConfig={{ show: true }}
          >
            <div>
              <div className={Styles.taxHeader}>
                <div className={Styles.taxTitle}>Tax Breakup</div>
                <div>
                  <span>Total tax</span>
                  <span className={Styles.value}>
                    <Rupee className={Styles.icon} />
                    <span>{totalTax}</span>
                  </span>
                </div>
              </div>
              <div className={Styles.taxByProduct}>
                {taxByProduct.map(({ name, tax }) => (
                  <div className={Styles.taxRow}>
                    <span className={Styles.productName}>{name}</span>
                    <span className={Styles.value}>
                      <Rupee className={Styles.icon} />
                      <span className={Styles.bold}>{tax}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Modal>
        )}
        <span className={Styles.value}>
          <Rupee className={Styles.icon} />
          <span>{displayValue}</span>
        </span>
      </div>
    );
  }
}

class getCouponDiscountBreakupInfo extends React.Component {
  constructor() {
    super();
    this.state = { showDiscountBreakupInfo: false };
    this.toggleModal = this.toggleModal.bind(this);
    this.onClickCouponBreakup = this.onClickCouponBreakup.bind(this);
  }

  toggleModal() {
    this.setState(prevState => ({
      showDiscountBreakupInfo: !prevState.showDiscountBreakupInfo
    }));
  }

  onClickCouponBreakup() {
    triggerEvent('COUPON_DISCOUNT_BREAKUP_CLICK');
    this.toggleModal();
  }

  render() {
    const {
      name,
      displayValue,
      appliedCoupons = [],
      attachedProductDiscount = 0,
      value
    } = this.props;
    const { showDiscountBreakupInfo } = this.state;
    const halfCard = isMobile();
    const modalClassName = halfCard ? Styles.halfCardWidth : Styles.couponModal;
    const cancelIconConfig = { show: true, className: Styles.closeIcon };
    const sectionHeading =
      isFeatureEnabled('ATTACHED_PRODUCTS') && attachedProductDiscount > 0
        ? 'Applied Coupons & Offers'
        : 'Applied Coupons';
    return value > 0 ? (
      <div className={Styles.row}>
        <span>{name}</span>
        <Info onClick={this.onClickCouponBreakup} className={Styles.infoIcon} />
        <span className={`${Styles.value} ${Styles.discount}`}>
          <span> -</span>
          <Rupee className={Styles.icon} />
          <span>{displayValue}</span>
        </span>
        {showDiscountBreakupInfo && (
          <Modal
            className={modalClassName}
            halfCard={halfCard}
            cancelCallback={this.toggleModal}
            cancelIconConfig={cancelIconConfig}
          >
            <div>
              <div className={Styles.couponHeader}>
                <div className={Styles.couponTitle}>{sectionHeading}</div>
              </div>
              <div className={Styles.couponsListContainer}>
                {attachedProductDiscount > 0 && (
                  <div className={Styles.couponRow}>
                    <span className={Styles.code}>Offer Applied</span>
                    <span className={`${Styles.value} ${Styles.discount}`}>
                      <span className={Styles.bold}>
                        &#8377;{currencyValue(attachedProductDiscount)}
                      </span>
                    </span>
                  </div>
                )}
                {appliedCoupons.map(
                  ({ code, status, discountUnits: [{ value }] }) =>
                    status === 'SUCCESS' && (
                      <div className={Styles.couponRow}>
                        <span className={Styles.code}>
                          {code.toUpperCase()}
                        </span>
                        <span className={`${Styles.value} ${Styles.discount}`}>
                          <span className={Styles.bold}>
                            &#8377;{currencyValue(value)}
                          </span>
                        </span>
                      </div>
                    )
                )}
              </div>
            </div>
          </Modal>
        )}
      </div>
    ) : (
      <getPriceDetailWithAction {...this.props} />
    );
  }
}

const getPriceDetailWithBankDiscount = ({ name, displayValue }) => (
  <div className={Styles.bankDiscount}>
    <span>{name}</span>
    <ToolTip
      className={Styles.toolTipBankInfo}
      elem={<Info className={Styles.infoIcon} />}
    >
      <div className={Styles.title}>Bank Discount</div>
      <div className={Styles.content}>
        Discount is applicable on your Total Amount.
      </div>
    </ToolTip>
    <span className={`${Styles.value} ${Styles.discount}`}>
      <span>-</span>
      <Rupee className={Styles.icon} />
      <span>{displayValue}</span>
    </span>
  </div>
);

const getPriceDetailWithoutHighlight = ({ name, displayValue }) => (
  <div className={Styles.row}>
    <span>{name}</span>
    <span className={`${Styles.discount} ${Styles.value}`}>
      <span>-</span>
      <Rupee className={Styles.icon} />
      <span>{displayValue}</span>
    </span>
  </div>
);

const getPriceDetailWithAction = ({
  name,
  displayValue,
  displayText,
  callback,
  disableCouponLineItemInPrice = false
}) => {
  return name === 'Coupon Discount' && disableCouponLineItemInPrice ? (
    ''
  ) : (
    <div className={Styles.row}>
      <span>{name}</span>
      <span className={`${Styles.value} ${Styles.action}`} onClick={callback}>
        {displayValue || displayText}
      </span>
    </div>
  );
};

const getPriceDetailWithHideAction = ({
  name,
  displayValue,
  actionName,
  callback
}) => {
  return (
    <div className={Styles.row}>
      <span>{name}</span>
      <span
        className={`${Styles.hideShow} ${Styles.action}`}
        onClick={callback}
      >
        {actionName}
      </span>
      <span className={Styles.value}>
        <Rupee className={Styles.icon} />
        <span>{displayValue}</span>
      </span>
    </div>
  );
};

const getFreeTryAndBuyDetails = ({ name, displayValue }) => {
  return (
    <div className={Styles.row}>
      <span>{name}</span>
      <span className={Styles.value}>
        {displayValue != 0 && (
          <span className={Styles.striked}>
            <RupeeStriked className={Styles.icon} />
            <span>{displayValue}</span>
          </span>
        )}
        <span className={Styles.discount}> FREE</span>
      </span>
    </div>
  );
};

const priceActionMap = {
  normal: getPriceDetail,
  total: getPriceDetail,
  discount: getPriceDetail,
  action: getPriceDetailWithAction,
  couponDiscount: getCouponDiscountBreakupInfo,
  tax: getPriceDetailWithTaxInfo,
  freeCoverFee: getPriceDetailWithCoverFeeInfo,
  shipping: getInfoPriceDetail,
  'hide-action': getPriceDetailWithHideAction,
  bankDiscount: getPriceDetailWithBankDiscount,
  instrumentDiscount: getPriceDetailWithoutHighlight,
  freeTryAndBuyFee: getFreeTryAndBuyDetails
};

class PriceDetail extends React.PureComponent {
  render() {
    const { type = 'normal', ...props } = this.props;
    const Component = priceActionMap[type];
    return props.show ? <Component type={type} {...props} /> : null;
  }
}

PriceDetail.propTypes = {
  type: PropTypes.string,
  show: PropTypes.bool,
  name: PropTypes.string,
  displayValue: PropTypes.string,
  callback: PropTypes.func,
  actionName: PropTypes.string
};

export default PriceDetail;
