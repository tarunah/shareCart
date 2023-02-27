/**
 * Test Data: The initial form and the props.
 */
const props = {
  paymentOptions: {
    csrfToken: 'testToken',
    login: 'automation-857d1765.e26e.4d3f.8d73.1c506feeb243crWfrswZgU',
    formSubmitUrl:
      'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow',
    lastPaymentOption: 'netbanking',
    disableSavedCards: false,
    paymentInstrumentDetails: [
      {
        type: 'creditcard',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          lowSROptions: null,
          data: null,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
        }
      },
      {
        type: 'debitcard',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          lowSROptions: null,
          data: null,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
        }
      },
      {
        type: 'netbanking',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          lowSROptions: null,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow',
          data: [
            {
              id: 1,
              name: 'Axis Bank',
              defaultBank: true,
              popular: true
            },
            {
              id: 68,
              name: 'AvenuesTest',
              defaultBank: false,
              popular: true
            },
            {
              id: 5,
              name: 'CitiBank',
              defaultBank: false,
              popular: true
            },
            {
              id: 2,
              name: 'HDFC Bank',
              defaultBank: false,
              popular: true
            },
            {
              id: 6,
              name: 'Andhra Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 7,
              name: 'Bank of Bahrain & Kuwait',
              defaultBank: false,
              popular: false
            },
            {
              id: 8,
              name: 'Bank of Baroda Corporate Accounts',
              defaultBank: false,
              popular: false
            },
            {
              id: 9,
              name: 'Bank of Baroda Retail Accounts',
              defaultBank: false,
              popular: false
            },
            {
              id: 10,
              name: 'Bank of India',
              defaultBank: false,
              popular: false
            },
            {
              id: 11,
              name: 'Bank of Maharashtra',
              defaultBank: false,
              popular: false
            },
            {
              id: 42,
              name: 'Canara Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 43,
              name: 'Catholic Syrian Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 44,
              name: 'Central Bank of India',
              defaultBank: false,
              popular: false
            },
            {
              id: 41,
              name: 'Checkout',
              defaultBank: false,
              popular: false
            },
            {
              id: 12,
              name: 'City Union Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 13,
              name: 'Corporation Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 14,
              name: 'Deutsche Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 39,
              name: 'Development Credit Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 60,
              name: 'Development credit Bank - Corporate',
              defaultBank: false,
              popular: false
            },
            {
              id: 40,
              name: 'Dhanlaxmi Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 15,
              name: 'Federal Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 16,
              name: 'IDBI Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 47,
              name: 'Indian Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 17,
              name: 'Indian Overseas Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 18,
              name: 'IndusInd Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 19,
              name: 'ING Vysya Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 73,
              name: 'InstaCred Cardless E M I',
              defaultBank: false,
              popular: false
            },
            {
              id: 20,
              name: 'Jammu & Kashmir Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 59,
              name: 'Janata Sahakari Bank Limited',
              defaultBank: false,
              popular: false
            },
            {
              id: 21,
              name: 'Karnataka Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 22,
              name: 'Karur Vysya Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 23,
              name: 'Kotak Mahindra Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 24,
              name: 'Lakshmi Vilas Bank NetBanking',
              defaultBank: false,
              popular: false
            },
            {
              id: 25,
              name: 'Oriental Bank of Commerce',
              defaultBank: false,
              popular: false
            },
            {
              id: 49,
              name: 'Punjab & Maharashtra Cooperative Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 26,
              name: 'Punjab National Bank Corporate Accounts',
              defaultBank: false,
              popular: false
            },
            {
              id: 27,
              name: 'Punjab National Bank Retail Accounts',
              defaultBank: false,
              popular: false
            },
            {
              id: 53,
              name: 'Shamrao Vithal Cooperative Bank Ltd',
              defaultBank: false,
              popular: false
            },
            {
              id: 62,
              name: 'Shivalik Mercantile Coop. Bank Limited',
              defaultBank: false,
              popular: false
            },
            {
              id: 28,
              name: 'South Indian Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 29,
              name: 'Standard Chartered Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 54,
              name: 'State Bank of Bikaner & Jaipur',
              defaultBank: false,
              popular: false
            },
            {
              id: 30,
              name: 'State Bank of Hyderabad',
              defaultBank: false,
              popular: false
            },
            {
              id: 31,
              name: 'State Bank of Mysore',
              defaultBank: false,
              popular: false
            },
            {
              id: 32,
              name: 'State Bank of Travancore',
              defaultBank: false,
              popular: false
            },
            {
              id: 33,
              name: 'Syndicate Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 34,
              name: 'Tamilnad Mercantile Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 63,
              name: 'UCO Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 35,
              name: 'Union Bank of India',
              defaultBank: false,
              popular: false
            },
            {
              id: 36,
              name: 'United Bank of India',
              defaultBank: false,
              popular: false
            },
            {
              id: 37,
              name: 'Vijaya Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 38,
              name: 'YES Bank',
              defaultBank: false,
              popular: false
            }
          ]
        }
      },
      {
        type: 'upi',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          lowSROptions: null,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow',
          data: [
            {
              id: 67,
              name: 'PhonePeUPI',
              defaultBank: false,
              popular: false
            }
          ]
        }
      },
      {
        type: 'emi',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          lowSROptions: null,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow',
          data: [
            {
              id: 71,
              name: 'EMI',
              defaultBank: false,
              popular: false
            }
          ]
        }
      },
      {
        type: 'savedcard',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          lowSROptions: null,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow',
          data: [
            {
              maskedCardNumber: '411111xxxxxx1111',
              encryptedCardNumber: null,
              instrumentId: '3964524623791474511',
              defaultInstrument: true,
              billingName: 'sdfs',
              billingAddress: '4 sfsdf92324',
              billingPinCode: '560061',
              billingCity: 'Bangalore',
              billingState: 'Karnataka',
              billingCountry: 'IN',
              cardHolderName: 'PPP',
              cardType: 'VISA',
              expired: false,
              inValid: false,
              bankName: '',
              expiryMonth: '01',
              expiryYear: '20',
              productType: '',
              paymentInstrumentId: null,
              paymentMaskedNumber: '**** 1111'
            },
            {
              maskedCardNumber: '555532xxxxxx3232',
              encryptedCardNumber: null,
              instrumentId: '562154617225539214',
              defaultInstrument: false,
              billingName: '',
              billingAddress: '',
              billingPinCode: '',
              billingCity: '',
              billingState: '',
              billingCountry: '',
              cardHolderName: 'SDDSD',
              cardType: 'MASTERCARD',
              expired: true,
              inValid: false,
              bankName: '',
              expiryMonth: '02',
              expiryYear: '19',
              productType: 'Debit Card',
              paymentInstrumentId: null,
              paymentMaskedNumber: '**** 3232'
            },
            {
              maskedCardNumber: '512345xxxxxx2346',
              encryptedCardNumber: null,
              instrumentId: '8651783317987153833',
              defaultInstrument: false,
              billingName: 'anu',
              billingAddress: 'ww4',
              billingPinCode: '560068',
              billingCity: 'Bangalore',
              billingState: 'Karnataka',
              billingCountry: 'IN',
              cardHolderName: 'vegasf',
              cardType: 'MASTERCARD',
              expired: false,
              inValid: false,
              bankName: '',
              expiryMonth: '01',
              expiryYear: '21',
              productType: 'Credit Card',
              paymentInstrumentId: null,
              paymentMaskedNumber: '**** 2346'
            },
            {
              maskedCardNumber: '526266xxxxxx6830',
              encryptedCardNumber: null,
              instrumentId: '8430751348321292806',
              defaultInstrument: false,
              billingName: 'test',
              billingAddress: '10th cross',
              billingPinCode: '560068',
              billingCity: 'Bangalore',
              billingState: 'Karnataka',
              billingCountry: 'IN',
              cardHolderName: 'test',
              cardType: 'MASTERCARD',
              expired: false,
              inValid: false,
              bankName: 'CITI',
              expiryMonth: '01',
              expiryYear: '21',
              productType: 'Credit Card',
              paymentInstrumentId: null,
              paymentMaskedNumber: '**** 6830'
            }
          ]
        }
      },
      {
        type: 'savedvpa',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          lowSROptions: null,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow',
          data: [
            {
              vpa: 'ashwinsaval@okhdfcbank',
              payerAccountName: 'ASHWIN LAXMAN SAVAL',
              appName: 'Google Pay',
              instrumentId: 'a5687b20-2bef-48a5-b366-27a54a23e425',
              updatedOn: 1578918555000
            },
            {
              vpa: 'sandeepkumar.k09@okhdfcbank',
              payerAccountName: 'SANDEEP KUMAR K',
              appName: 'Google Pay',
              instrumentId: '96ad542e-5de3-4a45-bbb5-767f91536f9b',
              updatedOn: 1572508189000
            },
            {
              vpa: 'arunkumar.nie@okaxis',
              payerAccountName: 'ARUN KUMARA',
              appName: 'Google Pay',
              instrumentId: '526bfad2-7e90-4c80-b6f7-d0fc9f5ecf2c',
              updatedOn: 1572504024000
            }
          ],
          enable2fa: false,
          phoneNumbers: null,
          enableEmailOTP: false
        }
      },
      {
        type: 'wallet',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          lowSROptions: null,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow',
          data: [
            {
              id: 61,
              name: 'Mobikwik',
              defaultBank: false,
              popular: true
            },
            {
              id: 74,
              name: 'Airtel Money',
              defaultBank: false,
              popular: true
            },
            {
              id: 72,
              name: 'FreeCharge',
              defaultBank: false,
              popular: true
            }
          ]
        }
      },
      {
        type: 'cod',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          lowSROptions: null,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow',
          data: [
            {
              cashOnly: false,
              firstTimeUser: false,
              minCOD: null,
              maxCOD: null
            }
          ]
        }
      },
      {
        type: 'giftcard',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: null
      },
      {
        type: 'loyalitypoints',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: null
      },
      {
        type: 'myntraCredit',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
        }
      },
      {
        code: 3000,
        message: 'Instrument is Eligible',
        paymentInstrumentDetails: {
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow',
          data: [
            {
              applicable: true,
              authenticationRequired: true,
              availableCredit: 10000,
              id: 1,
              loginType: 'ACCOUNT',
              name: 'Flipkart Pay Later',
              providerCode: 20000,
              status: 'ACTIVE',
              tncAccepted: true,
              tncUrl: 'https://www.myntra.com'
            }
          ]
        },
        enable2fa: false,
        lowSROptions: null,
        type: 'paylater'
      }
    ]
  },
  paymentConfig: {
    instrumentData: {
      cod: {
        type: 'cod',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          lowSROptions: null,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow',
          data: [
            {
              cashOnly: false,
              firstTimeUser: false,
              minCOD: null,
              maxCOD: null
            }
          ]
        }
      },
      savedcard: {
        type: 'savedcard',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          lowSROptions: null,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow',
          data: [
            {
              maskedCardNumber: '411111xxxxxx1111',
              encryptedCardNumber: null,
              instrumentId: '3964524623791474511',
              defaultInstrument: true,
              billingName: 'sdfs',
              billingAddress: '4 sfsdf92324',
              billingPinCode: '560061',
              billingCity: 'Bangalore',
              billingState: 'Karnataka',
              billingCountry: 'IN',
              cardHolderName: 'PPP',
              cardType: 'VISA',
              expired: false,
              inValid: false,
              bankName: '',
              expiryMonth: '01',
              expiryYear: '20',
              productType: '',
              paymentInstrumentId: null,
              paymentMaskedNumber: '**** 1111'
            },
            {
              maskedCardNumber: '555532xxxxxx3232',
              encryptedCardNumber: null,
              instrumentId: '562154617225539214',
              defaultInstrument: false,
              billingName: '',
              billingAddress: '',
              billingPinCode: '',
              billingCity: '',
              billingState: '',
              billingCountry: '',
              cardHolderName: 'SDDSD',
              cardType: 'MASTERCARD',
              expired: true,
              inValid: false,
              bankName: '',
              expiryMonth: '02',
              expiryYear: '19',
              productType: 'Debit Card',
              paymentInstrumentId: null,
              paymentMaskedNumber: '**** 3232'
            },
            {
              maskedCardNumber: '512345xxxxxx2346',
              encryptedCardNumber: null,
              instrumentId: '8651783317987153833',
              defaultInstrument: false,
              billingName: 'anu',
              billingAddress: 'ww4',
              billingPinCode: '560068',
              billingCity: 'Bangalore',
              billingState: 'Karnataka',
              billingCountry: 'IN',
              cardHolderName: 'vegasf',
              cardType: 'MASTERCARD',
              expired: false,
              inValid: false,
              bankName: '',
              expiryMonth: '01',
              expiryYear: '21',
              productType: 'Credit Card',
              paymentInstrumentId: null,
              paymentMaskedNumber: '**** 2346'
            },
            {
              maskedCardNumber: '526266xxxxxx6830',
              encryptedCardNumber: null,
              instrumentId: '8430751348321292806',
              defaultInstrument: false,
              billingName: 'test',
              billingAddress: '10th cross',
              billingPinCode: '560068',
              billingCity: 'Bangalore',
              billingState: 'Karnataka',
              billingCountry: 'IN',
              cardHolderName: 'test',
              cardType: 'MASTERCARD',
              expired: false,
              inValid: false,
              bankName: 'CITI',
              expiryMonth: '01',
              expiryYear: '21',
              productType: 'Credit Card',
              paymentInstrumentId: null,
              paymentMaskedNumber: '**** 6830'
            }
          ]
        }
      },
      debitcard: {
        type: 'debitcard',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          lowSROptions: null,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow',
          data: null
        }
      },
      creditcard: {
        type: 'creditcard',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          lowSROptions: null,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow',
          data: null
        }
      },
      netbanking: {
        type: 'netbanking',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          lowSROptions: null,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow',
          data: [
            {
              id: 1,
              name: 'Axis Bank',
              defaultBank: true,
              popular: true
            },
            {
              id: 68,
              name: 'AvenuesTest',
              defaultBank: false,
              popular: true
            },
            {
              id: 5,
              name: 'CitiBank',
              defaultBank: false,
              popular: true
            },
            {
              id: 2,
              name: 'HDFC Bank',
              defaultBank: false,
              popular: true
            },
            {
              id: 6,
              name: 'Andhra Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 7,
              name: 'Bank of Bahrain & Kuwait',
              defaultBank: false,
              popular: false
            },
            {
              id: 8,
              name: 'Bank of Baroda Corporate Accounts',
              defaultBank: false,
              popular: false
            },
            {
              id: 9,
              name: 'Bank of Baroda Retail Accounts',
              defaultBank: false,
              popular: false
            },
            {
              id: 10,
              name: 'Bank of India',
              defaultBank: false,
              popular: false
            },
            {
              id: 11,
              name: 'Bank of Maharashtra',
              defaultBank: false,
              popular: false
            },
            {
              id: 42,
              name: 'Canara Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 43,
              name: 'Catholic Syrian Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 44,
              name: 'Central Bank of India',
              defaultBank: false,
              popular: false
            },
            {
              id: 41,
              name: 'Checkout',
              defaultBank: false,
              popular: false
            },
            {
              id: 12,
              name: 'City Union Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 13,
              name: 'Corporation Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 14,
              name: 'Deutsche Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 39,
              name: 'Development Credit Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 60,
              name: 'Development credit Bank - Corporate',
              defaultBank: false,
              popular: false
            },
            {
              id: 40,
              name: 'Dhanlaxmi Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 15,
              name: 'Federal Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 16,
              name: 'IDBI Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 47,
              name: 'Indian Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 17,
              name: 'Indian Overseas Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 18,
              name: 'IndusInd Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 19,
              name: 'ING Vysya Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 73,
              name: 'InstaCred Cardless E M I',
              defaultBank: false,
              popular: false
            },
            {
              id: 20,
              name: 'Jammu & Kashmir Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 59,
              name: 'Janata Sahakari Bank Limited',
              defaultBank: false,
              popular: false
            },
            {
              id: 21,
              name: 'Karnataka Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 22,
              name: 'Karur Vysya Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 23,
              name: 'Kotak Mahindra Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 24,
              name: 'Lakshmi Vilas Bank NetBanking',
              defaultBank: false,
              popular: false
            },
            {
              id: 25,
              name: 'Oriental Bank of Commerce',
              defaultBank: false,
              popular: false
            },
            {
              id: 49,
              name: 'Punjab & Maharashtra Cooperative Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 26,
              name: 'Punjab National Bank Corporate Accounts',
              defaultBank: false,
              popular: false
            },
            {
              id: 27,
              name: 'Punjab National Bank Retail Accounts',
              defaultBank: false,
              popular: false
            },
            {
              id: 53,
              name: 'Shamrao Vithal Cooperative Bank Ltd',
              defaultBank: false,
              popular: false
            },
            {
              id: 62,
              name: 'Shivalik Mercantile Coop. Bank Limited',
              defaultBank: false,
              popular: false
            },
            {
              id: 28,
              name: 'South Indian Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 29,
              name: 'Standard Chartered Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 54,
              name: 'State Bank of Bikaner & Jaipur',
              defaultBank: false,
              popular: false
            },
            {
              id: 30,
              name: 'State Bank of Hyderabad',
              defaultBank: false,
              popular: false
            },
            {
              id: 31,
              name: 'State Bank of Mysore',
              defaultBank: false,
              popular: false
            },
            {
              id: 32,
              name: 'State Bank of Travancore',
              defaultBank: false,
              popular: false
            },
            {
              id: 33,
              name: 'Syndicate Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 34,
              name: 'Tamilnad Mercantile Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 63,
              name: 'UCO Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 35,
              name: 'Union Bank of India',
              defaultBank: false,
              popular: false
            },
            {
              id: 36,
              name: 'United Bank of India',
              defaultBank: false,
              popular: false
            },
            {
              id: 37,
              name: 'Vijaya Bank',
              defaultBank: false,
              popular: false
            },
            {
              id: 38,
              name: 'YES Bank',
              defaultBank: false,
              popular: false
            }
          ]
        }
      },
      upi: {
        type: 'upi',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          lowSROptions: null,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow',
          data: [
            {
              id: 67,
              name: 'PhonePeUPI',
              defaultBank: false,
              popular: false
            }
          ]
        }
      },
      giftcard: {
        type: 'giftcard',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: null
      },
      emi: {
        type: 'emi',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          lowSROptions: null,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow',
          data: [
            {
              id: 71,
              name: 'EMI',
              defaultBank: false,
              popular: false
            }
          ]
        }
      },
      wallet: {
        type: 'wallet',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          lowSROptions: null,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow',
          data: [
            {
              id: 61,
              name: 'Mobikwik',
              defaultBank: false,
              popular: true
            },
            {
              id: 74,
              name: 'Airtel Money',
              defaultBank: false,
              popular: true
            },
            {
              id: 72,
              name: 'FreeCharge',
              defaultBank: false,
              popular: true
            }
          ]
        }
      },
      paylater: {
        code: 3000,
        message: 'Instrument is Eligible',
        paymentInstrumentDetails: {
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow',
          data: [
            {
              applicable: true,
              authenticationRequired: true,
              availableCredit: 10000,
              id: 1,
              loginType: 'ACCOUNT',
              name: 'Flipkart Pay Later',
              providerCode: 20000,
              status: 'ACTIVE',
              tncAccepted: true,
              tncUrl: 'https://www.myntra.com'
            }
          ]
        },
        enable2fa: false,
        lowSROptions: null,
        type: 'paylater'
      },
      BNPL: {
        applicable: true,
        authenticationRequired: true,
        availableCredit: 10000,
        id: 1,
        loginType: 'ACCOUNT',
        name: 'Flipkart Pay Later',
        providerCode: 20000,
        status: 'ACTIVE',
        tncAccepted: true,
        tncUrl: 'https://www.myntra.com'
      }
    },
    savedInstruments: {
      availableSavedCards: [
        {
          maskedCardNumber: '411111xxxxxx1111',
          encryptedCardNumber: null,
          instrumentId: '3964524623791474511',
          defaultInstrument: true,
          billingName: 'sdfs',
          billingAddress: '4 sfsdf92324',
          billingPinCode: '560061',
          billingCity: 'Bangalore',
          billingState: 'Karnataka',
          billingCountry: 'IN',
          cardHolderName: 'PPP',
          cardType: 'VISA',
          expired: false,
          inValid: false,
          bankName: '',
          expiryMonth: '01',
          expiryYear: '20',
          productType: '',
          paymentInstrumentId: null,
          paymentMaskedNumber: '**** 1111'
        },
        {
          maskedCardNumber: '555532xxxxxx3232',
          encryptedCardNumber: null,
          instrumentId: '562154617225539214',
          defaultInstrument: false,
          billingName: '',
          billingAddress: '',
          billingPinCode: '',
          billingCity: '',
          billingState: '',
          billingCountry: '',
          cardHolderName: 'SDDSD',
          cardType: 'MASTERCARD',
          expired: true,
          inValid: false,
          bankName: '',
          expiryMonth: '02',
          expiryYear: '19',
          productType: 'Debit Card',
          paymentInstrumentId: null,
          paymentMaskedNumber: '**** 3232'
        },
        {
          maskedCardNumber: '512345xxxxxx2346',
          encryptedCardNumber: null,
          instrumentId: '8651783317987153833',
          defaultInstrument: false,
          billingName: 'anu',
          billingAddress: 'ww4',
          billingPinCode: '560068',
          billingCity: 'Bangalore',
          billingState: 'Karnataka',
          billingCountry: 'IN',
          cardHolderName: 'vegasf',
          cardType: 'MASTERCARD',
          expired: false,
          inValid: false,
          bankName: '',
          expiryMonth: '01',
          expiryYear: '21',
          productType: 'Credit Card',
          paymentInstrumentId: null,
          paymentMaskedNumber: '**** 2346'
        },
        {
          maskedCardNumber: '526266xxxxxx6830',
          encryptedCardNumber: null,
          instrumentId: '8430751348321292806',
          defaultInstrument: false,
          billingName: 'test',
          billingAddress: '10th cross',
          billingPinCode: '560068',
          billingCity: 'Bangalore',
          billingState: 'Karnataka',
          billingCountry: 'IN',
          cardHolderName: 'test',
          cardType: 'MASTERCARD',
          expired: false,
          inValid: false,
          bankName: 'CITI',
          expiryMonth: '01',
          expiryYear: '21',
          productType: 'Credit Card',
          paymentInstrumentId: null,
          paymentMaskedNumber: '**** 6830'
        }
      ],
      availableSavedUPIs: []
    },
    walletConfig: {
      walletTabs: [],
      tabName: 'PAYPAL/PAYTM/WALLETS'
    },
    upiConfig: {
      tabName: 'PHONEPE/GOOGLE PAY/BHIM UPI'
    }
  },
  addressData: {
    id: 'testAddress1',
    country: { name: 'testCountry1' },
    user: { name: 'testUName', email: 'testEmail', mobile: '11111' },
    state: { name: 'testStateName' },
    streetAddress: 'testStreetAddress',
    city: 'testCity',
    pincode: '567777',
    addressType: 'HOME'
  },
  cartData: {
    id: 'testCartId1',
    price: {
      charges: { data: [{ name: 'tax', value: 0 }] },
      discounts: {
        data: [
          {
            name: 'discount',
            value: 0,
            meta: null
          },
          {
            name: 'mynts',
            value: 0,
            meta: null
          },
          {
            name: 'coupon',
            value: 0,
            meta: null
          },
          {
            name: 'bag',
            value: 0,
            meta: null
          }
        ]
      },
      instruments: {
        data: [
          { name: 'loyaltypoints', value: 0 },
          { name: 'cashback', value: 0 },
          { name: 'giftcard', value: 0 }
        ]
      },
      mrp: 3499,
      subTotal: 3499,
      total: 3499,
      totalSavings: 0
    },
    shippingData: {
      method: 'NORMAL',
      text: ''
    }
  },
  paymentMode: 'creditcard',
  paymentModeName: 'savedcard',
  instrumentData: [
    {
      code: 3000, // 3001, 3018  payment.options.error for CC/DC
      message: 'Instrument is Eligible',
      paymentInstrumentDetails: { lowSROptions: null, data: null },
      type: 'creditcard'
    },
    {
      code: 3000, // 3001, 3018  payment.options.error for CC/DC
      message: 'Instrument is Eligible',
      paymentInstrumentDetails: { lowSROptions: null, data: null },
      type: 'debitcard'
    }
  ]
};

