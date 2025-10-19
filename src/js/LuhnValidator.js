export default class LuhnValidator {
  static check(cardNumber) {
    const cleanNumber = cardNumber.replace(/\s+/g, "");

    if (!cleanNumber || cleanNumber.length < 13) {
      return false;
    }

    if (!/^\d+$/.test(cleanNumber)) {
      return false;
    }

    let sum = 0;
    let shouldDouble = false;

    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber[i]);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  }
}
