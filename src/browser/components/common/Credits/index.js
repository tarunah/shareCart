import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import MyntraCredit from './MyntraCredit';
import LoyaltyPoints from './LoyaltyPoints';
import SuperCoinsCredit from './SuperCoinsCredit';

import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import { isGiftcardContext } from 'commonUtils/helper';
import CreditsManager from 'commonBrowserUtils/CreditsManager';
import { isValidAmount, errorNotification } from 'commonBrowserUtils/Helper';
import { getInstrumentTwoFAData } from 'commonBrowserUtils/PaymentHelper';
import { getSnackBarStyleOverrides } from 'commonBrowserUtils/CartHelper';
import { getKVPairValue } from 'commonUtils/KVPairManager';
import { SUPERCOINS_CREDIT } from 'commonBrowserUtils/Strings';

import Styles from './credits.base.css';

const boundFuncs = [
  'toggleGC',
  'toggleLP',
  'showGiftCardBalance',
  'showLPBalance',
  'updateMyntraInstrumentsData',
  'handleCreditsAction',
  'fetchBalance',
  'onFetchBalance',
  'redeemSuperCoins'
];

class Credits extends React.PureComponent {
  constructor(props) {
    super(props);
    boundFuncs.forEach(method => (this[method] = this[method].bind(this)));

    const {
      balance: { gcBalance = null, lpBalance = null, scBalance = null } = {}
    } = this.props;

    this.state = {
      gcBalance,
      lpBalance,
      scBalance,
      showSCCredits: false
    };
  }

  componentDidMount() {
    this.fetchBalance();
    this.updateMyntraInstrumentsData(this.props);
  }

  fetchBalance() {
    /* Fetch LP, GC balance in case not present in state
      Also, handling lazy load for GC in case feature is enabled */

    const promises = [];
    const { lpBalance, gcBalance } = this.state;
    const {
      show: { mcShow, lpShow, scShow },
      cartTotal,
      cartId
    } = this.props;

    promises.push(
      !lpShow || lpBalance || isFeatureEnabled('LP_BALANCE_LAZYLOAD')
        ? Promise.resolve()
        : new Promise(resolve =>
            CreditsManager.getLoyaltyPointsBalance(null, resolve, resolve)
          )
    );
    promises.push(
      !mcShow || gcBalance || isFeatureEnabled('AUTOGC_BALANCE_LAZYLOAD')
        ? Promise.resolve()
        : new Promise(resolve =>
            CreditsManager.getGiftCardBalance(null, resolve, resolve)
          )
    );
    promises.push(
      scShow && Math.round(Number(cartTotal)) > 0
        ? new Promise(resolve =>
            CreditsManager.getSupercoinsBalance(
              {
                amount: Math.round(Number(cartTotal)),
                cartId: cartId
              },
              resolve,
              resolve
            )
          )
        : Promise.resolve()
    );
    Promise.all(promises).then(this.onFetchBalance);
  }

  onFetchBalance(data) {
    const [lpBalance, gcBalance, scBalance] = data;
    gcBalance &&
      !gcBalance.hasOwnProperty('error') &&
      this.setState({ gcBalance });
    lpBalance &&
      !lpBalance.hasOwnProperty('error') &&
      this.setState({ lpBalance });

    if (get(scBalance, 'statusEntry.statusType', false) === 'SUCCESS') {
      this.setState({
        scBalance: get(scBalance, 'data', {}),
        showSCCredits: true
      });
    }

    this.props.updateCredits &&
      this.props.updateCredits({
        gcBalance,
        lpBalance,
        scBalance
      });
  }

  handleCreditsAction(action, data, successCallback, errorCallback) {
    const { setLoader, pagesource } = this.props;
    setLoader(true);
    CreditsManager[action](
      { data, pagesource },
      res => {
        setLoader(false);
        this.triggerClickEvent(action);
        successCallback && successCallback(res, action);
        /* In case gc was not present, but was auto applied.
          Fetches balance only if not present in state */
      },
      err => {
        setLoader(false);
        errorCallback ? errorCallback(err) : errorNotification();
      }
    );
  }

  triggerClickEvent(action) {
    triggerEvent('CREDITS_WIDGET_CLICK', {
      maData: {},
      custom: {
        widget_items: {
          data_set: {
            data: { entity_name: action, entity_id: this.props.cartId }
          }
        }
      }
    });
  }

