import { Digit } from "app/models/types";

export class FloatingPoint {
  private readonly mantissa: string;
  private readonly exponent?: string;

  constructor();
  constructor(float: string | FloatingPoint);
  constructor(float?: string | FloatingPoint) {
    [this.mantissa, this.exponent] =
      float instanceof FloatingPoint
        ? float.value.split("e")
        : typeof float === "string"
        ? float.split("e")
        : ["0"];
  }

  get value() {
    return (
      this.mantissa + (this.exponent !== undefined ? "e" + this.exponent : "")
    );
  }

  append(digit: Digit): FloatingPoint {
    const float =
      this.exponent !== undefined
        ? this.appendToExponent(digit)
        : this.appendToMantissa(digit);

    return new FloatingPoint(float);
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
