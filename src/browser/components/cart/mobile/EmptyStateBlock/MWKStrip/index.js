import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';

import CardCarousel from '../../../common/Card/PlainCard/CardCarousal';
import { gotoHomePage } from 'commonBrowserUtils/Helper';

import Styles from './MWKStrip.base.css';
import Button from 'commonComp/Button';

const triggerClickMWKEvent = clickEventData => {
  triggerEvent('EMPTY_CART_MWK_WIDGET_CLICK', {
    custom: {
      custom: { v1: get(clickEventData, 'tag') },
      widget: {
        name: 'mwk_widget',
        type: 'card'
      }
    }
  });
};

const triggerClickContinueShopping = () => {
  triggerEvent('EMPTY_CART_CONTINUE_SHOPPING_CLICK', {
    custom: {
      custom: { v1: 'empty' },
      widget: {
        name: 'mwk_widget',
        type: 'button'
      }
    }
  });
};

const MWKStrip = ({ shopMorePillsData }) => {
  let numberOfPills = 0; // Number of valid pills in MWK strip
  return (
    <div>
      <div className={`${Styles.continueContainer} ${Styles.shopMore}`}>
        <CardCarousel>
          <div className={Styles.contents}>
            {shopMorePillsData.map(pillsData => {
              const id = get(pillsData, 'id');
              const link = get(pillsData, 'link');
              const tag = get(pillsData, 'tag');
              const showPill = link && tag;
              if (showPill) numberOfPills++;

              let clickEventData = {
                tag
              };

              return showPill ? (
                <a
                  onClick={() => triggerClickMWKEvent(clickEventData)}
                  key={id}
                  href={link}
                >
                  <div className={Styles.continueShopPills}>{tag}</div>
                </a>
              ) : null;
            })}
          </div>
        </CardCarousel>
      </div>
      {numberOfPills > 0 ? (
        triggerEvent('EMPTY_CART_MWK_WIDGET_LOAD', {
          custom: {
            custom: { v1: 'empty' },
            widget: {
              name: 'mwk_widget',
              type: 'card'
            }
          }
        })
      ) : (
        <div className={Styles.continueButton}>
          <Button
            onClick={() => {
              gotoHomePage();
              triggerClickContinueShopping();
            }}
            className={Styles.mwkContinueShopping}
          >
            Continue Shopping
          </Button>
        </div>
      )}
    </div>
  );
};

MWKStrip.propTypes = {
  shopMorePillsData: PropTypes.array,
  gotoHomePage: PropTypes.func
};

export default MWKStrip;