  updateMyntraInstrumentsData(data, nextData) {
    const {
      props: { instrumentData: { mc = {}, lp = {} } = {} }
    } = this;
    let myntraInstrumentsData = {};

    if (!nextData || (nextData && data.appliedGC !== nextData.appliedGC)) {
      const mcData = nextData || data;
      const mcTwoFAData = {
        enable: mcData.appliedGC ? true : false
      };
      mcData &&
        (myntraInstrumentsData = {
          ...myntraInstrumentsData,
          auto_giftcard_used: mcData.appliedGC ? 'true' : '',
          auto_giftcard_amount: mcData.appliedGC ? mcData.appliedGC.value : '0',
          giftcard_type: mcData.appliedGC ? 'myntracredit' : '',
          twofa_mc_data: mcTwoFAData,
          paynowInstrumentsData: {
            autoGiftCardUsed: mcData.appliedGC ? 'true' : '',
            autoGiftCardAmount: mcData.appliedGC ? mcData.appliedGC.value : '0',
            giftcardType: mcData.appliedGC ? 'myntracredit' : '',
            myntraCreditEligible: mcData.appliedGC ? 'true' : '',
            myntraCreditAmount: mcData.appliedGC ? mcData.appliedGC.value : '0'
          }
        });
    }
    if (!nextData || (nextData && data.appliedLP !== nextData.appliedLP)) {
      const lpData = nextData || data;
      const lpTwoFAData = {
        enable: lpData.appliedLP ? true : false
      };
      if (lpData) {
        const paynowInstrumentsData = get(
          myntraInstrumentsData,
          'paynowInstrumentsData',
          {}
        );
        myntraInstrumentsData = {
          ...myntraInstrumentsData,
          useloyaltypoints: lpData.appliedLP ? 'Y' : 'N',
          twofa_lp_data: lpTwoFAData,
          paynowInstrumentsData: {
            ...paynowInstrumentsData,
            useloyaltypoints: lpData.appliedLP ? 'Y' : 'N'
          }
        };
      }
    }

    this.props.addMyntraInstrumentsData(myntraInstrumentsData);
  }

  toggleGC() {
    if (this.props.payMode === 'retry') {
      this.props.toggleRetryGC();
      return;
    }

    const { appliedGC, selectedProductsCount, deviceMode } = this.props;
    if (selectedProductsCount === 0) {
      const styleOverrides = getSnackBarStyleOverrides(deviceMode);
      SHELL.alert('info', {
        message: 'Select at least one item to apply Myntra Credit',
        styleOverrides
      });
    } else {
      this.handleCreditsAction(
        appliedGC ? 'removeGiftCard' : 'applyGiftCard',
        null,
        this.props.creditsToggleSuccessCallback
      );
    }
  }

  toggleLP() {
    const { appliedLP, selectedProductsCount, deviceMode } = this.props;
    if (selectedProductsCount === 0) {
      const styleOverrides = getSnackBarStyleOverrides(deviceMode);
      SHELL.alert('info', {
        message: 'Select at least one item to apply Myncash',
        styleOverrides
      });
    } else {
      this.handleCreditsAction(
        appliedLP ? 'removeLoyaltyPoints' : 'applyLoyaltyPoints',
        null,
        this.props.creditsToggleSuccessCallback
      );
    }
  }

  redeemSuperCoins() {
    const { selectedProductsCount, deviceMode, cartId, cartTotal } = this.props;
    const styleOverrides = getSnackBarStyleOverrides(deviceMode);

    if (selectedProductsCount === 0) {
      SHELL.alert('info', {
        message: SUPERCOINS_CREDIT.itemSelectError,
        styleOverrides
      });
    } else {
      const redeemableSupercoins = get(
        this.state.scBalance,
        'redeemableSupercoins',
        0
      );
      this.handleCreditsAction(
        'redeemSuperCoins',
        {
          amount: Math.round(Number(cartTotal)),
          redeemableSCShown: redeemableSupercoins,
          cartId: cartId
        },
        data => {
          const isSuccess =
            get(data, 'statusEntry.statusType', false) === 'SUCCESS';
          const message = get(data, 'statusEntry.statusMessage', '');
          if (message) {
            if (isSuccess) {
              SHELL.alert('info', {
                message: message,
                styleOverrides
              });
            } else {
              errorNotification({
                message: message
              });
            }
          }

          if (isSuccess) {
            setTimeout(() => {
              CreditsManager.getGiftCardBalance(
                null,
                gcBalance => {
                  gcBalance &&
                    !gcBalance.hasOwnProperty('error') &&
                    this.setState({ gcBalance });
                  this.props.updateCredits &&
                    this.props.updateCredits({
                      gcBalance
                    });
                  this.isSuperCoinsRedeemed = true;
                },
                () => {}
              );
            }, getKVPairValue('SUPERCOINS_CREDIT').apiTimeout || 2000);
          }
          this.setState({
            showSCCredits: false
          });
        }
      );
    }
  }

