import { Injectable } from "@angular/core";
import { evaluate } from "mathjs";

@Injectable({ providedIn: "root" })
export class Calculator {
  eval(expression: string): string {
    const expr = this.normalizeOperators(expression);
    try {
      return this.setPrecision10(evaluate(expr));
    } catch (e) {
      return (<Error>e).message;
    }
  }

  private normalizeOperators(expression: string) {
    return expression.replace(/−/g, "-").replace(/×/g, "*").replace(/÷/g, "/");
  }

  private setPrecision10(n: number): string {
    if (n === 0) return "0";

    const absNumber = Math.abs(n);

    const precision10 =
      1e-6 <= absNumber && absNumber < 1 ? +n.toFixed(9) : +n.toPrecision(10);

    return absNumber < 1e-6 || 1e10 <= absNumber
      ? precision10.toExponential()
      : precision10.toString();
  }
}
