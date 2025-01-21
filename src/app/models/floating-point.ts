import { Digit } from "app/models/types";

export class FloatingPoint {
  readonly #mantissa: string;
  readonly #exponent?: string;

  constructor(float: string) {
    [this.#mantissa, this.#exponent] = float.split("e");
  }

  append(digit: Digit): FloatingPoint {
    return this.#exponent
      ? this.#appendToExponent(digit)
      : this.#appendToMantissa(digit);
  }

  negate(): FloatingPoint {
    const negated = this.#exponent
      ? `${this.#mantissa}e${-this.#exponent}`
      : `${-this.#mantissa}`;

    return new FloatingPoint(negated);
  }

  toString() {
    return `${this.#mantissa}${this.#exponent ? `e${this.#exponent}` : ""}`;
  }

  #appendToMantissa(digit: Digit) {
    if (digit === "e") {
      return new FloatingPoint(`${this.#mantissa}e0`);
    }

    const ignoreDigit =
      (digit === "." && this.#mantissa.includes(".")) ||
      this.#mantissa.replace(/[.-]/, "").length === 10;
    if (ignoreDigit) {
      return this;
    }

    const overwriteZero = this.#mantissa === "0" && digit !== ".";
    return new FloatingPoint(overwriteZero ? digit : `${this}${digit}`);
  }

  #appendToExponent(digit: Digit) {
    const ignoreDigit =
      /[.e]/.test(digit) || this.#exponent?.replace(/-/, "").length === 2;
    if (ignoreDigit) {
      return this;
    }

    const overwriteZero = this.#exponent === "0";
    return new FloatingPoint(
      overwriteZero ? `${this.#mantissa}e${digit}` : `${this}${digit}`,
    );
  }
}