  showGiftCardBalance() {
    this.handleCreditsAction(
      'getGiftCardBalance',
      null,
      res => {
        if (this.props.payMode === 'retry') {
          this.props.updateCreditsBalance({ gcBalance: res });
        } else {
          this.setState({
            gcBalance: res
          });
        }
      },
      () => {
        errorNotification({
          message: 'Unable to load balance. Please try again'
        });
      }
    );
  }

  showLPBalance() {
    this.handleCreditsAction(
      'getLoyaltyPointsBalance',
      null,
      res => {
        this.setState({
          lpBalance: res
        });
      },
      () => {
        errorNotification({
          message: 'Unable to load balance. Please try again'
        });
      }
    );
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateMyntraInstrumentsData(prevProps, this.props);
    if (prevProps.balance !== this.props.balance) {
      const {
        balance: { gcBalance = null, lpBalance = null } = {}
      } = this.props;
      this.setState({
        gcBalance,
        lpBalance
      });
    }

    if (
      get(this.props, 'show.scShow', false) &&
      prevProps.totalQuantityInCart !== this.props.totalQuantityInCart
    ) {
      if (Math.round(Number(this.props.cartTotal)) > 0) {
        CreditsManager.getSupercoinsBalance(
          {
            amount: Math.round(Number(this.props.cartTotal)),
            cartId: this.props.cartId
          },
          res => {
            if (get(res, 'statusEntry.statusType', false) === 'SUCCESS') {
              this.setState({
                scBalance: get(res, 'data', {}),
                showSCCredits: true
              });
            } else {
              this.setState({
                showSCCredits: false
              });
            }
          },
          error => {
            this.setState({ scBalance: null, showSCCredits: false });
          }
        );
      } else {
        this.setState({ scBalance: null, showSCCredits: false });
      }
    }

    if (get(this.props, 'show.scShow', false) && this.isSuperCoinsRedeemed) {
      this.isSuperCoinsRedeemed = false;
      const prevGCBalance = get(prevState, 'gcBalance.totalBalance');
      const currentGCBalance = get(this.state, 'gcBalance.totalBalance');

      if (prevGCBalance === currentGCBalance) {
        const { deviceMode } = this.props;
        const styleOverrides = getSnackBarStyleOverrides(deviceMode);
        SHELL.alert('info', {
          message: getKVPairValue('SUPERCOINS_CREDIT').mcTimeoutMsg,
          styleOverrides
        });
      } else {
        this.handleCreditsAction(
          'applyGiftCard',
          null,
          this.props.creditsToggleSuccessCallback
        );
      }
    }
  }

