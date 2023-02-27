/*
Usage Example:
import { getKVPairValue } from 'commonUtils/KVPairManager';
const shippingChargesLimit = getKVPairValue('CART_SHIPPING_CHARGES_LIMIT');
*/
const isBrowser = typeof window !== 'undefined';
const get = require('lodash/get');

const sanitizeValue = (value, defaultValue, expectedType) => {
  if (
    typeof expectedType === 'undefined' ||
    typeof value === typeof expectedType
  ) {
    return value;
  } else if (typeof defaultValue === typeof expectedType) {
    return defaultValue;
  } else {
    try {
      const parsedValue = JSON.parse(defaultValue);
      return typeof parsedValue === typeof expectedType
        ? parsedValue
        : undefined;
    } catch (err) {
      // console.error('error occurred while parsing in the KVPairs', err, value);
    }
  }
  return undefined;
};

const getKVPairValue = (key, req) => {
  let value = null;
  let kvpairList = isBrowser
    ? get(window, '_checkout_.__myx_kvpairs__', null)
    : get(req, 'myx.kvpairs', null);

  const config = KVPairsMap[key];
  if (config) {
    value = get(kvpairList, `${config.key}`, config.defaultValue);
  }

  if (value && typeof value === 'string') {
    try {
      value = JSON.parse(value);
    } catch (err) {
      // console.error('error occurred while parsing in the KVPairs', err, value);
    }
  }
  value = config
    ? sanitizeValue(value, config.defaultValue, config.expectedType)
    : value;
  return value;
};

const getKVPairConfigObject = (key, defaultValue, expectedType) => ({
  key,
  defaultValue,
  expectedType
});

