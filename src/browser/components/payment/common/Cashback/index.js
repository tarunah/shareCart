import React from 'react';
import PropTypes from 'prop-types';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import get from 'lodash/get';

// Amount Finder fields for making the request.
import PaymentManager from 'commonBrowserUtils/PaymentsManager';
import { getPaymentFields } from 'commonBrowserUtils/priceBreakupFields';
import { checkExchangeCart } from 'commonBrowserUtils/CartHelper';
import { getTotal } from 'commonBrowserUtils/transformPriceDetails';

// Message helper
import CashbackHandler from './CashbackHandler';

//MA event helper
import { triggerMaWithLargePayload } from 'commonBrowserUtils/Helper';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';

class Cashback extends React.PureComponent {
  constructor(props) {
    super(props);

    // Function Binds.
    [
      'getPlutusEligibility',
      'actionSuccess',
      'actionError',
      'onClickEligibility'
    ].map(method => (this[method] = this[method].bind(this)));

    this.state = {
      icb: { show: false, message: '' },
      deff: { show: false, message: '' },
      currentRetryCount: 0,
      discount: 0,
      isClicked: props.isClicked
    };
    this.lastCheckedCardId = null;
    this.icbRetryCount = getKVPairValue('ICB_RETRY_COUNT');
    this.plutusEligibility = getKVPairValue('PLUTUS_ELIGIBILITY');
    this.totalAmount = this.getTotalAmount();
  }

  componentDidMount() {
    this.getPlutusEligibility();
  }

  componentWillUnmount() {
    this.props.updateBankDiscount(0);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isClicked) {
      this.props.updateBankDiscount(this.state.discount);
    }
    const cardInfo = this.props.cardNumber || this.props.instrumentHandle;
    const newTotalAmount = this.getTotalAmount();
    if (
      newTotalAmount !== this.totalAmount ||
      cardInfo !== this.lastCheckedCardId
    ) {
      this.totalAmount = newTotalAmount;
      this.getPlutusEligibility();
    }

