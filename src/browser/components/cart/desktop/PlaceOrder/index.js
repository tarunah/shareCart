import React from 'react';
import PropTypes from 'prop-types';

import PlaceOrderContainer from '../../common/PlaceOrderContainer';
import PriorityCheckoutModal from './PriorityCheckoutModal';
import PlaceOrderButton from './PlaceOrderButton';

import Styles from './placeOrder.base.css';
import Modal from 'commonComp/Modal';
import { NudgeBanner } from 'commonComp/NudgeBanner';
import Loader from 'commonComp/Loader';
 //../../config

import RequestManager from 'commonUtils/RequestManager';
import { getConfig } from 'commonUtils/requestConfig';
import { getXMetaApp } from 'commonBrowserUtils/Helper';

import { handleCartPlaceOrder } from 'commonBrowserUtils/CartHelper';
import { isFeatureEnabled } from 'commonUtils/FeaturesManager';
import CheckboxActive from 'iconComp/CheckboxActive.jsx';
import { CheckoutConsumerHOC } from '@context/CheckoutContext';
import { getUidx } from 'commonBrowserUtils/Helper';
import axios from 'axios'

const PLACE_ORDER_TEXT = 'Place Order';
const EXCHANGE_ORDER_TEXT = 'Exchange';

class PlaceOrder extends React.Component {  
  constructor(props) {
    super(props);
    this.onPlaceOrderClick = this.onPlaceOrderClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.sendCartInfo = this.sendCartInfo.bind(this);
    this.showImportCart = this.showImportCart.bind(this);
    this.hideImportCart = this.hideImportCart.bind(this);
    this.merge =  this.merge.bind(this);
    this.move = this.move.bind(this);
    this.cancelImport = this.cancelImport.bind(this);
    this.mergeAndMoveToWishList = this.mergeAndMoveToWishList.bind(this);
    this.state = {
      shareCartModal: false,
      showBanner: false,
      loading: false,
      error: false,
      showOptionModal: false,
      cartItems: 0,
      conflicitingProducts: [],
      products: []
    };
  }

  sendCartInfo() {
    const config = require('../../../../../../src/config');
    const tokenUrl = config('token').url;
    const agent = require('@myntra/m-agent')({
      timeout: 2000,
      services: {
        getToken: `${tokenUrl}token`,
        refreshToken: `${tokenUrl}refresh`
      }
    });

    this.setState({
      error: false
    })

    let email = document.getElementById('emailBox').value
    let pattern = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
    if (email.length == 0 || !(pattern.test(email))){
      this.setState({
        error: true
      })
      return
    }

    this.setState({
      loading: true,
      showBanner: false
    })
    let self = this
    
    const config = {
      headers:{
        'x-mynt-ctx':'storeid=2297;nidx=7ab9d632-760e-11ed-b7d4-06dee4b4ebd9;uidx='+getUidx(),
        //'pagesource': 'cart',
        //'x-myntra-abtest': 'cart.coupon.nudges=enabled',
        //'Content-Type': 'application/json',
        //'Access-Control-Allow-Origin': '*'
      }
    };

      axios.get('http://localhost:1050/exportCart')
      .then(res=> {
        console.log(res)
        self.setState({
          loading: false,
          showBanner: true
        })
        setTimeout(()=> {
          self.closeModal()
        }, 2000)
      })
      .catch(err=> console.log(err))


  // RequestManager.handle(
  //   {
  //     method: 'get',
  //     url: '/v1/cart/default',
  //     data: null,
  //     headers: {
  //       ...getConfig().headers,
  //       ...config.headers,
  //       'x-meta-app': `channel=web;${getXMetaApp()}`
  //     },
  //   },
  //   (r) => {console.log(r)},
  //   (e) => {console.log(e)}
  // );
    

  }

  onPlaceOrderClick() {
    handleCartPlaceOrder({ ...this.props, mode: 'desktop' });
  }

  closeModal() {
    this.setState({ shareCartModal: false });
  }

  showModal() {
    this.setState({shareCartModal: true, showBanner: false, error: false})
  }

