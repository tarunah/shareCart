import React from 'react';
import { act } from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import InsiderSuperCoinWidget from '.';
import FeaturesManager from 'commonUtils/FeaturesManager';

const componentProps = {
  insiderPointsClass: 'mobile-base-confirmationCard  mobile-base-cardBorder',
  isSavingInsiderEnabled: false,
  styleClass: 'mobile-base-confirmationCard  mobile-base-cardBorder',
  actionHandlers: {},
  dataState: {
    data: {
      bountyOrder: {
        type: 'Normal',
        createdOn: 1654149294000,
        storeOrderId: '120602766644153350102',
        displayStoreOrderId: '1206027-6664415-3350102',
        items: [
          {
            status: 'Q',
            styleId: 840374,
            skuId: 5794022,
            unitPrice: 899,
            quantity: 1,
            discountedQuantity: 0,
            sellerPartnerId: 4024,
            expectedCustomerPromiseTime: 1654889100000,
            supplyType: 'ON_HAND',
            shippingMethod: 'NORMAL',
            discountRuleId: 0,
            discountRuleRevId: 0,
            flags: {
              isTryAndBuy: false,
              isGiftCard: false,
              isOpenEndedExchangeOrder: false
            },
            payments: {
              amount: 89900,
              taxRate: 0,
              discounts: {
                cart: 0,
                coupon: 0,
                product: 0,
                cashback: 0
              },
              charges: {
                gst: 0
              }
            }
          }
        ],
        address: {
          id: 0,
          unifiedAddressId: '909456690:1'
        },
        payments: {
          ppsId: '6f97e8c3-f806-4cfc-b23f-179c881d5879',
          method: 'Cash On Delivery',
          mrp: 89900,
          amount: 99800,
          aggregateOrderAmount: 99800,
          couponCode: '',
          discounts: {
            cart: 0,
            coupon: 0,
            product: 0
          },
          charges: {
            shipping: 9900,
            gst: 0,
            giftwrapping: 0,
            cod: 0
          },
          instruments: {
            cashRedeemed: 0
          }
        }
      },
      productData: {
        styles: [{}, {}],
        skus: [5794022, null],
        styleOptions: [[null], [null]],
        taggableProductsCount: 0
      },
      delivery: {
        id: '909456690',
        user: {
          name: 'test',
          mobile: '9988776655'
        },
        streetAddress: '112, 5th block, 7th cross road, KHB Colony',
        locality: 'Koramangala',
        city: 'Bengaluru',
        state: {
          name: 'Karnataka',
          code: 'KA'
        },
        pincode: '560102',
        unifiedId: '909456690:1',
        addressType: ''
      },
      httpStatus: 200,
      profiles: []
    },
    loading: false,
    error: null,
    confirmationModal: {
      show: false,
      params: {}
    }
  },
  screenType: '',
  eligibilityAPILoaded: false,
  isEligibleForCard: {},
  mode: 'mobile'
};
let mockPointData = {
  enrolmentStatus: 'ENROLLED',
  orders: null,
  itemEntries: [
    {
      styleId: 14465866,
      amount: 1263.0,
      points: 39,
      basePoints: 13
    }
  ],
  newEnrollPoint: null,
  totalPoints: 39,
  errorMessage: null,
  isSupercoinEnabled: true,
  tierName: 'Icon',
  supercoinsMultiplier: 2.5,
  isMultiplierApplicable: true,
  totalBasePoints: 13
};
let mockInsiderDetailsData = {
  statusEntry: {
    statusCode: 1004,
    statusMessage: 'Retrieved successfully',
    statusType: 'SUCCESS'
  },
  data: {
    isInsider: true,
    isUserInsiderEligible: true,
    enrolmentStatus: 'ENROLLED',
    tierProgressInfo: {
      tierId: 2,
      tierName: 'Select',
      requiredAmountToRetain: 1239,
      requiredAmountToUpgradeToElite: 42,
      requiredAmountToUpgradeToIcon: 29239,
      tierProgressPercent: 57,
      opcAfterLastDowngradeCheck: null,
      netSpendAfterLastDowngradeCheck: null,
      nextTierCheckDateRetention: '2022-09-11T00:00:00',
      nextTierCheckDateUpgradation: '2022-03-10T00:00:00',
      tierUpgradeOrRetainFlag: 'UPGRADE',
      isMultiplierApplicable: false,
      supercoinsMultiplier: 1,
      isTrialUser: false
    },
    coinDetails: {
      superCoinBalance: null,
      totalDuePoints: null,
      lastOrderEarnedCoins: 22,
      coinsExpiring: null
    },
    savingsAndExperience: {
      totalSavings: 100,
      experienceCount: 0
    }
  }
};
const flushPromises = () => new Promise(setTimeout);

jest.mock('../../../../utils/ConfirmationManager', () => ({
  getInsiderDetails: () => mockInsiderDetailsData,
  getOrderPoints: () => mockPointData
}));