const cardInitialForm = {
  cardNumber: {
    value: '',
    error: '',
    maxLength: 20,
    required: true
  },
  cardName: {
    value: '',
    error: '',
    maxLength: 50,
    required: true
  },
  expiryMonth: {
    value: '',
    error: '',
    required: true
  },
  expiryYear: {
    value: '',
    error: '',
    required: true
  },
  cvv: {
    value: '',
    error: '',
    maxLength: 4,
    required: true
  },
  saveCard: {
    value: true,
    required: false
  }
};

const cardInitialFormV2 = {
  cardNumber: {
    value: '',
    error: '',
    maxLength: 20,
    required: true
  },
  cardName: {
    value: '',
    error: '',
    maxLength: 50,
    required: true
  },
  expiry: {
    value: '',
    error: '',
    required: true
  },
  cvv: {
    value: '',
    error: '',
    maxLength: 4,
    required: true
  },
  saveCard: {
    value: true,
    required: false
  }
};

const dummyCardData = {
  cardNumber: {
    value: '1234567891234567',
    error: '',
    maxLength: 20,
    required: true
  },
  cardName: {
    value: 'Dummy',
    error: '',
    maxLength: 50,
    required: true
  },
  expiry: {
    value: '',
    error: '',
    required: true
  },
  cvv: {
    value: '123',
    error: '',
    maxLength: 4,
    required: true
  },
  saveCard: {
    value: true,
    required: false
  }
};

