module.exports = {
  blank: 'blank-blank',
  genderMap: {
    Men: 'male',
    Women: 'female',
    Unisex: 'Unisex'
  },
  myself: { id: 'myself', display: 'Myself' },
  others: { id: 'others', display: 'Others' },
  buttons: {
    cancel: 'CANCEL',
    save: 'SAVE',
    saving: 'SAVING...'
  },
  errorMessage: 'Something went wrong! Please reload.',
  addressTagError: 'Not able to update address',
  payAtConvenienceURL:
    'https://constant.myntassets.com/checkout/assets/img/pay_at_convenience.png',
  myntraMailUrl:
    'https://constant.myntassets.com/checkout/assets/img/myntraMail.webp',
  scratchCardRetentionConfig: {
    CARD_STATES: {
      SCRATCHED: 'SCRATCHED',
      LOCKED: 'LOCKED',
      UNSCRATCHED_EXPIRED: 'UNSCRATCHED_EXPIRED',
      SCRATCHED_EXPIRED: 'SCRATCHED_EXPIRED',
      UNSCRATCHED: 'UNSCRATCHED',
      USED: 'USED'
    },
    FEATURE_FLAG: {
      HRD: 'HRD',
      PS0_PS4: 'PS0_PS4'
    },
    DISCOUNT_TYPES: {
      PERCENTAGE: 'PERCENTAGE',
      ABSOLUTE: 'ABSOLUTE'
    }
  }
};
