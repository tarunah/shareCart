import React from 'react';
import Image from 'commonComp/Image';

import Style from './sellers.base.css';
import ListSeller from '../../common/ListSellers';
import { setDocTitleInMobile } from 'commonBrowserUtils/Helper';
import {
  changeSizeAndSellerUtil,
  getItemName
} from 'commonBrowserUtils/CartHelper';

const SelectedProductDisplay = props => {
  const WIDTH = 30,
    HEIGHT = 40;
  const { images, name, brand, sizeLabel } = props;
  const itemName = getItemName(brand, name);

  return (
    <div className={Style.productRow}>
      <div className={Style.productImage}>
        <Image
          src={images[0].secureSrc}
          width={WIDTH}
          height={HEIGHT}
          visible="true"
        />
      </div>
      <div className={Style.productDetails}>
        <div className={Style.brandName}> {brand} </div>
        <div className={Style.productName}> {itemName} </div>
        <div className={Style.size}>Size: {sizeLabel} </div>
      </div>
    </div>
  );
};

class Sellers extends React.PureComponent {
  constructor(props) {
    super(props);
    ['onSellerSelect'].forEach(
      method => (this[method] = this[method].bind(this))
    );
  }

  componentDidMount() {
    setDocTitleInMobile('SELECT SELLER');
  }

  componentWillUnmount() {
    const { goBack } = this.props;
    goBack && goBack();
  }

  onSellerSelect(e, value) {
    const {
      id,
      skuId: oldSkuId,
      quantity,
      itemId,
      selectedSeller
    } = this.selectedProduct;
    const { goBack } = this.props;
    const oldPartnerId = (selectedSeller || {}).partnerId;
    const sellerPartnerId = +e.currentTarget.id;
    const { handleCartAction } = this.props;
    const sizeObject = {
      currentTarget: { skuId: this.skuId, sellerPartnerId }
    };
    changeSizeAndSellerUtil({
      e: sizeObject,
      id,
      oldSkuId,
      quantity,
      itemId,
      callBack: goBack,
      handleCartAction,
      oldPartnerId
    });
  }

  render() {
    const {
      location: {
        state: { productId, skuId }
      },
      data: { products }
    } = this.props;
    this.selectedProduct = products.find(({ id }) => id === productId) || {};
    this.skuId = skuId;
    const { sizes, selectedSeller } = this.selectedProduct;
    const selectBuyButtonWinner = this.selectedProduct.skuId !== skuId;
    const selectedSize =
      sizes.find(({ skuId: productSkuId }) => productSkuId === skuId) || {};
    const availableSeller = selectedSize.sellers.filter(
      ({ seller }) => seller.inventory > 0
    );
    const userSelectedSeller =
      selectBuyButtonWinner || !selectedSeller
        ? { seller: {} }
        : availableSeller.find(
            ({ seller }) =>
              seller.partnerId === (selectedSeller || {}).partnerId
          );
    return (
      <div>
        <SelectedProductDisplay
          {...this.selectedProduct}
          sizeLabel={selectedSize.label}
        />
        <ListSeller
          deviceMode="mobile"
          availableSeller={availableSeller}
          skuId={skuId}
          onChange={this.onSellerSelect}
          selectedSellerId={userSelectedSeller.seller.partnerId}
          className={Style.listSellers}
          wrapper={'div'}
        />
      </div>
    );
  }
}

export default Sellers;
