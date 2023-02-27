import React from 'react';
import PropTypes from 'prop-types';

import Styles from './returnAbuserV2.base.css';

import Modal from 'commonComp/Modal';

import Image from 'commonComp/Image';

import { getKVPairValue } from 'commonUtils/KVPairManager';

import { isLoggedIn, isReturnAbuser } from 'commonBrowserUtils/Helper';
import sanitize from 'commonUtils/Sanitize';
import get from 'lodash/get';

import Tape from 'iconComp/Tape.jsx';
import List from 'iconComp/List.jsx';
import Alter from 'iconComp/Alter.jsx';
import Exchange from 'iconComp/Exchange.jsx';
import GreenReturn from 'iconComp/GreenReturn.jsx';
import GreenExchange from 'iconComp/GreenExchange.jsx';
import RedCross from 'iconComp/RedCross.jsx';
import GreenInsider from 'iconComp/GreenInsider.jsx';
import GreenShip from 'iconComp/GreenShip.jsx';

const getReturnAbuserData = (type, subType) => {
  const key = `${type}.${subType}`;
  const returnAbuserData = getKVPairValue('RTO_RETURN_ABUSER_CARD');
  return get(returnAbuserData, key);
};

export const ReturnAbuserModal = props => {
  const { type, shippingCharge } = props;
  const details = getReturnAbuserData(type, 'popUp') || {};
  return (
    <Modal
      className={Styles.modal}
      cancelIconConfig={{ show: true }}
      cancelCallback={props.cancelCallback}
    >
      <div className={Styles.header}>{details.title}</div>
      <div className={Styles.details}>
        {type === 'noCod' ? (
          <div>{details.content}</div>
        ) : (
          <div>{details.content.replace('{0}', shippingCharge)}</div>
        )}
      </div>
    </Modal>
  );
};