  render() {
    const {
      props: {
        payMode,
        cartId,
        appliedGC,
        appliedLP,
        giftcardApplicable,
        loyaltyPointsApplicable,
        deviceMode,
        cartTotal,
        isExchangeCart,
        isRefund,
        show: { mcShow, lpShow, scShow = false }
      },
      state: { gcBalance, lpBalance, scBalance, showSCCredits }
    } = this;
    const totalGCBalance = get(gcBalance, 'totalBalance');
    const totalGCBalancePresent = totalGCBalance !== undefined;
    const gcSellerDisabled =
      !giftcardApplicable.value && !isGiftcardContext() && payMode !== 'retry';
    const lpSellerDisabled =
      !loyaltyPointsApplicable.value &&
      !isGiftcardContext() &&
      payMode !== 'retry';

    // show GC option if:
    // autogc fg is enabled and
    // (giftcardApplicable flag is true or giftcard seller is disabled) and
    // (user has some gc balance or the lazy fg is enabled)
    const autoAppliedBalance = appliedGC && isValidAmount(appliedGC.value);
    const lpAppliedBalance = appliedLP && isValidAmount(appliedLP.value);

    const showGC =
      mcShow &&
      !isRefund &&
      isFeatureEnabled('AUTOGC_ENABLED') &&
      (giftcardApplicable.value || gcSellerDisabled) &&
      (isExchangeCart && Number(cartTotal) === 0
        ? autoAppliedBalance || lpAppliedBalance
        : true) &&
      ((totalGCBalancePresent && isValidAmount(totalGCBalance)) ||
        autoAppliedBalance ||
        isFeatureEnabled('AUTOGC_BALANCE_LAZYLOAD'));

    const totalActivePoints = get(lpBalance, 'activePoints');
    const lpBalancePresent = totalActivePoints !== undefined;

    const showLP =
      lpShow &&
      !isRefund &&
      isFeatureEnabled('LP_ENABLED') &&
      (loyaltyPointsApplicable.value || lpSellerDisabled) &&
      (isExchangeCart && Number(cartTotal) === 0
        ? autoAppliedBalance || lpAppliedBalance
        : true) &&
      (lpAppliedBalance ||
        totalActivePoints ||
        isFeatureEnabled('LP_BALANCE_LAZYLOAD'));

    const redeemableSupercoins = get(scBalance, 'redeemableSupercoins', 0);
    const equivalentMyntraCredit = get(scBalance, 'equivalentMyntraCredit', 0);
    const showSuperCoins = showSCCredits && scShow && redeemableSupercoins > 0;
    const disableSuperCoins = isGiftcardContext() && payMode === 'retry';

    return showGC || showLP || showSuperCoins ? (
      <div
        className={`${Styles.creditsContainer} ${
          deviceMode === 'desktop' ? Styles.desktopCreditsContainer : ''
        }`}
      >
        {showGC ? (
          <MyntraCredit
            cartId={cartId}
            appliedGC={appliedGC}
            totalGCBalance={totalGCBalance}
            totalGCBalancePresent={totalGCBalancePresent}
            gcSellerDisabled={gcSellerDisabled}
            giftcardApplicable={giftcardApplicable}
            toggleGC={this.toggleGC}
            showBalance={this.showGiftCardBalance}
          />
        ) : null}
        {showGC && showSuperCoins && <div className={Styles.separator}></div>}
        {showSuperCoins && (
          <SuperCoinsCredit
            redeemableSupercoins={redeemableSupercoins}
            equivalentMyntraCredit={equivalentMyntraCredit}
            applySupercoinsCb={this.redeemSuperCoins}
            cartId={cartId}
            disableSuperCoins={disableSuperCoins}
          />
        )}
        {showLP && (showGC || showSuperCoins) && (
          <div className={Styles.separator}></div>
        )}
        {showLP ? (
          <LoyaltyPoints
            cartId={cartId}
            appliedLP={appliedLP}
            totalActivePoints={totalActivePoints}
            lpBalancePresent={lpBalancePresent}
            lpSellerDisabled={lpSellerDisabled}
            lpBalance={lpBalance}
            loyaltyPointsApplicable={loyaltyPointsApplicable}
            toggleLP={this.toggleLP}
            showBalance={this.showLPBalance}
          />
        ) : null}
      </div>
    ) : null;
  }
}

Credits.defaultProps = {
  addMyntraInstrumentsData: () => {}
};

Credits.propTypes = {
  balance: PropTypes.object,
  appliedGC: PropTypes.object,
  appliedLP: PropTypes.object,
  isExchangeCart: PropTypes.bool,
  isRefund: PropTypes.bool,
  giftcardApplicable: PropTypes.object,
  loyaltyPointsApplicable: PropTypes.object,
  addMyntraInstrumentsData: PropTypes.func,
  cartId: PropTypes.string,
  cartTotal: PropTypes.string,
  instrumentData: PropTypes.object,
  show: PropTypes.object.isRequired,
  creditsToggleSuccessCallback: PropTypes.func.isRequired,
  setLoader: PropTypes.func.isRequired,
  pagesource: PropTypes.string
};

export default Credits;
