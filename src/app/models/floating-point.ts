import { Digit } from "app/models/types";

export class FloatingPoint {
  readonly #mantissa: string;
  readonly #exponent?: string;

  private constructor(float: string) {
    [this.#mantissa, this.#exponent] = float.split("e");
  }

  static from(float: string): FloatingPoint {
    return new FloatingPoint(float);
  }

  append(digit: Digit): FloatingPoint {
    const appended = this.#exponent
      ? this.appendToExponent(digit)
      : this.appendToMantissa(digit);

    return FloatingPoint.from(appended);
  }

  negateMantissaOrExponent(): FloatingPoint {
    const negated = this.#exponent
      ? `${this.#mantissa}e${-this.#exponent}`
      : `${-this.#mantissa}`;

    return FloatingPoint.from(negated);
  }

  toString() {
    return `${this.#mantissa}${this.#exponent ? `e${this.#exponent}` : ""}`;
  }

  private appendToMantissa(digit: Digit) {
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

  private appendToExponent(digit: Digit) {
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
