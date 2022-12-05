import { evaluate } from "mathjs";

export function calculate(expression: string): string {
  try {
    return setPrecision10(evaluate(normalizeOperators(expression)));
  } catch (e) {
    return (<Error>e).message;
  }
}

function normalizeOperators(expression: string) {
  return expression.replace(/−/g, "-").replace(/×/g, "*").replace(/÷/g, "/");
}

function setPrecision10(n: number): string {
  if (Number.isNaN(n)) return NaN.toString();

  if (n === 0) return "0";

  const absNumber = Math.abs(n);

  if (1e-6 <= absNumber && absNumber < 1) {
    const round9 = Math.round(n * 1e9) / 1e9;
    return round9.toString();
  }

  const precision10 = Number(n).toPrecision(10);

  return absNumber < 1e-6 || 1e10 <= absNumber
    ? Number(precision10).toExponential()
    : Number(precision10).toString();
}
