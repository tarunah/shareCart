import React from 'react';
import get from 'lodash/get';

import Styles from './finejwellery.base.css';

import Button from 'commonComp/Button';
import Modal from 'commonComp/Modal';
import { getUidx } from 'commonBrowserUtils/Helper';
import CartConstants from 'commonBrowserUtils/CartConstants';

import ChevronRight from 'iconComp/ChevronRight.jsx';
import ReturnIcon from 'iconComp/ReturnIcon.jsx';
import Info from 'iconComp/Info.jsx';

class FineJwellery extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showHc: false
    };
    this.subCategoryTypeName = props.subCategoryTypeName;
    this.returnPeriod = props.returnPeriod;
    this.userUidx = getUidx();
    this.mode = props.mode;
    this.title = get(props, 'fineJwellerySteps.title', '');
    this.data = get(props, 'fineJwellerySteps.points', []);
  }

  triggerClickEvent() {
    triggerEvent('FINE_JWELLERY_CLICK', {
      custom: {
        custom: {
          v1: this.userUidx,
          v2: this.props.styleId,
          v3: this.props.skuID
        },
        widget: {
          name: `fine_jwellery_click`,
          type: 'sub-card'
        },
        event_type: 'widgetItemClick',
        event_category: `Cart page - fine jwellery info click`
      }
    });
  }

  toggleHc() {
    this.setState(prevState => {
      if (!prevState.showHc) {
        this.triggerClickEvent();
      }
      return { showHc: !prevState.showHc };
    });
  }

  redirectToVideo(msg) {
    if (window.location.hash.includes('#')) {
      window.ckrrhistory && window.ckrrhistory.goBack();
    }
    window.location.href = msg.video_link;
  }

  getStep(msg, index) {
    return (
      <div className={Styles.step}>
        <div className={Styles.right}>
          <div className={Styles.srIcon}>
            <div className={Styles.srno}>
              <span className={Styles.sr}>{index + 1}</span>
            </div>
            <div className={Styles.stepImage}>
              <img src={msg.imageUrl} alt={msg.title} />
            </div>
          </div>
          <div
            className={
              index == this.data.length - 1
                ? Styles.finalStepDetail
                : `${Styles.stepDetails} ${Styles.dottedline}`
            }
          >
            <div className={Styles.stepTitle}>{msg.title}</div>
            <div className={Styles.stepDescription}>{msg.description}</div>
            {msg.video_title && (
              <div className={Styles.video}>
                <span
                  className={Styles.videoLink}
                  onClick={() => this.redirectToVideo(msg)}
                >
                  {msg.video_title}
                  <ChevronRight className={Styles.wishlistChevron} />
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  render() {
    if (
      this.subCategoryTypeName &&
      this.subCategoryTypeName.toLowerCase() ===
        CartConstants.FINE_JWELLERY_SUBCATERGORY_TYPENAME
    ) {
      return (
        <div>
          <div className={Styles.jwelleryItem}>
            <div className={Styles.returnIcon}>
              <ReturnIcon />
            </div>
            <div className={Styles.returnText}>
              <span className={Styles.returnDays}>
                {this.returnPeriod} {this.returnPeriod > 1 ? 'days' : 'day'}
              </span>{' '}
              {'return available'}
            </div>
            <div
              className={Styles.returnInfoIcon}
              onClick={() => this.toggleHc()}
            >
              <Info fill="#FF3F6C" />
            </div>
          </div>
          {this.state.showHc && (
            <Modal
              className={
                this.mode === 'desktop'
                  ? Styles.desktopModalContainer
                  : Styles.modal
              }
              cancelCallback={() => this.toggleHc()}
              halfCard={true}
              cancelIconConfig={{ show: true, className: Styles.cancel }}
            >
              <div className={Styles.hcContainer}>
                <div className={Styles.hcTitle}>
                  <span className={Styles.heading}>{this.title}</span>
                </div>
                <div className={Styles.hcBody}>
                  {this.data.map((msg, index) => (
                    <div className={Styles.stepsContainer}>
                      {this.getStep(msg, index)}
                    </div>
                  ))}
                  <div className={Styles.footer}>
                    <Button onClick={() => this.toggleHc()}>{'Okay'}</Button>
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </div>
      );
    }
    return null;
  }
}

export default FineJwellery;