const icbMockData = {
  message: 'Eligibility check was successful',
  code: 10001,
  skuLevelCashbackDetails: [
    {
      skuId: '11349036',
      payableAmount: 315000,
      cashbackAmount: 50000,
      ruleId: 502
    },
    {
      skuId: '11349037',
      payableAmount: 315000,
      cashbackAmount: 50000,
      ruleId: 502
    }
  ],
  amount: 100000,
  percentage: 10
};

const deffMockData = {
  amount: 10000,
  percentage: 10
};

const payloadMockdata = {
  addressSel: 909451916,
  cardNumber: '5555555555554444',
  billName: 'asdfaf',
  cardMonth: '02',
  cardYear: '25',
  otherCards: false,
  saveCard: 'on',
  useSavedCard: false,
  user: 'automation-94048ece.8722.4ffc.b892.44cd564d53b99yxCLjNAzg',
  paymenInstrument: 'creditcard',
  bankCashbackEligible: 'false',
  bankCashbackAmount: 0,
  csrf:
    'FrTpVrtLzYeXQ22CfW7lnQ==:QfnnH1Doq1o9uMJUq+sF42kLdjCIpp8FEPMiAwd0WR3vjbDatBwDMg/WeKN+WBFMt97QcOmKEZT3BI2Z1Oj5J/8H1cFFyjFsjOnk3mCEKL8KHnpKQgg1kfh4ZmluYzwJJyxfjcPHtNAbbywjJwdKBXxfC1KYiK6j39H2Rnc9540/G31FBjKMwr5C5aSOp+X8',
  cartContext: 'default',
  cartId: 'bbbbf52a-0c31-405a-be54-6117db682b01',
  clientContext: 'responsive',
  paymentMethods: 'creditcard',
  profile: 'dev.myntra.com:8500',
  addressId: 909451916,
  bAddress: '123, Manali Saravana Nagar',
  bCity: 'Bengaluru',
  bCountry: 'India',
  bFirstname: 'Saravanan asasdf',
  bState: 'Karnataka',
  bZipcode: '560068',
  email: 'agg2@myntra.com',
  mobile: '8148871471',
  xMetaApp: 'deviceID=e12a42b0-3d33-4464-a1b2-996e8ecfa954',
  channel: 'desktop',
  autoGiftCardUsed: '',
  autoGiftCardAmount: '0',
  giftcardType: '',
  useloyaltypoints: 'N',
  templateCode: 105
};