describe('insiderSuperCoinWidget renders', () => {
  it('should render the spinner', () => {
    const wrapper = shallow(<InsiderSuperCoinWidget {...componentProps} />);
    expect(wrapper.find('.superCoinLoader').length).toBe(1);
  });
});

describe('insiderSuperCoinWidget load complete', () => {
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
    document.cookie = 'ilgim=true';
  });

  afterAll(() => {
    mockInsiderDetailsData.data.tierProgressInfo.requiredAmountToUpgradeToElite = 20;
  });

  it('should render supercoin widget', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(<InsiderSuperCoinWidget {...componentProps} />);
      await flushPromises();
      wrapper.update();
      expect(wrapper.find('.insiderSuperCoinContainer').length).toBe(1);
    });
  });

  it('should not render progress bar component', async () => {
    let wrapper;
    mockInsiderDetailsData.data.tierProgressInfo.requiredAmountToUpgradeToElite = 20000;
    await act(async () => {
      wrapper = mount(<InsiderSuperCoinWidget {...componentProps} />);
      await flushPromises();
      wrapper.update();
      expect(wrapper.find('.superCoinProgressBar').length).toBe(0);
    });
  });
});

describe('should render updated states', () => {
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
    window.triggerEvent = () => {};
  });

  it('should render progress bar component once API has data', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(<InsiderSuperCoinWidget {...componentProps} />);
      await flushPromises();
      wrapper.update();
      expect(wrapper.find('.superCoinProgressBar').length).toBe(1);
    });
  });

  it('should toggle reward carousel height on click of Chevron with progress bar', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(<InsiderSuperCoinWidget {...componentProps} />);
      await flushPromises();
      wrapper.update();
      expect(wrapper.find('.superCoinProgressBar').length).toBe(1);
      expect(
        wrapper.find('.superCoinRewardsCarouselWrapper').prop('style')
      ).toMatchObject({ height: '0px' });
      wrapper.find('ChevronDown').simulate('click');
      await flushPromises();
      wrapper.update();
      expect(
        wrapper.find('.superCoinRewardsCarouselWrapper').prop('style')
      ).not.toMatchObject({ height: '0px' });
    });
  });
});

describe('should render for trial users', () => {
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
    window.triggerEvent = () => {};
  });

  it("should render not progress bar component, once API has data and it's a trial user", async () => {
    let wrapper;
    FeaturesManager.isFeatureEnabled = () => false;
    await act(async () => {
      wrapper = mount(<InsiderSuperCoinWidget {...componentProps} />);
      await flushPromises();
      wrapper.update();
      expect(wrapper.find('.superCoinProgressBar').length).toBe(1);
    });
  });

  it("should render progress bar component regardless, once API has data and it's a trial user", async () => {
    let wrapper;
    FeaturesManager.isFeatureEnabled = () => true;
    mockInsiderDetailsData.data.tierProgressInfo.requiredAmountToUpgradeToElite = 20000;
    mockInsiderDetailsData.data.tierProgressInfo.isTrialUser = true;
    await act(async () => {
      wrapper = mount(<InsiderSuperCoinWidget {...componentProps} />);
      await flushPromises();
      wrapper.update();
      expect(wrapper.find('.superCoinProgressBar').length).toBe(1);
    });
  });
});

describe('Failed API use case', () => {
  beforeAll(() => {
    mockInsiderDetailsData = null;
  });

  it('should render null if API has no data(error)', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(<InsiderSuperCoinWidget {...componentProps} />);
      await flushPromises();
      wrapper.update();
      expect(wrapper.find('.insiderSuperCoinContainer').length).toBe(0);
    });
  });

  afterAll(() => {
    mockInsiderDetailsData = {
      statusEntry: {
        statusCode: 1004,
        statusMessage: 'Retrieved successfully',
        statusType: 'SUCCESS'
      },
      data: {
        isInsider: true,
        isUserInsiderEligible: true,
        enrolmentStatus: 'ENROLLED',
        tierProgressInfo: {
          tierId: 2,
          tierName: 'Select',
          requiredAmountToRetain: 1239,
          requiredAmountToUpgradeToElite: 42,
          requiredAmountToUpgradeToIcon: 29239,
          tierProgressPercent: 57,
          opcAfterLastDowngradeCheck: null,
          netSpendAfterLastDowngradeCheck: null,
          nextTierCheckDateRetention: '2022-09-11T00:00:00',
          nextTierCheckDateUpgradation: '2022-03-10T00:00:00',
          tierUpgradeOrRetainFlag: 'UPGRADE',
          isMultiplierApplicable: false,
          supercoinsMultiplier: 1,
          isTrialUser: false
        },
        coinDetails: {
          superCoinBalance: null,
          totalDuePoints: null,
          lastOrderEarnedCoins: 22,
          coinsExpiring: null
        },
        savingsAndExperience: {
          totalSavings: 100,
          experienceCount: 0
        }
      }
    };
  });
});
