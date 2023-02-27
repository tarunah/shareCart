export default {
  commonCartArgs: {
    isExchangeCart: false,
    loading: false,
    error: null,
    showExpressCheckoutHalfCard: false,
    cartModal: {
      show: false,
      params: {}
    },
    dynamicStyles: {
      highlightProductsSelection: false
    },
    userSelectedLocation: {
      pincode: '',
      addressInfo: {},
      addressNotFound: false
    },
    history: {
      length: 2,
      action: 'POP',
      location: {
        pathname: '/checkout/cart',
        search: '',
        hash: ''
      }
    }
  },
  normalCart: {
    id: '133b4d66-a487-4cfd-9851-6f02255a9e28',
    createdBy: 'automation-94048ece.8722.4ffc.b892.44cd564d53b99yxCLjNAzg',
    context: 'DEFAULT',
    count: 2,
    cartMergeState: 'MERGED',
    exchangeProductDetail: null,
    serviceability: {
      addressInfo: {
        country: {
          code: 'IN',
          name: 'India'
        },
        pincode: '122001'
      },
      serviceabilityFlags: {
        pincode: {
          value: true,
          remark: ''
        },
        standardShipping: {
          value: true,
          remark: ''
        },
        sddShipping: {
          value: false,
          remark: ''
        },
        expressShipping: {
          value: false,
          remark: ''
        },
        valueShipping: {
          value: false,
          remark: ''
        }
      },
      productDeliveryInfo: [
        {
          id: 7255937,
          image: {
            src:
              'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/973936/2016/11/18/11479474350259-Colorbar-Kiss-Proof-Haute-Latte-Lip-Stain-007-6091479474350165-1.jpg',
            secureSrc:
              'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/973936/2016/11/18/11479474350259-Colorbar-Kiss-Proof-Haute-Latte-Lip-Stain-007-6091479474350165-1.jpg'
          },
          tryNBuyInfo: {
            enabled: false,
            opted: false,
            serviceable: false
          },
          shippingEstimatesInDays: {
            standard: 17,
            valueShipping: 0,
            expressShipping: 0,
            sddShipping: 0
          }
        },
        {
          id: 47570,
          image: {
            src:
              'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/images/style/properties/Nike-Men-Grey-Melange-Track-Pants_ec04f71d66884cf587041154b74517c2_images.jpg',
            secureSrc:
              'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/images/style/properties/Nike-Men-Grey-Melange-Track-Pants_ec04f71d66884cf587041154b74517c2_images.jpg'
          },
          tryNBuyInfo: {
            enabled: true,
            opted: false,
            serviceable: true
          },
          shippingEstimatesInDays: {
            standard: 17,
            valueShipping: 0,
            expressShipping: 0,
            sddShipping: 0
          }
        }
      ],
      valueShippingInfo: {
        flags: {
          cashOnDelivery: {
            value: false,
            remark: ''
          },
          cardOnDelivery: {
            value: false,
            remark: ''
          },
          tryNBuy: {
            value: false,
            remark: ''
          }
        },
        deliveryPromise: {
          minDays: 0,
          maxDays: 0,
          time: '0'
        }
      },
      sddShippingInfo: {
        deliveryPromise: {
          minDays: 0,
          maxDays: 0,
          time: '0'
        },
        cutoff: {
          time: '0',
          timeInMinutes: '0'
        },
        flags: {
          cashOnDelivery: {
            value: false,
            remark: ''
          },
          cardOnDelivery: {
            value: false,
            remark: ''
          },
          tryNBuy: {
            value: false,
            remark: ''
          }
        }
      },
      expressShippingInfo: {
        deliveryPromise: {
          minDays: 0,
          maxDays: 0,
          time: '0'
        },
        cutoff: {
          time: '0',
          timeInMinutes: '0'
        },
        flags: {
          cashOnDelivery: {
            value: false,
            remark: ''
          },
          cardOnDelivery: {
            value: false,
            remark: ''
          },
          tryNBuy: {
            value: false,
            remark: ''
          }
        }
      },
      standardShippingInfo: {
        deliveryPromise: {
          minDays: 17,
          maxDays: 17,
          time: '0'
        },
        flags: {
          cashOnDelivery: {
            value: true,
            remark: ''
          },
          cardOnDelivery: {
            value: true,
            remark: ''
          },
          tryNBuy: {
            value: false,
            remark: ''
          }
        }
      }
    },
    giftOrder: {
      active: false,
      data: null
    },
    createdAt: '1626331138183',
    modifiedAt: '1626677959519',
    conflict: {
      state: 'NOT_CONFLICTED',
      oldPrice: 0,
      price: {
        state: 'NOT_CONFLICTED',
        oldPrice: 0
      },
      seller: {
        state: 'NOT_CONFLICTED',
        oldSeller: null
      }
    },
    flags: {
      cashbackApplicable: {
        value: false,
        remark: ''
      },
      walletApplicable: {
        value: false,
        remark: ''
      },
      loyaltyPointsApplicable: {
        value: true,
        remark: ''
      },
      giftwrapApplicable: {
        value: true,
        remark: ''
      },
      giftcardApplicable: {
        value: true,
        remark: ''
      },
      tryNBuyApplicable: {
        value: true,
        remark: 'NO_ISSUE'
      },
      valueShippingApplicable: {
        value: true,
        remark: ''
      },
      valueReturnApplicable: {
        value: false,
        remark: ''
      },
      checkoutReady: {
        value: true,
        remark: 'ALL_OK'
      },
      myntApplicable: {
        value: false,
        remark: ''
      },
      coverFeeApplicable: {
        value: false,
        remark: 'No Active CoverFee charge found for tenant 2297'
      },
      codChargeApplicable: {
        value: false,
        remark: ''
      }
    },
    shippingData: {
      method: 'NORMAL',
      text: '',
      meta: {
        minMore: '',
        shippingLimit: '',
        info: '',
        categories: ''
      },
      shippingApplicableCharge: 99,
      shippingChargeLimit: 1201
    },
    price: {
      mrp: 4000,
      totalSavings: 0,
      total: 4000,
      subTotal: 4000,
      userAction: 'PAY',
      effectiveExchangeItemPrice: 0,
      effectiveTotalPrice: 4000,
      discounts: {
        data: [
          {
            name: 'discount',
            value: 0,
            meta: null,
            effectiveDiscountValue: 0,
            effectiveDiscountMeta: null
          },
          {
            name: 'mynts',
            value: 0,
            meta: null,
            effectiveDiscountValue: 0,
            effectiveDiscountMeta: null
          },
          {
            name: 'coupon',
            value: 0,
            meta: null,
            effectiveDiscountValue: 0,
            effectiveDiscountMeta: null
          },
          {
            name: 'bag',
            value: 0,
            meta: null,
            effectiveDiscountValue: 0,
            effectiveDiscountMeta: null
          }
        ]
      },
      charges: {
        data: [
          {
            name: 'tax',
            value: 0
          }
        ]
      },
      instruments: {
        data: [
          {
            name: 'loyaltypoints',
            value: 0
          },
          {
            name: 'giftcard',
            value: 0
          }
        ]
      }
    },
    coupons: [],
    applicableCoupons: [],
    potentialCoupons: [],
    attachedProductOffers: {
      appliedOffers: [],
      applicableOffers: [],
      totalOfferAmount: 0
    },
    products: [
      {
        id: 10011,
        selectedForCheckout: true,
        name: 'Nike Men Grey Melange Track Pants',
        brand: 'Nike',
        gender: 'Men',
        itemAddTime: 1626331138,
        skuId: 47570,
        itemId: 1626308738,
        articleType: 'Clutches',
        articleTypeId: 45,
        masterCategoryTypeName: 'Accessories',
        masterCategoryTypeCode: 'ACCESSORIES',
        quantity: 1,
        activeSlot: 0,
        landingPageUrl:
          'Clutches/Nike/Nike-Men-Grey-Melange-Track-Pants/10011/buy',
        tryAndBuyOpted: false,
        returnPeriod: 30,
        valueReturnOpted: false,
        valueReturnApplicableDiscount: 0,
        styleOffers: [],
        appliedCoupons: [],
        personalisedPricing: {
          coupon: '',
          discount: 0
        },
        virtualBundleInfo: {
          virtualBundleConflict: false,
          virtualConflictItemId: 0
        },
        discountInfo: {
          type: null,
          text: null
        },
        conflict: {
          state: 'NOT_CONFLICTED',
          oldPrice: 3500,
          price: {
            state: 'NOT_CONFLICTED',
            oldPrice: 3500
          },
          seller: {
            state: 'NOT_CONFLICTED',
            oldSeller: null
          }
        },
        images: [
          {
            src:
              'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/images/style/properties/Nike-Men-Grey-Melange-Track-Pants_ec04f71d66884cf587041154b74517c2_images.jpg',
            secureSrc:
              'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/images/style/properties/Nike-Men-Grey-Melange-Track-Pants_ec04f71d66884cf587041154b74517c2_images.jpg'
          }
        ],
        flags: {
          exchangeable: true,
          returnable: true,
          pickupEnabled: true,
          tryable: true,
          large: false,
          hazmat: false,
          fragile: false,
          jewellery: false,
          couponApplicable: false,
          codEnabled: true,
          comforter: false,
          personalised: false,
          preOrderEnabled: false,
          myntsEnabled: true,
          freeItem: false,
          preLaunchProduct: false
        },
        selectedSeller: {
          id: 21,
          partnerId: 4024,
          name: 'Health & Happiness',
          inventory: 10,
          warehouses: '28,36',
          supplyType: 'ON_HAND'
        },
        sizes: [
          {
            label: 'S',
            skuId: 47569,
            available: true,
            inventory: 10,
            sellers: [
              {
                seller: {
                  id: 21,
                  partnerId: 4024,
                  name: 'Health & Happiness',
                  inventory: 10,
                  warehouses: '28,36',
                  supplyType: 'ON_HAND'
                },
                price: {
                  mrp: 3500,
                  subTotal: 3500,
                  discountText: ''
                }
              }
            ]
          },
          {
            label: 'M',
            skuId: 47570,
            available: true,
            inventory: 10,
            sellers: [
              {
                seller: {
                  id: 21,
                  partnerId: 4024,
                  name: 'Health & Happiness',
                  inventory: 10,
                  warehouses: '28,36',
                  supplyType: 'ON_HAND'
                },
                price: {
                  mrp: 3500,
                  subTotal: 3500,
                  discountText: ''
                }
              }
            ]
          },
          {
            label: 'L',
            skuId: 47571,
            available: true,
            inventory: 10,
            sellers: [
              {
                seller: {
                  id: 21,
                  partnerId: 4024,
                  name: 'Health & Happiness',
                  inventory: 10,
                  warehouses: '28,36',
                  supplyType: 'ON_HAND'
                },
                price: {
                  mrp: 3500,
                  subTotal: 3500,
                  discountText: ''
                }
              }
            ]
          },
          {
            label: 'XL',
            skuId: 47572,
            available: false,
            inventory: 0,
            sellers: []
          },
          {
            label: 'XXL',
            skuId: 47573,
            available: false,
            inventory: 0,
            sellers: []
          }
        ],
        price: {
          mrp: 3500,
          total: 3500,
          subTotal: 3500,
          discounts: {
            data: [
              {
                name: 'discount',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'coupon',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'bag',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'personalised',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              }
            ]
          },
          charges: {
            data: [
              {
                name: 'tax',
                value: 0
              },
              {
                name: 'mrp',
                value: 3500
              }
            ]
          },
          instruments: {
            data: [
              {
                name: 'loyaltypoints',
                value: 0
              },
              {
                name: 'giftcard',
                value: 0
              }
            ]
          }
        },
        offerId: '',
        urgencyInfo: {
          pdpCount: 0,
          pdpCountPtile: 0,
          addToCollectionCount: 0,
          addToCollectionCountPtile: 0,
          addToCartCount: 0,
          addToCartCountPtile: 0,
          quantitySold: 0,
          quantitySoldPtile: 0,
          values: [],
          displayOnCart: false
        },
        systemAttributes: [
          {
            attribute: 'Printed Denims',
            value: 'Printed Denims'
          },
          {
            attribute: 'SA_XT_LimitedStock',
            value: 'LimitedStock'
          }
        ],
        giftCardConfig: '',
        productServiceabilityInfo: {
          pincodeInfo: {
            serviceable: true,
            shippingEstimatesInDays: {
              sddShipping: 0,
              expressShipping: 0,
              valueShipping: 0,
              standard: 17
            }
          },
          tryNBuyAvailable: true,
          alterationAvailable: false
        }
      },
      {
        id: 973936,
        selectedForCheckout: true,
        name: 'Colorbar Kiss Proof Haute Latte Lip Stain 007',
        brand: 'Colorbar',
        gender: 'Women',
        itemAddTime: 1626419286,
        skuId: 7255937,
        itemId: 1626540294,
        articleType: 'Lipstick',
        articleTypeId: 234,
        masterCategoryTypeName: 'Personal Care',
        masterCategoryTypeCode: 'PERSONAL_CARE',
        quantity: 1,
        activeSlot: 0,
        landingPageUrl:
          'Lipstick/Colorbar/Colorbar-Kiss-Proof-Haute-Latte-Lip-Stain-007/973936/buy',
        tryAndBuyOpted: false,
        returnPeriod: 30,
        valueReturnOpted: false,
        valueReturnApplicableDiscount: 0,
        styleOffers: [],
        appliedCoupons: [],
        personalisedPricing: {
          coupon: '',
          discount: 0
        },
        virtualBundleInfo: {
          virtualBundleConflict: false,
          virtualConflictItemId: 0
        },
        discountInfo: {
          type: null,
          text: null
        },
        conflict: {
          state: 'NOT_CONFLICTED',
          oldPrice: 500,
          price: {
            state: 'NOT_CONFLICTED',
            oldPrice: 500
          },
          seller: {
            state: 'NOT_CONFLICTED',
            oldSeller: null
          }
        },
        images: [
          {
            src:
              'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/973936/2016/11/18/11479474350259-Colorbar-Kiss-Proof-Haute-Latte-Lip-Stain-007-6091479474350165-1.jpg',
            secureSrc:
              'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/973936/2016/11/18/11479474350259-Colorbar-Kiss-Proof-Haute-Latte-Lip-Stain-007-6091479474350165-1.jpg'
          }
        ],
        flags: {
          exchangeable: false,
          returnable: false,
          pickupEnabled: true,
          tryable: false,
          large: false,
          hazmat: false,
          fragile: false,
          jewellery: false,
          couponApplicable: false,
          codEnabled: true,
          comforter: false,
          personalised: false,
          preOrderEnabled: false,
          myntsEnabled: true,
          freeItem: false,
          preLaunchProduct: false
        },
        selectedSeller: {
          id: 21,
          partnerId: 4024,
          name: 'Health & Happiness',
          inventory: 10,
          warehouses: '36',
          supplyType: 'ON_HAND'
        },
        sizes: [
          {
            label: 'Onesize',
            skuId: 7255937,
            available: true,
            inventory: 10,
            sellers: [
              {
                seller: {
                  id: 500,
                  partnerId: 8,
                  name: 'Benetton India Pvt. Ltd',
                  inventory: 10,
                  warehouses: '36',
                  supplyType: 'JUST_IN_TIME'
                },
                price: {
                  mrp: 500,
                  subTotal: 500,
                  discountText: ''
                }
              },
              {
                seller: {
                  id: 21,
                  partnerId: 4024,
                  name: 'Health & Happiness',
                  inventory: 10,
                  warehouses: '36',
                  supplyType: 'ON_HAND'
                },
                price: {
                  mrp: 500,
                  subTotal: 500,
                  discountText: ''
                }
              }
            ]
          }
        ],
        price: {
          mrp: 500,
          total: 500,
          subTotal: 500,
          discounts: {
            data: [
              {
                name: 'discount',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'coupon',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'bag',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'personalised',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              }
            ]
          },
          charges: {
            data: [
              {
                name: 'tax',
                value: 0
              },
              {
                name: 'mrp',
                value: 500
              }
            ]
          },
          instruments: {
            data: [
              {
                name: 'loyaltypoints',
                value: 0
              },
              {
                name: 'giftcard',
                value: 0
              }
            ]
          }
        },
        offerId: '',
        urgencyInfo: {
          pdpCount: 0,
          pdpCountPtile: 0,
          addToCollectionCount: 0,
          addToCollectionCountPtile: 0,
          addToCartCount: 0,
          addToCartCountPtile: 0,
          quantitySold: 0,
          quantitySoldPtile: 0,
          values: [],
          displayOnCart: false
        },
        systemAttributes: [],
        giftCardConfig: '',
        productServiceabilityInfo: {
          pincodeInfo: {
            serviceable: true,
            shippingEstimatesInDays: {
              sddShipping: 0,
              expressShipping: 0,
              valueShipping: 0,
              standard: 17
            }
          },
          tryNBuyAvailable: false,
          alterationAvailable: false
        }
      }
    ],
    offers: [],
    virtualBundleConflict: false,
    coverFeeOpted: false,
    orderAddressId: 909454041,
    userDetails: {
      isReturnAbuser: false,
      returnAbuser: {
        level: 'DEFAULT',
        type: 'DEFAULT',
        showTnc: false,
        returns: '',
        multiplier: ''
      },
      email: {
        isFake: false
      },
      cod: {
        minCod: 299,
        maxCod: 24999
      },
      isFakeEmail: false,
      minCOD: 299,
      maxCOD: 24999,
      reasonCOD: '',
      isFirstTimeCustomer: false,
      isUserSlotActive: false
    },
    codOpted: false,
    codApplicableCharge: 0,
    coverFeeApplicableCharge: 0,
    unifiedAddressId: '909454041:46'
  },
  oosCart: {
    id: '133b4d66-a487-4cfd-9851-6f02255a9e28',
    createdBy: 'automation-94048ece.8722.4ffc.b892.44cd564d53b99yxCLjNAzg',
    context: 'DEFAULT',
    count: 2,
    cartMergeState: 'MERGED',
    exchangeProductDetail: null,
    serviceability: {
      addressInfo: {
        country: {
          code: 'IN',
          name: 'India'
        },
        pincode: '122001'
      },
      serviceabilityFlags: {
        pincode: {
          value: true,
          remark: ''
        },
        standardShipping: {
          value: true,
          remark: ''
        },
        sddShipping: {
          value: false,
          remark: ''
        },
        expressShipping: {
          value: false,
          remark: ''
        },
        valueShipping: {
          value: false,
          remark: ''
        }
      },
      productDeliveryInfo: [
        {
          id: 7255937,
          image: {
            src:
              'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/973936/2016/11/18/11479474350259-Colorbar-Kiss-Proof-Haute-Latte-Lip-Stain-007-6091479474350165-1.jpg',
            secureSrc:
              'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/973936/2016/11/18/11479474350259-Colorbar-Kiss-Proof-Haute-Latte-Lip-Stain-007-6091479474350165-1.jpg'
          },
          tryNBuyInfo: {
            enabled: false,
            opted: false,
            serviceable: false
          },
          shippingEstimatesInDays: {
            standard: 17,
            valueShipping: 0,
            expressShipping: 0,
            sddShipping: 0
          }
        },
        {
          id: 47570,
          image: {
            src:
              'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/images/style/properties/Nike-Men-Grey-Melange-Track-Pants_ec04f71d66884cf587041154b74517c2_images.jpg',
            secureSrc:
              'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/images/style/properties/Nike-Men-Grey-Melange-Track-Pants_ec04f71d66884cf587041154b74517c2_images.jpg'
          },
          tryNBuyInfo: {
            enabled: true,
            opted: false,
            serviceable: true
          },
          shippingEstimatesInDays: {
            standard: 17,
            valueShipping: 0,
            expressShipping: 0,
            sddShipping: 0
          }
        }
      ],
      valueShippingInfo: {
        flags: {
          cashOnDelivery: {
            value: false,
            remark: ''
          },
          cardOnDelivery: {
            value: false,
            remark: ''
          },
          tryNBuy: {
            value: false,
            remark: ''
          }
        },
        deliveryPromise: {
          minDays: 0,
          maxDays: 0,
          time: '0'
        }
      },
      sddShippingInfo: {
        deliveryPromise: {
          minDays: 0,
          maxDays: 0,
          time: '0'
        },
        cutoff: {
          time: '0',
          timeInMinutes: '0'
        },
        flags: {
          cashOnDelivery: {
            value: false,
            remark: ''
          },
          cardOnDelivery: {
            value: false,
            remark: ''
          },
          tryNBuy: {
            value: false,
            remark: ''
          }
        }
      },
      expressShippingInfo: {
        deliveryPromise: {
          minDays: 0,
          maxDays: 0,
          time: '0'
        },
        cutoff: {
          time: '0',
          timeInMinutes: '0'
        },
        flags: {
          cashOnDelivery: {
            value: false,
            remark: ''
          },
          cardOnDelivery: {
            value: false,
            remark: ''
          },
          tryNBuy: {
            value: false,
            remark: ''
          }
        }
      },
      standardShippingInfo: {
        deliveryPromise: {
          minDays: 17,
          maxDays: 17,
          time: '0'
        },
        flags: {
          cashOnDelivery: {
            value: true,
            remark: ''
          },
          cardOnDelivery: {
            value: true,
            remark: ''
          },
          tryNBuy: {
            value: false,
            remark: ''
          }
        }
      }
    },
    giftOrder: {
      active: false,
      data: null
    },
    createdAt: '1626331138183',
    modifiedAt: '1626677959519',
    conflict: {
      state: 'NOT_CONFLICTED',
      oldPrice: 0,
      price: {
        state: 'NOT_CONFLICTED',
        oldPrice: 0
      },
      seller: {
        state: 'NOT_CONFLICTED',
        oldSeller: null
      }
    },
    flags: {
      cashbackApplicable: {
        value: false,
        remark: ''
      },
      walletApplicable: {
        value: false,
        remark: ''
      },
      loyaltyPointsApplicable: {
        value: true,
        remark: ''
      },
      giftwrapApplicable: {
        value: true,
        remark: ''
      },
      giftcardApplicable: {
        value: true,
        remark: ''
      },
      tryNBuyApplicable: {
        value: true,
        remark: 'NO_ISSUE'
      },
      valueShippingApplicable: {
        value: true,
        remark: ''
      },
      valueReturnApplicable: {
        value: false,
        remark: ''
      },
      checkoutReady: {
        value: true,
        remark: 'ALL_OK'
      },
      myntApplicable: {
        value: false,
        remark: ''
      },
      coverFeeApplicable: {
        value: false,
        remark: 'No Active CoverFee charge found for tenant 2297'
      },
      codChargeApplicable: {
        value: false,
        remark: ''
      }
    },
    shippingData: {
      method: 'NORMAL',
      text: '',
      meta: {
        minMore: '',
        shippingLimit: '',
        info: '',
        categories: ''
      },
      shippingApplicableCharge: 99,
      shippingChargeLimit: 1201
    },
    price: {
      mrp: 4000,
      totalSavings: 0,
      total: 4000,
      subTotal: 4000,
      userAction: 'PAY',
      effectiveExchangeItemPrice: 0,
      effectiveTotalPrice: 4000,
      discounts: {
        data: [
          {
            name: 'discount',
            value: 0,
            meta: null,
            effectiveDiscountValue: 0,
            effectiveDiscountMeta: null
          },
          {
            name: 'mynts',
            value: 0,
            meta: null,
            effectiveDiscountValue: 0,
            effectiveDiscountMeta: null
          },
          {
            name: 'coupon',
            value: 0,
            meta: null,
            effectiveDiscountValue: 0,
            effectiveDiscountMeta: null
          },
          {
            name: 'bag',
            value: 0,
            meta: null,
            effectiveDiscountValue: 0,
            effectiveDiscountMeta: null
          }
        ]
      },
      charges: {
        data: [
          {
            name: 'tax',
            value: 0
          }
        ]
      },
      instruments: {
        data: [
          {
            name: 'loyaltypoints',
            value: 0
          },
          {
            name: 'giftcard',
            value: 0
          }
        ]
      }
    },
    coupons: [],
    applicableCoupons: [],
    potentialCoupons: [],
    attachedProductOffers: {
      appliedOffers: [],
      applicableOffers: [],
      totalOfferAmount: 0
    },
    products: [
      {
        id: 10011,
        selectedForCheckout: true,
        name: 'Nike Men Grey Melange Track Pants',
        brand: 'Nike',
        gender: 'Men',
        itemAddTime: 1626331138,
        skuId: 47570,
        itemId: 1626308738,
        articleType: 'Clutches',
        articleTypeId: 45,
        masterCategoryTypeName: 'Accessories',
        masterCategoryTypeCode: 'ACCESSORIES',
        quantity: 1,
        activeSlot: 0,
        landingPageUrl:
          'Clutches/Nike/Nike-Men-Grey-Melange-Track-Pants/10011/buy',
        tryAndBuyOpted: false,
        returnPeriod: 30,
        valueReturnOpted: false,
        valueReturnApplicableDiscount: 0,
        styleOffers: [],
        appliedCoupons: [],
        personalisedPricing: {
          coupon: '',
          discount: 0
        },
        virtualBundleInfo: {
          virtualBundleConflict: false,
          virtualConflictItemId: 0
        },
        discountInfo: {
          type: null,
          text: null
        },
        conflict: {
          state: 'NOT_CONFLICTED',
          oldPrice: 3500,
          price: {
            state: 'NOT_CONFLICTED',
            oldPrice: 3500
          },
          seller: {
            state: 'NOT_CONFLICTED',
            oldSeller: null
          }
        },
        images: [
          {
            src:
              'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/images/style/properties/Nike-Men-Grey-Melange-Track-Pants_ec04f71d66884cf587041154b74517c2_images.jpg',
            secureSrc:
              'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/images/style/properties/Nike-Men-Grey-Melange-Track-Pants_ec04f71d66884cf587041154b74517c2_images.jpg'
          }
        ],
        flags: {
          exchangeable: true,
          returnable: true,
          pickupEnabled: true,
          tryable: true,
          large: false,
          hazmat: false,
          fragile: false,
          jewellery: false,
          couponApplicable: false,
          codEnabled: true,
          comforter: false,
          personalised: false,
          preOrderEnabled: false,
          myntsEnabled: true,
          freeItem: false,
          preLaunchProduct: false
        },
        selectedSeller: {
          id: 21,
          partnerId: 4024,
          name: 'Health & Happiness',
          inventory: 10,
          warehouses: '28,36',
          supplyType: 'ON_HAND'
        },
        sizes: [
          {
            label: 'S',
            skuId: 47569,
            available: true,
            inventory: 10,
            sellers: [
              {
                seller: {
                  id: 21,
                  partnerId: 4024,
                  name: 'Health & Happiness',
                  inventory: 10,
                  warehouses: '28,36',
                  supplyType: 'ON_HAND'
                },
                price: {
                  mrp: 3500,
                  subTotal: 3500,
                  discountText: ''
                }
              }
            ]
          },
          {
            label: 'M',
            skuId: 47570,
            available: true,
            inventory: 10,
            sellers: [
              {
                seller: {
                  id: 21,
                  partnerId: 4024,
                  name: 'Health & Happiness',
                  inventory: 10,
                  warehouses: '28,36',
                  supplyType: 'ON_HAND'
                },
                price: {
                  mrp: 3500,
                  subTotal: 3500,
                  discountText: ''
                }
              }
            ]
          },
          {
            label: 'L',
            skuId: 47571,
            available: true,
            inventory: 10,
            sellers: [
              {
                seller: {
                  id: 21,
                  partnerId: 4024,
                  name: 'Health & Happiness',
                  inventory: 10,
                  warehouses: '28,36',
                  supplyType: 'ON_HAND'
                },
                price: {
                  mrp: 3500,
                  subTotal: 3500,
                  discountText: ''
                }
              }
            ]
          },
          {
            label: 'XL',
            skuId: 47572,
            available: false,
            inventory: 0,
            sellers: []
          },
          {
            label: 'XXL',
            skuId: 47573,
            available: false,
            inventory: 0,
            sellers: []
          }
        ],
        price: {
          mrp: 3500,
          total: 3500,
          subTotal: 3500,
          discounts: {
            data: [
              {
                name: 'discount',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'coupon',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'bag',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'personalised',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              }
            ]
          },
          charges: {
            data: [
              {
                name: 'tax',
                value: 0
              },
              {
                name: 'mrp',
                value: 3500
              }
            ]
          },
          instruments: {
            data: [
              {
                name: 'loyaltypoints',
                value: 0
              },
              {
                name: 'giftcard',
                value: 0
              }
            ]
          }
        },
        offerId: '',
        urgencyInfo: {
          pdpCount: 0,
          pdpCountPtile: 0,
          addToCollectionCount: 0,
          addToCollectionCountPtile: 0,
          addToCartCount: 0,
          addToCartCountPtile: 0,
          quantitySold: 0,
          quantitySoldPtile: 0,
          values: [],
          displayOnCart: false
        },
        systemAttributes: [
          {
            attribute: 'Printed Denims',
            value: 'Printed Denims'
          },
          {
            attribute: 'SA_XT_LimitedStock',
            value: 'LimitedStock'
          }
        ],
        giftCardConfig: '',
        productServiceabilityInfo: {
          pincodeInfo: {
            serviceable: true,
            shippingEstimatesInDays: {
              sddShipping: 0,
              expressShipping: 0,
              valueShipping: 0,
              standard: 17
            }
          },
          tryNBuyAvailable: true,
          alterationAvailable: false
        }
      },
      {
        id: 973936,
        selectedForCheckout: true,
        name: 'Colorbar Kiss Proof Haute Latte Lip Stain 007',
        brand: 'Colorbar',
        gender: 'Women',
        itemAddTime: 1626419286,
        skuId: 7255937,
        itemId: 1626540294,
        articleType: 'Lipstick',
        articleTypeId: 234,
        masterCategoryTypeName: 'Personal Care',
        masterCategoryTypeCode: 'PERSONAL_CARE',
        quantity: 1,
        activeSlot: 0,
        landingPageUrl:
          'Lipstick/Colorbar/Colorbar-Kiss-Proof-Haute-Latte-Lip-Stain-007/973936/buy',
        tryAndBuyOpted: false,
        returnPeriod: 30,
        valueReturnOpted: false,
        valueReturnApplicableDiscount: 0,
        styleOffers: [],
        appliedCoupons: [],
        personalisedPricing: {
          coupon: '',
          discount: 0
        },
        virtualBundleInfo: {
          virtualBundleConflict: false,
          virtualConflictItemId: 0
        },
        discountInfo: {
          type: null,
          text: null
        },
        conflict: {
          state: 'NOT_CONFLICTED',
          oldPrice: 500,
          price: {
            state: 'NOT_CONFLICTED',
            oldPrice: 500
          },
          seller: {
            state: 'NOT_CONFLICTED',
            oldSeller: null
          }
        },
        images: [
          {
            src:
              'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/973936/2016/11/18/11479474350259-Colorbar-Kiss-Proof-Haute-Latte-Lip-Stain-007-6091479474350165-1.jpg',
            secureSrc:
              'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/973936/2016/11/18/11479474350259-Colorbar-Kiss-Proof-Haute-Latte-Lip-Stain-007-6091479474350165-1.jpg'
          }
        ],
        flags: {
          exchangeable: false,
          returnable: false,
          pickupEnabled: true,
          tryable: false,
          large: false,
          hazmat: false,
          fragile: false,
          jewellery: false,
          couponApplicable: false,
          codEnabled: true,
          comforter: false,
          personalised: false,
          preOrderEnabled: false,
          myntsEnabled: true,
          freeItem: false,
          preLaunchProduct: false
        },
        selectedSeller: {
          id: 21,
          partnerId: 4024,
          name: 'Health & Happiness',
          inventory: 10,
          warehouses: '36',
          supplyType: 'ON_HAND'
        },
        sizes: [],
        price: {
          mrp: 500,
          total: 500,
          subTotal: 500,
          discounts: {
            data: [
              {
                name: 'discount',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'coupon',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'bag',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'personalised',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              }
            ]
          },
          charges: {
            data: [
              {
                name: 'tax',
                value: 0
              },
              {
                name: 'mrp',
                value: 500
              }
            ]
          },
          instruments: {
            data: [
              {
                name: 'loyaltypoints',
                value: 0
              },
              {
                name: 'giftcard',
                value: 0
              }
            ]
          }
        },
        offerId: '',
        urgencyInfo: {
          pdpCount: 0,
          pdpCountPtile: 0,
          addToCollectionCount: 0,
          addToCollectionCountPtile: 0,
          addToCartCount: 0,
          addToCartCountPtile: 0,
          quantitySold: 0,
          quantitySoldPtile: 0,
          values: [],
          displayOnCart: false
        },
        systemAttributes: [],
        giftCardConfig: '',
        productServiceabilityInfo: {
          pincodeInfo: {
            serviceable: true,
            shippingEstimatesInDays: {
              sddShipping: 0,
              expressShipping: 0,
              valueShipping: 0,
              standard: 17
            }
          },
          tryNBuyAvailable: false,
          alterationAvailable: false
        }
      }
    ],
    offers: [],
    virtualBundleConflict: false,
    coverFeeOpted: false,
    orderAddressId: 909454041,
    userDetails: {
      isReturnAbuser: false,
      returnAbuser: {
        level: 'DEFAULT',
        type: 'DEFAULT',
        showTnc: false,
        returns: '',
        multiplier: ''
      },
      email: {
        isFake: false
      },
      cod: {
        minCod: 299,
        maxCod: 24999
      },
      isFakeEmail: false,
      minCOD: 299,
      maxCOD: 24999,
      reasonCOD: '',
      isFirstTimeCustomer: false,
      isUserSlotActive: false
    },
    codOpted: false,
    codApplicableCharge: 0,
    coverFeeApplicableCharge: 0,
    unifiedAddressId: '909454041:46'
  },
  frgCart: {
    id: '0947f60c-908e-4c70-8478-5461456e8a37',
    createdBy: '8b0aa082.3b1b.458b.816a.0bd02ac3738ar22rinQyyJ',
    context: 'DEFAULT',
    count: 4,
    cartMergeState: 'NOT_MERGED',
    exchangeProductDetail: null,
    serviceability: {
      addressInfo: {
        country: {
          code: 'IN',
          name: 'India'
        },
        pincode: '600122'
      },
      serviceabilityFlags: {
        pincode: {
          value: true,
          remark: ''
        },
        standardShipping: {
          value: true,
          remark: ''
        },
        sddShipping: {
          value: false,
          remark: ''
        },
        expressShipping: {
          value: false,
          remark: ''
        },
        valueShipping: {
          value: true,
          remark: ''
        }
      },
      productDeliveryInfo: [
        {
          id: 49195444,
          image: {
            src:
              'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/14976922/2021/10/8/3f956f6e-151a-4285-a1b6-80b69142826a1633673105474-Bobbi-Brown-Set-of-4-Sweet-Indulgences-Mini-Lip-Gloss-894163-1.jpg',
            secureSrc:
              'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/14976922/2021/10/8/3f956f6e-151a-4285-a1b6-80b69142826a1633673105474-Bobbi-Brown-Set-of-4-Sweet-Indulgences-Mini-Lip-Gloss-894163-1.jpg'
          },
          tryNBuyInfo: {
            enabled: false,
            opted: false,
            serviceable: false
          },
          shippingEstimates: [
            {
              shippingMethod: 'NORMAL',
              promiseDate: '1635629400000',
              orderBy: '1635629400000'
            },
            {
              shippingMethod: 'VALUE_SHIPPING',
              promiseDate: '1636147800000',
              orderBy: '1636147800000'
            }
          ],
          shippingEstimatesInDays: {
            standard: 0,
            valueShipping: 0,
            expressShipping: 0,
            sddShipping: 0
          }
        },
        {
          id: 44965236,
          image: {
            src:
              'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/12857090/2021/3/23/cf9f735b-973d-4adc-b151-c4c7bb7186921616482767835-ethnix-Men-Kurtas-3091616482766956-1.jpg',
            secureSrc:
              'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/12857090/2021/3/23/cf9f735b-973d-4adc-b151-c4c7bb7186921616482767835-ethnix-Men-Kurtas-3091616482766956-1.jpg'
          },
          tryNBuyInfo: {
            enabled: true,
            opted: false,
            serviceable: false
          },
          shippingEstimates: [
            {
              shippingMethod: 'NORMAL',
              promiseDate: '1636155000000',
              orderBy: '1636155000000'
            },
            {
              shippingMethod: 'VALUE_SHIPPING',
              promiseDate: '1636540260000',
              orderBy: '1636540260000'
            }
          ],
          shippingEstimatesInDays: {
            standard: 0,
            valueShipping: 0,
            expressShipping: 0,
            sddShipping: 0
          }
        },
        {
          id: 50632706,
          image: {
            src:
              'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/15808986/2021/10/14/46351e8e-913a-49f3-9f87-ceecb60ee7411634149960622RelaxedFitSweatshirt1.jpg',
            secureSrc:
              'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/15808986/2021/10/14/46351e8e-913a-49f3-9f87-ceecb60ee7411634149960622RelaxedFitSweatshirt1.jpg'
          },
          tryNBuyInfo: {
            enabled: true,
            opted: false,
            serviceable: false
          },
          shippingEstimates: [
            {
              shippingMethod: 'NORMAL',
              promiseDate: '1636281060000',
              orderBy: '1636281060000'
            }
          ],
          shippingEstimatesInDays: {
            standard: 0,
            valueShipping: 0,
            expressShipping: 0,
            sddShipping: 0
          }
        }
      ],
      valueShippingInfo: {
        flags: {
          cashOnDelivery: {
            value: true,
            remark: ''
          },
          cardOnDelivery: {
            value: true,
            remark: ''
          },
          tryNBuy: {
            value: false,
            remark: ''
          }
        },
        deliveryPromise: {
          minDays: 9,
          maxDays: 14,
          time: '0'
        }
      },
      sddShippingInfo: {
        deliveryPromise: {
          minDays: 0,
          maxDays: 0,
          time: '0'
        },
        cutoff: {
          time: '0',
          timeInMinutes: '0'
        },
        flags: {
          cashOnDelivery: {
            value: false,
            remark: ''
          },
          cardOnDelivery: {
            value: false,
            remark: ''
          },
          tryNBuy: {
            value: false,
            remark: ''
          }
        }
      },
      expressShippingInfo: {
        deliveryPromise: {
          minDays: 0,
          maxDays: 0,
          time: '0'
        },
        cutoff: {
          time: '0',
          timeInMinutes: '0'
        },
        flags: {
          cashOnDelivery: {
            value: false,
            remark: ''
          },
          cardOnDelivery: {
            value: false,
            remark: ''
          },
          tryNBuy: {
            value: false,
            remark: ''
          }
        }
      },
      standardShippingInfo: {
        deliveryPromise: {
          minDays: 3,
          maxDays: 11,
          time: '0'
        },
        flags: {
          cashOnDelivery: {
            value: true,
            remark: ''
          },
          cardOnDelivery: {
            value: true,
            remark: ''
          },
          tryNBuy: {
            value: false,
            remark: ''
          }
        }
      }
    },
    giftOrder: {
      active: false,
      data: null
    },
    createdAt: '1633251474058',
    modifiedAt: '1635343369720',
    conflict: {
      state: 'NOT_CONFLICTED',
      oldPrice: 0,
      price: {
        state: 'NOT_CONFLICTED',
        oldPrice: 0
      },
      seller: {
        state: 'NOT_CONFLICTED',
        oldSeller: null
      }
    },
    flags: {
      cashbackApplicable: {
        value: false,
        remark: ''
      },
      walletApplicable: {
        value: false,
        remark: ''
      },
      loyaltyPointsApplicable: {
        value: true,
        remark: ''
      },
      giftwrapApplicable: {
        value: true,
        remark: ''
      },
      giftcardApplicable: {
        value: true,
        remark: ''
      },
      tryNBuyApplicable: {
        value: false,
        remark: 'UNSERVICEABLE'
      },
      valueShippingApplicable: {
        value: false,
        remark: ''
      },
      valueReturnApplicable: {
        value: false,
        remark: ''
      },
      checkoutReady: {
        value: true,
        remark: 'ALL_OK'
      },
      myntApplicable: {
        value: false,
        remark: ''
      },
      coverFeeApplicable: {
        value: false,
        remark: 'No Active CoverFee charge found for tenant 2297'
      },
      codChargeApplicable: {
        value: false,
        remark: ''
      }
    },
    shippingData: {
      method: 'NORMAL',
      text: '',
      meta: {
        minMore: '',
        shippingLimit: '',
        info: '',
        categories: ''
      },
      shippingApplicableCharge: 0,
      shippingChargeLimit: 1
    },
    price: {
      mrp: 7489,
      totalSavings: 0,
      total: 7489,
      subTotal: 7489,
      userAction: 'PAY',
      effectiveExchangeItemPrice: 0,
      effectiveTotalPrice: 7489,
      discounts: {
        data: [
          {
            name: 'discount',
            value: 0,
            meta: null,
            effectiveDiscountValue: 0,
            effectiveDiscountMeta: null
          },
          {
            name: 'mynts',
            value: 0,
            meta: null,
            effectiveDiscountValue: 0,
            effectiveDiscountMeta: null
          },
          {
            name: 'coupon',
            value: 0,
            meta: null,
            effectiveDiscountValue: 0,
            effectiveDiscountMeta: null
          },
          {
            name: 'bag',
            value: 0,
            meta: null,
            effectiveDiscountValue: 0,
            effectiveDiscountMeta: null
          }
        ]
      },
      charges: {
        data: [
          {
            name: 'tax',
            value: 0
          }
        ]
      },
      instruments: {
        data: [
          {
            name: 'loyaltypoints',
            value: 0
          },
          {
            name: 'giftcard',
            value: 0
          }
        ]
      }
    },
    coupons: [],
    applicableCoupons: [],
    potentialCoupons: [],
    attachedProductOffers: {
      appliedOffers: [],
      applicableOffers: [],
      totalOfferAmount: 0
    },
    products: [
      {
        id: 12857090,
        selectedForCheckout: true,
        name: 'Ethnix Men Purple Kurta',
        brand: 'ethnix',
        gender: 'Men',
        itemAddTime: 1634830219,
        skuId: 44965236,
        itemId: 1634854683,
        articleType: 'Kurtas',
        articleTypeId: 83,
        masterCategoryTypeName: 'Apparel',
        masterCategoryTypeCode: 'APPAREL',
        quantity: 2,
        activeSlot: 0,
        landingPageUrl: 'Kurtas/ethnix/Ethnix-Men-Purple-Kurta/12857090/buy',
        tryAndBuyOpted: false,
        returnPeriod: 30,
        valueReturnOpted: false,
        valueReturnApplicableDiscount: 0,
        styleOffers: [],
        appliedCoupons: [],
        personalisedPricing: {
          coupon: '',
          discount: 0
        },
        virtualBundleInfo: {
          virtualBundleConflict: false,
          virtualConflictItemId: 0
        },
        discountInfo: {
          type: null,
          text: null
        },
        conflict: {
          state: 'NOT_CONFLICTED',
          oldPrice: 1995,
          price: {
            state: 'NOT_CONFLICTED',
            oldPrice: 1995
          },
          seller: {
            state: 'NOT_CONFLICTED',
            oldSeller: null
          }
        },
        images: [
          {
            src:
              'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/12857090/2021/3/23/cf9f735b-973d-4adc-b151-c4c7bb7186921616482767835-ethnix-Men-Kurtas-3091616482766956-1.jpg',
            secureSrc:
              'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/12857090/2021/3/23/cf9f735b-973d-4adc-b151-c4c7bb7186921616482767835-ethnix-Men-Kurtas-3091616482766956-1.jpg'
          }
        ],
        flags: {
          exchangeable: true,
          returnable: true,
          pickupEnabled: true,
          tryable: true,
          large: false,
          hazmat: true,
          fragile: false,
          jewellery: false,
          couponApplicable: false,
          codEnabled: true,
          comforter: false,
          personalised: false,
          preOrderEnabled: false,
          myntsEnabled: true,
          freeItem: false,
          preLaunchProduct: false,
          expirable: false
        },
        selectedSeller: {
          id: 11116,
          partnerId: 11116,
          name: 'RAYMOND APPAREL LIMITED',
          inventory: 2,
          warehouses: '15844,15848',
          supplyType: 'ON_HAND',
          expiryDate: '0',
          earlierExpiryDate: false
        },
        sizes: [
          {
            label: 'XS',
            skuId: 44965240,
            available: false,
            inventory: 0,
            sellers: [
              {
                seller: {
                  id: 11116,
                  partnerId: 11116,
                  name: 'RAYMOND APPAREL LIMITED',
                  inventory: 0,
                  warehouses: '',
                  supplyType: '',
                  expiryDate: '0',
                  earlierExpiryDate: false
                },
                price: {
                  mrp: 1995,
                  subTotal: 1995,
                  discountText: ''
                }
              }
            ]
          },
          {
            label: 'S',
            skuId: 44965241,
            available: true,
            inventory: 1,
            sellers: [
              {
                seller: {
                  id: 11116,
                  partnerId: 11116,
                  name: 'RAYMOND APPAREL LIMITED',
                  inventory: 1,
                  warehouses: '15844,15848,15850',
                  supplyType: 'ON_HAND',
                  expiryDate: '0',
                  earlierExpiryDate: false
                },
                price: {
                  mrp: 1995,
                  subTotal: 1995,
                  discountText: ''
                }
              }
            ]
          },
          {
            label: 'M',
            skuId: 44965236,
            available: true,
            inventory: 2,
            sellers: [
              {
                seller: {
                  id: 11116,
                  partnerId: 11116,
                  name: 'RAYMOND APPAREL LIMITED',
                  inventory: 2,
                  warehouses: '15844,15848',
                  supplyType: 'ON_HAND',
                  expiryDate: '0',
                  earlierExpiryDate: false
                },
                price: {
                  mrp: 1995,
                  subTotal: 1995,
                  discountText: ''
                }
              }
            ]
          },
          {
            label: 'XXL',
            skuId: 44965239,
            available: false,
            inventory: 0,
            sellers: [
              {
                seller: {
                  id: 11116,
                  partnerId: 11116,
                  name: 'RAYMOND APPAREL LIMITED',
                  inventory: 0,
                  warehouses: '',
                  supplyType: '',
                  expiryDate: '0',
                  earlierExpiryDate: false
                },
                price: {
                  mrp: 1995,
                  subTotal: 1995,
                  discountText: ''
                }
              }
            ]
          }
        ],
        price: {
          mrp: 3990,
          total: 3990,
          subTotal: 3990,
          discounts: {
            data: [
              {
                name: 'discount',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'coupon',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'bag',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'personalised',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              }
            ]
          },
          charges: {
            data: [
              {
                name: 'tax',
                value: 0
              },
              {
                name: 'mrp',
                value: 3990
              }
            ]
          },
          instruments: {
            data: [
              {
                name: 'loyaltypoints',
                value: 0
              },
              {
                name: 'giftcard',
                value: 0
              }
            ]
          }
        },
        offerId: '',
        urgencyInfo: {
          pdpCount: 0,
          pdpCountPtile: 0,
          addToCollectionCount: 0,
          addToCollectionCountPtile: 0,
          addToCartCount: 0,
          addToCartCountPtile: 0,
          quantitySold: 0,
          quantitySoldPtile: 0,
          values: [],
          displayOnCart: false
        },
        ratings: {
          avgRating: 0,
          totalCount: 0
        },
        systemAttributes: [],
        giftCardConfig: '',
        productServiceabilityInfo: {
          pincodeInfo: {
            serviceable: true,
            shippingEstimates: [
              {
                shippingMethod: 'NORMAL',
                promiseDate: '1636155000000',
                orderBy: '1635417000000'
              },
              {
                shippingMethod: 'VALUE_SHIPPING',
                promiseDate: '1636540260000',
                orderBy: '1635417000000'
              }
            ],
            shippingEstimatesInDays: {
              sddShipping: 0,
              expressShipping: 0,
              valueShipping: 14,
              standard: 9
            }
          },
          tryNBuyAvailable: false,
          alterationAvailable: false
        }
      },
      {
        id: 15808986,
        selectedForCheckout: true,
        name: 'H&M Men Brown Relaxed Fit Sweatshirt',
        brand: 'H&M',
        gender: 'Men',
        itemAddTime: 1635159880,
        skuId: 50632706,
        itemId: 1635176808,
        articleType: 'Sweatshirts',
        articleTypeId: 87,
        masterCategoryTypeName: 'Apparel',
        masterCategoryTypeCode: 'APPAREL',
        quantity: 1,
        activeSlot: 0,
        landingPageUrl:
          'Sweatshirts/HM/HM-Men-Brown-Relaxed-Fit-Sweatshirt/15808986/buy',
        tryAndBuyOpted: false,
        returnPeriod: 15,
        valueReturnOpted: false,
        valueReturnApplicableDiscount: 0,
        styleOffers: [],
        appliedCoupons: [],
        personalisedPricing: {
          coupon: '',
          discount: 0
        },
        virtualBundleInfo: {
          virtualBundleConflict: false,
          virtualConflictItemId: 0
        },
        discountInfo: {
          type: null,
          text: null
        },
        conflict: {
          state: 'NOT_CONFLICTED',
          oldPrice: 799,
          price: {
            state: 'NOT_CONFLICTED',
            oldPrice: 799
          },
          seller: {
            state: 'NOT_CONFLICTED',
            oldSeller: null
          }
        },
        images: [
          {
            src:
              'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/15808986/2021/10/14/46351e8e-913a-49f3-9f87-ceecb60ee7411634149960622RelaxedFitSweatshirt1.jpg',
            secureSrc:
              'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/15808986/2021/10/14/46351e8e-913a-49f3-9f87-ceecb60ee7411634149960622RelaxedFitSweatshirt1.jpg'
          }
        ],
        flags: {
          exchangeable: true,
          returnable: true,
          pickupEnabled: true,
          tryable: true,
          large: false,
          hazmat: false,
          fragile: false,
          jewellery: false,
          couponApplicable: false,
          codEnabled: true,
          comforter: false,
          personalised: false,
          preOrderEnabled: false,
          myntsEnabled: true,
          freeItem: false,
          preLaunchProduct: false,
          expirable: false
        },
        selectedSeller: {
          id: 6771,
          partnerId: 6771,
          name: 'H & M Hennes & Mauritz Retail Private Limited',
          inventory: 10,
          warehouses: '910',
          supplyType: 'ON_HAND',
          expiryDate: '0',
          earlierExpiryDate: false
        },
        sizes: [
          {
            label: 'XS',
            skuId: 50632705,
            available: true,
            inventory: 10,
            sellers: [
              {
                seller: {
                  id: 6771,
                  partnerId: 6771,
                  name: 'H & M Hennes & Mauritz Retail Private Limited',
                  inventory: 10,
                  warehouses: '910',
                  supplyType: 'ON_HAND',
                  expiryDate: '0',
                  earlierExpiryDate: false
                },
                price: {
                  mrp: 799,
                  subTotal: 799,
                  discountText: ''
                }
              }
            ]
          },
          {
            label: 'S',
            skuId: 50632707,
            available: true,
            inventory: 10,
            sellers: [
              {
                seller: {
                  id: 6771,
                  partnerId: 6771,
                  name: 'H & M Hennes & Mauritz Retail Private Limited',
                  inventory: 10,
                  warehouses: '910',
                  supplyType: 'ON_HAND',
                  expiryDate: '0',
                  earlierExpiryDate: false
                },
                price: {
                  mrp: 799,
                  subTotal: 799,
                  discountText: ''
                }
              }
            ]
          },
          {
            label: 'M',
            skuId: 50632706,
            available: true,
            inventory: 10,
            sellers: [
              {
                seller: {
                  id: 6771,
                  partnerId: 6771,
                  name: 'H & M Hennes & Mauritz Retail Private Limited',
                  inventory: 10,
                  warehouses: '910',
                  supplyType: 'ON_HAND',
                  expiryDate: '0',
                  earlierExpiryDate: false
                },
                price: {
                  mrp: 799,
                  subTotal: 799,
                  discountText: ''
                }
              }
            ]
          },
          {
            label: 'L',
            skuId: 50632708,
            available: true,
            inventory: 10,
            sellers: [
              {
                seller: {
                  id: 6771,
                  partnerId: 6771,
                  name: 'H & M Hennes & Mauritz Retail Private Limited',
                  inventory: 10,
                  warehouses: '910',
                  supplyType: 'ON_HAND',
                  expiryDate: '0',
                  earlierExpiryDate: false
                },
                price: {
                  mrp: 799,
                  subTotal: 799,
                  discountText: ''
                }
              }
            ]
          },
          {
            label: 'XL',
            skuId: 50632709,
            available: true,
            inventory: 9,
            sellers: [
              {
                seller: {
                  id: 6771,
                  partnerId: 6771,
                  name: 'H & M Hennes & Mauritz Retail Private Limited',
                  inventory: 9,
                  warehouses: '910',
                  supplyType: 'ON_HAND',
                  expiryDate: '0',
                  earlierExpiryDate: false
                },
                price: {
                  mrp: 799,
                  subTotal: 799,
                  discountText: ''
                }
              }
            ]
          },
          {
            label: 'XXL',
            skuId: 50632710,
            available: true,
            inventory: 10,
            sellers: [
              {
                seller: {
                  id: 6771,
                  partnerId: 6771,
                  name: 'H & M Hennes & Mauritz Retail Private Limited',
                  inventory: 10,
                  warehouses: '910',
                  supplyType: 'ON_HAND',
                  expiryDate: '0',
                  earlierExpiryDate: false
                },
                price: {
                  mrp: 799,
                  subTotal: 799,
                  discountText: ''
                }
              }
            ]
          }
        ],
        price: {
          mrp: 799,
          total: 799,
          subTotal: 799,
          discounts: {
            data: [
              {
                name: 'discount',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'coupon',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'bag',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'personalised',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              }
            ]
          },
          charges: {
            data: [
              {
                name: 'tax',
                value: 0
              },
              {
                name: 'mrp',
                value: 799
              }
            ]
          },
          instruments: {
            data: [
              {
                name: 'loyaltypoints',
                value: 0
              },
              {
                name: 'giftcard',
                value: 0
              }
            ]
          }
        },
        offerId: '',
        urgencyInfo: {
          pdpCount: 2823,
          pdpCountPtile: 99.94283677782914,
          addToCollectionCount: 5583,
          addToCollectionCountPtile: 99.85065786495603,
          addToCartCount: 1066,
          addToCartCountPtile: 99.99265615463202,
          quantitySold: 257,
          quantitySoldPtile: 99.99151377868588,
          values: [],
          displayOnCart: false
        },
        ratings: {
          avgRating: 4.833333333333333,
          totalCount: 12
        },
        systemAttributes: [
          {
            attribute: 'Custom_Label2',
            value: 'SA_FD_Label2'
          }
        ],
        giftCardConfig: '',
        productServiceabilityInfo: {
          pincodeInfo: {
            serviceable: true,
            shippingEstimates: [
              {
                shippingMethod: 'NORMAL',
                promiseDate: '1636281060000',
                orderBy: '1635366660000'
              }
            ],
            shippingEstimatesInDays: {
              sddShipping: 0,
              expressShipping: 0,
              valueShipping: 0,
              standard: 11
            }
          },
          tryNBuyAvailable: false,
          alterationAvailable: false
        }
      },
      {
        id: 14976922,
        selectedForCheckout: true,
        name: 'Bobbi Brown Set of 4 Sweet Indulgences Mini Lip Gloss',
        brand: 'Bobbi Brown',
        gender: 'Women',
        itemAddTime: 1635264730,
        skuId: 49195444,
        itemId: 1635357882,
        articleType: 'Lip Gloss',
        articleTypeId: 236,
        masterCategoryTypeName: 'Personal Care',
        masterCategoryTypeCode: 'PERSONAL_CARE',
        quantity: 1,
        activeSlot: 0,
        landingPageUrl:
          'Lip-Gloss/Bobbi-Brown/Bobbi-Brown-Set-of-4-Sweet-Indulgences-Mini-Lip-Gloss/14976922/buy',
        tryAndBuyOpted: false,
        returnPeriod: 15,
        valueReturnOpted: false,
        valueReturnApplicableDiscount: 0,
        styleOffers: [],
        appliedCoupons: [],
        personalisedPricing: {
          coupon: '',
          discount: 0
        },
        virtualBundleInfo: {
          virtualBundleConflict: false,
          virtualConflictItemId: 0
        },
        discountInfo: {
          type: 2048,
          text: '0% Off'
        },
        conflict: {
          state: 'NOT_CONFLICTED',
          oldPrice: 2700,
          price: {
            state: 'NOT_CONFLICTED',
            oldPrice: 2700
          },
          seller: {
            state: 'NOT_CONFLICTED',
            oldSeller: null
          }
        },
        images: [
          {
            src:
              'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/14976922/2021/10/8/3f956f6e-151a-4285-a1b6-80b69142826a1633673105474-Bobbi-Brown-Set-of-4-Sweet-Indulgences-Mini-Lip-Gloss-894163-1.jpg',
            secureSrc:
              'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/14976922/2021/10/8/3f956f6e-151a-4285-a1b6-80b69142826a1633673105474-Bobbi-Brown-Set-of-4-Sweet-Indulgences-Mini-Lip-Gloss-894163-1.jpg'
          }
        ],
        flags: {
          exchangeable: false,
          returnable: false,
          pickupEnabled: false,
          tryable: false,
          large: false,
          hazmat: true,
          fragile: false,
          jewellery: false,
          couponApplicable: false,
          codEnabled: true,
          comforter: false,
          personalised: false,
          preOrderEnabled: false,
          myntsEnabled: false,
          freeItem: false,
          preLaunchProduct: false,
          expirable: true
        },
        selectedSeller: {
          id: 25,
          partnerId: 4027,
          name: 'Omnitech Retail',
          inventory: 10,
          warehouses: '36,309',
          supplyType: 'ON_HAND',
          expiryDate: '1717093800000',
          earlierExpiryDate: false
        },
        sizes: [
          {
            label: 'Pack',
            skuId: 49195444,
            available: true,
            inventory: 10,
            sellers: [
              {
                seller: {
                  id: 25,
                  partnerId: 4027,
                  name: 'Omnitech Retail',
                  inventory: 10,
                  warehouses: '36,309',
                  supplyType: 'ON_HAND',
                  expiryDate: '1717093800000',
                  earlierExpiryDate: false
                },
                price: {
                  mrp: 2700,
                  subTotal: 2700,
                  discountText: ''
                }
              }
            ]
          }
        ],
        price: {
          mrp: 2700,
          total: 2700,
          subTotal: 2700,
          discounts: {
            data: [
              {
                name: 'discount',
                value: 0,
                meta: {
                  unit: 'PERCENT',
                  value: 0
                },
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: {
                  unit: 'PERCENT',
                  value: 0
                }
              },
              {
                name: 'coupon',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'bag',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'personalised',
                value: 0,
                meta: {
                  unit: 'PERCENT',
                  value: 0
                },
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              }
            ]
          },
          charges: {
            data: [
              {
                name: 'tax',
                value: 0
              },
              {
                name: 'mrp',
                value: 2700
              }
            ]
          },
          instruments: {
            data: [
              {
                name: 'loyaltypoints',
                value: 0
              },
              {
                name: 'giftcard',
                value: 0
              }
            ]
          }
        },
        offerId: '58413568',
        urgencyInfo: {
          pdpCount: 468,
          pdpCountPtile: 99.1474916989827,
          addToCollectionCount: 2291,
          addToCollectionCountPtile: 99.46048091773486,
          addToCartCount: 85,
          addToCartCountPtile: 99.35847430796497,
          quantitySold: 0,
          quantitySoldPtile: 0,
          values: [],
          displayOnCart: false
        },
        ratings: {
          avgRating: 4.2631578947368425,
          totalCount: 19
        },
        systemAttributes: [
          {
            attribute: 'SA_XT_Best_Price',
            value: 'Price may go up'
          },
          {
            attribute: 'SA_XT_BESTSELLER',
            value: 'BESTSELLER'
          }
        ],
        giftCardConfig: '',
        productServiceabilityInfo: {
          pincodeInfo: {
            serviceable: true,
            shippingEstimates: [
              {
                shippingMethod: 'NORMAL',
                promiseDate: '1635629400000',
                orderBy: '1635390000000'
              },
              {
                shippingMethod: 'VALUE_SHIPPING',
                promiseDate: '1636147800000',
                orderBy: '1635476400000'
              }
            ],
            shippingEstimatesInDays: {
              sddShipping: 0,
              expressShipping: 0,
              valueShipping: 9,
              standard: 3
            }
          },
          tryNBuyAvailable: false,
          alterationAvailable: false
        }
      },
      {
        id: 12343562,
        selectedForCheckout: true,
        name:
          'SUGAR Black Stroke Of Genius Heavy-Duty Kohl 05 Black Magic 1.2 g worth 499',
        brand: 'SUGAR',
        gender: 'Women',
        itemAddTime: 1646892689,
        skuId: 42997964,
        itemId: 3478,
        articleType: 'Free Gifts',
        articleTypeId: 254,
        masterCategoryTypeName: 'Free Items',
        masterCategoryTypeCode: 'FREE_ITEMS',
        quantity: 1,
        activeSlot: 0,
        landingPageUrl:
          'Free-Gifts\u002FSUGAR\u002FSUGAR-Black-Stroke-Of-Genius-Heavy-Duty-Kohl-05-Black-Magic-12-g-worth-499\u002F12343562\u002Fbuy',
        tryAndBuyOpted: false,
        returnPeriod: 30,
        valueReturnOpted: false,
        valueReturnApplicableDiscount: 0,
        styleOffers: [],
        appliedCoupons: [],
        personalisedPricing: {
          coupon: '',
          discount: 0
        },
        virtualBundleInfo: {
          virtualBundleConflict: false,
          virtualConflictItemId: 0
        },
        discountInfo: {
          type: 2048,
          text: null
        },
        conflict: {
          state: 'NOT_CONFLICTED',
          oldPrice: 0,
          price: {
            state: 'NOT_CONFLICTED',
            oldPrice: 0
          },
          seller: {
            state: 'NOT_CONFLICTED',
            oldSeller: null
          }
        },
        images: [
          {
            src:
              'http:\u002F\u002Fassets.myntassets.com\u002Fh_($height),q_($qualityPercentage),w_($width)\u002Fv1\u002Fassets\u002Fimages\u002Fproductimage\u002F2020\u002F8\u002F25\u002F31064138-be3f-4932-9e4d-eb58bfcd86761598304758225-1.jpg',
            secureSrc:
              'https:\u002F\u002Fassets.myntassets.com\u002Fh_($height),q_($qualityPercentage),w_($width)\u002Fv1\u002Fassets\u002Fimages\u002Fproductimage\u002F2020\u002F8\u002F25\u002F31064138-be3f-4932-9e4d-eb58bfcd86761598304758225-1.jpg'
          }
        ],
        flags: {
          exchangeable: false,
          returnable: false,
          pickupEnabled: true,
          tryable: false,
          large: false,
          hazmat: true,
          fragile: false,
          jewellery: false,
          couponApplicable: false,
          codEnabled: true,
          comforter: false,
          personalised: false,
          preOrderEnabled: false,
          myntsEnabled: true,
          freeItem: true,
          preLaunchProduct: false,
          expirable: true
        },
        selectedSeller: {
          id: 3478,
          partnerId: 3478,
          name: 'VELLVETTE LIFESTYLE PVT LTD',
          inventory: 10,
          warehouses: '3192',
          supplyType: 'ON_HAND',
          expiryDate: '1659205800000',
          earlierExpiryDate: false
        },
        sizes: [
          {
            label: 'Onesize',
            skuId: 42997964,
            available: true,
            inventory: 10,
            sellers: [
              {
                seller: {
                  id: 3478,
                  partnerId: 3478,
                  name: 'VELLVETTE LIFESTYLE PVT LTD',
                  inventory: 10,
                  warehouses: '3192',
                  supplyType: 'ON_HAND',
                  expiryDate: '1659205800000',
                  earlierExpiryDate: false
                },
                price: {
                  mrp: 499,
                  subTotal: 0,
                  discountText: ''
                }
              }
            ]
          }
        ],
        price: {
          mrp: 499,
          total: 0,
          subTotal: 0,
          discounts: {
            data: [
              {
                name: 'discount',
                value: 499,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'coupon',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'bag',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'personalised',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              }
            ]
          },
          charges: {
            data: [
              {
                name: 'tax',
                value: 0
              },
              {
                name: 'mrp',
                value: 499
              }
            ]
          },
          instruments: {
            data: [
              {
                name: 'loyaltypoints',
                value: 0
              },
              {
                name: 'giftcard',
                value: 0
              }
            ]
          }
        },
        offerId: '58413568',
        urgencyInfo: {
          pdpCount: 66,
          pdpCountPtile: 98.69734550380596,
          addToCollectionCount: 28,
          addToCollectionCountPtile: 80.5032579798975,
          addToCartCount: 0,
          addToCartCountPtile: 0,
          quantitySold: 131,
          quantitySoldPtile: 99.9971260032045,
          values: [],
          displayOnCart: false
        },
        ratings: {
          avgRating: 4.281345565749236,
          totalCount: 654
        },
        systemAttributes: [],
        giftCardConfig: '',
        productServiceabilityInfo: null
      }
    ],
    offers: [
      {
        id: '58413568',
        type: 'TDGwpAm3000_0126d12ae64d40698c19f12ccfa17148',
        hasFreeItem: true,
        message: 'Select 1 standard free gift',
        discountType: 2048,
        conditionComplete: true,
        comboComplete: false,
        showFrgListPage: true,
        frgSlabComboParams: [
          {
            slabName: 'Standard',
            minMore: 0,
            buyAmount: 1000,
            maxFreeItemCount: 1,
            discountCategory: 'AMOUNT',
            freeGiftInfo: [
              {
                styleId: 12343562,
                skuId: 1185932,
                sellerPartnerId: 214689,
                itemId: 214689,
                outOfStock: false
              }
            ]
          },
          {
            slabName: 'Exclusive',
            minMore: 500,
            buyAmount: 1500,
            freeGiftInfo: [],
            maxFreeItemCount: 1,
            discountCategory: 'AMOUNT'
          },
          {
            slabName: 'Premium',
            minMore: 1000,
            buyAmount: 2000,
            freeGiftInfo: [],
            maxFreeItemCount: 1,
            discountCategory: 'AMOUNT'
          }
        ],
        data: {
          minMore: 0,
          buyAmount: 599,
          currentCount: 1,
          currentAmount: 499,
          discountCategory: 'AMOUNT'
        }
      }
    ],
    virtualBundleConflict: false,
    coverFeeOpted: false,
    orderAddressId: 320035026,
    userDetails: {
      isReturnAbuser: false,
      returnAbuser: {
        level: 'DEFAULT',
        type: 'DEFAULT',
        showTnc: false,
        returns: '',
        multiplier: ''
      },
      email: {
        isFake: false
      },
      cod: {
        minCod: 1,
        maxCod: 24999
      },
      isFakeEmail: false,
      minCOD: 1,
      maxCOD: 24999,
      reasonCOD: '',
      isFirstTimeCustomer: false,
      isUserSlotActive: false
    },
    codOpted: false,
    codApplicableCharge: 0,
    coverFeeApplicableCharge: 0,
    unifiedAddressId: '320035026:2'
  },
  applicableCouponCart: {
    id: '7d1aea5e-66b2-4e60-a678-bbe0c519c8fa',
    createdBy: '',
    context: 'DEFAULT',
    count: 3,
    cartMergeState: 'NOT_MERGED',
    exchangeProductDetail: null,
    serviceability: null,
    giftOrder: {
      active: false,
      data: null
    },
    createdAt: '1667758426766',
    modifiedAt: '1667758460825',
    conflict: {
      state: 'NOT_CONFLICTED',
      oldPrice: 0,
      price: {
        state: 'NOT_CONFLICTED',
        oldPrice: 0
      },
      seller: {
        state: 'NOT_CONFLICTED',
        oldSeller: null
      }
    },
    flags: {
      cashbackApplicable: {
        value: false,
        remark: ''
      },
      walletApplicable: {
        value: false,
        remark: ''
      },
      loyaltyPointsApplicable: {
        value: true,
        remark: ''
      },
      giftwrapApplicable: {
        value: true,
        remark: ''
      },
      giftcardApplicable: {
        value: true,
        remark: ''
      },
      tryNBuyApplicable: {
        value: false,
        remark: 'UNSERVICEABLE'
      },
      valueShippingApplicable: {
        value: false,
        remark: ''
      },
      valueReturnApplicable: {
        value: false,
        remark: ''
      },
      checkoutReady: {
        value: true,
        remark: 'ALL_OK'
      },
      myntApplicable: {
        value: false,
        remark: ''
      },
      coverFeeApplicable: {
        value: false,
        remark: 'No Active CoverFee charge found for tenant 2297'
      },
      codChargeApplicable: {
        value: false,
        remark: ''
      }
    },
    shippingData: {
      method: 'NORMAL',
      text: '',
      meta: {
        minMore: '',
        shippingLimit: '',
        info: '',
        categories: ''
      },
      shippingApplicableCharge: 0,
      shippingChargeLimit: 799
    },
    price: {
      mrp: 7197,
      totalSavings: 4536,
      total: 2661,
      subTotal: 2661,
      userAction: 'PAY',
      effectiveExchangeItemPrice: 0,
      effectiveTotalPrice: 2661,
      discounts: {
        data: [
          {
            name: 'discount',
            value: 4536,
            meta: null,
            effectiveDiscountValue: 0,
            effectiveDiscountMeta: null
          },
          {
            name: 'mynts',
            value: 0,
            meta: null,
            effectiveDiscountValue: 0,
            effectiveDiscountMeta: null
          },
          {
            name: 'coupon',
            value: 0,
            meta: null,
            effectiveDiscountValue: 0,
            effectiveDiscountMeta: null
          },
          {
            name: 'bag',
            value: 0,
            meta: null,
            effectiveDiscountValue: 0,
            effectiveDiscountMeta: null
          }
        ]
      },
      charges: {
        data: [
          {
            name: 'tax',
            value: 0
          }
        ]
      },
      instruments: {
        data: [
          {
            name: 'loyaltypoints',
            value: 0
          },
          {
            name: 'giftcard',
            value: 0
          }
        ]
      }
    },
    coupons: [],
    applicableCoupons: [
      {
        code: 'MYNTRA300',
        description: ' Rs. 300 off on minimum purchase of Rs. 1599',
        expiry: '1667804647000',
        type: 'coupon',
        discountUnits: [
          {
            unit: 'RUPEE',
            value: 300
          }
        ]
      }
    ],
    potentialCoupons: [
      {
        code: 'GETMORE',
        description: ' 15%  off',
        benefit: 245,
        expiry: '1667845740000',
        tagLink: 'https://www.myntra.com/myntra?f=Coupons:GETMORE',
        message: 'Shop for 1 item(s) more to apply.'
      }
    ],
    attachedProductOffers: {
      appliedOffers: [],
      applicableOffers: [],
      totalOfferAmount: 0
    },
    products: [
      {
        id: 9897251,
        selectedForCheckout: true,
        name: 'Marie Claire Women Silver-Toned Analogue Watch MC 1A-A',
        brand: 'Marie Claire',
        gender: 'Women',
        itemAddTime: 1667758426,
        skuId: 34561873,
        itemId: 1667714602,
        articleType: 'Watches',
        articleTypeId: 66,
        masterCategoryTypeName: 'Accessories',
        masterCategoryTypeCode: 'ACCESSORIES',
        quantity: 3,
        activeSlot: 0,
        landingPageUrl:
          'Watches/Marie-Claire/Marie-Claire-Women-Silver-Toned-Analogue-Watch-MC-1A-A/9897251/buy',
        tryAndBuyOpted: false,
        returnPeriod: 30,
        valueReturnOpted: false,
        valueReturnApplicableDiscount: 0,
        styleOffers: [],
        appliedCoupons: [],
        personalisedPricing: {
          coupon: '',
          discount: 0
        },
        virtualBundleInfo: {
          virtualBundleConflict: false,
          virtualConflictItemId: 0
        },
        discountInfo: {
          type: 1,
          text: null,
          discountTimerStartTime: null,
          discountTimerEndTime: null
        },
        conflict: {
          state: 'NOT_CONFLICTED',
          oldPrice: 0,
          price: {
            state: 'NOT_CONFLICTED',
            oldPrice: 887
          },
          seller: {
            state: 'NOT_CONFLICTED',
            oldSeller: null
          }
        },
        images: [
          {
            src:
              'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/9897251/2022/7/13/4e8d9c25-fb32-4b9a-afaa-397f22b961921657698228493-Marie-Claire-Women-Silver-Toned-Analogue-Watch-MC-1A-A-29816-1.jpg',
            secureSrc:
              'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/9897251/2022/7/13/4e8d9c25-fb32-4b9a-afaa-397f22b961921657698228493-Marie-Claire-Women-Silver-Toned-Analogue-Watch-MC-1A-A-29816-1.jpg'
          }
        ],
        flags: {
          exchangeable: false,
          returnable: true,
          pickupEnabled: true,
          tryable: true,
          large: false,
          hazmat: false,
          fragile: false,
          jewellery: false,
          couponApplicable: false,
          codEnabled: true,
          comforter: false,
          personalised: false,
          preOrderEnabled: false,
          myntsEnabled: true,
          freeItem: false,
          preLaunchProduct: false,
          expirable: false
        },
        selectedSeller: {
          id: 25,
          partnerId: 4027,
          name: 'Omnitech Retail',
          inventory: 3,
          warehouses: '36,81,15774',
          supplyType: 'ON_HAND',
          expiryDate: '0',
          earlierExpiryDate: false
        },
        sizes: [
          {
            label: 'Onesize',
            skuId: 34561873,
            available: true,
            inventory: 3,
            sellers: [
              {
                seller: {
                  id: 25,
                  partnerId: 4027,
                  name: 'Omnitech Retail',
                  inventory: 3,
                  warehouses: '36,81,15774',
                  supplyType: 'ON_HAND',
                  expiryDate: '0',
                  earlierExpiryDate: false
                },
                price: {
                  mrp: 2399,
                  subTotal: 887,
                  discountText: '(63% OFF)'
                }
              }
            ]
          }
        ],
        price: {
          mrp: 7197,
          total: 2661,
          subTotal: 2661,
          discounts: {
            data: [
              {
                name: 'discount',
                value: 4536,
                meta: {
                  unit: 'PERCENT',
                  value: 63
                },
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: {
                  unit: 'PERCENT',
                  value: 0
                }
              },
              {
                name: 'coupon',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'bag',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'personalised',
                value: 0,
                meta: {
                  unit: 'PERCENT',
                  value: 0
                },
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              }
            ]
          },
          charges: {
            data: [
              {
                name: 'tax',
                value: 0
              },
              {
                name: 'mrp',
                value: 7197
              }
            ]
          },
          instruments: {
            data: [
              {
                name: 'loyaltypoints',
                value: 0
              },
              {
                name: 'giftcard',
                value: 0
              }
            ]
          }
        },
        offerId: '',
        urgencyInfo: {
          pdpCount: 0,
          pdpCountPtile: 0,
          addToCollectionCount: 820,
          addToCollectionCountPtile: 98.79665657622935,
          addToCartCount: 0,
          addToCartCountPtile: 0,
          quantitySold: 0,
          quantitySoldPtile: 0,
          values: [],
          displayOnCart: false
        },
        ratings: {
          avgRating: 4.506833712984054,
          totalCount: 878
        },
        systemAttributes: [
          {
            attribute: 'SA_XT_PICWORTHY',
            value: 'PIC-WORTHY'
          },
          {
            attribute: 'SA_XT_Best_Price',
            value: 'Price may go up'
          }
        ],
        giftCardConfig: '',
        productServiceabilityInfo: null
      },
      {
        id: 9897251,
        selectedForCheckout: true,
        name: 'Marie Claire Women Silver-Toned Analogue Watch MC 1A-A',
        brand: 'Marie Claire',
        gender: 'Women',
        itemAddTime: 1667758426,
        skuId: 34561873,
        itemId: 1667714602,
        articleType: 'Watches',
        articleTypeId: 66,
        masterCategoryTypeName: 'Accessories',
        masterCategoryTypeCode: 'ACCESSORIES',
        quantity: 3,
        activeSlot: 0,
        landingPageUrl:
          'Watches/Marie-Claire/Marie-Claire-Women-Silver-Toned-Analogue-Watch-MC-1A-A/9897251/buy',
        tryAndBuyOpted: false,
        returnPeriod: 30,
        valueReturnOpted: false,
        valueReturnApplicableDiscount: 0,
        styleOffers: [],
        appliedCoupons: [],
        personalisedPricing: {
          coupon: '',
          discount: 0
        },
        virtualBundleInfo: {
          virtualBundleConflict: false,
          virtualConflictItemId: 0
        },
        discountInfo: {
          type: 1,
          text: null,
          discountTimerStartTime: null,
          discountTimerEndTime: null
        },
        conflict: {
          state: 'NOT_CONFLICTED',
          oldPrice: 0,
          price: {
            state: 'NOT_CONFLICTED',
            oldPrice: 887
          },
          seller: {
            state: 'NOT_CONFLICTED',
            oldSeller: null
          }
        },
        images: [
          {
            src:
              'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/9897251/2022/7/13/4e8d9c25-fb32-4b9a-afaa-397f22b961921657698228493-Marie-Claire-Women-Silver-Toned-Analogue-Watch-MC-1A-A-29816-1.jpg',
            secureSrc:
              'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/9897251/2022/7/13/4e8d9c25-fb32-4b9a-afaa-397f22b961921657698228493-Marie-Claire-Women-Silver-Toned-Analogue-Watch-MC-1A-A-29816-1.jpg'
          }
        ],
        flags: {
          exchangeable: false,
          returnable: true,
          pickupEnabled: true,
          tryable: true,
          large: false,
          hazmat: false,
          fragile: false,
          jewellery: false,
          couponApplicable: false,
          codEnabled: true,
          comforter: false,
          personalised: false,
          preOrderEnabled: false,
          myntsEnabled: true,
          freeItem: false,
          preLaunchProduct: false,
          expirable: false
        },
        selectedSeller: {
          id: 25,
          partnerId: 4027,
          name: 'Omnitech Retail',
          inventory: 3,
          warehouses: '36,81,15774',
          supplyType: 'ON_HAND',
          expiryDate: '0',
          earlierExpiryDate: false
        },
        sizes: [
          {
            label: 'Onesize',
            skuId: 34561873,
            available: true,
            inventory: 3,
            sellers: [
              {
                seller: {
                  id: 25,
                  partnerId: 4027,
                  name: 'Omnitech Retail',
                  inventory: 3,
                  warehouses: '36,81,15774',
                  supplyType: 'ON_HAND',
                  expiryDate: '0',
                  earlierExpiryDate: false
                },
                price: {
                  mrp: 2399,
                  subTotal: 887,
                  discountText: '(63% OFF)'
                }
              }
            ]
          }
        ],
        price: {
          mrp: 7197,
          total: 2661,
          subTotal: 2661,
          discounts: {
            data: [
              {
                name: 'discount',
                value: 4536,
                meta: {
                  unit: 'PERCENT',
                  value: 63
                },
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: {
                  unit: 'PERCENT',
                  value: 0
                }
              },
              {
                name: 'coupon',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'bag',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'personalised',
                value: 0,
                meta: {
                  unit: 'PERCENT',
                  value: 0
                },
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              }
            ]
          },
          charges: {
            data: [
              {
                name: 'tax',
                value: 0
              },
              {
                name: 'mrp',
                value: 7197
              }
            ]
          },
          instruments: {
            data: [
              {
                name: 'loyaltypoints',
                value: 0
              },
              {
                name: 'giftcard',
                value: 0
              }
            ]
          }
        },
        offerId: '',
        urgencyInfo: {
          pdpCount: 0,
          pdpCountPtile: 0,
          addToCollectionCount: 820,
          addToCollectionCountPtile: 98.79665657622935,
          addToCartCount: 0,
          addToCartCountPtile: 0,
          quantitySold: 0,
          quantitySoldPtile: 0,
          values: [],
          displayOnCart: false
        },
        ratings: {
          avgRating: 4.506833712984054,
          totalCount: 878
        },
        systemAttributes: [
          {
            attribute: 'SA_XT_PICWORTHY',
            value: 'PIC-WORTHY'
          },
          {
            attribute: 'SA_XT_Best_Price',
            value: 'Price may go up'
          }
        ],
        giftCardConfig: '',
        productServiceabilityInfo: null
      },
      {
        id: 9897251,
        selectedForCheckout: true,
        name: 'Marie Claire Women Silver-Toned Analogue Watch MC 1A-A',
        brand: 'Marie Claire',
        gender: 'Women',
        itemAddTime: 1667758426,
        skuId: 34561873,
        itemId: 1667714602,
        articleType: 'Watches',
        articleTypeId: 66,
        masterCategoryTypeName: 'Accessories',
        masterCategoryTypeCode: 'ACCESSORIES',
        quantity: 3,
        activeSlot: 0,
        landingPageUrl:
          'Watches/Marie-Claire/Marie-Claire-Women-Silver-Toned-Analogue-Watch-MC-1A-A/9897251/buy',
        tryAndBuyOpted: false,
        returnPeriod: 30,
        valueReturnOpted: false,
        valueReturnApplicableDiscount: 0,
        styleOffers: [],
        appliedCoupons: [],
        personalisedPricing: {
          coupon: '',
          discount: 0
        },
        virtualBundleInfo: {
          virtualBundleConflict: false,
          virtualConflictItemId: 0
        },
        discountInfo: {
          type: 1,
          text: null,
          discountTimerStartTime: null,
          discountTimerEndTime: null
        },
        conflict: {
          state: 'NOT_CONFLICTED',
          oldPrice: 0,
          price: {
            state: 'NOT_CONFLICTED',
            oldPrice: 887
          },
          seller: {
            state: 'NOT_CONFLICTED',
            oldSeller: null
          }
        },
        images: [
          {
            src:
              'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/9897251/2022/7/13/4e8d9c25-fb32-4b9a-afaa-397f22b961921657698228493-Marie-Claire-Women-Silver-Toned-Analogue-Watch-MC-1A-A-29816-1.jpg',
            secureSrc:
              'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/9897251/2022/7/13/4e8d9c25-fb32-4b9a-afaa-397f22b961921657698228493-Marie-Claire-Women-Silver-Toned-Analogue-Watch-MC-1A-A-29816-1.jpg'
          }
        ],
        flags: {
          exchangeable: false,
          returnable: true,
          pickupEnabled: true,
          tryable: true,
          large: false,
          hazmat: false,
          fragile: false,
          jewellery: false,
          couponApplicable: false,
          codEnabled: true,
          comforter: false,
          personalised: false,
          preOrderEnabled: false,
          myntsEnabled: true,
          freeItem: false,
          preLaunchProduct: false,
          expirable: false
        },
        selectedSeller: {
          id: 25,
          partnerId: 4027,
          name: 'Omnitech Retail',
          inventory: 3,
          warehouses: '36,81,15774',
          supplyType: 'ON_HAND',
          expiryDate: '0',
          earlierExpiryDate: false
        },
        sizes: [
          {
            label: 'Onesize',
            skuId: 34561873,
            available: true,
            inventory: 3,
            sellers: [
              {
                seller: {
                  id: 25,
                  partnerId: 4027,
                  name: 'Omnitech Retail',
                  inventory: 3,
                  warehouses: '36,81,15774',
                  supplyType: 'ON_HAND',
                  expiryDate: '0',
                  earlierExpiryDate: false
                },
                price: {
                  mrp: 2399,
                  subTotal: 887,
                  discountText: '(63% OFF)'
                }
              }
            ]
          }
        ],
        price: {
          mrp: 7197,
          total: 2661,
          subTotal: 2661,
          discounts: {
            data: [
              {
                name: 'discount',
                value: 4536,
                meta: {
                  unit: 'PERCENT',
                  value: 63
                },
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: {
                  unit: 'PERCENT',
                  value: 0
                }
              },
              {
                name: 'coupon',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'bag',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'personalised',
                value: 0,
                meta: {
                  unit: 'PERCENT',
                  value: 0
                },
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              }
            ]
          },
          charges: {
            data: [
              {
                name: 'tax',
                value: 0
              },
              {
                name: 'mrp',
                value: 7197
              }
            ]
          },
          instruments: {
            data: [
              {
                name: 'loyaltypoints',
                value: 0
              },
              {
                name: 'giftcard',
                value: 0
              }
            ]
          }
        },
        offerId: '',
        urgencyInfo: {
          pdpCount: 0,
          pdpCountPtile: 0,
          addToCollectionCount: 820,
          addToCollectionCountPtile: 98.79665657622935,
          addToCartCount: 0,
          addToCartCountPtile: 0,
          quantitySold: 0,
          quantitySoldPtile: 0,
          values: [],
          displayOnCart: false
        },
        ratings: {
          avgRating: 4.506833712984054,
          totalCount: 878
        },
        systemAttributes: [
          {
            attribute: 'SA_XT_PICWORTHY',
            value: 'PIC-WORTHY'
          },
          {
            attribute: 'SA_XT_Best_Price',
            value: 'Price may go up'
          }
        ],
        giftCardConfig: '',
        productServiceabilityInfo: null
      },
      {
        id: 9897251,
        selectedForCheckout: true,
        name: 'Marie Claire Women Silver-Toned Analogue Watch MC 1A-A',
        brand: 'Marie Claire',
        gender: 'Women',
        itemAddTime: 1667758426,
        skuId: 34561873,
        itemId: 1667714602,
        articleType: 'Watches',
        articleTypeId: 66,
        masterCategoryTypeName: 'Accessories',
        masterCategoryTypeCode: 'ACCESSORIES',
        quantity: 3,
        activeSlot: 0,
        landingPageUrl:
          'Watches/Marie-Claire/Marie-Claire-Women-Silver-Toned-Analogue-Watch-MC-1A-A/9897251/buy',
        tryAndBuyOpted: false,
        returnPeriod: 30,
        valueReturnOpted: false,
        valueReturnApplicableDiscount: 0,
        styleOffers: [],
        appliedCoupons: [],
        personalisedPricing: {
          coupon: '',
          discount: 0
        },
        virtualBundleInfo: {
          virtualBundleConflict: false,
          virtualConflictItemId: 0
        },
        discountInfo: {
          type: 1,
          text: null,
          discountTimerStartTime: null,
          discountTimerEndTime: null
        },
        conflict: {
          state: 'NOT_CONFLICTED',
          oldPrice: 0,
          price: {
            state: 'NOT_CONFLICTED',
            oldPrice: 887
          },
          seller: {
            state: 'NOT_CONFLICTED',
            oldSeller: null
          }
        },
        images: [
          {
            src:
              'http://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/9897251/2022/7/13/4e8d9c25-fb32-4b9a-afaa-397f22b961921657698228493-Marie-Claire-Women-Silver-Toned-Analogue-Watch-MC-1A-A-29816-1.jpg',
            secureSrc:
              'https://assets.myntassets.com/h_($height),q_($qualityPercentage),w_($width)/v1/assets/images/9897251/2022/7/13/4e8d9c25-fb32-4b9a-afaa-397f22b961921657698228493-Marie-Claire-Women-Silver-Toned-Analogue-Watch-MC-1A-A-29816-1.jpg'
          }
        ],
        flags: {
          exchangeable: false,
          returnable: true,
          pickupEnabled: true,
          tryable: true,
          large: false,
          hazmat: false,
          fragile: false,
          jewellery: false,
          couponApplicable: false,
          codEnabled: true,
          comforter: false,
          personalised: false,
          preOrderEnabled: false,
          myntsEnabled: true,
          freeItem: false,
          preLaunchProduct: false,
          expirable: false
        },
        selectedSeller: {
          id: 25,
          partnerId: 4027,
          name: 'Omnitech Retail',
          inventory: 3,
          warehouses: '36,81,15774',
          supplyType: 'ON_HAND',
          expiryDate: '0',
          earlierExpiryDate: false
        },
        sizes: [
          {
            label: 'Onesize',
            skuId: 34561873,
            available: true,
            inventory: 3,
            sellers: [
              {
                seller: {
                  id: 25,
                  partnerId: 4027,
                  name: 'Omnitech Retail',
                  inventory: 3,
                  warehouses: '36,81,15774',
                  supplyType: 'ON_HAND',
                  expiryDate: '0',
                  earlierExpiryDate: false
                },
                price: {
                  mrp: 2399,
                  subTotal: 887,
                  discountText: '(63% OFF)'
                }
              }
            ]
          }
        ],
        price: {
          mrp: 7197,
          total: 2661,
          subTotal: 2661,
          discounts: {
            data: [
              {
                name: 'discount',
                value: 4536,
                meta: {
                  unit: 'PERCENT',
                  value: 63
                },
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: {
                  unit: 'PERCENT',
                  value: 0
                }
              },
              {
                name: 'coupon',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'bag',
                value: 0,
                meta: null,
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              },
              {
                name: 'personalised',
                value: 0,
                meta: {
                  unit: 'PERCENT',
                  value: 0
                },
                effectiveDiscountValue: 0,
                effectiveDiscountMeta: null
              }
            ]
          },
          charges: {
            data: [
              {
                name: 'tax',
                value: 0
              },
              {
                name: 'mrp',
                value: 7197
              }
            ]
          },
          instruments: {
            data: [
              {
                name: 'loyaltypoints',
                value: 0
              },
              {
                name: 'giftcard',
                value: 0
              }
            ]
          }
        },
        offerId: '',
        urgencyInfo: {
          pdpCount: 0,
          pdpCountPtile: 0,
          addToCollectionCount: 820,
          addToCollectionCountPtile: 98.79665657622935,
          addToCartCount: 0,
          addToCartCountPtile: 0,
          quantitySold: 0,
          quantitySoldPtile: 0,
          values: [],
          displayOnCart: false
        },
        ratings: {
          avgRating: 4.506833712984054,
          totalCount: 878
        },
        systemAttributes: [
          {
            attribute: 'SA_XT_PICWORTHY',
            value: 'PIC-WORTHY'
          },
          {
            attribute: 'SA_XT_Best_Price',
            value: 'Price may go up'
          }
        ],
        giftCardConfig: '',
        productServiceabilityInfo: null
      }
    ],
    offers: [],
    virtualBundleConflict: false,
    coverFeeOpted: false,
    orderAddressId: null,
    userDetails: {
      isReturnAbuser: false,
      returnAbuser: {
        level: '',
        type: '',
        showTnc: false,
        returns: '',
        multiplier: ''
      },
      email: {
        isFake: false
      },
      cod: {
        minCod: 0,
        maxCod: 0
      },
      isFakeEmail: false,
      minCOD: 0,
      maxCOD: 0,
      reasonCOD: '',
      isFirstTimeCustomer: false,
      isUserSlotActive: false
    },
    codOpted: false,
    codApplicableCharge: 0,
    coverFeeApplicableCharge: 0,
    unifiedAddressId: null
  }
};