const retryProps = {
  paymentOptions: {
    csrfToken:
      'KuDHug09W7fItfvYENgnUA==:J2zQPvp3kuoQ+QNzUKltMuNTFynWvN3fs/Zjia6mhV9Bx/rLBJZ2KjJEOf9/FwhORI8oENVhJk58kqyrp0GjHYFQmVPSZWR1jdDQvG/1R/Pp1FmBrXTzASYizAzyG/dMbZRssaIvgPyFOlr0x9FYpP4x/y7jqBFzSGRvF291dLQ=',
    login: 'f36f194e.621c.4fc3.b54b.19a308ebc1b4hSJGzec4dj',
    paymentToken:
      '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    payableAmount: 100000,
    verifyPaymentUrl:
      'https://pps.myntra.com/myntra-payment-plan-service/v2/verifyPayment',
    lastPaymentOption: 'upi',
    disableSavedCards: false,
    recommendedPaymentInstrumentDetails: [
      {
        type: 'creditcard',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          enable2fa: false,
          enableEmailOTP: false,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
        }
      },
      {
        type: 'debitcard',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          enable2fa: false,
          enableEmailOTP: false,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
        }
      }
    ],
    paymentInstrumentDetails: [
      {
        type: 'creditcard',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          enable2fa: false,
          enableEmailOTP: false,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
        }
      },
      {
        type: 'debitcard',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          enable2fa: false,
          enableEmailOTP: false,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
        }
      },
      {
        type: 'netbanking',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          lowSROptions: [],
          data: [
            {
              id: 1,
              name: 'Axis Bank',
              defaultBank: false,
              lowSuccessRate: false,
              popular: true,
              disable: false
            },
            {
              id: 2,
              name: 'HDFC Bank',
              defaultBank: false,
              lowSuccessRate: false,
              popular: true,
              disable: false
            }
          ],
          enable2fa: false,
          enableEmailOTP: false,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
        }
      },
      {
        type: 'upi',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          data: [
            {
              id: 76,
              name: 'BHIM',
              defaultBank: false,
              lowSuccessRate: false,
              popular: false,
              disable: false,
              bankCode: 'BHIM'
            },
            {
              id: 86,
              name: 'Freecharge',
              defaultBank: false,
              lowSuccessRate: false,
              popular: false,
              disable: false,
              bankCode: 'FREECHARGE'
            }
          ],
          enable2fa: false,
          enableEmailOTP: false,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
        }
      },
      {
        type: 'emi',
        message: 'EMI not applicable',
        code: 3017,
        paymentInstrumentDetails: {
          enable2fa: false,
          enableEmailOTP: false,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
        }
      },
      {
        type: 'savedcard',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          data: [
            {
              paymentInstrumentType: 'card',
              lowSuccessRate: false,
              lastSuccessfulTransaction: 0,
              maskedCardNumber: '43223XXXX232422',
              encryptedCardNumber: null,
              instrumentId: 'dwdwdw',
              defaultInstrument: false,
              billingName: '',
              billingAddress: '',
              billingPinCode: '',
              billingCity: '',
              billingState: '',
              billingCountry: '',
              cardHolderName: 'ajit',
              cardType: 'VISA',
              expired: false,
              inValid: false,
              bankName: 'DCBP',
              cardBankName: 'DCB Bank',
              expiryMonth: '07',
              expiryYear: '25',
              productType: 'Credit Card',
              paymentInstrumentId: null,
              disable: false,
              paymentMaskedNumber: '**** 4344'
            }
          ],
          enable2fa: false,
          enableEmailOTP: false,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
        }
      },
      {
        type: 'savedvpa',
        message: 'Payment Instrument Data is not available',
        code: 3018,
        paymentInstrumentDetails: {
          enable2fa: false,
          enableEmailOTP: false,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
        }
      },
      {
        type: 'wallet',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          lowSROptions: ['Mobikwik'],
          data: [
            {
              id: 3,
              name: 'PayPal',
              disable: false,
              directIntegration: true,
              directDisplay: false
            },
            {
              id: 43,
              name: 'Airtel Money',
              disable: false,
              directIntegration: false,
              directDisplay: false
            }
          ],
          enable2fa: true,
          enableEmailOTP: true,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
        }
      },
      {
        type: 'giftcard',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          enable2fa: false,
          enableEmailOTP: false,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
        }
      },
      {
        type: 'loyalitypoints',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          enable2fa: false,
          enableEmailOTP: false,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/buy'
        }
      },
      {
        type: 'myntraCredit',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          enable2fa: true,
          phoneNumbers: [
            '9676356060',
            '9167299287',
            '7022022049',
            '9600497563'
          ],
          enableEmailOTP: true,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/buy'
        }
      },
      {
        type: 'paylater',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          data: [
            {
              id: 1,
              name: 'Buy Now Pay Later',
              status: null,
              loginType: null,
              availableCredit: null,
              tncAccepted: false,
              tncUrl: null,
              authenticationRequired: false,
              providerCode: 20006,
              disable: true,
              applicable: false
            }
          ],
          enable2fa: false,
          enableEmailOTP: false,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
        }
      }
    ],
    price: {
      mrp: 1398,
      total: 698,
      subTotal: 698,
      discounts: {
        data: [
          {
            name: 'discount',
            value: 700
          },
          {
            name: 'mynts',
            value: 0
          },
          {
            name: 'coupon',
            value: 0
          },
          {
            name: 'bag',
            value: 0
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
      }
    }
  },
  paymentConfig: {
    instrumentData: {
      debitcard: {
        type: 'debitcard',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          enable2fa: false,
          enableEmailOTP: false,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
        }
      },
      creditcard: {
        type: 'creditcard',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          enable2fa: false,
          enableEmailOTP: false,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
        }
      },
      netbanking: {
        type: 'netbanking',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          lowSROptions: [],
          data: [
            {
              id: 1,
              name: 'Axis Bank',
              defaultBank: false,
              lowSuccessRate: false,
              popular: true,
              disable: false
            },
            {
              id: 2,
              name: 'HDFC Bank',
              defaultBank: false,
              lowSuccessRate: false,
              popular: true,
              disable: false
            }
          ],
          enable2fa: false,
          enableEmailOTP: false,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
        }
      },
      upi: {
        type: 'upi',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          data: [
            {
              id: 76,
              name: 'BHIM',
              defaultBank: false,
              lowSuccessRate: false,
              popular: false,
              disable: false,
              bankCode: 'BHIM'
            },
            {
              id: 86,
              name: 'Freecharge',
              defaultBank: false,
              lowSuccessRate: false,
              popular: false,
              disable: false,
              bankCode: 'FREECHARGE'
            }
          ],
          enable2fa: false,
          enableEmailOTP: false,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
        }
      },
      giftcard: {
        type: 'giftcard',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          enable2fa: false,
          enableEmailOTP: false,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
        }
      },
      emi: {
        type: 'emi',
        message: 'EMI not applicable',
        code: 3017,
        paymentInstrumentDetails: {
          enable2fa: false,
          enableEmailOTP: false,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
        }
      },
      wallet: {
        type: 'wallet',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          lowSROptions: ['Mobikwik'],
          data: [
            {
              id: 3,
              name: 'PayPal',
              disable: false,
              directIntegration: true,
              directDisplay: false
            },
            {
              id: 43,
              name: 'Airtel Money',
              disable: false,
              directIntegration: false,
              directDisplay: false
            }
          ],
          enable2fa: true,
          enableEmailOTP: true,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
        }
      },
      paylater: {
        type: 'paylater',
        message: 'Instrument is Eligible',
        code: 3000,
        paymentInstrumentDetails: {
          data: [
            {
              id: 1,
              name: 'Buy Now Pay Later',
              status: null,
              loginType: null,
              availableCredit: null,
              tncAccepted: false,
              tncUrl: null,
              authenticationRequired: false,
              providerCode: 20006,
              disable: true,
              applicable: false
            }
          ],
          enable2fa: false,
          enableEmailOTP: false,
          paymentUrl:
            'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
        }
      },
      recommendedInstrument: [
        {
          type: 'creditcard',
          message: 'Instrument is Eligible',
          code: 3000,
          paymentInstrumentDetails: {
            enable2fa: false,
            enableEmailOTP: false,
            paymentUrl:
              'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
          }
        },
        {
          type: 'debitcard',
          message: 'Instrument is Eligible',
          code: 3000,
          paymentInstrumentDetails: {
            enable2fa: false,
            enableEmailOTP: false,
            paymentUrl:
              'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
          }
        }
      ],
      BNPL: {
        id: 1,
        name: 'Buy Now Pay Later',
        status: null,
        loginType: null,
        availableCredit: null,
        tncAccepted: false,
        tncUrl: null,
        authenticationRequired: false,
        providerCode: 20006,
        disable: true,
        applicable: false,
        paymentUrl:
          'https://pps.myntra.com/myntra-payment-plan-service/v3/paynow'
      }
    },
    savedInstruments: [],
    walletConfig: {
      walletTabs: []
    }
  },
  paymentMode: 'creditcard',
  paymentModeName: 'savedcard'
};

export {
  props,
  retryProps,
  cardInitialForm,
  cardInitialFormV2,
  icbMockData,
  deffMockData,
  payloadMockdata,
  dummyCardData
};
