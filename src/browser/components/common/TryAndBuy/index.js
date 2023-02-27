import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

// Styles
import Style from './tryAndBuy.base.css';

// Components
import Image from 'commonComp/Image';
import ImageBanner from 'commonComp/ImageBanner';
import Modal from 'commonComp/Modal';

// Utils
import {
  isFeatureEnabled,
  isVariantEnabled
} from 'commonUtils/FeaturesManager';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import {
  getTryAndBuyOpted,
  getTryAndBuyDetails
} from 'commonBrowserUtils/Helper';
import ButtonV2 from 'commonComp/ButtonV2';

import Rupee from 'iconComp/Rupee.jsx';
import RupeeBold from 'iconComp/RupeeBold.jsx';
import RupeeStriked from 'iconComp/RupeeStriked.jsx';
import Check from 'iconComp/Check.jsx';
import CheckboxActive from 'iconComp/CheckboxActive.jsx';
import CheckboxInactive from 'iconComp/CheckboxInactive.jsx';

const HOW_IT_WORKS = 'howItWorks';
const VIEW_ITEMS = 'viewItems';
const IMAGE_WIDTH = 36;
const IMAGE_HEIGHT = 48;

const ViewItemsButton = ({ onClick }) => {
  return isVariantEnabled('AOC_V2_VARIANT3') ? (
    <div onClick={onClick} className={Style.viewItems}>
      View Items
    </div>
  ) : null;
};

const InfoBlock = ({
  remark,
  tnbMaxCount,
  tnbMinAmount,
  isNewUser,
  tnbMessage,
  openViewItemsModal,
  isCODAvailable
}) => {
  switch (remark) {
    case 'NO_ISSUE': {
      const tnbConfig = getKVPairValue('TNB_DETAILS') || {};
      const tnbPrice = Number(getKVPairValue('TNB_PRICE') || 0);

      return (
        <div>
          <div className={Style.subTitle}>
            Try items at the time of delivery.
          </div>

          {isNewUser ? (
            <div className={Style.messageContainer}>
              <div className={Style.message}>
                <Check className={Style.checkIcon} />
                {tnbPrice ? (
                  <span>
                    <RupeeStriked className={Style.rupeeIcon} />
                    <span className={Style.strike}>{tnbPrice}</span>
                    <span> {tnbConfig.firstUser}</span>
                  </span>
                ) : (
                  tnbConfig.firstUser
                )}
              </div>

              <div className={Style.message}>
                <Check className={Style.checkIcon} />
                {tnbMessage}
                <ViewItemsButton onClick={openViewItemsModal} />
              </div>

              <div className={Style.message}>
                <Check className={Style.checkIcon} />
                {isCODAvailable
                  ? 'Available for Pay on delivery'
                  : tnbConfig.codNotAvailable}
              </div>
            </div>
          ) : (
            <div className={Style.messageContainer}>
              <div className={Style.message}>
                <Check className={Style.checkIcon} />
                {tnbMessage}
                <ViewItemsButton onClick={openViewItemsModal} />
              </div>

              <div className={Style.message}>
                <Check className={Style.checkIcon} />
                {isCODAvailable
                  ? 'Available for Pay on delivery'
                  : tnbConfig.codNotAvailable}
              </div>
            </div>
          )}
        </div>
      );
    }
    case 'TOO_MANY_ITEMS': {
      return (
        <div>
          <span>Orders with </span>
          <span>more than {tnbMaxCount} items </span>
          <span>are not eligible.</span>
        </div>
      );
    }
    case 'AMOUNT_IS_LESS_THAN_ALLOWED': {
      return (
        <div>
          <span>Orders below </span>
          <Rupee className={Style.rupeeIcon} />
          <span>{tnbMinAmount} are not eligible.</span>
        </div>
      );
    }
    case 'NO_TNB_WITH_EXPRESS_DELIVERY': {
      return <div>Available only with standard delivery.</div>;
    }
    case 'SELLER_NOT_ALLOWING': {
      return (
        <div>
          <span>This order is not eligible for </span>
          <span>Try & Buy.</span>
        </div>
      );
    }
  }
};

