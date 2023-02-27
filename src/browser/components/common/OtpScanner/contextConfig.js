const getContextConfig = ({ mobileNumber = '' }) => ({
  bnpl: {
    desc: `Flipkart has sent you an OTP on your registered mobile number${
      mobileNumber ? ` +91-${mobileNumber}` : ''
    }`,
    partnerText: '',
    otpImage: true,
    otpInputMaxLength: 6,
    buttonText: 'CONFIRM'
  },
  paymentOTP: {
    desc: 'Your bank has sent you an OTP on your registered mobile number',
    partnerText:
      'We have partnered with payment partners to provide you fast and secure OTP experience.',
    otpImage: false,
    otpInputMaxLength: 10,
    buttonText: 'PAY NOW'
  }
});

export default getContextConfig;
