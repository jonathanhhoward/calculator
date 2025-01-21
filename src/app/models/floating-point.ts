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
    return new FloatingPoint(
      this.#exponent
        ? `${this.#mantissa}e${-this.#exponent}`
        : `${-this.#mantissa}`,
    );
  }

  toString() {
    return `${this.#mantissa}${this.#exponent ? `e${this.#exponent}` : ""}`;
  }

  #appendToMantissa(digit: Digit) {
    const addExponent = () => digit === "e";
    const ignoreDigit = () =>
      (digit === "." && this.#mantissa.includes(".")) ||
      this.#mantissa.replace(/[.-]/, "").length === 10;
    const overwriteZero = () => this.#mantissa === "0" && digit !== ".";

    return addExponent()
      ? new FloatingPoint(`${this.#mantissa}e0`)
      : ignoreDigit()
        ? this
        : new FloatingPoint(overwriteZero() ? digit : `${this}${digit}`);
  }

  #appendToExponent(digit: Digit) {
    const ignoreDigit = () =>
      /[.e]/.test(digit) || this.#exponent?.replace(/-/, "").length === 2;
    const overwriteZero = () => this.#exponent === "0";

    return ignoreDigit()
      ? this
      : new FloatingPoint(
          overwriteZero() ? `${this.#mantissa}e${digit}` : `${this}${digit}`,
        );
  }
}
