class CashbackHandler {
  constructor(cartData, icbData, deffData) {
    this.cartData = cartData || {};
    this.icbData = icbData;
    this.deffData = deffData;
  }

  getICBMessageString() {
    const {
      icbData,
      icbData: { amount, percentage },
      cartData: { products: cartProducts = [] }
    } = this;

    const discountInRupees = amount / 100;
    const discountValueTrimmed = Math.floor(+discountInRupees * 100) / 100;

    let prefix = percentage
      ? `${percentage}% instant discount ( ₹ ${discountValueTrimmed})`
      : `₹ ${discount} instant discount.`;

    const cartProductsCount = cartProducts.length;
    const icbEligibleProductsCount = (
      icbData.skuLevelCashbackDetails || []
    ).filter(info => !isNaN(+info.skuId)).length;

    let suffix = '';
    if (cartProductsCount && icbEligibleProductsCount) {
      if (cartProductsCount === icbEligibleProductsCount) {
        suffix =
          icbEligibleProductsCount === 1
            ? ' available on item'
            : ' available on all items';
      } else {
        // Only case is being icbEligibleProductsCount < cartProductsCount
        suffix = ` available on ${icbEligibleProductsCount} / ${cartProductsCount} item${
          icbEligibleProductsCount > 1 ? 's' : ''
        }`;
      }
    }
    return prefix + suffix;
  }

  getInlineOfferNotSelectedICBString() {
    const {
      icbData,
      icbData: { amount, percentage },
      cartData: { products: cartProducts = [] }
    } = this;

    const discountInRupees = amount / 100;
    const discountValueTrimmed = Math.floor(+discountInRupees * 100) / 100;

    let prefix = percentage
      ? `Get ${percentage}% instant discount ( ₹ ${discountValueTrimmed})`
      : `Get ₹ ${discount} instant discount.`;

    const cartProductsCount = cartProducts.length;
    const icbEligibleProductsCount = (
      icbData.skuLevelCashbackDetails || []
    ).filter(info => !isNaN(+info.skuId)).length;

    let suffix = '';
    if (cartProductsCount && icbEligibleProductsCount) {
      if (cartProductsCount === icbEligibleProductsCount) {
        suffix =
          icbEligibleProductsCount === 1
            ? ' available on item'
            : ' available on items';
      } else {
        // Only case is being icbEligibleProductsCount < cartProductsCount
        suffix = ` available on ${icbEligibleProductsCount} / ${cartProductsCount} item${
          icbEligibleProductsCount > 1 ? 's' : ''
        }`;
      }
    }
    return prefix + suffix;
  }

  getDeffMessageString() {
    const {
      deffData: { amount, percentage }
    } = this;
    const discountInRupees = amount / 100;
    const discountValueTrimmed = Math.floor(+discountInRupees * 100) / 100;

    const message = percentage
      ? `${percentage}% Cashback upto ₹ ${discountValueTrimmed}. T&C Apply`
      : `Cashback upto ₹ ${discountValueTrimmed}. T&C Apply`;

    return message;
  }
}

export default CashbackHandler;