const KVPairsMap = {
  PAYMENTS_ICON_REVAMP: getKVPairConfigObject(
    'paymentsIconRevamp',
    {
      card: ['rupay', 'mastercard', 'visa'],
      upi: ['phonepe', 'googlepay', 'bhim']
    },
    {}
  ),
  SAVED_CARD_CONSENT: getKVPairConfigObject(
    'savedCardConsent',
    {
      fetchBinDetailsFromApi: false,
      phase2Enabled: false,
      allowedCards: {
        VISA: true,
        MASTERCARD: true,
        RUPAY: true
      },
      button: {
        consentGiven: 'Secure & Pay',
        consentNotGiven: 'No, Ask me later'
      },
      header: 'Secure Your Card With <cardType>',
      caption:
        'As per RBI guidelines we need to add an additional layer to secure your card. Agreeing to this means:',
      bulletin: [
        'Securing your card and avoiding unauthorised use',
        'Avoiding entering card details everytime you transact on Myntra using your card'
      ],
      faq: {
        text: '',
        link: {
          text: 'FAQs',
          url: 'blabla/bla/bla'
        }
      },
      tnc: {
        text: '',
        link: {
          text: 'Terms & Conditions',
          url: '/bal/bla/bla'
        }
      },
      autoConsent: {
        savedCard: {
          autoChecked: true,
          checkBoxText: 'Secure this card as per RBI Guideline',
          checkBoxInvalidText:
            'We are working with %bank and will soon start taking consent to secure it as per new RBI guideline.'
        },
        newCard: {
          autoChecked: true,
          checkBoxText: 'Secure this card as per RBI Guideline',
          checkBoxSubText:
            'By securing the card you can avoid entering the card details everytime for transation on Myntra',
          notSupportedCard: 'Save this card for faster payments',
          showEcomMessage: false,
          ecomText:
            'Please ensure your card can be used for online transactions',
          ecomKnowMoreText: 'Know More',
          ecomKnowMoreLink: '/faqs'
        }
      },
      consentCardCapping: {
        count: 2,
        frequency: 7
      },
      purgedCardInfo: {
        text:
          'Your saved cards have been removed as per new RBI guidelines. Kindly add them again and secure them for future transactions.',
        customizedMessage:
          'Some of your saved cards have been removed as per new RBI guidelines. Kindly add them again and secure them for future transactions.',
        url: '/faqs',
        urlText: 'Learn More',
        showFAQ: true,
        enabled: {
          savedInstruments: false,
          recommendedInstruments: false
        }
      }
    },
    {}
  ),
  MYNTRA_VALUES_IMG: getKVPairConfigObject(
    'cartMyntraValuesStrip',
    {
      contactlessBannerUrl:
        'https://assets.myntassets.com/assets/images/retaillabs/2020/6/24/11940eed-9b55-4171-9e59-dfb273b3f5961592993834502-1--1-.png',
      paymentBannerUrl:
        'https://assets.myntassets.com/assets/images/retaillabs/2020/12/21/96b07688-2025-4925-9618-e57747b45d421608533063831-1.png'
    },
    {}
  ),
  CART_SHIPPING_CHARGES_LIMIT: getKVPairConfigObject(
    'shipping.charges.cartlimit',
    '999',
    999
  ),
  NEW_USER_DEFAULT_PAYMENT_BANNER: getKVPairConfigObject(
    'newUserPaymentBanner',
    '{"enabled":false,"url":"https://assets.myntassets.com/assets/images/retaillabs/2019/9/27/628c860b-eb02-46cb-a25d-4741cd5ba7131569578624285-banner--1-.png", "urlV2": "https://constant.myntassets.com/checkout/assets/img/newUserDefaultPaymentBannerV2.png"}',
    {}
  ),
  PRICE_REVEAL_DATA: getKVPairConfigObject(
    'hrdr.pricereveal.data',
    '{"enable":"false","buttonlabel":"Sales starts at midnight","info":"Select size to check if we have very few left"}',
    {}
  ),
  SALE_BANNER_DATA: getKVPairConfigObject('hrdr.salebanner.data', {}, {}),
  CHECKOUT_SB_DATA: getKVPairConfigObject(
    'checkout.salebanner.data',
    '{"enable":"true","page":{"cart":"1","address":"1","payment":"1"}}',
    {}
  ),
  EARLYBIRD_MESSAGE: getKVPairConfigObject(
    'checkout.earlybird.message',
    '{0} left at this discount',
    ''
  ),
  URGENCY_MESSAGE: getKVPairConfigObject(
    'checkout.urgencyMetric.message',
    '{"purchased": "{0}+ Shoppers have bought this", "atc": "In {0}+ bags right now"}',
    {}
  ),
  QUANTITY_LIMIT: getKVPairConfigObject('checkout.quantityLimit.check', 10, 10),
  PRIORITY_CHECKOUT: getKVPairConfigObject(
    'priorityCheckout.config',
    {
      enable: false,
      startTime: '',
      endTime: '',
      event: 'EORS',
      charges: 199,
      option1: {
        header: 'Buy Now With Early Access',
        image:
          'https://constant.myntassets.com/checkout/assets/img/EarlyCheckout.svg',
        linesLevel1: [
          'Checkout before the sale rush starts',
          'Pay only Rs.199 extra per order and get your favourite products for sure at EORS sale.'
        ],
        linesLevel2: [
          "<b style='font-weight:600'>Pay only Rs.199 extra(non refundable)</b> for the entire order and shop at EORS price now.",
          'No need of worrying about products or sizes going out-of-stock and no need of shopping at midnight!',
          'Cash on delivery will not be available.'
        ]
      },
      option2: {
        header: 'Wait For The Sale To Start',
        image:
          'https://constant.myntassets.com/checkout/assets/img/Waiting.svg',
        linesLevel1: [
          'Wait for the sale to start and shop without paying the 199 fee.'
        ],
        linesLevel2: [
          "Don't want to pay the Early Access fee? Wait for the sale to start",
          'There is a chance that your favorite products will run out-of-stock during the sale rush.',
          "<b style='font-weight:600'>EORS to start</b> (midnight, 21 Dec)"
        ],
        slotLine: 'Your early slot is at $slot.'
      },
      agreeText: 'I agree to pay Rs.199 for Early Access.',
      Eorstime: 'EORS to start (midnight, 21 Dec)',
      headerIcon: 'https://constant.myntassets.com/checkout/assets/img/pig.svg',
      buttonText: 'BUY NOW WITH EARLY ACCESS',
      featureName: 'Early Access',
      orderTotalName: 'Early Access Fee',
      mainText: 'Hurray! You will save Rs. %s on this order',
      headerSubLine:
        'Buy now with Early Access and get your favourite products for sure, at EORS prices! Additional offers available on the payments page.',
      freeHeaderSubLine:
        'Shop now with Free Early Access and get your favorite products at EORS prices.',
      freeEarlyAccessText: 'Get EORS Early Access for free!'
    },
    {}
  ),
  DISABLED_COUPON_MESSAGE: getKVPairConfigObject(
    'disabledCouponServiceOnPDP.message',
    'All Items are already at the best price.',
    ''
  ),
  SHIPPING_MESSAGE: getKVPairConfigObject(
    'hrdr.shipping.message',
    'Delivery may be delayed due to high demand currently',
    ''
  ),
  TNB_NEW_USER_CONFIG: getKVPairConfigObject(
    'shipping.newUserTnb',
    {
      oldPrice: 49,
      newPrice: 0,
      message: 'for your first purchase'
    },
    {}
  ),
  TNB_PRICE: getKVPairConfigObject('shipping.charges.tryNbuy', 1, 1),
  TNB_DETAILS: getKVPairConfigObject('cart.paidTryNBuy', {}, {}),
  TNB_MAX_COUNT: getKVPairConfigObject('shipping.trynbuy.max_items', 3, 3),
  TNB_MIN_AMOUNT: getKVPairConfigObject(
    'shipping.trynbuy.min_amount',
    999,
    999
  ),
  VALUE_SHIPPING_CHARGES: getKVPairConfigObject(
    'myntra.valueShipping.charges',
    25,
    25
  ),
  SDD_CHARGES: getKVPairConfigObject(
    'shipping.charges.sameDayDelivery',
    149,
    149
  ),
  NDD_CHARGES: getKVPairConfigObject(
    'shipping.charges.nextDayDelivery',
    79,
    79
  ),
  PARTNER_OFFER: getKVPairConfigObject(
    'checkout.confirmation.partnerMessage',
    {},
    {}
  ),
  STANDARD_DELIVERY_CHARGES: getKVPairConfigObject(
    'checkout.stdDeliveryCharges',
    0,
    0
  ),
  OTP_THRESHOLD: getKVPairConfigObject('checkout.otpvalidation.count', 2, 2),
  PAYMENT_ERROR: getKVPairConfigObject(
    'checkout.payment.errorCode',
    {
      '1001': {
        heading: 'Sorry, your order could not be placed.',
        desc:
          'Your order was not placed as there was a problem processing payment. If the amount was debited from your account, it will be refunded automatically within 72 hours Please place your order again. For any query, click below.<br>',
        redirect: '/contactus',
        buttonText: 'CONTACT US'
      },
      '1002': {
        heading: 'Sorry, your order could not be placed.',
        desc:
          'There was an issue with your Gift Card redemption. Please double check the information and try again.<br><br>In case your account has been debited, be assured that the amount will be refunded automatically within 24 to 72 hours.',
        dopeUserConsentEnabled: false
      },
      '1003':
        'There was an issue with your My Cashback redemption. Please try again.<br>',
      '1004':
        'The validation code you entered was wrong. Please try again.<br>',
      '1005': {
        heading: 'Sorry, your order could not be placed.',
        desc:
          'Some of the items in your shopping bag just went out of stock. Please go to the shopping bag for more details.<br>',
        redirect: '/checkout/cart',
        buttonText: 'GO TO BAG'
      },
      '1006': 'There was an issue in our system. Please try again.<br>',
      '1035':
        'There is an issue with application of coupon . Please try again.',
      '1036':
        'There was an issue in verifying the OTP that you have entered. Please try again. <br>',
      '1041': {
        heading: 'Sorry, your order could not be placed.',
        desc:
          'Some of the items in your shopping bag just went out of stock. Please go to the shopping bag for more details.<br>',
        redirect: '/checkout/cart',
        buttonText: 'GO TO BAG'
      },
      '1058': {
        heading: 'Sorry, your order could not be placed.',
        desc:
          'Your order was not placed as there was a problem processing payment. If the amount was debited from your account, it will be refunded automatically within 72 hours Please place your order again. For any query, click below.<br>',
        redirect: '/contactus',
        buttonText: 'CONTACT US'
      },
      '1067': 'Order cannot be delivered at your address.',
      '10004': {
        heading: 'Incorrect OTP',
        desc: 'Payment failed due to incorrect OTP. Please try again.'
      },
      '2102': {
        heading: 'Payment failed. Please try again.',
        desc: 'Your order is still placed as pay on delivery.'
      },
      '1089': 'Something went wrong! Please reselect the address.',
      '1097': {
        heading: 'Sorry, your order could not be placed.',
        desc:
          'You have reached the maximum limit on some products in your bag. We suggest you to change the quantity and try ordering again.',
        redirect: '/checkout/cart',
        buttonText: 'GO TO BAG'
      },
      default: {
        heading: 'Sorry, your order could not be placed.',
        desc:
          'Your order was not placed as there was a problem processing payment. If the amount was debited from your account, it will be refunded automatically within 72 hours Please place your order again. For any query, click below.<br>',
        redirect: '/contactus',
        buttonText: 'CONTACT US'
      }
    },
    {}
  ),
  MFU_INFO_V2: getKVPairConfigObject(
    'checkout.mfu.info.v2',
    {
      heading: 'You have {points} MynCash',
      desc: 'You can pay upto 10% of your order value through MynCash.',
      conversion: '1 MynCash = 1 Rupee'
    },
    {}
  ),
  COD_INFO_MESSAGE: getKVPairConfigObject(
    'payments.cardOnDelivery.info.message',
    '',
    ''
  ),
  PLUTUS_ELIGIBILITY: getKVPairConfigObject(
    'checkout.payment.plutusEligibility',
    {
      icb: false,
      fss: false,
      deff: false
    },
    {}
  ),
  ICB_RETRY_COUNT: getKVPairConfigObject('icb.retry.count', 2, 2),
  PAYMENT_OPTIONS_ERROR: getKVPairConfigObject(
    'payment.options.error',
    {
      '3001': 'Instrument is not eligible',
      '3006':
        'Maximum Pay on Delivery limit reached or we do not offer Pay on Delivery for this order',
      '3007': 'Pay on Delivery amount should be between {minCOD} and {maxCOD}',
      '3008': 'Pay on Delivery not serviceable',
      '3009': 'Pay on Delivery is not available for this order. ',
      '3011': 'We do not offer Pay on Delivery',
      '3012': 'We do not offer Pay on Delivery for gift orders',
      '3013': 'We do not offer Pay on Delivery for Try & Buy orders',
      '3014': 'Pay on Delivery is not available with priority checkout',
      '3015': 'Gift Card is not applicable on any items sold by {sellers}',
      '3016': 'MynCash not applicable for seller',
      '3017': 'EMI not applicable',
      '3018': 'Payment Instrument Data is not available',
      '3023':
        'Pay on Delivery is not available for this order temporarily. Please choose other payment options.',
      default: 'Instrument is not eligible'
    },
    {}
  ),
  PAYMENT_INSTRUMENTS_FAILURE: getKVPairConfigObject(
    'payment.instruments.failure',
    {
      3002: {
        message: 'Bag is empty or invalid. Redirecting back...',
        goBack: true
      },
      3003: {
        message: 'Bag is empty or invalid. Redirecting back...',
        goBack: true
      },
      3004: { message: 'Bag is empty. Redirecting back...', goBack: true }, //EMPTY_CART
      3005: {
        message: 'One or more items are out of stock. Redirecting to Bag...',
        goBack: true
      },
      3010: { forceLogin: true },
      3022: {
        message: 'Something went wrong. Redirecting to Bag...',
        goBack: true
      },
      3024: {
        message: 'Your Bag has updates. Redirecting back...',
        goBack: true
      },
      3025: {
        message:
          'Order cannot be delivered at your address. Redirecting back...',
        goBack: true
      },
      1002: {
        message: 'No groups in the order are eligible for payment',
        goBack: true
      },
      2099: {
        message: 'Invalid Payment plan state',
        goBack: true,
        forceRedirect: true,
        url: '/'
      },
      3034: {
        message: 'Something went wrong. Redirecting to Bag...',
        goBack: true,
        forceRedirect: true,
        url: '/checkout/cart?referrer=styleviolation'
      }
    },
    {}
  ),
  PAYMENT_SELLERNAME: getKVPairConfigObject(
    'payments.sellername',
    'TITAN, BlueStone, Aditya Birla, Fossil India and Puma India.',
    ''
  ),
  OTP_TIMER_START: getKVPairConfigObject(
    'checkout.otpvalidation.timerLimit',
    {
      minutes: 0,
      seconds: 30
    },
    {}
  ),
  TWOFA_WEIGHTAGE: getKVPairConfigObject(
    'checkout.twofa.weightage',
    {
      savedcard: 10,
      myntracredit: 10,
      loyalitypoints: 10,
      netbanking: 10,
      cod: 10
    },
    {}
  ),
  ONLINE_PAYMENT_FAILURE_THRESHOLD: getKVPairConfigObject(
    'paymentsFailureAttempts',
    2,
    2
  ),
  COUPON_PRODUCT_LIST_URL: getKVPairConfigObject(
    'coupon.productListUrl',
    '/uber-offer-2018',
    ''
  ),
  COD_FALLBACK_CONFIG: getKVPairConfigObject(
    'payments.codFallback.config',
    {
      urlV3: 'https://pps.myntra.com/myntra-payment-plan-service/v3/buy',
      retryCount: 1
    },
    {}
  ),
  ADDRESS_ERROR: getKVPairConfigObject(
    'address.error',
    {
      10018: 'Please add house, street, landmark details or check your pincode to improve your address before proceeding further',
      default: 'Something went wrong. Please try again'
    },
    {}
  ),
  PRELAUNCH_MESSAGE: getKVPairConfigObject(
    'checkout.prelaunch.message',
    'Some items in your bag are unavailable. Please move them to wishlist before checkout. We will notify you when they are available.',
    ''
  ),
  USER_PROFILE_CACHE_CONFIG: getKVPairConfigObject(
    'checkout.userProfileCache.config',
    {
      enable: true,
      expiryTimeInMins: 30,
      allowPrefetch: true
    },
    {}
  ),
  UPI_CONFIG: getKVPairConfigObject(
    'checkout.upi.config',
    {
      upiPackageMap: {
        'com.phonepe.app': 'phonepe',
        'com.google.android.apps.nbu.paisa.user': 'googlepay',
        'net.one97.paytm': 'paytm',
        'in.org.npci.upiapp': 'bhim',
        'com.csam.icici.bank.imobile': 'imobilebyicicibank',
        'com.mobikwik_new': 'mobikwik',
        'com.freecharge.android': 'freecharge',
        'com.msf.kbank.mobile': 'kotakmahindrabank',
        'com.snapwork.hdfc': 'hdfc',
        'com.sbi.lotusintouch': 'yonosbi',
        'com.enstage.wibmo.hdfc': 'payzapp'
      },
      vpaHandles: ['@okhdfcbank', '@okicici', '@okaxis', '@oksbi'],
      iconDisplayUPI: [
        'phonepe',
        'phonepeupi',
        'googlepay',
        'bhim',
        'paytm',
        'imobilebyicicibank',
        'freecharge',
        'kotakmahindrabank',
        'yonosbi',
        'hdfc',
        'mobikwik',
        'payzapp'
      ],
      supportedUPI: [
        'phonepe',
        'otherupi',
        'paytm',
        'googlepay',
        'bhim',
        'imobileicici',
        'freecharge',
        'payzapp',
        'cred',
        'airtel',
        'amazonpay',
        'mobikwik',
        'whatsapp',
        'whatsappbusiness'
      ],
      gpayFirst: ['googlepay', 'phonepe', 'paytm', 'bhim', 'otherupi'],
      firstTimeCustomerUPI: [
        'googlepay',
        'phonepe',
        'paytm',
        'bhim',
        'otherupi'
      ],
      visible_limit: 3
    },
    {}
  ),
  INLINE_OFFERS: getKVPairConfigObject(
    'checkout.payment.offers',
    {
      interval: 3,
      paymentInstruments: {
        card: [],
        upi: [],
        wallet: [],
        emi: [],
        netbanking: []
      }
    },
    {}
  ),
  A2HS: getKVPairConfigObject(
    'checkout.a2hs',
    {
      enable: true,
      content: {
        heading: 'Track your order quickly',
        desc: 'Add Myntra to Home screen and access your orders quickly.',
        button: 'Add To Home Screen Now'
      }
    },
    {}
  ),
  WALLET_CONFIG: getKVPairConfigObject(
    'checkout.wallet.config',
    {
      supportedWallets: [
        'paytm',
        'paypal',
        'payzapp',
        'mobikwik',
        'freecharge',
        'airtelmoney',
        'olamoneypostpaidwallet'
      ],
      iconDisplayWallets: ['paypal']
    },
    {}
  ),
  EMI_CONFIG: getKVPairConfigObject(
    'checkout.emi.config',
    {
      iconDisplayEMI: [
        'creditcardemi',
        'zestmoney',
        'emi',
        'instacred',
        'flexipaybyhdfcbank',
        'lazypay',
        'icicipaylater'
      ],
      supportedEMI: [
        'creditcard/hdfcdebitcardemi',
        'flexipaybyhdfcbank',
        'emi',
        'instacred',
        'zestmoney',
        'lazypay',
        'icicipaylater'
      ],
      supportedEMIBankCode: [
        'creditcardemi',
        'zestmoney',
        'emi',
        'instacred',
        'flexipaybyhdfcbank',
        'lazypay',
        'icicibank'
      ]
    },
    {}
  ),
  CART_OFFER_MESSAGES: getKVPairConfigObject(
    'cart.offers.config',
    {
      cart: {
        enabled: 'false'
      }
    },
    {}
  ),
  PAYMENT_OFFER_MESSAGES: getKVPairConfigObject(
    'payment.offers.config',
    {
      heading: 'Bank Offer',
      messages: [],
      enabled: false
    },
    {}
  ),
  TAX_BANNER: getKVPairConfigObject(
    'web.taxBanner',
    {
      checkout: {
        enable: true,
        info: 'Prices are inclusive of all taxes'
      }
    },
    {}
  ),
  PAYMENT_OPTIONS: getKVPairConfigObject(
    'checkout.payment.options',
    {
      default: [
        'savedinstrument',
        'paylater',
        'cod',
        'card',
        'upi',
        'wallet',
        'netbanking',
        'emi'
      ],
      reorder: [
        'savedinstrument',
        'cod',
        'upi',
        'card',
        'wallet',
        'netbanking',
        'emi',
        'paylater'
      ],
      reorderV2: [
        'savedinstrument',
        'upi',
        'card',
        'paylater',
        'wallet',
        'netbanking',
        'emi',
        'cod'
      ],
      preSelectedOption: 'upi',
      preSelectedOptionV2: 'upi'
    },
    {}
  ),
  CART_CREDIT_CONFIG: getKVPairConfigObject(
    'cart.creditWidget.config',
    {
      giftCard: {
        autoApply: false,
        show: true
      },
      loyaltyPoints: {
        autoApply: false,
        show: false
      }
    },
    {}
  ),
  CART_XCELERATOR_TAG_PRIORITY: getKVPairConfigObject(
    'checkout.cart.XceleratorTagPriority',
    [],
    []
  ),
  NON_SERVICEABLE_ADDRESS_ERROR: getKVPairConfigObject(
    'checkout.nonserviceableaddress.error',
    'Sorry! This order cannot be delivered to this pin code.',
    ''
  ),
  RED_ZONE_LIST: getKVPairConfigObject('pincode.essential.serviceable', [], []),
  NOT_SERVICEABLE_MESSAGE: getKVPairConfigObject(
    'checkout.notServiceable.message',
    {
      header: {
        default:
          'One or more items in bag can not be delivered to this pincode. Please remove non deliverable items from bag to continue.',
        redZone:
          'Your pincode lies in Red zone. As part govt. regulations we are delivering only essentials in Red zone. Please ensure you have only Essential items in your bag to proceed'
      },
      item: {
        default:
          'This item can not be delivered to this pincode. Please remove this item from your bag to continue.',
        redZone:
          'As per government guidelines, we are delivering only essentials in the Red zones.'
      }
    },
    {}
  ),
  PAYMENT_TAB_NAME: getKVPairConfigObject(
    'checkout.paymenttabs.config',
    {
      recommendedInstrument: { name: 'Recommended' },
      savedinstrument: { name: 'Saved Payment Options' },
      paylater: { name: 'Flipkart Pay Later' },
      card: { name: 'Credit/Debit Card' },
      netbanking: { name: 'Net Banking' },
      cod: { name: 'Pay on delivery (Cash/UPI)' },
      upi: { name: 'PhonePe/Google Pay/BHIM UPI' },
      wallet: { name: 'Paytm/Wallets' },
      emi: { name: 'EMI/Pay Later' }
    },
    {}
  ),
  PAYMENT_RECOMMENDED_CONFIG: getKVPairConfigObject(
    'checkout.payment.recommended.config',
    {
      cod: { name: 'Cash on delivery (Cash/UPI)' },
      cardCod: { name: 'Cash on delivery (Cash/UPI)' },
      paylater: { name: 'Flipkart Pay Later' }
    },
    {}
  ),
  CART_NOT_READY_ERROR: getKVPairConfigObject(
    'checkout.cartNotReady.error',
    {
      header: 'Cart not ready',
      message: {
        default: 'Invalid Cart'
      }
    },
    {}
  ),
  PAYMENT_NOT_READY_ERROR: getKVPairConfigObject(
    'checkout.paymentNotReady.error',
    {
      message: {
        ADDRESS_NOT_FOUND: 'Something went wrong! Please reselect the address',
        OEE_ADDRESS_NOT_FOUND: 'Something went wrong! Please try again'
      }
    },
    {}
  ),
  MYNACO_GENERIC_EVENTS: getKVPairConfigObject(
    'checkout.events.config',
    [],
    []
  ),
  CIRCUIT_BREAKER_CONFIG: getKVPairConfigObject(
    'checkout.circuit.breaker.config',
    {
      aggregatePaymentData: {
        timeout: 10000,
        errorThresholdPercentage: 50,
        resetTimeout: 2000
      },
      cartPage: {
        timeout: 10000,
        errorThresholdPercentage: 50,
        resetTimeout: 2000
      },
      paymentPage: {
        timeout: 10000,
        errorThresholdPercentage: 50,
        resetTimeout: 2000
      },
      confirmationPage: {
        timeout: 15000,
        errorThresholdPercentage: 50,
        resetTimeout: 2000
      },
      cartFetch: {
        timeout: 5000,
        errorThresholdPercentage: 50,
        resetTimeout: 2000
      },
      cartSetAddress: {
        timeout: 5000,
        errorThresholdPercentage: 50,
        resetTimeout: 2000
      },
      addressById: {
        timeout: 5000,
        errorThresholdPercentage: 50,
        resetTimeout: 2000
      },
      addressAll: {
        timeout: 5000,
        errorThresholdPercentage: 50,
        resetTimeout: 2000
      },
      giftcardFetch: {
        timeout: 2500,
        errorThresholdPercentage: 50,
        resetTimeout: 2000
      },
      loyaltyFetch: {
        timeout: 2500,
        errorThresholdPercentage: 50,
        resetTimeout: 2000
      },
      bountyFetch: {
        timeout: 5000,
        errorThresholdPercentage: 50,
        resetTimeout: 2000
      },
      styleGetPdpDataBulk: {
        timeout: 2500,
        errorThresholdPercentage: 50,
        resetTimeout: 2000
      },
      paymentLog: {
        timeout: 2500,
        errorThresholdPercentage: 50,
        resetTimeout: 2000
      },
      feedbackSurvey: {
        timeout: 2500,
        errorThresholdPercentage: 50,
        resetTimeout: 2000
      },
      priceDropWishlistItems: {
        timeout: 1500,
        errorThresholdPercentage: 20,
        resetTimeout: 2000
      }
    },
    {}
  ),
  PRICE_DETAILS_TEXT: getKVPairConfigObject(
    'checkout.priceDetails.text',
    {
      fields: {
        mrp: 'Total MRP',
        discount: 'Discount on MRP',
        bag: 'Value Shipping',
        coupon: 'Coupon Discount',
        shipping: 'Convenience Fee',
        giftwrap: 'Gift Wrap Charges',
        giftcard: 'Myntra Credit used',
        loyaltypoints: 'MynCash used',
        tax: 'Tax',
        orderTotal: 'Total Amount',
        bank: 'Bank Discount',
        total: 'Total Amount Payable',
        coverfee: 'Early Access Fee',
        trynbuy: 'Try & Buy Fee',
        effectiveExchangeItemPrice: 'Exchange credit',
        refundOrderTotal: 'Total Refund',
        refundTotal: 'Total Amount Refundable'
      },
      infoText: {
        shipping:
          '"Convenience Fee" is the charge levied by Myntra Designs Private Limited for providing access to, and on account of your usage of www.myntra.com, Myntra m-site and Myntra Mobile App'
      },
      infoConfig: {
        shipping: {
          type: 'modal',
          text: 'Know More',
          header: 'Convenience Fee',
          title: 'What is a Convenience Fee?',
          desc:
            '"Convenience Fee" is a service charge levied by Myntra Designs Pvt. Ltd. on low value orders on the Myntra Platform.',
          returnAbuserDesc:
            '"Convenience Fee" is a service charge levied by Myntra Designs Pvt. Ltd.',
          faqLink: '/faqs#shipping',
          termsOfUseLink: '/termsofuse'
        }
      }
    },
    {}
  ),
  USER_LOCATION_CONTEXT_CONFIG: getKVPairConfigObject(
    'userLocationContextConfig',
    {
      expiry: 7 * 24 * 60 * 60 * 1000
    },
    {}
  ),
  NON_SERVICEABLE_CART_ERROR: getKVPairConfigObject(
    'checkout.nonserviceableacart.error',
    {
      header: 'Item(s) not deliverable to %pincode%',
      item: 'Not deliverable at selected pincode.'
    },
    {}
  ),
  MAXIMUM_PRODUCT_LIMIT_MESSAGE: getKVPairConfigObject(
    'checkout.productLimit.message',
    {
      header: 'Items not deliverable',
      body:
        'Your bag has 50 products, please remove some of them before adding more products'
    },
    {}
  ),
  CONFIRMATION_COUPON_BANNER: getKVPairConfigObject(
    'checkout.confirm.couponbanner',
    {
      enable: false,
      header: `Yay! You've earned a coupon`,
      validText: 'Valid from',
      validDate: `Oct’ 1 - Oct’ 15.`,
      couponText: 'SAVE15'
    },
    {}
  ),
  STATSD_CONFIG: getKVPairConfigObject(
    'checkout.statsd.config',
    {
      urlPathMap: [
        {
          url: 'http://knuth.myntra.com/v1/cart/default',
          path: 'CARTDEFAULT',
          samplingProbability: 0.5,
          featureEnabled: false
        },
        {
          url: 'http://knuth.myntra.com/v2/addresses',
          path: 'ADDRESSALL',
          samplingProbability: 0.5,
          featureEnabled: false
        },
        {
          url: 'http://knuth.myntra.com/v2/user/order/address',
          path: 'ORDERADDRESSBYUNIFIEDID',
          samplingProbability: 0.5,
          featureEnabled: false
        },
        {
          url: 'http://knuth.myntra.com/v1/user/order/',
          path: 'BOUNTYFETCH',
          samplingProbability: 0.5,
          featureEnabled: false
        },
        {
          url: 'https://payments.myntra.com/payments/v2/transaction',
          path: 'PAYMENTLOG',
          samplingProbability: 0.5,
          featureEnabled: false
        },
        {
          url: 'http://knuth.myntra.com/v1/payments/fetchData',
          path: 'PAYMENTAGGREGATOR',
          samplingProbability: 0.5,
          featureEnabled: false
        },
        {
          url: 'https://knuth.stage.myntra.com/v1/cart/default/edit',
          path: 'CART.EDIT',
          samplingProbability: 0.5,
          featureEnabled: false
        }
      ],
      featureEnabled: false,
      samplingProbability: 0.5,
      maximumSavedEvents: 10,
      pushInterval: 5,
      apiLevelStatsDEnabled: false
    },
    {}
  ),
  PS0_LIST: getKVPairConfigObject(
    'checkout.confirm.ps0.list',
    [
      'maleshirts',
      'maletshirts',
      'malekurtas',
      'malesweaters',
      'malesweatshirts',
      'malejackets',
      'malekurta sets',
      'maleblazers',
      'femalekurtas',
      'femaletops',
      'femaledresses',
      'femalekurta sets',
      'femalejumpsuit',
      'femaleshirts',
      'femaletshirts',
      'femalesweaters',
      'femalesweatshirts',
      'femalejackets',
      'femaletunics',
      'femalekurtis',
      'malejeans',
      'maletrousers',
      'maleshorts',
      'maletrack pants',
      'femalejeans',
      'femaleshorts',
      'femaletrousers',
      'femaleskirts',
      'femalepalazzos',
      'femaletights',
      'femalejeggings',
      'femaletrack pants',
      'malecasual shoes',
      'malesports shoes',
      'maleformal shoes',
      'malesandals',
      'maleflip flops',
      'femalecasual shoes',
      'femalesports shoes',
      'femaleheels',
      'femaleflats',
      'femaleflip flops'
    ],
    []
  ),
  CART_PRICE_CHANGE_CONFIG: getKVPairConfigObject(
    'cart.pricechange.config',
    {
      threshold: 0,
      subtitle:
        'The price of your bag has dropped since you last visited. Buy them now!'
    },
    {}
  ),
  MYNTRA_INSIDER: getKVPairConfigObject(
    'checkout.myntraInsider',
    {
      toolTipTextInsider: '',
      toolTipTextSuperCoin: ''
    },
    {}
  ),
  CART_MODAL_CONTENT: getKVPairConfigObject(
    'cart.modalContent',
    {
      oos: {
        header: 'Item(s) out of stock',
        body: 'Please remove out of stock items from your bag to proceed.',
        sprite: 'oos'
      },
      prelaunch: {
        header: 'Item(s) unavailable',
        body: 'Please remove unavailable items from your bag to proceed.'
      },
      totalExceeded: {
        header: 'Cart Limit Exceeded',
        body:
          'Total bag amount cannot exceed 2 lakhs. Try removing some items to proceed.'
      },
      vbConflict: {
        header: 'Item(s) repeated in your bag',
        body:
          'Please remove either the combo or the individual product which is repeated in your bag to proceed.'
      },
      nonServiceable: {
        header: 'Not deliverable to Pincode %pincode%',
        body:
          'Few items in your bag are not deliverable to selected pincode. Please move them from bag to proceed.',
        sprite: 'ship-charge'
      }
    },
    {}
  ),
  ADDRESS_SUGGESTION_CONFIG: getKVPairConfigObject(
    'checkout.addressSuggestion.config',
    {
      pwa: 'enabled',
      android: 'enabled',
      android_version: '4.2011',
      enableHighAccuracy: 'enabled',
      timeout: '3000',
      maximumAge: '3600000'
    },
    {}
  ),
  STYLE_EXCHANGE: getKVPairConfigObject(
    'checkout.styleExchange.config',
    {
      cancel: {
        message: [
          'Are you sure you want to cancel this exchange?',
          'By cancelling the exchange, you choose to keep the item.'
        ],
        note:
          'You can initiate a return or exchange for this item anytime again, till %date%'
      },
      howItWorks: {
        bannerImage:
          'https://assets.myntassets.com/assets/images/2020/10/8/a50630e4-3a4a-4a3e-ba70-90ec258358ee1602143509756-how-it-works.jpg',
        steps: [
          {
            title: 'Choose one replacemet item',
            text:
              'From your Shopping bag, Wishlist or search for something new that you want in exchange'
          },
          {
            title: 'Payment',
            text:
              'Pay only the difference if the cost is more or get refund if the cost of the new item is lesser. '
          },
          {
            title: 'Delivery and Pick-up',
            text:
              'Our delivery executive will pick-up the exchange item & hand over the new at the same time'
          }
        ],
        faqs: [
          {
            question: 'Till when can I purchase the new item in exchange?',
            answer:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          },
          {
            question: 'Can I return/exchange the the new item?',
            answer:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          },
          {
            question: 'Can I purchase two items in exchange of one item?',
            answer:
              'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          }
        ]
      },
      expiry: {
        expirySoon:
          'This exchange is valid for a limited time. Please purchase a new item till %date% to avoid cancellation of this exchange.',
        expired:
          'This exchange expired on %date%. Please cancel exchange to place regular order',
        threshold: 2
      },
      address: [
        'Pickup and delivery will happen at the same address.',
        '',
        'If you want to change the address, please cancel this exchange and initiate a new exchange from the Orders page.'
      ],
      confirm: {
        header:
          'Please check your orders page to track exchange and refund status. ',
        steps: [
          {
            text:
              'Repack the item with original packaging and the original brand tags.',
            icon: 'ItemPack'
          },
          {
            text:
              'Hand over the package to the delivery agent and collect the new package.',
            icon: 'ItemHandOver'
          }
        ]
      },
      addressNotFound: {
        header: 'Exchange cannot be completed',
        description:
          'Sorry, we are facing an issue at our end. Please try creating a new exchange from Orders.',
        highlightedText: 'address was either updated or deleted.',
        cta: {
          cta1: 'Create New Exchange',
          cta2: 'Cancel Exchange '
        }
      }
    },
    {}
  ),
  PAYLOAD_EVENTS: getKVPairConfigObject(
    'checkout.maPayloadEvent',
    ['PAY_NOW_ERROR_PAYLOAD'],
    []
  ),
  CART_MESSAGES_CONFIG: getKVPairConfigObject(
    'checkout.cartMessagesConfig',
    {
      unserviceable: 'Item(s) not deliverable to %pincode%.',
      priceChange: 'The price of some item(s) might have changed.',
      priceAndSellerChange:
        'The price and seller of some item(s) have changed.',
      bagPriceDrop: 'Bag price dropped by %price%.',
      config: {
        displaySequence: [
          'Serviceable',
          'Offer',
          'LoginNudge',
          'SavingsFeedback',
          'OutOfStock',
          'VirtualBundleConflict',
          'PriceIncreaseConflict',
          'PriceDecreaseConflict'
        ],
        combinedMessageContainer: {
          component: ['PriceIncreaseConflict', 'SavingsFeedback']
        }
      }
    },
    {}
  ),
  LOGIN_NUDGE_SHIPPING_TIP: getKVPairConfigObject(
    'checkout.loginNudgeShippingTip',
    {
      message: 'Login to {highlightedText} on your first order.',
      highlightedText: 'avoid convenience fee'
    },
    {}
  ),
  LOGIN_NUDGE_COUPON: getKVPairConfigObject(
    'checkout.loginNudgeCoupon',
    {
      message: 'Login to get upto {0} OFF on first order',
      price: '300'
    },
    {}
  ),
  LOGIN_NUDGE_ITEMLIST_TIP: getKVPairConfigObject(
    'checkout.loginNudgeItemListTip',
    'Login to see items from your existing bag and wishlist.',
    ''
  ),
  RETURN_ABUSER_CONFIG: getKVPairConfigObject(
    'checkout.returnAbuserConfig',
    {
      header: 'Returns profile',
      tips: {
        header: "Here's a purchase guide to help you avoid returns",
        steps: [
          {
            text: 'Check the size chart & refer to the recommended sizes',
            icon: 'Tape'
          },
          {
            text: 'Check the product description for details',
            icon: 'List'
          },
          {
            text:
              'Opt for the Alteration or Try & Buy service while placing your order',
            icon: 'Alter'
          },
          {
            text: 'Opt for product exchange in case of size issues',
            icon: 'Exchange'
          }
        ]
      },
      privileges: {
        header: 'How to get back your privileges?',
        steps: [
          {
            text:
              'Opt for <span style="font-weight:600;">product exchange</span> rather than returns',
            icon: 'GreenExchange'
          },
          {
            text:
              '<span style="font-weight:600;">Shop responsibly</span> for the next 20 orders',
            icon: 'GreenReturn'
          }
        ]
      },
      benefits: {
        header: 'Benefits of low returns',
        steps: [
          {
            text:
              '<span style="font-weight:600;">Zero convenience fee</span> on orders above a certain value',
            icon: 'GreenShip'
          },
          {
            text:
              'You retain your <span style="font-weight:600;">Myntra Insider status & privileges</span>',
            icon: 'GreenInsider'
          }
        ]
      },
      returns: {
        header: 'Due to high returns',
        steps: [
          {
            text:
              'A convenience fee of {0} will be applicable on upcoming orders',
            icon: 'RedCross'
          },
          {
            text: 'You will only have limited Myntra Insider privileges',
            icon: 'RedCross'
          }
        ]
      },
      myntraUserImage:
        'https://constant.myntassets.com/checkout/assets/img/marker-myntv2.png',
      abuseUserImage:
        'https://constant.myntassets.com/checkout/assets/img/marker-user.png'
    },
    {}
  ),
  CONFIRMATION_PROFILE_TAGGING: getKVPairConfigObject(
    'confirmation.profileTagging',
    {
      tagHeading: 'Help us give you better size recommendation?',
      tagSubText:
        'Tell us who did you buy this for and start getting size recommendations from your next purchase',
      recommendationMsgHeading: 'Thanks for tagging your purchase!',
      recommendationMsgSubText:
        'From now on you will see size recommendations that are perfect for you.'
    },
    {}
  ),
  PRIVACY_POLICY: getKVPairConfigObject(
    'checkout.privacy.policy',
    {
      pages: ['cart', 'address'],
      termsOfUse: { link: '/termsofuse', text: 'Terms of Use' },
      privacy: { link: '/privacypolicy', text: 'Privacy Policy' }
    },
    {}
  ),
  RTO_RETURN_ABUSER_CARD: getKVPairConfigObject(
    'checkout.abuserCard',
    {
      noCod: {
        message: 'Pay on Delivery is not available for this order.',
        popUp: {
          title: 'Why is Pay on Delivery not available?',
          content:
            "We always strive hard to provide the best experience to our customers. However, we have noticed that few accounts abuse our liberal policies. We reserve the right to disable pay on delivery option if the order exceeds the pay on the delivery limit or if the account violates any of Myntra's policy"
        }
      },
      noFd: {
        message: 'Convenience fee is applicable for this order.',
        popUp: {
          title: 'Why Convenience fee is applicable for this order?',
          content: `We always strive hard to provide the best experience to our customers. However, we have noticed that few accounts abuse our liberal returns policy. These accounts typically return most of the items bought or choose to not accept our shipments. Hence our regular customers deprived of the opportunity to buy these items. To protect the rights of our customers, we reserve the right to collect a convenience fee of Rs. {0} for all orders for accounts which have a high percentage of returns and shipments not accepted by the value of orders placed.`
        }
      },
      noFdNoCod: {
        message:
          'Convenience fee is applicable and Pay on Delivery is not available for this order.',
        popUp: {
          title:
            'Why Convenience fee is applicable & Pay on Delivery is not available?',
          content: `We always strive hard to provide the best experience to our customers. However, we have noticed that few accounts abuse our liberal policies. We reserve the right to disable pay on delivery option if the order exceeds the pay on the delivery limit and to collect a convenience fee of Rs. {0} for all orders for accounts that have a high percentage of returns and shipments not accepted by the value of orders placed.`
        }
      }
    },
    {}
  ),
  CONVENIENCE_PAY_HALFCARD: getKVPairConfigObject(
    'confirmation.conveniencePayHalfcard',
    {
      heading: 'Pay at your convenience',
      tabs: {
        tab1: {
          heading: 'Pay Online',
          subHeading: 'Pay online from orders',
          desc:
            'Now you can pay online anytime before order is out for delivery. You can follow the steps to pay online.',
          steps: [
            {
              name: 'Step 1.',
              text:
                'Go to <span style="font-weight:600;">My Orders</span> in your profile.'
            },
            {
              name: 'Step 2.',
              text: 'Select the order you want to pay online.'
            },
            {
              name: 'Step 3.',
              text:
                'Go to the section of Pay Online and click on <span style="font-weight:600;">PAY NOW</span> button.'
            },
            {
              name: 'Step 4.',
              text:
                'Now you can select the desired payment option and pay online.'
            }
          ],
          creditMessage:
            'You can use Myntra Credit or any running payment offer at the time of online payment.',
          note: {
            heading: 'Please Note',
            text:
              'Pay Online option will be available till the order is out for delivery. After that you can pay on delivery through Cash/UPI apps.'
          }
        },
        tab2: {
          heading: 'Pay on Delivery',
          subHeading: 'Pay on delivery (Cash/UPI)',
          desc:
            'Now you can pay at the time of delivery through Cash or UPI apps.',
          steps: [
            {
              name: 'UPI',
              heading: 'Pay through UPI Apps',
              text:
                'Ask Myntra delivery executive for the UPI QR code. You can scan the UPI QR code through any UPI app like BHIM, PhonePe, Google Pay, Paytm etc.'
            },
            {
              name: 'COD',
              heading: 'Pay through Cash',
              text:
                'You can always choose to pay through cash at the time of delivery.'
            }
          ]
        }
      }
    },
    {}
  ),
  PAYMENT_RETRY_TIMER: getKVPairConfigObject(
    'checkout.payment.retry.timer',
    {
      min: 15,
      sec: 0
    },
    {}
  ),
  CART_TRUST_AND_SAFETY_MARKER: getKVPairConfigObject(
    'checkout.cartTrustNSafetyMarker',
    {
      heading: 'Myntra Trust & Safety Promise',
      subText: 'Original Products | Safe Payment | Easy returns'
    },
    {}
  ),
  CONFIRMATION_PAGE_CONFIG: getKVPairConfigObject(
    'checkout.confirmationPage.config',
    {
      confirmationBanner: {
        header: 'Order Confirmed',
        message: 'You saved %price% on this order',
        backgroundImage:
          'https://constant.myntassets.com/checkout/assets/img/orderConfirmedBannerBackground_17-03-2021.png',
        bannerImage:
          'https://constant.myntassets.com/checkout/assets/img/Baloons_17-03-2021.png'
      },
      insiderBanner: {
        header: 'Insider Points on your way',
        headerSupercoins: 'SuperCoins on your way',
        backgroundImage:
          'https://constant.myntassets.com/checkout/assets/img/insiderBannerBackground_17-03-2021.png'
      },
      displayBannerTime: 3000,
      showFeedbackSurveyWidget: false,
      notifWidgetSwitch: {
        androidEnabled: false,
        iOSEnabled: false
      },
      widgets: {
        mobile: [
          'ScratchCardBanner',
          'PromoOffer',
          'DeliveryDetailsWidget',
          'FitAssist',
          'PayAtConvenience',
          'ExchangeInfoWidget',
          'FeedbackSurveyWidget',
          'InsiderSuperCoinWidget',
          'NotifWidget',
          'Recommendations',
          'A2HS',
          'ContinueShopping',
          'Footer'
        ],
        desktop: [
          'DeliveryDetailsWidget',
          'PayAtConvenience',
          'PromoOfferDesktop',
          'SuccessCTA'
        ]
      },
      insiderTier: {
        tierNames: ['Insider', 'Select', 'Elite', 'Icon'],
        collectMsg: 'Collect these points once the order is delivered.',
        benifitText: 'You have %totalPrivileges% Exclusive Benefits',
        benefitTextSuperCoins:
          'You have %totalPrivileges% %tierName% Privileges',
        tierPrivilegesLink: '/myntrainsider/tierprivileges',
        faqsLink: '/myntrainsider/faq',
        faqsText: 'Know more about Myntra Insider Program',
        headerText: 'Points on your way',
        headerTextSuperCoin: 'SuperCoins on your way'
      },
      insiderSuperCoin: {
        enabled: false,
        acceleratedEarning: {
          Elite: ['2X', 'DOUBLE EARNING'],
          Icon: ['3X', 'TRIPLE EARNING']
        },
        allRewardsCtaLink: 'https://www.myntra.com/myntrainsider/offers',
        allRewardsCtaText: 'VIEW ALL REWARDS',
        collectCoinsMessage:
          'Collect {{superCoinToCollect}} once your order is delivered',
        headerMessage: '{{tierName}} Benefits',
        superCoinRewardsTitle: 'Use your SuperCoins to get exciting Rewards!',
        tierNames: ['Select', 'Elite', 'Icon'],
        tooltipTitle: 'Congratulations {{userName}}!',
        tooltipMessage: `You'll be upgraded once you collect your Coins`,
        rewardItemCtaLink: 'https://www.myntra.com/myntrainsider/offers',
        rewardsList: [
          {
            imageUrl:
              'https://assets.myntassets.com/assets/images/retaillabs/2021/9/3/74e9ae39-2302-42e7-ad8c-917e51b2206c1630656211389-Get-Myntra-Voucher-worth-Rs.500.jpg',
            title: 'Get Myntra Voucher worth Rs.500'
          },
          {
            imageUrl:
              'https://assets.myntassets.com/assets/images/retaillabs/2021/9/3/4ef867c9-1129-4e3c-98c8-b67711845e421630656211382-Get-Leivs-Voucher-worth-Rs.-500.jpg',
            title: "Get Levi's Voucher worth Rs. 500"
          },
          {
            imageUrl:
              'https://assets.myntassets.com/assets/images/retaillabs/2021/9/3/935ad8e3-121b-41d1-abd1-1200ad4dda531630656211396-Get-SonyLiv-Premium-1-Month-Subscription.jpg',
            title: 'Get SonyLiv Premium 1 Month Subscription'
          },
          {
            imageUrl:
              'https://assets.myntassets.com/assets/images/retaillabs/2021/9/3/ad73203d-eadf-4539-afff-8d9de0f121d61630656211403-Get-Tokyo-Talkies-Voucher-worth-Rs.400.jpg',
            title: 'Get Tokyo Talkies Voucher worth Rs.400'
          },
          {
            imageUrl:
              'https://assets.myntassets.com/assets/images/retaillabs/2021/9/3/258492c4-99f1-4a49-a416-c6e26303d82c1630656211377-Get-FLAT-12--OFF-on-Flipkart-Flight--Bookings.jpg',
            title: 'Get FLAT 12% OFF on Flipkart Flight  Bookings'
          }
        ],
        insiderTrials: {
          enabled: false,
          defaultTooltipTitle: '',
          defaultTooltipMessage:
            'Recent purchases will only reflect in the progress once the return window is over',
          title: 'Trial',
          progressBarLevels: ['₹0', '₹500', '₹1000', '₹1500', '₹2000'],
          goalAmount: 2000,
          shopMoreMessage:
            'Shop for {{requiredAmount}} & unlock 12 month Select Insider Pack',
          upgradeCartMessage: `Post purchase, you'll unlock 12 month Select Insider Pack once the return window of your order is over.`
        }
      },
      deliveryInfo: {
        icon:
          'https://constant.myntassets.com/checkout/assets/img/delhiveryPerson_17-03-2021.png',
        note: 'You can Track/View/Modify order from orders page.'
      },
      convenienceFee: {
        heading: 'Now pay at your convenience',
        description:
          'Now you can pay online using Pay Now option from orders or you can Pay on Delivery (Cash/UPI).'
      }
    },
    {}
  ),
  CART_SHARE: getKVPairConfigObject(
    'checkout.cartshare',
    {
      shareTitleSingle: 'You are sharing 1 item',
      shareTitleMultiple: 'You are sharing %itemsCount% items',
      shareSubject: 'Checkout what I found on Myntra!',
      shareMinError: 'Please Select atleast one element',
      shareMaxError: 'You cannnot select more than %shareMaxNum% items',
      shareMaxNum: 10,
      shareBodyPrefix:
        'Hey! Check out these awesome products on Myntra. Hope you will like them :)',
      shareImageSize: { width: 111, height: 148 }
    },
    {}
  ),
  DONATION_VALUES: getKVPairConfigObject(
    'checkout.donation.values',
    {
      bannerTitle: 'Support transformative social work in India',
      modalConfig: {
        title: 'Support Us',
        imgSource:
          'https://constant.myntassets.com/checkout/assets/img/donationBanner.webp',
        linkAndDescription: [
          {
            desc: 'Donation amount is being collected on behalf of GiveIndia'
          },
          {
            desc: 'Donation amount is non-refundable.'
          },
          {
            desc:
              'Myntra will share your Name, Email ID and Address with GiveIndia to send the receipt for the donation amount.'
          },
          {
            desc:
              "You'll receive Donation receipt to claim for tax exemption under 80G on your email."
          }
        ],
        footer: {
          desc: 'Have a question? check',
          link: '/faqs#donationQueries',
          linkText: 'FAQs'
        }
      },
      values: [10, 50, 100, 'other'],
      maximumDonation: 10000,
      receiptText:
        "You'll receive Donation receipt to claim for tax exemption under 80G on your email.",
      enterEmailText:
        "You'll receive Donation receipt to claim for tax exemption under 80G on your email. Please enter your email ID."
    },
    {}
  ),
  CART_FILLER_CONFIG: getKVPairConfigObject(
    'checkout.cartfiller.config',
    {
      maxCount: 15,
      errorMessage: 'Something went wrong. please try again in sometime',
      emptyPillMessage: 'No products found here, please click another pill'
    },
    {}
  ),
  BPC_RETURN: getKVPairConfigObject(
    'checkout.bpc.return',
    {
      message: 'Hassle free 15 days return'
    },
    {}
  ),
  LOW_SR_MESSAGES: getKVPairConfigObject(
    'checkout.lowSR.messages',
    {
      lowSuccessRate: 'is currently facing low success rate.',
      highFailureRate: 'is currently facing high failure rate.'
    },
    {}
  ),
  FIREBASE_ENABLE: getKVPairConfigObject(
    'firebaseEnable',
    {
      enableDesktop: true,
      enablePWA: true,
      enableCheckout: true
    },
    {}
  ),
  FREE_EARLY_ACCESS_FOR_INSIDER: getKVPairConfigObject(
    'checkout.insider.freeEarlyAccess',
    {
      INSIDER_ELITE_PRIVILEGE: 'INSIDER ELITE',
      INSIDER_ICON_PRIVILEGE: 'INSIDER ICON',
      INSIDER_SELECT_PRIVILEGE: 'INSIDER SELECT'
    },
    {}
  ),
  ADD_TO_CART_MESSAGING: getKVPairConfigObject(
    'checkout.addToCartMessaging',
    {
      itemAlreadyPresent:
        'You have this item in your bag and we have increased the quantity by 1',
      itemReachedMaxQty:
        'You have this item in your bag with the maximum available quantity'
    },
    {}
  ),
  ANDROID_SPA: getKVPairConfigObject(
    'checkout.androidSpa',
    {
      enabledVersion: '4.2110'
    },
    {}
  ),
  TWOFA_PAYMENT_OPTIONS: getKVPairConfigObject(
    'checkout.twofa.paymentOptions',
    {
      default: ['myntraCredit', 'cod']
    },
    {}
  ),
  AUTHNZ_SERVICES: getKVPairConfigObject(
    'checkout.authnz.services',
    {
      cartFetch: true,
      addressAll: true,
      addressById: true,
      orderAddressByUnifiedId: true,
      cartSetAddress: true,
      aggregatePaymentData: true
    },
    {}
  ),
  PWA_IMAGE_WIDTH: getKVPairConfigObject('pwa.images.width', '400', 400),
  DOPE_CONSENT_HALFCARD_CONFIG: getKVPairConfigObject(
    'checkout.dope.userconsent.halfcard',
    {
      threshold: 1,
      ucretryfirst: {
        text: 'You can place order using {text1} or {text2}.',
        highlightedText1: 'Retry Payment',
        highlightedText2: 'Pay On Delivery'
      },
      retryCTA: 'Retry Payment',
      podCTA: 'Pay On Delivery (CASH/UPI)',
      ecomText:
        '<span style="font-weight:600;">Note: </span>Please ensure if you have enabled online transaction on your card via your bank'
    },
    {}
  ),
  SAMPLE_SELECTOR: getKVPairConfigObject(
    'cart.sampleSelector',
    {
      androidVersion: '',
      iosVersion: '',
      freeGiftAdded: 'Yay! You got a beauty & grooming free gift'
    },
    {}
  ),
  STYLE_CAPPING: getKVPairConfigObject(
    'cart.styleCapping',
    {
      header:
        'You have reached the maximum limit on some products in your cart. We suggest you to change the quantity and try ordering again.'
    },
    {}
  ),
  COUPON_AWARENESS_LIST: getKVPairConfigObject(
    'cart.autoapplycouponlist',
    {
      threshold: 3
    },
    {}
  ),
  EMI_ELIGIBILITY_CODE: getKVPairConfigObject(
    'checkout.payment.emiEligibilityCode',
    {
      '60003': {
        eligible: true,
        message: ''
      },
      '60004': {
        eligible: false,
        message: 'Available on min. order of {amount}'
      },
      default: {
        eligible: true,
        message: ''
      }
    },
    {}
  ),
  SUPERCOINS_CREDIT: getKVPairConfigObject(
    'cart.checkout.sccredit',
    {
      scTxt:
        'Use $SC_ICON$ $SC_BAL$ SuperCoins to get $RS_ICON$ $MC_BAL$ off $NEW_TAG$',
      mcTimeoutMsg: 'Your Myntra Credit balance will be updated in sometime.',
      apiTimeout: 2000
    },
    {}
  ),
  SOCIAL_PROOFING_TEXT: getKVPairConfigObject(
    'checkout.cart.socialProofingText',
    {
      text: 'More than {count} people shopped from {city} recently'
    },
    {}
  ),
  FINE_JWELLERY_STEPS: getKVPairConfigObject(
    'finejwellery.step',
    {
      title: 'How Return Works',
      points: [
        {
          imageUrl:
            'https://assets.myntassets.com/assets/images/retaillabs/2022/9/27/555cf64f-33f8-45fe-a692-64b1f22309641664284405849-return-im.jpg',
          title: 'Raise Return Request',
          description: 'Go to Orders page and click on Return Item.'
        },
        {
          imageUrl:
            'https://assets.myntassets.com/assets/images/retaillabs/2022/9/27/33ba17bc-bffa-4a6d-9769-bb32e848b9011664284405837-upload-im.jpg',
          title: 'Upload the 2 videos',
          description:
            'Upload your video unpacking the item and also a video repacking it.',
          video_title: 'How to record videos',
          video_link: '#'
        },
        {
          imageUrl:
            'https://assets.myntassets.com/assets/images/retaillabs/2022/9/27/53c36bb4-b83d-4edb-906e-65e46dcdd3f61664284405860-approve-req-im.jpg',
          title: 'Request Approval',
          description:
            "Once the request is raised, it'll be evaluated within 3 business days."
        },
        {
          imageUrl:
            'https://assets.myntassets.com/assets/images/retaillabs/2022/9/27/bde3eced-7272-44c2-b689-a5bb8af2d8871664284405843-return-pick-im.jpg',
          title: 'Retrun Pickup',
          description:
            'Our delivery agent will pick up the item. Enjoy hassle-free pickup!'
        },
        {
          imageUrl:
            'https://assets.myntassets.com/assets/images/retaillabs/2022/9/27/b57927bf-5c8e-4152-9021-a2e85d7fecfd1664284405854-process-ref-im.jpg',
          title: 'Your refund will be processed',
          description:
            'Once teh item has been checked, your refund will be initiated.'
        }
      ]
    },
    {}
  ),
  CART_INSIDER_PROGRESS: getKVPairConfigObject(
    'cart.insiderProgress',
    {
      tierNames: ['Select', 'Elite', 'Icon'],
      tierUpgradeAmounts: [10000, 25000, 0],
      bannerNames: ['', 'insider-benefits-elite-v2', 'insider-benefits-icon-v2']
    },
    {}
  ),
  COD_HELP_TEXT: getKVPairConfigObject(
    'checkout.payment.codHelpText',
    {
      description: 'Pay on delivery (Cash/UPI)',
      helpText:
        'You can pay via Cash or UPI enabled app at the time of delivery. Ask your delivery executive for these options.'
    },
    {}
  ),
  MEXPRESSPLUS_CONFIG: getKVPairConfigObject(
    'cart.mexpressplus.timer',
    {
      platformConfig: {
        mweb: true,
        app: true,
        desktop: true
      },
      orderWithinTimer: 24,
      deliveryTimer: {}
    },
    {}
  ),
  CHECKOUT_PAYMENT_PERSONZALIZATION_CONFIG: getKVPairConfigObject(
    'checkout.payment.personalizationConfig',
    {
      enablePaymentOptionPersonalization: false,
      enablePaymentSubOptionPersonalization: false
    },
    {}
  )
};

module.exports = {
  KVPairsMap,
  getKVPairValue
};
