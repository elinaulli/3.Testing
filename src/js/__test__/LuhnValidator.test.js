import LuhnValidator from "../LuhnValidator.js";

describe("LuhnValidator", () => {
  describe("Valid card numbers", () => {
    test("should validate correct VISA", () => {
      expect(LuhnValidator.check("4111111111111111")).toBe(true);
    });

    test("should validate correct Mastercard", () => {
      expect(LuhnValidator.check("5555555555554444")).toBe(true);
    });

    test("should validate correct number with spaces", () => {
      expect(LuhnValidator.check("4111 1111 1111 1111")).toBe(true);
    });

    test("should validate another valid number", () => {
      expect(LuhnValidator.check("4012888888881881")).toBe(true);
    });
  });

  describe("Invalid card numbers", () => {
    test("should reject incorrect VISA", () => {
      expect(LuhnValidator.check("4111111111111112")).toBe(false);
    });

    test("should reject incorrect Mastercard", () => {
      expect(LuhnValidator.check("5555555555554445")).toBe(false);
    });

    test("should reject random number", () => {
      expect(LuhnValidator.check("1234567812345678")).toBe(false);
    });

    test("should reject number with all ones", () => {
      expect(LuhnValidator.check("1111111111111111")).toBe(false);
    });

    test("should reject number with incorrect checksum", () => {
      expect(LuhnValidator.check("4111111111111119")).toBe(false);
    });
  });

  describe("Edge cases", () => {
    test("should reject empty string", () => {
      expect(LuhnValidator.check("")).toBe(false);
    });

    test("should reject string with letters", () => {
      expect(LuhnValidator.check("4111-1111-1111-1111")).toBe(false);
    });

    test("should reject too short number", () => {
      expect(LuhnValidator.check("411111")).toBe(false);
    });

    test("should reject number with 12 digits", () => {
      expect(LuhnValidator.check("411111111111")).toBe(false);
    });

    // Interesting fact: number with all zeros passes Luhn algorithm
    // because sum = 0, and 0 % 10 = 0
    test("number with all zeros technically passes Luhn algorithm", () => {
      expect(LuhnValidator.check("0000000000000000")).toBe(true);
    });
  });

  describe("Real test numbers", () => {
    test("should validate test VISA", () => {
      expect(LuhnValidator.check("4242424242424242")).toBe(true);
    });

    test("should validate test Mastercard", () => {
      expect(LuhnValidator.check("5555555555554444")).toBe(true);
    });

    test("should reject obviously incorrect number", () => {
      expect(LuhnValidator.check("4242424242424241")).toBe(false);
    });
  });
});
