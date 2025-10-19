export default class CardDetector {
  detect(cardNumber) {
    const num = cardNumber.replace(/\s+/g, "");

    if (!this.isOnlyDigits(num)) {
      return null;
    }

    if (num.length < 2) return null;

    if (num[0] === "4" && (num.length === 13 || num.length === 16)) {
      return { type: "visa", name: "VISA" };
    }

    if (num[0] === "5" && num.length === 16) {
      const secondDigit = num[1];
      if (
        secondDigit === "1" ||
        secondDigit === "2" ||
        secondDigit === "3" ||
        secondDigit === "4" ||
        secondDigit === "5"
      ) {
        return { type: "mastercard", name: "MASTERCARD" };
      }
    }

    if (num.length >= 4 && num.length === 16) {
      if (num[0] === "2" && num[1] === "2" && num[2] === "0") {
        const fourthDigit = num[3];
        if (
          fourthDigit === "0" ||
          fourthDigit === "1" ||
          fourthDigit === "2" ||
          fourthDigit === "3" ||
          fourthDigit === "4"
        ) {
          return { type: "mir", name: "МИР" };
        }
      }
    }

    if (
      num[0] === "6" &&
      num[1] === "2" &&
      num.length >= 16 &&
      num.length <= 19
    ) {
      return { type: "unionpay", name: "UnionPay" };
    }

    return null;
  }

  isOnlyDigits(str) {
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (char < "0" || char > "9") {
        return false;
      }
    }
    return true;
  }
}
