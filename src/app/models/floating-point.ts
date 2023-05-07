import { Digit } from "app/models/types";

export class FloatingPoint {
  private mantissa: string;
  private exponent: string | undefined;

  constructor(float: string) {
    [this.mantissa, this.exponent] = float.split("e");
  }

  get value() {
    return (
      this.mantissa + (this.exponent !== undefined ? "e" + this.exponent : "")
    );
  }

  append(digit: Digit): FloatingPoint {
    let input: string;

    if (this.exponent !== undefined) {
      const isOverwriteZero = this.exponent === "0";
      const isIgnoreSymbol =
        /[.e]/.test(digit) || this.exponent.replace(/-/, "").length === 2;

      input = isIgnoreSymbol
        ? this.value
        : isOverwriteZero
        ? this.mantissa + "e" + digit
        : this.value + digit;
    } else {
      const isOverwriteZero = this.mantissa === "0" && !/[.e]/.test(digit);
      const isIgnoreSymbol =
        (digit === "." && this.mantissa.includes(".")) ||
        (digit !== "e" && this.mantissa.replace(/[.-]/, "").length === 10);
      const tag = digit === "e" ? "0" : "";

      input = isIgnoreSymbol
        ? this.value
        : isOverwriteZero
        ? digit
        : this.value + digit + tag;
    }

    return new FloatingPoint(input);
  }
}
