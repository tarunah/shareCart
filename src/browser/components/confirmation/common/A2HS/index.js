import React from 'react';

import ImageBanner from 'commonComp/ImageBanner';
import Button from 'commonComp/Button';

import {
  isLocalStorageEnabled,
  getChromeVersion,
  isApp,
  isChromeBrowser
} from 'commonBrowserUtils/Helper';
import { localStorageKeys } from 'commonUtils/constants';
import { getKVPairValue } from 'commonUtils/KVPairManager';

import Styles from './a2hs.base.css';

const Arrow = () => (
  <img
    className={Styles.arrow}
    src="https://constant.myntassets.com/checkout/assets/img/edc1d35b-43a5-4a5b-ad1d-8b477746caaa1549896768222-arrow-up-2x.png"
    width={92}
    height={242}
  />
);

const AboutPWAContent = () => (
  <div>
    <div className={Styles.aboutPWAlist}>
      <img
        src="https://constant.myntassets.com/checkout/assets/img/9aa9e922-68c5-4da7-aa34-4985dbf8a7c21550128447828-zap-2x.png"
        width={18}
        height={18}
      />
      It's Super Fast
    </div>
    <div className={Styles.aboutPWAlist}>
      <img
        src="https://constant.myntassets.com/checkout/assets/img/e753c3fb-f38e-4a8e-a8cd-e2f5c6232d891550134928036-group-18-2x.png"
        width={14}
        height={19}
      />
      Easy To Access
    </div>
    <div className={Styles.aboutPWAlist}>
      <img
        src="https://constant.myntassets.com/checkout/assets/img/7e394a90-3fa3-4ad8-b35a-4c202673ddce1550135018275-hard-drive-2x.png"
        width={17}
        height={13}
      />
      Saves Space
    </div>
  </div>
);

const InstallStep = () => (
  <div>
    1. Tap{' '}
    <img
      src="https://constant.myntassets.com/checkout/assets/img/616c6ca9-58be-4d37-a471-4b0b9ba5295f1552015636862-group-9-2x.png"
      width={2}
      height={9}
    />{' '}
    icon on the top right of the screen.
  </div>
);

const infoScreenContent = {
  instructionScreen: {
    aboutPWA: {
      heading: 'Enjoy app-like experience',
      content: <AboutPWAContent />
    },
    installSteps: {
      heading: 'How to add Myntra to homescreen ?',
      step1: <InstallStep />,
      step2: '2. Select “Add to Home screen” from the menu.'
    }
  },
  installedScreen: {
    aboutPWA: {
      heading: 'Use Myntra from Homescreen',
      content: <AboutPWAContent />
    },
    installSteps: {
      heading: 'How to access Myntra from homescreen ?',
      step1: '1. Find the Myntra Web app on your homescreen.',
      step2: '2. Tap on Myntra icon.'
    }
  }
};

const InfoScreen = ({ close }) => {
  const installed =
    isLocalStorageEnabled() &&
    localStorage.getItem(localStorageKeys.PWA_INSTALLED) === 'true';

  let screenText = installed
    ? infoScreenContent.installedScreen
    : infoScreenContent.instructionScreen;

  return (
    <div className={Styles.screenContainer} onClick={close}>
      {!installed && <Arrow />}
      <div className={Styles.aboutPWA}>
        <div className={Styles.screenHeading}>
          {screenText.aboutPWA.heading}
        </div>
        {screenText.aboutPWA.content}
      </div>
      <div className={Styles.installSteps}>
        <div className={Styles.screenHeading}>
          {screenText.installSteps.heading}
        </div>
        <div className={Styles.installStep}>
          {screenText.installSteps.step1}
        </div>
        <div className={Styles.installStep}>
          {screenText.installSteps.step2}
        </div>
      </div>
      <Button className={Styles.screenButton}>OKAY, GOT IT</Button>
    </div>
  );
};

class A2HS extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showInfoScreen: false
    };

    ['onButtonClick', 'toggleInfoScreen'].forEach(
      method => (this[method] = this[method].bind(this))
    );
  }

  componentDidMount() {
    window.addEventListener('appinstalled', () => {
      isLocalStorageEnabled() &&
        localStorage.setItem(localStorageKeys.PWA_INSTALLED, true);
      triggerEvent('A2HS_INSTALLED', {
        gaLabel: 'accept_from_browser_menu | thankyou_page'
      });
    });
  }

  prompt() {
    const installed =
      isLocalStorageEnabled() &&
      localStorage.getItem(localStorageKeys.PWA_INSTALLED) === 'true';

    if (window.a2hs && !installed) {
      window.a2hs.prompt();
      this.prompted = true;
    } else {
      this.openInfoScreen();
    }
  }

  onButtonClick() {
    triggerEvent('A2HS_WIDGET_CLICK');
    if (getChromeVersion() <= 67) {
      !this.prompted ? this.prompt() : this.openInfoScreen();
    } else {
      this.prompt();
    }
  }

  openInfoScreen() {
    const installed =
      isLocalStorageEnabled() &&
      localStorage.getItem(localStorageKeys.PWA_INSTALLED) === 'true';

    installed
      ? triggerEvent('A2HS_REMINDER_VIEW')
      : triggerEvent('A2HS_INSTALL_VIEW');

    this.toggleInfoScreen();
  }

  toggleInfoScreen() {
    this.setState(prevState => ({ showInfoScreen: !prevState.showInfoScreen }));
  }

  render() {
    const a2hsConfig = getKVPairValue('A2HS');
    const hide =
      !a2hsConfig.enable ||
      isApp() ||
      !isChromeBrowser() ||
      (isLocalStorageEnabled() &&
        localStorage.getItem(localStorageKeys.HIDE_A2HS) === 'true');

    return !hide ? (
      <div className={`${this.props.className || ''} ${this.props.styleClass}`}>
        <div className={Styles.container}>
          <ImageBanner name="mobile-exp" className={Styles.image} />
          <div className={Styles.content}>
            <div className={Styles.header}>{a2hsConfig.content.heading}</div>
            <div className={Styles.desc}>{a2hsConfig.content.desc}</div>
            <Button className={Styles.button} onClick={this.onButtonClick}>
              {a2hsConfig.content.button}
            </Button>
          </div>
        </div>
        {this.state.showInfoScreen && (
          <InfoScreen close={this.toggleInfoScreen} />
        )}
      </div>
    ) : null;
  }
}

export default A2HS;
