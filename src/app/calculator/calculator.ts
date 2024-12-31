import { Injectable } from "@angular/core";
import { FloatingPoint } from "app/models/floating-point";
import { evaluate } from "mathjs";

@Injectable({ providedIn: "root" })
export class Calculator {
  eval(expression: string): FloatingPoint | Error {
    const expr = this.#normalizeOperators(expression);
    try {
      const result = this.#setPrecision10(evaluate(expr));
      return new FloatingPoint(result);
    } catch (e) {
      return e as Error;
    }
  }

  negate(floatingPoint: FloatingPoint): FloatingPoint | Error {
    return this.eval(`-${floatingPoint}`);
  }

  #normalizeOperators(expression: string) {
    return expression.replace(/−/g, "-").replace(/×/g, "*").replace(/÷/g, "/");
  }

  #setPrecision10(n: number): string {
    if (n === 0) return "0";

    const absNumber = Math.abs(n);

    const precision10 =
      1e-6 <= absNumber && absNumber < 1 ? +n.toFixed(9) : +n.toPrecision(10);

    return absNumber < 1e-6 || 1e10 <= absNumber
      ? precision10.toExponential()
      : precision10.toString();
  }
}
