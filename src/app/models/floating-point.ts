import { Digit } from "app/models/types";

export class FloatingPoint {
  readonly #mantissa: string;
  readonly #exponent?: string;

  constructor(float: string) {
    [this.#mantissa, this.#exponent] = float.split("e");
  }

  append(digit: Digit): FloatingPoint {
    const appended = this.#exponent
      ? this.#appendToExponent(digit)
      : this.#appendToMantissa(digit);

    return new FloatingPoint(appended);
  }

  negateMantissaOrExponent(): FloatingPoint {
    const negated = this.#exponent
      ? `${this.#mantissa}e${-this.#exponent}`
      : `${-this.#mantissa}`;

    return new FloatingPoint(negated);
  }

  toString() {
    return `${this.#mantissa}${this.#exponent ? `e${this.#exponent}` : ""}`;
  }

  #appendToMantissa(digit: Digit) {
    const isOverwriteZero = this.#mantissa === "0" && !/[.e]/.test(digit);
    const isIgnoreSymbol =
      (digit === "." && this.#mantissa.includes(".")) ||
      (digit !== "e" && this.#mantissa.replace(/[.-]/, "").length === 10);
    const tag = digit === "e" ? "0" : "";

    return isIgnoreSymbol
      ? `${this}`
      : isOverwriteZero
        ? digit
        : `${this}${digit}${tag}`;
  }

  #appendToExponent(digit: Digit) {
    const isOverwriteZero = this.#exponent === "0";
    const isIgnoreSymbol =
      /[.e]/.test(digit) || this.#exponent?.replace(/-/, "").length === 2;

    return isIgnoreSymbol
      ? `${this}`
      : isOverwriteZero
        ? `${this.#mantissa}e${digit}`
        : `${this}${digit}`;
  }
}