  showImportCart() {
    const config = {
      headers:{
        'x-mynt-ctx':'storeid=2297;nidx=7ab9d632-760e-11ed-b7d4-06dee4b4ebd9;uidx='+getUidx()
      }
    };

    axios.get('http://dev.myntra.com:8500/checkoutproxy/getCart', config)
      .then(res=> {
        let data = JSON.parse(res.data.text)
        this.setState({
          showOptionModal: true,
          cartItems: data.count,
          products: data.products
        })
      })
      .catch(err=> console.log(err))
  }

  hideImportCart() {
    this.setState({
      showOptionModal: false
    })
  }



  callCartAPI() {
    const config = {
      headers:{
        'x-mynt-ctx':'storeid=2297;nidx=7ab9d632-760e-11ed-b7d4-06dee4b4ebd9;uidx='+getUidx()
      }
    };

    axios.get('http://localhost:1050/mergeCart')
      .then(res=> {
        window.location.href = 'http://dev.myntra.com:8500/checkout/cart'
      })
      .catch(err=> console.log(err))
  }

  merge() {
    this.callCartAPI()
  }

  unselectAPI() {
    let importedCart = []
    let products = this.state.products
    for(let i=0; i<products.length; i++) {
      let entry = {
        skuId: products[i].skuId,
        itemId: products[i].itemId,
        sellerPartnerId: products[i].selectedSeller.partnerId,
        quantity: products[i].quantity,
        selectedForCheckout: false
      }
      importedCart.push(entry)
    }
    let payload = {data:importedCart}

    axios.post('http://localhost:1050/noConflictWithoutMerge', payload)
      .then(res=> {
        window.location.href = 'http://dev.myntra.com:8500/checkout/cart'
      })
      .catch(err=> console.log(err))
  }

  mergeAndMoveToWishList() {
    let importedCart = []
    let products = this.state.products
    for(let i=0; i<products.length; i++) {
      let entry = {
        skuId: products[i].skuId,
        itemId: products[i].itemId,
        id: products[i].id
      }
      importedCart.push(entry)
    }
    let payload = {data:importedCart}

    axios.post('http://localhost:1050/mergeAndMovetoWishlist', payload)
      .then(res=> {
        window.location.href = 'http://dev.myntra.com:8500/checkout/cart'
      })
      .catch(err=> console.log(err))
  }

  move() {
    let payload = this.state.products.map((entry) => {return (entry.skuId)})
    axios.post('http://localhost:1050/checkConflict', payload)
      .then(res=> {
        let products = res.data.data
        if(products.length > 0){
           this.setState({
             conflicitingProducts: products
           })
        }else {
          this.unselectAPI()
        }
        this.hideImportCart()
      })
      .catch(err=> console.log(err))
  }

  cancelImport() {
    this.setState({
      conflicitingProducts: []
    })
  }