const HowItWorksModal = ({ tryNBuyImage, closeModal }) => {
  return (
    <Modal
      cancelCallback={closeModal}
      className={Style.howItWorksModal}
      cancelIconConfig={{ show: true }}
    >
      <div className={Style.modalHeader}>
        <div>How does Try & Buy work?</div>
      </div>
      <div className={Style.modalBody}>
        <img src={tryNBuyImage} className={Style.tryNBuyImage} />
      </div>
    </Modal>
  );
};

const TryNBuyEligibleItems = ({ images, name }) => {
  return (
    <div className={Style.eligibleProducts}>
      <Image
        src={get(images, '[0].secureSrc')}
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        showBackgroundColor="true"
      />
      <span className={Style.productName}>{name}</span>
    </div>
  );
};

const ViewMoreModal = ({ totalItemsCount, closeModal, tnbEligibleItems }) => {
  const tnbEligibleItemsCount = tnbEligibleItems.length;

  const message =
    tnbEligibleItemsCount === totalItemsCount
      ? 'All items are eligible for Try & Buy'
      : `${tnbEligibleItemsCount} of ${totalItemsCount} items in this order are eligible.`;
  return (
    <Modal
      cancelCallback={closeModal}
      halfCard={true}
      className={Style.viewItemsModal}
      cancelIconConfig={{ show: false }}
    >
      <div className={Style.modalHeader}>Try & Buy</div>
      <div className={Style.viewItemsMessage}>{message}</div>
      <div className={Style.eligibleProductsContainer}>
        {tnbEligibleItems.map(item => (
          <TryNBuyEligibleItems {...item} />
        ))}
      </div>
      <ButtonV2 onClick={closeModal} classname={Style.ctaOnViewItemsModal}>
        {' '}
        GOT IT{' '}
      </ButtonV2>
    </Modal>
  );
};

