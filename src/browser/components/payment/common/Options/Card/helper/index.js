export default {
  getCardType(cardNumber, checkLength) {
    cardNumber = String(cardNumber);
    cardNumber = cardNumber.replace(/-|\s*/g, '');

    if (!cardNumber || cardNumber.match(/\D/) || cardNumber.length < 3) {
      return false;
    }

    if (checkLength && cardNumber.length < 13) {
      return false;
    }

    const cardIdentifiers = [
      {
        identifier: ['4'],
        numlength: [13, 14, 15, 16],
        issuer: 'VISA',
        cardNumberGrouping: [4, 4, 4, 4],
        cvcLength: 3
      },
      {
        identifier: ['51', '52', '53', '54', '55'],
        numlength: [16],
        issuer: 'MASTERCARD',
        cardNumberGrouping: [4, 4, 4, 4],
        cvcLength: 3
      },
      {
        identifier: ['34', '37'],
        numlength: [15],
        issuer: 'AMEX',
        cardNumberGrouping: [4, 6, 5],
        cvcLength: 4
      },
      {
        identifier: ['300', '301', '302', '303', '304', '305', '36', '38'],
        numlength: [14],
        issuer: 'DINERS',
        cardNumberGrouping: [4, 6, 4],
        cvcLength: 3
      },
      {
        identifier: [
          '502260',
          '504433',
          '5044339',
          '504434',
          '504435',
          '504437',
          '504645',
          '504753',
          '504775',
          '504809',
          '504817',
          '504834',
          '504848',
          '504884',
          '504973',
          '504993',
          '508159',
          '600206',
          '603123',
          '603845',
          '622018',
          '508227',
          '508192',
          '508125',
          '508126'
        ],
        numlength: [16, 17, 18, 19],
        issuer: 'MAESTRO',
        cardNumberGrouping: [4, 4, 4, 4],
        cvcLength: 3
      },
      {
        identifierType: 'range',
        identifier: [
          [508500, 508999],
          [606985, 607984],
          [608001, 608500],
          [652150, 653149]
        ],
        identifierLength: 6,
        numlength: [16],
        issuer: 'RUPAY',
        cardNumberGrouping: [4, 4, 4, 4],
        cvcLength: 3
      }
    ];

    for (let j = 0; j < cardIdentifiers.length; j++) {
      const temp = cardIdentifiers[j];
      if (checkLength && temp.numlength.indexOf(cardNumber.length) === -1) {
        continue;
      }
      if (temp.identifierType && temp.identifierType === 'range') {
        for (let i = 0; i < temp.identifier.length; i++) {
          if (
            this.ifNumberInRange(
              cardNumber,
              temp.identifier[i],
              temp.identifierLength
            )
          ) {
            return {
              issuer: temp.issuer,
              maxLength: Math.max.apply(null, temp.numlength)
            };
          }
        }
      } else {
        for (let i = 0; i < temp.identifier.length; i++) {
          if (
            cardNumber.substr(0, temp.identifier[i].length) ===
            temp.identifier[i]
          ) {
            return {
              issuer: temp.issuer,
              maxLength: Math.max.apply(null, temp.numlength)
            };
          }
        }
      }
    }

    return {
      issuer: 'NONE',
      maxLength: 23
    };
  },

  ifNumberInRange(cardNumber, range, idLength) {
    const lowerLimit = range[0];
    const upperLimit = range[1];
    const cardId = +cardNumber.substr(0, idLength);
    return cardId >= lowerLimit && cardId <= upperLimit;
  },

  splitCardNumber(cardNumber) {
    cardNumber += '';
    cardNumber = cardNumber
      .replace(/-|\s*/g, '')
      .replace(/(\S{1,4})/g, '$1 ')
      .replace(/\s+$/, '');
    return cardNumber;
  },

  // takes the form field value and returns true on valid card number
  validCardCheck(value) {
    // accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(value)) return false;

    if (value === null || value.length < 13) return false;

    // The Luhn Algorithm.
    let nCheck = 0;
    let nDigit = 0;
    let bEven = false;
    value = value.replace(/\D/g, '');

    for (let n = value.length - 1; n >= 0; n--) {
      // character at nth position.
      const cDigit = value.charAt(n);
      // Converting it to a number.
      nDigit = parseInt(cDigit, 10);

      /*
        Now, add all the numbers in the string, but with condition.
        Even: multiply by 2 and if the resultatnt is a 2 digit number
              Subtract 9 from it.
        Odd: Simply Add the number.
      */
      if (bEven) {
        nDigit *= 2;
        if (nDigit > 9) {
          nDigit -= 9;
        }
      }

      nCheck += nDigit;
      bEven = !bEven;
    }

    return nCheck % 10 === 0;
  }
};
