import React, { useState } from 'react';
import get from 'lodash/get';

import { getKVPairValue } from 'commonUtils/KVPairManager';
import sanitize from 'commonUtils/Sanitize';

import Styles from './conveniencePay.base.css';

import UPI from 'iconComp/UPI.jsx';
import CreditCard from 'iconComp/CreditCard.jsx';
import COD from 'iconComp/COD.jsx';

const ConveniencePay = () => {
  const [active, setActive] = useState('PayOnline');
  const handleClick = e => {
    const index = e.target.id;
    if (index !== active) {
      setActive(index);
    }
  };
  const conveniencePayHalfCard = getKVPairValue('CONVENIENCE_PAY_HALFCARD');
  const IconComponents = {
    UPI,
    CreditCard,
    COD
  };
  return (
    <div className={Styles.mainContainer}>
      <div className={Styles.heading}>
        {get(conveniencePayHalfCard, 'heading')}
      </div>
      <div className={Styles.subHeading}>
        <button
          onClick={handleClick}
          className={
            active === 'PayOnline' ? Styles.activeTab : Styles.nonActiveTab
          }
          id="PayOnline"
        >
          {get(conveniencePayHalfCard, 'tabs.tab1.heading')}
        </button>

        <button
          onClick={handleClick}
          className={` ${
            active === 'POD' ? Styles.activeTab : Styles.nonActiveTab
          } ${Styles.tabSpacing} `}
          id="POD"
        >
          {get(conveniencePayHalfCard, 'tabs.tab2.heading')}
        </button>
      </div>
      <hr className={Styles.dashedLine} />
      <div className={Styles.contentContainer}>
        <div className={active === 'PayOnline' ? '' : Styles.hideContent}>
          <div className={Styles.subHeading}>
            {get(conveniencePayHalfCard, 'tabs.tab1.subHeading')}
          </div>
          <div className={Styles.mainDesc}>
            {get(conveniencePayHalfCard, 'tabs.tab1.desc')}
          </div>
          <div>
            {get(conveniencePayHalfCard, 'tabs.tab1.steps').map(
              (step, index) => (
                <div className={index === 3 ? Styles.lastStep : Styles.steps}>
                  <span className={Styles.subHeading}>{step.name}</span>
                  <div
                    className={Styles.desc}
                    dangerouslySetInnerHTML={{
                      __html: sanitize(step.text)
                    }}
                  />
                </div>
              )
            )}
          </div>
          <div className={Styles.greenContainer}>
            {get(conveniencePayHalfCard, 'tabs.tab1.creditMessage')}
          </div>
          <div className={Styles.noteHeading}>
            {get(conveniencePayHalfCard, 'tabs.tab1.note.heading')}
          </div>
          <div className={Styles.desc}>
            {get(conveniencePayHalfCard, 'tabs.tab1.note.text')}
          </div>
        </div>
        <div className={active === 'POD' ? '' : Styles.hideContent}>
          <div className={Styles.subHeading}>
            {get(conveniencePayHalfCard, 'tabs.tab2.subHeading')}
          </div>
          <div className={Styles.mainDesc}>
            {get(conveniencePayHalfCard, 'tabs.tab2.desc')}
          </div>
          <div>
            {get(conveniencePayHalfCard, 'tabs.tab2.steps').map(step => {
              let SVGIcon = IconComponents[step.name];
              return (
                <div>
                  <div className={Styles.iconHeading}>
                    <SVGIcon width="24px" height="24px" />
                    <span
                      className={`${Styles.subHeading} ${Styles.alignHeading}`}
                    >
                      {step.heading}
                    </span>
                  </div>
                  <div className={`${Styles.desc} ${Styles.descSpacing}`}>
                    {step.text}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConveniencePay;
