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
  if (isNaN(n)) return NaN.toString();

  if (n === 0) return "0";

  const absNumber = Math.abs(n);

  const precision10 =
    1e-6 <= absNumber && absNumber < 1
      ? Number(n.toFixed(9))
      : Number(n.toPrecision(10));

  return absNumber < 1e-6 || 1e10 <= absNumber
    ? precision10.toExponential()
    : precision10.toString();
}
