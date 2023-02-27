import React from 'react';
import PropTypes from 'prop-types';

import {
  isLocalStorageEnabled,
  getUidx,
  isMobile
} from 'commonBrowserUtils/Helper';
import { localStorageKeys } from 'commonUtils/constants';
import { eventsObj } from './savingsFomoEventsHelper';
import Strings from 'commonBrowserUtils/Strings';

import Modal from 'commonComp/Modal';
import Button from 'commonComp/Button';
import CheckboxInactive from 'iconComp/CheckboxInactive.jsx';
import CheckboxActive from 'iconComp/CheckboxActive.jsx';
import { SavingsFomoHeader } from './SavingsFomoComponents';

import Styles from './savingsFomo.base.css';
const {
  DONT_SHOW_MESSAGE,
  STAY_ON_PAGE,
  STAY_ON_PAGE_SHORT,
  GO_BACK
} = Strings;

const checkSavingsFomoConditions = totalSavings => {
  if (Math.floor(totalSavings) > 0) {
    return true;
  }
  return false;
};

const boundFuncs = [
  'toggleModal',
  'toggleNudge',
  'closeModalUsingIcon',
  'stayButtonClick',
  'goBackButtonClick',
  'checkFomoModal'
];

class SavingsFomo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showNudge: this.getDefaultFomoLsValue()
    };
    this.userUidx = getUidx();
    this.prevHash = window.location.hash;
    boundFuncs.forEach(method => (this[method] = this[method].bind(this)));
  }

  componentDidMount() {
    const {
      currentPage,
      price: { totalSavings, subTotal }
    } = this.props;
    const { userUidx } = this;
    if (this.state.showNudge && checkSavingsFomoConditions(totalSavings)) {
      this.prevHash = window.location.hash;
      this.addToURLHash();
      window.addEventListener('popstate', this.checkFomoModal);
    } else {
      if (totalSavings) {
        eventsObj.defaultSavingsFomo(
          currentPage,
          userUidx,
          totalSavings,
          subTotal
        );
      }
    }
  }

  componentDidUpdate() {
    this.checkFomoModal();
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.checkFomoModal);
  }

  checkFomoModal() {
    const { currentPage } = this.props;
    let isUpi =
      isLocalStorageEnabled() &&
      currentPage === 'payment' &&
      localStorage.getItem(localStorageKeys.SAVINGS_FOMO_VALUE) === 'upi';
    if (this.prevHash === '#disableBack' && !window.location.hash) {
      if (window.location.hash === '#disableBack') {
        this.removeURLHash();
      }
      this.setState(
        {
          showModal: !isUpi
        },
        this.triggerLoadEvent
      );
    }
    isUpi &&
      localStorage.setItem(
        localStorageKeys.SAVINGS_FOMO_VALUE,
        this.state.showNudge
      );
    this.prevHash = window.location.hash;
  }

  triggerLoadEvent() {
    const { userUidx } = this;
    const {
      currentPage,
      price: { totalSavings, subTotal }
    } = this.props;
    eventsObj.triggerSavingsFomoLoad(
      currentPage,
      userUidx,
      totalSavings,
      subTotal
    );
  }

  addToURLHash() {
    window.ckrrhistory &&
      !window.location.hash &&
      window.ckrrhistory.push('#disableBack');
  }

  removeURLHash() {
    window.ckrrhistory && window.ckrrhistory.goBack();
  }

  getDefaultFomoLsValue() {
    if (isLocalStorageEnabled()) {
      try {
        const lsVal = JSON.parse(
          localStorage.getItem(localStorageKeys.SAVINGS_FOMO_VALUE)
        );
        return lsVal === null ? true : lsVal;
      } catch (e) {
        return true;
      }
    }
    return true;
  }

  toggleSavingsFomoLsVal() {
    const { showNudge } = this.state;
    eventsObj.triggerNudgeClick(
      this.userUidx,
      showNudge,
      this.props.currentPage
    );
    if (isLocalStorageEnabled()) {
      localStorage.setItem(localStorageKeys.SAVINGS_FOMO_VALUE, showNudge);
    }
  }

  toggleNudge() {
    this.setState(
      prevState => ({ showNudge: !prevState.showNudge }),
      this.toggleSavingsFomoLsVal
    );
  }

  toggleModal() {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  }

  goBackButtonClick() {
    const { currentPage } = this.props;
    const { userUidx } = this;
    eventsObj.goBackSavingsFomoClick(currentPage, userUidx);
    window.ckrrhistory.go(-2);
  }

  stayButtonClick() {
    const { currentPage } = this.props;
    const { userUidx } = this;
    eventsObj.staySavingsFomoClick(currentPage, userUidx);
    this.toggleModal();
  }

  closeModalUsingIcon() {
    eventsObj.closingModalUsingIcon(this.props.currentPage);
    this.toggleModal();
  }

  getHalfcardFooter() {
    const { showNudge } = this.state;

    return (
      <React.Fragment>
        <div className={Styles.checkboxContainer}>
          {showNudge ? (
            <CheckboxInactive
              className={Styles.fillBlueberry20}
              onClick={this.toggleNudge}
            />
          ) : (
            <CheckboxActive
              className={Styles.fillWatermelon}
              onClick={this.toggleNudge}
            />
          )}
          <span className={Styles.checkboxMessage}>{DONT_SHOW_MESSAGE}</span>
        </div>
        <div className={Styles.buttonContainer}>
          <Button
            className={`${Styles.button} ${Styles.goBackButton}`}
            onClick={this.goBackButtonClick}
          >
            {GO_BACK}
          </Button>
          <Button
            className={`${Styles.button} ${Styles.stayOnPageButton}`}
            onClick={this.stayButtonClick}
          >
            {STAY_ON_PAGE}
          </Button>
          <Button
            className={`${Styles.button} ${Styles.stayOnPageShortButton}`}
            onClick={this.stayButtonClick}
          >
            {STAY_ON_PAGE_SHORT}
          </Button>
        </div>
      </React.Fragment>
    );
  }

  render() {
    const { showModal } = this.state;
    const {
      price: { totalSavings }
    } = this.props;
    const _isMobile = isMobile();
    if (showModal) {
      return (
        <Modal
          className={`${_isMobile ? Styles.modal : Styles.desktopModal}`}
          cancelCallback={this.closeModalUsingIcon}
          halfCard={_isMobile}
          cancelIconConfig={{ show: true }}
        >
          <div className={Styles.container}>
            <SavingsFomoHeader totalSavings={totalSavings} />
            {this.getHalfcardFooter()}
          </div>
        </Modal>
      );
    }
    return null;
  }
}

SavingsFomo.propTypes = {
  price: PropTypes.object,
  products: PropTypes.array,
  currentPage: PropTypes.string
};

SavingsFomo.defaultProps = {
  products: []
};

export default SavingsFomo;
