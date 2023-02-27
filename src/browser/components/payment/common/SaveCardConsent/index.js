import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from 'commonComp/Modal';
import ShieldDashed from 'iconComp/ShieldDashed.jsx';
import Sprite from 'commonComp/Sprite';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import Button from 'commonComp/Button';
import { isMobile } from 'commonBrowserUtils/Helper';

import Styles from './savedCardConsent.base.css';

const Header = props => {
  const { text, cardType = '' } = props;
  return (
    <div className={Styles.header}>{text.replace('<cardType>', cardType)}</div>
  );
};

const Caption = props => {
  const { text } = props;
  return <div className={Styles.caption}>{text}</div>;
};

const Bulletin = props => {
  const { list } = props;
  return (
    <ul className={Styles.bulletinList}>
      {list.map((item, index) => {
        return (
          <li key={index} className={Styles.bulletinText}>
            {item}
          </li>
        );
      })}
    </ul>
  );
};

const onLinkClick = url => {
  window.location.href = url;
};

const LinkText = props => {
  const {
    data: { text, link },
    styleClass,
    styleUrlClass
  } = props;

  return text ? (
    <div className={`${styleClass} ${Styles.linkText}`}>
      <span>{text}</span>
      {link.text && link.url ? (
        <span
          className={`${Styles.linkTextUrl} ${styleUrlClass}`}
          onClick={() => onLinkClick(link.url)}
        >
          {link.text}
        </span>
      ) : null}
    </div>
  ) : null;
};

const Faq = props => {
  return <LinkText {...props} styleClass={Styles.faq} />;
};

const TnC = props => {
  return (
    <LinkText
      {...props}
      styleClass={Styles.tnc}
      styleUrlClass={Styles.tncUrl}
    />
  );
};

const ConsentButton = props => {
  const {
    btnData: { consentGiven, consentNotGiven },
    onClickFn = () => {}
  } = props;

  const noConsentClickFn = e => {
    onClickFn(e);
    triggerEvent('SAVE_CARD_CONSENT_USER_OPTIONS_CHOSEN', {
      custom: {
        custom: {
          v1: false, // payment_token_user_consent_yes
          v2: true, // payment_token_user_consent_no
          v3: false // payment_token_user_consent_back
        },
        widget: {
          name: 'payment_token_user_consent_option',
          type: 'button'
        }
      }
    });
  };

  const yesConsentClickFn = e => {
    onClickFn(e);
    triggerEvent('SAVE_CARD_CONSENT_USER_OPTIONS_CHOSEN', {
      custom: {
        custom: {
          v1: true, // payment_token_user_consent_yes
          v2: false, // payment_token_user_consent_no
          v3: false // payment_token_user_consent_back
        },
        widget: {
          name: 'payment_token_user_consent_option',
          type: 'button'
        }
      }
    });
  };

  return (
    <div className={Styles.container}>
      <Button onClick={noConsentClickFn} className={Styles.consentNotGivenBtn}>
        {consentNotGiven}
      </Button>
      <Button onClick={yesConsentClickFn} className={Styles.consentGivenBtn}>
        {consentGiven}
      </Button>
    </div>
  );
};

const ImageContainer = props => {
  const { cardType } = props;
  return (
    <div className={Styles.imageContainer}>
      <Sprite name="cardv2-default" className={Styles.defaultCard} />
      <ShieldDashed className={Styles.shieldDashed} />
      <Sprite
        name={`cardv2-${cardType.toLowerCase()}`}
        className={Styles.defaultCard}
      />
    </div>
  );
};

const SaveCardConsent = props => {
  const savedCardConsentInfo = getKVPairValue('SAVED_CARD_CONSENT');
  const {
    showConsent,
    onConsentClickFn,
    cardType,
    toggleShowConsentFn,
    closeOnBack,
    showConsentButton
  } = props;

  const handleCancelClick = () => {
    showConsentButton &&
      triggerEvent('SAVE_CARD_CONSENT_USER_OPTIONS_CHOSEN', {
        custom: {
          custom: {
            v1: false, // payment_token_user_consent_yes
            v2: false, // payment_token_user_consent_no
            v3: true // payment_token_user_consent_back
          },
          widget: {
            name: 'payment_token_user_consent_option',
            type: 'button'
          }
        }
      });
    toggleShowConsentFn(false);
  };

  const showModal = showConsent && savedCardConsentInfo.allowedCards[cardType];

  useEffect(() => {
    showConsentButton &&
      showModal &&
      triggerEvent('SAVE_CARD_CONSENT_HALF_CARD_LOAD', {
        custom: {
          widget: {
            name: 'payment_token_user_consent_load',
            type: 'card'
          }
        }
      });
  }, [showModal]);

  return showModal ? (
    <Modal
      id="saveConsentModal"
      halfCard={isMobile()}
      closeOnBack={closeOnBack}
      cancelCallback={handleCancelClick}
      cancelIconConfig={{ show: true }}
      disableBackdropClick={true}
      stopBackgroundScroll={isMobile()}
      className={`${Styles.modalContainer} ${!isMobile() &&
        Styles.desktopModalContainer}`}
    >
      <div className={Styles.consentModal}>
        <ImageContainer cardType={cardType} />
        <Header text={savedCardConsentInfo.header} cardType={cardType} />
        <Caption text={savedCardConsentInfo.caption} />
        <Bulletin list={savedCardConsentInfo.bulletin} />
        <Faq data={savedCardConsentInfo.faq} />
        <TnC data={savedCardConsentInfo.tnc} />
      </div>
      {showConsentButton ? (
        <ConsentButton
          btnData={savedCardConsentInfo.button}
          onClickFn={onConsentClickFn}
        />
      ) : null}
    </Modal>
  ) : null;
};

export default SaveCardConsent;

SaveCardConsent.propTypes = {
  cardType: PropTypes.string,
  showConsent: PropTypes.bool,
  showConsentButton: PropTypes.bool,
  onConsentClickFn: PropTypes.func,
  toggleShowConsentFn: PropTypes.func
};

SaveCardConsent.defaultProps = {
  showConsentButton: true,
  onConsentClickFn: () => {},
  toggleShowConsentFn: () => {}
};
