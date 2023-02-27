import get from 'lodash/get';

const DiscountUtil = {
  getPrice(price) {
    const updatedPrice = { ...price };
    const otherDiscounts = (get(updatedPrice, 'discounts.data') || []).filter(
      discount => discount.name !== 'discount'
    );
    updatedPrice.discounts = {
      data: [
        this.getTradeDiscount(get(updatedPrice, 'discounts.data') || []),
        ...otherDiscounts
      ]
    };

    return updatedPrice;
  },

  getTradeDiscount(discounts) {
    const discountTypes = ['discount', 'personalised'];
    const discountsObj = discountTypes.reduce((acc, type) => {
      const discount = discounts.find(data => data.name === type);
      discount && (acc[type] = discount);
      return acc;
    }, {});

    const updatedDiscountTypes = Object.keys(discountsObj);
    const initialDiscount = discountsObj[updatedDiscountTypes[0]] || {};

    /*
     * initialising with 1st entry in updatedDiscountTypes
     */
    const updatedDiscount = { ...initialDiscount };

    if (initialDiscount.meta) {
      updatedDiscount.meta = { ...initialDiscount.meta };
    }

    updatedDiscountTypes
      .slice(1) // 1st entry is already in updatedDiscount
      .forEach(type => {
        updatedDiscount.value += get(discountsObj[type], 'value', 0);
        updateMetaValues(updatedDiscount, {
          discountsObj,
          type,
          metaKey: 'meta'
        });
      });

    return updatedDiscount;
  }
};

function updateMetaValues(updatedDiscount, { discountsObj, type, metaKey }) {
  const discountUnit = get(updatedDiscount, `${metaKey}.unit`);
  if (
    discountUnit &&
    discountUnit === get(discountsObj[type], `${metaKey}.unit`)
  ) {
    updatedDiscount[metaKey].value += get(
      discountsObj[type],
      `${metaKey}.value`,
      0
    );
  } else {
    updatedDiscount[metaKey] = null;
  }
}

export default DiscountUtil;
