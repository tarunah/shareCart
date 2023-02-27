import React, { Fragment } from 'react';

import Hanger from 'iconComp/Hanger.jsx';
import Alert from 'iconComp/Alert.jsx';
import Styles from '../../scratchCard.css';
import { formatDateHelper } from 'commonBrowserUtils/Helper';
import { getGrowthHackConfigValue } from 'commonUtils/GrowthHackConfigManager';
const { stringLiterals } = getGrowthHackConfigValue('SCRATCHCARD_CONFIG');
import { scratchCardRetentionConfig } from 'commonBrowserUtils/ConfirmationConstants';

const { CARD_STATES } = scratchCardRetentionConfig;

function ScratchResponseCard(props) {
  const {
    rewardTitle,
    logo,
    couponCode,
    expiryDate,
    onCouponCopy,
    isCouponPage,
    status,
    isCouponEmpty,
    isError
  } = props;

  const SCRATCHED_EXPIRED = status === CARD_STATES.SCRATCHED_EXPIRED;
  const USED = status === CARD_STATES.USED;

  const copyToClipBoard = txtToCopy => {
    const input = document.createElement('input');
    input.type = 'text';
    input.value = txtToCopy;
    document.body.appendChild(input);
    input.select(txtToCopy);
    document.execCommand('copy');
    document.body.removeChild(input);
  };

  const handleCouponClick = () => {
    if ([CARD_STATES.USED, CARD_STATES.SCRATCHED_EXPIRED].includes(status))
      return;
    copyToClipBoard(couponCode);
    onCouponCopy();
  };
  return (
    <div
      className={`${Styles.contentWrapper}`}
      style={isCouponPage ? { zIndex: 1 } : {}}
    >
      <div>
        {isError ? (
          <Alert className={Styles.logo} />
        ) : isCouponEmpty ? (
          <Hanger className={Styles.logo} />
        ) : (
          <img
            className={`${Styles.logo} ${
              SCRATCHED_EXPIRED ? Styles.disableFilter : {}
            }`}
            src={logo}
          />
        )}
        <div
          className={`
          ${Styles.rewardTitle} ${!couponCode ? Styles.noCoupon : {}} ${
            SCRATCHED_EXPIRED ? Styles.disableText : {}
          }${isError || isCouponEmpty ? Styles.fontBig : {}}`}
        >
          {isError
            ? stringLiterals.ERROR
            : isCouponEmpty
            ? stringLiterals.BETTER_LUCK
            : rewardTitle}
        </div>
        {couponCode && !isCouponEmpty ? (
          <div
            className={`${Styles.couponBox} ${
              USED || SCRATCHED_EXPIRED ? Styles.claimedBox : ''
            } ${SCRATCHED_EXPIRED ? Styles.borderDisable : {}}`}
            onClick={handleCouponClick}
          >
            <div
              className={`${Styles.couponText} ${
                SCRATCHED_EXPIRED ? Styles.disableText : {}
              }`}
            >
              {couponCode}
            </div>
            {USED ? (
              <div className={Styles.claimedLabel}>
                {stringLiterals.CLAIMED}
              </div>
            ) : SCRATCHED_EXPIRED ? (
              <div className={Styles.expiredLabel}>
                {stringLiterals.EXPIRED}
              </div>
            ) : (
              <div className={Styles.copy}>{stringLiterals.COPY}</div>
            )}
          </div>
        ) : null}
      </div>
      {!isCouponEmpty ? (
        <div className={Styles.footer}>
          {SCRATCHED_EXPIRED ? (
            <span className={Styles.expiredText}>
              {stringLiterals.EXPIRED_ON} {formatDateHelper(expiryDate)}
            </span>
          ) : (
            <Fragment>
              <span style={{ fontWeight: 'bold' }}>
                {stringLiterals.VALID_TILL}{' '}
                {formatDateHelper(parseInt(expiryDate))}.
              </span>{' '}
              {stringLiterals.TC}
            </Fragment>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default ScratchResponseCard;