const HighReturns = props => {
  const { charges, returnAbuserObj } = props;
  const priceText = `\u20B9${charges}`;
  return (
    <CardComponent
      card={get(returnAbuserObj, 'returns')}
      className={Styles.redContainer}
      priceText={priceText}
      name="returns"
      iconWidth="24"
      iconHeight="24"
    />
  );
};
const CardComponent = props => {
  const {
    card: { header, steps },
    className,
    priceText = '',
    name,
    iconWidth,
    iconHeight
  } = props;

  const IconComponents = {
    Tape,
    List,
    Alter,
    Exchange,
    GreenExchange,
    GreenInsider,
    GreenReturn,
    GreenShip,
    RedCross
  };

  return (
    <div className={`${className} ${Styles.cardContainer}`}>
      <div className={Styles.cardContent}>
        <div className={Styles.contentHeading}>{header}</div>
        <div
          className={
            name === 'tips' ? Styles.tipsFlexBlock : Styles.cardFlexBlock
          }
        >
          {steps.map((stepObj, index) => {
            const SVGIcon = IconComponents[stepObj.icon];
            return (
              <div
                className={
                  name === 'tips' ? Styles.tipsContainer : Styles.iconContainer
                }
              >
                <SVGIcon width={iconWidth} height={iconHeight} />
                {name === 'returns' ? (
                  <span className={Styles.contentTextSmall}>
                    {index === 0
                      ? stepObj.text.replace('{0}', priceText)
                      : stepObj.text}
                  </span>
                ) : name === 'tips' ? (
                  <div className={Styles.tipsText}>{stepObj.text}</div>
                ) : (
                  <span
                    className={Styles.contentText}
                    dangerouslySetInnerHTML={{
                      __html: sanitize(stepObj.text)
                    }}
                  ></span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const setStyle = level => {
  if (level === 'LOW') {
    return Styles.low;
  } else if (level === 'MEDIUM') {
    return Styles.medium;
  } else if (level === 'HIGH') {
    return Styles.high;
  } else {
    return Styles.warning;
  }
};

export const ReturnAbuserV2 = props => {
  const {
    returnAbuser: { level, multiplier, returns },
    charges
  } = props;
  const returnAbuserObj = getKVPairValue('RETURN_ABUSER_CONFIG');
  const header = get(returnAbuserObj, 'header', '');
  const myntraUserImage = get(returnAbuserObj, 'myntraUserImage');
  const abuseUserImage = get(returnAbuserObj, 'abuseUserImage');

  return (
    <div className={Styles.mainContainer}>
      <div className={Styles.abuserHeading}>{header}</div>
      <div className={Styles.headContainer}>
        <div className={Styles.cardContent}>
          <div className={Styles.cardHeading}>
            {level !== 'WARNING_LIST' ? (
              <span>
                Your returns are{' '}
                <span className={Styles.multiplier}>
                  {multiplier} times higher
                </span>{' '}
                than average
              </span>
            ) : (
              <span>
                Your returns seem to be{' '}
                <span className={Styles.multiplier}>higher</span> than average.
                You might lose certain privileges!
              </span>
            )}
          </div>
          <div className={setStyle(level)}>
            <Image
              src={abuseUserImage}
              width={98}
              height={38}
              showBackgroundColor={false}
              nonCloudinary={true}
            />
          </div>
          <div className={Styles.indicator} />
          <div className={Styles.indicatorText}>
            Low<span className={Styles.floatRight}>Very high</span>
          </div>
          <div className={Styles.myntUser}>
            <Image
              src={myntraUserImage}
              width={96}
              height={40}
              showBackgroundColor={false}
              nonCloudinary={true}
            />
          </div>
        </div>
      </div>
      <div className={Styles.returnsContainer}>
        <div className={Styles.cardContent}>
          <div className={Styles.returnsText}>
            You have returned about{' '}
            <span className={Styles.bold}>{returns} out of 10</span> items
          </div>
          <div className={Styles.note}>
            (from your orders in the last 12 months)
          </div>
        </div>
      </div>
      {level !== 'WARNING_LIST' ? (
        <div>
          <HighReturns charges={charges} returnAbuserObj={returnAbuserObj} />
          <CardComponent
            card={get(returnAbuserObj, 'privileges')}
            className={Styles.greenContainer}
            name="privileges"
            iconWidth="40"
            iconHeight="40"
          />
        </div>
      ) : (
        <div>
          <CardComponent
            card={get(returnAbuserObj, 'benefits')}
            className={Styles.greenContainer}
            name="benefits"
            iconWidth="40"
            iconHeight="40"
          />
        </div>
      )}
      <CardComponent
        card={get(returnAbuserObj, 'tips')}
        className={Styles.tipsMainContainer}
        name="tips"
        iconWidth="32"
        iconHeight="32"
      />
    </div>
  );
};

class ReturnAbuser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  }

  render() {
    let { returnAbuser, cod, shippingCharge } = this.props;
    const maxCOD = get(cod, 'maxCod');
    const _isReturnAbuser = isReturnAbuser(returnAbuser);
    if (isLoggedIn() && (_isReturnAbuser || maxCOD === 0)) {
      let type = 'noCod';
      if (_isReturnAbuser && shippingCharge !== 0) {
        type = maxCOD === 0 ? 'noFdNoCod' : 'noFd';
      }
      return (
        <div className={Styles.info}>
          <div className={Styles.headerText}>Please Note</div>
          <span className={Styles.textMessage}>
            {getReturnAbuserData(type, 'message') || ''}
          </span>
          <span className={Styles.link} onClick={this.toggleModal}>
            Why?
          </span>
          {this.state.showModal && (
            <ReturnAbuserModal
              type={type}
              cancelCallback={this.toggleModal}
              shippingCharge={shippingCharge}
            />
          )}
        </div>
      );
    }
    return null;
  }
}

ReturnAbuser.propTypes = {
  maxCOD: PropTypes.number
};

export default ReturnAbuser;
