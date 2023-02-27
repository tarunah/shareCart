import React from 'react';

import ImageBanner from 'commonComp/ImageBanner';
import Loader from 'commonComp/Loader';
import Loadable from 'commonComp/Loadable';
import Button from 'vision/components/Button';

import { errorNotification } from 'commonBrowserUtils/Helper';
import { getSnackBarStyleOverrides } from 'commonBrowserUtils/CartHelper';
import Strings from 'commonBrowserUtils/Strings';

import Styles from './giftWrap.base.css';

import Rupee from 'iconComp/Rupee.jsx';

const GiftWrapModal = Loadable({
  loader: () =>
    import(
      /* webpackChunkName: "cartOptions",
    webpackPrefetch: true */
      '../GiftWrap/GiftWrapModal'
    ),
  loading: (props = {}) => <Loader show={true} backdrop={true} {...props} />,
  errorCallback: () => errorNotification({ message: Strings.BUNDLE_LOAD_ERROR })
});

class GiftWrap extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.toggleModal = this.toggleModal.bind(this);
    this.removeGiftwrap = this.removeGiftwrap.bind(this);
  }

  toggleModal() {
    const { selectedProductsCount } = this.props;
    if (selectedProductsCount === 0) {
      const styleOverrides = getSnackBarStyleOverrides('desktop');
      SHELL.alert('info', {
        styleOverrides,
        message: 'Select at least one item in bag to apply Gift Wrap.'
      });
    } else {
      this.setState(prevState => ({ showModal: !prevState.showModal }));
    }
  }

  removeGiftwrap() {
    this.props.handleCartAction('removeGiftwrap', []);
  }

  render() {
    let { active, data, handleCartAction } = this.props;
    return (
      <div className={Styles.container}>
        <div className={Styles.header}>GIFTING & PERSONALISATION</div>
        {active ? (
          <div className={`${Styles.content} ${Styles.applied}`}>
            <ImageBanner name="gift-big" className={Styles.gift} />
            <div className={Styles.title}>Yay! Gift Wrapping applied</div>
            <div>{Strings.GIFT_CARD_APPLIED_MESSAGE}</div>
            <Button
              variant="text"
              mt={4}
              mr={8}
              fontSize="body3"
              onClick={this.removeGiftwrap}
            >
              REMOVE
            </Button>
            <span className={Styles.separator} />
            <Button
              variant="text"
              mt={4}
              ml={8}
              fontSize="body3"
              onClick={this.toggleModal}
            >
              EDIT MESSAGE
            </Button>
          </div>
        ) : (
          <div className={Styles.content}>
            <ImageBanner name="gift-big" className={Styles.gift} />
            <div className={Styles.title}>Buying for a loved one?</div>
            <div>
              <span>Gift wrap and personalised message on card, Only for </span>
              <Rupee className={Styles.rupeeIcon} />
              <span>25</span>
            </div>
            <Button
              variant="text"
              mt={4}
              fontSize="body3"
              onClick={this.toggleModal}
            >
              ADD GIFT WRAP
            </Button>
          </div>
        )}
        {this.state.showModal && (
          <GiftWrapModal
            details={data}
            goBack={this.toggleModal}
            handleCartAction={handleCartAction}
          />
        )}
      </div>
    );
  }
}

export default GiftWrap;
