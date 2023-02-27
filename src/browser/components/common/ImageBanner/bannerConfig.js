import get from 'lodash/get';

const bannerConfig = {
  'empty-bag': {
    width: 146,
    height: 165
  },
  'ship-free': {
    width: 32,
    height: 24
  },
  'ship-charge': {
    width: 27,
    height: 21
  },
  oos: {
    width: 24,
    height: 24
  },
  'price-drop': {
    width: 24,
    height: 24
  },
  'price-change': {
    width: 24,
    height: 24
  },
  'trynbuy-unavailable': {
    width: 24,
    height: 24
  },
  'couponform-banner': {
    width: 50,
    height: 86
  },
  gift: {
    width: 39,
    height: 71
  },
  'gift-big': {
    width: 39,
    height: 99
  },
  'giftwrap-1': {
    width: 192,
    height: 116
  },
  'giftwrap-2': {
    width: 172,
    height: 128
  },
  'giftwrap-card': {
    width: 36,
    height: 39
  },
  'giftwrap-invoice': {
    width: 33,
    height: 42
  },
  'giftwrap-tag': {
    width: 44,
    height: 34
  },
  'scratchcard-success-stars': {
    width: 262,
    height: 100
  },
  'insider-crown': {
    width: 22,
    height: 22
  },
  'copy-icon': {
    width: 15,
    height: 18
  },
  'better-luck-next-time': {
    width: 202,
    height: 146
  },
  'insider-icon': {
    width: 92,
    height: 50
  },
  'scratch-success-icon': {
    width: 56,
    height: 38
  },
  'round-tick': {
    width: 20,
    height: 20
  },
  'shopping-bag': {
    width: 62,
    height: 93
  },
  'spread-love-stars': {
    width: 255,
    height: 48
  },
  'mobile-exp': {
    width: 62,
    height: 94
  },
  bulb: {
    width: 28,
    height: 46
  },
  otp: {
    width: 103,
    height: 103
  },
  tagged: {
    width: 23,
    height: 23
  },
  error: {
    width: 250,
    height: 311
  },
  secureNew: {
    width: 28,
    height: 28
  },
  'mfu-coin': {
    width: 13,
    height: 13
  },
  mfa: {
    width: 234,
    height: 48
  },
  'products-blurred': {
    width: 90,
    height: 50
  },
  'offer-background': {
    width: 156,
    height: 90
  },
  'additional-offer': {
    width: 29,
    height: 28
  },
  'payment-failure': {
    width: 24,
    height: 24
  },
  'mfa-no-text': {
    width: 49,
    height: 48
  },
  'scratchcard-icon': {
    width: 99,
    height: 70
  },
  giftwrap: {
    width: 203,
    height: 95
  },
  'positive-vote': {
    width: 48,
    height: 48
  },
  'insider-benefits-elite-v2': {
    width: 328,
    height: 258
  },
  'insider-benefits-icon-v2': {
    width: 328,
    height: 258
  }
};

const getBannerConfig = type => get(bannerConfig, type, {});

export default getBannerConfig;