class TryAndBuy extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, modalType: '' };

    [
      'openHowItWorksModal',
      'closeModal',
      'toggleTryNBuy',
      'openViewItemsModal'
    ].forEach(method => (this[method] = this[method].bind(this)));
  }

  componentDidMount() {
    const { pageSource } = this.props;
    triggerEvent('TRY_AND_BUY_WIDGET_LOAD', { pageSource });
  }

  closeModal() {
    const { pageSource } = this.props;
    triggerEvent(
      this.state.modalType === HOW_IT_WORKS
        ? 'HOW_IT_WORKS_HIDE'
        : 'VIEW_MORE_HIDE',
      { pageSource }
    );
    this.setState(prevState => ({
      showModal: !prevState.showModal,
      modalType: ''
    }));
  }

  openHowItWorksModal() {
    const { pageSource } = this.props;
    triggerEvent('HOW_IT_WORKS_CLICKED', { pageSource });
    this.setState({ showModal: true, modalType: HOW_IT_WORKS });
  }

  openViewItemsModal() {
    const { pageSource } = this.props;
    triggerEvent('VIEW_MORE_CLICKED', { pageSource });
    this.setState({ showModal: true, modalType: VIEW_ITEMS });
  }

  toggleTryNBuy() {
    let data = [];
    const { pageSource } = this.props;
    this.props.products.forEach(product => {
      get(product, 'productServiceabilityInfo.tryNBuyAvailable') &&
        get(product, 'productServiceabilityInfo.pincodeInfo.serviceable') &&
        data.push({
          itemId: product.itemId,
          tryAndBuyOpted: !this.tryAndBuyOpted
        });
    });
    this.props.handleCartAction('applyTryNBuy', data);
    triggerEvent(
      this.tryAndBuyOpted ? 'TRY_AND_BUY_UNCHECKED' : 'TRY_AND_BUY_CHECKED',
      { pageSource }
    );
  }

  render() {
    const {
      tryNBuyApplicable: { remark },
      isNewUser,
      products,
      headerClassName,
      selectedShippingData
    } = this.props;
    const enabled =
      isFeatureEnabled('TRY_AND_BUY') && remark !== 'UNSERVICEABLE';
    const tryNBuyImage =
      'https://constant.myntassets.com/checkout/assets/img/how_it_works_screen_v2.png';

    let title = <div className={Style.title}>Try & Buy not available</div>;

    let tnbMessage = '';
    const {
      tnbEligibleItems,
      tnbEligibleTotalQuantity,
      count
    } = getTryAndBuyDetails(products);

    const tnbEligibleItemsCount = tnbEligibleItems.length;

    if (tnbEligibleItemsCount === products.length) {
      tnbMessage = 'All items are eligible for Try & Buy';
    } else {
      tnbMessage = `${tnbEligibleTotalQuantity} out of ${count} items in your order are eligible`;
    }

    let checkBoxIcon = <ImageBanner name="trynbuy-unavailable" />;

    this.tryAndBuyOpted = getTryAndBuyOpted(products);

    if (remark === 'NO_ISSUE') {
      checkBoxIcon = this.tryAndBuyOpted ? (
        <CheckboxActive
          className={`${Style.checkboxIcon} ${Style.selected}`}
          onClick={this.toggleTryNBuy}
        />
      ) : (
        <CheckboxInactive
          className={Style.checkboxIcon}
          onClick={this.toggleTryNBuy}
        />
      );

      const tnbPrice = Number(getKVPairValue('TNB_PRICE') || 0);

      if (isNewUser || !tnbPrice) {
        title = (
          <div className={Style.title}>
            {'Try & Buy for '}
            <span className={Style.freeTag}>Free</span>
          </div>
        );
      } else {
        title = (
          <div className={Style.title}>
            {'Try & Buy for '}
            <RupeeBold className={Style.rupeeIcon} />
            {getKVPairValue('TNB_PRICE')}
          </div>
        );
      }
    }

    const isCODAvailable =
      get(selectedShippingData, 'flags.cardOnDelivery.value') ||
      get(selectedShippingData, 'flags.cashOnDelivery.value');

    return enabled ? (
      <div>
        <div className={`${Style.cardHeader} ${headerClassName}`}>
          ADDITIONAL SERVICE
        </div>
        <div className={Style.container}>
          {checkBoxIcon}

          <div className={Style.details}>
            {title}

            <InfoBlock
              remark={remark}
              isNewUser={isNewUser}
              tnbMaxCount={parseInt(getKVPairValue('TNB_MAX_COUNT'))}
              tnbMinAmount={parseInt(getKVPairValue('TNB_MIN_AMOUNT'))}
              tnbMessage={tnbMessage}
              isCODAvailable={isCODAvailable}
              openViewItemsModal={this.openViewItemsModal}
            />

            <div className={Style.how} onClick={this.openHowItWorksModal}>
              How it works
            </div>

            {this.state.showModal &&
              (this.state.modalType === HOW_IT_WORKS ? (
                <HowItWorksModal
                  tryNBuyImage={tryNBuyImage}
                  closeModal={this.closeModal}
                />
              ) : (
                <ViewMoreModal
                  closeModal={this.closeModal}
                  tnbEligibleItems={tnbEligibleItems}
                  totalItemsCount={products.length}
                  count={count}
                />
              ))}
          </div>
        </div>
      </div>
    ) : null;
  }
}

TryAndBuy.propTypes = {
  tryNBuyApplicable: PropTypes.object,
  products: PropTypes.array,
  count: PropTypes.number,
  handleCartAction: PropTypes.func,
  pageSource: PropTypes.string
};

export default TryAndBuy;
