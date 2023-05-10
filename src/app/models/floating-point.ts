import { Digit } from "app/models/types";

export class FloatingPoint {
  private readonly mantissa: string;
  private readonly exponent?: string;

  constructor(float?: string) {
    [this.mantissa, this.exponent] =
      float === undefined ? ["0"] : float.split("e");
  }

  get value(): string {
    return (
      this.mantissa + (this.exponent === undefined ? "" : "e" + this.exponent)
    );
  }

  append(digit: Digit): FloatingPoint {
    const appended =
      this.exponent === undefined
        ? this.appendToMantissa(digit)
        : this.appendToExponent(digit);

    return new FloatingPoint(appended);
  }

  toString() {
    return this.value;
  }

  private appendToMantissa(digit: Digit) {
    const isOverwriteZero = this.mantissa === "0" && !/[.e]/.test(digit);
    const isIgnoreSymbol =
      (digit === "." && this.mantissa.includes(".")) ||
      (digit !== "e" && this.mantissa.replace(/[.-]/, "").length === 10);
    const tag = digit === "e" ? "0" : "";

    return isIgnoreSymbol
      ? this.value
      : isOverwriteZero
      ? digit
      : this.value + digit + tag;
  }

  private appendToExponent(digit: Digit) {
    const isOverwriteZero = this.exponent === "0";
    const isIgnoreSymbol =
      /[.e]/.test(digit) || this.exponent?.replace(/-/, "").length === 2;

    return isIgnoreSymbol
      ? this.value
      : isOverwriteZero
      ? this.mantissa + "e" + digit
      : this.value + digit;
  }
}