  render() {
    const {
      props: {
        coverFeeApplicable,
        coverFeeOpted,
        handleCartAction,
        isExchangeCart
      }
    } = this;

    const ctaText = isExchangeCart ? EXCHANGE_ORDER_TEXT : PLACE_ORDER_TEXT;
    return (
      <PlaceOrderContainer
        coverFeeOpted={coverFeeOpted}
        coverFeeApplicable={coverFeeApplicable}
        handleCartAction={handleCartAction}
        render={(
          { showPCModal, pcConfirmed },
          pcConfig,
          { togglePCModal, onPCConfirm, onPCAgreeCheck }
        ) => (
          <div>
            {coverFeeApplicable && pcConfirmed && (
              <div className={Styles.agreeStatement}>
                <CheckboxActive
                  className={Styles.icon}
                  onClick={onPCAgreeCheck}
                />
                <span className={Styles.agreeText}>{pcConfig.agreeText}</span>
              </div>
            )}
            {coverFeeApplicable ? (
              !pcConfirmed ? (
                
                <PlaceOrderButton
                  text={pcConfig.buttonText}
                  onClick={togglePCModal}
                />
              ) : (
                
                <PlaceOrderButton
                  text={ctaText}
                  onClick={this.onPlaceOrderClick}
                />
                
              )
            ) : this.props.flow == 'IMPORT_CART'?
              <div>
                <PlaceOrderButton
                  text={"IMPORT BAG"}
                  onClick={this.showImportCart}
                />
              </div>:(
              <div>
                <PlaceOrderButton
                  text={ctaText}
                  onClick={this.onPlaceOrderClick}
                />
                <div style={{marginTop: '2%'}}>
                  <PlaceOrderButton
                    text={"SHARE BAG"}
                    onClick={this.showModal}
                  />
                </div>
              </div>
            )}
            {showPCModal && (
              <PriorityCheckoutModal
                config={pcConfig}
                onConfirm={onPCConfirm}
                cancelCallback={togglePCModal}
              />
            )}

          {this.state.shareCartModal?
            <Modal
              cancelCallback={this.closeModal}
              className={Styles.modal}
              cancelIconConfig={{ show: true, className: Styles.modalCloseIcon }}
              //halfCard={true}
            >
              <div className={Styles.modalHeader}>
                Share Bag
              </div>

              <Loader
                show={this.state.loading}
                className={Styles.pincodeLoder}
                containerClassName={Styles.pincodeLoderContainer}
                  />  
              
              {this.state.showBanner?<NudgeBanner
                message={'Cart successfully shared'}
                className={Styles.nudgeContainer}
                />: null}
              
              <div className={Styles.modalBody}>
                <input type = "text" id = "emailBox" placeholder="Enter recipient's email id" className={Styles.emailBox} />
                {this.state.error? <div className={Styles.errorMessage}>Invalid Email ID</div>: null}
              </div>

              

              

              <div className={Styles.modalFooter}>
                <button onClick={this.sendCartInfo} disabled = {this.state.loading} className={Styles.sendButton}>
                  SEND
                </button>
              </div>

            </Modal>
              :null}


            {this.state.showOptionModal?<Modal
              cancelCallback={this.hideImportCart}
              className={Styles.modal}
              cancelIconConfig={{ show: true, className: Styles.modalCloseIcon }}
              //halfCard={true}
            >
              <div className={Styles.modalHeader}>
                Import Bag
              </div>

              
              
              <div className={Styles.modalBody}>
                <div className={Styles.modalText}>
                  You have {this.state.cartItems} item(s) in your bag. Please select an action
                </div>
              </div>
              <div className={Styles.modalFooter}>
                <div className={Styles.actionContainer}>
                  <div className={Styles.actionButton1}>
                    <button onClick = {this.merge} className={Styles.actionButtonStyle1}>Import with merging</button>
                  </div>
                  <div className={Styles.actionButton2}>
                    <button onClick={this.move} className={Styles.actionButtonStyle2}>Import without merging</button>
                  </div>
                
                
                </div>
              </div>
            </Modal>: null}

            {this.state.conflicitingProducts.length > 0?<Modal
              cancelCallback={this.hideImportCart}
              className={Styles.modal}
              cancelIconConfig={{ show: false, className: Styles.modalCloseIcon }}
              //halfCard={true}
            >
              
    
              <div className={Styles.modalBody}>
                <div className={Styles.productText}>
                  Similar items are present in your bag
                </div>
                <ul>
                {this.state.conflicitingProducts.map((product, id) => {return(
                  <li className={Styles.modalText}>
                    {product}
                  </li>
                )})}
                </ul>
                <div className={Styles.modalText} style={{fontWeight: '300'}}>
                  Importing will move your items to wishlist
                </div>

              </div>
              <div className={Styles.modalFooter}>
                <div className={Styles.actionContainer}>
                  <div className={Styles.actionButton1}>
                    <button onClick = {this.mergeAndMoveToWishList} className={Styles.actionButtonStyle1}>Proceed to import</button>
                  </div>
                  <div className={Styles.actionButton2}>
                    <button onClick={this.cancelImport} className={Styles.actionButtonStyle2}>cancel</button>
                  </div>
                
                
                </div>
              </div>
            </Modal>: null}

          


          </div>
        )}
      />
    );
  }
}

PlaceOrder.propTypes = {
  handleCartAction: PropTypes.func,
  displayCartModal: PropTypes.func,
  products: PropTypes.array,
  disabled: PropTypes.bool,
  virtualBundleConflict: PropTypes.bool,
  conflictState: PropTypes.string,
  total: PropTypes.number,
  coverFeeOpted: PropTypes.bool,
  coverFeeApplicable: PropTypes.bool,
  isExchangeCart: PropTypes.bool
};

export default CheckoutConsumerHOC(PlaceOrder);
