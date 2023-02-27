import React, { Fragment } from 'react';

import { PaymentSection } from './PaymentSection';
import DeliveryAddress from './DeliveryAddress';
import ItemArrivalInfo from './ItemArrivalInfo';
import ActionButton from './ActionButton';
import TryAndBuyInfo from './TryAndBuyInfo';
import TwoFactorAuthentication from '../../../payment/common/TwoFactorAuthentication';
import {
  getProfileEmail,
  getSelectedProducts
} from 'commonBrowserUtils/Helper';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
import { isVariantEnabled } from 'commonUtils/FeaturesManager';

import Style from './expresscheckout.base.css';
import ExpressConstants from './expressConstants';
import {
  ArrivalDetails,
  CaptchaVerification
} from './ExpressCheckoutComponents';
import Modal from 'commonComp/Modal';
import Loader from 'commonComp/Loader';

const { HEADER_MAPPING } = ExpressConstants;
import { pageMode } from 'commonUtils/constants';
import Back from 'iconComp/Back.jsx';
const { COD } = PaymentConstants;

class ExpressCheckout extends React.PureComponent {
  render() {
    const {
      loyaltyData,
      resolved,
      paymentType,
      finalAmount,
      gcObj,
      lpObj,
      orderTotal,
      instrumentData,
      paymentOptions
    } = this.props.expressCheckoutData;
    const {
      addressData,
      data: { flags, products, orderAddressId, unifiedAddressId },
      twoFA,
      cvvError,
      section,
      showDetails,
      onClose,
      serviceabilityData,
      serviceabilityFlags,
      loading,
      captchaDetails
    } = this.props;
    const { loyaltyChecked } = lpObj;
    const { creditChecked } = gcObj;
    const hidePayment = finalAmount === 0;
    const { price } = this.props.data;
    const hasChecked = creditChecked || loyaltyChecked;
    const loyaltyInfo = {
      orderTotal,
      conversion: getGrowthHackConfigValue('XPRESS_LOYALTY_CONV') / 100,
      loyaltyBalance: loyaltyData && loyaltyData.activePoints,
      finalAmount
    };
    const selectedProducts = getSelectedProducts(products);
    const showPayable = paymentType === COD || finalAmount === 0;
    const balanceAmountProps = {
      gcObj,
      lpObj,
      updateLoyalty: this.props.updateLoyalty,
      updateCredit: this.props.updateCredit,
      loyaltyInfo
    };
    const payableAmountProps = {
      price,
      hasChecked,
      finalAmount,
      showPayable
    };
    return (
      <React.Fragment>
        {loading && <Loader show={true} backdrop={true} />}
        {resolved && (
          <React.Fragment>
            {captchaDetails.display && (
              <CaptchaVerification
                onClose={this.props.resetCaptcha}
                setCaptchaRef={this.props.setCaptchaRef}
                setLoader={this.props.setLoader}
                setCaptchaDetails={this.props.setCaptchaDetails}
                submit={this.props.handleCaptchaSubmit}
              />
            )}
            {twoFA.display && (
              <TwoFactorAuthentication
                email={twoFA.enableEmailOtp ? getProfileEmail() : ''}
                numbers={twoFA.mobileNumbers}
                paymentModes={twoFA.paymentModes}
                close={this.props.toggleTwoFA}
                handlePaymentAction={this.props.handlePaymentAction}
                submit={this.props.handleTwoFASubmit}
                errorCallback={this.props.disableTwoFA}
                mode={pageMode.MOBILE}
                orderAddressId={orderAddressId}
                unifiedAddressId={unifiedAddressId}
              />
            )}
            {
              <div
                className={
                  twoFA.display || captchaDetails.display
                    ? Style.hideExpressContent
                    : Style.expressContent
                }
              >
                <Modal
                  className={Style.expressContent}
                  cancelCallback={onClose}
                  halfCard={true}
                  cancelIconConfig={{
                    show: true,
                    className: Style.closeXpress
                  }}
                  stopBackgroundScroll={true}
                >
                  <div
                    className={`${Style.innerExpressContent} ${
                      showDetails ? Style.slideOut : ''
                    }`}
                  >
                    <div className={Style.containerHeading}>Place Order</div>
                    <DeliveryAddress
                      data={addressData}
                      showDetails={this.props.toggleDetails}
                    />
                    <ItemArrivalInfo
                      serviceabilityData={serviceabilityData}
                      serviceabilityFlags={serviceabilityFlags}
                      showDetails={this.props.toggleDetails}
                    />
                    {!isVariantEnabled('AOC_V2_VARIANT3') && (
                      <TryAndBuyInfo
                        {...flags}
                        products={selectedProducts}
                        showDetails={this.props.toggleDetails}
                      />
                    )}
                    <PaymentSection
                      showDetails={this.props.toggleDetails}
                      paymentType={paymentType}
                      paymentObj={instrumentData}
                      paymentOptions={paymentOptions}
                      updateCVV={this.props.updateCVV}
                      errorMsg={cvvError}
                      hidePayment={hidePayment}
                      cartData={this.props.data}
                      updateBankDiscount={this.props.updateBankDiscount}
                      balanceAmountProps={balanceAmountProps}
                      payableAmountProps={payableAmountProps}
                      getNewPaymentForm={this.props.getNewPaymentForm}
                    />
                    <ActionButton
                      twoFA={twoFA}
                      isCaptchaVisible={captchaDetails.display}
                      expressCheckoutData={this.props.expressCheckoutData}
                      payNow={this.props.makePayment}
                      paymentType={paymentType}
                    />
                  </div>
                  <div
                    className={`${Style.moreDetails} ${
                      showDetails ? Style.slideIn : ''
                    }`}
                  >
                    <div>
                      <div
                        className={Style.sectionHead}
                        onClick={() => this.props.toggleDetails('default')}
                      >
                        <Back className={Style.backIcon} />
                        <b> {HEADER_MAPPING[section]} </b>
                      </div>
                      <ArrivalDetails list={serviceabilityData} />
                    </div>
                  </div>
                </Modal>
              </div>
            }
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default ExpressCheckout;