    if (this.props.isSavingsNudgeEnabled && this.props.isClicked) {
      const eventPayload = {
        isClicked: this.props.isClicked,
        discountInRs: this.state.discount,
        cartValue: get(this.props, 'cartData.price.subTotal'),
        cardBankName: this.props.cardBankName,
        cardType: this.props.productType,
        message: this.state.icb.message,
        discountType: 'INSTANT_CASHBACK'
      };
      this.fireEvent(eventPayload);
    }
  }

  getTotalAmount() {
    const {
      props: { payMode, cartData, paymentOptions, retryGCappliedValue = 0 }
    } = this;

    let total;

    if (payMode === 'retry') {
      total =
        getTotal(get(paymentOptions, 'price'), getPaymentFields()) -
        retryGCappliedValue;
      total = total * 100;
    } else {
      total = getTotal(get(cartData, 'price'), getPaymentFields()) * 100;
    }

    return total;
  }

  getCartId() {
    const {
      props: { payMode, cartData, paymentOptions }
    } = this;

    return payMode === 'retry'
      ? get(paymentOptions, 'cartId')
      : get(cartData, 'id');
  }

  checkEligibility(offer) {
    return this.plutusEligibility[offer];
  }

  getOfferData(data, type) {
    return (
      get(data, 'eligibilityDetails', []).find(info => info.type === type) || {}
    ).data;
  }

  onClickEligibility() {
    triggerEvent('CHECK_ELIGIBILITY');
    this.getPlutusEligibility();
  }

  getPlutusEligibility() {
    if (this.checkEligibility('icb') || this.checkEligibility('deff')) {
      const { cardNumber, instrumentHandle, cartData } = this.props;

      const currentCartId = cardNumber || instrumentHandle;
      if (this.lastCheckedCardId !== currentCartId) {
        this.lastCheckedCardId = currentCartId;
        this.setState({ currentRetryCount: 0 });
      }

      let skuDetails;
      if (checkExchangeCart(cartData)) {
        // Assuming there is only one product in cart for OEE
        const product = get(cartData, 'products.0', {});
        const skuId = get(product, 'skuId');
        const sellerId = get(product, 'selectedSeller.id');
        skuDetails = [
          {
            skuId,
            id: `${skuId}_${sellerId}`,
            payableAmount: get(cartData, 'price.effectiveTotalPrice') * 100
          }
        ];
      } else {
        // Style Based ICB changes.
        skuDetails = cartData
          ? get(cartData, 'products', []).map(product => {
              const skuId = get(product, 'skuId');
              const sellerId = get(product, 'selectedSeller.id');
              return {
                skuId,
                id: `${skuId}_${sellerId}`,
                payableAmount: product.price.total * 100
              };
            })
          : null;
      }

      get(cartData, 'price.charges.data', []).forEach(charge => {
        if (
          charge.value > 0 &&
          PaymentConstants.CHARGES_FOR_PLUTUS[charge.name]
        ) {
          const chargeName = get(charge, 'name', '').toUpperCase();
          skuDetails.push({
            skuId: chargeName,
            id: chargeName,
            payableAmount: charge.value * 100
          });
        }
      });
      const payload = {
        cartId: this.getCartId(),
        totalAmount: this.totalAmount
      };

      skuDetails && (payload.skuDetails = skuDetails);
      payload[instrumentHandle ? 'instrumentHandle' : 'cardNumber'] =
        instrumentHandle || cardNumber;

      triggerMaWithLargePayload('PLUTUS_PAYLOAD', payload);

      PaymentManager.getPlutusEligibility(
        payload,
        this.actionSuccess,
        this.actionError
      );
    }
  }

  actionSuccess(res) {
    this.setState({ icb: { show: false }, deff: { show: false } });

    const icbData = this.getOfferData(res, 'INSTANT_CASHBACK');
    const deffData = this.getOfferData(res, 'DEFERRED_CASHBACK');

    if (this.checkEligibility('icb') && icbData) {
      this.handleICBData(icbData);
    } else if (this.checkEligibility('deff')) {
      this.handleDeffData(deffData);
    }
  }

  actionError() {
    this.setState(prevState => ({
      currentRetryCount: prevState.currentRetryCount + 1,
      icb: { show: true, error: true }
    }));
  }

  fireEvent(payload) {
    const {
      isClicked,
      discountInRs,
      cartValue,
      cardBankName,
      cardType,
      message,
      discountType
    } = payload;
    const eventName = isClicked
      ? 'SAVED_CARD_OFFERS_CLICK'
      : 'SAVED_CARD_OFFERS_LOAD';
    triggerEvent(eventName, {
      custom: {
        custom: {
          v1: cardBankName,
          v2: cardType,
          v3: message,
          v4: `cartValue=${cartValue};discountType=${discountType};discountInRs=${discountInRs}`
        },
        widget: {
          name: 'payment_saved_card',
          type: 'card',
          data_set: {
            data: [
              {
                cardBankName,
                cardType,
                message,
                cartValue,
                discountType,
                discountInRs
              }
            ]
          }
        },
        widget_items: {
          name: isClicked ? 'saved_card_click' : 'saved_card_offer'
        }
      }
    });
  }

  handleICBData(icbData) {
    const { amount, code, message } = icbData;
    const { isClicked, cartData, cardBankName, productType } = this.props;
    const discountInRs = Math.floor(amount) / 100;

    const eventPayload = {
      isClicked,
      discountInRs,
      cartValue: get(cartData, 'price.subTotal'),
      cardBankName,
      cardType: productType,
      message,
      discountType: 'INSTANT_CASHBACK'
    };

    this.fireEvent(eventPayload);

    if (amount > 0) {
      const cbHandler = new CashbackHandler(this.props.cartData, icbData);
      const message = isFeatureEnabled('INLINE_OFFER_CARD')
        ? cbHandler.getInlineOfferNotSelectedICBString()
        : cbHandler.getICBMessageString();

      this.setState({
        icb: { show: true, message, code: null, error: null },
        discount: discountInRs
      });
      if (
        this.props.isClicked ||
        !isFeatureEnabled('INLINE_OFFER_CARD') ||
        get(this, 'props.isNewCard')
      ) {
        this.props.updateBankDiscount(discountInRs);
      }
      if (
        isFeatureEnabled('INLINE_OFFER_CARD') &&
        !get(this, 'props.isNewCard')
      )
        this.props.setCashbackApplicable(true);
    } else {
      this.setState({
        icb: {
          show: true,
          message: PaymentConstants.BANK_MESSAGE_MAP[code],
          code,
          error: null
        },
        discount: 0
      });
      this.props.updateBankDiscount(0);
    }
  }

  handleDeffData(deffData = {}) {
    const { amount } = deffData;
    if (amount > 0) {
      const cbHandler = new CashbackHandler(null, null, deffData);
      const message = cbHandler.getDeffMessageString();
      this.setState({
        deff: { show: true, message }
      });
    }
    this.props.updateBankDiscount(0);
  }

  render() {
    return this.props.render({
      data: this
    });
  }
}

Cashback.propTypes = {
  cartData: PropTypes.object,
  updateBankDiscount: PropTypes.func,
  render: PropTypes.func
};

Cashback.defaultProps = {
  cartData: {},
  updateBankDiscount: () => {},
  render: () => {}
};

export default Cashback;
