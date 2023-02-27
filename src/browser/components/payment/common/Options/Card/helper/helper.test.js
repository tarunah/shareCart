import helper from './';

const testCards = [
  {
    cardNumber: '5123456789012346',
    splittedCardNumber: '5123 4567 8901 2346',
    issuer: 'MASTERCARD',
    maxLength: 16,
    valid: true
  },
  {
    cardNumber: '344184898009573',
    splittedCardNumber: '3441 8489 8009 573',
    issuer: 'AMEX',
    maxLength: 15,
    valid: true
  },
  {
    cardNumber: '6521464116416464611565',
    splittedCardNumber: '6521 4641 1641 6464 6115 65',
    issuer: 'NONE',
    maxLength: 23,
    valid: false
  }
];

describe('[CC/DC helper]', () => {
  it('should split card numbers properly', () => {
    testCards.forEach(card => {
      const splittedCardNumber = helper.splitCardNumber(card.cardNumber);
      expect(splittedCardNumber).toEqual(card.splittedCardNumber);
    });
  });

  it('should be able to figure out the company', () => {
    testCards.forEach(card => {
      const cardDetails = helper.getCardType(card.cardNumber);
      expect(cardDetails.issuer).toEqual(card.issuer);
      expect(cardDetails.maxLength).toEqual(card.maxLength);
    });
  });

  it('should be able to distinguish valid/invalid cards', () => {
    testCards.forEach(card => {
      const isValid = helper.validCardCheck(card.cardNumber);
      expect(isValid).toEqual(card.valid);
    });
  });
});
