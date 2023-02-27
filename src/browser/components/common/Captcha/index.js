import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

// Style Imports.
import Style from './captcha.base.css';

import Input from 'commonComp/InputV2';

import PaymentManager from 'commonBrowserUtils/PaymentsManager';
import { scrollIntoView, getUidx } from 'commonBrowserUtils/Helper';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import PaymentConstants from 'commonBrowserUtils/PaymentConstants';

import Reload from 'iconComp/Reload.jsx';

const boundFuncs = [
  'onCaptchaInput',
  'onChangeImage',
  'verifyCaptchaError',
  'setRef',
  'generateCaptcha'
];

const WRONG_CODE_ERROR = 'Incorrect code entered. Please try again.';
const NO_CODE_ERROR = 'Please enter the code to place order.';
const INVALID_CAPTCHA_CODE = '1004';

class Captcha extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
      changeOption: { show: false, text: 'CHANGE IMAGE' },
      retryCount: 0,
      loading: true,
      captchaText: '',
      captchaLoaded: false,
      error: { text: '' },
      captchaImageSrc: '',
      captchaId: '',
      reloadCaptcha: false
    };
    this.firstUpdate = false;
    boundFuncs.forEach(method => (this[method] = this[method].bind(this)));
  }

  componentDidMount() {
    this.firstUpdate = true;
    this.generateCaptcha();
  }

  componentDidUpdate(prevProps) {
    if (
      get(this.props, 'errorAttribute.paymentErrorCode', '') !== '' &&
      !this.state.reloadCaptcha &&
      !this.firstUpdate
    ) {
      const invalidCaptchaText =
        this.props.errorAttribute.paymentErrorCode === INVALID_CAPTCHA_CODE
          ? WRONG_CODE_ERROR
          : '';
      this.setState({
        reloadCaptcha: true
      });
      this.verifyCaptchaError(invalidCaptchaText);
    }
  }

  generateCaptcha() {
    PaymentManager.generateCaptcha(
      response => {
        triggerEvent('CAPTCHA_LOAD');
        this.setState({
          loading: false,
          changeOption: { show: true, text: <Reload /> },
          captchaLoaded: true,
          captchaImageSrc: response.image,
          captchaId: response.id
        });
      },
      () => {
        this.setState(
          prevState => ({
            show: prevState.retryCount < 2,
            loading: false,
            changeOption: { show: true, text: <Reload /> },
            retryCount: ++prevState.retryCount
          }),
          () => {
            this.props.inputCallback &&
              this.props.inputCallback({ proceed: !this.state.show });
          }
        );
      }
    );
  }

  onCaptchaInput(event) {
    triggerEvent('CAPTCHA_ENTRY');
    const text = event.target.value.trim();
    this.setState({ captchaText: text, error: { text: '' } });
  }

  onChangeImage() {
    triggerEvent('CAPTCHA_CHANGE');
    this.setState(
      {
        loading: true,
        changeOption: { ...this.state.changeOption, show: false },
        error: { text: '' },
        captchaText: '',
        captchaLoaded: false
      },
      () => {
        this.generateCaptcha();
      }
    );
  }

  verifyCaptchaError(errorMessage) {
    this.props.setLoader(false);
    triggerEvent('CAPTCHA_FAILURE', {
      gaLabel: this.state.captchaText,
      custom: {
        custom: {
          v1: getUidx()
        },
        widget: {
          name: 'cod_capcha',
          type: 'card'
        },
        widget_items: {
          name: 'capcha_failure_message'
        }
      }
    });
    triggerEvent('COD_FAILURE', {
      gaLabel: 'captcha-wrong'
    });
    this.setState(
      {
        error: {
          text: errorMessage
        },
        loading: true,
        changeOption: { ...this.state.changeOption, show: false },
        captchaText: '',
        captchaLoaded: false
      },
      () => {
        this.generateCaptcha();
        scrollIntoView(this.containerRef, {
          behavior: 'smooth',
          block: 'center'
        });
      }
    );
  }

  submitWithCaptcha(done) {
    const { setCaptchaDetails } = this.props;
    if (this.state.captchaText) {
      if (this.state.captchaLoaded) {
        this.props.setLoader(true);
        this.setState(
          {
            reloadCaptcha: false,
            error: {
              text: ''
            }
          },
          () => {
            this.firstUpdate = false;
          }
        );
        setCaptchaDetails(
          {
            id: this.state.captchaId,
            code: this.state.captchaText
          },
          done
        );
      } else if (!this.state.loading) {
        triggerEvent('COD_SUCCESS');
        this.props.setLoader(false);
        done();
      }
    } else {
      this.verifyCaptchaError(NO_CODE_ERROR);
    }
  }

  setRef(node) {
    this.containerRef = node;
  }

  render() {
    let captchaCharacterLength = parseInt(
      isFeatureEnabled('CAPTCHA_CHARACTER_LENGTH')
    );

    if (isNaN(captchaCharacterLength)) {
      captchaCharacterLength = PaymentConstants.CAPTCHA_CHARACTER_LENGTH;
    }
    captchaCharacterLength += 1;

    return (
      <div
        className={`${Style.container} ${this.state.show ? '' : Style.hide}`}
        ref={this.setRef}
      >
        <div>
          <div className={Style.captchaImageContainer}>
            <div className={`${this.state.loading ? Style.spinner : ''}`} />
            <img
              src={this.state.captchaImageSrc}
              className={Style.captchaImage}
            />
          </div>
          {this.state.changeOption.show && (
            <div className={Style.changeImage} onClick={this.onChangeImage}>
              {this.state.changeOption.text}
            </div>
          )}
        </div>
        <div>
          <Input
            label="Enter code shown in above image*"
            id="name"
            type="tel"
            value={this.state.captchaText}
            maxLength={captchaCharacterLength}
            onChange={this.onCaptchaInput}
            className={Style.inputRow}
            styleOverrides={{ errorClass: Style.error }}
            errorMessage={this.state.error.text}
          />
        </div>
      </div>
    );
  }
}

Captcha.propTypes = {
  setLoader: PropTypes.func
};

export default Captcha;
