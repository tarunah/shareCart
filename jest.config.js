module.exports = {
  testURL: 'http://localhost/',
  setupFiles: ['jest-canvas-mock'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  moduleDirectories: ['node_modules', 'bower_components', 'shared'],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/(?!(@myntra/m-comp|@myntra/vision))'
  ],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    'commonBrowserUtils(.*)$': '<rootDir>/src/browser/utils$1',
    'customHooks(.*)$': '<rootDir>/src/browser/hooks$1',
    'commonUtils(.*)$': '<rootDir>/src/utils$1',
    'commonComp(.*)$': '<rootDir>/src/browser/components/common$1',
    'commonResources(.*)$': '<rootDir>/src/browser/components/resources$1',
    'testUtils(.*)$': '<rootDir>/testUtil/$1',
    'iconComp(.*)$': '<rootDir>/node_modules/@myntra/m-comp/react/SVGIcon$1',
    'vision(.*)$': '<rootDir>/node_modules/@myntra/vision/lib$1',
    '@context(.*)$': '<rootDir>/src/browser/context$1',
    '@config(.*)$': '<rootDir>/src/config$1'
  },
  setupTestFrameworkScriptFile: '<rootDir>/testUtil/setUpTests.js',
  collectCoverageFrom: [
    'src/browser/**/*.{js,jsx,ts,tsx}',
    '!src/browser/components/app/**/*.{js,jsx}',
    '!src/browser/components/resources/*.{js,jsx}',
    '!src/browser/entries/**/*.{js,jsx}',
    '!src/browser/routes/**/*.{js,jsx}',
    '!src/browser/utils/CartManager.js',
    '!src/browser/utils/AddressManager.js',
    '!src/browser/utils/DataStore/*',
    '!src/browser/utils/browserStatsdMiddleware.js',
    '!src/browser/utils/browserEventsListener.js',
    '!src/browser/utils/ConfirmationManager.js',
    '!src/browser/utils/TokenManager.js',
    '!src/browser/utils/PaymentsManager.js',
    '!src/browser/utils/CreditsManager.js',
    '!src/browser/utils/CartCountHandler.js',
    '!src/browser/components/cart/desktop/index.js',
    '!src/browser/components/cart/mobile/index.js',
    '!src/browser/components/common/Page.js',
    '!src/browser/components/common/Loadable/index.js',
    '!src/browser/components/common/ScrollToTop.js',
    '!src/browser/utils/analytics/g*.js',
    '!src/browser/components/cart/mobile/CartFiller/SizeChart/*',
    '!src/browser/components/confirmation/common/Carousel/CarouselLib.js',
    '!src/browser/components/payment/common/Options/index.js',
    '!src/browser/components/payment/desktop/PaymentOTP/index.js',
    '!src/browser/components/payment/mobile/PaymentOTP/index.js'
  ]
};
